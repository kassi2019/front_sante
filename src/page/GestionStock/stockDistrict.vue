<template>
  <!-- dashboard inner -->
  <!-- {{ afficheEquipementParType }} -->
  <div>
    <br />
    <div class="row column_title">
      <div class="col-md-12">
        <div class="page_title">
          <h2
            style="
              font-weight: bolder;
              font-family: Georgia, 'Times New Roman', Times, serif;
            "
          >
            Stock du district
          </h2>
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
              <h2></h2>
              <!-- Aligner le bouton à droite et ouvrir le modal -->
              <button
                type="button"
                class="btn btn-outline-primary ms-auto btn-rounded-shadow"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                v-if="codeRole(idRole) != 3"
              >
                <i class="fa fa-plus"></i>
                APPROVISIONNER STOCK
              </button>
              <!-- <button
                type="button"
                class="btn btn-warning ms-auto btn-rounded-shadow1"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdroprenouvel"
                v-if="codeRole(idRole) != 3"
              >
                <i class="fa fa-plus"></i>

                MISE A JOUR
              </button> -->
            </div>
          </div>
          <div class="table_section padding_infor_info">
            <div class="table-responsive-sm">
              <table class="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Code</th>
                    <th style="text-align: center">Numéro du lot</th>
                    <th colspan="" style="text-align: center">
                      Médicament / Intrant
                    </th>
                    <th colspan="" style="text-align: center">
                      Unite comptage
                    </th>
                    <th colspan="" style="text-align: center">Quantité</th>
                    <th colspan="" style="text-align: center">
                      Date d'expiration
                    </th>
                    <th style="width: 9% !important; text-align: center">
                      Statut
                    </th>
                    <th
                      style="width: 9% !important; text-align: center"
                      
                    >
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody
                  v-for="item in paginatedData"
                  :key="item.type_equipement_id"
                >
                  <tr>
                    <td
                      style="color: #fff; background-color: #a67e2e"
                      colspan="9"
                    >
                      <span class="badge badge-dark"
                        >Type équipement:
                      </span>
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
                    <td>{{ data.numerolot }}</td>
                    <td>{{ data.libelle }}</td>
                    <td>{{ data.unite_comptage }}</td>

                    <td class="text-center">{{ data.quantite }}</td>
                    <td class="text-center">
                      {{ formatDate(data.date_expiration) }}
                    </td>
                    <td
                      class="statut_non_demare text-center taille_enfant"
                      v-if="
                        formatDate2(data.date_expiration) <= getToday && data.quantite != 0
                      "
                    >
                      Produit Expiré
                    </td>
                    <td
                      class="statut_non_demare text-center taille_enfant"
                      v-if="data.quantite == 0"
                    >
                      Stock Épuisé
                    </td>
                    <td
                      class="statut_encours text-center taille_enfant"
                      v-if="
                        formatDate2(data.date_expiration) > getToday && data.quantite != 0
                      "
                    >
                      Produits en Bon
                      État
                    </td>
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
                        @click.prevent="supprimerStockDistrict(data.id)"
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
                Enregistrer stock district
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
                    >*</span
                  ></label
                >
                <div class="input-group">
                  <model-list-select
                    style=""
                    :list="afficheLibelleTypeEquipement"
                    v-model="type_equipement_id"
                    option-value="id"
                    option-text="groupe"
                    placeholder="séléctionner"
                  >
                  </model-list-select>
                </div>
              </div>
              <div class="md-3">
                <label for="inputWithIcon" class="form-label"
                  >Médicament/intrant
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
                    :list="afficheEquipementParTypeEquipement"
                    v-model="equipement_id"
                    option-value="id"
                    option-text="groupe"
                    placeholder="séléctionner"
                  >
                  </model-list-select>
                </div>
              </div>
              <div class="mb-3 row">
                <div class="col-md-6">
                  <label for="inputWithIcon" class="form-label">code</label>
                  <div class="input-group">
                    <span class="input-group-text"
                      ><i class="fa fa-book" aria-hidden="true"></i
                    ></span>
                    <input
                      type="text"
                      class="form-control"
                      id="inputWithIcon"
                      :value="AfficheCodeEquipement(equipement_id)"
                      disabled
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <label for="inputWithIcon" class="form-label"
                    >Unite comptage</label
                  >
                  <div class="input-group">
                    <span class="input-group-text"
                      ><i class="fa fa-book" aria-hidden="true"></i
                    ></span>
                    <input
                      type="text"
                      class="form-control"
                      id="inputWithIcon"
                      :value="AfficheuniteComptageEquipement(equipement_id)"
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div class="mb-3 row">
                <div class="col-md-6">
                  <label for="inputWithIcon" class="form-label"
                    >Numéro du lot
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
                      placeholder="Entrez numero lot"
                      v-model="objet.numerolot"
                    />
                  </div>
                </div>
                <div class="col-md-3">
                  <label for="inputWithIcon" class="form-label"
                    >Quantite
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
                      type="number"
                      class="form-control"
                      id="inputWithIcon"
                      placeholder="Entrez quantite"
                      v-model="objet.quantite"
                    />
                  </div>
                </div>
                <div class="col-md-3">
                  <label for="inputWithIcon" class="form-label"
                    >Date d'expiration
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
                      type="date"
                      class="form-control"
                      id="inputWithIcon"
                      v-model="objet.date_expiration"
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
                @click.prevent="enregistreStockEquipement()"
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
                Modifier stock district
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
                    >*</span
                  ></label
                >
                <div class="input-group">
                  <model-list-select
                    style=""
                    :list="afficheLibelleTypeEquipement"
                    v-model="ObjetModifier.type_equipement_id"
                    option-value="id"
                    option-text="groupe"
                    placeholder="séléctionner"
                  >
                  </model-list-select>
                </div>
              </div>
              <div class="md-3">
                <label for="inputWithIcon" class="form-label"
                  >Médicament/intrant
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
                    :list="afficheEquipement"
                    v-model="ObjetModifier.equipement_id"
                    option-value="id"
                    option-text="groupe"
                    placeholder="séléctionner"
                  >
                  </model-list-select>
                </div>
              </div>
              <div class="mb-3 row">
                <div class="col-md-6">
                  <label for="inputWithIcon" class="form-label">code</label>
                  <div class="input-group">
                    <span class="input-group-text"
                      ><i class="fa fa-book" aria-hidden="true"></i
                    ></span>
                    <input
                      type="text"
                      class="form-control"
                      id="inputWithIcon"
                      :value="
                        AfficheCodeEquipementModifier(
                          ObjetModifier.equipement_id
                        )
                      "
                      disabled
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <label for="inputWithIcon" class="form-label"
                    >Unite comptage</label
                  >
                  <div class="input-group">
                    <span class="input-group-text"
                      ><i class="fa fa-book" aria-hidden="true"></i
                    ></span>
                    <input
                      type="text"
                      class="form-control"
                      id="inputWithIcon"
                      :value="
                        AfficheuniteComptageEquipementModifier(
                          ObjetModifier.equipement_id
                        )
                      "
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div class="mb-3 row">
                <div class="col-md-6">
                  <label for="inputWithIcon" class="form-label"
                    >Numéro du lot
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
                      placeholder="Entrez numero lot"
                      v-model="ObjetModifier.numerolot"
                    />
                  </div>
                </div>
                <div class="col-md-3">
                  <label for="inputWithIcon" class="form-label"
                    >Quantite
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
                      type="number"
                      class="form-control"
                      id="inputWithIcon"
                      placeholder="Entrez quantite"
                      v-model="ObjetModifier.quantite"
                    />
                  </div>
                </div>
                <div class="col-md-3">
                  <label for="inputWithIcon" class="form-label"
                    >Date d'expiration
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
                      type="date"
                      class="form-control"
                      id="inputWithIcon"
                      v-model="ObjetModifier.date_expiration"
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
import { formatDate,formatDate2 } from "../variableGlobal";
export default {
  components: {
    ModelListSelect,
  },
  data() {
    return {
      isLoading: false, // Définir isLoading ici
      type_equipement_id: "",
      equipement_id: "",
      objetrenoule: {
        equipement_id: "",

        quantitesaisir: 0,
      },
      objet: {
        libelle: "",
        type_equipement_id: "",
        quantite: "",
        code: "",
        unite_comptage: "",
        numerolot: "",
        date_peremption: "",
      },
      selectItem: null,
      ObjetModifier: {
        type_equipement_id: 0,
        libelle: "",
        quantite: "",
        code: "",
        unite_comptage: "",
        numerolot: "",
        date_peremption: "",
      },
      currentPage: 1,
      itemsPerPage: 10, // Nombre d'éléments à afficher par page
      totalItems: 0, // Nombre total d'éléments dans les données
    };
  },

  name: "Counter",

  // Hook created pour charger l'utilisateur quand le composant est créé
  created() {
    this.fetchToday();
    this.gettypeequipements();
    this.getTypeEquipementDansStockDistrict();
    this.getListeStockDistrict();
    this.getEquipement();
    this.getRoles();
  },

  computed: {
    // Accès aux getters Vuex pour obtenir la valeur du compteur et de l'utilisateur
    ...mapGetters([
      "getterEquipement",
      "getterStockDistricts",
      "loading",
      "getterTypeEquipementStockDistricts",
      "gettertypeequipements",
      "getterGpeTypeEquipement",
      "getterGroupeEquipement",
      "getterRole",
      "getToday",
      "getterEquipementParTypeProduit",
    ]),
    codeRole() {
      return (id) => {
        if (id != null && id != "") {
          let qtereel = this.getterRole.find((qtreel) => qtreel.id == id);

          if (qtereel) {
            return qtereel.code;
          }
          return "";
        }
      };
    },
    idRole() {
      let objLinea = localStorage.getItem("User");
      let objJson = JSON.parse(objLinea);
      return objJson.id_roles;
    },
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
    AfficheCodeEquipement() {
      return ($id) => {
        if ($id != null && $id != "") {
          const qtereel = this.getterEquipementParTypeProduit.find(
            (qtreel) => qtreel.id == $id
          );

          if (qtereel) {
            return qtereel.code;
          }
          return 0;
        }
      };
    },
    AfficheuniteComptageEquipement() {
      return ($id) => {
        if ($id != null && $id != "") {
          const qtereel = this.getterEquipementParTypeProduit.find(
            (qtreel) => qtreel.id == $id
          );

          if (qtereel) {
            return qtereel.unite_comptage;
          }
          return 0;
        }
      };
    },
    AfficheCodeEquipementModifier() {
      return ($id) => {
        if ($id != null && $id != "") {
          const qtereel = this.getterEquipement.find(
            (qtreel) => qtreel.id == $id
          );

          if (qtereel) {
            return qtereel.code;
          }
          return 0;
        }
      };
    },
    AfficheuniteComptageEquipementModifier() {
      return ($id) => {
        if ($id != null && $id != "") {
          const qtereel = this.getterEquipement.find(
            (qtreel) => qtreel.id == $id
          );

          if (qtereel) {
            return qtereel.unite_comptage;
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

      this.getterGroupeEquipement.filter((item) => {
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

    afficheEquipement() {
      let collet = [];
      this.getterEquipement.filter((item) => {
        let data = {
          id: item.id,
          // code:item.code,
          groupe: item.libelle,
        };
        collet.push(data);
      });
      return collet.sort((a, b) => (a.groupe > b.groupe ? 1 : -1));
    },
    afficheEquipementParTypeEquipement() {
      let collet = [];
      this.getterEquipementParTypeProduit.filter((item) => {
        let data = {
          id: item.id,
          // code:item.code,
          groupe: item.libelle,
        };
        collet.push(data);
      });
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
    paginatedData() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      return this.getterTypeEquipementStockDistricts.slice(
        startIndex,
        startIndex + this.itemsPerPage
      );
    },
    totalPages() {
      return Math.ceil(
        this.getterTypeEquipementStockDistricts.length / this.itemsPerPage
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
      "enregistrerStockDistrict",
      "modifierRenouvellement",
      "getGroupeEquipement",
      "getRoles",
      "fetchToday",
      "getListeStockDistrict",
      "getEquipementParTypeProduit",
      "getTypeEquipementDansStockDistrict",
      "supprimerStockDistrict",
      "modifierStockDistrict",
    ]),
    formatDate,
    formatDate2,
    afficheEquipeParType($id) {
      return this.getterStockDistricts.filter(
        (data) => data.type_equipement_id == $id
      );
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },

    async enregistreStockEquipement() {
      const objet = {
        type_equipement_id: this.type_equipement_id,
        equipement_id: this.equipement_id,
        numerolot: this.objet.numerolot,
        quantite: this.objet.quantite,
        date_expiration: this.objet.date_expiration,
        quantite_initial: this.objet.quantite,
      };

      const champsRemplis = Object.values(objet).every((value) => value !== "");

      if (!champsRemplis) {
        // Affiche une alerte ou laisse la méthode appelée gérer les erreurs
        await this.enregistrerStockDistrict(objet);
        return;
      }

      await this.enregistrerStockDistrict(objet);

      // Réinitialise les champs uniquement après tentative d'enregistrement avec des données valides
      this.type_equipement_id = "";
      this.equipement_id = "";
      this.objet = {
        numerolot: "",
        quantite: "",
        date_expiration: "",
      };
    },

    async modifierEquipements() {
      let ob = {
        id: this.ObjetModifier.id,
        type_equipement_id: this.ObjetModifier.type_equipement_id,
        quantite: this.ObjetModifier.quantite,
        numerolot: this.ObjetModifier.numerolot,
        date_expiration: this.ObjetModifier.date_expiration,
        quantite_initial: this.ObjetModifier.quantite,
      };
      this.modifierStockDistrict(ob);
      // $('#staticBackdrop').modal('hide');
      // modal.hide();
    },

    async modifierEquipementRenouveler() {
      let ob = {
        // id: this.objetrenoule.equipement_id,
        type_equipement_id: this.objetrenoule.type_equipement_id,
        libelle: this.AfficheLibelleEquipement(this.objetrenoule.equipement_id),
        code: this.AfficheCodeEquipement(this.objetrenoule.equipement_id),
        quantite: this.afficheQuantiteGlobal,
        unite_comptage: this.AfficheuniteComptageEquipement(
          this.objetrenoule.equipement_id
        ),
        quantitesaisir: this.objetrenoule.quantitesaisir,
        numerolot: this.objetrenoule.numerolot,
        date_peremption: this.objetrenoule.date_peremption,
      };
      this.enregistrerEquipement(ob);
      this.objetrenoule.quantitesaisir = 0;
      // $('#staticBackdrop').modal('hide');
      // modal.hide();
    },
    async AfficheModalModification(id) {
      this.ObjetModifier = this.getterStockDistricts.find(
        (items) => items.id == id
      );
    },
  },
  watch: {
    type_equipement_id: function (value) {
      let objet = {
        typeEquipement: value,
      };

      this.getEquipementParTypeProduit(objet);
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
.statut_encours {
  background-color: orange;
  color: #000;
  font-weight: bold;
  font-size: 12px;
}

.statut_terminer {
  background-color: green;
  color: #000;
  font-weight: bold;
  font-size: 12px;
}

.statut_non_demare {
  background-color: red;
  color: #000;
  font-weight: bold;
}
</style>
