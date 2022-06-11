const sql = require("./db.js");
// constructor
const EQUEQUIPOUSUARIO = function(equequipousuario) {
  this.USU_ID = equequipousuario.USU_ID;
  this.EQP_ID = equequipousuario.EQP_ID;
  this.FECHA = equequipousuario.FECHA;
  this.FECHA_FINAL = equequipousuario.FECHA_FINAL;
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

  EQUEQUIPOUSUARIO.findById = (id,id2, result) => {
    sql.query(`SELECT * FROM EQU_EQUIPO_USUARIO WHERE EQP_ID = ${id} and USU_ID = ${id2}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found EQU_EQUIPO_USUARIO: ", res[0]);
        result(null, res[0]);
        return;
      }
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
    });

  };

  EQUEQUIPOUSUARIO.endByid = (id,id2,result) =>{
    sql.query(`update EQU_EQUIPO_USUARIO set FECHA_FINAL = NOW() where USU_ID = ${id} and EQP_ID = ${id2}`,(err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("updated EQUEQUIPOUSUARIO: ", {res});
      result(null, { res });
    });


  }


module.exports = EQUEQUIPOUSUARIO;