"""Reports"""

from django.db import connection
import pandas as pd
import numpy as np

from ..incidents.models import Incident

def get_totals_by_category():
    sql = """
            SELECT usr.id, COUNT(incident.id) as incident_count FROM `auth_user` as usr 
            LEFT JOIN incidents_incident as incident on incident.assignee_id = usr.id 
            INNER JOIN auth_user_groups on usr.id = auth_user_groups.user_id
            INNER JOIN auth_group as grp on grp.id = auth_user_groups.group_id
            WHERE grp.rank = %d
            GROUP BY usr.id
            ORDER BY incident_count ASC
          """

    with connection.cursor() as cursor:
        cursor.execute(sql)
        row = cursor.fetchone()

        return []


def get_DI_Division_summary():
    sql = """
          SELECT 
            incident.province,
            incident.di_division,
            incident.police_division,
            COUNT(incident.police_station) as police_station_count,
            COUNT(incident.id) as division_total,
            COUNT(CASE WHEN cs.current_status <> "CLOSED" THEN 1 ELSE NULL END) as open_total,
            COUNT(CASE WHEN cs.current_status = "CLOSED" THEN 1 ELSE NULL END) as closed_total
          FROM incidents_incident incident,
          ( 
            SELECT b.incident_id, b.current_status
            FROM incidents_incidentstatus b
            INNER JOIN (
              SELECT i.incident_id, max(i.created_date) cdate
              FROM incidents_incidentstatus i
              GROUP BY i.incident_id
            ) c 
            ON c.incident_id = b.incident_id AND c.cdate = b.created_date
          ) as cs 
          WHERE cs.incident_id = incident.id
          GROUP BY incident.province, incident.di_division, incident.police_division
        """
    headers = [
        "Police Stations Count",
        "Incidents Received",
        "Incidents Pending",
        "Incidents Closed",
        "Other",
        "Total Count",
        "Province Total"
    ]
    dataframe = pd.read_sql_query(sql, connection)
    dataframe.sort_values(by=['province', 'di_division'], inplace=True)
    dataframe.set_index(['province', 'di_division', 'police_division'], inplace=True)
    dataframe.fillna(value=0, inplace=True)
    dataframe["other"] = ""
    dataframe["total"] = dataframe["division_total"]
    dataframe["province_total"] = dataframe.groupby('province')['total'].transform(np.sum)

    dataframe.columns = headers
    dataframe.index.names = ["Province", "DI Division", "Police Division"]

    return dataframe.to_html()

def get_category_summary():
    categories = set(Incident.objects.all().values_list('category', flat=True))
    
    sql2 = ", ".join(map(lambda c : "MAX(CASE WHEN (category = '%s') THEN 1 ELSE NULL END) AS '%s'" % (c,c), categories))
    sql1 = ", ".join(map(lambda c : "COUNT(cats.`%s`) as '%s'" % (c,c), categories))

    sql = """
            SELECT 
                incident.province,
                incident.di_division,
                incident.police_division,
                %s
            FROM incidents_incident incident,
            ( 
                SELECT
                id,
                %s
                FROM incidents_incident
                GROUP BY id
            ) as cats 
            WHERE cats.id = incident.id
            GROUP BY incident.province, incident.di_division, incident.police_division
        """ % (sql1, sql2)

    # headers = [ cat.n]
    dataframe = pd.read_sql_query(sql, connection)
    
    dataframe.sort_values(by=['province', 'di_division'], inplace=True)
    dataframe.set_index(['province', 'di_division', 'police_division'], inplace=True)
    dataframe.fillna(value=0, inplace=True)
    dataframe.columns = categories

    dataframe['Total'] = dataframe.sum(axis=1)

    dataframe.index.names = ["Province", "DI Division", "Police Division"]
    
    return dataframe.to_html()


def apply_style(html, title):
    html = """
        <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
        <html>
            <head>
                <style type="text/css">
                    .dataframe{
                        text-align: center;
                        table-layout: fixed;
                        width: 100%%;
                        word-wrap: break-word;
                    }

                    .dataframe td{
                        padding-top: 5px;
                    }

                    .dataframe th{
                        text-align: left;
                        padding-top: 5px;
                        margin-left: 5px;
                    }

                    .dataframe thead th{
                        text-align: center;
                        padding-top: 5px;
                    }
                </style>
            </head>
            <body>
                <h1 align=center>%s</h1>
                <div>
                    %s
                </div>
            </body>
        </html>
           """ % (title, html)

    return html