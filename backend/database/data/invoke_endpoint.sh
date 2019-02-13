while read X; do echo $X;  curl -X POST -d "$X" http://127.0.0.1:5000/action_entitys -H "Content-Type: application/json"; done < data/entities.json 
