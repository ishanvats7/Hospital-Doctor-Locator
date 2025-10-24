This project is to show/locate hospital data in a particular city and use several filters(like hospital name, specialization etc) on top of it to locate required hospital/clinic. There are two projects as sub folder in this folder:

1. Hospital-Locator-Api
   This is a back end application developed using Node JS runtime and Express JS framework. Language used: Javascript. Database used: MongoDb
   This back end application exposes several api endpoints which is used by Hospital-Locator front end project.
   Steps to build and run this project from terminal:
2. npm install //to install all the dependencies of the project as mentioned in package.json
   // Note: Run below seed step only if running this application for the first time or data needs to be updated in db from seed.js so that sample data gets populated into the database which we need to show and use.
3. npm run seed
4. npm run start // to run the application on desired port (defined in .env file in this project) . Here defined as 5000 so api base path is "http:localhost:5000

2. Hospital-Locator
   This is a front end application developed using React JS framework using Javascript language.
   Steps to build and run this project from terminal:

1. npm install //to install all dependencies of the project as mentioned in package.json
2. npm run build // to build the application
3. npm run start  // to run the application, it run on default port of react application which is "3000" so base url is http://localhost:3000

For both of the projects the underlying scripts which gets executed while using above commands can be found in package.json file for respective projects.

