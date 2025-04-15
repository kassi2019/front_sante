<template>
  <!-- dashboard inner -->

  <div>
    <div class="row column_title">
      <div class="col-md-12">
        <div class="page_title">
          <h2></h2>
        </div>
      </div>
    </div>

    <div>
      <div class="col-md-12">
        <div class="white_shd full margin_bottom_30">
          <FormWizard @on-complete="onComplete" color="#457DBB">
            <h5 style="text-align: center">
              Nom du ménage :<span style="font-size: 20px;">{{ AfficheNomFamille(idChefFamille) }}</span> 
            </h5>
            <TabContent title="Bénéficiaire de soins" icon="fa fa-hourglass-half">
              <div class="table_section padding_infor_info">
                <span style="font-size: 15px; font-weight: bold"
                  >Bénéficiaire de soins</span
                >
                <div class="table-responsive-sm">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <!-- <th>Code</th> -->
                        <th style="width: 15%;">Nom</th>
                        <th style="width: 50%;"> Prenoms</th>
                        <th>Date naissance</th>
                        <th>Sexe</th>
                        <th>Age</th>
                        <th style="width: 9% !important; text-align: center">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr v-for="(data, index) in paginatedData" :key="data.id">
                        <td>{{ index + 1 }}</td>
                        <!-- <td>{{ data.code }}</td> -->
                        <td>{{ data.nom }}</td>
                        <td>{{ data.prenoms }}</td>
                        <td>{{ data.date_naissance }}</td>

                        <td>{{ data.sexe }}</td>
                       <td>{{ calculeAgePatient(data.date_naissance) }} ans</td>
                        
                        <td class="button_block">
                          <button
                            type="button"
                            class="btn btn-info"
                             @click.prevent="detailPatient(data.id)"
                            
                          >
                            <i class="fa fa-ambulance" aria-hidden="true" style="color: black;"></i> VISITE
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
            </TabContent>

          </FormWizard>
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
                Modifier Patient
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
                  >Nom chef de famille
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
                    :list="afficheNomChefFamille"
                    v-model="objetPatient.chef_famille_id"
                    option-value="id"
                    option-text="groupe"
                    placeholder="séléctionner le nom du chef"
                  >
                  </model-list-select>
                </div>
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
                    v-model="objetPatient.nom"
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
                    placeholder="Entrez prenoms"
                    v-model="objetPatient.prenoms"
                  />
                </div>
              </div>
              <div class="mb-3">
                <label for="inputWithIcon" class="form-label"
                  >Numéro de téléphone</label
                >
                <div class="input-group">
                  <span class="input-group-text"
                    ><i class="fa fa-book" aria-hidden="true"></i
                  ></span>
                  <input
                    type="text"
                    class="form-control"
                    id="inputWithIcon"
                    placeholder="Entrez numero"
                    v-model="objetPatient.numero"
                  />
                </div>
              </div>

              <div class="mb-3 row">
                <div class="col-md-6">
                  <label for="inputWithIcon" class="form-label"
                    >Date de naissance</label
                  >
                  <div class="input-group">
                    <span class="input-group-text">
                      <i class="fa fa-book" aria-hidden="true"></i>
                    </span>
                    <input
                      type="date"
                      class="form-control"
                      id="inputWithIcon"
                      placeholder="Entrez date_naissance"
                      v-model="objetPatient.date_naissance"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <label for="inputWithIcon" class="form-label"
                    >Lieu de naissance</label
                  >
                  <div class="input-group">
                    <span class="input-group-text">
                      <i class="fa fa-book" aria-hidden="true"></i>
                    </span>
                    <input
                      type="text"
                      class="form-control"
                      id="inputWithIcon"
                      placeholder="Entrez lieu naissance"
                      v-model="objetPatient.lieu_naissance"
                    />
                  </div>
                </div>
              </div>
              <div class="mb-3 row">
                <div class="col-md-6">
                  <label for="inputWithIcon" class="form-label"
                    >Numéro CMU</label
                  >
                  <div class="input-group">
                    <span class="input-group-text">
                      <i class="fa fa-book" aria-hidden="true"></i>
                    </span>
                    <input
                      type="text"
                      class="form-control"
                      id="inputWithIcon"
                      placeholder="Entrez numero cmu"
                      v-model="objetPatient.numero_cmu"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <label for="inputWithIcon" class="form-label"
                    >Numéro CNI</label
                  >
                  <div class="input-group">
                    <span class="input-group-text">
                      <i class="fa fa-book" aria-hidden="true"></i>
                    </span>
                    <input
                      type="text"
                      class="form-control"
                      id="inputWithIcon"
                      placeholder="Entrez numero cni"
                      v-model="objetPatient.numero_cni"
                    />
                  </div>
                </div>
              </div>
              <div class="mb-3 row">
                <div class="col-md-6">
                  <label for="inputWithIcon" class="form-label">Sexe</label>
                  <select
                    class="form-select form-select-lg mb-3"
                    aria-label=".form-select-lg example"
                    v-model="objetPatient.sexe"
                  >
                    <option selected></option>
                    <option value="M">Homme</option>
                    <option value="F">Femme</option>
                    <option value="A">Autre</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label for="inputWithIcon" class="form-label"
                    >Type de patient</label
                  >
                  <select
                    class="form-select form-select-lg mb-3"
                    aria-label=".form-select-lg example"
                    v-model="objetPatient.type_patient_id"
                  >
                    <option selected></option>
                    <option
                      v-for="data in getterTypePatient"
                      :key="data.id"
                      :value="data.id"
                    >
                      {{ data.libelle }}
                    </option>
                  </select>
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
                @click.prevent="modifierpat()"
              >
                Modifier
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade"
        id="staticEtatPatient"
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
                Etat Bénéficiaire de soins
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
                  >Etat du Bénéficiaire de soins
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
                  v-model="objetPatient.etat"
                >
                  <option selected></option>
                  <option
                    value="0"
                    v-if="
                      (objetPatient.etat == 0 &&
                        objetPatient.type_patient_id == 2) ||
                      (objetPatient.etat == 2 &&
                        objetPatient.type_patient_id == 2) ||
                      (objetPatient.etat == 1 &&
                        objetPatient.type_patient_id == 2)
                    "
                  >
                    Grossesse en cours
                  </option>

                  <option value="1">Décede</option>
                  <option
                    value="2"
                    v-if="
                      (objetPatient.etat == 0 &&
                        objetPatient.type_patient_id == 2) ||
                      (objetPatient.etat == 2 &&
                        objetPatient.type_patient_id == 2) ||
                      (objetPatient.etat == 1 &&
                        objetPatient.type_patient_id == 2)
                    "
                  >
                    Fin de Grossesse
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label for="inputWithIcon" class="form-label"
                  >Date d'effect
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
                    placeholder="Entrez Nom"
                    v-model="objetPatient.date_effect"
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
                @click.prevent="modifierpat()"
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
import { FormWizard, TabContent } from "vue3-form-wizard";
// import Loader from "./Loader.vue";
import { ModelListSelect } from "vue-search-select";
export default {
  data() {
    return {
      isLoading: false, // Définir isLoading ici

      objet: {
        code: "",
        libelle: "",
      },
      objetPatient: {
        date_effect: "",
        etat: "",
        nom: "",
        date_naissance: "",
        sexe: "",
        prenoms: "",
        numero: "",
        encours: "",
        type_patient_id: "",
        lieu_naissance: "",
        numero_cmu: "",
        chef_famille_id: "",
        numero_cni: "",
      },
      ObjetModifier: {
        code: "",
        libelle: "",
      },
      currentPage: 1,
      itemsPerPage: 10,
      totalItems: 0,
    };
  },
  components: {
    FormWizard,
    TabContent,
    ModelListSelect,
  },
  name: "Counter",

  // Hook created pour charger l'utilisateur quand le composant est créé
  created() {
    this.idChefFamille = this.$route.params.id;
    this.getTypePatient();
    this.getmenages();
      this.getpatients();
      this.fetchToday()
  },

  computed: {
    // Accès aux getters Vuex pour obtenir la valeur du compteur et de l'utilisateur
    ...mapGetters([
      "getterpatient",
      "loading",
      "gettermenages",
      "getterTypePatient",'getToday'
    ]),
    recuperationIdZone() {
      return (id) => {
        if (id != null && id != "") {
          let qtereel = this.gettermenages.find((qtreel) => qtreel.id == id);

          if (qtereel) {
            return qtereel.zone_intervention_id;
          }
          return "";
        }
      };
    },
    AfficheTypePatient() {
      return (id) => {
        if (id != null && id != "") {
          const qtereel = this.getterTypePatient.find(
            (qtreel) => qtreel.id == id
          );

          if (qtereel) {
            return qtereel.libelle;
          }
          return "6";
        }
      };
    },
    AfficheNomFamille() {
      return (id) => {
        if (id != null && id != "") {
          const qtereel = this.gettermenages.find((qtreel) => qtreel.id == id);

          if (qtereel) {
            return qtereel.nom.concat("  ", qtereel.prenoms);
          }
          return "6";
        }
      };
    },
    afficheNomChefFamille() {
      let collet = [];
      this.gettermenages.filter((item) => {
        let data = {
          id: item.id,
          // code:item.code,
          groupe: item.nom.concat(" ", item.prenoms),
        };
        collet.push(data);
      });
      return collet.sort((a, b) => (a.nom > b.nom ? 1 : -1));
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

    visiblePagesPat() {
      let pages = [];
      let startPage = Math.max(1, this.currentPage - 2);
      let endPage = Math.min(this.totalPagesPatient, this.currentPage + 2);
      console.log(endPage);
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      return pages;
    },

    // Calcule les éléments à afficher en fonction de la page actuelle
    paginatedData() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      return this.afficheLesPatientEnCours.slice(
        startIndex,
        startIndex + this.itemsPerPage
      );
    },
    afficheLesPatientEnCours() {
      return this.getterpatient.filter(
        (data) => data.chef_famille_id == this.idChefFamille
      );
    },

    totalPages() {
      return Math.ceil(
        this.afficheLesPatientEnCours.length / this.itemsPerPage
      );
    },

    paginatedDataPatientTer() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      return this.afficheLesPatientTerminer.slice(
        startIndex,
        startIndex + this.itemsPerPage
      );
    },
    afficheLesPatientTerminer() {
      return this.getterpatient.filter(
        (data) =>
          data.encours == 1 && data.chef_famille_id == this.idChefFamille
      );
    },

    totalPagesPatient() {
      return Math.ceil(
        this.afficheLesPatientTerminer.length / this.itemsPerPage
      );
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
      "getpatients",
      "enregistrerRole",
      "supprimerpatient",
      "modifierpatient",
      "getmenages",
      "getTypePatient","fetchToday"
    ]),


 async detailPatient(id) {
      this.$router.push({
        name: "pageQuestionnaire",
        params: { id: id },
      });
      },
    

