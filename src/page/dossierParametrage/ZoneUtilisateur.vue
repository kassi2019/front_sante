<template>
  <!-- dashboard inner -->

  <div>
    <div class="row column_title">
      <div class="col-md-12">
        <div class="page_title">
          <h2>Affectation des Zones Par Utilisateur</h2>
        </div>
      </div>
    </div>
    <div v-if="loading" class="loader">Chargement...</div>
    <div v-else>
      <div class="col-md-12">
        <div class="white_shd full margin_bottom_30">
          <div
            class="full graph_head d-flex justify-content-end align-items-start"
          >
            <div
              class="heading1 margin_0 d-flex justify-content-between align-items-center"
            >
              <h2></h2>
              <!-- Aligner le bouton à droite et ouvrir le modal -->
              <button
                type="button"
                class="btn btn-outline-primary ms-auto btn-rounded-shadow"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                <i class="fa fa-plus"></i>
                AJOUTER
              </button>
            </div>
          </div>
          <div class="table_section padding_infor_info">
            <span style="font-size: 15px; font-weight: bold"
              >Affectation des Zones Par Utilisateur</span
            >
            <div class="table-responsive-sm">
              <table class="table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Libelle</th>

                    <th style="width: 9% !important; text-align: center">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody
                  v-for="data in getterZoneUtilisateur"
                  :key="data.utilisateur_id"
                >
                  <tr style="background-color: #c4d7ed">
                    <td colspan="2">
                      <i class="fa fa-share"></i>
                      <span style="font-weight: bolder">Utilisateur</span> :
                      <span style="font-size: 15px !important">{{
                        data.nom_utilisateur
                      }}</span>
                    </td>

                    <td class="button_block"></td>
                  </tr>
                  <tr
                    v-for="data1 in afficheZoneParUtilisateur(
                      data.utilisateur_id
                    )"
                    :key="data1.zone_intervention_id"
                  >
                    <td></td>

                    <td>
                      <i class="fa fa-hand-o-right"> </i>
                      <span style="font-weight: bolder"
                        >Zone d'intervention</span
                      >
                      :
                      {{ data1.libelle }}
                    </td>
                    <td class="button_block">
                      <button
                        type="button"
                        class="btn cur-p btn-success"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdropModification"
                        @click.prevent="AfficheModalModification(data1.id)"
                      >
                        <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                      </button>
                      <button
                        type="button"
                        class="btn cur-p btn-danger"
                        @click.prevent="supprimerZoneUtilisateur(data1.id)"
                      >
                        <i class="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- modal d ajout -->
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
              >
                Afféctation Zone des Agents
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="inputWithIcon" class="form-label"
                  >Responsable</label
                >
                <select
                  class="form-select form-select-lg mb-3"
                  aria-label=".form-select-lg example"
                  v-model="responsable_id"
                >
                  <option
                    v-for="data in listeNomResponsable"
                    :key="data.id"
                    :value="data.responsable_id"
                  >
                    {{ NomResponsable(data.responsable_id) }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label for="inputWithIcon" class="form-label"
                  >Utilisateur</label
                >
                <select
                  class="form-select form-select-lg mb-3"
                  aria-label=".form-select-lg example"
                  v-model="utilisateur_id"
                >
                  <option selected></option>
                  <option
                    v-for="data in listeUtilisateurParResponsable"
                    :key="data.id"
                    :value="data.id"
                  >
                    {{ data.noms }} {{ data.prenoms }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label for="inputWithIcon" class="form-label"
                  >Zone d'intervention</label
                >
                <treeselect
                  v-model="StateModules"
                  :multiple="true"
                  :options="gettersZoneResponsable"
                />
              </div>
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Fermer
              </button>
              <button
                type="button"
                class="btn btn-success"
                :disabled="loading"
                @click.prevent="enregistreModule()"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- modal de modification -->
      <div
        class="modal fade"
        id="staticBackdropModification"
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
              >
                Modifier Zone des Agents
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="inputWithIcon" class="form-label"
                  >Utilisateur</label
                >
                <select
                  class="form-select form-select-lg mb-3"
                  aria-label=".form-select-lg example"
                  v-model="ObjetModifier.utilisateur_id"
                >
                  <option selected></option>
                  <option
                    v-for="data in getterUtilisateur"
                    :key="data.id"
                    :value="data.id"
                  >
                    {{ data.noms }} {{ data.prenoms }}
                  </option>
                </select>
              </div>

              <div class="mb-3">
                <label for="inputWithIcon" class="form-label"
                  >Zone d'intervention</label
                >
                <select
                  class="form-select form-select-lg mb-3"
                  aria-label=".form-select-lg example"
                  v-model="ObjetModifier.zone_intervention_id"
                >
                  <option selected></option>
                  <option
                    v-for="data in getterzoneInterventions"
                    :key="data.id"
                    :value="data.id"
                  >
                    {{ data.libelle }}
                  </option>
                </select>
              </div>
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Fermer
              </button>
              <button
                type="button"
                class="btn btn-success"
                :disabled="loading"
                @click.prevent="modifierAffectationModule()"
              >
                Modifier
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- end dashboard inner -->
</template>

<script>
//import { useStore } from "vuex"; // Importation du store
import { mapActions, mapGetters } from "vuex";
// import Loader from "./Loader.vue";

// import the component
import Treeselect from "vue3-treeselect";
// import the styles
import "vue3-treeselect/dist/vue3-treeselect.css";
export default {
  components: { Treeselect },
  data() {
    return {
      StateModules: [],
      utilisateur_id: null,
      isLoading: false, // Définir isLoading ici
responsable_id:0,
      objet: {
        code: "",
        libelle: "",
      },
      selectItem: null,
      ObjetModifier: {
        utilisateur_id: "",
        zone_intervention_id: "",
      },
    };
  },

  name: "Counter",

  // Hook created pour charger l'utilisateur quand le composant est créé
  created() {
    this.getListeUtilisateur();
    this.getzoneInterventions();
    this.getAffectationZone();
    this.getZoneParUtilisateur();
    this.getzoneUtilisateur();
  },

  computed: {
    // Accès aux getters Vuex pour obtenir la valeur du compteur et de l'utilisateur
    ...mapGetters([
      "getterModule",
      "loading",
      "getterRole",
      "getterAffectationzone","gettersZoneResponsable",
      "getterZoneUtilisateur",
      "getterzoneInterventions",
      "getterZoneParUtilisateur",
      "getterUtilisateur",
    ]),

    listeNomResponsable() {
      return this.getterUtilisateur.filter(
        (qtreel) => qtreel.responsable_id != null
      );
    },
     listeUtilisateurParResponsable() {
      return this.getterUtilisateur.filter(
        (qtreel) => qtreel.responsable_id == this.responsable_id
      );
    },
    NomResponsable() {
      return (id) => {
        if (id != null && id != "") {
          const qtereel = this.getterUtilisateur.find(
            (qtreel) => qtreel.id == id
          );

          if (qtereel) {
            return qtereel.noms.concat(" ", qtereel.prenoms);
          }
          return "";
        }
      };
    },
    loading() {
      return this.$store.state.loading;
    },
    error() {
      return this.$store.getters.error;
    },

    afficheNiveauModule() {
      return this.getterModule.length + 1;
    },
  },

  methods: {
    ...mapActions([
      "getListeUtilisateur",
      "getzoneInterventions",
      "getAffectationZone",
      "getzoneUtilisateur",
      "getZoneParUtilisateur",
      "enregistrerZoneUtilisateur",
      "supprimerZoneUtilisateur",
      "modifierZoneUtilisateur","getZoneParResponsable"
    ]),

    afficheZoneParUtilisateur($id) {
      return this.getterZoneParUtilisateur.filter(
        (qtreel) => qtreel.utilisateur_id == $id
      );
    },

    async enregistreModule() {
      let ob = {
        utilisateur_id: this.utilisateur_id,
        DataModule: this.StateModules,
      };
      this.enregistrerZoneUtilisateur(ob);
      (this.utilisateur_id = ""), (StateModules = []);
    },

    async modifierAffectationModule() {
      let ob = {
        id: this.ObjetModifier.id,
        zone_intervention_id: this.ObjetModifier.zone_intervention_id,
        utilisateur_id: this.ObjetModifier.utilisateur_id,
      };
      this.modifierZoneUtilisateur(ob);
      // modal.hide();
    },

    async AfficheModalModification(id) {
      this.ObjetModifier = this.getterZoneParUtilisateur.find(
        (items) => items.id == id
      );
    },
  },

   watch: {
  responsable_id: function (value) {
      let objet = {
        respo: value,
      };
      //this.getListeNatureEconomiqueParActiviteHs(objet);
      this.getZoneParResponsable(objet);
    

      // }
    },
  }
};
</script>

<style scoped>
.loader {
  border: 8px solid #f3f3f3; /* Couleur du fond du cercle */
  border-top: 8px solid #3498db; /* Couleur de la barre animée */
  border-radius: 50%; /* Rendre la forme circulaire */
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite; /* Animation */
  margin: auto;
}

/* Animation de rotation */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.btn-rounded-shadow {
  background-color: #008cba; /* Bleu */
  color: white;
  padding: 10px 10px;
  border: 2px solid #008cba;
  border-radius: 25px; /* Bordures arrondies */
  cursor: pointer;
  font-size: 14px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Ombre subtile */
  transition: all 0.3s ease;
}
.btn-rounded-shadow:hover {
  background-color: #007b9a;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3); /* Ombre plus marquée au survol */
}
th {
  font-weight: 500 !important;
  font-size: 16px;
  background-color: #007b9a;
  color: aliceblue;
}
</style>
