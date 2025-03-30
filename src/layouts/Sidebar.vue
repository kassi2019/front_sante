<template>
  <!-- Sidebar  -->
  <nav id="sidebar">
    <div class="sidebar_blog_1">
      <div class="sidebar-header">
        <div class="logo_section">
          <a href="index.html"
            ><img
              class="logo_icon img-responsive"
              src="/asset/images/logo/logo_icon.png"
              alt="#"
          /></a>
        </div>
      </div>
      <div class="sidebar_user_info">
        <div class="icon_setting"></div>
        <div class="user_profle_side">
          <div class="user_img">
            <img
              class="img-responsive"
              src="/asset/images/layout_img/user_img.jpg"
              alt="#"
            />
          </div>
          <div class="user_info">
            <h3>{{ nameUser }}</h3>
            <p style="color: aliceblue;">{{ libelleRole(idRole) }}</p>
            
            <p @click.prevent="logoutUser()" style="cursor: pointer">
              <span class="online_animation"></span> Se déconnecter
            </p>
          </div>
        </div>
      </div>
    </div>

    <parametre v-if="id_module == 1"></parametre>
    <cartographique v-if="id_module == 4"></cartographique>
    <tableauBord v-if="id_module == 6"></tableauBord>
  </nav>
  <!-- end sidebar -->
</template>

<script>
//import { useStore } from "vuex"; // Importation du store
import { mapActions,mapGetters } from "vuex";
import parametre from "../layouts/menu/parametre.vue";
import cartographique from "../layouts/menu/cartographique.vue";
import tableauBord from "../layouts/menu/tableauBord.vue";
export default {
  components: {
    parametre,
    cartographique,
    tableauBord,
  },
  name: "Counter",

  user: {
    numero: "",
    password: "",
  },
  data() {
    return {};
  },
  created() {
    this.id_module = localStorage.getItem("id_module");
    this.getRoles()
    this.getInventaireEquipement();
  },
  computed: {
        ...mapGetters(["getterRole", "loading","getterinventaireequipements"]),
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
  },

  methods: {
    ...mapActions(["login", "logoutUser","getRoles",'getInventaireEquipement']),

    // Appeler une action pour récupérer l'utilisateur
    async getSuiviSaisisPassif() {
      await this.$store.dispatch("getSuiviSaisisPassif");
    },

    async ParametreGeneraux($id) {
      localStorage.setItem("id_module", $id);
      this.$router.push({
        name: "Accueil",
        params: { id: $id },
      });
    },
  },
};
</script>

<style></style>
