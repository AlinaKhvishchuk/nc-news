# Northcoders News API

# Environment Variables

These environment variables can be set in a .env file in the root directory of the project. However, since the .env.\* files are ignored by Git, you will need to create your own version of the file with the necessary environment variables.

To create the .env file, follow these steps:

- You will need to create two .env files for your project: .env.test and .env.development.

- Into each, add PGDATABASE=<database_name_here>, with the correct database name for that environment (see /db/setup.sql for the database names).
