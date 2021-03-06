const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
var mqttHandler = require('./mqtt_handler');

var corsOptions = {
  origin: "http://localhost:3001"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
require("./routes/temperature.routes")(app);

const db = require("./models");

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Arduindoor" });
  });


// set port, listen for requests
var server = app.listen(3003, function () {
    console.log("app running on port.", server.address().port);
});

//MQTT
var mqttClient = new mqttHandler();
mqttClient.connect();

app.post("/send-mqtt", function(req, res) {
  mqttClient.sendMessage(req.body.message);
  res.status(200).send("Message sent to mqtt");
});
