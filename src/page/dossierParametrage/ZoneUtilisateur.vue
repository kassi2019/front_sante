<template>
  <!-- dashboard inner -->

  <div>
    <br />
    <div class="row column_title">
      <div class="col-md-12">
        <div class="page_title">
          <h2>Affectation des Zones Par Utilisateur</h2>
        </div>
      </div>
    </div>

    <div>
      <div class="col-md-12">
        <div class="white_shd full margin_bottom_30">
          <div class="table_section padding_infor_info">
            <div class="table-responsive-sm">
              <FormWizard @on-complete="onComplete" color="#457DBB">
                <TabContent
                  title="Afféctation du District au Agent"
                  icon="fas fa-user-md"
                  ><div
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
                        AJOUTER DISTRICT
                      </button>
                    </div>
                  </div>

                  <table class="table">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Libelle</th>

                        <th style="width: 9% !important; text-align: center">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody
                      v-for="data in afficherListeDesDistrict"
                      :key="data.utilisateur_id"
                    >
                      <tr style="background-color: #c4d7ed">
                        <td colspan="2">
                          <i class="fa fa-share"></i>
                          <span style="font-weight: bolder"
                            >Agent du district</span
                          >
                          :
                          <span style="font-size: 15px !important">{{
                            data.nom_utilisateur
                          }}</span>
                        </td>

                        <td class="button_block"></td>
                      </tr>
                      <tr
                        v-for="data1 in afficheZoneParUtilisateur(
                          data.utilisateur_id
                        )"
                        :key="data1.aire_sanitaire_id"
                      >
                        <td></td>

                        <td>
                          <i class="fa fa-hand-o-right"> </i>
                          <span style="font-weight: bolder">District</span>
                          :
                          {{ data1.libelle_district }}
                        </td>
                        <td class="button_block">
                          <button
                            type="button"
                            class="btn cur-p btn-success"
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdropModification1"
                            @click.prevent="AfficheModalModification(data1.id)"
                          >
                            <i
                              class="fa fa-pencil-square-o"
                              aria-hidden="true"
                            ></i>
                          </button>
                          <button
                            type="button"
                            class="btn cur-p btn-danger"
                            @click.prevent="supprimerZoneUtilisateur(data1.id)"
                          >
                            <i class="fa fa-trash"></i>
                          </button>
                        </td>
                      </tr>
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
                </TabContent>
                <TabContent
                  title="Affectation des zones au Superviseurs"
                  icon="fas fa-user-md"
                  ><div
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
                        data-bs-target="#staticBackdropSup"
                      >
                        <i class="fa fa-plus"></i>
                        AJOUTER SUPERVISEUR
                      </button>
                    </div>
                  </div>

                  <table class="table">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Libelle</th>

                        <th style="width: 9% !important; text-align: center">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody
                      v-for="data in paginatedData"
                      :key="data.utilisateur_id"
                    >
                      <tr style="background-color: #c4d7ed">
                        <td colspan="2">
                          <i class="fa fa-share"></i>
                          <span style="font-weight: bolder">Superviseur</span> :
                          <span style="font-size: 15px !important">{{
                            data.nom_utilisateur
                          }}</span>
                        </td>

                        <td class="button_block"></td>
                      </tr>
                      <tr
                        v-for="data1 in afficheZoneParUtilisateur(
                          data.utilisateur_id
                        )"
                        :key="data1.aire_sanitaire_id"
                      >
                        <td></td>

                        <td>
                          <i class="fa fa-hand-o-right"> </i>
                          <span style="font-weight: bolder"
                            >Aire de sanitaire</span
                          >
                          :
                          {{ data1.libelle_aire_sanitaire }}
                        </td>
                        <td class="button_block">
                          <button
                            type="button"
                            class="btn cur-p btn-success"
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdropModification1"
                            @click.prevent="AfficheModalModification(data1.id)"
                          >
                            <i
                              class="fa fa-pencil-square-o"
                              aria-hidden="true"
                            ></i>
                          </button>
                          <button
                            type="button"
                            class="btn cur-p btn-danger"
                            @click.prevent="supprimerZoneUtilisateur(data1.id)"
                          >
                            <i class="fa fa-trash"></i>
                          </button>
                        </td>
                      </tr>
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
                </TabContent>
                <TabContent
                  title="Affectation des zones au agents"
                  icon="fas fa-user-nurse"
                  ><div
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
                        data-bs-target="#staticBackdropasc"
                      >
                        <i class="fa fa-plus"></i>
                        AJOUTER ASC
                      </button>
                    </div>
                  </div>

                  <table class="table">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Libelle</th>

                        <th style="width: 9% !important; text-align: center">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody
                      v-for="data in afficherListeDesAgent"
                      :key="data.utilisateur_id"
                    >
                      <tr style="background-color: #c4d7ed">
                        <td colspan="2">
                          <i class="fa fa-share"></i>
                          <span style="font-weight: bolder">ASC</span> :
                          <span style="font-size: 15px !important">{{
                            data.nom_utilisateur
                          }}</span>
                        </td>

                        <td class="button_block"></td>
                      </tr>
                      <tr
                        v-for="data1 in afficheZoneParUtilisateur(
                          data.utilisateur_id
                        )"
                        :key="data1.id"
                      >
                        <td></td>

                        <td>
                          <i class="fa fa-hand-o-right"> </i>
                          <span style="font-weight: bolder"
                            >Zone Intervention</span
                          >
                          :
                          {{ data1.libelle_zone_intervention }}
                        </td>
                        <td class="button_block">
                          <button
                            type="button"
                            class="btn cur-p btn-success"
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdropModification"
                            @click.prevent="AfficheModalModification(data1.id)"
                          >
                            <i
                              class="fa fa-pencil-square-o"
                              aria-hidden="true"
                            ></i>
                          </button>
                          <button
                            type="button"
                            class="btn cur-p btn-danger"
                            @click.prevent="supprimerZoneUtilisateur(data1.id)"
                          >
                            <i class="fa fa-trash"></i>
                          </button>
                        </td>
                      </tr>
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
                </TabContent>
              </FormWizard>
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
                Afféctation Zone
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
                <TabContent
                  title="Afféctation du District au Agent"
                  icon="fa fa-user-tie"
                  ><div class="mb-3">
                    <label for="inputWithIcon" class="form-label"
                      >Agent du district</label
                    >
                    <select
                      class="form-select form-select-lg mb-3"
                      aria-label=".form-select-lg example"
                      v-model="utilisateur_id"
                    >
                      <option
                        v-for="data in afficheListeAgentDistrict"
                        :key="data.id"
                        :value="data.id"
                      >
                        {{ data.nom_responsable }}
                      </option>
                    </select>
                  </div>

                  <div class="mb-3">
                    <label for="inputWithIcon" class="form-label"
                      >District</label
                    >
                    <treeselect
                      v-model="StateModules"
                      :multiple="true"
                      :options="getterAffectationDistrict"
                    />
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
                      @click.prevent="enregistrerDistrictParAgent()"
                    >
                      Enregistrer
                    </button>
                  </div>
                </TabContent>
              </FormWizard>
            </div>
          </div>
        </div>
      </div>

      <!-- modal d ajout -->
      <div
        class="modal fade"
        id="staticBackdropasc"
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
                Afféctation Zone des Agents
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
                <TabContent
                  title="Affectation des zones au agents"
                  icon="fa fa-users"
                  ><div class="mb-3">
                    <label for="inputWithIcon" class="form-label"
                      >Nom Superviseur
                    </label>
                    <select
                      class="form-select form-select-lg mb-3"
                      aria-label=".form-select-lg example"
                      v-model="responsable_id"
                    >
                      <option
                        v-for="data in afficherListeDesSuperviseur"
                        :key="data.id"
                        :value="data.utilisateur_id"
                      >
                        {{ data.nom_utilisateur }}
                      </option>
                    </select>
                  </div>
                  <div class="md-3">
                    <label for="inputWithIcon" class="form-label"
                      >Aire Sanitaire
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
                        :list="afficheLibelleAireSanitaire"
                        v-model="aire_sanitaire_id"
                        option-value="id"
                        option-text="groupe"
                        placeholder="séléctionner"
                      >
                      </model-list-select>
                    </div>
                  </div>

                  <div class="mb-3">
                    <label for="inputWithIcon" class="form-label"
                      >Zone d'intervention</label
                    >
                    <treeselect
                      v-model="StateModules"
                      :multiple="true"
                      :options="getterZoneInterventionSup"
                    />
                  </div>

                  <div class="md-3">
                    <label for="inputWithIcon" class="form-label"
                      >Agent de santé communautaire
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
                        :list="afficheAgentParSuperviseurs"
                        v-model="utilisateur_id"
                        option-value="id"
                        option-text="groupe"
                        placeholder="séléctionner"
                      >
                      </model-list-select>
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
                      @click.prevent="enregistrerZoneParAgent()"
                    >
                      Enregistrer
                    </button>
                  </div>
                </TabContent>
              </FormWizard>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade"
        id="staticBackdropSup"
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
                Afféctation Zone
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
                <TabContent
                  title="Afféctation du District au Agent"
                  icon="fa fa-user-tie"
                  ><div class="mb-3">
                    <label for="inputWithIcon" class="form-label"
                      >Agent du districts</label
                    >
                    <select
                      class="form-select form-select-lg mb-3"
                      aria-label=".form-select-lg example"
                      v-model="utilisateur_distict_id"
                    >
                      <option
                        v-for="data in afficheListeAgentDistrict"
                        :key="data.id"
                        :value="data.id"
                      >
                        {{ data.nom_responsable }}
                      </option>
                    </select>
                  </div>

                  <div class="md-3">
                    <label for="inputWithIcon" class="form-label"
                      >Nom Superviseur
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
                        :list="affichesSuperviseurParDistrict"
                        v-model="responsable_id"
                        option-value="id"
                        option-text="groupe"
                        placeholder="séléctionner"
                      >
                      </model-list-select>
                    </div>
                  </div>
                  <div class="mb-3">
                    <label for="inputWithIcon" class="form-label"
                      >District</label
                    >
                    <treeselect
                      v-model="StateModules"
                      :multiple="true"
                      :options="getterDistrictParAgent"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="inputWithIcon" class="form-label"
                      >Aire sanitaire</label
                    >
                    <treeselect
                      v-model="StateModules1"
                      :multiple="true"
                      :options="getteraireSanitaireParDistricts"
                    />
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
                Modifier Zone Intervention
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
                  >Utilisateur</label
                >
                <select
                  class="form-select form-select-lg mb-3"
                  aria-label=".form-select-lg example"
                  v-model="ObjetModifier.utilisateur_id"
                >
                  <option selected></option>
                  <option
                    v-for="data in getterUtilisateur"
                    :key="data.id"
                    :value="data.id"
                  >
                    {{ data.noms }} {{ data.prenoms }}
                  </option>
                </select>
              </div>

              <div class="mb-3">
                <label for="inputWithIcon" class="form-label"
                  >Zone d'intervention</label
                >
                <select
                  class="form-select form-select-lg mb-3"
                  aria-label=".form-select-lg example"
                  v-model="ObjetModifier.zone_intervention_id"
                >
                  <option selected></option>
                  <option
                    v-for="data in getterzoneInterventions"
                    :key="data.id"
                    :value="data.id"
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
                @click.prevent="modifierAffectationModule()"
              >
                Modifier
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade"
        id="staticBackdropModification1"
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
                Modifier Aire sanitaire
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
                  >Utilisateur</label
                >
                <select
                  class="form-select form-select-lg mb-3"
                  aria-label=".form-select-lg example"
                  v-model="ObjetModifier.utilisateur_id"
                >
                  <option selected></option>
                  <option
                    v-for="data in getterUtilisateur"
                    :key="data.id"
                    :value="data.id"
                  >
                    {{ data.noms }} {{ data.prenoms }}
                  </option>
                </select>
              </div>

              <div class="mb-3">
                <label for="inputWithIcon" class="form-label"
                  >Aire Sanitaire</label
                >
                <select
                  class="form-select form-select-lg mb-3"
                  aria-label=".form-select-lg example"
                  v-model="ObjetModifier.aire_sanitaire_id"
                >
                  <option selected></option>
                  <option
                    v-for="data in getteraireSanitaires"
                    :key="data.id"
                    :value="data.id"
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
                @click.prevent="modifierAffectationModule()"
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
import { FormWizard, TabContent } from "vue3-form-wizard";
// import the component
import { ModelListSelect } from "vue-search-select";
import Treeselect from "vue3-treeselect";

