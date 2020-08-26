"""Reports"""

from django.db import connection
import pandas as pd
import numpy as np
from datetime import date, timedelta, datetime
from django.db.models import Q
from django.db.models import Count
from django.core.exceptions import ObjectDoesNotExist
from django.utils.timezone import localtime
from django.utils.html import strip_tags

from ..common.models import Category, Channel, District
from ..incidents.models import Incident, IncidentType, severity_dict, IncidentComment
from ..custom_auth.models import Organization, Division, Profile
from django.contrib.auth.models import User

from ..common.serializers import ChannelSerializer, DistrictSerializer, CategorySerializer

from ..incidents.services import get_incident_by_id

from .functions import get_detailed_report, get_general_report, encode_column_names, get_subcategory_report, \
    incident_type_query, incident_list_query, date_list_query, encode_value, get_subcategory_categorized_report
from ..common.data.Institutions import institutions
from django.conf import settings
import collections, functools, operator

def get_start_and_end_datetime_for_daily_reports(report_date=False):
    """
    function to return start and end datetime in datetime format with settings timezone

    Parameters:
        report_date (datetime): given date for the report.

    Returns(tuple):
        start_datetime (datetime): a day before at 4pm, to the given date
        end_datetime (datetime): given date at 4pm
    """

    # localtime is called here to get date object with timezone set by the settings.py
    if report_date:
        localtimeValue = localtime().replace(year=report_date.year, month=report_date.month, day=report_date.day)
    else:
        # if report is not given will use current date and time
        localtimeValue = localtime()
    start_datetime = (localtimeValue - timedelta(days=1)).replace(hour=16, minute=00)
    end_datetime = localtimeValue.replace(hour=15, minute=59)

    return start_datetime, end_datetime

def get_daily_incidents(incident_type, report_date=False):
    """
    List dialy incidents to the given incident-type.
    Daily incidents concidered in election commission is, incidents logged from yesterday 4pm to today 4pm.

    Parameters:
        incident_type (str): Complaint or Inquiry
        report_date (datetime): Given datetime

    Returns:
        incidents (Incident): incidents derived from Incident Model
    """

    # get start and end datetimes
    start_datetime, end_datetime = get_start_and_end_datetime_for_daily_reports(report_date)
    incidents = Incident.objects.all().filter(incidentType=incident_type, election=settings.ELECTION, created_date__range=(start_datetime, end_datetime))
    return incidents

def map_category(cat_voilence, cat_law, cat_other, total_list):
    totals = {
        "disputes": 0,
        "violationOfLaws": 0,
        "others": 0,
        "amount": 0
    }

    for total in total_list:
        key = Category.objects.get(id=total["category"])
        val = total["category__count"]

        if key in cat_voilence:
            totals["disputes"] += val

        if key in cat_law:
            totals["violationOfLaws"] += val

        if key in cat_other:
            totals["others"] += val

        totals["amount"] += val

    return totals

def map_severity(total_list):
    totals = {
        "minor": 0,
        "general": 0,
        "major": 0,
        "total": 0
    }

    for total in total_list:
        key = total["severity"]
        val = total["severity__count"]

        # severity = 0 is unset
        if key >= 0 and key <= 3:
            totals["minor"] += val

        elif key > 3 and key <= 7:
            totals["general"] += val

        elif key > 7:
            totals["major"] += val

        totals["total"] += val

    return totals

