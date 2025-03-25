<template>
  <!-- dashboard inner -->

  <div>
    <br /><br /><br />
    <div class="row column_title">
      <div class="col-md-12">
        <div class="page_title">
          <h2>Liste des Vaccins</h2>
        </div>
      </div>
    </div>

    <div>
      <div class="col-md-12">
        <div class="white_shd full margin_bottom_30">
          <div
            class="full graph_head d-flex justify-content-end align-items-start"
          >
            <div
              class="heading1 margin_0 d-flex justify-content-between align-items-center"
            >
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
                    <!-- <th>Code</th> -->
                    <th>Libelle</th>

                    <th style="width: 9% !important; text-align: center">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody v-for="data in typePatient" :key="data.id">
                     <tr>
                    <td>
                      <button type="button" class="btn btn-primary">
                      <i class="fa fa-hand-o-right" style="color:black"></i>  Type Patient
                      </button>
                      {{ data.libelle }}
                    </td>
                    <td></td>
                  </tr>
                    <template
                    v-for="data2 in afficheViccinParCategorie(data.id)"
                    :key="data2.id"
                  >
                  
                    <tr
                      
                    >
                      <!-- <td></td>
                      <td></td> -->

                      <td style="">
                        <button type="button" class="btn btn-success" style="margin-left: 15% !important">
                         <i class="fa fa-hand-o-right" style="color:black"></i> Vaccin
                        </button>
                        {{ data2.libelle }}
                      </td>
                 <td></td>
                   
                    <td class="button_block">
                      <button
                        type="button"
                        class="btn cur-p btn-success"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdropModification"
                        @click.prevent="AfficheModalModification(data2.id)"
                      >
                        <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                      </button>
                      <button
                        type="button"
                        class="btn cur-p btn-danger"
                        @click.prevent="supprimervaccins(data2.id)"
                      >
                        <i class="fa fa-trash"></i>
                      </button>
                    </td>
                    </tr>
                  </template>
                  <!-- <tr v-for="(data, index) in paginatedData" :key="data.id">
                   

                    
                  </tr> -->
                </tbody>
              </table>

              <!-- <div class="pagination">
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
              </div> -->
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
                Enregistrer Vaccin
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
                  >Type Patient
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
                  v-model="objet.type_patient"
                >
                  <option selected></option>
                  <option value="2">Femme enceinte</option>
                  <option value="3">Enfant</option>
                </select>
              </div>
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
                @click.prevent="enregistretypePatient()"
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
                Modifier Vaccin
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
                  >Type Patient
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
                  v-model="ObjetModifier.type_patient"
                >
                  <option selected></option>
                  <option value="2">Femme enceinte</option>
                  <option value="3">Enfant</option>
                </select>
              </div>
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
                @click.prevent="modifiervaccinss()"
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
        type_patient: "",
        libelle: "",
      },
      selectItem: null,
      ObjetModifier: {
        type_patient: "",
        libelle: "",
      },
      currentPage: 1,
      itemsPerPage: 10,
      totalItems: 0,
     typePatient: [
      { id: 2, libelle: 'Femme enceinte' },
      { id: 3, libelle: 'Enfant' }
    ]
    };
  },

  name: "Counter",

  // Hook created pour charger l'utilisateur quand le composant est créé
  created() {
    this.getvaccination();
  },

  computed: {
    // Accès aux getters Vuex pour obtenir la valeur du compteur et de l'utilisateur
    ...mapGetters(["getterVaccin", "loading"]),
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
 
    // Calcule les éléments à afficher en fonction de la page actuelle
    paginatedData() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      return this.getterVaccin.slice(
        startIndex,
        startIndex + this.itemsPerPage
      );
    },
    totalPages() {
      return Math.ceil(this.getterVaccin.length / this.itemsPerPage);
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
      "getvaccination",
      "enregistrervaccins",
      "supprimervaccins",
      "modifiervaccins",
    ]),
       afficheViccinParCategorie($id) {
  return this.getterVaccin.filter(data=>data.type_patient==$id)
},
    changePage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    async enregistretypePatient() {
      let ob = {
        type_patient: this.objet.type_patient,
        libelle: this.objet.libelle,
      };
      this.enregistrervaccins(ob);

      this.objet = {
        libelle: "",
      };
    },

    async modifiervaccinss() {
      let ob = {
        id: this.ObjetModifier.id,

        type_patient: this.ObjetModifier.type_patient,
        libelle: this.ObjetModifier.libelle,
      };
      this.modifiervaccins(ob);
      // $('#staticBackdrop').modal('hide');
      // modal.hide();
    },

    async AfficheModalModification(id) {
      this.ObjetModifier = this.getterVaccin.find((items) => items.id == id);
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
