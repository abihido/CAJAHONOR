const EQP_EQUIPO = require("../models/EQP_EQUIPO.model.js");
const USU_USUARIO = require("../models/USU_USUARIO.model.js");
const EQU_EQUIPO_USUARIO = require("../models/EQU_EQUIPO_USUARIO.model.js");

exports.findAll = (req, res) => {
    EQP_EQUIPO.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving EQP_EQUIPO."
            });
        else res.send(data);
    });
};


exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    USU_USUARIO.findById(req.body.usId, (err, dataus) => {
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
        } else {
            // Create a Tutorial
            const tutorial = new EQP_EQUIPO({
                EQP_PLACA: req.body.EQP_PLACA,
                EQP_MARCA: req.body.EQP_MARCA,
                EQP_MODELO: req.body.EQP_MODELO,
                EQP_NAME: req.body.EQP_NAME,
                EQT_ID: req.body.EQT_ID

            });
            // Save Tutorial in the database
            EQP_EQUIPO.create(tutorial, (err, data) => {
                if (err)
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while creating the EQP_EQUIPO."
                    });
                else {

                    const unionTable = new EQU_EQUIPO_USUARIO({
                        USU_ID: dataus.USU_ID,
                        EQP_ID: data.id,
                        FECHA: new Date().getDate()
                    });

                    EQU_EQUIPO_USUARIO.create(unionTable, (err, dataeq) => {
                        if (err)
                            res.status(500).send({
                                message:
                                    err.message || "Some error occurred while creating the EQU_EQUIPO_USUARIO."
                            });
                        else {
                            res.send(data);
                        }
                    })




                }
            });


        }
    });



};