const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const auth = require("./Routes/auth");

require("dotenv").config();

app.use(cors());
app.use(express.json());

// getting info from env
const db_host = process.env.DB_HOST;
const db_user = process.env.DB_USER;
const db_password = process.env.DB_PASSWORD;
const db_database = process.env.DB_DATABASE;
const db_port = process.env.DB_PORT;
const port = process.env.PORT;

const db = mysql.createPool({
  connectionLimit: 100,
  host: db_host,
  user: db_user,
  password: db_password,
  database: db_database,
  port: db_port,
});

db.getConnection((err, connection) => {
  if (err) {
    throw err;
  }
  console.log(`Database connections successful ${connection.threadId}`);
});

app.use("/auth", auth);

app.listen(port, () => {
  console.log(`Server Started On Port ${port}`);
});
