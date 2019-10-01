from django.db import connection
import pandas as pd
from ..reporting.models import SeveritySegment


def get_data_frame(sql, columns):
    dataframe = pd.read_sql_query(sql, connection)

    dataframe.sort_values(by=['district'], inplace=True)
    dataframe.set_index(['district'], inplace=True)
    dataframe.fillna(value=0, inplace=True)
    dataframe.columns = columns

    dataframe['Total'] = dataframe.sum(axis=1)

    dataframe.index.names = ["District"]

    return dataframe.to_html()


def get_general_report(field_name, field_label, field_table, count_field, map_field, start_date, end_date):
    sql = """(SELECT IFNULL(%s,'Unassigned') AS %s, IFNULL(COUNT(incidents.%s),'0') AS Total FROM %s as d 
        LEFT JOIN (select %s from incidents_incident 
        where occured_date BETWEEN '%s' 
        AND '%s') as incidents ON incidents.%s = d.%s 
        group by %s order by Total DESC) as finalResult""" % (
        field_name, field_label, count_field, field_table, count_field, start_date, end_date, count_field, map_field,
        field_name)
    sql1 = """
        select %s,Total from %s union
        select '', Sum(Total) from %s
            """ % (field_label, sql, sql)
    dataframe = pd.read_sql_query(sql1, connection)
    return dataframe.to_html(index=False)


def get_detailed_severity_report(start_date, end_date):
    sql = """
            select common_district.name as District,
            ifnull(High,'0') as High,ifnull(Medium,'0') as Medium,ifnull(Low,'0')as Low,ifnull(Total,'0') as Total 
            from common_district left join(
            select ifnull(name,'Unassigned') as District, sum(High) as High,sum(Medium) as Medium, sum(Low) as Low, 
            sum(High+Medium+Low) as Total from (
            SELECT district,(CASE WHEN (severity = 'High') THEN 1 ELSE 0 END) AS 'High', 
            (CASE WHEN (severity = 'Low') THEN 1 ELSE 0 END) AS 'Low', (CASE WHEN (severity = 'Medium') THEN 1 ELSE 0 
            END) AS 'Medium' FROM (select district,(CASE WHEN severity > 7 THEN 'High' WHEN severity > 3 
            THEN 'Medium' ELSE 'Low' END) as severity from incidents_incident where occured_date between '%s' and '%s') as incidents) as table1 
            left join common_district on district=common_district.code GROUP BY table1.district) as total_table 
            on common_district.name=total_table.District
            where common_district.name not like 'NONE' order by Total DESC
        """ % (start_date, end_date)
    dataframe = pd.read_sql_query(sql, connection)
    return dataframe.to_html(index=False)


def get_summary_by(entity, name, table_name, table_field, start_date, end_date):
    item_list = set(entity.objects.all().values_list(name, flat=True))

    sql2 = ", ".join(
        map(lambda c: "0" if c is None else "MAX(CASE WHEN (%s = '%s') THEN 1 ELSE NULL END) AS '%s'" % (
            name, c, c), item_list))
    sql1 = ", ".join(map(lambda c: "0" if c is None else "COUNT(items.`%s`) as '%s'" % (c, c), item_list))

    sql = """
            SELECT 
                    IFNULL(d.name,"Unassigned") as district,
                    %s
                FROM incidents_incident incident LEFT JOIN common_district d 
                ON incident.district = d.code,
            ( 
                SELECT
                id,
                %s
                FROM %s
                GROUP BY id
            ) as items 
            WHERE items.id LIKE %s 
            AND occured_date BETWEEN '%s' AND '%s' 
            GROUP BY incident.district
        """ % (sql1, sql2, table_name, table_field, start_date, end_date)

    return get_data_frame(sql, item_list)


def apply_style(html, title, subtitle):
    html = """
        <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
        <html>
            <head>
                <style type="text/css">
                    @page {
                        size: A4 portrait;
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
                        text-align: center;
                        padding-top: 5px;
                        margin-left: 5px;
                    }

                    .dataframe thead th{
                        padding-top: 5px;
                    }
                </style>
            </head>
            <body>
                <h1 align=center>%s</h1>
                <h2 align=center>%s</h2>
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
           """ % (title, subtitle, html)

    return html
