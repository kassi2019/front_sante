
import apiGuest from '../../request/AppRequest';
import Swal from 'sweetalert2';  
import authHeader from '../../services/auth-header';
import router from '../../routes';

 
const role ={
  state: {
 
    equipements: [] ,

  error: null 
  },
  mutations: {

     SET_EQUIPEMENT(state, modules){
       state.equipements = modules;
    },

 SUPPRIMER_EQUIPEMENT(state, produitId) {
    state.equipements = state.equipements.filter(produit => produit.id !== produitId);
    },
 
 AJOUTER_EQUIPEMENT  (state, elementAjouter){
    state.equipements.unshift(elementAjouter)
    },
 MODIFIER_EQUIPEMENT (state, elementModif){
    state.equipements = state.equipements.map(response => {

        if (response.id == elementModif.id) {
            response = { ...elementModif }
        }
        return response
    })
}
  },
  
  actions: {
  

    async getEquipement({ commit }) {

    try {
        const resultat = await apiGuest.get('/equipement', { headers: authHeader() });
        
        // Mettre à jour les données dans le store
        commit('SET_EQUIPEMENT', resultat.data);
    } catch (error) {
      
    } finally {
    
    }
    },

     async enregistrerEquipement({ commit,dispatch }, objet) {

        if (!objet.libelle) {
            commit('SET_CHAMP_VIDE_TRUE');
        
            Swal.fire({
              icon: 'error',
              title: 'Champs vides',
              text: 'Veuillez remplir tous les champs.',
              confirmButtonText: 'OK',
            });
            return;
          }
      const response = await apiGuest.post('/equipement', objet, { headers: authHeader() });
         commit('AJOUTER_EQUIPEMENT', response.data);
        dispatch('getEquipement');
          Swal.fire({
                 position: "top-end",
                 icon: "success",
                 title: "Enregistrement réussie",
                 showConfirmButton: false,
                 timer: 1500
               });
       //}.catch();
  },

     
async supprimerEquipement({ commit,dispatch }, id) {
  
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
  apiGuest.delete('/equipement/' + id, { headers: authHeader() })
     commit('SUPPRIMER_EQUIPEMENT', id)
     dispatch('getEquipement');
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

    
    async modifierEquipement({ commit,dispatch }, nouveau) {
  apiGuest.put("/equipement/" + nouveau.id, nouveau, { headers: authHeader() })
    .then(response => {
      commit("MODIFIER_EQUIPEMENT", response.data);
      dispatch('getEquipement');
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
  
   
    getterEquipement(state) {
      return state.equipements.sort((a, b) => (a.libelle < b.libelle) ? -1 : 1)
    },

  error(state) {
    return state.error;
  }
  }
};
export default role;