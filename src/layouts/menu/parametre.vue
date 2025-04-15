<template>
  <div class="sidebar_blog_2">
    <h4 style="text-align: center">Paramètres Généraux</h4>
    <ul class="list-unstyled components">

      <li v-if="codeRole(idRole)==1">
        <a href="" @click.prevent="affichePage('Role')"
          ><i class="fa fa-hand-o-right"></i> <span>Rôle</span></a
        >
      </li>
      <li v-if="codeRole(idRole)==1">
        <a href="" @click.prevent="affichePage('Module')"
          ><i class="fa fa-hand-o-right"></i> <span>Module</span></a
        >
      </li>

      <li v-if="codeRole(idRole)==1">
        <a href="" @click.prevent="affichePage('RoleModule')"
          ><i class="fa fa-hand-o-right"></i>
          <span>Autorisation des Module</span></a
        >
      </li>
      <li v-if="codeRole(idRole)==4">
        <a href="" @click.prevent="affichePage('utilisateur')"
          ><i class="fa fa-hand-o-right"></i> <span>Utilisateur </span></a
        >
      </li>
      <li v-if="codeRole(idRole)==4">
        <a href="" @click.prevent="affichePage('District')"
          ><i class="fa fa-hand-o-right"></i> <span>District</span></a
        >
      </li>
      <li v-if="codeRole(idRole)==4">
        <a href="" @click.prevent="affichePage('aireSanitaire')"
          ><i class="fa fa-hand-o-right"></i> <span>Aire Sanitaire</span></a
        >
      </li>
      <li v-if="codeRole(idRole)==4">
        <a href="" @click.prevent="affichePage('zoneIntervention')"
          ><i class="fa fa-hand-o-right"></i>
          <span>Zone d'Intervention</span></a
        >
      </li>
      
      <!-- <li>
        <a href="" @click.prevent="affichePage('medicament')"
          ><i class="fa fa-hand-o-right"></i> <span>Médicaments</span></a
        >
      </li> -->
      <li v-if="codeRole(idRole)==1">
        <a href="" @click.prevent="affichePage('vaccin')"
          ><i class="fa fa-hand-o-right"></i> <span>Vaccin</span></a
        >
      </li>

      <!-- <li>
        <a href="" @click.prevent="affichePage('')"
          ><i class="fa fa-hand-o-right"></i>
          <span>Traitements médicaments</span></a
        >
      </li>
      <li>
        <a href="" @click.prevent="affichePage('')"
          ><i class="fa fa-hand-o-right"></i>
          <span>Questions & Diagnostics</span></a
        >
      </li> -->
     
      
   
       <li v-if="codeRole(idRole)==4">
        <a href="" @click.prevent="affichePage('ZoneUtilisateur')"
          ><i class="fa fa-hand-o-right"></i>
          <span>Affectation des Zones</span></a
        >
      </li>
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
import { mapActions,mapGetters } from "vuex";

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

  },
  computed: {
        ...mapGetters(["getterRole", "loading", "getterinventaireequipements"]),
 idRole() {
      let objLinea = localStorage.getItem("User");
      let objJson = JSON.parse(objLinea);
      return objJson.id_roles;
    },
      codeRole() {
      return (id) => {
        if (id != null && id != "") {
          let qtereel = this.getterRole.find((qtreel) => qtreel.id == id);

          if (qtereel) {
            return qtereel.code;
          }
          return "";
        }
      };
    },
  },

  methods: {
    ...mapActions([
      "login",
      "logoutUser",
      "getRoles",
      "getInventaireEquipement",
    ]),

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
