<template>
  <div id="homeBody">
    <div id="header">
      <img id="logoMin" src="../assets/logoMNSDEF.png" />
      <img id="logoCH" src="../assets/logoCH.png" />
    </div>
    <div id="moduleBack">
      <div class="formulary rowFormulary">
        <div class="label">Cedula</div>
        <input v-model="document" placeholder="Cedula" />
      </div>

      <div class="formulary rowFormulary">
        <div class="label">Tipo de Equipo</div>
        <dropdown
          class="my-dropdown-toggle"
          :options="opcionestipo"
          :selected="object2"
          v-on:updateOption="methodToRunOnSelect"
          :placeholder="'Select an Item'"
          :closeOnOutsideClick="true"
        >
        </dropdown>
      </div>
      <div class="formulary rowFormulary">
        <div class="label">Placa</div>
        <input v-model="Placa" placeholder="Placa" />
      </div>
      <div class="formulary rowFormulary">
        <div class="label">Nombre Equipo</div>
        <input v-model="NombreEquipo" placeholder="NombreEquipo" />
      </div>
      <div class="formulary rowFormulary">
        <div class="label">Marca</div>
        <input v-model="Marca" placeholder="Marca" />
      </div>
      <div class="formulary rowFormulary">
        <div class="label">Modelo</div>
        <input v-model="Modulo" placeholder="Modulo" />
      </div>

      <div class="formulary">
        <div class="label">¿Estas seguro de enviar los datos?</div>
        <input type="checkbox" id="checkbox" v-model="checked" />
      </div>

      <div class="formulary">
        <button id="sender" v-on:click="getdb">Enviar</button>
      </div>
    </div>
  </div>
</template>

<script>
import dropdown from "vue-dropdowns";
import axios from "axios";
import swal from "sweetalert";
export default {
  components: { dropdown },
  data() {
    return {
      document: "",
      Placa: "",
      NombreEquipo: "",
      Marca: "",
      Modulo: "",
      checked: false,
      opcionestipo: [],
      object2: {
        name: "Tipo Equipo",
        id: 0,
      },
    };
  },
  methods: {
    methodToRunOnSelect(payload) {
      this.object2 = payload;
    },
    getdb() {
      if (this.checked) {
        const creation = {
          EQP_PLACA: this.Placa,
          EQP_MARCA: this.Marca,
          EQP_MODELO: this.Modulo,
          EQP_NAME: this.NombreEquipo,
          EQT_ID: this.object2.id,
          usId: this.document,
        };

        axios
          .post("http://localhost:3500/EQ", creation)
          .then((response) => {
            if (response.status > 200) {
              swal("ERROR", response.data.message, "error");
            } else {
              swal(
                "¡Equipo Asociado!",
                "El equipo ha sido asociado al usuario",
                "success"
              );
            }

            console.log(response);
          })
          .catch((err) => {
            console.log(err);
           /* if (err.response.status == 500) {
              swal("ERROR", "Esta placa ya pertenece a otro equipo", "error");
            } else {
              swal("ERROR", err.response.data.message, "error");
            }*/
            swal("ERROR", err.response.data.message, "error");
          });
      }
    },
  },
  created() {
    axios.get("http://localhost:3500/EQT").then((response) => {
      response.data.forEach((element) => {
        this.opcionestipo.push({
          name: element.EQT_DESCRIPCION,
          id: element.EQT_ID,
        });
      });
      console.log(this.opcionestipo);
    });
  },
};
</script>

<style scoped>
.my-dropdown-toggle {
  border-radius: 5px;
  background-color: white;
}

.dropdown-toggle {
  color: tomato;
  font-size: 25px;
  font-weight: 800;
}

.dropdown-toggle-placeholder {
  color: #c4c4c4;
}

#moduleBack {
  margin: 0 3vw 5vh 0;
  background-color: rgb(255, 255, 255, 0.85);
  padding: 3vh 0 3vh 0;
  border-radius: 1vw;
  color: black;
  width: 40vw;
}
#homeBody {
  display: flex;
  flex-flow: column;
  justify-content: top;
  align-items: end;
  width: 100%;
  height: 100%;
  /*background: url('..\images\mainBackground.jpeg') no-repeat center center fixed;*/
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

.label {
  font-size: 1.5vw;
  margin: 1vw;
}

.formulary {
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  padding: 0 5vw 0 5vw;
}

.rowFormulary {
  justify-content: space-between !important;
}

#sender {
  font-size: 2vw;
  margin: 1vw;
  border-radius: 1vh;
}

#header {
  background-color: white;
  margin-bottom: 6vh;
  width: 100%;
  padding: 1.5vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

#logoMin {
  padding-left: 2vw;
}

#logoCH {
  padding-right: 2vw;
}
</style>