## Installation

1. Configure database at settings.py
2. `pip install -r requirements.txt`
3. python manage.py migrate
4. python manage.py createsuperuser --email admin@example.com --username admin
5. python manage.py runserver


## Model writing guidelines

1. django inserts an auto-increment 'id' field by default. Unless you want to change it to something more meaninful or different, keep it

2. for small strings use, models.CharField


## Serializers

1. Serializers are like servies

2. We can select which fields to show and which ones to neglect in API responses

3. `fields = "__all__"` means you expose ALL fields and all fields are required to POST data as well

4. `fields = ['field1', 'field2']` is a better option

5. Best would be to write custom serializers tho kek


## Errors

>django.core.exceptions.ImproperlyConfigured: The included URLconf 'src.urls' does not appear to have any patterns in it. If you see valid patterns in the file then the issue is probably caused by a circular import.

This usually means your file being imported has some error, type or something
