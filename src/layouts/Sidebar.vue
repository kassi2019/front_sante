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
            <h1>{{ nameUser }}</h1>
            <p @click.prevent="logoutUser()" style="cursor: pointer">
              <span class="online_animation"></span> Se déconnecter
            </p>
          </div>
        </div>
      </div>
    </div>

    <parametre v-if="id_module == 1"></parametre>
    <cartographique v-if="id_module == 4"></cartographique>
  </nav>
  <!-- end sidebar -->
</template>

<script>
//import { useStore } from "vuex"; // Importation du store
import { mapActions } from "vuex";
import parametre from "../layouts/menu/parametre.vue";
import cartographique from "../layouts/menu/cartographique.vue";
export default {
  components: {
    parametre,
    cartographique,
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
  },
  computed: {
    nameUser() {
      let objLinea = localStorage.getItem("User");
      let objJson = JSON.parse(objLinea);
      return objJson.noms;
    },
  },

  methods: {
    ...mapActions(["login", "logoutUser"]),

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
