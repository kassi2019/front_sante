<template>
  <div class="full_container">
    <div>
      <div>
        <TheNavBar></TheNavBar>
        <div class="midde_cont">
          <div class="container-fluid">
            <!-- dashboard inner -->
            <div class="midde_cont">
              <div class="container-fluid">
                <br /><br />
                <br /><br />
                <br /><br />
                <div class="row column_title">
                  <div class="col-md-12">
                    <div class="page_title">
                      <h2 style="text-align: center">
                        <strong style="font-size: 30px !important"
                          >ASC Santé</strong
                        >
                        :
                        <span style="font-size: 30px !important"
                          >Agents de Santé Communautaire</span
                        >
                      </h2>
                    </div>
                  </div>
                </div>
                <br /><br />
                <div class="row column1 social_media_section">
                  <!-- debut module parametre               -->

                  <div class="col-md-4 col-lg-4">
                    <div
                      class="full socile_icons fb margin_bottom_30"
                      style="border-radius: 90% !important"
                      @click="ParametreGeneraux(1)"
                      v-if="VoirModuleParametre == 1"
                    >
                      <div class="social_icon" style="cursor: pointer">
                        <i class="fa fa-cogs"></i>
                      </div>
                      <div class="social_cont" @click="ParametreGeneraux(1)">
                        <ul>
                          <span class="desigText">{{
                            afficheibelleModule(1)
                          }}</span>
                        </ul>
                      </div>
                    </div>

                    <div
                      v-else
                      class="full socile_icons fb margin_bottom_30"
                      style="border-radius: 90% !important"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                    >
                      <div class="social_icon" style="cursor: pointer">
                        <i class="fa fa-cogs"></i>
                      </div>
                      <div
                        class="social_cont"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                      >
                        <ul>
                          <span class="desigText">{{
                            afficheibelleModule(1)
                          }}</span>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <!-- fin module parametrage -->
                  <!-- *********************************************************** -->

                  <div class="col-md-4 col-lg-4">
                    <div
                      class="full socile_icons fb margin_bottom_30"
                      style="border-radius: 90% !important"
                      @click="ParametreGeneraux(4)"
                      @click.prevent="affichePage('menage')"
                      v-if="VoirModuleCommunication == 4"
                    >
                      <div class="social_icon" style="cursor: pointer">
                        <i class="fa fa-globe"></i>
                      </div>
                      <div class="social_cont">
                        <ul>
                          <span
                            class="desigText"
                            @click="ParametreGeneraux(4)"
                            @click.prevent="affichePage('menage')"
                            >{{ afficheibelleModule(4) }}</span
                          >
                        </ul>
                      </div>
                    </div>

                    <div
                      v-else
                      class="full socile_icons fb margin_bottom_30"
                      style="border-radius: 90% !important"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                    >
                      <div class="social_icon" style="cursor: pointer">
                        <i class="fa fa-globe"></i>
                      </div>
                      <div class="social_cont">
                        <ul>
                          <span
                            class="desigText"
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                            >{{ afficheibelleModule(4) }}</span
                          >
                        </ul>
                      </div>
                    </div>
                  </div>
                  <!-- debut Gestion des utilisateurs  -->

                  <div class="col-md-4 col-lg-4">
                    <div
                      class="full socile_icons fb margin_bottom_30"
                      style="border-radius: 90% !important"
                      @click="ParametreGeneraux(2)"
                      v-if="VoirModulegUtilisateur == 2"
                    >
                      <div class="social_icon" style="cursor: pointer">
                        <i class="fa fa-users"></i>
                      </div>
                      <div class="social_cont" @click="ParametreGeneraux(2)">
                        <ul>
                          <span class="desigText">{{
                            afficheibelleModule(2)
                          }}</span>
                        </ul>
                      </div>
                    </div>

                    <div
                      v-else
                      class="full socile_icons fb margin_bottom_30"
                      style="border-radius: 90% !important"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                    >
                      <div class="social_icon" style="cursor: pointer">
                        <i class="fa fa-users"></i>
                      </div>
                      <div
                        class="social_cont"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                      >
                        <ul>
                          <span class="desigText">{{
                            afficheibelleModule(2)
                          }}</span>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <!-- fin Gestion des utilisateurs -->
                  <!-- ************************************************************** -->

                  <!-- ********************************************************************** -->

                  <!-- debut Gestion Communication  -->

                  <!-- fin Gestion Communication -->
                  <!-- ************************************************************* -->
                </div>
                <!-- graph -->
                <div class="row column1 social_media_section">
                  <!-- debut Gestion administrative  -->
                  <div class="col-md-4 col-lg-4">
                    <div
                      class="full socile_icons fb margin_bottom_30"
                      style="border-radius: 90% !important"
                      @click="ParametreGeneraux(5)"
                      v-if="VoirModuleadministrative == 5"
                    >
                      <div class="social_icon" style="cursor: pointer">
                        <i class="fa fa-university"></i>
                      </div>
                      <div class="social_cont">
                        <ul>
                          <span
                            class="desigText"
                            @click="ParametreGeneraux(5)"
                            >{{ afficheibelleModule(5) }}</span
                          >
                        </ul>
                      </div>
                    </div>

                    <div
                      v-else
                      class="full socile_icons fb margin_bottom_30"
                      style="border-radius: 90% !important"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                    >
                      <div class="social_icon" style="cursor: pointer">
                        <i class="fa fa-university"></i>
                      </div>
                      <div class="social_cont">
                        <ul>
                          <span
                            class="desigText"
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                            >{{ afficheibelleModule(5) }}</span
                          >
                        </ul>
                      </div>
                    </div>
                  </div>
                  <!-- fin Gestion administrative -->
                  <!-- ***************************************************** -->
                  <!-- debut Gestion des événements et activités  -->

                  <div class="col-md-4 col-lg-4">
                    <div
                      class="full socile_icons fb margin_bottom_30"
                      style="border-radius: 90% !important"
                      @click="ParametreGeneraux(3)"
                      v-if="VoirModuleactivites == 3"
                    >
                      <div class="social_icon" style="cursor: pointer">
                        <i class="fa fa-life-bouy"></i>
                      </div>
                      <div class="social_cont" @click="ParametreGeneraux(3)">
                        <ul>
                          <span class="desigText">{{
                            afficheibelleModule(3)
                          }}</span>
                        </ul>
                      </div>
                    </div>

                    <div
                      v-else
                      class="full socile_icons fb margin_bottom_30"
                      style="border-radius: 90% !important"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                    >
                      <div class="social_icon" style="cursor: pointer">
                        <i class="fa fa-life-bouy"></i>
                      </div>
                      <div
                        class="social_cont"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                      >
                        <ul>
                          <span class="desigText">{{
                            afficheibelleModule(3)
                          }}</span>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <!-- fin Gestion des événements et activités -->
                  <!-- *************************************************************************** -->
                </div>
                <!-- graph -->
              </div>
              <!-- footer -->
              <!-- <div class="container-fluid">
                <div class="footer">
                  <p>
                    Copyright © 2018 Designed by html.design. All rights
                    reserved.<br /><br />
                    Distributed By:
                    <a href="https://themewagon.com/">ThemeWagon</a>
                  </p>
                </div>
              </div> -->
            </div>
          </div>
          <footer></footer>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5
              class="modal-title"
              id="staticBackdropLabel"
              style="text-transform: capitalize !important"
            ></h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <h2 style="text-align: center">
              VOUS N'AVEZ PAS ACCES A CE MODULE.
              <p style="font-size: 16px">
                VEUILLEZ CONTACTER L'ADMINISTRATEUR, S'IL VOUS PLAIT.
              </p>
            </h2>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-danger"
              data-bs-dismiss="modal"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheNavBar from "../layouts/TheNavBar.vue";
