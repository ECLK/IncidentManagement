FROM python:3.6-stretch

# RUN apt-get update -y

# RUN echo "mysql-server mysql-server/root_password password root" | debconf-set-selections
# RUN echo "mysql-server mysql-server/root_password_again password root" | debconf-set-selections

# ENV requirements="build-essential python3-dev libevent-dev python-setuptools mysql-server mysql-client libmysqlclient-dev gcc"  

# RUN apt-get install $requirements -y && rm -rf /var/lib/apt/lists/*
# RUN apt-get install build-essential python3-dev libffi-dev libssl-dev libpq-dev -y

ENV DB_USER=root
ENV DB_PASSWD=toor
ENV DB_NAME=lsfclem

ADD ./src /app/

WORKDIR /app

RUN pip install -r ./requirements.txt

EXPOSE 5000

# CMD ["sh", "./startup.sh"]
ENTRYPOINT python migrate.py && python manage.py


