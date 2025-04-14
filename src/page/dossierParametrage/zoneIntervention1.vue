<template>
  <!-- dashboard inner -->

  <div>
    <br />
    <div class="row column_title">
      <div class="col-md-12">
        <div class="page_title">
          <h2>Liste Zone d'intervention</h2>
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
            <!-- <span style="font-size: 15px; font-weight: bold"
              >Liste des Zone d'intervention</span
            > -->
            <div class="table-responsive-sm">
              <table class="table">
                <thead>
                  <tr>
                    <th colspan=""></th>
                    <th>Longitude</th>
                    <th>Latitude</th>
                    <th style="width: 9% !important; text-align: center">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody v-for="data in gettersdistrictZone" :key="data.id">
                  <tr>
                    <td>
                
                      <span class="badge badge-primary"> <i class="fa fa-hand-o-right" style="color:black"></i>  District</span>
                      {{ data.libelle_district }}
                    </td>
                    <td>{{ data.longitude }}</td>
                    <td>{{ data.latitude }}</td>
                  </tr>
                  <template
                    v-for="data1 in listeAireSanitaire(data.district_id)"
                    :key="data1.id"
                  >
                    <tr>
                      <!-- <td colspan="2" ></td> -->

                      <td >
                  
                        <span class="badge badge-warning" style="margin-left: 10% !important;color: black;">  <i class="fa fa-hand-o-right" style="color:black"></i>  Aire sanitaire</span>
                        {{ data1.libelle }}
                      </td>
                      <td>{{ data1.longitude }}</td>
                      <td>{{ data1.latitude }}</td>
                      <td></td>
            
                    </tr>
                    <tr
                      v-for="data2 in listezoneintervention(data1.id)"
                      :key="data2.id"
                    >
                      <!-- <td></td>
                      <td></td> -->

                      <td>
                     
                        <span class="badge badge-success" style="margin-left: 15% !important"> <i class="fa fa-hand-o-right" style="color:black"></i> Zone intervention</span>
                        {{ data2.libelle }}
                      </td>
                      <td>{{ data2.longitude }}</td>
                      <td>{{ data2.latitude }}</td>
                      <td class="button_block">
                        <button
                          type="button"
                          class="btn cur-p btn-success"
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdropModification"
                          @click.prevent="AfficheModalModification(data2.id)"
                        >
                          <i
                            class="fa fa-pencil-square-o"
                            aria-hidden="true"
                          ></i>
                        </button>
                        <button
                          type="button"
                          class="btn cur-p btn-danger"
                          @click.prevent="supprimerzoneintervention(data2.id)"
                        >
                          <i class="fa fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
              <!-- Pagination controls -->
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
                Enregistrer Zone d'intervention
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="mb-3 row">
                <div class="col-md-12">
                  <label for="inputWithIcon" class="form-label"
                    >District
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
                    <model-list-select
                      style=""
                      :list="afficheLibelleDistrict"
                      v-model="objet.district_id"
                      option-value="id"
                      option-text="groupe"
                      placeholder="séléctionner"
                    >
                    </model-list-select>
                  </div>
                </div>
                <div class="col-md-12">
                  <label for="inputWithIcon" class="form-label"
                    >Aire sanitaire
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
                    <model-list-select
                      style=""
                      :list="afficheAireSanitaire(objet.district_id)"
                      v-model="objet.aire_sanitaire_id"
                      option-value="id"
                      option-text="groupe"
                      placeholder="séléctionner"
                    >
                    </model-list-select>
                  </div>
                </div>
                <div class="col-md-12">
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
                <div class="col-md-6">
                  <label for="inputWithIcon" class="form-label"
                    >Latitude(+)</label
                  >
                  <div class="input-group">
                    <span class="input-group-text"
                      ><i class="fa fa-book" aria-hidden="true"></i
                    ></span>
                    <input
                      type="text"
                      class="form-control"
                      id="inputWithIcon"
                      placeholder="Entrez Latitude"
                      v-model="objet.latitude"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <label for="inputWithIcon" class="form-label"
                    >Longitude(-)</label
                  >
                  <div class="input-group">
                    <span class="input-group-text"
                      ><i class="fa fa-book" aria-hidden="true"></i
                    ></span>
                    <input
                      type="text"
                      class="form-control"
                      id="inputWithIcon"
                      placeholder="Entrez longitude"
                      v-model="objet.longitude"
                    />
                  </div>
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
                Modifier Zone d'intervention
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
            <div class="mb-3 row">
                <div class="col-md-12">
                  <label for="inputWithIcon" class="form-label"
                    >District
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
                    <model-list-select
                      style=""
                      :list="afficheLibelleDistrict"
                      v-model="ObjetModifier.district_id"
                      option-value="id"
                      option-text="groupe"
                      placeholder="séléctionner"
                    >
                    </model-list-select>
                  </div>
                </div>
                <div class="col-md-12">
                  <label for="inputWithIcon" class="form-label"
                    >Aire sanitaire
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
                    <model-list-select
                      style=""
                      :list="afficheAireSanitaire(ObjetModifier.district_id)"
                      v-model="ObjetModifier.aire_sanitaire_id"
                      option-value="id"
                      option-text="groupe"
                      placeholder="séléctionner"
                    >
                    </model-list-select>
                  </div>
                </div>
                <div class="col-md-12">
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
                      v-model="ObjetModifier.libelle"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <label for="inputWithIcon" class="form-label"
                    >Latitude(+)</label
                  >
                  <div class="input-group">
                    <span class="input-group-text"
                      ><i class="fa fa-book" aria-hidden="true"></i
                    ></span>
                    <input
                      type="text"
                      class="form-control"
                      id="inputWithIcon"
                      placeholder="Entrez Latitude"
                      v-model="ObjetModifier.latitude"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <label for="inputWithIcon" class="form-label"
                    >Longitude(-)</label
                  >
                  <div class="input-group">
                    <span class="input-group-text"
                      ><i class="fa fa-book" aria-hidden="true"></i
                    ></span>
                    <input
                      type="text"
                      class="form-control"
                      id="inputWithIcon"
                      placeholder="Entrez longitude"
                      v-model="ObjetModifier.longitude"
                    />
                  </div>
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
                @click.prevent="modifierzoneinterventions()"
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
import { ModelListSelect } from "vue-search-select";
// import Loader from "./Loader.vue";