//import { useStore } from "vuex"; // Importation du store
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    TheNavBar,
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
    this.getModules();
    this.getModuleUtilisateurConncte();
  },
  computed: {
    ...mapGetters([
      "getterModule",
      "loading",
      "getterModuleUtilisateurConneceter",
    ]),
    roleUtilisateur() {
      let objLinea = localStorage.getItem("User");
      let objJson = JSON.parse(objLinea);
      return objJson.id_roles;
    },
    afficheibelleModule() {
      return (id) => {
        if (id != null && id != "") {
          const qtereel = this.getterModule.find((qtreel) => qtreel.code == id);

          if (qtereel) {
            return qtereel.libelle;
          }
          return 0;
        }
      };
    },

    VoirModuleParametre() {
      // return (id) => {
      //   if (id != null && id != "") {
      const qtereel = this.getterModuleUtilisateurConneceter.find(
        (qtreel) =>
          qtreel.id_roles == this.roleUtilisateur && qtreel.id_modules == 1
      );

      if (qtereel) {
        return 1;
      }
      return 0;
      //   }
      // };
    },
    VoirModulegUtilisateur() {
      // return (id) => {
      //   if (id != null && id != "") {
      const qtereel = this.getterModuleUtilisateurConneceter.find(
        (qtreel) =>
          qtreel.id_roles == this.roleUtilisateur && qtreel.id_modules == 2
      );

      if (qtereel) {
        return 2;
      }
      return 0;
      //   }
      // };
    },

    VoirModuleacademique() {
      // return (id) => {
      //   if (id != null && id != "") {
      const qtereel = this.getterModuleUtilisateurConneceter.find(
        (qtreel) =>
          qtreel.id_roles == this.roleUtilisateur && qtreel.id_modules == 3
      );

      if (qtereel) {
        return 3;
      }
      return 0;
      //   }
      // };
    },

    VoirModuleCommunication() {
      // return (id) => {
      //   if (id != null && id != "") {
      const qtereel = this.getterModuleUtilisateurConneceter.find(
        (qtreel) =>
          qtreel.id_roles == this.roleUtilisateur && qtreel.id_modules == 4
      );

      if (qtereel) {
        return 4;
      }
      return 0;
      //   }
      // };
    },

    VoirModuleadministrative() {
      // return (id) => {
      //   if (id != null && id != "") {
      const qtereel = this.getterModuleUtilisateurConneceter.find(
        (qtreel) =>
          qtreel.id_roles == this.roleUtilisateur && qtreel.id_modules == 5
      );

      if (qtereel) {
        return 5;
      }
      return 0;
      //   }
      // };
    },

    VoirModuleactivites() {
      // return (id) => {
      //   if (id != null && id != "") {
      const qtereel = this.getterModuleUtilisateurConneceter.find(
        (qtreel) =>
          qtreel.id_roles == this.roleUtilisateur && qtreel.id_modules == 3
      );

      if (qtereel) {
        return 3;
      }
      return 0;
      //   }
      // };
    },

    VoirModuleTableaubord() {
      // return (id) => {
      //   if (id != null && id != "") {
      const qtereel = this.getterModuleUtilisateurConneceter.find(
        (qtreel) =>
          qtreel.id_roles == this.roleUtilisateur && qtreel.id_modules == 7
      );

      if (qtereel) {
        return 7;
      }
      return 0;
      //   }
      // };
    },
  },

  methods: {
    ...mapActions(["getModules", "getModuleUtilisateurConncte"]),

    async ParametreGeneraux($id) {
      localStorage.setItem("id_module", $id);
      this.$router.push({
        name: "Accueil",
        params: { id: $id },
      });
    },
    async affichePage(route_name) {
      this.$router.push({
        name: route_name,
      });
    },
    // async handleLogin() {
    //       this.isLoggingIn = true;
    //       try {
    //         await this.login({ numero: this.numero, password: this.password });
    //         this.$router.push('/presentation');  // Rediriger après connexion réussie
    //       } catch (error) {
    //         this.loginError = 'Invalid credentials';
    //       } finally {
    //         this.isLoggingIn = false;
    //       }
    //     },
  },
};
</script>

<style scoped>
.desigText {
  font-size: 30px;
  font-weight: bolder;
  color: black;
  font-family: "Artisan Paris";
  text-align: center;
  cursor: pointer;
}
/* .margin_bottom_30:hover {
  background-color: #5F8CA3 ;
}  */
.desigText1 {
  font-size: 31px;
  font-weight: bolder;
  color: black;
  font-family: "Artisan Paris";
  text-align: center !important;
  cursor: pointer;
}
</style>
