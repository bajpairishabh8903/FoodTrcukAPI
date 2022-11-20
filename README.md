# FoodTrcukAPI
This API is built to perform several tasks on dataset of Food Trucks in San Francisco


## Prerequisets
Node JS 

PostgresSQL

Git

## Setup
Clone Repository using 
```bash
git clone https://github.com/bajpairishabh8903/FoodTrcukAPI.git
```
Open command prompt for the folder where you cloned the repository and run below to install all Dependenicies
```bash
npm i 
```

Install <a href="https://www.postgresql.org/download/" target="_blank">PostgresSQL</a> and create a Database 'Details_DB'

Create a user called 'Administrator' in Login/Group roles in PostgreSQL with super user access 

Create a table in Details_DB using below query
```bash
CREATE TABLE IF NOT EXISTS public."FoodTruckDetials"
(
    locationid integer NOT NULL,
    "Applicant" character varying COLLATE pg_catalog."default",
    "FacilityType" character varying COLLATE pg_catalog."default",
    cnn bigint,
    "LocationDescription" character varying COLLATE pg_catalog."default",
    "Address" character varying COLLATE pg_catalog."default",
    blocklot character varying COLLATE pg_catalog."default",
    block character varying COLLATE pg_catalog."default",
    lot character varying COLLATE pg_catalog."default",
    permit character varying COLLATE pg_catalog."default",
    "Status" character varying COLLATE pg_catalog."default",
    "FoodItems" character varying COLLATE pg_catalog."default",
    "X" double precision,
    "Y" double precision,
    "Latitude" double precision,
    "Longitude" double precision,
    "Schedule" character varying COLLATE pg_catalog."default",
    "Approved" timestamp without time zone,
    "Received" bigint,
    "PriorPermit" integer,
    "ExpirationDate" timestamp without time zone,
    "Location" character varying COLLATE pg_catalog."default",
    "Zip Codes" integer,
    CONSTRAINT "FoodTruckDetials_pkey" PRIMARY KEY (locationid)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."FoodTruckDetials"
    OWNER to "Administrator";
```

Import dataset into the same table using Mobile_Food_Facility_Permit.csv provided in source code

Open command prompt for the folder where you cloned the repository and run below command to run application
```bash
node app.js
```

## Details
The API endpoints to be used are build using Nodejs Express framework
Food Trucks in San Francisco dataset is migrated to Postgresql database using CSV
Both Database and Nodejs server is hosted in Amazon EC2

## Assumptions 
To add a new entry in the dataset, sample data is used from a json which contains an array of different possible entries which can be addded
All sample data entries can be viewed using this link(add link)

## Tasks
### Search by name of applicant
Replace {applicant Name} by name to be searched
http://13.126.180.61:8000/applicant?name={applicant Name}

### Search by expiration date, to find whose permits have expired
Replace {date} by date by whcih permits have expired. Date format to used in mm-dd-yyyy (for eg: 03-15-2016)
http://13.126.180.61:8000/expired_permits?date={date}

### Search by street name
Replace {street} by street name to be searched
http://13.126.180.61:8000/address?street={street}

### Add new food truck entry to the dataset
Replace {index} by entry no in the json metioned in assumptions. For example if index=3 then 3rd entry from the json will be added to data set and can be verified by using search by name feature
http://13.126.180.61:8000/add_entry?index={index}

### Given a delivery location, find out the closest truck possible.
Replace {longitude} and {latitude} by their respctive values. For example http://13.126.180.61:8000/get_closest_truck?long=-122.3996179&lat=37.79926011
http://13.126.180.61:8000/get_closest_truck?long={longitude}&lat={latitude}