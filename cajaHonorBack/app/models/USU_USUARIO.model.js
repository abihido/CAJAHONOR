const sql = require("./db.js");
// constructor
const USUUSUARIO = function(usuusuario) {
  this.USU_ID = usuusuario.USU_ID;
  this.USU_IDENTIFICACION = usuusuario.USU_IDENTIFICACION;
  this.USU_NAME = usuusuario.USU_NAME;
  this.DEP_ID = usuusuario.DEP_ID;
};
USUUSUARIO.findById = (id, result) => {
    sql.query(`SELECT * FROM USU_USUARIO WHERE USU_IDENTIFICACION = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found USU_USUARIO: ", res[0]);
        result(null, res[0]);
        return;
      }
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
    });

  };

  module.exports = USUUSUARIO;