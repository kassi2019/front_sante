<template>
  <!-- dashboard inner -->

  <div><br/>
    <div class="row column_title">
      <div class="col-md-12">
        <div class="page_title">
          <h2>Liste Médicament</h2>
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
                    <th>Code</th>
                    <th>
                      Nom du médicament
                    </th>
                    <th>Unité de comptage</th>
                    <th>dosage</th>
                    <th style="width: 9% !important; text-align: center">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="(data, index) in paginatedData" :key="data.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ data.code }}</td>
                    <td>{{ data.libelle }}</td>
                    <td>{{ data.unite_comptage }}</td>
                    <td>{{ data.dosage }}</td>

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
                        @click.prevent="supprimermedicaments(data.id)"
                      >
                        <i class="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <!-- Pagination controls -->
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
                Enregistrer Médicament
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
                  >Code</label
                >
                <div class="input-group">
                  <span class="input-group-text"
                    ><i class="fa fa-book" aria-hidden="true"></i
                  ></span>
                  <input
                    type="text"
                    class="form-control"
                    id="inputWithIcon"
                    placeholder="Entrez code"
                    v-model="objet.code"
                  />
                </div>
              </div>
              <div class="mb-3">
                <label for="inputWithIcon" class="form-label"
                  >Nom du médicament</label
                >
                <div class="input-group">
                  <span class="input-group-text"
                    ><i class="fa fa-book" aria-hidden="true"></i
                  ></span>
                  <input
                    type="text"
                    class="form-control"
                    id="inputWithIcon"
                    placeholder="Entrez Nom du médicament"
                    v-model="objet.libelle"
                  />
                </div>
              </div>
              <div class="mb-3">
                <label for="inputWithIcon" class="form-label"
                  >Unité de comptage</label
                >
                <div class="input-group">
                  <span class="input-group-text"
                    ><i class="fa fa-book" aria-hidden="true"></i
                  ></span>
                  <input
                    type="text"
                    class="form-control"
                    id="inputWithIcon"
                    placeholder="Entrez Unité de comptage"
                    v-model="objet.unite_comptage"
                  />
                </div>
              </div>
              <div class="mb-3">
                <label for="inputWithIcon" class="form-label"
                  >Dosage/Forme</label
                >
                <div class="input-group">
                  <span class="input-group-text"
                    ><i class="fa fa-book" aria-hidden="true"></i
                  ></span>
                  <input
                    type="text"
                    class="form-control"
                    id="inputWithIcon"
                    placeholder="Entrez dosage"
                    v-model="objet.dosage"
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
                @click.prevent="enregistrezoneintervention()"
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
                Modifier Médicament
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
                  >Code</label
                >
                <div class="input-group">
                  <span class="input-group-text"
                    ><i class="fa fa-book" aria-hidden="true"></i
                  ></span>
                  <input
                    type="text"
                    class="form-control"
                    id="inputWithIcon"
                    placeholder="Entrez code"
                    v-model="ObjetModifier.code"
                  />
                </div>
              </div>
             <div class="mb-3">
                <label for="inputWithIcon" class="form-label"
                  >Nom du médicament</label
                >
                <div class="input-group">
                  <span class="input-group-text"
                    ><i class="fa fa-book" aria-hidden="true"></i
                  ></span>
                  <input
                    type="text"
                    class="form-control"
                    id="inputWithIcon"
                    placeholder="Entrez Nom du médicament"
                    v-model="ObjetModifier.libelle"
                  />
                </div>
              </div>
              <div class="mb-3">
                <label for="inputWithIcon" class="form-label"
                  >Unité de comptage</label
                >
                <div class="input-group">
                  <span class="input-group-text"
                    ><i class="fa fa-book" aria-hidden="true"></i
                  ></span>
                  <input
                    type="text"
                    class="form-control"
                    id="inputWithIcon"
                    placeholder="Entrez Unité de comptage"
                    v-model="ObjetModifier.unite_comptage"
                  />
                </div>
              </div>
              <div class="mb-3">
                <label for="inputWithIcon" class="form-label"
                  >Dosage/Forme</label
                >
                <div class="input-group">
                  <span class="input-group-text"
                    ><i class="fa fa-book" aria-hidden="true"></i
                  ></span>
                  <input
                    type="text"
                    class="form-control"
                    id="inputWithIcon"
                    placeholder="Entrez dosage"
                    v-model="ObjetModifier.dosage"
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
                @click.prevent="modifiermedicamentss()"
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

// import "vue-treeselect/dist/vue-treeselect.css";
// import Treeselect from "vue-treeselect";

export default {
  components: {
    // Treeselect,  // Enregistrer le composant
  },
  data() {
    return {
      isLoading: false, // Définir isLoading ici

      objet: {
        libelle: "",
        unite_comptage: "",
        dosage: "",
        code:""
      },
      selectItem: null,
      ObjetModifier: {
        libelle: "",
        unite_comptage: "",
        dosage: "",
        code:""
      },

      currentPage: 1,
      itemsPerPage: 10, // Nombre d'éléments à afficher par page
      totalItems: 0, // Nombre total d'éléments dans les données
    };
  },

  name: "Counter",
  // mounted() {

  //   this.getmedicaments();
  // },
  // Hook created pour charger l'utilisateur quand le composant est créé
  created() {
    this.getmedicaments();
  
  },

  computed: {
    // Accès aux getters Vuex pour obtenir la valeur du compteur et de l'utilisateur
    ...mapGetters(["gettermedicaments", "loading"]),
    // Calcule les éléments à afficher en fonction de la page actuelle...
    loadData() {
      // Par exemple : remplacer par un appel à une API ou un autre moyen de charger les données
  
        return this.totalItems = this.gettermedicaments.length;
     
    },
    visiblePages() {
      let pages = [];
      let startPage = Math.max(1, this.currentPage - 2);
      let endPage = Math.min(this.totalPages, this.currentPage + 2);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      return pages;
    },
    paginatedData() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      return this.gettermedicaments.slice(
        startIndex,
        startIndex + this.itemsPerPage
      );
    },
    totalPages() {
      return Math.ceil(this.gettermedicaments.length / this.itemsPerPage);
    },
    loading() {
      return this.$store.state.loading;
    },
    error() {
      return this.$store.getters.error;
    },
  },

  methods: {
    ...mapActions([
      "getmedicaments",
      "enregistrermedicaments",
      "supprimermedicaments",
      "modifiermedicaments",
    ]),
changePage(page) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  },

    async enregistrezoneintervention() {
      let ob = {
        code: this.objet.code,
        libelle: this.objet.libelle,
        dosage: this.objet.dosage,
        unite_comptage: this.objet.unite_comptage,
      };
      this.enregistrermedicaments(ob);

      this.objet = {
        libelle: "",
        unite_comptage: "",
        dosage: "",
        code:""
      };
    },

    async modifiermedicamentss() {
      let ob = {
        id: this.ObjetModifier.id,
        code: this.ObjetModifier.code,
        libelle: this.ObjetModifier.libelle,
        dosage: this.ObjetModifier.dosage,
        unite_comptage: this.ObjetModifier.unite_comptage,
      };
      this.modifiermedicaments(ob);
      // $('#staticBackdrop').modal('hide');
      // modal.hide();
    },

    async AfficheModalModification(id) {
      this.ObjetModifier = this.gettermedicaments.find(
        (items) => items.id == id
      );
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
