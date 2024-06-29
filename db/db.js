const mySql = require("mysql2");
const connection = mySql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectTimeout: process.env.DB_TIMEOUT,
  multipleStatements: true, // Enable multiple statements
});

connection.connect((err) => {
  if (err) {
    console.error(
      "An error occurred while trying to connect to the database. Possible reasons include incorrect database credentials, database server downtime, or network issues. Please verify your connection details and try again. If the issue persists, contact the database administrator",
      err
    );
    return;
  }

  console.log("Connected succesfully to the db");

  connection.query(
    "CREATE DATABASE IF NOT EXISTS rent_movies",
    (err, results) => {
      if (err) {
        console.log("An error occurred while creating the database");
        return;
      }
      console.log("The database was created succesfully.");

      connection.changeUser({ database: "rent_movies" }, (err) => {
        if (err) {
          console.error(
            "An error occurred while changing to the rent_movies database.",
            err
          );
          return;
        }

        const createTableQuery = `
                CREATE TABLE IF NOT EXISTS users (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(250) NOT NULL,
                    surname VARCHAR(250) NOT NULL,
                    gender VARCHAR (100), 
                    birthday date NOT NULL, 
                    mail VARCHAR(255) NOT NULL, 
                    national_document_identity VARCHAR(20) NOT NULL
                ) ENGINE=InnoDB  DEFAULT CHARSET=utf8;  

                CREATE TABLE IF NOT EXISTS movies(
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(100) NOT NULL,
                    release_dt DATE, 
                    synopsis TEXT
                )ENGINE=InnoDB  DEFAULT CHARSET=utf8;

                CREATE TABLE IF NOT EXISTS movie_rent (
                    movie_id INT NOT NULL, 
                    user_id INT NOT NULL, 
                    PRIMARY KEY(user_id, movie_id), 
                    FOREIGN KEY (user_id) REFERENCES users(id),
                    FOREIGN KEY (movie_id) REFERENCES movies(id)      
                )ENGINE=InnoDB  DEFAULT CHARSET=utf8;

                CREATE TABLE IF NOT EXISTS genre (
                  id_genre INT AUTO_INCREMENT PRIMARY KEY,
                  description VARCHAR (100) NOT NULL
                  );
                `;
        connection.query(createTableQuery, (err, results) => {
          if (err) {
            console.log("An error occurred while creating the table", err);
            return;
          }
          console.log("Tables were created succesfully.", results);
        });

        // Close the connection
        /*connection.end((err) => {
          if (err) {
            console.error("Error closing the connection:", err.stack);
            return;
          }
          console.log("Connection closed.");
        });*/
      });
    }
  );
});

module.exports = connection;