def get_daily_incident_detail_list(report_request_data):
    file_dict = {}
    file_dict["template"] = "incidents/complaints/full_summary_report.js"

    report_date = date.fromisoformat(report_request_data['date'])
    file_dict["date"] = report_date.strftime("%Y/%m/%d")
    file_dict["dateInfo"] = (report_date - timedelta(days=1)).strftime("%Y/%m/%d") + " 4:00pm - " + report_date.strftime("%Y/%m/%d") + " 4:00pm"

    incidents = get_daily_incidents(IncidentType.COMPLAINT, report_date)

    #TODO: add filter by condition on request here
    # EC HQ incidents
    ec_hq = Division.objects.get(is_default_division=True)
    incidents = filter_incidents_by_division(incidents, ec_hq)

    incident_list = []
    for incident in incidents:
        incident_dict = {}
        incident_dict["complaintNo"] = incident.refId

        # channel data
        incident_dict["channelLtr"] = ""
        incident_dict["channelTel"] = ""
        incident_dict["channelFax"] = ""
        incident_dict["channelMail"] = ""
        channel = ChannelSerializer(Channel.objects.get(id=incident.infoChannel)).data["name"]
        if channel == "Letter":
            incident_dict["channelLtr"] = "x"
        elif channel == "Telephone":
            incident_dict["channelTel"] = "x"
        elif channel == "Fax":
            incident_dict["channelFax"] = "x"
        elif channel == "Email":
            incident_dict["channelMail"] = "x"

        incident_dict["complaintDate"] = localtime(incident.created_date).strftime("%Y/%m/%d")
        incident_dict["reporter"] = incident.reporter.name

        # location = location + district
        incident_dict["location"] = incident.location+" - " if len(incident.location) else ""
        incident_dict["location"] += DistrictSerializer(District.objects.get(code=incident.district)).data["name"]

        incident_dict["complainSummery"] = incident.description

        # category data
        incident_dict["violentAction"] = ""
        incident_dict["violationOfElectionLaw"] = ""
        incident_dict["other"] = ""
        category_serializer = CategorySerializer(Category.objects.get(id=incident.category))
        if category_serializer.data["top_category"] == "Violence":
            incident_dict["violentAction"] = category_serializer.data["code"]
        elif category_serializer.data["top_category"] == "Violation of election law":
            incident_dict["violationOfElectionLaw"] = category_serializer.data["code"]
        else:
            incident_dict["other"] = category_serializer.data["code"]

        severity = severity_dict[str(incident.severity)]
        incident_dict["law"] = ""
        incident_dict["medium"] = ""
        incident_dict["critical"] = ""
        if severity == "Low":
            incident_dict["law"] = "x"
        elif severity == "Medium":
            incident_dict["medium"] = "x"
        else:
            incident_dict["critical"] = "x"

        # get last assignment comment
        incident_dict["reportedParty"] = "-"
        incident_dict["progress"] = "-"
        comment = get_incident_assignment_comment(incident.id)
        if (comment):
            incident_dict["reportedParty"] = comment[0]
            incident_dict["progress"] = comment[1]

        incident_list.append(incident_dict)

    file_dict["complaints"] = incident_list

    return file_dict

def get_incident_assignment_comment(id):
    incident = Incident.objects.get(id=id)
    comment = IncidentComment.objects.filter(Q(incident=incident) & Q(body__contains="---")).order_by("-created_date").first()

    # check if there's any comment for the incident
    if comment != None:
        stripped = strip_tags(comment.body)
        return stripped.split('---')
    else:
        return comment


