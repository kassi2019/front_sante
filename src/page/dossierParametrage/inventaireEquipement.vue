<template>
  <!-- dashboard inner -->

  <div>
    <br /><br /><br />
    <div class="row column_title">
      <div class="col-md-12">
        <div class="page_title">
          <h2>Inventaire d'Equipement ASC</h2>
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
            <!-- <div
              class="heading1 margin_0 d-flex justify-content-between align-items-center"
            >
              <h2></h2>
              
              <button
                type="button"
                class="btn btn-outline-primary ms-auto btn-rounded-shadow"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                <i class="fa fa-plus"></i>
                AJOUTER
              </button>
            </div> -->
          </div>
          <div class="table_section padding_infor_info">
            <div class="table-responsive-sm">
              <table class="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <!-- <th>Code</th> -->
                    <th colspan="">Libelle</th>
                    <th colspan="5" style="text-align: center">
                      EQUIPEMENT
                    </th>
                  </tr>
                </thead>

                <tbody v-for="item in gettertypeequipements" :key="item.id">
                  <tr style="background-color: #a67e2e">
                    <td></td>
                    <td style="color: #fff" colspan="6">
                      <span class="badge badge-dark">Type équipement : </span>
                      {{ item.libelle }}
                    </td>
                   
                  </tr>
                  <tr
                    v-for="(data, index) in afficheEquipeParType(item.id)"
                    :key="data.id"
                  >
                    <td>{{ index + 1 }}</td>
                    <td>{{ data.libelle }}</td>

                    <td
                      style="background-color: #417324 !important"
                      v-if="AfficheStatusEquipement(data.id, idUser) == 1"
                    >
                      <!-- Radio button for Fonctionnelle -->
                      <input
                        type="radio"
                        :name="'fonctionnelle_' + data.id"
                        :value="1"
                        v-model="data.status"
                        @change="
                          saveStatus(
                            data,
                            1,
                            item.id,
                            AfficheIdEquipement(data.id, idUser)
                          )
                        "
                      />
                      <label
                        class="form-check-label"
                        for="gridRadios2"
                        style="
                          font-size: 18px;
                          color: #000;
                          font-weight: bolder;
                        "
                      >
                         Reçu
                      </label>
                    </td>
                    <td v-else>
                      <!-- Radio button for Fonctionnelle -->
                      <input
                        type="radio"
                        :name="'fonctionnelle_' + data.id"
                        :value="1"
                        v-model="data.status"
                        @change="
                          saveStatus(
                            data,
                            1,
                            item.id,
                            AfficheIdEquipement(data.id, idUser)
                          )
                        "
                      /><label
                        class="form-check-label"
                        for="gridRadios2"
                        style="
                          font-size: 18px;
                          color: #000;
                          font-weight: bolder;
                        "
                      >
                         Reçu
                      </label>
                    </td>
                    <td
                      v-if="AfficheStatusEquipement(data.id, idUser) == 2"
                      style="background-color: #901811 !important"
                    >
                      <!-- Radio button for Non Fonctionnelle -->
                      <input
                        type="radio"
                        :name="'non_fonctionnelle_' + data.id"
                        :value="2"
                        v-model="data.status"
                        @change="
                          saveStatus(
                            data,
                            2,
                            item.id,
                            AfficheIdEquipement(data.id, idUser)
                          )
                        "
                      /><label
                        class="form-check-label"
                        for="gridRadios2"
                        style="
                          font-size: 18px;
                          color: #000;
                          font-weight: bolder;
                        "
                      >
                        En panne
                      </label>
                    </td>
                    <td v-else>
                      <!-- Radio button for Non Fonctionnelle -->
                      <input
                        type="radio"
                        :name="'non_fonctionnelle_' + data.id"
                        :value="2"
                        v-model="data.status"
                        @change="
                          saveStatus(
                            data,
                            2,
                            item.id,
                            AfficheIdEquipement(data.id, idUser)
                          )
                        "
                      /><label
                        class="form-check-label"
                        for="gridRadios2"
                        style="
                          font-size: 18px;
                          color: #000;
                          font-weight: bolder;
                        "
                      >
                        En panne
                      </label>
                    </td>

 <td
                      v-if="AfficheStatusEquipement(data.id, idUser) == 3"
                      style="background-color: #E2CA1A !important"
                    >
                      <!-- Radio button for Non Fonctionnelle -->
                      <input
                        type="radio"
                        :name="'non_fonctionnelle_' + data.id"
                        :value="3"
                        v-model="data.status"
                        @change="
                          saveStatus(
                            data,
                            3,
                            item.id,
                            AfficheIdEquipement(data.id, idUser)
                          )
                        "
                      /><label
                        class="form-check-label"
                        for="gridRadios2"
                        style="
                          font-size: 18px;
                          color: #000;
                          font-weight: bolder;
                        "
                      >
                        Perdu
                      </label>
                    </td>
                    <td v-else>
                      <!-- Radio button for Non Fonctionnelle -->
                      <input
                        type="radio"
                        :name="'non_fonctionnelle_' + data.id"
                        :value="3"
                        v-model="data.status"
                        @change="
                          saveStatus(
                            data,
                            3,
                            item.id,
                            AfficheIdEquipement(data.id, idUser)
                          )
                        "
                      /><label
                        class="form-check-label"
                        for="gridRadios2"
                        style="
                          font-size: 18px;
                          color: #000;
                          font-weight: bolder;
                        "
                      >
                        Perdu
                      </label>
                    </td>
