<template>
  <div class="sidebar_blog_2">
    <h4 style="text-align: center">Paramètres Généraux</h4>
    <ul class="list-unstyled components">


      <li >
        <a href="" @click.prevent="affichePage('typeEquipement')"
          ><i class="fa fa-hand-o-right"></i>
          <span style="font-size: 17px !important;font-weight: bolder;font-family:Georgia, 'Times New Roman', Times, serif;">Type Equipement </span></a
        >
      </li>
       <li >
        <a href="" @click.prevent="affichePage('equipement')"
          ><i class="fa fa-hand-o-right"></i>
          <span style="font-size: 17px !important;font-weight: bolder;font-family:Georgia, 'Times New Roman', Times, serif;">Equipement</span></a
        >
      </li>
     
      <li>
        <a href="" @click.prevent="affichePage('utilisateur')"
          ><i class="fa fa-hand-o-right"></i> <span style="font-size: 17px !important;font-weight: bolder;font-family:Georgia, 'Times New Roman', Times, serif;">Utilisateur </span></a
        >
      </li>
      <li>
        <a href="" @click.prevent="affichePage('District')"
          ><i class="fa fa-hand-o-right"></i> <span style="font-size: 17px !important;font-weight: bolder;font-family:Georgia, 'Times New Roman', Times, serif;">District</span></a
        >
      </li>
      <li>
        <a href="" @click.prevent="affichePage('aireSanitaire')"
          ><i class="fa fa-hand-o-right"></i> <span style="font-size: 17px !important;font-weight: bolder;font-family:Georgia, 'Times New Roman', Times, serif;">Aire Sanitaire</span></a
        >
      </li>
      <li>
        <a href="" @click.prevent="affichePage('zoneIntervention')"
          ><i class="fa fa-hand-o-right"></i>
          <span style="font-size: 17px !important;font-weight: bolder;font-family:Georgia, 'Times New Roman', Times, serif;">Zone d'Intervention</span></a
        >
      </li>
      
      <!-- <li>
        <a href="" @click.prevent="affichePage('medicament')"
          ><i class="fa fa-hand-o-right"></i> <span>Médicaments</span></a
        >
      </li> -->
      <li>
        <a href="" @click.prevent="affichePage('vaccin')"
          ><i class="fa fa-hand-o-right"></i> <span style="font-size: 17px !important;font-weight: bolder;font-family:Georgia, 'Times New Roman', Times, serif;">Vaccin</span></a
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
     
      
   
       <li>
        <a href="" @click.prevent="affichePage('ZoneUtilisateur')"
          ><i class="fa fa-hand-o-right"></i>
          <span style="font-size: 17px !important;font-weight: bolder;font-family:Georgia, 'Times New Roman', Times, serif;">Affectation des Zones</span></a
        >
      </li>
            <li>
        <a href="" @click.prevent="affichePage('Role')"
          ><i class="fa fa-hand-o-right"></i> <span style="font-size: 17px !important;font-weight: bolder;font-family:Georgia, 'Times New Roman', Times, serif;">Rôle</span></a
        >
      </li>
      <li>
        <a href="" @click.prevent="affichePage('Module')"
          ><i class="fa fa-hand-o-right"></i> <span style="font-size: 17px !important;font-weight: bolder;font-family:Georgia, 'Times New Roman', Times, serif;">Module</span></a
        >
      </li>
       <li>
        <a href="" @click.prevent="affichePage('RoleModule')"
          ><i class="fa fa-hand-o-right"></i>
          <span style="font-size: 16px !important;font-weight: bolder;font-family:Georgia, 'Times New Roman', Times, serif;">Autorisation des Module</span></a
        >
      </li>
      <li style="background-color: #007b9a">
        <a href="" @click.prevent="affichePage('presentation')"
          ><i class="fa fa-eye"></i> <span style="font-size: 17px !important;font-weight: bolder;font-family:Georgia, 'Times New Roman', Times, serif;">VOIR MODULES</span></a
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
