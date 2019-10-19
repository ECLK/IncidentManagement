from django.db import connection
import pandas as pd
from ..reporting.models import SeveritySegment
from ..common.models import Category


def incident_type_title(complain, inquiry):
    if complain and inquiry:
        return "(Complaints and Inquiries)"
    if complain:
        return "(Complaints Only)"
    if inquiry:
        return "(Inquiries Only)"
    return ""


def incident_type_query(complain, inquiry):
    if complain and inquiry:
        return "(incidents_incident.incidentType LIKE 'COMPLAINT' OR incidents_incident.incidentType LIKE 'INQUIRY')"
    if complain:
        return "incidents_incident.incidentType LIKE 'COMPLAINT'"
    if inquiry:
        return "incidents_incident.incidentType LIKE 'INQUIRY'"
    return "(incidents_incident.incidentType LIKE 'COMPLAINT' OR incidents_incident.incidentType LIKE 'INQUIRY')"


def incident_list_query(start_date, end_date, incident_type):
    return """WHERE  incidents_incident.created_date BETWEEN CONVERT_TZ('%s','+05:30','+00:00') AND
                                                                   CONVERT_TZ('%s','+05:30','+00:00') AND %s""" % (
        start_date, end_date, incident_type)


def get_data_frame(sql, columns):
    dataframe = pd.read_sql_query(sql, connection)

    dataframe.sort_values(by=['district'], inplace=True)
    dataframe.set_index(['district'], inplace=True)
    dataframe.fillna(value=0, inplace=True)
    dataframe.columns = columns

    dataframe['Total'] = dataframe.sum(axis=1)

    dataframe.index.names = ["District"]

    return dataframe.to_html()


def get_subcategory_categorized_report(incident_list, category_name):
    columns = list(Category.objects.filter(top_category__exact=category_name).values_list("sub_category", flat=True))
    columns.insert(0, "Unassigned")
    sql = ", ".join(
        map(lambda c: "(CASE WHEN ifnull(%s,'Unassigned') LIKE '%s' THEN 1 ELSE 0 END) AS '%s'" % (
            'sub_category', c, encode_value(c)), columns))
    sql1 = """
                                    SELECT district,
                                               %s
                                              ,
                                              1       AS Total
                                       FROM   incidents_incident
                                       LEFT JOIN common_category ON category=common_category.id
                                       %s AND top_category LIKE '%s'
                                    """ % (sql, incident_list, category_name)
    columns = encode_column_names(columns)
    return """<b>Category: %s</b>""" % category_name + get_detailed_report(sql1, columns)


def get_subcategory_report(field_name, field_label, field_table, count_field, map_field, start_date, end_date,
                           incident_type):
    incident_list = incident_list_query(start_date, end_date, incident_type)
    sql = """
            SELECT %s, Total FROM (SELECT %s,
                   Sum(Total) AS Total
            FROM   (SELECT ifnull(concat(top_category,' -> ',%s), '(Unassigned)') AS %s,
                           Sum(Total)                 AS Total
                    FROM   %s AS d
                           RIGHT JOIN (SELECT %s,
                                              '1' AS Total
                                       FROM   incidents_incident
                                       %s) AS
                                      incidents
                                   ON incidents.%s = d.%s
                    GROUP  BY incidents.%s
                    UNION ALL
                    SELECT concat(top_category,' -> ',sub_category)  AS %s,
                           '0'
                    FROM   %s) AS result
            GROUP  BY result.%s
            ORDER  BY Field(%s, '(Unassigned)') DESC,Total DESC) as result2
            UNION
            SELECT '(Total No. of Incidents)',
                   Count(id)
            FROM   incidents_incident
           %s
           
        """ % (
        field_label, field_label, field_name, field_label, field_table, count_field, incident_list, count_field,
        map_field, count_field, field_name, field_table, field_label, field_label, incident_list)
    dataframe = pd.read_sql_query(sql, connection)
    dataframe = dataframe.fillna(0)
    return dataframe.to_html(index=False)


def get_general_report(field_name, field_label, field_table, count_field, map_field, start_date, end_date,
                       incident_type):
    incident_list = incident_list_query(start_date, end_date, incident_type)
    sql = """
            SELECT %s, Total FROM (SELECT %s,
                   Sum(Total) AS Total
            FROM   (SELECT Ifnull(%s, '(Unassigned)') AS %s,
                           Sum(Total)                 AS Total
                    FROM   %s AS d
                           RIGHT JOIN (SELECT %s,
                                              '1' AS Total
                                       FROM   incidents_incident
                                       %s) AS
                                      incidents
                                   ON incidents.%s = d.%s
                    GROUP  BY incidents.%s
                    UNION ALL
                    SELECT %s,
                           '0'
                    FROM   %s) AS result
            GROUP  BY result.%s
            ORDER  BY Field(%s,'(Unassigned)') DESC,Total DESC) as result2
            UNION
            SELECT '(Total No. of Incidents)',
                   Count(id)
            FROM   incidents_incident
            %s
        """ % (
        field_label, field_label, field_name, field_label, field_table, count_field, incident_list, count_field,
        map_field, count_field, field_name, field_table, field_label, field_label, incident_list)
    dataframe = pd.read_sql_query(sql, connection)
    dataframe = dataframe.fillna(0)
    return dataframe.to_html(index=False)


