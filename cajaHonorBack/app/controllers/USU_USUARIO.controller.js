const USU_USUARIO = require("../models/USU_USUARIO.model.js");

exports.findOne = (req, res) => {
    
    USU_USUARIO.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found USER with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving USER with id " + req.params.id
          });
        }
      } else res.send(data);
    });
  };