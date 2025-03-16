// src/store/index.js
//import { createStore } from 'vuex';
import apiGuest from '../../request/AppRequest';
import Swal from 'sweetalert2';  // Assurez-vous d'importer SweetAlert2
import authHeader from '../../services/auth-header';
import router from '../../routes';

const isLoading = false; // Variable pour contrôler l'état de chargement// Importer le spinner
const Patient ={
  state: {
    patients: [],
  error: null     // Erreur de l'enregistrement
  },
  mutations: {

     SET_PATIENT(state, menages){
       state.patients = menages;
    },
 SET_ERROR(state, error) {
    state.error = error;
    },
 SUPPRIMER_PATIENT(state, produitId) {
    state.patients = state.patients.filter(produit => produit.id !== produitId);
    },
 
 AJOUTER_PATIENT  (state, elementAjouter){
    state.patients.unshift(elementAjouter)
    },
 MODIFIER_PATIENT (state, elementModif){
    state.patients = state.patients.map(response => {

        if (response.id == elementModif.id) {
            response = { ...elementModif }
        }
        return response
    })
}
  },
  
  actions: {
  

    async getpatients({ commit }) {
    // Activer le loader
    // commit('SET_LOADING', true);

    try {
        const resultat = await apiGuest.get('/patient', { headers: authHeader() });
        
        // Mettre à jour les données dans le store
        commit('SET_PATIENT', resultat.data);
    } catch (error) {
        //console.log(error);
    } finally {
        // Désactiver le loader après l'appel API
        // commit('SET_LOADING', false);
    }
    },

     async enregistrerpatient({ commit,dispatch }, objet) {
    // commit('SET_LOADING', true);
    // commit('SET_ERROR', null); // Reset erreur

      // try {
        if (!objet.nom || !objet.prenoms || !objet.chef_famille_id) {
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
      const response = await apiGuest.post('/patient', objet, { headers: authHeader() });
         commit('AJOUTER_PATIENT', response.data); // Sauvegarder le produit dans le store
        dispatch('getpatients');
          Swal.fire({
                 position: "top-end",
                 icon: "success",
                 title: "Enregistrement réussie",
                 showConfirmButton: false,
                 timer: 1500
               });
       //}.catch();
  },

     
async supprimerpatient({ commit,dispatch }, id) {
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
  apiGuest.delete('/patient/' + id, { headers: authHeader() })
     commit('SUPPRIMER_PATIENT', id)
     dispatch('getpatients');
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

    
    async modifierpatient({ commit,dispatch }, nouveau) {
  apiGuest.put("/patient/" + nouveau.id, nouveau, { headers: authHeader() })
    .then(response => {
      commit("MODIFIER_PATIENT", response.data);
      dispatch('getpatients');
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
  
   
    getterpatient(state) {
      return state.patients.sort((a, b) => (a.nom < b.nom) ? -1 : 1)
    },

  error(state) {
    return state.error;
  }
  }
};
export default Patient;