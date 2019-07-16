## Installation

1. Configure database at settings.py / .env
2. `pip install -r requirements.txt`
3. `python manage.py migrate`
4. `python manage.py createsuperuser --email admin@example.com --username admin`
5. `python manage.py runserver`

## Docker run

1. Install docker-compose
2. Navigate to `backend` directory
3. `docker-compose build`
4. `docker-compose up`
5. Go grab a coffee until mysql and django initialize
6. Open a new terminal, navigate to `backend` 
7. `docker-compose exec web python manage.py makemigrations`
8. `docker-compose exec web python manage.py migrate`
9. Grab another coffee
10. `docker-compose exec web python manage.py createsuperuser`
11. Enter superuser information when prompted
12. `docker-compose exec web python manage.py loaddata seed_data.json`
13. Server runs at 8000

## Model writing guidelines

1. django inserts an auto-increment 'id' field by default. Unless you want to change it to something more meaninful or different, keep it

2. for small strings use, models.CharField

3. Foreign key referencing -> name the FK field as the object  
    ex: Book refering to Author ir Book.author (not Book.author_id)

4. Can have one FK to refer to multiple models, check Event model for example


## Serializers

1. Serializers are like servies

2. We can select which fields to show and which ones to neglect in API responses

3. `fields = "__all__"` means you expose ALL fields and all fields are required to POST data as well

4. `fields = ['field1', 'field2']` is a better option

5. Best would be to write custom serializers tho kek

6. Make sure the serializer output is camelCase (as opposed to snake_case used in the database). This is for better compatibility with the frontend. For this, if a certain field name needs to be converted it can be done. Refer EventSerializer (affectedAttribute field) for an example

7. Can have additional fields with serializers as well


## Errors

1. >django.core.exceptions.ImproperlyConfigured: The included URLconf 'src.urls' does not appear to have any patterns in it. If you see valid patterns in the file then the issue is probably caused by a circular import.

This usually means your file being imported has some error, type or something.
It can literally mean an error somewhere in the code, don't know why it pops up.

2. Exceptions are handled centrally. So bubble up exceptions if needed.

### Response

All responses have the same structure. This is enforced centrally, no need to change anything. Make sure to use the `Response` object to return responses than sending out manual ones.

```js
{
    message: str,
    data: Object,
    errors: [],
    status: str
}
```


### Services

1. Services contain the domain model / business logic

2. Paradigm is thin view, thin model but fat service

3. If there's a reusable logic that involves more than one query to models, send it out to a service method.

4. **Different apps should ONLY communicate through services. Donot invoke view methods of other apps directly**
