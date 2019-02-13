# Incident Management

Incident Management System for Elections Commission of Sri Lanka

# Setting up

## Setting up runtime

1. Use Python 3.x and Pip 3.x versions
2. Install the dependencies by `pip install -r requirements.txt `

## Setting up database

Use MySQL 8  

## DB migrations
Remove the migrations dir if any  

1) flask db init
2) flask db migrate
3) flask db upgrade

### Installation for MySQL 5.x

If you are using MySQL 5.x, Change the folllwing in the dump before importiing it

```
charset = utf8
collate = utf8_general_ci
```
