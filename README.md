
The best way to run this app is through Docker.

Please install docker.

To set up a database container run the following command:

docker run -d -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=db_example -p 3306:3306  mysql:latest



The backend of the app is written in Java using the Spring boot framework.
Gradle and Java 8 will be needed to run the backend of the application

To run the backend run the following 3 commands

gradle
./gradlew build
./gradlew bootRun