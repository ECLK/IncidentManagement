FROM python:3.6

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN mkdir -p /app/src
WORKDIR /app
COPY ./requirements.txt /app
COPY ./seed_data.json /app
COPY ./manage.py /app
# COPY ./src /app/src

RUN pip install -r requirements.txt