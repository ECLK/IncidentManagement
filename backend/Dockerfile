FROM python:3-slim

# RUN apt-get update -y

# RUN echo "mysql-server mysql-server/root_password password root" | debconf-set-selections
# RUN echo "mysql-server mysql-server/root_password_again password root" | debconf-set-selections

# ENV requirements="build-essential python3-dev libevent-dev python-setuptools mysql-server mysql-client libmysqlclient-dev gcc"  

# RUN apt-get install $requirements -y && rm -rf /var/lib/apt/lists/*

ADD ./src /app/src

WORKDIR /app

RUN pip install -r ./requirements.txt

# CMD ["sh", "./startup.sh"]
ENTRYPOINT python migrate.py && python manage.py


