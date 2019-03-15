Incident Backend
-----------------

# Incident backend related things moved to here

## Initializing project

### Environment

1) Install mysql server
2) Install python3, pip3
3) `pip3 install -r requirements.txt`
4) Copy .env.sample -> .env
5) Edit the MYQQL_PATH link to your config

### Database

1) Create a new database corresponding to the database specified in the MYSQL_PATH
2) From /src directory, run
3) `export FLASK_APP=manage.py`
6) `flask db init`
7) `flask db migrate`
8) `flask db upgrade`
9) `python3 seed.py`

### Server

1) From /src directory, run
2) `export FLASK_APP=manage.py`
3) `python3 manage.py`
