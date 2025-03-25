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
    stateAireSanitaireSup: [],
    stateZoneInterventionSup:[],
    stateZoneParUtilisateur: [],
    stateZoneParAgent: [],
    stateResponsables: [],
    stateDistrictParAgent:[]
  },
  mutations: {
     SET_LISTE_DISTRICT_PAR_AGENT(state, StateModule) {
    state.stateDistrictParAgent = StateModule;
    },
     SET_LISTE_ZONE_INTERVENTION_SUP(state, StateModule) {
    state.stateZoneInterventionSup = StateModule;
    },
     SET_LISTE_AIRE_SANITAIRE_SUP(state, StateModule) {
    state.stateAireSanitaireSup = StateModule;
    },
    SET_RESPONSABLE(state, StateModule) {
    state.stateResponsables = StateModule;
    },
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


async getListeDistrictParAgent({ commit }, objet) {
     try {

         commit('SET_LISTE_DISTRICT_PAR_AGENT', []);
 
         const responseSp = await apiGuest.get('/afficheDistrictParAgent/'+ objet.dist, { 
             headers: authHeader() 
         });
 
         const sousPrefectures = responseSp.data.map(sp => ({
             id: sp.district_id,
             label: `${sp.libelle_district}`,
         }));
 
         commit('SET_LISTE_DISTRICT_PAR_AGENT', sousPrefectures);
         return sousPrefectures;
     } catch (error) {
         console.error("Erreur lors de la récupération des Sous-préfectures:", error);
         commit('SET_LISTE_DISTRICT_PAR_AGENT', []);
     }
    },




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

        }
        },

async enregistrerZoneAuAgent({ commit,dispatch }, objet) {

        if (!objet.utilisateur_id) {
            commit('SET_CHAMP_VIDE_TRUE');
            Swal.fire({
              icon: 'error',
              title: 'Champs vides',
              text: 'Veuillez remplir tous les champs.',
              confirmButtonText: 'OK',
            });
            return;
          }
      const response = await apiGuest.post('/enregistrerzoneParAgent', objet, { headers: authHeader() });
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
  },

async enregistrerZoneUtilisateur({ commit,dispatch }, objet) {

        if (!objet.utilisateur_id) {
            commit('SET_CHAMP_VIDE_TRUE');
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

        }
    },
 
 
 async getResponsable({ commit }, objet) {

        try {
            const resultat = await apiGuest.get('/Responsable/'+ objet.role, { headers: authHeader() });
            
            // Mettre à jour les données dans le store
            commit('SET_RESPONSABLE', resultat.data);
        } catch (error) {
            //console.log(error);
        } finally {

        }
    },
 
 
 
 
       async getListeAireSanitaireParSuperviseur({ commit }, objet) {
     try {

         commit('SET_LISTE_AIRE_SANITAIRE_SUP', []);
 
         const responseSp = await apiGuest.get('/AireSanitaireParsuperviseur/'+ objet.respo, { 
             headers: authHeader() 
         });
 
         const sousPrefectures = responseSp.data.map(sp => ({
             id: sp.aire_sanitaire_id,
             label: `${sp.libelle_aire_Sanitaire}`,
         }));
 
         commit('SET_LISTE_AIRE_SANITAIRE_SUP', sousPrefectures);
         return sousPrefectures;
     } catch (error) {
         console.error("Erreur lors de la récupération des Sous-préfectures:", error);
         commit('SET_LISTE_AIRE_SANITAIRE_SUP', []);
     }
    },
       
        
       async getListeZoneInterventionParSuperviseur({ commit }, objet) {
     try {

         commit('SET_LISTE_ZONE_INTERVENTION_SUP', []);
 
         const responseSp = await apiGuest.get('/listeZoneInterventParsuperviseur/'+ objet.aire, { 
             headers: authHeader() 
         });
 
         const sousPrefectures = responseSp.data.map(sp => ({
             id: sp.id,
             label: `${sp.libelle}`,
         }));
 
         commit('SET_LISTE_ZONE_INTERVENTION_SUP', sousPrefectures);
         return sousPrefectures;
     } catch (error) {
         console.error("Erreur lors de la récupération des Sous-préfectures:", error);
         commit('SET_LISTE_ZONE_INTERVENTION_SUP', []);
     }
    },
       
       
       
       async enregistrerDesDistrictParAgent({ commit,dispatch }, objet) {

        if (!objet.utilisateur_id) {
            commit('SET_CHAMP_VIDE_TRUE');
            Swal.fire({
              icon: 'error',
              title: 'Champs vides',
              text: 'Veuillez remplir tous les champs.',
              confirmButtonText: 'OK',
            });
            return;
          }
      const response = await apiGuest.post('/enregistrerDistrictParAgent', objet, { headers: authHeader() });
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
  },
  },
  getters: {
    
     getterDistrictParAgent(state) {
    return state.stateDistrictParAgent;
    },
 getterZoneUtilisateur(state) {
    return state.stateZoneUtilisateur;
    },
     getterResponsables(state) {
    return state.stateResponsables;
    },

      getterZoneParUtilisateur(state) {
    return state.stateZoneParUtilisateur;
    }, 
      getterZoneParAgent(state) {
    return state.stateZoneParAgent;
    },  
        getterAireSanitaireSup(state) {
    return state.stateAireSanitaireSup;
    },
      getterZoneInterventionSup(state) {
    return state.stateZoneInterventionSup;
    },  
      
  }
};
export default ZoneUtilisateur;