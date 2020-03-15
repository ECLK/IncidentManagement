"""Reports"""

from django.db import connection
import pandas as pd
import numpy as np

from ..common.models import Category, Channel
from ..incidents.models import Incident
from ..incidents.services import get_incident_by_id
from .functions import get_detailed_report, get_general_report, encode_column_names, get_subcategory_report, \
    incident_type_query, incident_list_query, date_list_query, encode_value, get_subcategory_categorized_report
from ..common.data.Institutions import institutions
from ..custom_auth.models import Profile, Division

# To get the incident counts
def getIncidentCount():
    complaint_count_dict = {}
    complaint_past_24 = {}
    complaint_summary = {}

    date_from = datetime.datetime.now() - datetime.timedelta(days=1)
    # if complaintBasis == "national":
    division_ids = Division.object.filter(code__startswith="ec-", is_hq=True).values_list('', flat=True)
    user_ids = []

    for division in division_ids:
        user_ids_division = Profile.object.filter(division=division).values_list('user_id', flat=True) 
        user_ids.extend(user_ids_division)
        user_ids_division = None

    national_incidents = Incident.object.filter(created_by__in=user_ids)
    national_dispute_count = incidents.filter(category__startswith="A-").count()
    national_violation_of_law_count = Incident.object.filter(category__startswith="B-").count()
    national_other_complaints_count = Incident.object.filter(category__startswith="Other").count()
    national_t_amount = national_dispute_count + national_violtation_of_law_count + national_other_complaints_count

    national_incidents_24 = Incident.object.filter(created_by__in=user_ids, created_date__gte=date_from)
    national_dispute_count_24 = incidents.filter(category__startswith="A-").count()
    national_violation_of_law_count_24 = Incident.object.filter(category__startswith="B-").count()
    national_other_complaints_count_24 = Incident.object.filter(category__startswith="Other").count()
    national_t_amount_24 = national_dispute_count_24 + national_violtation_of_law_count_24 + national_other_complaints_count_24

    complaint_past_24["national"]["disputes"] = national_dispute_count_24
    complaint_past_24["national"]["violationOfLaws"] = national_violation_of_law_count_24
    complaint_past_24["national"]["others"] = national_other_complaints_count_24
    complaint_past_24["national"]["amount"] = national_t_amount_24

    complaint_summary["national"]["disputes"] = national_dispute_count
    complaint_summary["national"]["violationOfLaws"] = national_violation_of_law_count
    complaint_summary["national"]["others"] = national_other_complaints_count
    complaint_summary["national"]["amount"] = national_t_amount

    # elif complaintBasis == "district":
    district = {}
    district_24 = {}
    division_ids = Division.object.filter(code__startswith="ec-", is_hq=False).values_list('', flat=True)
    user_ids = []
    for division in division_ids:
        user_ids_division = Profile.object.filter(division=division).values_list('user_id', flat=True) 
        user_ids.extend(user_ids_division)
        user_ids_division = None
    district_incidents = Incident.object.filter(created_by__in=user_ids)
    district_dispute_count = incidents.filter(category__startswith="A-").count()
    district_violation_of_law_count = Incident.object.filter(category__startswith="B-").count()
    district_other_complaints_count = Incident.object.filter(category__startswith="Other").count()
    district_t_amount = district_dispute_count + district_violtation_of_law_count + district_other_complaints_count

    district_incidents_24 = Incident.object.filter(created_by__in=user_ids, created_date__gte=date_from)
    district_dispute_count_24 = incidents.filter(category__startswith="A-").count()
    district_violation_of_law_count_24 = Incident.object.filter(category__startswith="B-").count()
    district_other_complaints_count_24 = Incident.object.filter(category__startswith="Other").count()
    district_t_amount_24 = district_dispute_count_24 + district_violtation_of_law_count_24 + districtother_complaints_count_24

    complaint_past_24["district"]["disputes"] = district_dispute_count_24
    complaint_past_24["district"]["violationOfLaws"] = district_violation_of_law_count_24
    complaint_past_24["district"]["others"] = district_other_complaints_count_24
    complaint_past_24["district"]["amount"] = district_t_amount_24

    complaint_summary["district"]["disputes"] = district_dispute_count
    complaint_summary["district"]["violationOfLaws"] = district_violation_of_law_count
    complaint_summary["district"]["others"] = district_other_complaints_count
    complaint_summary["district"]["amount"] = district_t_amount

    # elif complaintBasis == "totals":
    complaint_past_24["totals"]["disputes"] = complaint_past_24["national"]["disputes"] + complaint_past_24["district"]["disputes"]
    complaint_past_24["totals"]["violationOfLaws"] = complaint_past_24["national"]["violationOfLaws"] + complaint_past_24["district"]["violationOfLaws"]
    complaint_past_24["totals"]["others"] = complaint_past_24["national"]["others"] + complaint_past_24["district"]["others"]
    complaint_past_24["totals"]["amount"] = complaint_past_24["national"]["amount"] + complaint_past_24["district"]["amount"]
            
    return complaint_past_24, complaint_summary


