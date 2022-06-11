const EQP_EQUIPO = require("../models/EQP_EQUIPO.model.js");
const USU_USUARIO = require("../models/USU_USUARIO.model.js");
const EQU_EQUIPO_USUARIO = require("../models/EQU_EQUIPO_USUARIO.model.js");
var dateTime = require('node-datetime')
var dt = dateTime.create();

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
            message: "Porfavor llene todos los campos!"
        });
    }

    USU_USUARIO.findById(req.body.usId, (err, dataus) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No se encontro un usuario con la cedula ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error buscando al usuario con cedula : " + req.params.id
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
                if (err) {
                    if (err.code = "ER_DUP_ENTRY") {

                        res.status(500).send({
                            message:
                                "Esta placa ya pertenece a otro equipo"
                        });
                    }
                    else {
                        res.status(500).send({
                            message:
                                err.message || "La placa del equipo se encuentra repetida."
                        });
                    }
                }
                else {

                    const unionTable = new EQU_EQUIPO_USUARIO({
                        USU_ID: dataus.USU_ID,
                        EQP_ID: data.id,
                        FECHA: dt
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