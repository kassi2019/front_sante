<template>
  <!-- dashboard inner -->

  <div>
    {{ afficheMessageAlertSiQteAffecteEstSupDispo }}
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
           Dotation ASC
          </h2>
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
           
              <button
                type="button"
                class="btn btn-outline-primary ms-auto btn-rounded-shadow"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdroprenouvel"
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

                    <th colspan="" style="text-align: center">
                      Médicament / Intrant
                    </th>
                    <th colspan="" style="text-align: center">Quantité</th>
                    <th colspan="" style="text-align: center">N° du lot</th>
                    <th colspan="" style="text-align: center">
                      Date d'expiration
                    </th>
                    <th style="width: 15% !important; text-align: center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody
                  v-for="item in paginatedData"
                  :key="item.agent_id"
                >
                  <tr>
                    <td
                      colspan="5"
                      style="color: #fff; background-color: #5BC0EB"
                    >
                      <span class="badge badge-dark" style="font-size: 14px"
                        >Asc :
                      </span>
                      <span style="font-size: 25px">
                        {{ item.nom_agent }}</span
                      >
                    </td>
                    <td class="button_block">
                      <button
                        type="button"
                        class="btn cur-p btn-success"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                        @click.prevent="FaireAffectation(item.agent_id)"
                      >
                        <i class="fa fa-plus" aria-hidden="true"></i>
                        Affectation
                      </button>
                      <button
                        type="button"
                        class="btn cur-p btn-warning"
                        style="color: #fff"
                        
                        @click.prevent="afficherClique(item.agent_id)"
                      >
                        <i class="fa fa-eye"></i> Détail
                      </button>
                    </td>
                  </tr>
                  <template  v-for="(data, index) in afficheEquipeParType(
                      item.agent_id
                    )"
                    :key="data.id">
                      <tr
                   v-if="item.agent_id==value"
                  >
                    <td>{{ index + 1 }}</td>
                    <td>
                      {{ data.libelle }}
                    </td>

                    <td class="text-center">{{ data.quantite }}</td>
                    <td class="text-center">{{ data.numerolot }}</td>
                    <td class="text-center">
                      {{ formatDate(data.date_expiration) }}
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
                        @click.prevent="supprimerStockSuperviseur(data.id)"
                      >
                        <i class="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                  </template>
                
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

      <!-- modal de modification -->

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
                Enregistrer stock Asc
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="md-2">
                <label for="inputWithIcon" class="form-label"
                  >Nom et prénoms du Asc</label
                >
                <div class="input-group">
                  <span class="input-group-text"
                    ><i class="fa fa-book" aria-hidden="true"></i
                  ></span>
                  <input
                    type="text"
                    class="form-control"
                    id="inputWithIcon"
                    style="color: #000; font-weight: bold"
                    :value="ObjetModifier.nom_agent"
                    disabled
                  />
                </div>
              </div>
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
                    :list="afficherEquipementParType"
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
                <div class="col-md-9">
                  <label for="inputWithIcon" class="form-label"
                    >Numéro de lot
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
                      :list="afficherNumeroLotParEquipement"
                      v-model="numero_lot_id"
                      option-value="id"
                      option-text="groupe"
                      placeholder="séléctionner"
                    >
                    </model-list-select>
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
                    ></span
                  ></label>
                  <div class="input-group">
                    <span class="input-group-text"
                      ><i class="fa fa-book" aria-hidden="true"></i
                    ></span>
                    <input
                      type="date"
                      class="form-control"
                      id="inputWithIcon"
                      :value="AfficheDateExpirationEquipement(numero_lot_id)"
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div class="mb-3 row">
                <div class="col-md-4">
                  <label for="inputWithIcon" class="form-label"
                    >Quantité Actuelle ( A )
                    <span
                      style="
                        color: red;
                        font-weight: 900 !important;
                        font-size: 15px;
                      "
                    ></span
                  ></label>
                  <div class="input-group">
                    <span class="input-group-text"
                      ><i class="fa fa-book" aria-hidden="true"></i
                    ></span>
                    <input
                      type="text"
                      class="form-control"
                      id="inputWithIcon"
                      placeholder="Entrez numero lot"
                      :value="AfficheQuantiteActuelle(numero_lot_id)"
                      disabled
                    />
                  </div>
                </div>
                <div class="col-md-4">
                  <label for="inputWithIcon" class="form-label"
                    >Quantité Distribuée ( B )
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
                      v-model="quantite"
                    />
                  </div>
                </div>
                <div class="col-md-4">
                  <label for="inputWithIcon" class="form-label"
                    >Quantité disponible ( C = A - B )
                    <span
                      style="
                        color: red;
                        font-weight: 900 !important;
                        font-size: 15px;
                      "
                    ></span
                  ></label>
                  <div class="input-group">
                    <span class="input-group-text"
                      ><i class="fa fa-book" aria-hidden="true"></i
                    ></span>
                    <input
                      type="number"
                      class="form-control"
                      id="inputWithIcon"
                      disabled
                      :value="calculeQuantiteDispo"
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
                v-if="AfficheQuantiteActuelle(numero_lot_id)>=quantite"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      </div>




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
                Modifier stock Asc{{ val }}
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="md-2">
                <label for="inputWithIcon" class="form-label"
                  >Nom et prénoms du superviseur</label
                >
                <div class="input-group">
                  <span class="input-group-text"
                    ><i class="fa fa-book" aria-hidden="true"></i
                  ></span>
                  <input
                    type="text"
                    class="form-control"
                    id="inputWithIcon"
                    style="color: #000; font-weight: bold"
                    :value="ObjetModifierstockSup.nom_superviseur"
                    disabled
                  />
                </div>
              </div>
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
                    v-model="ObjetModifierstockSup.type_equipement_id"
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
                    :list="afficherEquipementParTypeModifier"
                    v-model="ObjetModifierstockSup.equipement_id"
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
                      :value="AfficheCodeEquipementMod(ObjetModifierstockSup.equipement_id)"
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
                      :value="AfficheuniteComptageEquipementmod(ObjetModifierstockSup.equipement_id)"
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div class="mb-3 row">
                <div class="col-md-9">
                  <label for="inputWithIcon" class="form-label"
                    >Numéro de lot
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
                      :list="afficherNumeroLotParEquipementMod"
                      v-model="ObjetModifierstockSup.numerolot"
                      option-value="id"
                      option-text="groupe"
                      placeholder="séléctionner"
                    >
                    </model-list-select>
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
                    ></span
                  ></label>
                  <div class="input-group">
                    <span class="input-group-text"
                      ><i class="fa fa-book" aria-hidden="true"></i
                    ></span>
                    <input
                      type="date"
                      class="form-control"
                      id="inputWithIcon"
                      :value="AfficheDateExpirationEquipementMod(ObjetModifierstockSup.numerolot)"
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div class="mb-3 row">
               
                <div class="col-md-4">
                  <label for="inputWithIcon" class="form-label"
                    >Quantité Actuelle
                    <span
                      style="
                        color: red;
                        font-weight: 900 !important;
                        font-size: 15px;
                      "
                      ></span
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
                      v-model="ObjetModifierstockSup.quantite"
                      disabled
                    />
                  </div>
                </div>
              <div class="col-md-4">
                  <label for="inputWithIcon" class="form-label"
                    >Quantité a retiré
                    <span
                      style="
                        color: red;
                        font-weight: 900 !important;
                        font-size: 15px;
                      "
                      ></span
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
                      placeholder="Entrez quantite"
                      v-model="quantiteretire"
                    />
                  </div>
                </div>
                <div class="col-md-4">
                  <label for="inputWithIcon" class="form-label"
                    >Quantité Disponible
                    <span
                      style="
                        color: red;
                        font-weight: 900 !important;
                        font-size: 15px;
                      "
                      ></span
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
                      placeholder="Entrez quantite"
                    :value="calculeQuantite"
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
import Swal from "sweetalert2";
import { formatDate } from "../variableGlobal";
export default {
  components: {
    ModelListSelect,
  },
  data() {
    return {
      value: 0,
      val:0,
      isLoading: false, // Définir isLoading ici
      responsable_id: "",
      utilisateur_id: "",
      type_equipement_id: "",
      numero_lot_id: 0,
      equipement_id: "",
      quantite: 0,
       quantiteretire:0,
      ObjetModifierstockSup: {
       
      },
      objetrenoule: {
        equipement_id: "",
        type_equipement_id: 0,
        quantite_affecte: 0,
        superviseur_id: "",
        agent_id: "",
        numerolot: "",
      },
      objet: {
        libelle: "",
        type_equipement_id: "",
        quantite: "",
      },
      selectItem: null,
      ObjetAjoute: {},
      ObjetModifier: {
        type_equipement_id: "",
        libelle: "",
        quantite: "",
      },
      currentPage: 1,
      itemsPerPage: 10, // Nombre d'éléments à afficher par page
      totalItems: 0, // Nombre total d'éléments dans les données
    };
  },

  name: "Counter",

  // Hook created pour charger l'utilisateur quand le composant est créé
    created() {
     this.getAgentAffecte();
        this.getEquipementAffecte();
        this.getTypeEquipementDansStockDistrict();
     this.getlisteEquipementDesAsc()
    // this.getSuperviseurParDistrict();
    // this.getTypeEquipementDansStockDistrict();
    // this.getListeEquipementSuperviseur();
    this.getListeStockDistrict()

  },

  computed: {
    // Accès aux getters Vuex pour obtenir la valeur du compteur et de l'utilisateur
    ...mapGetters([
      "getterEquipement",
      "loading","getterStockDistricts",
      "getterTypeEquipementStockDistricts",
      "getterGpeTypeEquipement",
      "getterAgentParSuperviseurs",
      "getterZoneUtilisateur",
      "getteragentEquipement",
      "getteraffectationEquipements",
      "getterEquipementDistrictParType",
      "getterListeEquipementAsc",
    ]),
        afficheMessageAlertSiQteAffecteEstSupDispo() {
      const quantiteDisponible = this.AfficheQuantiteActuelle(this.numero_lot_id);
      const quantiteAffecte = this.quantite;

      // Vérification si la quantité affectée est supérieure à la quantité disponible
      if (quantiteAffecte > quantiteDisponible) {
        Swal.fire({
          position: "top-end",
          title: "Quantité insuffisante",
          icon: "error",
          text: ` La quantité à distribuer de ${quantiteAffecte} dépasse la quantité actuelle de ${quantiteDisponible}.`,
        });
      }
    },  
     calculeQuantite() {
     
        return (
          parseFloat(this.ObjetModifierstockSup.quantite) -
          parseFloat(this.quantiteretire)
        );
      
    },                 
      calculeQuantiteDispoModifier() {
      if (this.AfficheQuantiteActuelleMod(this.ObjetModifierstockSup.numero_lot_id) == "") {
        return 0;
      } else {
        return (
          parseFloat(this.AfficheQuantiteActuelleMod(this.ObjetModifierstockSup.numero_lot_id)) -
          parseFloat(this.ObjetModifierstockSup.quantite)
        );
      }
    },
    calculeQuantiteDispo() {
      if (this.AfficheQuantiteActuelle(this.numero_lot_id) == "") {
        return 0;
      } else {
        return (
          parseFloat(this.AfficheQuantiteActuelle(this.numero_lot_id)) -
          parseFloat(this.quantite)
        );
      }
    },
    afficherNumeroLotParEquipementMod() {
      let collet = [];

      this.getterStockDistricts.filter((item) => {
        if (item.equipement_id === this.ObjetModifierstockSup.equipement_id) {
          let data = {
            id: item.numerolot,
            groupe: item.numerolot,
          };
          collet.push(data);
        }
      });

      // Trie les résultats par 'groupe' (anciennement 'libelle')
      return collet.sort((a, b) => (a.groupe > b.groupe ? 1 : -1));
    },
    afficherNumeroLotParEquipement() {
      let collet = [];

      this.getterEquipementDistrictParType.filter((item) => {
        if (item.equipement_id === this.equipement_id) {
          let data = {
            id: item.numerolot,
            groupe: item.numerolot,
          };
          collet.push(data);
        }
      });

      // Trie les résultats par 'groupe' (anciennement 'libelle')
      return collet.sort((a, b) => (a.groupe > b.groupe ? 1 : -1));
    },
    AfficheLibelleEquipement() {
      return ($id) => {
        if ($id != null && $id != "") {
          const qtereel = this.getterEquipementDistrictParType.find(
            (qtreel) => qtreel.equipement_id == $id
          );

          if (qtereel) {
            return qtereel.libelle;
          }
          return 0;
        }
      };
    },
    afficherEquipementParType() {
      let collet = [];

      this.GroupeEquipementDistrict.filter((item) => {
        //   if (item.type_equipement_id === this.objetrenoule.type_equipement_id && item.quantite != 0)
        {
          let data = {
            id: item,
            groupe: this.AfficheLibelleEquipement(item),
          };
          collet.push(data);
        }
      });

      // Trie les résultats par 'groupe' (anciennement 'libelle')
      return collet.sort((a, b) => (a.groupe > b.groupe ? 1 : -1));
    },
     afficherEquipementParTypeModifier() {
      let collet = [];

      this.GroupeEquipementDistrictModifier.filter((item) => {
        //   if (item.type_equipement_id === this.objetrenoule.type_equipement_id && item.quantite != 0)
        {
          let data = {
            id: item,
            groupe: this.AfficheLibelleEquipementmodifier(item),
          };
          collet.push(data);
        }
      });

      // Trie les résultats par 'groupe' (anciennement 'libelle')
      return collet.sort((a, b) => (a.groupe > b.groupe ? 1 : -1));
    },
     AfficheLibelleEquipementmodifier() {
      return ($id) => {
        if ($id != null && $id != "") {
          const qtereel = this.getterStockDistricts.find(
            (qtreel) => qtreel.equipement_id == $id
          );

          if (qtereel) {
            return qtereel.libelle;
          }
          return 0;
        }
      };
    },
     GroupeEquipementDistrictModifier() {
      let objet = this.getterStockDistricts;

      let array_exercie = [];
      if (objet.length > 0) {
        objet.forEach(function (val) {
          array_exercie.push(val.equipement_id);
        });
        let unique = [...new Set(array_exercie)];
        console.log(unique);
        if (unique.length == 0) {
          return [];
        }
        return unique.sort((a, b) => (a.unique > b.unique ? 1 : -1));
      }
      return [];
      // };
    },
    GroupeEquipementDistrict() {
      let objet = this.getterEquipementDistrictParType;

      let array_exercie = [];
      if (objet.length > 0) {
        objet.forEach(function (val) {
          array_exercie.push(val.equipement_id);
        });
        let unique = [...new Set(array_exercie)];
        console.log(unique);
        if (unique.length == 0) {
          return [];
        }
        return unique.sort((a, b) => (a.unique > b.unique ? 1 : -1));
      }
      return [];
      // };
    },
    
     AfficheCodeEquipementMod() {
      return ($id) => {
        if ($id != null && $id != "") {
          const qtereel = this.getterStockDistricts.find(
            (qtreel) => qtreel.equipement_id == $id
          );

          if (qtereel) {
            return qtereel.code;
          }
          return 0;
        }
      };
    },
     AfficheuniteComptageEquipementmod() {
      return ($id) => {
        if ($id != null && $id != "") {
          const qtereel = this.getterStockDistricts.find(
            (qtreel) => qtreel.equipement_id == $id
          );

          if (qtereel) {
            return qtereel.unite_comptage;
          }
          return 0;
        }
      };
    },
    AfficheQuantiteActuelleMod() {
      return ($id) => {
        if ($id != null && $id != "") {
          const qtereel = this.getterStockDistricts.find(
            (qtreel) => qtreel.numerolot == $id
          );

          if (qtereel) {
            return qtereel.quantite;
          }
          return 0;
        }
      };
    },
      AfficheDateExpirationEquipementMod() {
      return ($id) => {
        if ($id != null && $id != "") {
          const qtereel = this.getterStockDistricts.find(
            (qtreel) => qtreel.numerolot == $id
          );

          if (qtereel) {
            return qtereel.date_expiration;
          }
          return 0;
        }
      };
    },
    AfficheCodeEquipement() {
      return ($id) => {
        if ($id != null && $id != "") {
          const qtereel = this.getterEquipementDistrictParType.find(
            (qtreel) => qtreel.equipement_id == $id
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
          const qtereel = this.getterEquipementDistrictParType.find(
            (qtreel) => qtreel.equipement_id == $id
          );

          if (qtereel) {
            return qtereel.unite_comptage;
          }
          return 0;
        }
      };
    },
    AfficheQuantiteActuelle() {
      return ($id) => {
        if ($id != null && $id != "") {
          const qtereel = this.getterEquipementDistrictParType.find(
            (qtreel) => qtreel.numerolot == $id
          );

          if (qtereel) {
            return qtereel.quantite;
          }
          return 0;
        }
      };
    },
    AfficheDateExpirationEquipement() {
      return ($id) => {
        if ($id != null && $id != "") {
          const qtereel = this.getterEquipementDistrictParType.find(
            (qtreel) => qtreel.numerolot == $id
          );

          if (qtereel) {
            return qtereel.date_expiration;
          }
          return 0;
        }
      };
    },
    AfficheNumeroLotEquipement() {
      return ($id) => {
        if ($id != null && $id != "") {
          const qtereel = this.getterEquipementDistrictParType.find(
            (qtreel) => qtreel.equipement_id == $id
          );

          if (qtereel) {
            return qtereel.numerolot;
          }
          return 0;
        }
      };
    },

    afficherListeDesSuperviseur() {
      return this.getterZoneUtilisateur.filter((data) => data.code_role == 3);
    },
    afficheAgentParSuperviseurs() {
      let collet = [];
      this.getterAgentParSuperviseurs.filter((item) => {
        let data = {
          id: item.id,
          // code:item.code,
          groupe: item.label,
        };
        collet.push(data);
      });
      return collet.sort((a, b) => (a.groupe > b.groupe ? 1 : -1));
    },
    afficheQuantiteGlobal() {
      return (
        parseFloat(
          this.AfficheQuantiteDisponible(this.objetrenoule.equipement_id)
        ) - parseFloat(this.objetrenoule.quantite_affecte)
      );
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
    AfficheDateExpiration() {
      return ($id, $id2) => {
        if (($id != null && $id != "") || ($id2 != null && $id2 != "")) {
          const qtereel = this.getterEquipement.find(
            (qtreel) => qtreel.id == $id && qtreel.numero_lot == $id2
          );

          if (qtereel) {
            return qtereel.date_peremption;
          }
          return 0;
        }
      };
    },

    afficherNumeroLot() {
      let collet = [];

      this.getterEquipement.filter((item) => {
        if (item.id === this.objetrenoule.equipement_id) {
          let data = {
            id: item.id,
            groupe: item.numero_lot,
          };
          collet.push(data);
        }
      });

      // Trie les résultats par 'groupe' (anciennement 'libelle')
      return collet.sort((a, b) => (a.groupe > b.groupe ? 1 : -1));
    },
    afficheLibelleTypeEquipement() {
      let collet = [];
      this.getterTypeEquipementStockDistricts.filter((item) => {
        let data = {
          id: item.type_equipement_id,
          // code:item.code,
          groupe: item.libelle_type_equipement,
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
      return this.getteragentEquipement.slice(
        startIndex,
        startIndex + this.itemsPerPage
      );
    },
    totalPages() {
      return Math.ceil(
        this.getteragentEquipement.length / this.itemsPerPage
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
      "getzoneUtilisateur",
      "getListeAgentParSuperviseur",
      "enregistrerAffectationEquipement",
      "enregistrerStockAsc",
      "getAgentAffecte",
      "getEquipementAffecte",
      "getSuperviseurParDistrict",
      "getTypeEquipementDansStockDistrict",
      "getListeEquipementSuperviseur","getlisteEquipementDesAsc",
      "getEquipementDuDistrictParType","getListeStockDistrict",'supprimerStockSuperviseur'
    ]),

    afficherClique($id) {
      if (this.value==0) {
        return this.value=$id
      } else {
        return this.value=0;
      }
},

 

    formatDate,
    async enregistreStockEquipement() {
      if (this.val == 2) {
        const objet = {
        type_equipement_id: this.type_equipement_id,
        equipement_id: this.equipement_id,
        numerolot: this.numero_lot_id,
        quantite: this.quantite,
        date_expiration: this.AfficheDateExpirationEquipement(
          this.numero_lot_id
        ),
        asc_id: this.ObjetModifier.agent_id,
        valeur:this.val
      };

      const champsRemplis = Object.values(objet).every((value) => value != "");

      if (!champsRemplis) {
        // Affiche une alerte ou laisse la méthode appelée gérer les erreurs
        await this.enregistrerStockAsc(objet);
        this.type_equipement_id != "";
        this.equipement_id != "";
        this.numerolot != "";
        this.quantite != "";
        this.date_expiration != "";
        }
      await this.enregistrerStockAsc(objet);

      // Réinitialise les champs uniquement après tentative d'enregistrement avec des données valides
      this.type_equipement_id = "";
      this.equipement_id = "";
      this.numerolot = "";
      this.quantite = "";
      this.date_expiration = "";
      } else {
        const objet = {
        type_equipement_id: this.ObjetModifierstockSup.type_equipement_id,
        equipement_id: this.ObjetModifierstockSup.equipement_id,
        numerolot: this.ObjetModifierstockSup.numerolot,
        quantite: this.quantiteretire,
        date_expiration: this.AfficheDateExpirationEquipementMod(
          this.ObjetModifierstockSup.numerolot
        ),
        asc_id: this.ObjetModifierstockSup.asc_id,
        valeur:this.val
      };

      const champsRemplis = Object.values(objet).every((value) => value != "");

      if (!champsRemplis) {
        // Affiche une alerte ou laisse la méthode appelée gérer les erreurs
        await this.enregistrerStockAsc(objet);
        this.ObjetModifierstockSup.type_equipement_id != "";
        this.ObjetModifierstockSup.equipement_id != "";
        this.ObjetModifierstockSup.numerolot != "";
        this.ObjetModifierstockSup.quantite != "";
       
        }
      await this.enregistrerStockAsc(objet);

      // Réinitialise les champs uniquement après tentative d'enregistrement avec des données valides
      this.ObjetModifierstockSup.type_equipement_id = "";
      this.ObjetModifierstockSup.equipement_id = "";
      this.ObjetModifierstockSup.numerolot = "";
      this.ObjetModifierstockSup.quantite = "";
      
      }
      

      
    },
    afficheEquipeParType($id) {
      return this.getterListeEquipementAsc.filter(
        (data) => data.asc_id == $id
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
        quantite: this.objet.quantite,
      };
      this.enregistrerEquipement(ob);

      this.objet.libelle = "";
      this.objet.quantite = "";
    },

    async modifierEquipements() {
      let ob = {
        id: this.ObjetModifier.id,
        type_equipement_id: this.ObjetModifier.type_equipement_id,
        libelle: this.ObjetModifier.libelle,
        quantite: this.ObjetModifier.quantite,
      };
      this.modifierEquipement(ob);
      // $('#staticBackdrop').modal('hide');
      // modal.hide();
    },

    async ajouterAffectationEquipement() {
      let ob = {
        //  id: this.objetrenoule.equipement_id,
        type_equipement_id: this.objetrenoule.type_equipement_id,
        equipement_id: this.objetrenoule.equipement_id,
        quantite_dispo: this.afficheQuantiteGlobal,
        quantite_affecte: this.objetrenoule.quantite_affecte,
        superviseur_id: this.ObjetAjoute.responsable_id,
        agent_id: this.ObjetAjoute.agent_id,
        numerolot: this.objetrenoule.numerolot,
        date_expiration: this.AfficheDateExpiration(
          this.objetrenoule.equipement_id,
          this.objetrenoule.numerolot
        ),
      };
      this.enregistrerAffectationEquipement(ob);
      this.objetrenoule.quantite_affecte = 0;
      this.objetrenoule.equipement_id = "";
      this.objetrenoule.numerolot = "";
      // $('#staticBackdrop').modal('hide');
      // modal.hide();
    },
    async FaireAffectation(id) {
      this.ObjetModifier = this.getteragentEquipement.find(
        (items) => items.agent_id== id
      );
      return this.val = 2
    },

    async AfficheModalModification(id) {
  
      this.ObjetModifierstockSup = this.getterListeEquipementAsc.find(
        (items) => items.id == id
   );
      return this.val = 1
    },


    async AfficheModalAjoute(id) {
      this.ObjetAjoute = this.getteragentEquipement.find(
        (items) => items.agent_id == id
      );
       return this.val = 2
    },
    
  },
  watch: {
    type_equipement_id: function (value) {
      let objet = {
        typeEquipement: value,
      };

      this.getEquipementDuDistrictParType(objet);

      // }
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
