module.exports = app => {
    const temperatures = require("../controllers/temperature.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Temperature
    router.post("/", temperatures.create);
  
    // Retrieve all Temperatures
    router.get("/", temperatures.findAll);
  
    // Retrieve all published Temperatures
    router.get("/published", temperatures.findAllPublished);
  
    // Retrieve a single Temperature with id
    router.get("/:id", temperatures.findOne);
  
    // Update a Temperature with id
    router.put("/:id", temperatures.update);
  
    // Delete a Temperature with id
    router.delete("/:id", temperatures.delete);
  
    // Create a new Temperature
    router.delete("/", temperatures.deleteAll);
  
    app.use('/api/temperatures', router);

  };