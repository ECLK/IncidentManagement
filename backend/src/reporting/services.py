"""Reports"""

from django.db import connection
import pandas as pd
import numpy as np

from ..common.models import Category, Channel
from ..incidents.models import Incident
from .functions import get_data_frame, get_summary_by


def get_police_division_summary():
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
    # join category table into incident table on subcategory
    item_list = set(Category.objects.all().values_list("top_category", flat=True))

    sql2 = ", ".join(
        map(lambda c: "MAX(CASE WHEN (top_category = '%s') THEN 1 ELSE NULL END) AS '%s'" % (c, c),
            item_list))
    sql1 = ", ".join(map(lambda c: "COUNT(items.`%s`) as '%s'" % (c, c), item_list))

    sql = """
                SELECT 
                    incident.district,
                    %s
                FROM incidents_incident incident,
                ( 
                    SELECT
                    id,
                    %s
                    FROM common_category
                    GROUP BY id
                ) as items 
                WHERE items.id LIKE incident.category
                GROUP BY incident.district
            """ % (sql1, sql2)

    return get_data_frame(sql, item_list)


def get_mode_summary():
    item_list = set(Channel.objects.all().values_list("name", flat=True))

    sql2 = ", ".join(
        map(lambda c: "MAX(CASE WHEN (name = '%s') THEN 1 ELSE NULL END) AS '%s'" % (c, c),
            item_list))
    sql1 = ", ".join(map(lambda c: "COUNT(items.`%s`) as '%s'" % (c, c), item_list))

    sql = """
                        SELECT 
                            incident.district,
                            %s
                        FROM incidents_incident incident,
                        ( 
                            SELECT
                            id, name,
                            %s
                            FROM common_channel
                            GROUP BY id
                        ) as items 
                        WHERE items.id LIKE incident.category
                        GROUP BY incident.district
                    """ % (sql1, sql2)
    return get_data_frame(sql, item_list)


def get_severity_summary():
    item_list = set(Incident.objects.all().values_list("severity", flat=True))

    sql2 = ", ".join(
        map(lambda c: "0" if c is None else "MAX(CASE WHEN (severity = '%s') THEN 1 ELSE NULL END) AS '%s'" % (c, c), item_list))
    sql1 = ", ".join(map(lambda c: "0" if c is None else "COUNT(items.`%s`) as '%s'" % (c, c), item_list))

    sql = """
                SELECT 
                    incident.district,
                    %s
                FROM incidents_incident incident,
                ( 
                    SELECT
                    id,
                    %s
                    FROM incidents_incident
                    GROUP BY id
                ) as items 
                WHERE items.id = incident.id
                GROUP BY incident.district
            """ % (sql1, sql2)

    return get_data_frame(sql, item_list)


def get_subcategory_summary():
    item_list = set(Category.objects.all().values_list("sub_category", flat=True))

    sql2 = ", ".join(
        map(lambda c: "MAX(CASE WHEN (sub_category = '%s') THEN 1 ELSE NULL END) AS '%s'" % (c, c),
            item_list))
    sql1 = ", ".join(map(lambda c: "COUNT(items.`%s`) as '%s'" % (c, c), item_list))

    sql = """
                    SELECT 
                        incident.district,
                        %s
                    FROM incidents_incident incident,
                    ( 
                        SELECT
                        id,
                        %s
                        FROM common_category
                        GROUP BY id
                    ) as items 
                    WHERE items.id LIKE incident.category
                    GROUP BY incident.district
                """ % (sql1, sql2)
    return get_data_frame(sql, item_list)


def get_status_summary():
    return get_summary_by("current_status")
