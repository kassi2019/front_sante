// src/store/index.js
//import { createStore } from 'vuex';
import apiGuest from '../../request/AppRequest';
import Swal from 'sweetalert2';  // Assurez-vous d'importer SweetAlert2
import authHeader from '../../services/auth-header';


const isLoading = false; // Variable pour contrôler l'état de chargement// Importer le spinner
const role ={
  state: {
 
        zoneInterventions: [],
        statedistrictZone: [],
      stateaireSanitaireZone:[],
      groupeDistricts: [],
    
    stateZoneResponsable: [],
      stateCarteZone:[],
  //   loading: false,// ajout de l'état de chargement
  // loading: false, // Statut de chargement
  error: null     // Erreur de l'enregistrement
  },
    mutations: {
 SET_DISTRICT_ZONE_INTERVENTION(state, District){
       state.statedistrictZone = District;
        },
         SET_AIRE_SANITAIRE_ZONE_INTERVENTION(state, District){
       state.stateaireSanitaireZone = District;
    },
     SET_ZONE_INTERVENTION(state, District){
       state.zoneInterventions = District;
    },

 SET_ERROR(state, error) {
    state.error = error;
    },
 SUPPRIMER_ZONE_INTERVENTION(state, produitId) {
    state.zoneInterventions = state.zoneInterventions.filter(produit => produit.id !== produitId);
    },
 
 AJOUTER_ZONE_INTERVENTION  (state, elementAjouter){
    state.zoneInterventions.unshift(elementAjouter)
    },
 MODIFIER_ZONE_INTERVENTION (state, elementModif){
    state.zoneInterventions = state.zoneInterventions.map(response => {

        if (response.id == elementModif.id) {
            response = { ...elementModif }
        }
        return response
    })
        },

  },
  
    actions: {
      
          
  async getdistrictZone({ commit }) {
    // Activer le loader
    // commit('SET_LOADING', true);

    try {
        const resultat = await apiGuest.get('/listeDistrict_zi', { headers: authHeader() });
        
        // Mettre à jour les données dans le store
        commit('SET_DISTRICT_ZONE_INTERVENTION', resultat.data);
    } catch (error) {
        //console.log(error);
    } finally {
        // Désactiver le loader après l'appel API
        // commit('SET_LOADING', false);
    }
      },
      async getaireSanitaireZone({ commit }) {
    // Activer le loader
    // commit('SET_LOADING', true);

    try {
        const resultat = await apiGuest.get('/listeaireSanitaire_zi', { headers: authHeader() });
        
        // Mettre à jour les données dans le store
        commit('SET_AIRE_SANITAIRE_ZONE_INTERVENTION', resultat.data);
    } catch (error) {
        //console.log(error);
    } finally {
        // Désactiver le loader après l'appel API
        // commit('SET_LOADING', false);
    }
      },
async getdistrictgroupe({ commit }) {
    // Activer le loader
    // commit('SET_LOADING', true);

    try {
        const resultat = await apiGuest.get('/districtgroupe', { headers: authHeader() });
        
        // Mettre à jour les données dans le store
        commit('SET_GROUPE_DISTRICT', resultat.data);
    } catch (error) {
        //console.log(error);
    } finally {
        // Désactiver le loader après l'appel API
        // commit('SET_LOADING', false);
    }
      },
      
    async getzoneintervention({ commit }) {
    // Activer le loader
    // commit('SET_LOADING', true);

    try {
        const resultat = await apiGuest.get('/zoneintervention', { headers: authHeader() });
        
        // Mettre à jour les données dans le store
        commit('SET_ZONE_INTERVENTION', resultat.data);
    } catch (error) {
        //console.log(error);
    } finally {
        // Désactiver le loader après l'appel API
        // commit('SET_LOADING', false);
    }
    },

     async enregistrerzoneintervention({ commit,dispatch }, objet) {

      const response = await apiGuest.post('/zoneintervention', objet, { headers: authHeader() });
         commit('AJOUTER_ZONE_INTERVENTION', response.data); // Sauvegarder le produit dans le store
        dispatch('getzoneintervention');
          Swal.fire({
                 position: "top-end",
                 icon: "success",
                 title: "Enregistrement réussie",
                 showConfirmButton: false,
                 timer: 1500
               });
       //}.catch();
  },

     
async supprimerzoneintervention({ commit,dispatch }, id) {
  // Show the confirmation dialog with SweetAlert2
  Swal.fire({
    title: "Êtes-vous sûr de",
    text: " vouloir Supprimer cette ligne ?",
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'OUI'
  }).then((result) => {
    if (result.isConfirmed) {
  apiGuest.delete('/zoneintervention/' + id, { headers: authHeader() })
     commit('SUPPRIMER_ZONE_INTERVENTION', id)
     dispatch('getzoneintervention');
       Swal.fire({
                 position: "top-end",
                 icon: "success",
                 title: "Suppression réussie",
                 showConfirmButton: false,
                 timer: 1500
               });
    }
  });
    },

    
    async modifierzoneintervention({ commit,dispatch }, nouveau) {
  apiGuest.put("/zoneintervention/" + nouveau.id, nouveau, { headers: authHeader() })
    .then(response => {
      commit("MODIFIER_ZONE_INTERVENTION", response.data);
      dispatch('getzoneintervention');
  Swal.fire({
                 position: "top-end",
                 icon: "success",
                 title: "Modification réussie",
                 showConfirmButton: false,
                 timer: 1500
               });
    });
    },

  },
  getters: {

       gettersdistrictZone(state) {
      return state.statedistrictZone.sort((a, b) => (a.libelle < b.libelle) ? -1 : 1)
      },
        gettersaireSanitaireZone(state) {
      return state.stateaireSanitaireZone.sort((a, b) => (a.libelle < b.libelle) ? -1 : 1)
    },
     gettergroupeDistricts(state) {
      return state.groupeDistricts.sort((a, b) => (a.libelle < b.libelle) ? -1 : 1)
    },
    getterzoneInterventions(state) {
      return state.zoneInterventions.sort((a, b) => (a.libelle < b.libelle) ? -1 : 1)
    },

gettersZoneResponsable(state) {
      return state.stateZoneResponsable
    },
    gettersCarteZone(state) {
      return state.stateCarteZone
    },
    
  error(state) {
    return state.error;
  }
  }
};
export default role;