def get_daily_summary_data(report_request_data):
    """ Function to get daily summary data on complaints for PDF export. """
    file_dict = {}

    file_dict["template"] = "incidents/complaints/daily_summary_report.js"
    report_date = date.fromisoformat(report_request_data['date'])
    file_dict["date"] = report_date.strftime("%Y/%m/%d")
    file_dict["dateInfo"] = (report_date - timedelta(days=1)).strftime("%Y/%m/%d") + " 4:00pm - " + report_date.strftime("%Y/%m/%d") + " 4:00pm"

    # preload categories
    cat_voilence = Category.objects.all().filter(top_category='Violence')
    cat_law = Category.objects.all().filter(top_category='Violation of election law')
    cat_other = Category.objects.all().filter(top_category='Other')

    # get start and end datetime
    start_datetime, end_datetime = get_start_and_end_datetime_for_daily_reports(report_date)

    # get all incidents only upto 4pm today
    initial_datetime = end_datetime - timedelta(weeks=40)
    incidents = Incident.objects.all().filter(incidentType=IncidentType.COMPLAINT.name, election=settings.ELECTION, created_date__range=(initial_datetime, end_datetime))

    # find eclk complaints
    eclk_users = User.objects.filter(profile__organization__code="eclk")
    eclk_hq_users = eclk_users.filter(profile__division__is_hq=True)
    eclk_district_users = eclk_users.filter(profile__division__is_hq=False)

    # filter incidents by created
    eclk_incidents = incidents.filter(created_by__in=eclk_users)
    eclk_hq_incidents = incidents.filter(created_by__in=eclk_hq_users)
    eclk_district_incidents = incidents.filter(created_by__in=eclk_district_users)

    # second table of the template
    # for total summary
    file_dict["complaintsSummary"] = {
        "national": map_category(cat_voilence, cat_law, cat_other, eclk_hq_incidents.values('category').annotate(Count("category")).order_by()),
        "district": map_category(cat_voilence, cat_law, cat_other, eclk_district_incidents.values('category').annotate(Count("category")).order_by()),
        "totals": map_category(cat_voilence, cat_law, cat_other, eclk_incidents.values('category').annotate(Count("category")).order_by())
    }

    # first table of the template
    # past 24 hours
    eclk_incidents = eclk_incidents.filter(created_date__range=(start_datetime, end_datetime))
    eclk_hq_incidents = eclk_hq_incidents.filter(created_date__range=(start_datetime, end_datetime))
    eclk_district_incidents = eclk_district_incidents.filter(created_date__range=(start_datetime, end_datetime))

    file_dict["complaintsPast24hours"] = {
        "national": map_category(cat_voilence, cat_law, cat_other, eclk_hq_incidents.values('category').annotate(Count("category")).order_by()),
        "district": map_category(cat_voilence, cat_law, cat_other, eclk_district_incidents.values('category').annotate(Count("category")).order_by()),
        "totals": map_category(cat_voilence, cat_law, cat_other, eclk_incidents.values('category').annotate(Count("category")).order_by())
    }

    return file_dict

def filter_incidents_by_division(incidents: Incident, division: Division):
    """
    function to filter incidents by given division
    if users found, returns Incident queryset
    if user not found, returns False
    """

    profiles = Profile.objects.filter(division=division)

    # return false if no users found
    if (len(profiles) == 0):
        return False

    q_objects = Q()
    for profile in profiles:
        q_objects |= Q(created_by=profile.user)

    incidents_filtered = incidents.filter(q_objects)
    return incidents_filtered

