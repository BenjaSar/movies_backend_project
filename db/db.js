const mySql = require("mysql2");
const connection = mySql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "rent_movies",
});

connection.connect((err) => {
  if (err) {
    console.error("An error occurred while trying to connect to the database. Possible reasons include incorrect database credentials, database server downtime, or network issues. Please verify your connection details and try again. If the issue persists, contact the database administrator", err);
    return;
  }

  console.log("Connected to the db");

  connection.query(
    "CREATE DATABASE IF NOT EXISTS rent_movies",
    (err, results) => {
      if (err) {
        console.log("An error occurred while creating the database");
        return;
      }

      console.log("The database created in succesful way");

      connection.changeUser({ database: "rent_movies" }, (err) => {
        if (err) {
          console.error("An error occurred while changing the user data", err);
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
                );            
            `;

        connection.query(createTableQuery, (err, results) => {
          if (err) {
            console.log("An error occurred while creating the table", err);
            return;
          }

          console.log("The table was created in a succesful way");
        });
      });
    }
  );
});

module.exports = connection;
