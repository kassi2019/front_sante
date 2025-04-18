<template>
  <!-- dashboard inner -->

  <div><br/>
    <div class="row column_title">
      <div class="col-md-12">
        <div class="page_title">
          <h2 style="font-weight: bolder;font-family:Georgia, 'Times New Roman', Times, serif;">Liste Rôle</h2>
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
              <!-- <button
                type="button"
                class="btn btn-outline-primary ms-auto btn-rounded-shadow"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                <i class="fa fa-plus"></i>
                AJOUTER
              </button> -->
              <!-- Aligner le bouton à droite et ouvrir le modal -->
            </div>
          </div>
          <div class="table_section padding_infor_info">
          
            <div class="table-responsive-sm">
              <table class="table">
                <thead>
                 
                  <tr>
                    <th>#</th>
                    <!-- <th>Code</th> -->
                    <th>Libelle</th>

                    <th style="width: 4% !important; text-align: center">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="(data, index) in getterRole" :key="data.id">
                    <td>{{ index + 1 }}</td>
                    <!-- <td>{{ data.code }}</td> -->
                    <td>{{ data.libelle }}</td>

                    <td class="button_block">
                      <button
                        type="button"
                        class="btn cur-p btn-success"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdropModification"
                        @click.prevent="AfficheModalModification(data.id)"
                      >
                        <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                      </button>
                      <!-- <button
                        type="button"
                        class="btn cur-p btn-danger"
                        @click.prevent="supprimerRole(data.id)"
                      >
                        <i class="fa fa-trash"></i>
                      </button> -->
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
                Enregistrer Rôle
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
                <label for="inputWithIcon" class="form-label">Libelle</label>
                <div class="input-group">
                  <span class="input-group-text"
                    ><i class="fa fa-book" aria-hidden="true"></i
                  ></span>
                  <input
                    type="text"
                    class="form-control"
                    id="inputWithIcon"
                    placeholder="Entrez Libelle"
                    v-model="objet.libelle"
                  />
                </div>
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
                @click.prevent="enregistrerRole()"
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
                Modifier Rôle
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
                <label for="inputWithIcon" class="form-label">libelle</label>
                <div class="input-group">
                  <span class="input-group-text"
                    ><i class="fa fa-book" aria-hidden="true"></i
                  ></span>
                  <input
                    type="text"
                    class="form-control"
                    id="inputWithIcon"
                    placeholder="Entrez libelle"
                    v-model="ObjetModifier.libelle"
                  />
                </div>
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
                @click.prevent="ModifierRole()"
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
export default {
  data() {
    return {
      isLoading: false, // Définir isLoading ici

      objet: {
        code: "",
        libelle: "",
      },
      ObjetModifier: {
        code: "",
        libelle: "",
      },
    };
  },
  components: {
    // Loader,
  },
  name: "Counter",

  // Hook created pour charger l'utilisateur quand le composant est créé
  created() {
    this.getRoles();
  },

  computed: {
    // Accès aux getters Vuex pour obtenir la valeur du compteur et de l'utilisateur
    ...mapGetters(["getterRole", "loading"]),

    loading() {
      return this.$store.state.loading;
    },
    error() {
      return this.$store.getters.error;
    },
  },

  methods: {
    ...mapActions([
      "getRoles",
      "enregistrerRole",
      "supprimerRole",
      "modifierRole",
    ]),

    async enregistrerRole() {
      this.$store.dispatch("enregistrerRole", this.objet);

      this.objet = {
        libelle: "",
      };
    },

    async ModifierRole() {
      let ob = {
        id: this.ObjetModifier.id,
        code: this.ObjetModifier.code,
        libelle: this.ObjetModifier.libelle,
      };
      this.modifierRole(ob);
      // modal.hide();
    },

    async AfficheModalModification(id) {
      this.ObjetModifier = this.getterRole.find((items) => items.id == id);
    },
  },
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