def get_slip_data(incident_id):
    incident = get_incident_by_id(incident_id)
    category = Category.objects.get(id=incident.category)

    template_dict = {}
    template_dict["template"] = "incidents/inquiry/inquiry_slip.js"
    template_dict["referenceNumber"] = incident.refId
    template_dict["date"] = "2020/03/05"
    template_dict["categoryCode"] = incident.category
    print(institutions[incident.institution]["name"])
    template_dict["categoryNameEn"] = category.sub_category
    template_dict["categoryNameSn"] = category.sn_sub_category
    template_dict["categoryNameTm"] = category.tm_sub_category
    template_dict["institutionName"] = institutions[incident.institution]["name"]
    return template_dict

def get_category_summary(start_date, end_date, detailed_report, complain, inquiry):
    sql3 = incident_type_query(complain, inquiry)
    incident_list = incident_list_query(start_date, end_date, sql3)
    if detailed_report:
        columns = list(set(Category.objects.all().values_list("top_category", flat=True)))
        columns.insert(0, "Unassigned")
        sql2 = ", ".join(
            map(lambda c: "(CASE WHEN ifnull(%s,'Unassigned') LIKE '%s' THEN 1 ELSE 0 END) AS '%s'" % (
                'top_category', c, encode_value(c)), columns))
        sql1 = """
                        SELECT district,
                                   %s
                                  ,
                                  1       AS Total
                           FROM   incidents_incident
                           LEFT JOIN common_category ON category=common_category.id
                           %s
                        """ % (sql2, incident_list)
        columns = encode_column_names(columns)
        return get_detailed_report(sql1, columns)
    return get_general_report("top_category", "Category", "common_category", "category", "id", start_date, end_date,
                              sql3)


def get_subcategory_summary(start_date, end_date, detailed_report, complain, inquiry):
    sql3 = incident_type_query(complain, inquiry)
    incident_list = incident_list_query(start_date, end_date, sql3)
    if detailed_report:
        tables = ""
        for category in list(Category.objects.order_by().values_list("top_category", flat=True).distinct()):
            tables += "<br><br><br><br>" + (get_subcategory_categorized_report(incident_list, category))
        return tables
    return get_subcategory_report("sub_category", "Subcategory", "common_category", "category", "id", start_date,
                                  end_date, sql3)


def get_mode_summary(start_date, end_date, detailed_report, complain, inquiry):
    sql3 = incident_type_query(complain, inquiry)
    incident_list = incident_list_query(start_date, end_date, sql3)
    if detailed_report:
        columns = list(set(Channel.objects.all().values_list("name", flat=True)))
        columns.insert(0, "Unassigned")
        sql2 = ", ".join(
            map(lambda c: "(CASE WHEN ifnull(%s,'Unassigned') LIKE '%s' THEN 1 ELSE 0 END) AS '%s'" % (
                'name', c, encode_value(c)), columns))
        sql1 = """
                SELECT district,
                           %s
                          ,
                          1       AS Total
                   FROM   incidents_incident
                   LEFT JOIN common_channel ON infoChannel=common_channel.id
                   %s
                """ % (sql2, incident_list)
        columns = encode_column_names(columns)
        return get_detailed_report(sql1, columns)
    return get_general_report("name", "Mode", "common_channel", "infoChannel", "id", start_date, end_date, sql3)


