# FoodTrcukAPI
This API is built to perform several tasks on dataset of Food Trucks in San Francisco


## Prerequisets
Node JS 

PostgresSQL

Git

## Setup
Install <a href="https://nodejs.org/en/download/" target="_blank">NodeJS</a>

Install <a href="https://git-scm.com/downloads" target="_blank">Git</a>

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

Both Database and Nodejs server are hosted on Amazon EC2

## Design

<img src="http://65.0.95.38:8000/app_design.png"></img>

## Assumptions 
To add a new entry in the dataset, sample data is used from a json which contains an array of different possible entries which can be addded

All sample data entries can be viewed using this <a href="http://65.0.95.38:8000/truckdata.json" target="_blank">link</a>

## Tasks
### Search by name of applicant
```bash
http://65.0.95.38:8000/applicant?name={applicant Name}
```
Replace {applicant Name} by name to be searched

Example
```bash
http://65.0.95.38:8000/applicant?name=Ziaurehman Amini
```

### Search by expiration date, to find whose permits have expired
```bash
http://65.0.95.38:8000/expired_permits?date={date}
```
Replace {date} by date by whcih permits have expired. Date format to used in mm-dd-yyyy (for eg: 03-15-2016)

Example
```bash
http://65.0.95.38:8000/expired_permits?date=03-15-2016
```

### Search by street name
```bash
http://65.0.95.38:8000/address?street={street}
```
Replace {street} by street name to be searched. For Example Replace {street} by: MONTGOMERY

Example
```bash
http://65.0.95.38:8000/address?street=MONTGOMERY
```

### Add new food truck entry to the dataset
```bash
http://65.0.95.38:8000/add_entry?index={index}
```
Replace {index} by entry no in the json metioned in assumptions. For example if index=3 then 3rd entry from the json will be added to data set and can be verified by using search by name feature

Example
```bash
http://65.0.95.38:8000/add_entry?index=5
```
>Value of index allowed is 1 to 6 as there are only 6 entries present in the json mentioned in assumptions
### Given a delivery location, find out the closest truck possible.
```bash
http://65.0.95.38:8000/get_closest_truck?long={longitude}&lat={latitude}
```
Replace {longitude} and {latitude} by their respctive values.

Example 
```bash
http://65.0.95.38:8000/get_closest_truck?long=-122.3996179&lat=37.79926011
```