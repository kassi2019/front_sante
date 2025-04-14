<template>
  <!-- dashboard inner -->
  <div>
    <br />
    <div class="row column_title">
      <div class="col-md-12">
        <div class="page_title">
          <h2>liste Utilisateur</h2>
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
            <div class="table-responsive-sm">
              <table class="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th style="width: 15%">Matricule / Numéro</th>
                    <th style="width: 15%">Nom</th>
                    <th style="width: 30%">Prenoms</th>
                    <th style="width: 30%">Rôle</th>
                    <!-- <th style="width: 15%">Resposable</th> -->
                    <th style="width: 9% !important; text-align: center">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="(data, index) in paginatedData" :key="data.id">
                    <td>{{ index + 1 }}</td>

                    <td>{{ data.numero }}</td>
                    <td>{{ data.noms }}</td>
                    <td>{{ data.prenoms }}</td>
                    <td>{{ data.libelle_role }}</td>
                    <!-- <td>{{ nom_responsable(data.responsable_id) }}</td> -->
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
                      <button
                        type="button"
                        class="btn cur-p btn-danger"
                        @click.prevent="supprimerUtilisateur(data.id)"
                      >
                        <i class="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div class="pagination">
                <button
                  @click="changePage(currentPage - 1)"
                  :disabled="currentPage === 1"
                  class="btn-pagination"
                >
                  « Précédent
                </button>

                <button
                  v-for="page in visiblePages"
                  :key="page"
                  @click="changePage(page)"
                  :class="{ active: currentPage === page }"
                  class="btn-pagination"
                >
                  {{ page }}
                </button>

                <button
                  @click="changePage(currentPage + 1)"
                  :disabled="currentPage === totalPages"
                  class="btn-pagination"
                >
                  Suivant »
                </button>
              </div>
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
                Créer Utilisateurs
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
                  >Matricule / Numéro
                  <span
                    style="
                      color: red;
                      font-weight: 900 !important;
                      font-size: 15px;
                    "
                    >*</span
                  >
                </label>
                <div class="input-group">
                  <span class="input-group-text"
                    ><i class="fa fa-book" aria-hidden="true"></i
                  ></span>
                  <input
                    type="text"
                    class="form-control"
                    id="inputWithIcon"
                    placeholder="Entrez Matricule / Numéro"
                    v-model="objet.numero"
                  />
                </div>
                <div class="mb-3">
                  <label for="inputWithIcon" class="form-label"
                    >Nom
                    <span
                      style="
                        color: red;
                        font-weight: 900 !important;
                        font-size: 15px;
                      "
                      >*</span
                    ></label
                  >
                  <div class="input-group">
                    <span class="input-group-text"
                      ><i class="fa fa-book" aria-hidden="true"></i
                    ></span>
                    <input
                      type="text"
                      class="form-control"
                      id="inputWithIcon"
                      placeholder="Entrez Nom"
                      v-model="objet.noms"
                    />
                  </div>
                </div>
                <div class="mb-3">
                  <label for="inputWithIcon" class="form-label"
                    >Prénoms
                    <span
                      style="
                        color: red;
                        font-weight: 900 !important;
                        font-size: 15px;
                      "
                      >*</span
                    ></label
                  >
                  <div class="input-group">
                    <span class="input-group-text"
                      ><i class="fa fa-book" aria-hidden="true"></i
                    ></span>
                    <input
                      type="text"
                      class="form-control"
                      id="inputWithIcon"
                      placeholder="Entrez Prénoms"
                      v-model="objet.prenoms"
                    />
                  </div>
                </div>
                <div class="mb-3">
                  <label for="inputWithIcon" class="form-label"
                    >Rôle
                    <span
                      style="
                        color: red;
                        font-weight: 900 !important;
                        font-size: 15px;
                      "
                      >*</span
                    ></label
                  >
                  <select
                    class="form-select form-select-lg mb-3"
                    aria-label=".form-select-lg example"
                    v-model="id_roles"
                  >
                    <option selected></option>
                    <option
                      v-for="data in getterRole"
                      :key="data.id"
                      :value="data.code"
                    >
                      {{ data.libelle }}
                    </option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="inputWithIcon" class="form-label"
                    >Mot de passe
                    <span
                      style="
                        color: red;
                        font-weight: 900 !important;
                        font-size: 15px;
                      "
                      >*</span
                    ></label
                  >
                  <div class="input-group">
                    <span class="input-group-text"
                      ><i class="fa fa-book" aria-hidden="true"></i
                    ></span>
                    <input
                      type="password"
                      class="form-control"
                      id="inputWithIcon"
                      placeholder="Entrez password"
                      v-model="objet.password"
                    />
                  </div>
                </div>
                <div class="mb-3" v-if="id_roles == 2 || id_roles == 3">
                  <label for="inputWithIcon" class="form-label"
                    >{{ libellerole(concateneCodeRole) }}
                    <span
                      style="
                        color: red;
                        font-weight: 900 !important;
                        font-size: 15px;
                      "
                    ></span
                  ></label>
                  <select
                    class="form-select form-select-lg mb-3"
                    aria-label=".form-select-lg example"
                    v-model="objet.responsable_id"
                  >
                    <option selected></option>
                    <option
                      v-for="data in getterResponsables"
                      :key="data.id"
                      :value="data.utilisateur_id"
                    >
                      {{ data.nom_utilisateur }}
                    </option>
                  </select>
                </div>

                <div class="mb-3" v-if="id_roles == 2 || id_roles == 3">
                  <label for="inputWithIcon" class="form-label"
                    >Responsable des Equipements du ASC
                    <span
                      style="
                        color: red;
                        font-weight: 900 !important;
                        font-size: 15px;
                      "
                    ></span
                  ></label>
                  <select
                    class="form-select form-select-lg mb-3"
                    aria-label=".form-select-lg example"
                    v-model="objet.responsable_equipe_id"
                  >
                    <option selected></option>
                    <option
                      v-for="data in getterResponsables"
                      :key="data.id"
                      :value="data.utilisateur_id"
                    >
                      {{ data.nom_utilisateur }}
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
                  @click.prevent="CreerUtilisateur()"
                >
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- modal d ajout -->
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
                Modifier Utilisateurs
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
                  >Matricule / Numéro
                  <span
                    style="
                      color: red;
                      font-weight: 900 !important;
                      font-size: 15px;
                    "
                    >*</span
                  >
                </label>
                <div class="input-group">
                  <span class="input-group-text"
                    ><i class="fa fa-book" aria-hidden="true"></i
                  ></span>
                  <input
                    type="text"
                    class="form-control"
                    id="inputWithIcon"
                    placeholder="Entrez Matricule / Numéro"
                    v-model="ObjetModifier.numero"
                  />
                </div>
                <div class="mb-3">
                  <label for="inputWithIcon" class="form-label"
                    >Nom
                    <span
                      style="
                        color: red;
                        font-weight: 900 !important;
                        font-size: 15px;
                      "
                      >*</span
                    ></label
                  >
                  <div class="input-group">
                    <span class="input-group-text"
                      ><i class="fa fa-book" aria-hidden="true"></i
                    ></span>
                    <input
                      type="text"
                      class="form-control"
                      id="inputWithIcon"
                      placeholder="Entrez Nom"
                      v-model="ObjetModifier.noms"
                    />
                  </div>
                </div>
                <div class="mb-3">
                  <label for="inputWithIcon" class="form-label"
                    >Prénoms
                    <span
                      style="
                        color: red;
                        font-weight: 900 !important;
                        font-size: 15px;
                      "
                      >*</span
                    ></label
                  >
                  <div class="input-group">
                    <span class="input-group-text"
                      ><i class="fa fa-book" aria-hidden="true"></i
                    ></span>
                    <input
                      type="text"
                      class="form-control"
                      id="inputWithIcon"
                      placeholder="Entrez Prénoms"
                      v-model="ObjetModifier.prenoms"
                    />
                  </div>
                </div>
                <div class="mb-3">
                  <label for="inputWithIcon" class="form-label"
                    >Rôle
                    <span
                      style="
                        color: red;
                        font-weight: 900 !important;
                        font-size: 15px;
                      "
                      >*</span
                    ></label
                  >
                  <select
                    class="form-select form-select-lg mb-3"
                    aria-label=".form-select-lg example"
                    v-model="ObjetModifier.id_roles"
                  >
                    <option selected></option>
                    <option
                      v-for="data in getterRole"
                      :key="data.id"
                      :value="data.id"
                    >
                      {{ data.libelle }}
                    </option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="inputWithIcon" class="form-label"
                    >Mot de passe
                    <span
                      style="
                        color: red;
                        font-weight: 900 !important;
                        font-size: 15px;
                      "
                      >*</span
                    ></label
                  >
                  <div class="input-group">
                    <span class="input-group-text"
                      ><i class="fa fa-book" aria-hidden="true"></i
                    ></span>
                    <input
                      type="password"
                      class="form-control"
                      id="inputWithIcon"
                      placeholder="Entrez password"
                      v-model="ObjetModifier.password"
                    />
                  </div>
                </div>
                <div
                  class="mb-3"
                  v-if="
                    ObjetModifier.id_roles == 8 || ObjetModifier.id_roles == 9
                  "
                >
                  <label for="inputWithIcon" class="form-label"
                    >Superviseur
                    <span
                      style="
                        color: red;
                        font-weight: 900 !important;
                        font-size: 15px;
                      "
                    ></span
                  ></label>
                  <select
                    class="form-select form-select-lg mb-3"
                    aria-label=".form-select-lg example"
                    v-model="ObjetModifier.responsable_id"
                  >
                    <option selected></option>
                    <option
                      v-for="data in getterUtilisateur"
                      :key="data.id"
                      :value="data.utilisateur_id"
                    >
                      {{ data.noms }}   {{ data.prenoms }}
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
                  @click.prevent="modifierUser()"
                >
                  Modifier
                </button>
              </div>
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

