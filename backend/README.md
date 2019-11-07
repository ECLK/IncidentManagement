## Installation

1. Configure database at settings.py / .env
2. `pip install -r requirements.txt`
3. `python manage.py migrate`
4. `python manage.py createsuperuser --email admin@example.com --username admin`
5. `python manage.py loaddata file1 file2` (after `loaddata` add required seed file names separeated by space). Seed files are found in `./seeddata` folder.
6. `python manage.py runserver` or to make accessible through LAN use `python manage.py runserver 0.0.0.0:8000` and add your LAN IP to `ALLOWED_HOSTS` in the `settings.py` along with `localhost`. ( `ALLOWED_HOSTS = ["localhost", "192.168.8.160"]`)

## Docker run

1. Install docker-compose
2. Navigate to `backend` directory
3. `docker-compose build`
4. `docker-compose up`
5. Go grab a coffee until mysql and django initialize
6. Open a new terminal, navigate to `backend`
7. `docker-compose exec djangoapp python manage.py makemigrations`
8. `docker-compose exec djangoapp python manage.py migrate`
9. Grab another coffee
10. `docker-compose exec djangoapp python manage.py createsuperuser`
11. Enter superuser information when prompted
    <!-- 12. `docker-compose exec djangoapp python manage.py loaddata seed_data.json` -->
12. Server runs at 8000

## Model writing guidelines

1. django inserts an auto-increment 'id' field by default. Unless you want to change it to something more meaninful or different, keep it

2. for small strings use, models.CharField

3. Foreign key referencing -> name the FK field as the object  
   ex: Book refering to Author ir Book.author (not Book.author_id)

4. Can have one FK to refer to multiple models, check Event model for example

## Serializers

1. Serializers are like services

2. We can select which fields to show and which ones to neglect in API responses

3. `fields = "__all__"` means you expose ALL fields and all fields are required to POST data as well

4. `fields = ['field1', 'field2']` is a better option

5. Best would be to write custom serializers tho kek

6. Make sure the serializer output is camelCase (as opposed to snake_case used in the database). This is for better compatibility with the frontend. For this, if a certain field name needs to be converted it can be done. Refer EventSerializer (affectedAttribute field) for an example

7. Can have additional fields with serializers as well

## Errors

1. > django.core.exceptions.ImproperlyConfigured: The included URLconf 'src.urls' does not appear to have any patterns in it. If you see valid patterns in the file then the issue is probably caused by a circular import.

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


### Tests

#### Incident Create

1. Public user creates incident 
    Get assigned to HQ coordinator

2. Coodinator HQ creates incident
    Get assigned to ownself

3. Coodinator in Division creates incident
    Get assigned to ownself

4. Data Entry in Division with coordinator creates incident
    Get assigned to coodinator in own division

5. Data Entry in Division without coordinator creates incident
    Get assigned to coordinator in HQ

6. Police user creates incident
    Get assigned to coordinator in HQ
    Police user is added as a linked individual

#### Escalate

1. Coordinator with manager escalates
    Get assigned to same division manager

2. Coordinator without manager in same division escalates
    Get assigned to HQ manager

#### Assignment

Only users with CAN_CHANGE_ASSIGNEE can change the assignment

#### Refer to organization

Refered entity is added as a linked individual

#### Complete action

1. If only one action pending, then state change to action taken
2. If more than one action pending, then state change to action pending

#### Request for advice

1. User from whom  advice is requested is added to linked individuals list
