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
3) `python3 migrate.py`
4) This would migrate the tables and seed the static content

### Server

1) From /src directory, run
2) `export FLASK_APP=manage.py`
3) `python3 manage.py`


### Testing

Crude testing framework is here, run usign pytest

1) Set MYSQL_TEST_PATH in .env
2) From src/ directory run `pytest test.py --verbose -s`

