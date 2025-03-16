// src/store/index.js
//import { createStore } from 'vuex';
import apiGuest from '../../request/AppRequest';
import Swal from 'sweetalert2';  // Assurez-vous d'importer SweetAlert2
import authHeader from '../../services/auth-header';


const isLoading = false; // Variable pour contrôler l'état de chargement// Importer le spinner
const role ={
  state: {
 
    medicaments: [] ,
   
  //   loading: false,// ajout de l'état de chargement
  // loading: false, // Statut de chargement
  error: null     // Erreur de l'enregistrement
  },
  mutations: {

     SET_MEDICAMENT(state, medicaments){
       state.medicaments = medicaments;
    },
 

//  SET_ERROR(state, error) {
//     state.error = error;
//     },
 SUPPRIMER_MEDICAMENT(state, produitId) {
    state.medicaments = state.medicaments.filter(produit => produit.id !== produitId);
    },
 
 AJOUTER_MEDICAMENT  (state, elementAjouter){
    state.medicaments.unshift(elementAjouter)
    },
 MODIFIER_MEDICAMENT (state, elementModif){
    state.medicaments = state.medicaments.map(response => {

        if (response.id == elementModif.id) {
            response = { ...elementModif }
        }
        return response
    })
}
  },
  
  actions: {
  

    async getmedicaments({ commit }) {
    // Activer le loader
    //commit('SET_LOADING', true);

    try {
        const resultat = await apiGuest.get('/listemedicament', { headers: authHeader() });
        
        // Mettre à jour les données dans le store
        commit('SET_MEDICAMENT', resultat.data);
    } catch (error) {
        //console.log(error);
    } finally {
        // Désactiver le loader après l'appel API
        // commit('SET_LOADING', false);
    }
    },

     async enregistrermedicaments({ commit,dispatch }, objet) {
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
      const response = await apiGuest.post('/ajoutermedicament', objet, { headers: authHeader() });
         commit('AJOUTER_MEDICAMENT', response.data); // Sauvegarder le produit dans le store
        dispatch('getmedicaments');
          Swal.fire({
                 position: "top-end",
                 icon: "success",
                 title: "Enregistrement réussie",
                 showConfirmButton: false,
                 timer: 1500
               });
       //}.catch();
  },

     
async supprimermedicaments({ commit,dispatch }, id) {
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
  apiGuest.delete('/supprimermedicament/' + id, { headers: authHeader() })
     commit('SUPPRIMER_MEDICAMENT', id)
     dispatch('getmedicaments');
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

    
    async modifiermedicaments({ commit,dispatch }, nouveau) {
  apiGuest.put("/modifiermedicament/" + nouveau.id, nouveau, { headers: authHeader() })
    .then(response => {
      commit("MODIFIER_MEDICAMENT", response.data);
      dispatch('getmedicaments');
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
  
   
    gettermedicaments(state) {
      return state.medicaments.sort((a, b) => (a.libelle < b.libelle) ? -1 : 1)
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
export default role;