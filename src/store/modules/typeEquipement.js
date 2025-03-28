
import apiGuest from '../../request/AppRequest';
import Swal from 'sweetalert2';  
import authHeader from '../../services/auth-header';
import router from '../../routes';

 
const role ={
  state: {
 
    typeequipements: [] ,

  error: null 
  },
  mutations: {

     SET_TYPE_EQUIPEMENT(state, modules){
       state.typeequipements = modules;
    },

 SUPPRIMER_TYPE_EQUIPEMENT(state, produitId) {
    state.typeequipements = state.typeequipements.filter(produit => produit.id !== produitId);
    },
 
 AJOUTER_TYPE_EQUIPEMENT  (state, elementAjouter){
    state.typeequipements.unshift(elementAjouter)
    },
 MODIFIER_TYPE_EQUIPEMENT (state, elementModif){
    state.typeequipements = state.typeequipements.map(response => {

        if (response.id == elementModif.id) {
            response = { ...elementModif }
        }
        return response
    })
}
  },
  
  actions: {
  

    async gettypeequipements({ commit }) {

    try {
        const resultat = await apiGuest.get('/typeequipement', { headers: authHeader() });
        
        // Mettre à jour les données dans le store
        commit('SET_TYPE_EQUIPEMENT', resultat.data);
    } catch (error) {
      
    } finally {
    
    }
    },

     async enregistrertypeequipements({ commit,dispatch }, objet) {

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
      const response = await apiGuest.post('/typeequipement', objet, { headers: authHeader() });
         commit('AJOUTER_TYPE_EQUIPEMENT', response.data);
        dispatch('gettypeequipements');
          Swal.fire({
                 position: "top-end",
                 icon: "success",
                 title: "Enregistrement réussie",
                 showConfirmButton: false,
                 timer: 1500
               });
       //}.catch();
  },

     
async supprimertypeequipements({ commit,dispatch }, id) {
  
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
  apiGuest.delete('/typeequipement/' + id, { headers: authHeader() })
     commit('SUPPRIMER_TYPE_EQUIPEMENT', id)
     dispatch('gettypeequipements');
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

    
    async modifiertypeequipements({ commit,dispatch }, nouveau) {
  apiGuest.put("/typeequipement/" + nouveau.id, nouveau, { headers: authHeader() })
    .then(response => {
      commit("MODIFIER_TYPE_EQUIPEMENT", response.data);
      dispatch('gettypeequipements');
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
  
   
    gettertypeequipements(state) {
      return state.typeequipements.sort((a, b) => (a.libelle < b.libelle) ? -1 : 1)
    },

  error(state) {
    return state.error;
  }
  }
};
export default role;