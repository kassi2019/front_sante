<template>
  <!-- dashboard inner -->

  <div>
    <br /><br /><br />
    <div class="row column_title">
      <div class="col-md-12">
        <div class="page_title">
          <h2>Liste Equipement</h2>
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
                NOUVEAU EQUIPEMENT
              </button>
              <button
                type="button"
                class="btn btn-warning ms-auto btn-rounded-shadow1"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdroprenouvel"
              >
                <i class="fa fa-plus"></i>

                RENOUVELER LE STOCK
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
                    <th colspan="">Libelle</th>
                     <th colspan="">Unite comptage</th>
                    <th colspan="">Quantité</th>
                    <th style="width: 9% !important; text-align: center">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody
                  v-for="item in getterGpeTypeEquipement"
                  :key="item.type_equipement_id"
                >
                  <tr style="background-color: #a67e2e">
                    <td style="color: #fff" colspan="6">
                      <span class="badge badge-dark">Type équipement : </span>
                      {{ item.libelle_type_equipement }}
                    </td>
                  </tr>
                  <tr
                    v-for="(data, index) in afficheEquipeParType(
                      item.type_equipement_id
                    )"
                    :key="data.id"
                  >
                    <td>{{ index + 1 }}</td>
                    <td>{{ data.code }}</td>
                    <td>{{ data.libelle }}</td>
                    <td>{{ data.unite_comptage }}</td>
                    
                    <td class="text-center">{{ data.quantite }}</td>

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
                        @click.prevent="supprimerEquipement(data.id)"
                      >
                        <i class="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>

              <!-- Pagination controls -->
              <!-- <div class="pagination">
                <button
                  @click="changePage(currentPage - 1,data.id)"
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
                Enregistrer Equipement
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="md-3">
                <label for="inputWithIcon" class="form-label"
                  >Type équipement
                  <span
                    style="
                      color: red;
                      font-weight: 900 !important;
                      font-size: 15px;
                    "
                  ></span
                ></label>
                <div class="input-group">
                  <model-list-select
                    style=""
                    :list="afficheLibelleTypeEquipement"
                    v-model="objet.type_equipement_id"
                    option-value="id"
                    option-text="groupe"
                    placeholder="séléctionner"
                  >
                  </model-list-select>
                </div>
              </div>
               <div class="mb-3">
                <label for="inputWithIcon" class="form-label">code</label>
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
                  <div class="mb-3">
                <label for="inputWithIcon" class="form-label">Unite comptage</label>
                <div class="input-group">
                  <span class="input-group-text"
                    ><i class="fa fa-book" aria-hidden="true"></i
                  ></span>
                  <input
                    type="text"
                    class="form-control"
                    id="inputWithIcon"
                    placeholder="Entrez Libelle"
                    v-model="objet.unite_comptage"
                  />
                </div>
              </div>
              
              <div class="mb-3">
                <label for="inputWithIcon" class="form-label">quantite</label>
                <div class="input-group">
                  <span class="input-group-text"
                    ><i class="fa fa-book" aria-hidden="true"></i
                  ></span>
                  <input
                    type="number"
                    class="form-control"
                    id="inputWithIcon"
                    placeholder="Entrez quantite"
                    v-model="objet.quantite"
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
                @click.prevent="enregistreModule()"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade"
        id="staticBackdroprenouvel"
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
                Rénouveler le stock
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="md-3">
                <label for="inputWithIcon" class="form-label"
                  >Type équipement
                  <span
                    style="
                      color: red;
                      font-weight: 900 !important;
                      font-size: 15px;
                    "
                  ></span
                ></label>
                <div class="input-group">
                  <model-list-select
                    style=""
                    :list="afficheLibelleTypeEquipement"
                    v-model="objetrenoule.type_equipement_id"
                    option-value="id"
                    option-text="groupe"
                    placeholder="séléctionner"
                  >
                  </model-list-select>
                </div>
              </div>
              <div class="md-3">
                <label for="inputWithIcon" class="form-label"
                  >Equipement
                  <span
                    style="
                      color: red;
                      font-weight: 900 !important;
                      font-size: 15px;
                    "
                  ></span
                ></label>
                <div class="input-group">
                  <model-list-select
                    style=""
                    :list="afficherEquipementEnfonctionType"
                    v-model="objetrenoule.equipement_id"
                    option-value="id"
                    option-text="groupe"
                    placeholder="séléctionner"
                  >
                  </model-list-select>
                </div>
              </div>
              <div class="mb-3">
                <label for="inputWithIcon" class="form-label"
                  >Quantite disponible (A)</label
                >
                <div class="input-group">
                  <span class="input-group-text"
                    ><i class="fa fa-book" aria-hidden="true"></i
                  ></span>
                  <input
                    type="text"
                    class="form-control"
                    id="inputWithIcon"
                    style="font-weight: bolder"
                    :value="
                      AfficheQuantiteDisponible(objetrenoule.equipement_id)
                    "
                    disabled
                  />
                </div>
              </div>
              <div class="mb-3">
                <label for="inputWithIcon" class="form-label"
                  >Quantité réapprovisionnée (B)</label
                >
                <div class="input-group">
                  <span class="input-group-text"
                    ><i class="fa fa-book" aria-hidden="true"></i
                  ></span>
                  <input
                    type="number"
                    class="form-control"
                    id="inputWithIcon"
                    placeholder="Entrez quantite"
                    v-model="objetrenoule.quantitesaisir"
                  />
                </div>
              </div>
              <div class="mb-3">
                <label for="inputWithIcon" class="form-label"
                  >Quantité globale (C=A+B)</label
                >
                <div class="input-group">
                  <span class="input-group-text"
                    ><i class="fa fa-book" aria-hidden="true"></i
                  ></span>
                  <input
                    type="number"
                    class="form-control"
                    id="inputWithIcon"
                    :value="afficheQuantiteGlobal"
                    disabled
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
                @click.prevent="modifierEquipementRenouveler()"
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
                Modifier équipement
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="md-3">
                <label for="inputWithIcon" class="form-label"
                  >Type équipement
                  <span
                    style="
                      color: red;
                      font-weight: 900 !important;
                      font-size: 15px;
                    "
                  ></span
                ></label>
                <div class="input-group">
                  <model-list-select
                    style=""
                    :list="afficheLibelleTypeEquipement"
                    v-model="ObjetModifier.type_equipement_id"
                    option-value="id"
                    option-text="groupe"
                    placeholder="séléctionner le nom du chef"
                  >
                  </model-list-select>
                </div>
              </div>
                   <div class="mb-3">
                <label for="inputWithIcon" class="form-label">Code</label>
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
                   <div class="mb-3">
                <label for="inputWithIcon" class="form-label">Unite comptage</label>
                <div class="input-group">
                  <span class="input-group-text"
                    ><i class="fa fa-book" aria-hidden="true"></i
                  ></span>
                  <input
                    type="text"
                    class="form-control"
                    id="inputWithIcon"
                    placeholder="Entrez unite_comptage"
                    v-model="ObjetModifier.unite_comptage"
                  />
                </div>
              </div>
              <div class="mb-3">
                <label for="inputWithIcon" class="form-label">quantite</label>
                <div class="input-group">
                  <span class="input-group-text"
                    ><i class="fa fa-book" aria-hidden="true"></i
                  ></span>
                  <input
                    type="number"
                    class="form-control"
                    id="inputWithIcon"
                    placeholder="Entrez quantite"
                    v-model="ObjetModifier.quantite"
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
                @click.prevent="modifierEquipements()"
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
import { mapActions, mapGetters } from "vuex";
import { ModelListSelect } from "vue-search-select";

