
import apiGuest from '../../request/AppRequest';
import Swal from 'sweetalert2';  
import authHeader from '../../services/auth-header';

import router from '../../routes';

 
const role ={
  state: {
 
  
gpeTypeEquipement:[],
  error: null 
  },
  mutations: {

    
   SET_GPE_TYPE_EQUIPEMENT(state, modules){
       state.gpeTypeEquipement = modules;
    },
 SUPPRIMER_EQUIPEMENT(state, produitId) {
    state.equipements = state.equipements.filter(produit => produit.id !== produitId);
    },
 

 MODIFIER_EQUIPEMENT (state, elementModif){
    state.equipements = state.equipements.map(response => {

        if (response.id == elementModif.id) {
            response = { ...elementModif }
        }
        return response
    })
      },
   SET_CHAMP_VIDE_TRUE(state, user) {
      state.affectationEquipements = user;
    },
  },
  
  actions: {
  
   async getGpeEquipement({ commit }) {

    try {
        const resultat = await apiGuest.get('/afficheTypeEquipement', { headers: authHeader() });
        
        // Mettre à jour les données dans le store
        commit('SET_AFFECTATION_EQUIPEMENT', resultat.data);
    } catch (error) {
      
    } finally {
    
    }
    },
//     async getEquipement({ commit }) {

//     try {
//         const resultat = await apiGuest.get('/equipement', { headers: authHeader() });
        
//         // Mettre à jour les données dans le store
//         commit('SET_EQUIPEMENT', resultat.data);
//     } catch (error) {
      
//     } finally {
    
//     }
//     },




     
// async supprimerEquipement({ commit,dispatch }, id) {
  
//   Swal.fire({
//     title: "Êtes-vous sûr de",
//     text: " vouloir Supprimer cette ligne ?",
//     icon: 'question',
//     showCancelButton: true,
//     confirmButtonColor: '#3085d6',
//     cancelButtonColor: '#d33',
//     confirmButtonText: 'OUI'
//   }).then((result) => {
//     if (result.isConfirmed) {
//   apiGuest.delete('/equipement/' + id, { headers: authHeader() })
//      commit('SUPPRIMER_EQUIPEMENT', id)
//       dispatch('getEquipement');
//          dispatch('getGpeEquipement');
//        Swal.fire({
//                  position: "top-end",
//                  icon: "success",
//                  title: "Suppression réussie",
//                  showConfirmButton: false,
//                  timer: 1500
//                });
//     }
//   });
//     },

    
//     async modifierEquipement({ commit,dispatch }, nouveau) {
//   apiGuest.put("/equipement/" + nouveau.id, nouveau, { headers: authHeader() })
//     .then(response => {
//       commit("MODIFIER_EQUIPEMENT", response.data);
//       dispatch('getEquipement');
//          dispatch('getGpeEquipement');
//   Swal.fire({
//                  position: "top-end",
//                  icon: "success",
//                  title: "Modification réussie",
//                  showConfirmButton: false,
//                  timer: 1500
//                });
//     });
//     },
    

//         async modifierRenouvellement({ commit,dispatch }, nouveau) {
//   apiGuest.put("/updateRenouvellement/" + nouveau.id, nouveau, { headers: authHeader() })
//     .then(response => {
//       commit("MODIFIER_EQUIPEMENT", response.data);
//       dispatch('getEquipement');
//          dispatch('getGpeEquipement');
//   Swal.fire({
//                  position: "top-end",
//                  icon: "success",
//                  title: "Modification réussie",
//                  showConfirmButton: false,
//                  timer: 1500
//                });
//     });
// }
  },
  getters: {
  
   
    // getterEquipement(state) {
    //   return state.equipements.sort((a, b) => (a.libelle < b.libelle) ? -1 : 1)
    // },
    //   getterGpeTypeEquipement(state) {
    //   return state.gpeTypeEquipement.sort((a, b) => (a.libelle_type_equipement < b.libelle_type_equipement) ? -1 : 1)
    // },

  }
};
export default role;