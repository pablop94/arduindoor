const db = require("../models");
const Temperature = db.temperature;

// Create and Save a new Temperature    
exports.create = (req, res) => {
    // Validate request
    if (!req.body.topic) {
      res.status(400).send({ message: "Content can not be empty!" });
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
  

// Retrieve all Temperatures from the database.
exports.findAll = (req, res) => {
    // const maxDateTime = req.query.maxDateTime;
    // const topic = req.query.topic;
    // var condition = maxDateTime ? { dateTime: { $gte: maxDateTime }, topic: { $regex: new RegExp(topic), $options: "i" } } : { topic: { $regex: new RegExp(topic), $options: "i" }};
    // console.log(condition)
    // console.log(req)
    Temperature.find()
      .then(data => {
        res.send(data);
        console.log('res', res)
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