def get_daily_district_center_data(report_request_data):
    """ function to get dialy incident data for district center report generation """
    file_dict = {}

    file_dict["template"] = "incidents/complaints/daily_summary_report_districtwise.js"
    file_dict["electionDate"] = date.today().strftime("%Y/%m/%d")

    report_date = date.fromisoformat(report_request_data['date'])
    file_dict["date"] = report_date.strftime("%Y/%m/%d")
    file_dict["dateInfo"] = (report_date - timedelta(days=1)).strftime("%Y/%m/%d") + " 4:00pm - " + report_date.strftime("%Y/%m/%d") + " 4:00pm"

    # totals
    violence=0
    breachOfElectionLaws=0
    other=0
    minor=0
    general=0
    major=0
    total=0

    incidents = get_daily_incidents(IncidentType.COMPLAINT, report_date)

    districts_centers = []
    districts = [
        "Colombo",
        "Gampaha",
        "Kalutara",
        "Kandy",
        "Matale",
        "Nuwaraeliya",
        "Galle",
        "Matara",
        "Hambantota",
        "Jaffna",
        "Killinochchi",
        "Vavuniya",
        "Mannar",
        "Mulaitivu",
        "Baticaloa",
        "Ampara",
        "Trincomalee",
        "Kurunagala",
        "Puttalam",
        "Anuradhapura",
        "Polonnaruwa",
        "Badulla",
        "Monaragala",
        "Ratnapura",
        "Kegalle",
        "HQ"
    ]
    for dt in districts:
        district = {}

        try:
            center = Division.objects.get(Q(name__contains=dt) & Q(organization_id=1))
        except ObjectDoesNotExist:
            district["name"] = dt
            district["total"] = 0
            district["other"] = 0
            district["violence"] = 0
            district["breachOfElectionLaws"] = 0
            district["minor"] = 0
            district["general"] = 0
            district["major"] = 0
            districts_centers.append(district)
            continue

        dc_incidents = filter_incidents_by_division(incidents, center)
        if (not dc_incidents):
            district["name"] = dt
            district["total"] = 0
            district["other"] = 0
            district["violence"] = 0
            district["breachOfElectionLaws"] = 0
            district["minor"] = 0
            district["general"] = 0
            district["major"] = 0
            districts_centers.append(district)
            continue

        district["name"] = dt
        district["total"] = dc_incidents.count()
        total += dc_incidents.count()

        # get category wise counts
        cat_voilence = Category.objects.all().filter(top_category='Violence')
        cat_law = Category.objects.all().filter(top_category='Violation of election law')
        cat_other = Category.objects.all().filter(top_category='Other')
        category_counts = map_category(cat_voilence, cat_law, cat_other, dc_incidents.values('category').annotate(Count("category")).order_by())
        district["other"] = category_counts["others"]
        district["violence"] = category_counts["disputes"]
        district["breachOfElectionLaws"] = category_counts["violationOfLaws"]
        other += category_counts["others"]
        violence += category_counts["disputes"]
        breachOfElectionLaws += category_counts["violationOfLaws"]

        # get serverity wise counts
        severity_counts = map_severity(dc_incidents.values('severity').annotate(Count("severity")).order_by())
        district["minor"] = severity_counts["minor"]
        district["general"] = severity_counts["general"]
        district["major"] = severity_counts["major"]
        minor += severity_counts["minor"]
        general += severity_counts["general"]
        major += severity_counts["major"]

        districts_centers.append(district)

    file_dict["complaintByDistrict"] = districts_centers

    file_dict["complaintTotalsByType"] = {
        "violence": violence,
        "breachOfElectionLaws": breachOfElectionLaws,
        "other": other,
        "minor": minor,
        "general": general,
        "major": major,
        "total": total
    }

    return file_dict

def get_daily_district_data():
    """ Function to get daily district data on complaints for PDF export. """
    file_dict = {}

    file_dict["template"] = "incidents/complaints/daily_summary_report_districtwise.js"
    file_dict["delectionDateate"] = date.today().strftime("%Y/%m/%d")

    # preload categories
    cat_voilence = Category.objects.all().filter(top_category='Violence')
    cat_law = Category.objects.all().filter(top_category='Violation of election law')
    cat_other = Category.objects.all().filter(top_category='Other')

    # for time / date ranges
    # start_datetime = (date.today() - timedelta(days=100)).strftime("%Y-%m-%d 16:00:00")
    # end_datetime = date.today().strftime("%Y-%m-%d 15:59:00")
    start_datetime = (localtime() - timedelta(days=1)).replace(hour=16, minute=00)
    end_datetime = localtime().replace(hour=15, minute=59)

    incidents = Incident.objects.all().filter(incidentType=IncidentType.COMPLAINT.name, election=settings.ELECTION, created_date__range=(start_datetime, end_datetime))

    file_dict["complaintByDistrict"] = []

    districts = District.objects.all()
    for district in districts:
        district_incidents = incidents.filter(district=district.code)

        category_counts = map_category(cat_voilence, cat_law, cat_other, district_incidents.values('category').annotate(Count("category")).order_by())
        severity_counts = map_severity(district_incidents.values('severity').annotate(Count("severity")).order_by())

        file_dict["complaintByDistrict"].append({
            "violence": category_counts["disputes"],
            "breachOfElectionLaws": category_counts["violationOfLaws"],
            "other": category_counts["others"],
            "minor": severity_counts["minor"],
            "general": severity_counts["general"],
            "major": severity_counts["major"],
            "total": severity_counts["total"]
        })

    file_dict["complaintTotalsByType"] = dict(functools.reduce(operator.add,
                                            map(collections.Counter, file_dict["complaintByDistrict"])))

    # just fixing the case of not having a specific total
    for key in file_dict["complaintByDistrict"][0]:
        if key not in file_dict["complaintTotalsByType"]:
            file_dict["complaintTotalsByType"][key] = 0

    return file_dict



