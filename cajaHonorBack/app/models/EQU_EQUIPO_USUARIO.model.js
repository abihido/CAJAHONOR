const sql = require("./db.js");
// constructor
const EQUEQUIPOUSUARIO = function(equequipousuario) {
  this.USU_ID = equequipousuario.USU_ID;
  this.EQP_ID = equequipousuario.EQP_ID;
  this.FECHA = equequipousuario.FECHA;
};

EQUEQUIPOUSUARIO.create = (newEQUsuario, result) => {
    sql.query("INSERT INTO EQU_EQUIPO_USUARIO SET ?", newEQUsuario, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created EQUEQUIPOUSUARIO: ", { id: res.insertId, ...newEQUsuario });
      result(null, { id: res.insertId, ...newEQUsuario });
    });
  };

module.exports = EQUEQUIPOUSUARIO;