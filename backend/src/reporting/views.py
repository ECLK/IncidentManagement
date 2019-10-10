from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from django.http import HttpResponse
from xhtml2pdf import pisa
import datetime
from django.db import connection
import pandas as pd

from .services import get_police_division_summary, get_category_summary, \
    get_mode_summary, get_severity_summary, get_status_summary, get_subcategory_summary, get_district_summary, \
    get_incident_date_summary
from .functions import apply_style, decode_column_names


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
        detailed_report = self.request.query_params.get('detailed_report', 'false')

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

        # if param_report == "police_division_summary_report":
        #     table_html = get_police_division_summary()
        #     table_title = "Police Division Summary Report"

        layout = "A4 portrait"
        title = """from %s to %s by """ % (start_date, end_date)
        if param_report == "category_wise_summary_report":
            table_html = get_category_summary(start_date, end_date, detailed_report)
            if detailed_report == 'true':
                table_title = title + "District and Category"
            else:
                table_title = title + "Category"

        elif param_report == "mode_wise_summary_report":
            table_html = get_mode_summary(start_date, end_date, detailed_report)
            if detailed_report == 'true':
                layout = "A4 landscape"
                table_title = title + "District and Mode"
            else:
                table_title = title + "Mode"

        elif param_report == "district_wise_summary_report":
            table_html = get_district_summary(start_date, end_date, detailed_report)
            table_title = title + "District"

        elif param_report == "severity_wise_summary_report":
            table_html = get_severity_summary(start_date, end_date, detailed_report)
            if detailed_report == 'true':
                table_title = title + "District and Severity"
            else:
                table_title = title + "Severity"

        elif param_report == "subcategory_wise_summary_report":
            table_html = get_subcategory_summary(start_date, end_date, detailed_report)
            if detailed_report == 'true':
                layout = "A1 landscape"
                table_title = title + "District and Subcategory"
            else:
                table_title = title + "Subcategory"

        elif param_report == "incident_date_wise_summary_report":
            table_html = get_incident_date_summary(start_date, end_date, detailed_report)
            table_title = title + "Incident Date"

        elif param_report == "status_wise_summary_report":
            table_html = get_status_summary(start_date, end_date, detailed_report)
            if detailed_report == 'true':
                table_title = title + "District and Status"
            else:
                table_title = title + "Status"

        if table_html is None:
            return Response("Report not found", status=status.HTTP_400_BAD_REQUEST)

        sql = """SELECT 
                     Count(id) as TotalCount
                 FROM   incidents_incident"""
        dataframe = pd.read_sql_query(sql, connection)
        totalCount = dataframe['TotalCount'][0]

        table_html = apply_style(
            decode_column_names(table_html)
                .replace(".0", "", -1)
                .replace("(Total No. of Incidents)",
                         "<strong>(Total No. of Incidents within the period)</strong>", -1)
                .replace("(Unassigned)", "<strong>(Unassigned)</strong>", -1)
            , table_title, layout, totalCount)
        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="Report.pdf"'
        pisa.CreatePDF(table_html, dest=response)

        return response
