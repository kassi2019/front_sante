// src/store/index.js
//import { createStore } from 'vuex';
import apiGuest from '../../request/AppRequest';
import Swal from 'sweetalert2';  // Assurez-vous d'importer SweetAlert2
import authHeader from '../../services/auth-header';


const isLoading = false; // Variable pour contrôler l'état de chargement// Importer le spinner
const role ={
  state: {
 
    zoneInterventions: [] ,
    StateAffectationZone: [],
   stateZoneResponsable:[],
  //   loading: false,// ajout de l'état de chargement
  // loading: false, // Statut de chargement
  error: null     // Erreur de l'enregistrement
  },
  mutations: {
    SET_ZONE_RESPONSABLE(state, StateModule) {
    state.stateZoneResponsable = StateModule;
    },
SET_AFFECTATION_ZONE(state, StateModule) {
    state.StateAffectationZone = StateModule;
    },
     SET_ZONE_INTERVENTION(state, zoneInterventions){
       state.zoneInterventions = zoneInterventions;
    },
//  SET_LOADING(state, isLoading) {
//         state.loading = isLoading;
//     },

 SET_ERROR(state, error) {
    state.error = error;
    },
 SUPPRIMER_ZONE_INTERVENTION(state, produitId) {
    state.zoneInterventions = state.zoneInterventions.filter(produit => produit.id !== produitId);
    },
 
 AJOUTER_ZONE_INTERVENTION  (state, elementAjouter){
    state.zoneInterventions.unshift(elementAjouter)
    },
 MODIFIER_ZONE_INTERVENTION (state, elementModif){
    state.zoneInterventions = state.zoneInterventions.map(response => {

        if (response.id == elementModif.id) {
            response = { ...elementModif }
        }
        return response
    })
}
  },
  
  actions: {
  

    async getzoneInterventions({ commit }) {
    // Activer le loader
    // commit('SET_LOADING', true);

    try {
        const resultat = await apiGuest.get('/listeZoneIntervention', { headers: authHeader() });
        
        // Mettre à jour les données dans le store
        commit('SET_ZONE_INTERVENTION', resultat.data);
    } catch (error) {
        //console.log(error);
    } finally {
        // Désactiver le loader après l'appel API
        // commit('SET_LOADING', false);
    }
    },

     async enregistrerzoneInterventions({ commit,dispatch }, objet) {
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
      const response = await apiGuest.post('/ajouterZoneIntervention', objet, { headers: authHeader() });
         commit('AJOUTER_ZONE_INTERVENTION', response.data); // Sauvegarder le produit dans le store
        dispatch('getzoneInterventions');
          Swal.fire({
                 position: "top-end",
                 icon: "success",
                 title: "Enregistrement réussie",
                 showConfirmButton: false,
                 timer: 1500
               });
       //}.catch();
  },

     
async supprimerzoneInterventions({ commit,dispatch }, id) {
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
  apiGuest.delete('/supprimerZoneIntervention/' + id, { headers: authHeader() })
     commit('SUPPRIMER_ZONE_INTERVENTION', id)
     dispatch('getzoneInterventions');
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

    
    async modifierzoneInterventions({ commit,dispatch }, nouveau) {
  apiGuest.put("/modifierZoneIntervention/" + nouveau.id, nouveau, { headers: authHeader() })
    .then(response => {
      commit("MODIFIER_ZONE_INTERVENTION", response.data);
      dispatch('getzoneInterventions');
  Swal.fire({
                 position: "top-end",
                 icon: "success",
                 title: "Modification réussie",
                 showConfirmButton: false,
                 timer: 1500
               });
    });
    },
    





      async getAffectationZone({ commit }) {
     
        try {
          // Effacer les sous-préfectures existantes avant de charger de nouvelles
          commit('SET_AFFECTATION_ZONE', []);
          
          // Appel à l'API ou à une autre source de données
                 const responseSp = await apiGuest.get('/listeZoneIntervention', { headers: authHeader() });
    
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
      
      
      async getZoneParResponsable({ commit }, objet) {
    try {
        // Effacer les sous-préfectures existantes avant de charger de nouvelles
        commit('SET_ZONE_RESPONSABLE', []);

        // Appel à l'API avec le user_id en paramètre
        const responseSp = await apiGuest.get('/listeZoneResponsable/'+ objet.respo, { 
            headers: authHeader() 
        });

        const sousPrefectures = responseSp.data.map(sp => ({
            id: sp.zone_intervention_id,
            label: `${sp.libelle_zone}`,
        }));

        commit('SET_ZONE_RESPONSABLE', sousPrefectures);
        return sousPrefectures;
    } catch (error) {
        console.error("Erreur lors de la récupération des Sous-préfectures:", error);
        commit('SET_ZONE_RESPONSABLE', []);
    }
}

  },
  getters: {
  
   
    getterzoneInterventions(state) {
      return state.zoneInterventions.sort((a, b) => (a.libelle < b.libelle) ? -1 : 1)
    },
getterAffectationzone(state) {
      return state.StateAffectationZone.sort((a, b) => (a.libelle < b.libelle) ? -1 : 1)
    },
gettersZoneResponsable(state) {
      return state.stateZoneResponsable
    },
    
  error(state) {
    return state.error;
  }
  }
};
export default role;