"""Reports"""

from django.db import connection
import pandas as pd
import numpy as np

from ..common.models import Category, Channel
from ..incidents.models import Incident
from .functions import get_summary_by


def get_category_summary():
    return get_summary_by(Category, "top_category", "common_category", "incident.category")


def get_mode_summary():
    return get_summary_by(Channel, "name", "common_channel", "incident.category")


def get_severity_summary():
    return get_summary_by(Incident, "severity", "incidents_incident", "incident.id")


def get_subcategory_summary():
    return get_summary_by(Category, "sub_category", "common_category", "incident.category")


def get_status_summary():
    return get_summary_by(Incident, "current_status", "incidents_incident", "incident.id")


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
