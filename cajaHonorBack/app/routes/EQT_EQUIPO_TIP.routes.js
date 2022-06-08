module.exports = app => {
    const eqtequipotips = require("../controllers/EQT_EQUIPO_TIP.controller.js");
    var router = require("express").Router();
    // Create a new Tutorial
    // Retrieve a single Tutorial with id
    router.get("/", eqtequipotips.findAll);
    // Update a Tutorial with id
    app.use('/EQT', router);
  };