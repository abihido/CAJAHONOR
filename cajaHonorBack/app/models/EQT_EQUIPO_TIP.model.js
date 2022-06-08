const sql = require("./db.js");
// constructor
const EQTEQUIPOTIP = function(eqtequipotip) {
  this.EQT_ID = eqtequipotip.EQT_ID;
  this.EQT_CODIGO = eqtequipotip.EQT_CODIGO;
  this.EQT_DESCRIPCION = eqtequipotip.EQT_DESCRIPCION;
};
EQTEQUIPOTIP.findById = (id, result) => {
    sql.query(`SELECT * FROM EQT_EQUIPO_TIP WHERE EQT_ID = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found EQT_EQUIPO_TIP: ", res[0]);
        result(null, res[0]);
        return;
      }
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
    });

  };


  EQTEQUIPOTIP.getAll = ( result) => {
    let query = "SELECT * FROM EQT_EQUIPO_TIP";
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("eqtequipotip: ", res);
      result(null, res);
    });
  };

  module.exports = EQTEQUIPOTIP;