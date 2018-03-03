# Asapp-Chat

[Asapp-Chat](https://asapp-chat.herokuapp.com/) is a web application for staying in touching with friends

## Setup
* Download and run npm install to load dependencies
* create and migrate a db with Postgres
* Run npm run start
* Go to localhost://8000

![Wireframe Instructions](https://github.com/SSJ6Porfy/chat-app-challange/blob/master/frontend/static/images/asapp1.png)

## Features

* Users can create accounts with secure authentication
* Users can create message between Laura and Rob.

![Wireframe Instructions](https://github.com/SSJ6Porfy/chat-app-challange/blob/master/frontend/static/images/asapp2.png)

## Technology

### Backend

* Database
  * PostgreSQL, an object-relational database management system (ORDBMS) was used
for the database.  
* Heroku
  * The Application is hosted on Heroku
* Dependencies
  * BCrypt for secure auth
  * Passport for auth
  * Sequelize for ORM with Postgres DB
  * EJS for serving static page

### Frontend

* React/Redux
  * Used react components with Redux predictable state container.

* npm is used manage all frontend dependencies.
  * babel-core
  * babel-loader
  * babel-preset-es2015
  * babel-preset-react
  * react
  * react-dom
  * react-redux
  * react-router-dom
  * redux
  * redux-logger
  * redux-thunk
  * webpack
  * axios
