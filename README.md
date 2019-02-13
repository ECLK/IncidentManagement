# Incident Management

Incident Management System for Elections Commission of Sri Lanka

## python

python 3.x 

## Installation for mysql 5.x

### DB dump import 

Change the folllwing in the dump before import  
`charset = utf8`   
`collate = utf8_general_ci`

## DB migrations
Remove the migrations dir if any  

1) flask db init
2) flask db migrate
3) flask db upgrade