def get_detailed_report(sql1, columns):
    sql2 = ", ".join(map(lambda c: "Sum(%s) AS %s" % (c, c), columns))
    sql3 = ", ".join(map(lambda c: "%s" % c, columns))
    sql4 = ", ".join(map(lambda c: "'0'", columns))
    sql = """
            SELECT District,
                    %s
                   ,
                   Total
            FROM   (SELECT District,
                           %s,
                           Sum(Total)  AS Total
                    FROM   (SELECT Ifnull(name, '(Unassigned)') AS District,
                                   %s,
                                   Sum(Total)                   AS Total
                            FROM   common_district AS d
                                   RIGHT JOIN (%s) AS
                                              incidents
                                           ON incidents.district = d.code
                            GROUP  BY incidents.district
                            UNION ALL
                            SELECT name,
                                   %s,
                                   '0'
                            FROM   common_district) AS result
                    GROUP  BY result.District
                    ORDER  BY Total DESC) AS result2
            UNION ALL
            SELECT '(Total No. of Incidents)',
                   %s,
                   Sum(Total)
            FROM   (%s)
                   AS
                   result3 
        """ % (sql3, sql2, sql2, sql1, sql4, sql2, sql1)
    dataframe = pd.read_sql_query(sql, connection)
    dataframe = dataframe.fillna(0)
    return dataframe.to_html(index=False)


def encode_value(text):
    text = text.replace(' ', '_') \
        .replace('/', '__') \
        .replace('.', '___') \
        .replace(',', '____') \
        .replace('(', '$') \
        .replace(')', '$$')
    return text


def encode_column_names(columns):
    columns = [encode_value(name) for name in columns]
    return columns


def decode_column_names(text):
    return text.replace("$$", ")", -1) \
        .replace("$", "(", -1) \
        .replace("____", ", ", -1) \
        .replace("___", ".", -1) \
        .replace("__", "/", -1) \
        .replace("_", " ", -1)


def apply_style(html, title, incident_type, layout, total):
    html = """
        <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
        <html>
            <head>
                <style type="text/css">
                    @page {
                        size: %s;
                        margin: 2cm;
                    }
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
                <h1 align=center>No. of incidents reported within the period %s <br>%s</h1>
                <div>
                    %s
                </div>
                <div>
                <br>
                <p>
                Total No. of Incidents Reported %s : %s
                </p>
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
           """ % (layout, incident_type, title, html, incident_type, total)
    return html


def date_list_query(start_date, end_date):
    return """
    SELECT * 
                        FROM   (SELECT Adddate('2018-01-01', 
                                       t4.i * 10000 + t3.i * 1000 
                                       + 
                                       t2.i * 100 + 
                                               t1.i * 10 + 
                                       t0.i) selected_date 
                                FROM   (SELECT 0 i 
                                        UNION 
                                        SELECT 1 
                                        UNION 
                                        SELECT 2 
                                        UNION 
                                        SELECT 3 
                                        UNION 
                                        SELECT 4 
                                        UNION 
                                        SELECT 5 
                                        UNION 
                                        SELECT 6 
                                        UNION 
                                        SELECT 7 
                                        UNION 
                                        SELECT 8 
                                        UNION 
                                        SELECT 9) t0, 
                                       (SELECT 0 i 
                                        UNION 
                                        SELECT 1 
                                        UNION 
                                        SELECT 2 
                                        UNION 
                                        SELECT 3 
                                        UNION 
                                        SELECT 4 
                                        UNION 
                                        SELECT 5 
                                        UNION 
                                        SELECT 6 
                                        UNION 
                                        SELECT 7 
                                        UNION 
                                        SELECT 8 
                                        UNION 
                                        SELECT 9) t1, 
                                       (SELECT 0 i 
                                        UNION 
                                        SELECT 1 
                                        UNION 
                                        SELECT 2 
                                        UNION 
                                        SELECT 3 
                                        UNION 
                                        SELECT 4 
                                        UNION 
                                        SELECT 5 
                                        UNION 
                                        SELECT 6 
                                        UNION 
                                        SELECT 7 
                                        UNION 
                                        SELECT 8 
                                        UNION 
                                        SELECT 9) t2, 
                                       (SELECT 0 i 
                                        UNION 
                                        SELECT 1 
                                        UNION 
                                        SELECT 2 
                                        UNION 
                                        SELECT 3 
                                        UNION 
                                        SELECT 4 
                                        UNION 
                                        SELECT 5 
                                        UNION 
                                        SELECT 6 
                                        UNION 
                                        SELECT 7 
                                        UNION 
                                        SELECT 8 
                                        UNION 
                                        SELECT 9) t3, 
                                       (SELECT 0 i 
                                        UNION 
                                        SELECT 1 
                                        UNION 
                                        SELECT 2 
                                        UNION 
                                        SELECT 3 
                                        UNION 
                                        SELECT 4 
                                        UNION 
                                        SELECT 5 
                                        UNION 
                                        SELECT 6 
                                        UNION 
                                        SELECT 7 
                                        UNION 
                                        SELECT 8 
                                        UNION 
                                        SELECT 9) t4) v 
                        WHERE  selected_date BETWEEN 
                               Date_format(CONVERT_TZ('%s','+05:30','+00:00'), 
                               '%s' 
                               ) 
                               AND 
                               Date_format(CONVERT_TZ('%s','+05:30','+00:00'), 
                               '%s'
                               )
    """ % (start_date, "%Y-%m-%d", end_date, "%Y-%m-%d")
