
import apiGuest from '../../request/AppRequest';
import Swal from 'sweetalert2';  
import authHeader from '../../services/auth-header';
import router from '../../routes';

const role ={
  state: {
    affectationEquipements: [],
    HistoAffectationEquipements: [],
    agentequipe: [] ,
    equipements: [],
    stateGroupeEquipement:[],
gpeTypeEquipement:[],
  error: null 
  },
  mutations: {
     SET_GROUPE_EQUIPEMENT(state, modules){
       state.stateGroupeEquipement = modules;
    },
 SET_HISTO_AFFECTATION_EQUIPEMENT(state, modules){
       state.HistoAffectationEquipements = modules;
    },
     AJOUTER_HISTO_EQUIPEMENT  (state, elementAjouter){
    state.HistoAffectationEquipements.unshift(elementAjouter)
    },
      MODIFIER_HISTO_AFFECTATION_EQUIPEMENT (state, elementModif){
    state.HistoAffectationEquipements = state.HistoAffectationEquipements.map(response => {

        if (response.id == elementModif.id) {
            response = { ...elementModif }
        }
        return response
    })
    },
     SET_EQUIPEMENT(state, modules){
       state.equipements = modules;
    },
   SET_GPE_TYPE_EQUIPEMENT(state, modules){
       state.gpeTypeEquipement = modules;
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
    },
  MODIFIER_AFFECTATION_EQUIPEMENT (state, elementModif){
    state.affectationEquipements = state.affectationEquipements.map(response => {

        if (response.id == elementModif.id) {
            response = { ...elementModif }
        }
        return response
    })
    },
  AJOUTER_AFFECTATION_EQUIPEMENT  (state, elementAjouter){
    state.affectationEquipements.unshift(elementAjouter)
    },
  SET_AFFECTATION_EQUIPEMENT(state, modules){
       state.affectationEquipements = modules;
    },

     SET_AGENT_AFFECTE(state, modules){
       state.agentequipe = modules;
    },
  },
  
  actions: {
   async getGroupeEquipement({ commit }) {

    try {
        const resultat = await apiGuest.get('/listeGroupeEquipementOpt', { headers: authHeader() });
        
        // Mettre à jour les données dans le store
        commit('SET_GROUPE_EQUIPEMENT', resultat.data);
    } catch (error) {
      
    } finally {
    
    }
    },
   async getGpeEquipement({ commit }) {

    try {
        const resultat = await apiGuest.get('/afficheTypeEquipement', { headers: authHeader() });
        
        // Mettre à jour les données dans le store
        commit('SET_GPE_TYPE_EQUIPEMENT', resultat.data);
    } catch (error) {
      
    } finally {
    
    }
    },
async getHistoAffectationEquipement({ commit }) {

    try {
        const resultat = await apiGuest.get('/listehistoAffectation', { headers: authHeader() });
        
        // Mettre à jour les données dans le store
        commit('SET_HISTO_AFFECTATION_EQUIPEMENT', resultat.data);
    } catch (error) {
      
    } finally {
    
    }
    },
    
    async getEquipement({ commit }) {

    try {
        const resultat = await apiGuest.get('/equipement', { headers: authHeader() });
        
        // Mettre à jour les données dans le store
        commit('SET_EQUIPEMENT', resultat.data);
    } catch (error) {
      
    } finally {
    
    }
    },

    

async getEquipementAffecte({ commit }) {

    try {
        const resultat = await apiGuest.get('/listeEquipementAffecte', { headers: authHeader() });
        
        // Mettre à jour les données dans le store
        commit('SET_AFFECTATION_EQUIPEMENT', resultat.data);
    } catch (error) {
      
    } finally {
    
    }
    },
async getAgentAffecte({ commit }) {

    try {
        const resultat = await apiGuest.get('/groupeAgentAffecte', { headers: authHeader() });
        
        // Mettre à jour les données dans le store
        commit('SET_AGENT_AFFECTE', resultat.data);
    } catch (error) {
      
    } finally {
    
    }
    },
    async enregistrerAffectationEquipement({ commit, dispatch }, objet) {
  if (!objet.quantite_affecte && !objet.equipement_id) {
    commit('SET_CHAMP_VIDE_TRUE');
    Swal.fire({
      icon: 'error',
      title: 'Champs vides',
      text: 'Veuillez remplir tous les champs.',
      confirmButtonText: 'OK',
    });
    return;
  }

  try {
    const response = await apiGuest.post('/Affectationequipement', objet, { headers: authHeader() });
    commit('AJOUTER_AFFECTATION_EQUIPEMENT', response.data);
    await dispatch('getEquipement'); // appel de l'action getEquipement dans le module equipement
    await dispatch('getAgentAffecte');
    await dispatch('getEquipementAffecte');

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Enregistrement réussi",
      showConfirmButton: false,
      timer: 1500
    });
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Erreur',
      text: 'Une erreur est survenue lors de l\'enregistrement.',
      confirmButtonText: 'OK',
    });
    console.error(error); // Affiche l'erreur dans la console pour déboguer
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
         dispatch('getGpeEquipement');
       
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
         dispatch('getGpeEquipement');
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
         dispatch('getGpeEquipement');
  Swal.fire({
                 position: "top-end",
                 icon: "success",
                 title: "Modification réussie",
                 showConfirmButton: false,
                 timer: 1500
               });
    });
    },
    

        async modifierRenouvellement({ commit,dispatch }, nouveau) {
  apiGuest.put("/updateRenouvellement/" + nouveau.id, nouveau, { headers: authHeader() })
    .then(response => {
      commit("MODIFIER_EQUIPEMENT", response.data);
      dispatch('getEquipement');
         dispatch('getGpeEquipement');
  Swal.fire({
                 position: "top-end",
                 icon: "success",
                 title: "Modification réussie",
                 showConfirmButton: false,
                 timer: 1500
               });
    });
    },
        
        
        
        
        
        
        
        async enregistrerInventaireEquipementAgent({ commit,dispatch }, { status,data}) {
        
          try {
            let response;
        
            // Check if the equipment already has a status, and if so, update it
            
              // If the status exists, perform an update
              response = await apiGuest.put(`/Affectationequipement/${data}`, {
                status: status,
              }, {
                headers: authHeader(), // Add authentication headers if required
              });
            
        
            // Commit the response data to the Vuex store (You can modify this depending on your mutation)
            commit('MODIFIER_AFFECTATION_EQUIPEMENT', response.data);
              dispatch('getEquipementAffecte');

            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Equipement validé',
              showConfirmButton: false,
              timer: 2000,
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
        
        
        
        
        
        async enregistrerInventaireEquipementAgentAnnule({ commit,dispatch }, { status,data}) {
        
          try {
            let response;
        
            // Check if the equipment already has a status, and if so, update it
            
              // If the status exists, perform an update
              response = await apiGuest.put(`/Affectationequipement/${data}`, {
                status: status,
              }, {
                headers: authHeader(), // Add authentication headers if required
              });
            
        
            // Commit the response data to the Vuex store (You can modify this depending on your mutation)
            commit('MODIFIER_AFFECTATION_EQUIPEMENT', response.data);
              dispatch('getEquipementAffecte');

            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Equipement Annulé',
              showConfirmButton: false,
              timer: 2000,
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
        
        
        
            async miseJourEquipementAffecte({ commit,dispatch }, nouveau) {
  apiGuest.put("/AffectationEquipementDispo/" + nouveau.id, nouveau, { headers: authHeader() })
    .then(response => {
      commit("MODIFIER_AFFECTATION_EQUIPEMENT", response.data);
       dispatch('getEquipementAffecte');
  Swal.fire({
                 position: "top-end",
                 icon: "success",
                 title: "Modification réussie",
                 showConfirmButton: false,
                 timer: 1500
               });
    });
    },
            
            
            
                  async enregistrerhistoInventaireEquipementAgent({ commit,dispatch }, { status,data}) {
        
          try {
            let response;
        
            // Check if the equipment already has a status, and if so, update it
            
              // If the status exists, perform an update
              response = await apiGuest.put(`/updateHistoAffectationEquipement/${data}`, {
                status: status,
              }, {
                headers: authHeader(), // Add authentication headers if required
              });
            
        
            // Commit the response data to the Vuex store (You can modify this depending on your mutation)
            commit('MODIFIER_HISTO_AFFECTATION_EQUIPEMENT', response.data);
              dispatch('getHistoAffectationEquipement');

            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Equipement validé',
              showConfirmButton: false,
              timer: 2000,
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
                  
                  
                          async enregistrerhistoInventaireEquipementAgentAnnule({ commit,dispatch }, { status,data}) {
        
          try {
            let response;
        
            // Check if the equipment already has a status, and if so, update it
            
              // If the status exists, perform an update
              response = await apiGuest.put(`/updateHistoAffectationEquipement/${data}`, {
                status: status,
              }, {
                headers: authHeader(), // Add authentication headers if required
              });
            
        
            // Commit the response data to the Vuex store (You can modify this depending on your mutation)
            commit('MODIFIER_HISTO_AFFECTATION_EQUIPEMENT', response.data);
              dispatch('getHistoAffectationEquipement');

            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Equipement Annulé',
              showConfirmButton: false,
              timer: 2000,
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
                          
                          
    //                       async validationQuantite({ commit,dispatch }, objet) {

    //   const response = await apiGuest.post('/verificationStockParAgent', objet, { headers: authHeader() });
    //      commit('AJOUTER_EQUIPEMENT', response.data);
    //    dispatch('getEquipement');
    //      dispatch('getGpeEquipement');
       
    //       Swal.fire({
    //              position: "top-end",
    //              icon: "success",
    //              title: "Enregistrement réussie",
    //              showConfirmButton: false,
    //              timer: 1500
    //            });
    //    //}.catch();
    // },
                          
                          
                          
                          
                          
async validationQuantite({ commit,dispatch }, { dataId,dataQuantite}) {
        
          try {
            let response;
        
            // Check if the equipment already has a status, and if so, update it
            
              // If the status exists, perform an update
              response = await apiGuest.post(`/verificationStockParAgent`, {
                id: dataId,
                
                quantite_recu: dataQuantite,
              }, {
                headers: authHeader(), // Add authentication headers if required
              });
            
        
            // Commit the response data to the Vuex store (You can modify this depending on your mutation)
            commit('AJOUTER_HISTO_EQUIPEMENT', response.data);
            dispatch('getHistoAffectationEquipement');
            dispatch('getEquipementAffecte');

            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Equipement Valide',
              showConfirmButton: false,
              timer: 2000,
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

async AnnulationStock({ commit,dispatch }, { dataId}) {
        
          try {
            let response;
        
            // Check if the equipment already has a status, and if so, update it
            
              // If the status exists, perform an update
              response = await apiGuest.post(`/AnnulationStockParAgent`, {
                id: dataId
              }, {
                headers: authHeader(), // Add authentication headers if required
              });
            
        
            // Commit the response data to the Vuex store (You can modify this depending on your mutation)
            commit('AJOUTER_HISTO_EQUIPEMENT', response.data);
              dispatch('getHistoAffectationEquipement');
dispatch('getEquipementAffecte');
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Equipement Valide',
              showConfirmButton: false,
              timer: 2000,
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

    
  },
  getters: {
  
    
       getterGroupeEquipement(state) {
      return state.stateGroupeEquipement.sort((a, b) => (a.libelle < b.libelle) ? -1 : 1)
    },
    getterEquipement(state) {
      return state.equipements.sort((a, b) => (a.libelle < b.libelle) ? -1 : 1)
    },
      getterGpeTypeEquipement(state) {
      return state.gpeTypeEquipement.sort((a, b) => (a.libelle_type_equipement < b.libelle_type_equipement) ? -1 : 1)
    },
 getteraffectationEquipements(state) {
      return state.affectationEquipements.sort((a, b) => (a.libelle_equipement < b.libelle_equipement) ? -1 : 1)
    },
      
      getteragentEquipement(state) {
      return state.agentequipe.sort((a, b) => (a.nom_agent < b.nom_agent) ? -1 : 1)
    }, 
    getterHistoAffectationEquipements(state) {
      return state.HistoAffectationEquipements
    },  
   
  // error(state) {
  //   return state.error;
  // }
  }
};
export default role;