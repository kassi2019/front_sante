// src/store/index.js
//import { createStore } from 'vuex';
import apiGuest from '../../request/AppRequest';
import Swal from 'sweetalert2';  // Assurez-vous d'importer SweetAlert2
import authHeader from '../../services/auth-header';
import router from '../../routes';

const isLoading = false; // Variable pour contrôler l'état de chargement// Importer le spinner
const roleModule ={
  state: {
    roleId: null,
    StateModules: [],
    stateRoleModule: [],
 stateModuleParRole:[]
  },
  mutations: {
    SET_MODULE_PAR_ROLE(state, StateModule) {
    state.stateModuleParRole = StateModule;
    },
SET_ROLE_MODULE(state, StateModule) {
    state.StateModules = StateModule;
    },
    SET_ROLE_MODULE3(state, StateModule) {
    state.stateRoleModule = StateModule;
    },
    setRoleId(state, roleId) {
      state.roleId = roleId;
    },
    AJOUTER_ROLE_MODULE  (state, elementAjouter){
    state.stateRoleModule.unshift(elementAjouter)
    },

     MODIFIER_ROLE_MODULE (state, elementModif){
    state.stateModuleParRole = state.stateModuleParRole.map(response => {

        if (response.id == elementModif.id) {
            response = { ...elementModif }
        }
        return response
    })
    },
     SUPPRIMER_ROLE_MODULE(state, produitId) {
    state.stateRoleModule = state.stateRoleModule.filter(produit => produit.id !== produitId);
    },
  },
  
  actions: {
async supprimerRoleModule({ commit,dispatch }, id) {
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
  apiGuest.delete('/supprimerRoleModule/' + id, { headers: authHeader() })
     commit('SUPPRIMER_ROLE_MODULE', id)
       dispatch('getRoleModules');
  dispatch('getModulesParRole');
      
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
     async getModulesParRole({ commit }) {
        // Activer le loader
        // commit('SET_LOADING', true);
    
        try {
            const resultat = await apiGuest.get('/listeModuleParRole', { headers: authHeader() });
            
            // Mettre à jour les données dans le store
            commit('SET_MODULE_PAR_ROLE', resultat.data);
        } catch (error) {
            //console.log(error);
        } finally {
            // Désactiver le loader après l'appel API
            // commit('SET_LOADING', false);
        }
        },

    async getRoleModules({ commit }) {
        // Activer le loader
        // commit('SET_LOADING', true);
    
        try {
            const resultat = await apiGuest.get('/listeRoleModule', { headers: authHeader() });
            
            // Mettre à jour les données dans le store
            commit('SET_ROLE_MODULE3', resultat.data);
        } catch (error) {
            //console.log(error);
        } finally {
            // Désactiver le loader après l'appel API
            // commit('SET_LOADING', false);
        }
        },



async enregistrerRoleModule({ commit,dispatch }, objet) {
    // commit('SET_LOADING', true);
    // commit('SET_ERROR', null); // Reset erreur

      // try {
        if (!objet.id_roles) {
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
      const response = await apiGuest.post('/ajouterRoleModule', objet, { headers: authHeader() });
         commit('AJOUTER_ROLE_MODULE', response.data); // Sauvegarder le produit dans le store
  dispatch('getRoleModules');
  dispatch('getModulesParRole');
  
          Swal.fire({
                 position: "top-end",
                 icon: "success",
                 title: "Enregistrement réussie",
                 showConfirmButton: false,
                 timer: 1500
               });
       //}.catch();
  },

async modifierRoleModule({ commit,dispatch }, nouveau) {
  apiGuest.put("/modifierRoleModule/" + nouveau.id, nouveau, { headers: authHeader() })
    .then(response => {
      commit("MODIFIER_ROLE_MODULE", response.data);
   dispatch('getRoleModules');
  dispatch('getModulesParRole');
  Swal.fire({
                 position: "top-end",
                 icon: "success",
                 title: "Modification réussie",
                 showConfirmButton: false,
                 timer: 1500
               });
    });
},
  async getRoleModule({ commit }) {
 
    try {
      // Effacer les sous-préfectures existantes avant de charger de nouvelles
      commit('SET_ROLE_MODULE', []);
      
      // Appel à l'API ou à une autre source de données
             const responseSp = await apiGuest.get('/listeModule', { headers: authHeader() });

      const sousPrefectures = responseSp.data.map(sp => ({
        id: sp.id,
        label: `${sp.libelle}`,
      }));

      commit('SET_ROLE_MODULE', sousPrefectures);
      return sousPrefectures;
    } catch (error) {
      console.error("Erreur lors de la récupération des Sous-préfectures:", error);
      commit('SET_ROLE_MODULE', []);
    }
  },
  },
  getters: {
 getterRoleModule(state) {
    return state.StateModules;
    },
     getterRoleModule3(state) {
    return state.stateRoleModule;
    },
     
      getterModuleParRole(state) {
    return state.stateModuleParRole;
    }, 
     
  }
};
export default roleModule;