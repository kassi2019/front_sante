// src/store/index.js
//import { createStore } from 'vuex';
import apiGuest from '../../request/AppRequest';
import Swal from 'sweetalert2';  // Assurez-vous d'importer SweetAlert2
import authHeader from '../../services/auth-header';


const isLoading = false; // Variable pour contrôler l'état de chargement// Importer le spinner
const role ={
  state: {
 
    districts: [] ,
    StateAffectationZone: [],
    stateZoneResponsable: [],
      stateCarteZone:[],
  //   loading: false,// ajout de l'état de chargement
  // loading: false, // Statut de chargement
  error: null     // Erreur de l'enregistrement
  },
  mutations: {
    SET_ZONE_RESPONSABLE(state, StateModule) {
    state.stateZoneResponsable = StateModule;
    },
    SET_CARTE_ZONE(state, StateModule) {
    state.stateCarteZone = StateModule;
    },
// SET_AFFECTATION_ZONE(state, StateModule) {
//     state.StateAffectationZone = StateModule;
//     },
     SET_DISTRICT(state, District){
       state.districts = District;
    },
//  SET_LOADING(state, isLoading) {
//         state.loading = isLoading;
//     },

 SET_ERROR(state, error) {
    state.error = error;
    },
 SUPPRIMER_DISTRICT(state, produitId) {
    state.districts = state.districts.filter(produit => produit.id !== produitId);
    },
 
 AJOUTER_DISTRICT  (state, elementAjouter){
    state.districts.unshift(elementAjouter)
    },
 MODIFIER_DISTRICT (state, elementModif){
    state.districts = state.districts.map(response => {

        if (response.id == elementModif.id) {
            response = { ...elementModif }
        }
        return response
    })
}
  },
  
  actions: {
  

    async getDistrict({ commit }) {
    // Activer le loader
    // commit('SET_LOADING', true);

    try {
        const resultat = await apiGuest.get('/district', { headers: authHeader() });
        
        // Mettre à jour les données dans le store
        commit('SET_DISTRICT', resultat.data);
    } catch (error) {
        //console.log(error);
    } finally {
        // Désactiver le loader après l'appel API
        // commit('SET_LOADING', false);
    }
    },

     async enregistrerDistrict({ commit,dispatch }, objet) {

      const response = await apiGuest.post('/district', objet, { headers: authHeader() });
         commit('AJOUTER_DISTRICT', response.data); // Sauvegarder le produit dans le store
        dispatch('getDistrict');
          Swal.fire({
                 position: "top-end",
                 icon: "success",
                 title: "Enregistrement réussie",
                 showConfirmButton: false,
                 timer: 1500
               });
       //}.catch();
  },

     
async supprimerDistrict({ commit,dispatch }, id) {
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
  apiGuest.delete('/district/' + id, { headers: authHeader() })
     commit('SUPPRIMER_DISTRICT', id)
     dispatch('getDistrict');
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

    
    async modifierDistrict({ commit,dispatch }, nouveau) {
  apiGuest.put("/district/" + nouveau.id, nouveau, { headers: authHeader() })
    .then(response => {
      commit("MODIFIER_DISTRICT", response.data);
      dispatch('getDistrict');
  Swal.fire({
                 position: "top-end",
                 icon: "success",
                 title: "Modification réussie",
                 showConfirmButton: false,
                 timer: 1500
               });
    });
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
            id: sp.DISTRICT_id,
            label: `${sp.libelle_zone}`,
        }));

        commit('SET_ZONE_RESPONSABLE', sousPrefectures);
        return sousPrefectures;
    } catch (error) {
        console.error("Erreur lors de la récupération des Sous-préfectures:", error);
        commit('SET_ZONE_RESPONSABLE', []);
    }
},

      
      
            async getCarteZone({ commit }) {
     
        try {
          // Effacer les sous-préfectures existantes avant de charger de nouvelles
          commit('SET_CARTE_ZONE', []);
          
          // Appel à l'API ou à une autre source de données
                 const responseSp = await apiGuest.get('/district', { headers: authHeader() });
    
          const sousPrefectures = responseSp.data.map(sp => ({
            id: sp.id,
            name: `${sp.libelle}`,
            lat: `${sp.latitude}`,
            lng: `${sp.longitude}`,
          }));
    
          commit('SET_CARTE_ZONE', sousPrefectures);
          return sousPrefectures;
        } catch (error) {
          console.error("Erreur lors de la récupération des Sous-préfectures:", error);
          commit('SET_CARTE_ZONE', []);
        }
    },
  },
  getters: {
  
   
    getterDistrict(state) {
      return state.districts.sort((a, b) => (a.libelle > b.libelle) ? -1 : 1)
    },
// getterAffectationzone(state) {
//       return state.StateAffectationZone.sort((a, b) => (a.libelle < b.libelle) ? -1 : 1)
//     },
gettersZoneResponsable(state) {
      return state.stateZoneResponsable
    },
    gettersCarteZone(state) {
      return state.stateCarteZone
    },
    
  error(state) {
    return state.error;
  }
  }
};
export default role;