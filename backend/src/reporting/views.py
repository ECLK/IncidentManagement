from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from django.http import HttpResponse
from django.template.loader import render_to_string
from xhtml2pdf import pisa

from .services import get_DI_Division_summary, apply_style

class ReportingView(APIView):
    """
    Incident Resoruce
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

        if param_report == "di_division_summary_report":
            table_html = get_DI_Division_summary()
            table_title = "Police Division Summary Report"

        if table_html is None:
            return Response("Report not found", status=status.HTTP_400_BAD_REQUEST)

        table_html = apply_style(table_html, table_title)
        
        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="Report.pdf"'
        pisa.CreatePDF(table_html, dest=response)
            
        return response

        
