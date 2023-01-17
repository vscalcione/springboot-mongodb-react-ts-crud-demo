# springboot-mongodb-react-ts-crud-demo

## Backend
![java-logo](https://img.icons8.com/color/60/000000/java-coffee-cup-logo--v1.png)
![springboot-logo](https://img.icons8.com/color/60/000000/spring-logo.png)
![rest-api-logo](https://img.icons8.com/ultraviolet/60/000000/api-settings.png)
![openapi-logo](https://img.icons8.com/color/60/000000/cloud-function.png)
![postman-logo](https://img.icons8.com/dusk/60/000000/postman-api.png)
![mongodb-logo](https://img.icons8.com/color/60/000000/mongodb.png)
![swagger-logo](https://avatars.githubusercontent.com/u/7658037?s=60&v=4)

To compile the backend module, made with Java 8, Maven, SpringBoot, MongoDB and OpenAPI, you can run these commands:
```bash
$ cd springboot-mongodb-crud-application
$ mvn clean (to clean target directory)
$ mvn clean install -U -DSkipTests=true
$ mvn spring-boot:run
```

## Frontend
![react-logo](https://img.icons8.com/office/60/000000/react.png)
![typescript-logo](https://img.icons8.com/color/60/000000/typescript.png)
![material-ui-logo](https://img.icons8.com/color/60/000000/material-ui.png)
![node-logo](https://img.icons8.com/color/60/000000/nodejs.png)
![npm-logo](https://img.icons8.com/color/60/000000/npm.png)

To compile the frontend module, made with React + Typescript support and Material-UI, you can run these commands:
```bash
$ cd react-ts-material-ui-crud-demo
$ npm install
$ npm run start:json-server (to run json-server with fake data because Java backend cannot deployed in some cloud platforms)
$ npm start
```
