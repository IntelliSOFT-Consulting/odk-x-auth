# odk-x-auth


### Description
An implementation of a LDAP client, focused on workflows relevant to ODK-X to standardize onboarding and support requirements in it's application suite.


#### Run in production.


`docker run -p 8080:8080 intellisoftkenya/odk-x-admin:latest`

Visit [http://localhost:8080](http://localhost:8080)

`docker build --pull --rm -f "Dockerfile" -t intellisoftkenya/odk-x-admin:latest "."`


#### Run in development mode.

Build the Docker image (Entire project)

`docker build --pull --rm -f "Dockerfile" -t intellisoftkenya/odk-x-admin:latest "."`


Build the Docker image (API only)

`docker build --pull --rm -f "./api/Dockerfile" -t intellisoftkenya/odk-x-admin-api:latest "."`
