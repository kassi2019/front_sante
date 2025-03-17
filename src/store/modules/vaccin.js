// src/store/index.js
//import { createStore } from 'vuex';
import apiGuest from '../../request/AppRequest';
import Swal from 'sweetalert2';  // Assurez-vous d'importer SweetAlert2
import authHeader from '../../services/auth-header';
import router from '../../routes';

const isLoading = false; // Variable pour contrôler l'état de chargement// Importer le spinner
const role ={
  state: {
 
    vaccins: [] ,
   Statevacinstreselect: [],
  error: null     // Erreur de l'enregistrement
  },
  mutations: {
SET_VACCIN_TREE_SELECT(state, StateModule) {
    state.Statevacinstreselect = StateModule;
    },
     SET_VACCIN(state, modules){
       state.vaccins = modules;
    },

 SUPPRIMER_VACCIN(state, produitId) {
    state.vaccins = state.vaccins.filter(produit => produit.id !== produitId);
    },
 
 AJOUTER_VACCIN  (state, elementAjouter){
    state.vaccins.unshift(elementAjouter)
    },
 MODIFIER_VACCIN (state, elementModif){
    state.vaccins = state.vaccins.map(response => {

        if (response.id == elementModif.id) {
            response = { ...elementModif }
        }
        return response
    })
}
  },
  
  actions: {
  
async getVaccinTreeSelect({ commit }) {
     
        try {
          // Effacer les sous-préfectures existantes avant de charger de nouvelles
          commit('SET_VACCIN_TREE_SELECT', []);
          
          // Appel à l'API ou à une autre source de données
                 const responseSp = await apiGuest.get('/vaccin', { headers: authHeader() });
    
          const sousPrefectures = responseSp.data.map(sp => ({
            id: sp.id,
            label: `${sp.libelle}`,
          }));
    
          commit('SET_VACCIN_TREE_SELECT', sousPrefectures);
          return sousPrefectures;
        } catch (error) {
          console.error("Erreur lors de la récupération des Sous-préfectures:", error);
          commit('SET_VACCIN_TREE_SELECT', []);
        }
    },
    async getvaccination({ commit }) {
    // Activer le loader
    // commit('SET_LOADING', true);

    try {
        const resultat = await apiGuest.get('/vaccin', { headers: authHeader() });
        
        // Mettre à jour les données dans le store
        commit('SET_VACCIN', resultat.data);
    } catch (error) {
        //console.log(error);
    } finally {
        // Désactiver le loader après l'appel API
        // commit('SET_LOADING', false);
    }
    },

     async enregistrervaccins({ commit,dispatch }, objet) {
    // commit('SET_LOADING', true);
    // commit('SET_ERROR', null); // Reset erreur

      // try {
        if (!objet.libelle) {
            commit('SET_CHAMP_VIDE_TRUE');
            // Affichage d'une alerte d'erreur en cas de champs vides
            Swal.fire({
              icon: 'error',
              title: 'Champs vides',
              text: 'Veuillez remplir tous les champs.',
              confirmButtonText: 'OK',
            });
            return;
          }
      const response = await apiGuest.post('/vaccin', objet, { headers: authHeader() });
         commit('AJOUTER_VACCIN', response.data); // Sauvegarder le produit dans le store
        dispatch('getvaccination');
          Swal.fire({
                 position: "top-end",
                 icon: "success",
                 title: "Enregistrement réussie",
                 showConfirmButton: false,
                 timer: 1500
               });
       //}.catch();
  },

     
async supprimervaccins({ commit,dispatch }, id) {
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
  apiGuest.delete('/vaccin/' + id, { headers: authHeader() })
     commit('SUPPRIMER_VACCIN', id)
     dispatch('getvaccination');
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

    
    async modifiervaccins({ commit,dispatch }, nouveau) {
  apiGuest.put("/vaccin/" + nouveau.id, nouveau, { headers: authHeader() })
    .then(response => {
      commit("MODIFIER_VACCIN", response.data);
      dispatch('getvaccination');
  Swal.fire({
                 position: "top-end",
                 icon: "success",
                 title: "Modification réussie",
                 showConfirmButton: false,
                 timer: 1500
               });
    });
}
  },
  getters: {
  
   
    getterVaccin(state) {
      return state.vaccins.sort((a, b) => (a.libelle < b.libelle) ? -1 : 1)
    },
getterVaccinTreeSelect(state) {
      return state.Statevacinstreselect.sort((a, b) => (a.libelle < b.libelle) ? -1 : 1)
    },
  error(state) {
    return state.error;
  }
  }
};
export default role;