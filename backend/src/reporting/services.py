"""Reports"""

from django.db import connection

def get_totals_by_category():
    sql = """
            SELECT usr.id, COUNT(incident.id) as incident_count FROM `auth_user` as usr 
            LEFT JOIN incidents_incident as incident on incident.assignee_id = usr.id 
            INNER JOIN auth_user_groups on usr.id = auth_user_groups.user_id
            INNER JOIN auth_group as grp on grp.id = auth_user_groups.group_id
            WHERE grp.rank = %d
            GROUP BY usr.id
            ORDER BY incident_count ASC
          """

    with connection.cursor() as cursor:
        cursor.execute(sql)
        row = cursor.fetchone()

        return []