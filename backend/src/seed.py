#utf-8
"""Seeder for entering initial data to the database"""

import json
import traceback

from manage import app, db

from app.main.model.category import Category
from app.main.model.policestation import PoliceStation
from app.main.model.district import District
from app.main.model.action_entity import ActionEntity

from app.main.service import category as categoryService
from app.main.service import policestation as policestationService
from app.main.service import district as districtService
from app.main.service import action_entity as actionEntityService
from app.main.service import election as electionService
from app.main.service import pollingstation as pollingstationService
from app.main.service import reporter as reporterService

def seed_categorys():
    """ Seed category data to the database """
    print("Seeding categories")

    try:
        # delete all existing records
        Category.query.delete()

        # reset auto increment
        db.session.execute("ALTER TABLE category AUTO_INCREMENT = 1;")

        with open("data/category.json", "r") as f:
            for line in f:
                category = json.loads(line.strip())
                categoryService.save_new_category(category)
                
    except Exception as e:
        print(e)
        print("Error seeding categorys")

def seed_districts():
    """ Seed district data to the database """

    print("Seeding districts")

    try:
        # delete all existing records
        District.query.delete()

        # reset auto increment
        db.session.execute("ALTER TABLE district AUTO_INCREMENT = 1;")
        
        with open("data/districts.json", "r") as f:
            for line in f:
                district = json.loads(line.strip())
                districtService.save_new_district(district)
                
    except Exception as e:
        print(e)
        print("Error seeding districts")

def seed_police_stations():
    """ Seed police station data to the database """

    print("Seeding police stations")

    try:
        # delete all existing records
        PoliceStation.query.delete()

        # reset auto increment
        db.session.execute("ALTER TABLE policestation AUTO_INCREMENT = 1;")
        
        with open("data/police_stations.json", "r", encoding="utf-8-sig") as f:
            for line in f:
                ps = json.loads(line.strip())
                policestationService.save_new_policestation(ps)
                
    except Exception as e:
        print(e)
        traceback.print_exc()
        print("Error seeding police stations")

def seed_action_entities():
    """ Seed action entity data to the database """

    print("Seeding action entities")

    try:
        # delete all existing records
        ActionEntity.query.delete()

        # reset auto increment
        db.session.execute("ALTER TABLE action_entity AUTO_INCREMENT = 1;")
        
        with open("data/entities.json", "r") as f:
            for line in f:
                entity = json.loads(line.strip())
                actionEntityService.save_new_action_entity(entity)
                
    except Exception as e:
        print(e)
        print("Error seeding action entities")

def seed_dummy_data():
    """ Seed dummy data for now for development """
    electionService.save_new_election({
        "name": "Dummy election"
    })

    pollingstationService.save_new_pollingstation({
        "district_id": 2,
        "name": "Dummy polling station",
        "division": "Some division"
    })

    reporterService.save_new_reporter({
        "name": "Dummy reporter",
        "type": "Some type"
    })


if __name__ == "__main__":
    seed_categorys()
    seed_districts()
    seed_police_stations()
    seed_action_entities()
    seed_dummy_data()