module.exports = app => {
    const usuusuarios = require("../controllers/USU_USUARIO.controller.js");
    var router = require("express").Router();
    // Create a new Tutorial
    // Retrieve a single Tutorial with id
    router.get("/:id", usuusuarios.findOne);
    // Update a Tutorial with id
    app.use('/US', router);
  };