
import apiGuest from '../../request/AppRequest';
import Swal from 'sweetalert2';  
import authHeader from '../../services/auth-header';

import router from '../../routes';

 
const role ={
  state: {
 
  stateAgentAsc:[],
gpeTypeEquipement:[],
  error: null 
  },
  mutations: {

      SET_ASC_CONNECTER(state, modules){
       state.stateAgentAsc = modules;
    },
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
    
       async getAfficheAscConnecter({ commit }) {

    try {
        const resultat = await apiGuest.get('/AfficheAscAuMoinUnEquipement', { headers: authHeader() });
        
        // Mettre à jour les données dans le store
        commit('SET_ASC_CONNECTER', resultat.data);
    } catch (error) {
      
    } finally {
    
    }
    },
   async getGpeEquipement({ commit }) {

    try {
        const resultat = await apiGuest.get('/afficheTypeEquipement', { headers: authHeader() });
        
        // Mettre à jour les données dans le store
        commit('SET_AFFECTATION_EQUIPEMENT', resultat.data);
    } catch (error) {
      
    } finally {
    
    }
    },

  },
  getters: {
  
   
    getterAscConnecter(state) {
      return state.stateAgentAsc
    },

  }
};
export default role;