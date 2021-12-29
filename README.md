# express-shop

Implementation a Backend to manage shop with:
* Clean architecture
* REST API structure
* ORM and migrations db
* Authentication and JWT 
* Docker-compose environment

## Requirements

* [Node.JS LTS](https://nodejs.org/es/)

## Quick Start

After clone the project, install dependencies:

```bash
$ npm install
```

Create your own environment variables (.env):

```env
//Example:
PORT=3000
DB_USER='example'
DB_PASSWORD='example'
DB_HOST='localhost'
DB_NAME='my_example'
DB_PORT='5432'
DATABASE_URL='postgres://example:example@localhost:5432/my_example'
API_KEY=example
JWT_SECRET=example
EMAIL_USER=example@example.com
EMAIL_PASS=example
```

Run the main migration to create database structure (make sure have postgres running and in the root folder exist postgres_data to save the volumes of docker-compose):

```bash
$ npm run migrations:run
```

Execute the project in development mode:
```bash
$ npm run dev
```
