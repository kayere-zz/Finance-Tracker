# Finance-Tracker
* This is a web application used to track one's expenditure and income over a period of time. The application allows a user to create an account and where he can store his details. The user can also request for the monthly email giving him the summary of the month's finances.

## Authors
* Linus Muema : linus.m.muema@gmail.com
* Erick Muthui : muthuiericko@gmail.com
* Peter Kayere : Brainhesley3@gmail.com

## Technologies used
* The application uses the following technologies :

1. HTML : It is used to create the web pages and styling done in css.

2. [MDB ](https://mdbootstrap.com/) : We use the Material design bootstrap library to make the webpages more appealing.

3. Javascript : This is used to handle all our backend operations which include; posting to the database, getting data to the database etc.

4.  [PouchDB ](https://pouchdb.com/) : This is a javascript library that helps websites to connect to CouchDB database.

5.  [CouchDB ](https://couchdb.apache.org/) : This a NoSql database that one can store and retrieve data.

6. [Smtp.js ](https://smtpjs.com/) : This javascript library helps users to send emails through a configured smtp server. We make use of the Gmail smtp server.

7. [ChartJS ](https://chartjs.org/) : It is used to create charts and graphs on the HTML5 canvas.

## Prerequisite
### In order to use the Finance Tracker application you need to set the environment for the application to run well.

You need to install CouchDB. 

* If your'e on windows or Mac, [Click here](https://couchdb.apache.org/#download) to download.

* If your'e on Linux/Ubuntu/Debian you need to install through your terminal.
 
 1. Copy the following command to install CouchDB
 ```bash
 $ sudo snap install couchdb
 ```

 2. Verify your installation
 ```bash
 $ curl localhost:5984
 ```
 *you should see something like :

 ```json
 {"couchdb":"Welcome","version":"2.2.0","..."}
 ```

3. Set up [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/)
```bash
$ npm install -g add-cors-to-couchdb
```

4. Add CORS to couchDB
```bash
$ add-cors-to-couchdb
```

5. Now you are all set up to go.

## Installation
To use the Finance Tracker application, you can either :
* Use the hosted static pages online
* Download the project and use it offline

To use the hosted pages [Click here](https://linusmuema.github.io/Finance-Tracker/)

To Download the project files [Click here](https://github.com/LinusMuema/Finance-Tracker/archive/master.zip)

If you have downloaded the project files:
1. Extract the files to your preferred location on your machine
2. Open the index.html file in your preferred browser and use the application.

## License
* This project uses the [MIT](LICENSE) license.








    

