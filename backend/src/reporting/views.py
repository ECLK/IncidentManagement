from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from django.http import HttpResponse
from xhtml2pdf import pisa
import datetime
from django.db import connection
import pandas as pd
import requests
import json
from django.conf import settings
import urllib
import os

from .services import get_police_division_summary, get_category_summary, \
    get_mode_summary, get_severity_summary, get_status_summary, get_subcategory_summary, get_district_summary, \
    get_incident_date_summary, get_slip_data, get_daily_category_data, get_daily_summary_data, get_daily_district_data
from .functions import apply_style, decode_column_names, incident_type_title, incident_type_query

'''
middleware to access PDF-service
'''
class ReportingAccessView(APIView):
    '''
    Based on https://github.com/ECLK/pdf-service
    Generates PDF

    GET request with required parameters

    Response would be a pdf stream to be opened in a different tab
    '''
    permission_classes = []
    def get(self, request):
        endpoint_uri = settings.PDF_SERVICE_ENDPOINT
        json_dict = {}
        template_type = request.query_params.get('template_type')

        if(template_type == "simple-template"):
            file_dict = {}
            file_dict['template'] = "exTemplateBootstrap.js"
            file_dict['title'] = "This is my title on test"

            # prepare all data to be on json object 'file'
            json_dict['file'] = file_dict

        elif (template_type == "slip"):
            '''
            Inquiry Slip
            GET parameters => /?template_type=slip&id=<incident_id>
            '''
            incident_id = request.query_params.get('id')
            json_dict["file"] = get_slip_data(incident_id)

        elif (template_type == "daily_category"):
            """
            daily_summery_report_categorywise
            GET parameters => /?template_type=daily_category
            """
            json_dict["file"] = get_daily_category_data()

        elif (template_type == "daily_summary"):
            """
            daily_summary_report_main
            GET parameters => /?template_type=daily_district
            """
            json_dict["file"] = get_daily_summary_data()

        elif (template_type == "daily_district"):
            """
            daily_summary_report_districtwise
            GET parameters => /?template_type=daily_district
            """
            json_dict["file"] = get_daily_district_data()


        request_data = json.dumps(json_dict)
        res = requests.post(url=endpoint_uri, data = request_data, headers={'content-type': 'application/json'})

        if res.status_code == 200:
            pdf_file = requests.get(res.json()["url"])

            response = HttpResponse(content=pdf_file.content, content_type='application/pdf')
            response['Access-Control-Expose-Headers'] = 'Title'
            response['Title'] = 'report_' + datetime.date.today().strftime("%Y%m%d%H%M%S") + ".pdf"

            return response
        else:
            return HttpResponse(status=res.status_code, content=res.text, content_type='application/json')

class ReportingView(APIView):
    """
    Incident Resource
    """

    def get(self, request, format=None):
        """
            Get incident by incident id
        """
        param_report = self.request.query_params.get('report', None)
        start_date = self.request.query_params.get('start_date', '')
        end_date = self.request.query_params.get('end_date', '')
        detailed_report = True if self.request.query_params.get('detailed_report', 'false') == 'true' else False
        complain = True if self.request.query_params.get('complain', 'false') == 'true' else False
        inquiry = True if self.request.query_params.get('inquiry', 'false') == 'true' else False

        if start_date == '':
            start_date = datetime.date.today().strftime("%Y-%m-%d 16:00:00")
        else:
            start_date = start_date.replace("T", " ", 1)
        if end_date == '':
            end_date = datetime.date.today().strftime("%Y-%m-%d 16:00:00")
        else:
            end_date = end_date.replace("T", " ", 1)

        if param_report is None or param_report == "":
            return Response("No report specified", status=status.HTTP_400_BAD_REQUEST)

        table_html = None
        table_title = None
        incident_type_string = incident_type_title(complain, inquiry)

        # if param_report == "police_division_summary_report":
        #     table_html = get_police_division_summary()
        #     table_title = "Police Division Summary Report"

        layout = "A4 portrait"
        title = """from %s to %s by """ % (start_date, end_date)
        if param_report == "category_wise_summary_report":
            table_html = get_category_summary(start_date, end_date, detailed_report, complain, inquiry)
            if detailed_report:
                table_title = title + "District and Category"
            else:
                table_title = title + "Category"

        elif param_report == "mode_wise_summary_report":
            table_html = get_mode_summary(start_date, end_date, detailed_report, complain, inquiry)
            if detailed_report:
                layout = "A4 landscape"
                table_title = title + "District and Mode"
            else:
                table_title = title + "Mode"

        elif param_report == "district_wise_summary_report":
            table_html = get_district_summary(start_date, end_date, detailed_report, complain, inquiry)
            table_title = title + "District"

        elif param_report == "severity_wise_summary_report":
            table_html = get_severity_summary(start_date, end_date, detailed_report, complain, inquiry)
            if detailed_report:
                table_title = title + "District and Severity"
            else:
                table_title = title + "Severity"

        elif param_report == "subcategory_wise_summary_report":
            table_html = get_subcategory_summary(start_date, end_date, detailed_report, complain, inquiry)
            if detailed_report:
                layout = "A3 landscape"
                table_title = title + "District and Subcategory"
            else:
                table_title = title + "Subcategory"

        elif param_report == "incident_date_wise_summary_report":
            table_html = get_incident_date_summary(start_date, end_date, detailed_report, complain, inquiry)
            table_title = title + "Incident Date"

        elif param_report == "status_wise_summary_report":
            table_html = get_status_summary(start_date, end_date, detailed_report, complain, inquiry)
            if detailed_report:
                table_title = title + "District and Status"
            else:
                table_title = title + "Status"

        if table_html is None:
            return Response("Report not found", status=status.HTTP_400_BAD_REQUEST)

        # Prepare report header
        sql3 = incident_type_query(complain, inquiry)
        sql = """SELECT
                     Count(id) as TotalCount
                 FROM   incidents_incident WHERE %s""" % sql3
        dataframe = pd.read_sql_query(sql, connection)
        total_count = dataframe['TotalCount'][0]

        table_html = apply_style(
            decode_column_names(table_html)
                .replace(".0", "", -1)
                .replace("(Total No. of Incidents)",
                         """<strong>(Total No. of Incidents from %s to %s)</strong>""" % (start_date, end_date), -1)
                .replace("(Unassigned)", "<strong>(Unassigned)</strong>", -1)
            , table_title, incident_type_string, layout, total_count)

        response = HttpResponse(content_type='application/pdf')
        response['Access-Control-Expose-Headers'] = 'Title'
        response['Title'] = """Incidents reported within the period %s %s %s.pdf""" % (
            table_title, incident_type_string, datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
        pisa.CreatePDF(table_html, dest=response)
        return response
