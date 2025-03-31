<template>
  <div class="sidebar_blog_2">
    <h4 style="text-align: center">Tableau de Bord</h4>
    <ul class="list-unstyled components">
         <li>
        <a href="" @click.prevent="affichePage('typeEquipement')"
          ><i class="fa fa-hand-o-right"></i>
          <span>Type Equipement ASC</span></a
        >
      </li>
       <li>
        <a href="" @click.prevent="affichePage('equipement')"
          ><i class="fa fa-hand-o-right"></i>
          <span>Equipement ASC</span></a
        >
      </li>
      <li>
        <a href="" @click.prevent="affichePage('AffectationEquipement')"
          ><i class="fa fa-hand-o-right"></i> <span>Affectation des équipements</span></a
        >
      </li>
      <!-- 
      <li>
        <a href="" @click.prevent="affichePage('')"
          ><i class="fa fa-hand-o-right"></i>
          <span>Equipement en panne</span></a
        >
      </li> -->
  <!-- <li>
        <a href="" @click.prevent="affichePage('')"
          ><i class="fa fa-hand-o-right"></i>
          <span>Suivi des stocks </span></a
        >
      </li> -->
      <li style="background-color: #007b9a">
        <a href="" @click.prevent="affichePage('presentation')"
          ><i class="fa fa-eye"></i> <span>VOIR LES MODULES</span></a
        >
      </li>
    </ul>
  </div>
</template>

<script>
//import { useStore } from "vuex"; // Importation du store
import { mapActions } from "vuex";

export default {
  components: {},
  name: "Counter",

  user: {
    numero: "",
    password: "",
  },
  data() {
    return {};
  },
  created() {
    // this.id_module = localStorage.getItem("id_module");
  },
  computed: {
    //  nameUser() {
    //   let objLinea = localStorage.getItem("User");
    //   let objJson = JSON.parse(objLinea);
    //   return objJson.noms;
    // },
  },

  methods: {
    ...mapActions(["login"]),

    async affichePage(route_name) {
      this.$router.push({
        name: route_name,
      });
    },
    // Appeler une action pour récupérer l'utilisateur
  },
};
</script>

<style scoped>
li:hover {
  background-color: #5f8ca3 !important;
  font-weight: bold !important;
  font-size: 16px !important;
  font-family: Arial, sans-serif !important;
}
</style>