export default {
  components: {
    ModelListSelect,
  },
  data() {
    return {
      isLoading: false, // Définir isLoading ici
      objetrenoule: {
        equipement_id: "",
        type_equipement_id: "",
        quantitesaisir: 0,
      },
      objet: {
        libelle: "",
        type_equipement_id: "",
        quantite: "",
        code: "",
         unite_comptage:""
      },
      selectItem: null,
      ObjetModifier: {
        type_equipement_id: "",
        libelle: "",
        quantite: "",
        code: "",
        unite_comptage:""
      },
      currentPage: 1,
      itemsPerPage: 10, // Nombre d'éléments à afficher par page
      totalItems: 0, // Nombre total d'éléments dans les données
    };
  },

  name: "Counter",

  // Hook created pour charger l'utilisateur quand le composant est créé
  created() {
    this.gettypeequipements();
    this.getGpeEquipement();
    this.getEquipement();
  },

  computed: {
    // Accès aux getters Vuex pour obtenir la valeur du compteur et de l'utilisateur
    ...mapGetters([
      "getterEquipement",
      "loading",
      "gettertypeequipements",
      "getterGpeTypeEquipement",
    ]),

    afficheQuantiteGlobal() {
      return (
        parseFloat(
          this.AfficheQuantiteDisponible(this.objetrenoule.equipement_id)
        ) + parseFloat(this.objetrenoule.quantitesaisir)
      );
    },

    AfficheLibelleEquipement() {
      return ($id) => {
        if ($id != null && $id != "") {
          const qtereel = this.getterEquipement.find(
            (qtreel) => qtreel.id == $id
          );

          if (qtereel) {
            return qtereel.libelle;
          }
          return 0;
        }
      };
    },
    AfficheQuantiteDisponible() {
      return ($id) => {
        if ($id != null && $id != "") {
          const qtereel = this.getterEquipement.find(
            (qtreel) => qtreel.id == $id
          );

          if (qtereel) {
            return qtereel.quantite;
          }
          return 0;
        }
      };
    },
    afficherEquipementEnfonctionType() {
      let collet = [];

      this.getterEquipement.filter((item) => {
        if (item.type_equipement_id === this.objetrenoule.type_equipement_id) {
          let data = {
            id: item.id,
            groupe: item.libelle,
          };
          collet.push(data);
        }
      });

      // Trie les résultats par 'groupe' (anciennement 'libelle')
      return collet.sort((a, b) => (a.groupe > b.groupe ? 1 : -1));
    },

    afficheLibelleTypeEquipement() {
      let collet = [];
      this.gettertypeequipements.filter((item) => {
        let data = {
          id: item.id,
          // code:item.code,
          groupe: item.libelle,
        };
        collet.push(data);
      });
      return collet.sort((a, b) => (a.groupe > b.groupe ? 1 : -1));
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
    paginatedData($id) {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      return this.afficheEquipeParType($id).slice(
        startIndex,
        startIndex + this.itemsPerPage
      );
    },
    totalPages($id) {
      return Math.ceil(
        this.afficheEquipeParType($id).length / this.itemsPerPage
      );
    },
    loading() {
      return this.$store.state.loading;
    },
    error() {
      return this.$store.getters.error;
    },

    afficheNiveauModule() {
      return this.getterEquipement.length + 1;
    },
  },

  methods: {
    ...mapActions([
      "getEquipement",
      "getGpeEquipement",
      "enregistrerEquipement",
      "supprimerEquipement",
      "modifierEquipement",
      "gettypeequipements",
      "modifierRenouvellement",
    ]),
    afficheEquipeParType($id) {
      return this.getterEquipement.filter(
        (data) => data.type_equipement_id == $id
      );
    },
    changePage(page, $id) {
      if (page >= 1 && page <= this.totalPages($id)) {
        this.currentPage = page;
      }
    },
    async enregistreModule() {
      let ob = {
        type_equipement_id: this.objet.type_equipement_id,
        libelle: this.objet.libelle,
         code:this.objet.code,
        quantite: this.objet.quantite,
        unite_comptage: this.objet.unite_comptage,
      };
      this.enregistrerEquipement(ob);

      this.objet.libelle = "";
      this.objet.quantite = "";
      this.objet.code = "";
        this.objet.unite_comptage = "";
    },

    async modifierEquipements() {
      let ob = {
        id: this.ObjetModifier.id,
        type_equipement_id: this.ObjetModifier.type_equipement_id,
        libelle: this.ObjetModifier.libelle,
        code: this.ObjetModifier.code,
        unite_comptage: this.ObjetModifier.unite_comptage,
        quantite: this.ObjetModifier.quantite,
      };
      this.modifierEquipement(ob);
      // $('#staticBackdrop').modal('hide');
      // modal.hide();
    },

    async modifierEquipementRenouveler() {
      let ob = {
        id: this.objetrenoule.equipement_id,
        type_equipement_id: this.objetrenoule.type_equipement_id,
        libelle: this.AfficheLibelleEquipement(this.objetrenoule.equipement_id),
        quantite: this.afficheQuantiteGlobal,
        quantitesaisir: this.objetrenoule.quantitesaisir,
      };
      this.modifierRenouvellement(ob);
      this.objetrenoule.quantitesaisir = 0;
      // $('#staticBackdrop').modal('hide');
      // modal.hide();
    },
    async AfficheModalModification(id) {
      this.ObjetModifier = this.getterEquipement.find(
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
.btn-rounded-shadow1 {
  background-color: #b8a712; /* Bleu */
  color: white;
  padding: 10px 10px;
  border: 2px solid #b8a712;
  border-radius: 25px; /* Bordures arrondies */
  cursor: pointer;
  font-size: 14px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Ombre subtile */
  transition: all 0.3s ease;
}
.btn-rounded-shadow1:hover {
  background-color: #b8a712;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3); /* Ombre plus marquée au survol */
}
th {
  font-weight: 500 !important;
  font-size: 16px;
  background-color: #007b9a;
  color: aliceblue;
}
</style>