// import "vue-treeselect/dist/vue-treeselect.css";
// import Treeselect from "vue-treeselect";

export default {
  components: {
    ModelListSelect,
    // Treeselect,  // Enregistrer le composant
  },
  data() {
    return {
      isLoading: false, // Définir isLoading ici
      //  showModal: true,
      objet: {
        libelle: "",
        longitude: "",
        latitude: "",
        district_id: "",
        aire_sanitaire_id: "",
      },
      selectItem: null,
      ObjetModifier: {
        libelle: "",
        longitude: "",
        latitude: "",
        district_id: "",
        aire_sanitaire_id: "",
      },

      currentPage: 1,
      itemsPerPage: 10,
      totalItems: 0,
    };
  },

  name: "Counter",

  // Hook created pour charger l'utilisateur quand le composant est créé
  created() {
    this.getDistrict();
    // this.getdistrictgroupe();
    this.getdistrictZone();
    this.getaireSanitaireZone();
    this.getzoneintervention();
    this.getAireSanitaire();
  },

  computed: {
    // Accès aux getters Vuex pour obtenir la valeur du compteur et de l'utilisateur
    ...mapGetters([
      "getteraireSanitaires","getterAffectationzone",
      "gettersdistrictZone",
      "gettersaireSanitaireZone",
      "getterzoneInterventions",
      "loading",
      "getterDistrict",
      "gettergroupeDistricts",
    ]),
    listeAireSanitaire() {
      return (id) => {
        if (id != null && id != "") {
          return this.gettersaireSanitaireZone.filter(
            (qtreel) => qtreel.district_id == id
          );
        }
      };
    },
    listezoneintervention() {
      return (id) => {
        if (id != null && id != "") {
          return this.getterzoneInterventions.filter(
            (qtreel) => qtreel.aire_sanitaire_id == id
          );
        }
      };
    },
    afficheLibelleDistrict() {
      let collet = [];
      this.getterDistrict.filter((item) => {
        let data = {
          id: item.id,
          // code:item.code,
          groupe: item.libelle,
        };
        collet.push(data);
      });
      return collet.sort((a, b) => (a.libelle > b.libelle ? 1 : -1));
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

    // Calcule les éléments à afficher en fonction de la page actuelle
    paginatedData() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      return this.gettergroupeDistricts.slice(
        startIndex,
        startIndex + this.itemsPerPage
      );
    },
    totalPages() {
      return Math.ceil(this.gettergroupeDistricts.length / this.itemsPerPage);
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
      "getAireSanitaire",
      "getaireSanitaireZone",
      "getdistrictZone",
      "getzoneintervention",
      "getDistrict",
      "getdistrictgroupe",
      "enregistrerzoneintervention",
      "supprimerzoneintervention",
      "modifierzoneintervention","getAffectationZone"
    ]),

    afficheAireSanitaire($id) {
      let collet = [];

      // Filtrage basé sur l'id passé en paramètre, si nécessaire
      this.getteraireSanitaires.filter((item) => {
        // Si vous voulez uniquement les éléments avec cet id
        if (item.district_id === $id) {
          let data = {
            id: item.id,
            // code: item.code, // Si vous souhaitez utiliser le code, vous pouvez décommenter cette ligne
            groupe: item.libelle,
          };
          collet.push(data);
        }
      });

      // Tri basé sur 'groupe' (libelle_district)
      return collet.sort((a, b) => (a.groupe > b.groupe ? 1 : -1));
    },
    // Fonction pour changer de page
    changePage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    // Fonction pour calculer le nombre total de pages

    // Charger tes données et mettre à jour totalItems

    async enregistrezoneintervention() {
      let ob = {
        district_id: this.objet.district_id,
        aire_sanitaire_id: this.objet.aire_sanitaire_id,
        libelle: this.objet.libelle,
        longitude: this.objet.longitude,
        latitude: this.objet.latitude,
      };
      this.enregistrerzoneintervention(ob);

      this.objet = {
        libelle: "",
        latitude: "",
        longitude: "",
        aire_sanitaire_id: "",
      };
    },

    async modifierzoneinterventions() {
      let ob = {
        id: this.ObjetModifier.id,
        district_id: this.ObjetModifier.district_id,
        aire_sanitaire_id: this.ObjetModifier.aire_sanitaire_id,
        libelle: this.ObjetModifier.libelle,
        longitude: this.ObjetModifier.longitude,
        latitude: this.ObjetModifier.latitude,
      };
      this.modifierzoneintervention(ob);
      //  this.showModal = false;
      // $('#staticBackdrop').modal('hide');
      // modal.hide();
    },

    async AfficheModalModification(id) {
      this.ObjetModifier = this.getterzoneInterventions.find(
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
