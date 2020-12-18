const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const router = require("./routes/api");
const routes = require("./routes/api");

const app = express();
const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`listening on ${PORT}`));

////connect to DB
const mongodb_uri = process.env.MONGODB_URI;

mongoose.connect(mongodb_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected");
});

// Data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//custom variable for heroku
if (process.env.NODE_ENV === "production") {
  //if this env var is on heroku then run the code
  app.use(express.static("client/build"));
}

//routes
app.use("/api", routes); //all the routes in the routes module will be accessed via "/api/<rest_of_route>"

// HTTP request logger
app.use(morgan("tiny"));
