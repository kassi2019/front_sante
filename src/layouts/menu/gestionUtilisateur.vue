<template>
  <div class="sidebar_blog_2">
    <h4>Gestion des Utilisateurs</h4>
    <ul class="list-unstyled components">
      <li>
        <a href="" @click.prevent="affichePage('Role')"
          ><i class="fa fa-hand-o-right"></i> <span>Rôle</span></a
        >
      </li>
      <li>
        <a href="" @click.prevent="affichePage('Module')"
          ><i class="fa fa-hand-o-right"></i> <span>Module</span></a
        >
      </li>
      <li>
        <a href="" @click.prevent="affichePage('RoleModule')"
          ><i class="fa fa-hand-o-right"></i>
          <span>Affectation des Module</span></a
        >
      </li>
      <li>
        <a href="" @click.prevent="affichePage('utilisateur')"
          ><i class="fa fa-hand-o-right"></i> <span>Utilisateur </span></a
        >
      </li>
      <li style="background-color:#007b9a" >
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

<style>
a {
  font-size: 16px !important;
  font-weight: bolder !important;
}

/* Effet de survol */
a:hover {
  background-color: #3498db; /* Changer la couleur de fond */
  color: white; /* Changer la couleur du texte */
  border-radius: 5px; /* Ajouter des coins arrondis */
  transform: scale(1.1); /* Agrandir légèrement le lien */
}
</style>
