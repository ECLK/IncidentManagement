from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from django.http import HttpResponse
from django.template.loader import render_to_string
from xhtml2pdf import pisa

from .services import get_police_division_summary, apply_style, get_category_summary, get_district_summary, \
    get_mode_summary, get_severity_summary, get_status_summary, get_subcategory_summary


class ReportingView(APIView):
    """
    Incident Resource
    """

    def get(self, request, format=None):
        """
            Get incident by incident id
        """
        param_report = self.request.query_params.get('report', None)
        if param_report is None or param_report == "":
            return Response("No report specified", status=status.HTTP_400_BAD_REQUEST)

        table_html = None
        table_title = None

        if param_report == "police_division_summary_report":
            table_html = get_police_division_summary()
            table_title = "Police Division Summary Report"

        elif param_report == "category_wise_summary_report":
            table_html = get_category_summary()
            table_title = "Category-wise Summary Report"

        elif param_report == "district_wise_summary_report":
            table_html = get_district_summary()
            table_title = "District-wise Summary Report"

        elif param_report == "mode_wise_summary_report":
            table_html = get_mode_summary()
            table_title = "Mode-wise Summary Report"

        elif param_report == "severity_wise_summary_report":
            table_html = get_severity_summary()
            table_title = "Severity-wise Summary Report"

        elif param_report == "subcategory_wise_summary_report":
            table_html = get_subcategory_summary()
            table_title = "Severity-wise Summary Report"

        elif param_report == "status_wise_summary_report":
            table_html = get_status_summary()
            table_title = "Status-wise Summary Report"

        if table_html is None:
            return Response("Report not found", status=status.HTTP_400_BAD_REQUEST)

        table_html = apply_style(table_html, table_title)

        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="Report.pdf"'
        pisa.CreatePDF(table_html, dest=response)

        return response