def get_slip_data(incident_id):
    """ Function to return inquiry slip data for PDF export. """
    incident = get_incident_by_id(incident_id)
    category = Category.objects.get(id=incident.category)

    template_dict = {}
    template_dict["template"] = "incidents/inquiry/inquiry_slip.js"
    template_dict["referenceNumber"] = incident.refId
    template_dict["date"] = "2020/03/05"
    template_dict["categoryCode"] = incident.category
    template_dict["categoryNameEn"] = category.sub_category
    template_dict["categoryNameSn"] = category.sn_sub_category
    template_dict["categoryNameTm"] = category.tm_sub_category
    template_dict["institutionName"] = institutions[incident.institution]["name"]
    return template_dict

def get_daily_category_data(report_request_data):
    """ Function to get daily categories data on complaints for PDF export. """
    # TODO: signify the category types, so that helps to pull up category values without hardcoding as bellow
    file_dict = {}

    file_dict["template"] = "incidents/complaints/daily_summery_report_categorywise.js"
    report_date = date.fromisoformat(report_request_data['date'])
    file_dict["date"] = report_date.strftime("%Y/%m/%d")
    file_dict["dateInfo"] = (report_date - timedelta(days=1)).strftime("%Y/%m/%d") + " 4:00pm - " + report_date.strftime("%Y/%m/%d") + " 4:00pm"

    incidents = get_daily_incidents(IncidentType.COMPLAINT, report_date)

    # TODO: is fixed for EC HQ atm. change this to filter by requested EC division.
    ec_hq = Division.objects.get(is_default_division=True)
    incidents = filter_incidents_by_division(incidents, ec_hq)
    file_dict["total"] = incidents.count()

    other_category = Category.objects.get(top_category='Other')
    file_dict["other"] = incidents.filter(category=other_category.id).count()

    # collecting all category data
    category_dict = []

    # collect 'violence' top category data
    violence_category_dict = {}
    violence_category_dict["categoryNameSinhala"] = "මැතිවරණ ප්‍රචණ්ඩ ක්‍රියා"
    violence_category_dict["categoryNameTamil"] = "தேர்தல் வன்முறைகள்"

    violence_subcategories = Category.objects.filter(top_category='Violence')
    subcategory_dict = []
    for category in violence_subcategories:
        subcategory_data_dict = {}
        subcategory_data_dict["name"] = category.sn_sub_category
        subcategory_data_dict["count"] = incidents.filter(category=category.id).count()
        if incidents.filter(category=category.id).count() == 0:
            continue
        subcategory_dict.append(subcategory_data_dict)
    violence_category_dict["subCategories"] = subcategory_dict

    # collect 'violation of law' top category data
    violation_category_dict = {}
    violation_category_dict["categoryNameSinhala"] = "මැතිවරණ නීති උල්ලංඝනය"
    violation_category_dict["categoryNameTamil"] = "தேர்தல் சட்டங்களை மீறுதல்"

    violation_subcategories = Category.objects.filter(top_category='Violation of election law')
    subcategory_dict = []
    for category in violation_subcategories:
        subcategory_data_dict = {}
        subcategory_data_dict["name"] = category.sn_sub_category
        subcategory_data_dict["count"] = incidents.filter(category=category.id).count()
        if incidents.filter(category=category.id).count() == 0:
            continue
        subcategory_dict.append(subcategory_data_dict)
    violation_category_dict["subCategories"] = subcategory_dict

    # complete category data
    category_dict.append(violence_category_dict)
    category_dict.append(violation_category_dict)
    file_dict["categories"] = category_dict

    return file_dict

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
