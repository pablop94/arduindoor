const db = require("../models");
const Temperature = db.temperature;
const moment = require('moment')

// Create and Save a new Temperature    
exports.create = (req, res) => {
    // Validate request
    if (!req.body.topic) {
      res.status(400).send({ message: "Content has to be completed!" });
      return;
    }
  
    // Create a Temperature
    const temperature = new Temperature({
      topic: req.body.topic,
      dateTime: req.body.dateTime,
      value: req.body.value
    });
  
    // Save Temperature in the database
    temperature
      .save(temperature)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Temperature."
        });
      });
  };

exports.logTemperature = (temperature) => {
  const newTemperature = new Temperature(temperature)
  newTemperature
    .save(newTemperature)    
  };



// Retrieve all Temperatures from the database.
exports.findAll = (req, res) => {
  const date = req.query.date;
  const yesterday = moment(date).startOf('day').toDate();
  const tomorrow = moment(yesterday).endOf('day').toDate();
  
  console.log('date', date);
  console.log('yesterday', yesterday)
  console.log('tomorr', tomorrow)
  const topic = req.query.topic;

  const condition =  date ? { topic: topic, createdAt: {
    $gte: yesterday,
    $lte: tomorrow
  } } : { topic: topic };
  Temperature.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving temperatures."
      });
    });
};

// Find a single Temperature with an id
exports.findOne = (req, res) => {
  
};

// Update a Temperature by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Temperatures from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published Temperatures
exports.findAllPublished = (req, res) => {
  
};