def get_incident_date_summary(start_date, end_date, detailed_report, complain, inquiry):
    sql3 = incident_type_query(complain, inquiry)
    incident_list = incident_list_query(start_date, end_date, sql3)
    sql = """
            SELECT incident_date as 'Incident Date',
       Total
FROM   (SELECT incident_date,
               Sum(Total) AS Total
        FROM   (SELECT Date_format(occured_date + INTERVAL 8 HOUR, '%s')
                       AS
                       incident_date
                               ,
                       '1'
                               AS Total
                FROM   incidents_incident
                %s
                UNION ALL
                SELECT selected_date,
                       '0'
                FROM   (%s) AS dateranges) AS result
        GROUP  BY result.incident_date
        ORDER  BY incident_date) AS result2
UNION
SELECT '(Total No. of Incidents)',
       Count(id)
FROM   incidents_incident
%s
            """ % (
        "%Y-%m-%d", incident_list, date_list_query(start_date, end_date), incident_list)
    dataframe = pd.read_sql_query(sql, connection)
    dataframe = dataframe.fillna(0)
    return dataframe.to_html(index=False)


def get_district_summary(start_date, end_date, detailed_report, complain, inquiry):
    sql3 = incident_type_query(complain, inquiry)
    return get_general_report("name", "District", "common_district", "district", "code", start_date, end_date, sql3)


def get_severity_summary(start_date, end_date, detailed_report, complain, inquiry):
    sql3 = incident_type_query(complain, inquiry)
    incident_list = incident_list_query(start_date, end_date, sql3)
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
           %s
        """ % incident_list
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
                            %s
                            GROUP BY currentstate) AS incidents
         ON        currentstate = d.name
         UNION ALL
        SELECT '(Total No. of Incidents)',
               Count(id)
        FROM   incidents_incident
        %s
        ORDER  BY Field(Severity, 'High', 'Medium', 'Low', '(Total No. of Incidents)')
    """ % (incident_list, incident_list)
    dataframe = pd.read_sql_query(sql, connection)
    dataframe = dataframe.fillna(0)
    return dataframe.to_html(index=False)


def get_status_summary(start_date, end_date, detailed_report, complain, inquiry):
    sql3 = incident_type_query(complain, inquiry)
    incident_list = incident_list_query(start_date, end_date, sql3)
    if detailed_report:
        sql1 = """
        SELECT district,(
               CASE WHEN Ifnull(current_status, 'Unassigned') LIKE 'CLOSED' THEN 1 ELSE 0 END )AS Resolved,
               (CASE WHEN Ifnull(current_status, 'Unassigned')  NOT LIKE 'CLOSED' THEN 1 ELSE 0 END )AS Unresolved,
                             1 AS Total
                      FROM   incidents_incident
                     %s
        """ % incident_list
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
                                   END )                          AS currentState,
                                 Count(Ifnull(current_status, 1)) AS subtotal
                          FROM   incidents_incident
                          %s
                          GROUP  BY currentstate) AS incidents
                      ON currentstate = d.name
        UNION ALL
        SELECT '(Total No. of Incidents)',
               Count(id)
        FROM   incidents_incident
        %s
        ORDER  BY Field(status, 'Resolved', 'Unresolved', '(Total No. of Incidents)')
    """ % (incident_list, incident_list)
    dataframe = pd.read_sql_query(sql, connection)
    dataframe = dataframe.fillna(0)
    return dataframe.to_html(index=False)


def get_police_division_summary():
    sql = """
          SELECT
            incident.province,
            incident.di_division,
            incident.police_division,
            COUNT(incident.police_station) AS police_station_count,
            COUNT(incident.id) AS division_total,
            COUNT(CASE WHEN cs.current_status <> "CLOSED" THEN 1 ELSE NULL END) AS open_total,
            COUNT(CASE WHEN cs.current_status = "CLOSED" THEN 1 ELSE NULL END) AS closed_total
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
          ) AS cs
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
