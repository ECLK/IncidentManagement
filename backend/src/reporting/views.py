from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def get_category_summary_report(request, start_date, end_date):
    if request.method == "GET":

        return Response([])