calculeAgePatient(dateNaissance) {
  const today = new Date();
  const birthDate = new Date(dateNaissance);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 || 
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
},
    afficherStatutPatient($id, $id1) {
      if ($id == 0 && $id1 == 2) {
        return "Grossesse en cours";
      } else if ($id == 1) {
        return "Decede";
      } else if ($id == 2 && $id1 == 2) {
        return "Fin de Grossesse";
      } else {
        return "";
      }
    },
    changePage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    async enregistrerRole() {
      this.$store.dispatch("enregistrerRole", this.objet);

      this.objet = {
        libelle: "",
      };
    },

    async modifierpat() {
      let ob = {
        id: this.objetPatient.id,
        nom: this.objetPatient.nom,
        date_naissance: this.objetPatient.date_naissance,
        lieu_naissance: this.objetPatient.lieu_naissance,
        prenoms: this.objetPatient.prenoms,
        numero: this.objetPatient.numero,
        sexe: this.objetPatient.sexe,
        type_patient_id: this.objetPatient.type_patient_id,
        numero_cmu: this.objetPatient.numero_cmu,
        numero_cni: this.objetPatient.numero_cni,
        chef_famille_id: this.objetPatient.chef_famille_id,
        etat: this.objetPatient.etat,
        date_effect: this.objetPatient.date_effect,
        zone_intervention_id: this.recuperationIdZone(
          this.objetPatient.chef_famille_id
        ),
      };
      this.modifierpatient(ob);
      // modal.hide();
    },

    async AfficheModalModification(id) {
      this.objetPatient = this.getterpatient.find((items) => items.id == id);
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
