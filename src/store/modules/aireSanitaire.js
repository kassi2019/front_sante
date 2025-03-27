// src/store/index.js
//import { createStore } from 'vuex';
import apiGuest from '../../request/AppRequest';
import Swal from 'sweetalert2';  // Assurez-vous d'importer SweetAlert2
import authHeader from '../../services/auth-header';

const role ={
  state: {
 aireSanitaireParDistricts:[],
        aireSanitaires: [],
      groupeDistricts: [],
    StateAffectationZone: [],

  error: null
  },
  mutations: {
          SET_AIRE_SANITAIRE_PAR_DISTRICT(state, StateModule) {
    state.aireSanitaireParDistricts = StateModule;
    },
      SET_GROUPE_DISTRICT(state, StateModule) {
    state.groupeDistricts = StateModule;
    },

SET_AFFECTATION_ZONE(state, StateModule) {
    state.StateAffectationZone = StateModule;
    },
     SET_AIRE_SANITAIRE(state, District){
       state.aireSanitaires = District;
    },

 SET_ERROR(state, error) {
    state.error = error;
    },
 SUPPRIMER_AIRE_SANITAIRE(state, produitId) {
    state.aireSanitaires = state.aireSanitaires.filter(produit => produit.id !== produitId);
    },
 
 AJOUTER_AIRE_SANITAIRE  (state, elementAjouter){
    state.aireSanitaires.unshift(elementAjouter)
    },
 MODIFIER_AIRE_SANITAIRE (state, elementModif){
    state.aireSanitaires = state.aireSanitaires.map(response => {

        if (response.id == elementModif.id) {
            response = { ...elementModif }
        }
        return response
    })
}
  },
  
  actions: {

    async getAireSanitaireParDistrict({ commit }, objet) {
     try {

         commit('SET_AIRE_SANITAIRE_PAR_DISTRICT', []);
 
         const responseSp = await apiGuest.get('/AireSanitaireParDistrict/'+ objet.dist, { 
             headers: authHeader() 
         });
 
         const sousPrefectures = responseSp.data.map(sp => ({
             id: sp.id,
             label: `${sp.libelle}`,
         }));
 
         commit('SET_AIRE_SANITAIRE_PAR_DISTRICT', sousPrefectures);
         return sousPrefectures;
     } catch (error) {
         console.error("Erreur lors de la récupération des Sous-préfectures:", error);
         commit('SET_AIRE_SANITAIRE_PAR_DISTRICT', []);
     }
    },



   async getAffectationZone({ commit }) {
       
          try {
            // Effacer les sous-préfectures existantes avant de charger de nouvelles
            commit('SET_AFFECTATION_ZONE', []);
            
            // Appel à l'API ou à une autre source de données
                   const responseSp = await apiGuest.get('/airesanitaire', { headers: authHeader() });
      
            const sousPrefectures = responseSp.data.map(sp => ({
              id: sp.id,
              label: `${sp.libelle}`,
            }));
      
            commit('SET_AFFECTATION_ZONE', sousPrefectures);
            return sousPrefectures;
          } catch (error) {
            console.error("Erreur lors de la récupération des Sous-préfectures:", error);
            commit('SET_AFFECTATION_ZONE', []);
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
      
    async getAireSanitaire({ commit }) {
    // Activer le loader
    // commit('SET_LOADING', true);

    try {
        const resultat = await apiGuest.get('/airesanitaire', { headers: authHeader() });
        
        // Mettre à jour les données dans le store
        commit('SET_AIRE_SANITAIRE', resultat.data);
    } catch (error) {
        //console.log(error);
    } finally {
        // Désactiver le loader après l'appel API
        // commit('SET_LOADING', false);
    }
    },

     async enregistrerAireSanitaire({ commit,dispatch }, objet) {


      // try {
        if (!objet.libelle) {
            commit('SET_CHAMP_VIDE_TRUE');
            // Affichage d'une alerte d'erreur en cas de champs vides
            Swal.fire({
              icon: 'error',
              title: 'Champs vides',
              text: 'Veuillez remplir le champs.',
              confirmButtonText: 'OK',
            });
            return;
          }
      const response = await apiGuest.post('/airesanitaire', objet, { headers: authHeader() });
         commit('AJOUTER_AIRE_SANITAIRE', response.data); // Sauvegarder le produit dans le store
        dispatch('getAireSanitaire');
          Swal.fire({
                 position: "top-end",
                 icon: "success",
                 title: "Enregistrement réussie",
                 showConfirmButton: false,
                 timer: 1500
               });
       //}.catch();
  },

     
async supprimerAireSanitaire({ commit,dispatch }, id) {
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
  apiGuest.delete('/airesanitaire/' + id, { headers: authHeader() })
     commit('SUPPRIMER_AIRE_SANITAIRE', id)
     dispatch('getAireSanitaire');
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

    
    async modifierAireSanitaire({ commit,dispatch }, nouveau) {
  apiGuest.put("/airesanitaire/" + nouveau.id, nouveau, { headers: authHeader() })
    .then(response => {
      commit("MODIFIER_AIRE_SANITAIRE", response.data);
      dispatch('getAireSanitaire');
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
  
     gettergroupeDistricts(state) {
      return state.groupeDistricts.sort((a, b) => (a.libelle < b.libelle) ? -1 : 1)
    },
    getteraireSanitaires(state) {
      return state.aireSanitaires.sort((a, b) => (a.libelle < b.libelle) ? -1 : 1)
    },
getterAffectationzone(state) {
      return state.StateAffectationZone.sort((a, b) => (a.libelle < b.libelle) ? -1 : 1)
    },
    getteraireSanitaireParDistricts(state) {
      return state.aireSanitaireParDistricts.sort((a, b) => (a.libelle < b.libelle) ? -1 : 1)
    },

    // gettersCarteZone(state) {
    //   return state.stateCarteZone
    // },
    
  error(state) {
    return state.error;
  }
  }
};
export default role;