<template>
  <div class="d-lg-flex half">
    <div class="contents order-2 order-md-1">
      <div class="container">
        <div class="row align-items-center justify-content-center">
          <div class="col-md-7">
            <h2 style="text-align: center" class="logo-text">
              <strong>TéraSanté</strong>
            </h2>
            <h6
              style="text-align: center; font-size: 20px !important"
              class="logo-text"
            >
              "Terrain" et "Santé"
            </h6>
            <p class="mb-4"></p>
            <form action="#" method="post">
              <div class="form-group first">
                <label for="username" style="font-weight: bold !important"
                  >Matricule ou Téléphone</label
                >
                <input
                  type="text"
                  class="form-control"
                  placeholder="Entrer le matricule ou téléphone"
                  v-model="numero"
                />
              </div>
              <div class="form-group last mb-3">
                <label for="password" style="font-weight: bold !important"
                  >Mot de Passe</label
                >
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  placeholder="Entrer le mot de passe"
                  v-model="password"
                />
              </div>

              <div class="d-flex mb-5 align-items-center">
                <!-- <label class="control control--checkbox mb-0"
                  ><span class="caption">Remember me</span>
                  <input type="checkbox" checked="checked" />
                  <div class="control__indicator"></div>
                </label> -->
                <span class="ml-auto"
                  ><a href="#" class="forgot-pass">Forgot Password</a></span
                >
              </div>

              <input
                @click.prevent="handleLogin()"
                type="submit"
                value="SE CONNECTER"
                class="btn btn-block btn-primary"
                style="font-weight: bold !important; width: 50%; float: right"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
    <div
      class="white_shd full margin_bottom_30 image-shadow"
      style="
        background-image: url('/assetLogin/images/image.webp');
        width: 60%;
        height: 100%;
        border: 1px solid #000;
        filter: blur(0px); /* Applique un flou sur l'image */

        top: 0;
        left: 0;
        z-index: -1; /* Assure que l'image se trouve derrière le contenu */
      "
    ></div>
  </div>
</template>

<script>
//import { useStore } from "vuex"; // Importation du store
import { mapActions } from "vuex";
// import Loader from "./Loader.vue";
export default {
  data() {
    return {
      isLoading: false, // Définir isLoading ici
    };
  },
  components: {
    // Loader,
  },
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
    // Accès aux getters Vuex pour obtenir la valeur du compteur et de l'utilisateur

    economique1() {
      //return this.$store.getters['utilisateur/economique'];
      return this.$store.getters.economique; // Correctement accéder au getter 'user' du module 'utilisateur'
    },
  },

  methods: {
    ...mapActions(["login"]),

    // Appeler une action pour récupérer l'utilisateur
    async getSuiviSaisisPassif() {
      await this.$store.dispatch("getSuiviSaisisPassif");
    },
    async handleLogin() {
      this.isLoggingIn = true;
      try {
        await this.login({ numero: this.numero, password: this.password });
        this.$router.push("/presentation"); // Rediriger après connexion réussie
      } catch (error) {
        this.loginError = "Invalid credentials";
      } finally {
        this.isLoggingIn = false;
      }
    },
    // async connexion() {
    //   if (this.user.numero && this.user.password) {
    //     this.login(this.user).then(
    //       () => {

    //         this.$router.push("/Accueil");
    //       },
    //       (error) => {

    //        console.log(error)
    //       }
    //     );
    //   }
    // },
  },
};
</script>

<style scoped>
/* Quelques styles pour le composant */
button {
  margin-right: 10px;
}

img {
  width: 300px;
  height: auto;
  filter: grayscale(50%) blur(2px) brightness(90%) contrast(120%);
}
.logo-text {
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-size: 36px;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #005797;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  font-style: italic;
}

</style>
