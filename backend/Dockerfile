FROM python:3.6

RUN mkdir -p /app/src
WORKDIR /app
COPY ./requirements.txt /app
COPY ./manage.py /app
COPY ./src /app/src

RUN pip install -r requirements.txt