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
                      <h2 style="text-align: left" class="logo-text marquee">
                        <strong style="font-size: 30px !important"
                          >Votre santé, notre priorité, Bienvenue sur Pro-Santé.</strong
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
                      style="border-radius: 90% !important;"
                      @click="ParametreGeneraux(1)"
                      v-if="VoirModuleParametre == 1"
                    >
                      <div class="social_icon" style="cursor: pointer;">
                        <i class="fa fa-cogs" ></i>
                      </div>
                      <div class="social_cont" @click="ParametreGeneraux(1)">
                        <ul>
                          <span class="desigText1 logo-text1">{{
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
                      <div class="social_icon" style="cursor: pointer;">
                        <i class="fa fa-cogs"></i>
                      </div>
                      <div
                        class="social_cont"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                      >
                        <ul>
                          <span class="desigText1 logo-text1">{{
                            afficheibelleModule(1)
                          }}</span>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <!-- fin module parametrage -->

                  
                    <div class="col-md-4 col-lg-4">
                      <div
                        class="full socile_icons fb margin_bottom_30"
                        style="border-radius: 90% !important"
                        @click="ParametreGeneraux(6)"
                         @click.prevent="afficheStock()"
                        v-if="VoirModuleactivitesTb == 6"
                      >
                        <div class="social_icon" style="cursor: pointer">
                          <i class="fa fa-life-bouy"></i>
                        </div>
                       
                        <div class="social_cont" @click="ParametreGeneraux(6)"  @click.prevent="afficheStock()">
                          <ul>
                            <span class="desigText1 logo-text1">{{
                              afficheibelleModule(6)
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
                            <span class="desigText1 logo-text1">{{
                              afficheibelleModule(6)
                            }}</span>
                          </ul>
                        </div>
                      </div>
                    </div>
                  <!-- *********************************************************** -->

                  <div class="col-md-4 col-lg-4">
                    <div
                      class="full socile_icons fb margin_bottom_30"
                      style="border-radius: 90% !important"
                      @click="ParametreGeneraux(4)"
                     
                      v-if="VoirModuleCommunication == 4"
                    >
                      <div class="social_icon" style="cursor: pointer">
                        <i class="fa fa-globe"></i>
                      </div>
                      <div class="social_cont">
                        <ul>
                          <span
                            class="desigText1 logo-text1"
                            @click="ParametreGeneraux(4)"
                          
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
                            class="desigText1 logo-text1"
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                            >{{ afficheibelleModule(4) }}</span
                          >
                        </ul>
                      </div>
                    </div>
                  </div>
                  <!-- debut Gestion des utilisateurs  -->

                
                  <!-- fin Gestion des utilisateurs -->
                  <!-- ************************************************************** -->

                  <!-- ********************************************************************** -->

                  <!-- debut Gestion Communication  -->

                  <!-- fin Gestion Communication -->
                  <!-- ************************************************************* -->
                </div>
                <!-- graph -->
                <div class="row column1 social_media_section">
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
                          <span class="desigText1 logo-text1">{{
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
                          <span class="desigText1 logo-text1">{{
                            afficheibelleModule(2)
                          }}</span>
                        </ul>
                      </div>
                    </div>
                  </div>
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
                            class="desigText1 logo-text1"
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
                            class="desigText1 logo-text1"
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
                          <span class="desigText1 logo-text1">{{
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
                          <span class="desigText1 logo-text1">{{
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
    VoirModuleactivitesTb() {
      // return (id) => {
      //   if (id != null && id != "") {
      const qtereel = this.getterModuleUtilisateurConneceter.find(
        (qtreel) =>
          qtreel.id_roles == this.roleUtilisateur && qtreel.id_modules == 6
      );

      if (qtereel) {
        return 6;
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
    afficheStock() {
      if (this.roleUtilisateur == 9) {
        this.$router.push({
          name: 'TableauBord',
        });
      }
else{
     this.$router.push({
          name: 'stockAsc',
        });
    }
  }
   


  },
};
</script>

<style scoped>
.marquee {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  box-sizing: border-box;
}
.marquee strong {
  display: inline-block;
  padding-left: 100%;
  animation: marquee 15s linear infinite;
  font-size: 30px;
  font-weight: bold;
}

@keyframes marquee {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-100%); }
}
.logo-text1 {
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-size: 20px;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #2E2E2E;;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  font-style: italic;
  text-align: center !important;
}
.logo-text {
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-size: 40px;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #2E2E2E;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  font-style: italic;
  text-align: center !important;
}
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
  font-size: 18px;
  font-weight: bolder;
  color: black;
  font-family: "Artisan Paris";
  text-align: center !important;
  cursor: pointer;
}
</style>
