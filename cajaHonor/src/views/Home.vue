<template>
  <div id="homeBody">
    <div id="moduleBack">
      <div class="formulary">
        <div class="label">Cedula</div>
        <input v-model="document" placeholder="Cedula" />
      </div>

      <div class="formulary">
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
      <div class="formulary">
        <div class="label">Placa</div>
        <input v-model="Placa" placeholder="Placa" />
      </div>
      <div class="formulary">
        <div class="label">Nombre Equipo</div>
        <input v-model="NombreEquipo" placeholder="NombreEquipo" />
      </div>
      <div class="formulary">
        <div class="label">Marca</div>
        <input v-model="Marca" placeholder="Marca" />
      </div>
      <div class="formulary">
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
        id:0
      },
    };
  },
  methods: {
    methodToRunOnSelect(payload) {
      this.object2 = payload;
    },
    getdb() {
      if(this.checked){
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
        .then((response) => console.log(response));
    }},
  },
  created() {
    axios.get("http://localhost:3500/EQT").then((response) => {
      response.data.forEach(element => {
        this.opcionestipo.push({"name":element.EQT_DESCRIPCION,"id":element.EQT_ID});
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
  background-color: rgb(232, 234, 236, 0.8);

  width: 50vw;
  min-height: 85vh;
}
#homeBody {
  display: flex;
  justify-content: center;
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
}

#sender {
  font-size: 2vw;
  margin: 1vw;
}
</style>