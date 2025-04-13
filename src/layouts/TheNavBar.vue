<template>
  <div class="topbar">
    <nav class="navbar navbar-expand-lg navbar-light">
      <div class="full">
        <button
          type="button"
          id="sidebarCollapse"
          class="sidebar_toggle"
          style="height: 135px"
        >
          <i class="fa fa-bars"></i>
        </button>
        <div class="logo_section"></div>
        <div
          class="right_topbar"
          style="display: flex; align-items: center; gap: 10px"
        >
          <a>
            <br />
            <img
              class="img-responsive rounded-circle"
              src="/public/asset/images/layout_img/user_img.jpg"
              alt="#"
              style="width: 70px; margin: 0 7px"
            /> </a
          ><br />
          <div style="display: flex; flex-direction: column; color: #fff">
            <br />
            <p
              style="
                margin: 0;
                padding: 0;
                cursor: pointer;
                font-weight: bolder;
                font-size: 15px;
                color: #fff;
              "
            >
              {{ nameUser }} {{ prenomUser }}
            </p>
            <p
              style="
                margin: 0;
                padding: 0;
                cursor: pointer;
                font-weight: bolder;
                font-size: 15px;
                color: #fff;
              "
            >
              {{ libelleRole(idRole) }}
            </p>
            <p
              style="
                margin: 0;
                padding: 0;
                color: #ff140c;
                cursor: pointer;
                font-weight: bolder;
                font-size: 15px;
              "
              @click.prevent="logoutUser()"
            >
              Se Déconnecter
            </p>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
//import { useStore } from "vuex"; // Importation du store
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Counter",
  user: {
    numero: "",
    password: "",
  },

  // Hook created pour charger l'utilisateur quand le composant est créé
  created() {
    this.getRoles();
    //this.getSuiviSaisisPassif();
  },

  computed: {
    ...mapGetters(["getterRole", "loading", "getterinventaireequipements"]),
    libelleRole() {
      return (id) => {
        if (id != null && id != "") {
          let qtereel = this.getterRole.find((qtreel) => qtreel.id == id);

          if (qtereel) {
            return qtereel.libelle;
          }
          return "";
        }
      };
    },
    idRole() {
      let objLinea = localStorage.getItem("User");
      let objJson = JSON.parse(objLinea);
      return objJson.id_roles;
    },
    nameUser() {
      let objLinea = localStorage.getItem("User");
      let objJson = JSON.parse(objLinea);
      return objJson.noms;
    },
    prenomUser() {
      let objLinea = localStorage.getItem("User");
      let objJson = JSON.parse(objLinea);
      return objJson.prenoms;
    },
    // Accès aux getters Vuex pour obtenir la valeur du compteur et de l'utilisateur

    economique1() {
      //return this.$store.getters['utilisateur/economique'];
      return this.$store.getters.economique; // Correctement accéder au getter 'user' du module 'utilisateur'
    },

    libelleUniteOperationnelle() {
      // return (id) => {
      //   if (id != null && id != "") {
      const qtereel = this.economique1.find((qtreel) => qtreel.id == 2);

      if (qtereel) {
        return qtereel.libelle;
      }
      return "";
      //   }
      // };
    },
  },

  methods: {
    ...mapActions([
      "login",
      "logoutUser",
      "getRoles",
      "getInventaireEquipement",
    ]),
    // Appeler une action pour récupérer l'utilisateur
    async getSuiviSaisisPassif() {
      await this.$store.dispatch("getSuiviSaisisPassif");
    },
  },
};
</script>

<style scoped>
/* Quelques styles pour le composant */
/* button {
  margin-right: 10px;
} */
</style>
