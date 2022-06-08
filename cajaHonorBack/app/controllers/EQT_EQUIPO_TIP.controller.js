const EQT_EQUIPO_TIP = require("../models/EQT_EQUIPO_TIP.model.js");

exports.findAll = (req, res) => {
    EQT_EQUIPO_TIP.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving EQT_EQUIPO_TIP."
        });
      else res.send(data);
    });
  };