// import "vue-treeselect/dist/vue-treeselect.css";
// import Treeselect from "vue-treeselect";

export default {
  components: {
    // Treeselect,  // Enregistrer le composant
  },
  data() {
    return {
      isLoading: false, // Définir isLoading ici
      id_roles: 1,
      objet: {
        password: "",
        noms: "",
        prenoms: "",
        numero: "",
        respo_superieur_id: "",
        responsable_id: "",
        responsable_equipe_id: "",
      },
      selectItem: null,
      ObjetModifier: {
        password: "",
        noms: "",
        prenoms: "",
        numero: "",
        id_roles: "",
        respo_superieur_id: "",
        responsable_id: "",
        responsable_equipe_id: "",
      },
      currentPage: 1,
      itemsPerPage: 10,
      totalItems: 0,
    };
  },

  name: "Counter",

  // Hook created pour charger l'utilisateur quand le composant est créé
  created() {
    //this.getModules();
    this.getRoles();
    this.getResponsable();
    this.getListeUtilisateur();
  },

  computed: {
    // Accès aux getters Vuex pour obtenir la valeur du compteur et de l'utilisateur
    ...mapGetters([
      "loading",
      "getterRole",
      "getterUtilisateur",
      "getterResponsables",
    ]),
    concateneCodeRolemodifier() {
      return parseInt(this.ObjetModifier.id_roles) + 1;
    },
    concateneCodeRole() {
      return parseInt(this.id_roles) + 1;
    },
    libellerole() {
      return (id) => {
        if (id != null && id != "") {
          let qtereel = this.getterResponsables.find(
            (qtreel) => qtreel.code == id
          );

          if (qtereel) {
            return qtereel.libelle_role;
          }
          return "";
        }
      };
    },
    idrole() {
      return (id) => {
        if (id != null && id != "") {
          let qtereel = this.getterRole.find((qtreel) => qtreel.code == id);

          if (qtereel) {
            return qtereel.id;
          }
          return "";
        }
      };
    },
    id_responsable() {
      return (id) => {
        if (id != null && id != "") {
          let qtereel = this.getterUtilisateur.find(
            (qtreel) => qtreel.id == id
          );

          if (qtereel) {
            return qtereel.responsable_id;
          }
          return "";
        }
      };
    },
    paginatedData() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      return this.getterUtilisateur.slice(
        startIndex,
        startIndex + this.itemsPerPage
      );
    },
    visiblePages() {
      let pages = [];
      let startPage = Math.max(1, this.currentPage - 2);
      let endPage = Math.min(this.totalPages, this.currentPage + 2);
      console.log(endPage);
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      return pages;
    },
    totalPages() {
      return Math.ceil(this.getterUtilisateur.length / this.itemsPerPage);
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
      "creationUtilisateur",
      "getRoles",
      "modifierUtilisateur",
      "supprimerUtilisateur",
      "getResponsable",
    ]),
    changePage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    async CreerUtilisateur() {
      let ob = {
        noms: this.objet.noms,
        prenoms: this.objet.prenoms,
        password: this.objet.password,
        numero: this.objet.numero,
        id_roles: this.idrole(this.id_roles),
        responsable_id: this.objet.responsable_id,
        responsable_equipe_id: this.objet.responsable_equipe_id,
        respo_superieur_id: this.id_responsable(this.objet.responsable_id),
      };
      this.creationUtilisateur(ob);
      if (
        this.objet.noms != "" ||
        this.objet.prenoms != "" ||
        this.objet.password != "" ||
        this.objet.numero != "" ||
        this.id_roles != ""
      ) {
        this.objet = {
          noms: "",
          prenoms: "",
          password: "",
          numero: "",
          id_roles: "",
        };
      } else {
      }
    },

    async modifierUser() {
      let ob = {
        id: this.ObjetModifier.id,
        noms: this.ObjetModifier.noms,
        prenoms: this.ObjetModifier.prenoms,
        numero: this.ObjetModifier.numero,
        id_roles: this.ObjetModifier.id_roles,
        responsable_id: this.ObjetModifier.responsable_id,
        responsable_equipe_id: this.ObjetModifier.responsable_equipe_id,
      };
      this.modifierUtilisateur(ob);
      // $('#staticBackdrop').modal('hide');
      // modal.hide();
    },

    async AfficheModalModification(id) {
      this.ObjetModifier = this.getterUtilisateur.find(
        (items) => items.id == id
      );
    },
  },

  watch: {
    id_roles: function (value) {
      let objet = {
        role: value,
      };

      this.getResponsable(objet);
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
