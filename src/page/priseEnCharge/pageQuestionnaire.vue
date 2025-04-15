<template>
  <!-- dashboard inner -->

  <div>
    <br />
    <div class="row column_title">
      <div class="col-md-12">
        <div class="page_title">
          <h2 style="font-weight: bolder;font-family:Georgia, 'Times New Roman', Times, serif;">Diagnostic</h2>
        </div>
      </div>
    </div>
    <div >
      <div class="col-md-12">
        <div class="white_shd full margin_bottom_30">
         
          <div class="table_section padding_infor_info">
           
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
                      placeholder="Entrez code"
                      v-model="objet.code"
                    />
                  </div>
                </div>
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
                      placeholder="Entrez code"
                      v-model="objet.code"
                    />
                  </div>
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
                      placeholder="Entrez code"
                      v-model="objet.code"
                    />
                  </div>
                </div>
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
                      placeholder="Entrez code"
                      v-model="objet.code"
                    />
                  </div>
                </div>
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
        unite_comptage: "",
        numero_lot: "",
        date_peremption: "",
      },
      selectItem: null,
      ObjetModifier: {
        type_equipement_id: "",
        libelle: "",
        quantite: "",
        code: "",
        unite_comptage: "",
        numero_lot: "",
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
    this.fetchToday()
   
  },

  computed: {
    // Accès aux getters Vuex pour obtenir la valeur du compteur et de l'utilisateur
    ...mapGetters([
      "getterEquipement",
      "loading",
      "gettertypeequipements",
      "getterGpeTypeEquipement","getterGroupeEquipement","getterRole",'getToday'
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
    AfficheuniteComptageEquipement() {
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
      "modifierRenouvellement","getGroupeEquipement","getRoles",'fetchToday'
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
        code: this.objet.code,
        quantite: this.objet.quantite,
        unite_comptage: this.objet.unite_comptage,
        numero_lot: this.objet.numero_lot,
        date_peremption: this.objet.date_peremption,
      };
      this.enregistrerEquipement(ob);

      this.objet.libelle = "";
      this.objet.quantite = "";
      this.objet.code = "";
      this.objet.unite_comptage = "";
      this.objet.date_peremption = "";
      this.objet.numero_lot = "";
    },

    async modifierEquipements() {
      let ob = {
        id: this.ObjetModifier.id,
        type_equipement_id: this.ObjetModifier.type_equipement_id,
        libelle: this.ObjetModifier.libelle,
        code: this.ObjetModifier.code,
        unite_comptage: this.ObjetModifier.unite_comptage,
        quantite: this.ObjetModifier.quantite,
        numero_lot: this.ObjetModifier.numero_lot,
        date_peremption: this.ObjetModifier.date_peremption,
      };
      this.modifierEquipement(ob);
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
        numero_lot: this.objetrenoule.numero_lot,
        date_peremption: this.objetrenoule.date_peremption,
      };
      this.enregistrerEquipement(ob);
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