<td
                      v-if="AfficheStatusEquipement(data.id, idUser) == 4"
                      style="background-color: #CDDE47 !important"
                    >
                      <!-- Radio button for Non Fonctionnelle -->
                      <input
                        type="radio"
                        :name="'non_fonctionnelle_' + data.id"
                        :value="4"
                        v-model="data.status"
                        @change="
                          saveStatus(
                            data,
                            4,
                            item.id,
                            AfficheIdEquipement(data.id, idUser)
                          )
                        "
                      /><label
                        class="form-check-label"
                        for="gridRadios2"
                        style="
                          font-size: 18px;
                          color: #000;
                          font-weight: bolder;
                        "
                      >
                        Fini
                      </label>
                    </td>
                    <td v-else>
                      <!-- Radio button for Non Fonctionnelle -->
                      <input
                        type="radio"
                        :name="'non_fonctionnelle_' + data.id"
                        :value="4"
                        v-model="data.status"
                        @change="
                          saveStatus(
                            data,
                            4,
                            item.id,
                            AfficheIdEquipement(data.id, idUser)
                          )
                        "
                      /><label
                        class="form-check-label"
                        for="gridRadios2"
                        style="
                          font-size: 18px;
                          color: #000;
                          font-weight: bolder;
                        "
                      >
                        Fini
                      </label>
                    </td>
                    <td v-if="AfficheIdEquipement(data.id, idUser)!=0">
                      <!-- Radio button for Non Fonctionnelle -->
                      <input
                        type="radio"
                        :name="'non_fonctionnelle_' + data.id"
                        :value="0"
                        v-model="data.status"
                        @change="
                          saveAnnulation(AfficheIdEquipement(data.id, idUser));
                          this.data.status = false;
                        "
                      /><label
                        class="form-check-label"
                        for="gridRadios2"
                        style="
                          font-size: 18px;
                          color: #000;
                          font-weight: bolder;
                        "
                      >
                        Annulé
                      </label>
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


      <!-- modal de modification -->
      <div
        class="modal fade"
        id="staticBackdrop2"
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
                
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
           <h4 style="text-align: center">
              "VEUILLEZ EFFECTUER L'INVENTAIRE DE VOTRE EQUIPEMENT AVANT D'ENTREPRENDRE TOUTE AUTRE ACTION." SVP
             
            </h4>
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

      objet: {
        libelle: "",
        type_equipement_id: "",
      },
      selectItem: null,
      ObjetModifier: {
        type_equipement_id: "",
        libelle: "",
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
    this.getEquipement();
    // this.getInventaireEquipement();
  },

  computed: {
    // Accès aux getters Vuex pour obtenir la valeur du compteur et de l'utilisateur
    ...mapGetters([
      "getterEquipement",
      "loading",
      "gettertypeequipements",
      "getterinventaireequipements",
    ]),

    AfficheStatusEquipement() {
      return ($id, $id1) => {
        if ($id != null && $id != "" && $id1 != null && $id1 != "") {
          const qtereel = this.getterinventaireequipements.find(
            (qtreel) => qtreel.equipement_id == $id && qtreel.user_id == $id1
          );

          if (qtereel) {
            return qtereel.status;
          }
          return "0";
        }
      };
    },

    AfficheIdEquipement() {
      return ($id, $id1) => {
        if ($id != null && $id != "" && $id1 != null && $id1 != "") {
          const qtereel = this.getterinventaireequipements.find(
            (qtreel) => qtreel.equipement_id == $id && qtreel.user_id == $id1
          );

          if (qtereel) {
            return qtereel.id;
          }
          return "0";
        }
      };
    },
    idUser() {
      let objLinea = localStorage.getItem("User");
      let objJson = JSON.parse(objLinea);
      return objJson.id;
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
      return collet.sort((a, b) => (a.nom > b.nom ? 1 : -1));
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
      "enregistrerEquipement",
      "supprimerEquipement",
      "modifierEquipement",
      "gettypeequipements",
      "enregistrerInventaireEquipement",
      "getInventaireEquipement",
      "modifierInventaireequipement",
      "supprimerinventaireequipement",
    ]),
    saveAnnulation(data1) {
      // Dispatch the Vuex action 'enregistrerEquipementStatus' with the appropriate data
      this.$store.dispatch("supprimerinventaireequipement", {
        data1,
      });
    },
    saveStatus(equipement_id, status, data, data1) {
      // Dispatch the Vuex action 'enregistrerEquipementStatus' with the appropriate data
      this.$store.dispatch("enregistrerInventaireEquipement", {
        equipement_id,
        status,
        data,
        data1,
      });
    },
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
      };
      this.enregistrerEquipement(ob);

      this.objet.libelle = "";
    },

    async modifierEquipements() {
      let ob = {
        id: this.ObjetModifier.id,
        type_equipement_id: this.ObjetModifier.type_equipement_id,
        libelle: this.ObjetModifier.libelle,
      };
      this.modifierEquipement(ob);
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
th {
  font-weight: 500 !important;
  font-size: 16px;
  background-color: #007b9a;
  color: aliceblue;
}
</style>
