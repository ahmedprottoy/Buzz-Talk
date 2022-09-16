const express = require("express");
const app = express();
const db = require("./config/db");
const cors = require("cors");
const auth = require("./Routes/auth");
const port = process.env.PORT;
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();

app.use(cors());
// middleware <<
app.use(express.json());

db.getConnection((err, connection) => {
  if (err) {
    throw err;
  }
  console.log(`Database connections successful  ${connection.threadId}`);
});


app.use("/auth", auth);
app.use(errorHandler.handle);



app.listen(port, () => {
  console.log(`Server Started On Port ${port}`);
});
