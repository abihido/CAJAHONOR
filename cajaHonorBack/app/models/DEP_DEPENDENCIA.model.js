const sql = require("./db.js");
// constructor
const DEPDEPENDENCIA = function(depdependencia) {
  this.DEP_ID = depdependencia.DEP_ID;
  this.DEP_CODIGO = depdependencia.DEP_CODIGO;
  this.DEP_DESCRIPCION = depdependencia.DEP_DESCRIPCION;
};

module.exports = DEPDEPENDENCIA;