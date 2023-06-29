# Alina's news - Backend project (reddit clone)

This project aims to build a robust backend API for accessing application data programmatically. The goal is to mimic the functionality of real-world backend services like Reddit, where the API provides information to the frontend architecture.

The API will be developed using Node.js and will interact with a PostgreSQL (PSQL) database. The project will utilize the node-postgres library to establish a connection between the API and the database.

## API Documentation

The API documentation for the Alina's News project can be found at [https://nc-news-00jh.onrender.com/api/](https://nc-news-00jh.onrender.com/api/). It provides details on available endpoints and request/response formats.

## Packages used

- PSQL
- Nodemon
- Jest
- Jest sorted
- Supertest

# Environment Variables

These environment variables can be set in a .env file in the root directory of the project. However, since the .env.\* files are ignored by Git, you will need to create your own version of the file with the necessary environment variables.

To create the .env file, follow these steps:

- You will need to create two .env files for your project: .env.test and .env.development.

- Into each, add PGDATABASE=<database_name_here>, with the correct database name for that environment (see /db/setup.sql for the database names).

## Usage

To run Alina's News locally, follow these steps:

1. Clone the repository: `https://github.com/AlinaKhvishchuk/nc-news.git`
2. Navigate to the project directory: `cd nc-news`
3. Install dependencies: `npm install`
4. Configure the PostgreSQL connection parameters in the .env file.
5. Set up the PostgreSQL database and tables according to the project requirements.
6. Start the server: npm start

## API Documentation

The API documentation for the Alina's News project can be found at [https://nc-news-00jh.onrender.com/api/](https://nc-news-00jh.onrender.com/api/). It provides details on available endpoints and request/response formats.

## Contact

If you have any questions or inquiries, please feel free to contact me at alina.khvishchuk@gmail.com
