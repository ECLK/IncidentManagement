"""Reports"""

from django.db import connection
import pandas as pd
import numpy as np

from ..common.models import Category, Channel
from ..incidents.models import Incident
from .functions import get_detailed_report, get_general_report, encode_column_names, get_subcategory_report


def get_category_summary(start_date, end_date, detailed_report):
    if detailed_report:
        columns = set(Category.objects.all().values_list("top_category", flat=True))
        columns = encode_column_names(columns)
        columns.insert(0, "Unassigned")
        sql2 = ", ".join(
            map(lambda c: "(CASE WHEN ifnull(%s,'Unassigned') LIKE '%s' THEN 1 ELSE 0 END) AS '%s'" % (
                'top_category', c, c), columns))
        sql1 = """
                        SELECT district,
                                   %s
                                  ,
                                  1       AS Total
                           FROM   incidents_incident
                           left join common_category on category=common_category.id
                           WHERE  incidents_incident.created_date BETWEEN
                                  '%s' AND
                                  '%s'
                        """ % (sql2, start_date, end_date)
        return get_detailed_report(sql1, columns)
    return get_general_report("top_category", "Category", "common_category", "category", "id", start_date, end_date)


def get_subcategory_summary(start_date, end_date, detailed_report):
    if detailed_report:
        columns = set(Category.objects.all().values_list("sub_category", flat=True))
        columns = encode_column_names(columns)
        columns.insert(0, "Unassigned")
        sqls = ", ".join(
            map(lambda c: "(CASE WHEN ifnull(%s,'Unassigned') LIKE '%s' THEN 1 ELSE 0 END) AS '%s'" % (
                'sub_category', c, c), columns))
        sql1 = """
                                SELECT district,
                                           %s
                                          ,
                                          1       AS Total
                                   FROM   incidents_incident
                                   left join common_category on category=common_category.id
                                   WHERE  incidents_incident.created_date BETWEEN
                                          '%s' AND
                                          '%s'
                                """ % (sqls, start_date, end_date)
        return get_detailed_report(sql1, columns)
    return get_subcategory_report("sub_category", "Subcategory", "common_category", "category", "id", start_date, end_date)


def get_mode_summary(start_date, end_date, detailed_report):
    if detailed_report:
        columns = set(Channel.objects.all().values_list("name", flat=True))
        columns = encode_column_names(columns)
        columns.insert(0, "Unassigned")
        sql2 = ", ".join(
            map(lambda c: "(CASE WHEN ifnull(%s,'Unassigned') LIKE '%s' THEN 1 ELSE 0 END) AS '%s'" % (
                'name', c, c), columns))
        sql1 = """
                SELECT district,
                           %s
                          ,
                          1       AS Total
                   FROM   incidents_incident
                   left join common_channel on infoChannel=common_channel.id
                   WHERE  incidents_incident.created_date BETWEEN
                          '%s' AND
                          '%s'
                """ % (sql2, start_date, end_date)
        print(sql1)
        return get_detailed_report(sql1, columns)
    return get_general_report("name", "Mode", "common_channel", "infoChannel", "id", start_date, end_date)


def get_incident_date_summary(start_date, end_date, detailed_report):
    sql = """
            SELECT incident_date as 'Incident Date', 
       Total 
FROM   (SELECT incident_date, 
               Sum(Total) AS Total 
        FROM   (SELECT Date_format(occured_date + INTERVAL 8 hour, '%s') 
                       AS 
                       incident_date 
                               , 
                       '1' 
                               AS Total 
                FROM   incidents_incident 
                WHERE  incidents_incident.created_date BETWEEN 
                       '%s' AND '%s' 
                UNION ALL 
                SELECT selected_date, 
                       '0' 
                FROM   (SELECT * 
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
                               Date_format('%s', 
                               '%s' 
                               ) 
                               AND 
                               Date_format('%s', 
                               '%s' 
                               )) AS dateranges) AS result 
        GROUP  BY result.incident_date 
        ORDER  BY incident_date) AS result2 
UNION 
SELECT '(Total No. of Incidents)', 
       Count(id) 
FROM   incidents_incident 
WHERE  incidents_incident.created_date BETWEEN 
       '%s' AND '%s' 
            """ % ("%Y-%m-%d",start_date, end_date, start_date,"%Y-%m-%d", end_date,"%Y-%m-%d", start_date, end_date)
    dataframe = pd.read_sql_query(sql, connection)
    dataframe = dataframe.fillna(0)
    return dataframe.to_html(index=False)