// import the styles

export default {
  components: { Treeselect, FormWizard, TabContent, ModelListSelect },
  data() {
    return {
      StateModules: [],
      StateModules1: [],
      utilisateur_id: null,
      utilisateur_distict_id: "",
      isLoading: false, // Définir isLoading ici
      responsable_id: 0,
      aire_sanitaire_id: 0,
      objet: {
        code: "",
        libelle: "",
      },
      selectItem: null,
      ObjetModifier: {
        utilisateur_id: "",
        zone_intervention_id: "",
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
    this.getResponsable();
    this.getListeUtilisateur();
    this.getzoneintervention();
    this.getAireSanitaire();
    this.getAffectationDistrict();
    this.getAffectationZone();
    this.getZoneParUtilisateur();
    this.getzoneUtilisateur();
  },

  computed: {
    // Accès aux getters Vuex pour obtenir la valeur du compteur et de l'utilisateur
    ...mapGetters([
      "getterModule",
      "getteraireSanitaires",
      "getterResponsables",
      "loading",
      "getterRole",
      "getterAffectationDistrict",
      "getterAffectationzone",
      "gettersZoneResponsable",
      "getterZoneUtilisateur",
      "getterzoneInterventions",
      "getterZoneParUtilisateur",
      "getterUtilisateur",
      "getterAireSanitaireSup",
      "getterZoneInterventionSup",
      "getterAgentParSuperviseurs",
      "getterDistrictParAgent",
      "getteraireSanitaireParDistricts",
    ]),

    affichesSuperviseurParDistrict() {
      let collet = [];
      this.AfficheSuperviseurParDistrict.filter((item) => {
        let data = {
          id: item.id,
          // code:item.code,
          groupe: item.nom_responsable,
        };
        collet.push(data);
      });
      return collet.sort((a, b) => (a.groupe > b.groupe ? 1 : -1));
    },
    AfficheSuperviseurParDistrict() {
      return this.getterUtilisateur.filter(
        (qtreel) => qtreel.responsable_id == this.utilisateur_distict_id
      );
    },
    afficheListeAgentDistrict() {
      return this.getterUtilisateur.filter((data) => data.code_role == 4);
    },
    afficherListeDesAgent() {
      return this.getterZoneUtilisateur.filter((data) => data.code_role == 2);
    },
    afficherListeDesDistrict() {
      return this.getterZoneUtilisateur.filter((data) => data.code_role == 4);
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
    afficheLibelleAireSanitaire() {
      let collet = [];
      this.getterAireSanitaireSup.filter((item) => {
        let data = {
          id: item.id,
          // code:item.code,
          groupe: item.label,
        };
        collet.push(data);
      });
      return collet.sort((a, b) => (a.groupe > b.groupe ? 1 : -1));
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
      return this.afficherListeDesSuperviseur.slice(
        startIndex,
        startIndex + this.itemsPerPage
      );
    },

    totalPages() {
      return Math.ceil(
        this.afficherListeDesSuperviseur.length / this.itemsPerPage
      );
    },
    listeNomResponsable() {
      return this.getterUtilisateur.filter(
        (qtreel) => qtreel.responsable_id != null
      );
    },
    listeUtilisateurParResponsable() {
      return this.getterUtilisateur.filter(
        (qtreel) => qtreel.responsable_id == this.responsable_id
      );
    },
    NomResponsable() {
      return (id) => {
        if (id != null && id != "") {
          const qtereel = this.getterUtilisateur.find(
            (qtreel) => qtreel.id == id
          );

          if (qtereel) {
            return qtereel.noms.concat(" ", qtereel.prenoms);
          }
          return "";
        }
      };
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
      "getAireSanitaire",
      "getResponsable",
      "getzoneintervention",
      "getAffectationZone",
      "getzoneUtilisateur",
      "getZoneParUtilisateur",
      "enregistrerZoneUtilisateur",
      "supprimerZoneUtilisateur",
      "modifierZoneUtilisateur",
      "enregistrerZoneAuAgent",
      "getListeAireSanitaireParSuperviseur",
      "getListeDistrictParAgent",
      "getListeZoneInterventionParSuperviseur",
      "getListeAgentParSuperviseur",
      "getAffectationDistrict",
      "enregistrerDesDistrictParAgent",
      "getAireSanitaireParDistrict",
    ]),
    changePage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    afficheZoneParUtilisateur($id) {
      return this.getterZoneParUtilisateur.filter(
        (qtreel) => qtreel.utilisateur_id == $id
      );
    },
    async enregistrerDistrictParAgent() {
      let ob = {
        utilisateur_id: this.utilisateur_id,

        DataModule: this.StateModules,
      };
      this.enregistrerDesDistrictParAgent(ob);
      StateModules = [];
    },
    async enregistrerZoneParAgent() {
      let ob = {
        utilisateur_id: this.utilisateur_id,
        aire_sanitaire_id: this.aire_sanitaire_id,
        superviseur_id: this.responsable_id,
        DataModule: this.StateModules,
      };
      this.enregistrerZoneAuAgent(ob);
      StateModules = [];
    },
    async enregistreModule() {
      let ob = {
        utilisateur_id: this.responsable_id,
        district_id: this.district_id,
        superviseur_id: this.utilisateur_distict_id,
        DataModule: this.StateModules1,
      };
      this.enregistrerZoneUtilisateur(ob);
      StateModules = [];
    },    

    async modifierAffectationModule() {
      let ob = {
        id: this.ObjetModifier.id,
        zone_intervention_id: this.ObjetModifier.zone_intervention_id,
        aire_sanitaire_id: this.ObjetModifier.aire_sanitaire_id,

        utilisateur_id: this.ObjetModifier.utilisateur_id,
      };
      this.modifierZoneUtilisateur(ob);
      // modal.hide();
    },

    async AfficheModalModification(id) {
      this.ObjetModifier = this.getterZoneParUtilisateur.find(
        (items) => items.id == id
      );
    },
  },

  watch: {
    utilisateur_distict_id: function (value) {
      let objet = {
        dist: value,
      };
      //this.getListeNatureEconomiqueParActiviteHs(objet);
      this.getListeDistrictParAgent(objet);
      this.getAireSanitaireParDistrict(objet);

      // }
    },

    StateModules: function (value) {
      let objet = {
        dist: value,
      };

      this.getAireSanitaireParDistrict(objet);

      // }
    },
    responsable_id: function (value) {
      let objet = {
        respo: value,
      };
      //this.getListeNatureEconomiqueParActiviteHs(objet);
      this.getListeAireSanitaireParSuperviseur(objet);
      this.getListeAgentParSuperviseur(objet);

      // }
    },
    aire_sanitaire_id: function (value) {
      let objet = {
        aire: value,
      };
      //this.getListeNatureEconomiqueParActiviteHs(objet);
      this.getListeZoneInterventionParSuperviseur(objet);

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
th {
  font-weight: 500 !important;
  font-size: 16px;
  background-color: #007b9a;
  color: aliceblue;
}
</style>
