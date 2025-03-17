// src/store/index.js
//import { createStore } from 'vuex';
import apiGuest from '../../request/AppRequest';
import Swal from 'sweetalert2';  // Assurez-vous d'importer SweetAlert2
import authHeader from '../../services/auth-header';
import router from '../../routes';

// const isLoading = false; // Variable pour contrôler l'état de chargement// Importer le spinner
const Menage ={
  state: {
    menages: [],
    stateCarteChefFamille:[],
  // error: null     // Erreur de l'enregistrement
  },
  mutations: {

     SET_MENAGE(state, menages){
       state.menages = menages;
    },
    SET_CARTE_CHEF_FAMILLE(state, StateModule) {
    state.stateCarteChefFamille = StateModule;
    },
//  SET_ERROR(state, error) {
//     state.error = error;
//     },
 SUPPRIMER_MENAGE(state, produitId) {
    state.menages = state.menages.filter(produit => produit.id !== produitId);
    },
 
 AJOUTER_MENAGE  (state, elementAjouter){
    state.menages.unshift(elementAjouter)
    },
 MODIFIER_MENAGE (state, elementModif){
    state.menages = state.menages.map(response => {

        if (response.id == elementModif.id) {
            response = { ...elementModif }
        }
        return response
    })
}
  },
  
  actions: {
  

    async getmenages({ commit }) {
    // Activer le loader
    // commit('SET_LOADING', true);

    try {
        const resultat = await apiGuest.get('/menage', { headers: authHeader() });
        
        // Mettre à jour les données dans le store
        commit('SET_MENAGE', resultat.data);
    } catch (error) {
        //console.log(error);
    } finally {
        // Désactiver le loader après l'appel API
        // commit('SET_LOADING', false);
    }
    },

     async enregistrermenages({ commit,dispatch }, objet) {
    // commit('SET_LOADING', true);
    // commit('SET_ERROR', null); // Reset erreur

      // try {
        if (!objet.nom || !objet.prenoms) {
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
      const response = await apiGuest.post('/menage', objet, { headers: authHeader() });
         commit('AJOUTER_MENAGE', response.data); // Sauvegarder le produit dans le store
        dispatch('getmenages');
          Swal.fire({
                 position: "top-end",
                 icon: "success",
                 title: "Enregistrement réussie",
                 showConfirmButton: false,
                 timer: 1500
               });
       //}.catch();
  },

     
async supprimermenages({ commit,dispatch }, id) {
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
  apiGuest.delete('/menage/' + id, { headers: authHeader() })
     commit('SUPPRIMER_MENAGE', id)
     dispatch('getmenages');
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

    
    async modifiermenages({ commit,dispatch }, nouveau) {
  apiGuest.put("/menage/" + nouveau.id, nouveau, { headers: authHeader() })
    .then(response => {
      commit("MODIFIER_MENAGE", response.data);
      dispatch('getmenages');
  Swal.fire({
                 position: "top-end",
                 icon: "success",
                 title: "Modification réussie",
                 showConfirmButton: false,
                 timer: 1500
               });
    });
    },
    

    async getCarteChefFamille({ commit }) {
         
            try {
              // Effacer les sous-préfectures existantes avant de charger de nouvelles
              commit('SET_CARTE_CHEF_FAMILLE', []);
              
              // Appel à l'API ou à une autre source de données
                     const responseSp = await apiGuest.get('/menage', { headers: authHeader() });
        
              const sousPrefectures = responseSp.data.map(sp => ({
                id: sp.id,
                name: `${sp.nom_chef}`,
                lat: `${sp.latitude}`,
                lng: `${sp.longitude}`,
              }));
        
              commit('SET_CARTE_CHEF_FAMILLE', sousPrefectures);
              return sousPrefectures;
            } catch (error) {
              console.error("Erreur lors de la récupération des Sous-préfectures:", error);
              commit('SET_CARTE_CHEF_FAMILLE', []);
            }
        },
  },
  getters: {
  
   
    gettermenages(state) {
      return state.menages.sort((a, b) => (a.nom < b.nom) ? -1 : 1)
    },
    getterCarteChefFamille(state) {
      return state.stateCarteChefFamille.sort((a, b) => (a.nom_chef < b.nom_chef) ? -1 : 1)
    },

    // isLoading: state => state.isLoading, // Accès à l'état du loader

  // loading(state) {
  //   return state.loading;
  // },
  // error(state) {
  //   return state.error;
  // }
  }
};
export default Menage;