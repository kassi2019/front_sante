// src/store/index.js
//import { createStore } from 'vuex';
import apiGuest from '../../request/AppRequest';
import Swal from 'sweetalert2';  // Assurez-vous d'importer SweetAlert2
import authHeader from '../../services/auth-header';
import router from '../../routes';

const isLoading = false; // Variable pour contrôler l'état de chargement// Importer le spinner
const ZoneUtilisateur ={
  state: {
    utilisateurId: null,
    stateZoneUtilisateur: [],
    stateZoneParUtilisateur: [],
    stateZoneParAgent:[]
  },
  mutations: {
    SET_ZONE_PAR_UTILISATEUR(state, StateModule) {
    state.stateZoneParUtilisateur = StateModule;
    },
SET_ZONE_UTILISATEUR(state, StateModule) {
    state.stateZoneUtilisateur = StateModule;
    },

    AJOUTER_ZONE_UTILISATEUR  (state, elementAjouter){
    state.stateZoneUtilisateur.unshift(elementAjouter)
    },

     MODIFIER_ZONE_UTILISATEUR (state, elementModif){
    state.stateZoneUtilisateur = state.stateZoneUtilisateur.map(response => {

        if (response.id == elementModif.id) {
            response = { ...elementModif }
        }
        return response
    })
    },
     SUPPRIMER_ZONE_UTILISATEUR(state, produitId) {
    state.stateZoneUtilisateur = state.stateZoneUtilisateur.filter(produit => produit.id !== produitId);
    },
     
     
     SET_ZONE_PAR_AGENT(state, StateModule) {
    state.stateZoneParAgent = StateModule;
    },
  },
  
  actions: {
async supprimerZoneUtilisateur({ commit,dispatch }, id) {
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
  apiGuest.delete('/supprimerZoneUtilisateur/' + id, { headers: authHeader() })
     commit('SUPPRIMER_ZONE_UTILISATEUR', id)
      dispatch('getZoneParUtilisateur');
      dispatch('getzoneUtilisateur');
      
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
     async getZoneParUtilisateur({ commit }) {
        // Activer le loader
        // commit('SET_LOADING', true);
    
        try {
            const resultat = await apiGuest.get('/listeZoneParUtilisateur', { headers: authHeader() });
            
            // Mettre à jour les données dans le store
            commit('SET_ZONE_PAR_UTILISATEUR', resultat.data);
        } catch (error) {
            //console.log(error);
        } finally {
            // Désactiver le loader après l'appel API
            // commit('SET_LOADING', false);
        }
        },

    async getzoneUtilisateur({ commit }) {
        // Activer le loader
        // commit('SET_LOADING', true);
    
        try {
            const resultat = await apiGuest.get('/listeZoneUtilisateur', { headers: authHeader() });
            
            // Mettre à jour les données dans le store
            commit('SET_ZONE_UTILISATEUR', resultat.data);
        } catch (error) {
            //console.log(error);
        } finally {
            // Désactiver le loader après l'appel API
            // commit('SET_LOADING', false);
        }
        },



async enregistrerZoneUtilisateur({ commit,dispatch }, objet) {
    // commit('SET_LOADING', true);
    // commit('SET_ERROR', null); // Reset erreur

      // try {
        if (!objet.utilisateur_id) {
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
      const response = await apiGuest.post('/ajouterZoneUtilisateur', objet, { headers: authHeader() });
         commit('AJOUTER_ZONE_UTILISATEUR', response.data); // Sauvegarder le produit dans le store
  dispatch('getzoneUtilisateur');
  dispatch('getZoneParUtilisateur');
  
          Swal.fire({
                 position: "top-end",
                 icon: "success",
                 title: "Enregistrement réussie",
                 showConfirmButton: false,
                 timer: 1500
               });
       //}.catch();
  },

async modifierZoneUtilisateur({ commit,dispatch }, nouveau) {
  apiGuest.put("/modifierZoneUtilisateur/" + nouveau.id, nouveau, { headers: authHeader() })
    .then(response => {
      commit("MODIFIER_ZONE_UTILISATEUR", response.data);
   dispatch('getzoneUtilisateur');
  dispatch('getZoneParUtilisateur');
  Swal.fire({
                 position: "top-end",
                 icon: "success",
                 title: "Modification réussie",
                 showConfirmButton: false,
                 timer: 1500
               });
    });
},


 async getZoneParAgent({ commit }) {
        // Activer le loader
        // commit('SET_LOADING', true);
    
        try {
            const resultat = await apiGuest.get('/zoneParAgent', { headers: authHeader() });
            
            // Mettre à jour les données dans le store
            commit('SET_ZONE_PAR_AGENT', resultat.data);
        } catch (error) {
            //console.log(error);
        } finally {
            // Désactiver le loader après l'appel API
            // commit('SET_LOADING', false);
        }
        },
  },
  getters: {
 getterZoneUtilisateur(state) {
    return state.stateZoneUtilisateur;
    },

      getterZoneParUtilisateur(state) {
    return state.stateZoneParUtilisateur;
    }, 
      getterZoneParAgent(state) {
    return state.stateZoneParAgent;
    },  
      
      
  }
};
export default ZoneUtilisateur;