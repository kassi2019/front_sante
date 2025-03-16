// src/store/index.js
//import { createStore } from 'vuex';
import apiGuest from '../../request/AppRequest';
import Swal from 'sweetalert2';  // Assurez-vous d'importer SweetAlert2
import authHeader from '../../services/auth-header';
import router from '../../routes';

const isLoading = false; // Variable pour contrôler l'état de chargement// Importer le spinner
const role ={
  state: {
 
    modules: [] ,
   
    loading: false,// ajout de l'état de chargement
  loading: false, // Statut de chargement
  error: null     // Erreur de l'enregistrement
  },
  mutations: {

     SET_MODULE(state, modules){
       state.modules = modules;
    },
//  SET_LOADING(state, isLoading) {
//         state.loading = isLoading;
//     },

//  SET_ERROR(state, error) {
//     state.error = error;
//     },
 SUPPRIMER_MODULE(state, produitId) {
    state.modules = state.modules.filter(produit => produit.id !== produitId);
    },
 
 AJOUTER_MODULE  (state, elementAjouter){
    state.modules.unshift(elementAjouter)
    },
 MODIFIER_MODULE (state, elementModif){
    state.modules = state.modules.map(response => {

        if (response.id == elementModif.id) {
            response = { ...elementModif }
        }
        return response
    })
}
  },
  
  actions: {
  

    async getModules({ commit }) {
    // Activer le loader
    // commit('SET_LOADING', true);

    try {
        const resultat = await apiGuest.get('/listeModule', { headers: authHeader() });
        
        // Mettre à jour les données dans le store
        commit('SET_MODULE', resultat.data);
    } catch (error) {
        //console.log(error);
    } finally {
        // Désactiver le loader après l'appel API
        // commit('SET_LOADING', false);
    }
    },

     async enregistrerModule({ commit,dispatch }, objet) {
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
      const response = await apiGuest.post('/ajouterModule', objet, { headers: authHeader() });
         commit('AJOUTER_MODULE', response.data); // Sauvegarder le produit dans le store
        dispatch('getModules');
          Swal.fire({
                 position: "top-end",
                 icon: "success",
                 title: "Enregistrement réussie",
                 showConfirmButton: false,
                 timer: 1500
               });
       //}.catch();
  },

     
async supprimerModule({ commit,dispatch }, id) {
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
  apiGuest.delete('/supprimerModule/' + id, { headers: authHeader() })
     commit('SUPPRIMER_MODULE', id)
     dispatch('getModules');
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

    
    async modifierModule({ commit,dispatch }, nouveau) {
  apiGuest.put("/modifierModule/" + nouveau.id, nouveau, { headers: authHeader() })
    .then(response => {
      commit("MODIFIER_MODULE", response.data);
      dispatch('getModules');
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
  
   
    getterModule(state) {
      return state.modules.sort((a, b) => (a.code < b.code) ? -1 : 1)
    },

  //   isLoading: state => state.isLoading, // Accès à l'état du loader

  // loading(state) {
  //   return state.loading;
  // },
  error(state) {
    return state.error;
  }
  }
};
export default role;