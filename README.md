

### SETUP:

Please begin by installing Docker.

To set up a database container run the following command:

```docker run -d -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=db_example -p 3306:3306  mysql:latest```

To set up the frontend code run the following command

```npm install```



The backend of the app is written in Java using the Spring boot framework.
Gradle and Java 8 will be needed to run the backend of the application
I chose spring because I wanted to learn it. This was my first time developing a backend in Java
and my second time developing any type of backend endpoints

To run the backend run the following 4 commands

```
gradle build
gradle wrapper --gradle-version 2.13
./gradlew build
./gradlew bootRun
```


To run the frontend server, run the following command

```npm run dev-serve```

### DESIGN

The backend of the app has two entities Employee and Review: 

 Employee which has the properties: Name, Review, and AssignedReviews

Employee which has the properties: Body, Completed, Reviewee, and Reviewees


There is a OneToOne relationship between Employee.Review and Review.reviewee


There is a ManyToMany relationship between Employee.assignedReviews and Review.reviewers

The frontend code uses React and Redux.

The app uses React Router to navigate between react components. 

For Styling I used a lightweight CSS framework called muicss

TODO:
* Separate the CSS into stylesheets and added it to the bundle using webpack
* Add test coverage using Enzyme, Tape, and Sinon





