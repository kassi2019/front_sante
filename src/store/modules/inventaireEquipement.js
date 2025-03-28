
import apiGuest from '../../request/AppRequest';
import Swal from 'sweetalert2';  
import authHeader from '../../services/auth-header';
import router from '../../routes';

 
const role ={
  state: {
 
    inventaireequipements: [] ,

  error: null 
  },
  mutations: {

     SET_INVENTAIRE_EQUIPEMENT(state, modules){
       state.inventaireequipements = modules;
    },

 SUPPRIMER_INVENTAIRE_EQUIPEMENT(state, produitId) {
    state.inventaireequipements = state.inventaireequipements.filter(produit => produit.id !== produitId);
    },
 
 AJOUTER_INVENTAIRE_EQUIPEMENT  (state, elementAjouter){
    state.inventaireequipements.unshift(elementAjouter)
    },
 MODIFIER_INVENTAIRE_EQUIPEMENT (state, elementModif){
    state.inventaireequipements = state.inventaireequipements.map(response => {

        if (response.id == elementModif.id) {
            response = { ...elementModif }
        }
        return response
    })
}
  },
  
  actions: {
  

    async getInventaireEquipement({ commit }) {

    try {
        const resultat = await apiGuest.get('/inventaireequipement', { headers: authHeader() });
        
        // Mettre à jour les données dans le store
        commit('SET_INVENTAIRE_EQUIPEMENT', resultat.data);
    } catch (error) {
      
    } finally {
    
    }
    },

      
      async enregistrerInventaireEquipement({ commit,dispatch }, { equipement_id, status,data ,data1}) {
  // First, check if the necessary fields are provided
//   if (!data.libelle) {
//     commit('SET_CHAMP_VIDE_TRUE');
//     Swal.fire({
//       icon: 'error',
//       title: 'Champs vides',
//       text: 'Veuillez remplir tous les champs.',
//       confirmButtonText: 'OK',
//     });
//     return;
//   }
         console.log(data.id)
  try {
    let response;

    // Check if the equipment already has a status, and if so, update it
    if (data1 != 0) {
      // If the status exists, perform an update
      response = await apiGuest.put(`/inventaireequipement/${data1}`, {
        status: status,
      }, {
        headers: authHeader(), // Add authentication headers if required
      });
    } else {
      // If no status exists, perform a new status creation
      response = await apiGuest.post('/inventaireequipement', {
      equipement_id: equipement_id.id,
        status: status,
        type_equipement_id: data,
      }, {
        headers: authHeader(), // Add authentication headers if required
      });
    }

    // Commit the response data to the Vuex store (You can modify this depending on your mutation)
    commit('AJOUTER_INVENTAIRE_EQUIPEMENT', response.data);
      dispatch('getInventaireEquipement');
    // Dispatch other necessary actions, such as fetching the updated list of equipments
   

    // Show success message using SweetAlert
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Enregistrement réussie',
      showConfirmButton: false,
      timer: 1500,
    });
  } catch (error) {
    // Handle error here, e.g., show an alert
    console.error('Error saving status', error);
    Swal.fire({
      icon: 'error',
      title: 'Erreur',
      text: 'Une erreur est survenue lors de l\'enregistrement.',
      confirmButtonText: 'OK',
    });
  }
},

// Vuex action
// async enregistrerInventaireEquipement({ commit }, { equipement_id, status,data }) {
  

//   try {
//     // Send the updated status to the backend using the apiGuest instance
//       const response = await apiGuest.post('/inventaireequipement', {
        
//         equipement_id: equipement_id.id,
//         status: status,
//         type_equipement_id: data.id,
//       }, {
        
//       headers: authHeader() 
//     });
   
//     commit('AJOUTER_INVENTAIRE_EQUIPEMENT', response.data);
//     Swal.fire({
//       position: 'top-end',
//       icon: 'success',
//       title: 'Enregistrement réussie',
//       showConfirmButton: false,
//       timer: 1500,
//     });
//   } catch (error) {
//     // Handle error here, e.g., show an alert
//     console.error('Error saving status', error);
//     Swal.fire({
//       icon: 'error',
//       title: 'Erreur',
//       text: 'Une erreur est survenue lors de l\'enregistrement.',
//       confirmButtonText: 'OK',
//     });
//   }
// },
     
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
  
   
    getterinventaireequipements(state) {
      return state.inventaireequipements
    },

  error(state) {
    return state.error;
  }
  }
};
export default role;