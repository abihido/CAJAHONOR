const sql = require("./db.js");
// constructor
const EQPEQUIPO = function(eqpequipo) {
  this.EQP_ID = eqpequipo.EQP_ID;
  this.EQP_PLACA = eqpequipo.EQP_PLACA;
  this.EQP_MARCA = eqpequipo.EQP_MARCA;
  this.EQP_MODELO = eqpequipo.EQP_MODELO;
  this.EQP_NAME = eqpequipo.EQP_NAME;
  this.EQT_ID = eqpequipo.EQT_ID;
};
EQPEQUIPO.getAll = ( result) => {
  let query = "SELECT * FROM EQP_EQUIPO";
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err,null);
      return;
    }
    console.log("eqpequipo: ", res);
    result(null, res);
  });
};
EQPEQUIPO.create = (newEQPEQUIPO, result) => {
  sql.query("INSERT INTO EQP_EQUIPO SET ?", newEQPEQUIPO, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created EQPEQUIPO: ", { id: res.insertId, ...newEQPEQUIPO });
    result(null, { id: res.insertId, ...newEQPEQUIPO });
  });
};

module.exports = EQPEQUIPO;