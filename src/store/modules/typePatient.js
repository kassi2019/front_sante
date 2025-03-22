// src/store/index.js
//import { createStore } from 'vuex';
import apiGuest from '../../request/AppRequest';
import Swal from 'sweetalert2';  // Assurez-vous d'importer SweetAlert2
import authHeader from '../../services/auth-header';
import router from '../../routes';

const isLoading = false; // Variable pour contrôler l'état de chargement// Importer le spinner
const typePatient ={
  state: {
 
    typePatients: [] ,

  error: null     // Erreur de l'enregistrement
  },
  mutations: {

     SET_TYPE_PATIENT(state, modules){
       state.typePatients = modules;
    },


 SET_ERROR(state, error) {
    state.error = error;
    },
 SUPPRIMER_TYPE_PATIENT(state, produitId) {
    state.typePatients = state.typePatients.filter(produit => produit.id !== produitId);
    },
 
 AJOUTER_TYPE_PATIENT  (state, elementAjouter){
    state.typePatients.unshift(elementAjouter)
    },
 MODIFIER_TYPE_PATIENT (state, elementModif){
    state.typePatients = state.typePatients.map(response => {

        if (response.id == elementModif.id) {
            response = { ...elementModif }
        }
        return response
    })
}
  },
  
  actions: {
  

    async getTypePatient({ commit }) {
    // Activer le loader
  

    try {
        const resultat = await apiGuest.get('/typepatient', { headers: authHeader() });
        
        // Mettre à jour les données dans le store
        commit('SET_TYPE_PATIENT', resultat.data);
    } catch (error) {
        //console.log(error);
    } finally {
        // Désactiver le loader après l'appel API
        
    }
    },

     async enregistrerTypePatient({ commit,dispatch }, objet) {
   
 

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
      const response = await apiGuest.post('/typepatient', objet, { headers: authHeader() });
         commit('AJOUTER_TYPE_PATIENT', response.data); // Sauvegarder le produit dans le store
        dispatch('getTypePatient');
          Swal.fire({
                 position: "top-end",
                 icon: "success",
                 title: "Enregistrement réussie",
                 showConfirmButton: false,
                 timer: 1500
               });
       //}.catch();
  },

     
async supprimerTypePatient({ commit,dispatch }, id) {
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
  apiGuest.delete('/typepatient/' + id, { headers: authHeader() })
     commit('SUPPRIMER_TYPE_PATIENT', id)
     dispatch('getTypePatient');
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

    
    async modifierTypePatient({ commit,dispatch }, nouveau) {
  apiGuest.put("/typepatient/" + nouveau.id, nouveau, { headers: authHeader() })
    .then(response => {
      commit("MODIFIER_TYPE_PATIENT", response.data);
      dispatch('getTypePatient');
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
  
   
    getterTypePatient(state) {
      return state.typePatients.sort((a, b) => (a.code < b.code) ? -1 : 1)
    },

    isLoading: state => state.isLoading, // Accès à l'état du loader

  loading(state) {
    return state.loading;
  },
  error(state) {
    return state.error;
  }
  }
};
export default typePatient;