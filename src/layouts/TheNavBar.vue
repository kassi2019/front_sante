<template>
  <div class="topbar">
    <nav class="navbar navbar-expand-lg navbar-light">
      <div class="full">
        <button type="button" id="sidebarCollapse" class="sidebar_toggle" style="height: 135px;">
          <i class="fa fa-bars"></i>
        </button>
        <div class="logo_section">
          <!-- <a href="index.html"
            ><img
              class="img-responsive"
              src="/public/assetLogin/images/logo4.png"
              style="width: 100% !important;height: 50;"
              alt="#"
          /></a> -->
        </div>
        <div class="right_topbar">
          <a
            ><img
              class="img-responsive rounded-circle"
              src="/public/asset/images/layout_img/user_img.jpg"
              alt="#"
              style="width: 70px; margin: 0px 7px;"
          /></a>
          <p
            style="
              color: #fff;
              text-align: center !important;
              margin: 5px 7px;
              padding: 5px 50px 0px 2px;
              cursor: pointer;
              font-weight: bolder !important;
            font-size: 15px !important;
            "
            >{{ nameUser }}  {{ prenomUser }}</p
          >
          <span
            @click.prevent="logoutUser()"
            style="
              color: #FF140C;
              text-align: center !important;
              cursor: pointer;
              text-align: center !important;
              margin: 5px 7px;
              padding: 0px 0px 0px 0px;
              font-weight: bolder !important;
            "
          >
            Se Déconnecter
          </span>
          <!-- <div class="icon_info">
            <ul class="user_profile_dd">
              <li>
                <a class="dropdown-toggle" data-toggle="dropdown"
                  ><img
                    class="img-responsive rounded-circle"
                    src="/public/asset/images/layout_img/user_img.jpg"
                    alt="#"
                  /><span class="name_user">{{ nameUser }}</span></a
                >
                <span @click.prevent="logoutUser()" style="cursor: pointer">
                  Se déconnecter
                </span>
              </li>
            </ul>
          </div> -->
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
//import { useStore } from "vuex"; // Importation du store
import { mapActions } from "vuex";
export default {
  name: "Counter",
  user: {
    numero: "",
    password: "",
  },

  // Hook created pour charger l'utilisateur quand le composant est créé
  created() {
    //this.getSuiviSaisisPassif();
  },

  computed: {
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
    ...mapActions(["logoutUser"]),
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
