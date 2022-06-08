module.exports = app => {
    const eqtequipos = require("../controllers/EQP_EQUIPO.controller.js");
    var router = require("express").Router();
    // Create a new Tutorial
    // Retrieve a single Tutorial with id
    router.get("/", eqtequipos.findAll);
    router.post("/", eqtequipos.create);
    // Update a Tutorial with id
    app.use('/EQ', router);
  };