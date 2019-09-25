from django.db import connection
import pandas as pd

from ..incidents.models import Incident


def get_data_frame(sql, columns):
    # headers = [ cat.n]
    dataframe = pd.read_sql_query(sql, connection)

    dataframe.sort_values(by=['district'], inplace=True)
    dataframe.set_index(['district'], inplace=True)
    dataframe.fillna(value=0, inplace=True)
    dataframe.columns = columns

    dataframe['Total'] = dataframe.sum(axis=1)

    dataframe.index.names = ["District"]

    # remove empty columns
    for column in columns:
        is_zero = True
        for num in (dataframe[column]):
            if num != 0: is_zero = False
        if is_zero:
            del dataframe[column]
    return dataframe.to_html()


def get_summary_by(name):
    item_list = set(Incident.objects.all().values_list(name, flat=True))

    sql2 = ", ".join(
        map(lambda c: "MAX(CASE WHEN (" + name + " = '%s') THEN 1 ELSE NULL END) AS '%s'" % (c, c), item_list))
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
                FROM incidents_incident
                GROUP BY id
            ) as items 
            WHERE items.id = incident.id
            GROUP BY incident.district
        """ % (sql1, sql2)

    return get_data_frame(sql, item_list)


def apply_style(html, title):
    html = """
        <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
        <html>
            <head>
                <style type="text/css">
                    @page {
                        size: A4 landscape;
                        margin: 2cm;
                    }
                    .dataframe{
                        text-align: center;
                        table-layout: fixed;
                        width: 100%%;
                        word-wrap: break-word;
                        writing-mode: vertical-rl;
                        text-orientation: upright;
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
                <div>
                <br>
                <p style="text-align:right;">
                Report Submitted by
                <br>
                <br>
                <br>
                ……………………………….
                <br>
                Election Complaints Management Committee
                </p>
                </div>
            </body>
        </html>
           """ % (title, html)

    return html
