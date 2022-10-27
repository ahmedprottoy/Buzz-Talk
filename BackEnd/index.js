const express = require("express");
const app = express();
const db = require("./config/db");
const cors = require("cors");
const auth = require("./Routes/auth");
const port = process.env.PORT;
const { request } = require("http");
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();
const http = require('http');

const server = http.createServer(app);
const io = require('socket.io')(server)

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  })
);

// app.use(cors());
// middleware <<
app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

app.use(
  session({
    key: "userID",
    secret: "trying Out session cookie",
    resave: false,
    saveUninitialized: false,
    cookie: { expires: 1000 * 60 * 60 * 24 },
  })
);

db.getConnection((err, connection) => {
  if (err) {
    throw err;
  }
  console.log(`Database connections successful  ${connection.threadId}`);
});



//socket connection is here
io.on('connection', socket => {
  socket.on('new-user', name => {
    console.log("socket connected")
  })
  socket.on('send-chat-message', data => {
    console.log(data)
    socket.broadcast.emit('chat-message', { message: data.message, sender: data.sender, receiver: data.receiver, conversationID: data.conversationID })
    const insertQuery = `INSERT INTO socialmedia.message_table (messageFrom, messageTo, messageText, date_time, conversationID) VALUES (?, ?, ?, now(), ?);`;
    db.query(insertQuery,[data.sender,data.receiver,data.message,data.conversationID],(err,result)=>{
      if(err){
        console.log(err)
      } else{
        console.log("okkkkkkk")
      }

    })

    const updateQuery = `update socialmedia.conversation_table set lastUpdate = now() where conversationID = ?;`
    db.query(updateQuery, [data.conversationID], (err, result) => {
      if(err){
        console.log(err);
      } else{
        console.log('ok')
      }
    })
  })
  
})



app.use("/auth", auth);
app.use(errorHandler.handle);

server.listen(port, () => {
  console.log(`Server Started On Port ${port}`);
});
