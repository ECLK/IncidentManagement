from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from django.http import HttpResponse
from xhtml2pdf import pisa
import datetime

from .services import get_police_division_summary, get_category_summary, \
    get_mode_summary, get_severity_summary, get_status_summary, get_subcategory_summary
from .functions import apply_style


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
            start_date = datetime.date.today().strftime("%Y-%m-%d")
        if end_date == '':
            end_date = datetime.date.today().strftime("%Y-%m-%d")
        start_date += " 00:00:00"
        end_date += " 23:59:00"

        if param_report is None or param_report == "":
            return Response("No report specified", status=status.HTTP_400_BAD_REQUEST)

        table_html = None
        table_title = None
        table_subtitle = """%s - %s""" % (start_date, end_date)

        # if param_report == "police_division_summary_report":
        #     table_html = get_police_division_summary()
        #     table_title = "Police Division Summary Report"

        if param_report == "category_wise_summary_report":
            table_html = get_category_summary(start_date, end_date, detailed_report)
            table_title = "No. of Incidents by Category"

        elif param_report == "mode_wise_summary_report":
            table_html = get_mode_summary(start_date, end_date, detailed_report)
            table_title = "No. of Incidents by Mode"

        elif param_report == "severity_wise_summary_report":
            table_html = get_severity_summary(start_date, end_date, detailed_report)
            table_title = "No. of Incidents by Severity"

        elif param_report == "subcategory_wise_summary_report":
            table_html = get_subcategory_summary(start_date, end_date, detailed_report)
            table_title = "No. of Incidents by Subcategory"

        elif param_report == "status_wise_summary_report":
            table_html = get_status_summary(start_date, end_date, detailed_report)
            table_title = "No. of Incidents by Status"

        if table_html is None:
            return Response("Report not found", status=status.HTTP_400_BAD_REQUEST)

        table_html = apply_style(table_html, table_title, table_subtitle)
        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="Report.pdf"'
        pisa.CreatePDF(table_html, dest=response)

        return response