def get_district_summary(start_date, end_date, detailed_report):
    return get_general_report("name", "District", "common_district", "district", "code", start_date, end_date)


def get_severity_summary(start_date, end_date, detailed_report):
    if detailed_report:
        sql1 = """
        SELECT district,
                  ( CASE
                      WHEN Ifnull(severity, 0) > 7 THEN
                      1
                      ELSE 0
                    end ) AS High,
                  ( CASE
                      WHEN Ifnull(severity, 0) > 3
                           AND Ifnull(severity, 0) < 8
                    THEN 1
                      ELSE 0
                    end ) AS Medium,
                  ( CASE
                      WHEN Ifnull(severity, 0) < 4 THEN
                      1
                      ELSE 0
                    end ) AS Low,
                  1       AS Total
           FROM   incidents_incident
           WHERE  incidents_incident.created_date BETWEEN
                  '%s' AND
                  '%s'
        """ % (start_date, end_date)
        columns = ["High", "Medium", "Low"]
        return get_detailed_report(sql1, columns)

    # if general report
    sql = """ # if general report
         SELECT    Ifnull(name,'Unassigned') AS Severity,
                   Ifnull(subtotal,0)        AS Total
         FROM      reporting_severitysegment AS d
         LEFT JOIN
                   (
                            SELECT   (
                                     CASE
                                              WHEN severity > 7 THEN 'High'
                                              WHEN severity > 3 THEN 'Medium'
                                              ELSE 'Low'
                                     END)                                           AS currentstate,
                                     Count(Ifnull(incidents_incident.severity,0)) AS subtotal
                            FROM     incidents_incident
                            WHERE    incidents_incident.created_date BETWEEN '%s' AND      '%s'
                            GROUP BY currentstate) AS incidents
         ON        currentstate = d.name 
         UNION ALL
        SELECT '(Total No. of Incidents)',
               Count(id)
        FROM   incidents_incident
        WHERE  incidents_incident.created_date BETWEEN '%s' AND '%s'
        ORDER  BY Field(Severity, 'High', 'Medium', 'Low', '(Total No. of Incidents)') 
    """ % (start_date, end_date, start_date, end_date)
    dataframe = pd.read_sql_query(sql, connection)
    dataframe = dataframe.fillna(0)
    return dataframe.to_html(index=False)


def get_status_summary(start_date, end_date, detailed_report):
    if detailed_report:
        sql1 = """
        SELECT district,( 
               CASE WHEN Ifnull(current_status, 'Unassigned') LIKE 'CLOSED' THEN 1 ELSE 0 END )AS Resolved,
               (CASE WHEN Ifnull(current_status, 'Unassigned')  NOT LIKE 'CLOSED' THEN 1 ELSE 0 END )AS Unresolved,
                             1 AS Total
                      FROM   incidents_incident
                      WHERE  incidents_incident.created_date BETWEEN '%s' AND
                                                  '%s'
        """ % (start_date, end_date)
        columns = ["Resolved", "Unresolved"]
        return get_detailed_report(sql1, columns)

    # if general report
    sql = """
        SELECT name                  AS Status,
               Ifnull(subtotal, '0') AS Total
        FROM   reporting_statussegment AS d
               LEFT JOIN (SELECT ( CASE
                                     WHEN Ifnull(current_status, 'Unassigned') LIKE
                                          'CLOSED'
                                                                       THEN
                                     'Resolved'
                                     ELSE 'Unresolved'
                                   end )                          AS currentState,
                                 Count(Ifnull(current_status, 1)) AS subtotal
                          FROM   incidents_incident
                          WHERE  incidents_incident.created_date BETWEEN '%s' AND
                                                      '%s'
                          GROUP  BY currentstate) AS incidents
                      ON currentstate = d.name
        UNION ALL
        SELECT '(Total No. of Incidents)',
               Count(id)
        FROM   incidents_incident
        WHERE  incidents_incident.created_date BETWEEN '%s' AND '%s'
        ORDER  BY Field(status, 'Resolved', 'Unresolved', '(Total No. of Incidents)') 
    """ % (start_date, end_date, start_date, end_date)
    dataframe = pd.read_sql_query(sql, connection)
    dataframe = dataframe.fillna(0)
    return dataframe.to_html(index=False)


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
