<template>
  <!-- dashboard inner -->

  <div>
    <br /><br /><br />
    <div class="row column_title">
      <div class="col-md-12">
        <div class="page_title">
          <h2>Liste des ménages</h2>
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
                    <th>Nom</th>
                    <th>Prenoms</th>
                    <th>Numero</th>
                    <th>Longitude(-)</th>
                    <th>Latitude(+)</th>
                    <th>Zone intervention</th>

                    <th style="width: 15% !important; text-align: center">
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
                    <td>{{ data.numero }}</td>
                    <td>{{ data.longitude }}</td>
                    <td>{{ data.latitude }}</td>
                    <td>
                      {{ libelleZoneIntervention(data.zone_intervention_id) }}
                    </td>

                    <td class="button_block">
                      <button
                        type="button"
                        class="btn cur-p btn-warning"
                        data-bs-toggle="modal"
                        @click.prevent="detailPatient(data.id)"
                      >
                        <i
                          class="fa fa-folder-open"
                          aria-hidden="true"
                          style="color: black"
                        >
                          Détail</i
                        >
                      </button>
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
                        @click.prevent="supprimermenages(data.id)"
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
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h5
                class="modal-title"
                id="staticBackdropLabel"
                style="text-transform: capitalize !important"
              >
                Enregistrer
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <FormWizard @on-complete="onComplete" color="#457DBB">
                <TabContent title="MENAGE" icon="fa fa-user-tie">
                  <div class="mb-3 row">
                    <div class="col-md-3">
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
                        <span class="input-group-text">
                          <i class="fa fa-book" aria-hidden="true"></i>
                        </span>
                        <input
                          type="text"
                          class="form-control"
                          id="inputWithIcon"
                          placeholder="Entrez Nom"
                          v-model="objet.nom"
                        />
                      </div>
                    </div>
                    <div class="col-md-9">
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
                        <span class="input-group-text">
                          <i class="fa fa-book" aria-hidden="true"></i>
                        </span>
                        <input
                          type="text"
                          class="form-control"
                          id="inputWithIcon"
                          placeholder="Entrez prenoms"
                          v-model="objet.prenoms"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="mb-3 row">
                    <div class="col-md-4">
                      <label for="inputWithIcon" class="form-label"
                        >Numero téléphone</label
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
                          v-model="objet.numero"
                        />
                      </div>
                    </div>
                    <div class="col-md-4">
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
                          placeholder="Entrez numero_cmu"
                          v-model="objet.numero_cmu"
                        />
                      </div>
                    </div>
                    <div class="col-md-4">
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
                          placeholder="Entrez numero_cni"
                          v-model="objet.numero_cni"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="mb-3 row">
                    <div class="col-md-3">
                      <label for="inputWithIcon" class="form-label"
                        >Longitude(-)</label
                      >
                      <div class="input-group">
                        <span class="input-group-text">
                          <i class="fa fa-book" aria-hidden="true"></i>
                        </span>
                        <input
                          type="text"
                          class="form-control"
                          id="inputWithIcon"
                          placeholder="Entrez longitude"
                          v-model="objet.longitude"
                        />
                      </div>
                    </div>
                    <div class="col-md-3">
                      <label for="inputWithIcon" class="form-label"
                        >Latitude(+)</label
                      >
                      <div class="input-group">
                        <span class="input-group-text">
                          <i class="fa fa-book" aria-hidden="true"></i>
                        </span>
                        <input
                          type="text"
                          class="form-control"
                          id="inputWithIcon"
                          placeholder="Entrez latitude"
                          v-model="objet.latitude"
                        />
                      </div>
                    </div>

                    <div class="col-md-6">
                      <label for="inputWithIcon" class="form-label"
                        >Zone Intervention</label
                      >
                      <select
                        class="form-select form-select-lg mb-3"
                        aria-label=".form-select-lg example"
                        v-model="objet.zone_intervention_id"
                      >
                        <option selected></option>
                        <option
                          v-for="data in getterZoneParAgent"
                          :key="data.zone_intervention_id"
                          :value="data.zone_intervention_id"
                        >
                          {{ data.libelle }}
                        </option>
                      </select>
                    </div>
                  </div>

                  <div class="modal-footer">
                    <!-- <button
                type="button"
                class="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Fermer
              </button> -->
                    <button
                      type="button"
                      class="btn btn-success"
                      :disabled="loading"
                      @click.prevent="enregistrecheffamille()"
                    >
                      Enregistrer ménages
                    </button>
                  </div>
                </TabContent>
                <TabContent title="PATIENT" icon="fa fa-stethoscope">
                  <!-- <div class="mb-3">
                    
                  </div> -->
                  <div class="mb-3 row">
                    <div class="col-md-3">
                      <label for="inputWithIcon" class="form-label"
                        >Nom ménages
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
                    <div class="col-md-3">
                      <label for="inputWithIcon" class="form-label"
                        >Nom Patient
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
                        <span class="input-group-text">
                          <i class="fa fa-book" aria-hidden="true"></i>
                        </span>
                        <input
                          type="text"
                          class="form-control"
                          id="inputWithIcon"
                          placeholder="Entrez Nom"
                          v-model="objetPatient.nom"
                        />
                      </div>
                    </div>
                          <div class="col-md-6">
                      <label for="inputWithIcon" class="form-label"
                        >Prénoms Patient
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
                        <span class="input-group-text">
                          <i class="fa fa-book" aria-hidden="true"></i>
                        </span>
                        <input
                          type="text"
                          class="form-control"
                          id="inputWithIcon"
                          placeholder="Entrez prenoms"
                          v-model="objetPatient.prenoms"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="mb-3 row">
               <div class="col-md-3">
                      <label for="inputWithIcon" class="form-label"
                        >Date debut de grossesse<span
                          style="
                            color: red;
                            font-weight: 900 !important;
                            font-size: 15px;
                          "
                          ></span
                        ></label
                      >
                      <div class="input-group">
                        <span class="input-group-text">
                          <i class="fa fa-book" aria-hidden="true"></i>
                        </span>
                        <input
                          type="date"
                          class="form-control"
                          id="inputWithIcon"
                          
                          v-model="objetPatient.date_debut_grossesse"
                        />
                      </div>
                    </div>
                    <div class="col-md-3">
                      <label for="inputWithIcon" class="form-label"
                        >Date de naissance<span
                          style="
                            color: red;
                            font-weight: 900 !important;
                            font-size: 15px;
                          "
                          >*</span
                        ></label
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
                    <div class="col-md-4">
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
                    <div class="col-md-4">
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
                    <div class="col-md-4">
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
                    <div class="col-md-4">
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
                    <div class="col-md-4">
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
                    <div class="col-md-4">
                      <label for="inputWithIcon" class="form-label"
                        >Vaccin</label
                      >
                      <treeselect
                        v-model="StateModules"
                        :multiple="true"
                        :options="afficheVaccinParTypePatient"
                      />
             
                    </div>
                  </div>
                  <div class="modal-footer">
                    <!-- <button
                type="button"
                class="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Fermer
              </button> -->
                    <button
                      type="button"
                      class="btn btn-success"
                   
                      @click.prevent="enregistrepatient()"
                    >
                      Enregistrer Patient
                    </button>
                  </div>
                </TabContent>
              </FormWizard>
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
                Modifier Info ménages
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
                <label for="inputWithIcon" class="form-label">Nom</label>
                <div class="input-group">
                  <span class="input-group-text"
                    ><i class="fa fa-book" aria-hidden="true"></i
                  ></span>
                  <input
                    type="text"
                    class="form-control"
                    id="inputWithIcon"
                    placeholder="Entrez Nom"
                    v-model="ObjetModifier.nom"
                  />
                </div>
              </div>
              <div class="mb-3">
                <label for="inputWithIcon" class="form-label">Prénoms</label>
                <div class="input-group">
                  <span class="input-group-text"
                    ><i class="fa fa-book" aria-hidden="true"></i
                  ></span>
                  <input
                    type="text"
                    class="form-control"
                    id="inputWithIcon"
                    placeholder="Entrez prenoms"
                    v-model="ObjetModifier.prenoms"
                  />
                </div>
              </div>
              <div class="mb-3">
                <label for="inputWithIcon" class="form-label"
                  >Numero téléphone</label
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
                    v-model="ObjetModifier.numero"
                  />
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
                      placeholder="Entrez numero_cmu"
                      v-model="ObjetModifier.numero_cmu"
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
                      placeholder="Entrez numero_cni"
                      v-model="ObjetModifier.numero_cni"
                    />
                  </div>
                </div>
              </div>

              <div class="mb-3 row">
                <div class="col-md-6">
                  <label for="inputWithIcon" class="form-label"
                    >Longitude(-)</label
                  >
                  <div class="input-group">
                    <span class="input-group-text">
                      <i class="fa fa-book" aria-hidden="true"></i>
                    </span>
                    <input
                      type="text"
                      class="form-control"
                      id="inputWithIcon"
                      placeholder="Entrez longitude"
                      v-model="ObjetModifier.longitude"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <label for="inputWithIcon" class="form-label"
                    >Latitude(+)</label
                  >
                  <div class="input-group">
                    <span class="input-group-text">
                      <i class="fa fa-book" aria-hidden="true"></i>
                    </span>
                    <input
                      type="text"
                      class="form-control"
                      id="inputWithIcon"
                      placeholder="Entrez latitude"
                      v-model="ObjetModifier.latitude"
                    />
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <label for="inputWithIcon" class="form-label"
                  >Zone Intervention</label
                >
                <select
                  class="form-select form-select-lg mb-3"
                  aria-label=".form-select-lg example"
                  v-model="ObjetModifier.zone_intervention_id"
                >
                  <option selected></option>
                  <option
                    v-for="data in getterZoneParAgent"
                    :key="data.zone_intervention_id"
                    :value="data.zone_intervention_id"
                  >
                    {{ data.libelle }}
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
                @click.prevent="modifiercheffamille()"
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
import { ModelListSelect } from "vue-search-select";
import Treeselect from "vue3-treeselect";
export default {
  components: {
    FormWizard,
    TabContent,
    ModelListSelect,
     Treeselect,
  },
  data() {
    return {
      StateModules: [],
      isLoading: false, // Définir isLoading ici
      //  showModal: true,
      objet: {
        nom: "",
        longitude: "",
        latitude: "",
        prenoms: "",
        numero: "",
        zone_intervention_id: "",
        numero_cmu: "",
        numero_cni: "",
      },
      objetPatient: {
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
      selectItem: null,
      ObjetModifier: {
        nom: "",
        longitude: "",
        latitude: "",
        prenoms: "",
        numero: "",
        zone_intervention_id: "",
        numero_cmu: "",
        numero_cni: "",
      },

      currentPage: 1,
      itemsPerPage: 10,
      totalItems: 0,
    };
  },

  name: "Counter",

  // Hook created pour charger l'utilisateur quand le composant est créé
  created() {
    this.getZoneParAgent();
    this.getTypePatient();
    this.getVaccinTreeSelect();
    this.getmenages();
  },

  computed: {
    // Accès aux getters Vuex pour obtenir la valeur du compteur et de l'utilisateur
    ...mapGetters([
      "gettermenages",
      "getterVaccinTreeSelect",
      "loading",
      "getterZoneParAgent",
      "getterTypePatient",
    ]),
    afficheVaccinParTypePatient() {
        
      if (this.objetPatient.type_patient_id == 2) {
 
        return this.getterVaccinTreeSelect.filter(data=>data.typepatient==this.objetPatient.type_patient_id)
      } else {
        return this.getterVaccinTreeSelect.filter(data=>data.typepatient!=2)
      }
      
    },
    recuperationIdZone() {
      return (id) => {
        if (id != null && id != "") {
          let qtereel = this.gettermenages.find(
            (qtreel) => qtreel.id == id
          );

          if (qtereel) {
            return qtereel.zone_intervention_id;
          }
          return "";
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
    libelleZoneIntervention() {
      return (id) => {
        if (id != null && id != "") {
          let qtereel = this.getterZoneParAgent.find(
            (qtreel) => qtreel.zone_intervention_id == id
          );

          if (qtereel) {
            return qtereel.libelle;
          }
          return "";
        }
      };
    },
    afficheZoneParUtilisateur() {
      return this.getterZoneParUtilisateur.filter(
        (qtreel) => qtreel.utilisateur_id == $id
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

    // Calcule les éléments à afficher en fonction de la page actuelle
    paginatedData() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      return this.gettermenages.slice(
        startIndex,
        startIndex + this.itemsPerPage
      );
    },
    totalPages() {
      return Math.ceil(this.gettermenages.length / this.itemsPerPage);
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
      "getmenages",
      "getVaccinTreeSelect",
      "getTypePatient",
      "enregistrermenages",
      "supprimermenages",
      "modifiermenages",
      "getZoneParAgent",
      "enregistrerpatient",
    ]),
 
    async detailPatient($id) {
      this.$router.push({
        name: "detailPatient",
        params: { id: $id },
      });
    },
    // Fonction pour changer de page
    changePage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    // Fonction pour calculer le nombre total de pages

    // Charger tes données et mettre à jour totalItems
    async enregistrepatient() {
      let ob = {
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
        date_debut_grossesse:this.objetPatient.date_debut_grossesse,
        zone_intervention_id:this.recuperationIdZone(this.objetPatient.chef_famille_id),
        DataModule: this.StateModules,
      };
      this.enregistrerpatient(ob);
      if (
        this.objetPatient.nom != "" ||
        this.objetPatient.prenoms != "" ||
        this.objetPatient.date_naissance != "" ||
        this.objetPatient.numero != "" ||
        this.objetPatient.lieu_naissance != "" ||
        this.objetPatient.sexe != "" ||
        this.objetPatient.type_patient_id != ""
      ) {
        this.objetPatient = {
          nom: "",
          prenoms: "",
          date_naissance: "",
          numero: "",
          lieu_naissance: "",
          sexe: "",
          numero_cni: "",
          numero_cmu: "",
          type_patient_id: "",
        };
      } else {
      }
    },
    async enregistrecheffamille() {
      let ob = {
        nom: this.objet.nom,
        longitude: this.objet.longitude,
        latitude: this.objet.latitude,
        prenoms: this.objet.prenoms,
        numero: this.objet.numero,
        zone_intervention_id: this.objet.zone_intervention_id,
        numero_cmu: this.objet.numero_cmu,
        numero_cni: this.objet.numero_cni,
      };
      this.enregistrermenages(ob);

      if (
        (this.objet.nom != "" ||
          this.objet.prenoms != "" ||
          this.objet.longitude != "" ||
          this.objet.numero != "" ||
          this.objet.latitude != "" ||
          this.objet.zone_intervention_id != "" ||
          this.objet.numero_cni != "",
        this.objet.numero_cmu != "")
      ) {
        this.objet = {
          nom: "",
          prenoms: "",
          longitude: "",
          numero: "",
          latitude: "",
          zone_intervention_id: "",
          numero_cni: "",
          numero_cmu: "",
        };
      } else {
      }
    },

    async modifiercheffamille() {
      let ob = {
        id: this.ObjetModifier.id,
        nom: this.ObjetModifier.nom,
        longitude: this.ObjetModifier.longitude,
        latitude: this.ObjetModifier.latitude,
        prenoms: this.ObjetModifier.prenoms,
        numero: this.ObjetModifier.numero,
        zone_intervention_id: this.ObjetModifier.zone_intervention_id,
        numero_cmu: this.ObjetModifier.numero_cmu,
        numero_cni: this.ObjetModifier.numero_cni,
      };
      this.modifiermenages(ob);
      //  this.showModal = false;
      // $('#staticBackdrop').modal('hide');
      // modal.hide();
    },

    async AfficheModalModification(id) {
      this.ObjetModifier = this.gettermenages.find((items) => items.id == id);
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
