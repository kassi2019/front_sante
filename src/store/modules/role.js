// src/store/index.js
//import { createStore } from 'vuex';
import apiGuest from '../../request/AppRequest';
import Swal from 'sweetalert2';  // Assurez-vous d'importer SweetAlert2
import authHeader from '../../services/auth-header';
import router from '../../routes';

const isLoading = false; // Variable pour contrôler l'état de chargement// Importer le spinner
const role ={
  state: {
 
    roles: [] ,
   
  //   loading: false,// ajout de l'état de chargement
  // loading: false, // Statut de chargement
  error: null     // Erreur de l'enregistrement
  },
  mutations: {

     SET_ROLE(state, roles){
       state.roles = roles;
    },
//  SET_LOADING(state, isLoading) {
//         state.loading = isLoading;
//     },

 SET_ERROR(state, error) {
    state.error = error;
    },
 SUPPRIMER_ROLE(state, produitId) {
    state.roles = state.roles.filter(produit => produit.id !== produitId);
    },
 
 AJOUTER_ROLE  (state, elementAjouter){
    state.roles.unshift(elementAjouter)
    },
 MODIFIER_ROLE (state, elementModif){
    state.roles = state.roles.map(response => {

        if (response.id == elementModif.id) {
            response = { ...elementModif }
        }
        return response
    })
}
  },
  
  actions: {
  

    async getRoles({ commit }) {
    // Activer le loader
    // commit('SET_LOADING', true);

    try {
        const resultat = await apiGuest.get('/listeRoleUtilisateur', { headers: authHeader() });
        
        // Mettre à jour les données dans le store
        commit('SET_ROLE', resultat.data);
    } catch (error) {
        //console.log(error);
    } finally {
        // Désactiver le loader après l'appel API
        // commit('SET_LOADING', false);
    }
    },

     async enregistrerRole({ commit,dispatch }, objet) {
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
      const response = await apiGuest.post('/ajouterRoleUtilisateur', objet, { headers: authHeader() });
         commit('AJOUTER_ROLE', response.data); // Sauvegarder le produit dans le store
        dispatch('getRoles');
          Swal.fire({
                 position: "top-end",
                 icon: "success",
                 title: "Enregistrement réussie",
                 showConfirmButton: false,
                 timer: 1500
               });
       //}.catch();
  },

     
async supprimerRole({ commit,dispatch }, id) {
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
  apiGuest.delete('/supprimerRoleUtilisateur/' + id, { headers: authHeader() })
     commit('SUPPRIMER_ROLE', id)
     dispatch('getRoles');
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

    
    modifierRole({ commit,dispatch }, nouveau) {
  apiGuest.put("/modifierRoleUtilisateur/" + nouveau.id, nouveau, { headers: authHeader() })
    .then(response => {
      commit("MODIFIER_ROLE", response.data);
      dispatch('getRoles');
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
  
   
    getterRole(state) {
      return state.roles.sort((a, b) => (a.libelle < b.libelle) ? -1 : 1)
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