// src/store/index.js
//import { createStore } from 'vuex';
import apiGuest from '../../request/AppRequest';
import Swal from 'sweetalert2';  // Assurez-vous d'importer SweetAlert2
import authHeader from '../../services/auth-header';

const StockDistrict ={
  state: {
    stateListeEquipementSuperviseur: [],
       stateListeEquipementAsc:[],
    stateListeStockSuperviseur: [],
 stateTypeEquipementParSUp:[],
    StateEquipementParTypeProduit: [] ,
        stateStockDistricts: [],
    stateTypeEquipementStockDistricts: [],
    stateSuperviseurParDistrict: [],
     stateEquipementDistrictParType:[],
  error: null     // Erreur de l'enregistrement
  },

  mutations: {
           SET_LISTE_EQUIPEMENT_ASC(state, StateModule) {
    state.stateListeEquipementAsc = StateModule;
    },
          SET_TYPE_EQUIPEMENT_SUPERVISEUR(state, StateModule) {
    state.stateTypeEquipementParSUp = StateModule;
    },
   SUPPRIMER_STOCK_SUPERVISEUR(state, produitId) {
    state.stateListeStockSuperviseur = state.stateListeStockSuperviseur.filter(produit => produit.id !== produitId);
    },
         SET_LISTE_EQUIPEMENT_SUPERVISEUR(state, StateModule) {
    state.stateListeEquipementSuperviseur = StateModule;
    },
      AJOUTER_STOCK_SUPERVISEUR (state, elementAjouter){
    state.stateListeStockSuperviseur.unshift(elementAjouter)
        },
        SET_EQUIPEMENT_DISTRICT_PAR_TYPE(state, StateModule) {
    state.stateEquipementDistrictParType = StateModule;
    },
        SET_SUPERVISEUR_PAR_DISTRICT(state, StateModule) {
    state.stateSuperviseurParDistrict = StateModule;
    },
         SET_LISTE_STOCK_DISTRICT(state, StateModule) {
    state.stateStockDistricts = StateModule;
    },
    SET_EQUIPEMENT_PAR_TYPE_EQUIPEMENT(state, StateModule) {
    state.StateEquipementParTypeProduit = StateModule;
    },
   SET_TYPE_EQUIPEMENT_STOCK_DISTRICT(state, StateModule) {
    state.stateTypeEquipementStockDistricts = StateModule;
    },
 SET_ERROR(state, error) {
    state.error = error;
    },
 AJOUTER_STOCK_DISTRICT (state, elementAjouter){
    state.stateStockDistricts.unshift(elementAjouter)
        },
 
   MODIFIER_STOCK_DISTRICT (state, elementModif){
    state.stateStockDistricts = state.stateStockDistricts.map(response => {

        if (response.id == elementModif.id) {
            response = { ...elementModif }
        }
        return response
    })
    },
     SUPPRIMER_STOCK_DISTRICT(state, produitId) {
    state.stateStockDistricts = state.stateStockDistricts.filter(produit => produit.id !== produitId);
    },
  },
  
  actions: {
      
async getTypeEquipementSuperviseur({ commit }) {

  try {
    const { data } = await apiGuest.get('/listeTypeEquipementStockSuperviseur', {
      headers: authHeader(),
    });

    commit('SET_TYPE_EQUIPEMENT_SUPERVISEUR', data);
  } catch (error) {
    console.error("Erreur lors du chargement liste des equipement des superviseur :", error);

    // Optionnel : notifier l'utilisateur
    Swal.fire({
      icon: 'error',
      title: 'Erreur',
      text: 'Impossible de charger la liste des equipement des superviseur.',
      confirmButtonText: 'OK',
    });
  } finally {
  }
}, 


   async getlisteEquipementDesAsc({ commit }) {

  try {
    const { data } = await apiGuest.get('/listeEquipementDesAsc', {
      headers: authHeader(),
    });

    commit('SET_LISTE_EQUIPEMENT_ASC', data);
  } catch (error) {
    console.error("Erreur lors du chargement liste des equipement des superviseur :", error);

    // Optionnel : notifier l'utilisateur
    Swal.fire({
      icon: 'error',
      title: 'Erreur',
      text: 'Impossible de charger la liste des equipement des superviseur.',
      confirmButtonText: 'OK',
    });
  } finally {
  }
},   
async getListeEquipementSuperviseur({ commit }) {

  try {
    const { data } = await apiGuest.get('/equipementDesSuperviseur', {
      headers: authHeader(),
    });

    commit('SET_LISTE_EQUIPEMENT_SUPERVISEUR', data);
  } catch (error) {
    console.error("Erreur lors du chargement liste des equipement des superviseur :", error);

    // Optionnel : notifier l'utilisateur
    Swal.fire({
      icon: 'error',
      title: 'Erreur',
      text: 'Impossible de charger la liste des equipement des superviseur.',
      confirmButtonText: 'OK',
    });
  } finally {
  }
},   
    
async getSuperviseurParDistrict({ commit }) {

  try {
    const { data } = await apiGuest.get('/ListeSuperviseurParDistrict', {
      headers: authHeader(),
    });

    commit('SET_SUPERVISEUR_PAR_DISTRICT', data);
  } catch (error) {
    console.error("Erreur lors du chargement liste des superviseu :", error);

    // Optionnel : notifier l'utilisateur
    Swal.fire({
      icon: 'error',
      title: 'Erreur',
      text: 'Impossible de charger la liste des superviseur.',
      confirmButtonText: 'OK',
    });
  } finally {
  }
},  





      async supprimerStockDistrict({ commit,dispatch }, id) {
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
        apiGuest.delete('/supprimerStockDistrict/' + id, { headers: authHeader() })
           commit('SUPPRIMER_STOCK_DISTRICT', id)
              dispatch('getTypeEquipementDansStockDistrict');
                 dispatch('getListeStockDistrict');
            
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
      
      
      
      
      
      
async modifierStockDistrict({ commit, dispatch }, nouveau) {
  if (!nouveau.id) {
    console.error("ID manquant pour la mise à jour.");
    return;
  }

  try {
    const response = await apiGuest.put(`/updateStockDistrict/${nouveau.id}`, nouveau, {
      headers: authHeader(),
    });

    commit("MODIFIER_STOCK_DISTRICT", response.data);

    // Mise à jour des listes après modification
    await dispatch('getTypeEquipementDansStockDistrict');
    await dispatch('getListeStockDistrict');

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Modification réussie",
      showConfirmButton: false,
      timer: 1500,
    });
  } catch (error) {
    console.error("Erreur lors de la modification du stock :", error);

    Swal.fire({
      icon: "error",
      title: "Erreur",
      text: "Une erreur est survenue lors de la modification du stock.",
      confirmButtonText: "OK",
    });
  }
},

      



  async getListeStockDistrict({ commit }) {
  // Activer le loader si besoin
  // commit('SET_LOADING', true);

  try {
    const { data } = await apiGuest.get('/listeStockDistrict', {
      headers: authHeader(),
    });

    commit('SET_LISTE_STOCK_DISTRICT', data);
  } catch (error) {
    console.error("Erreur lors du chargement des types d'équipement :", error);

    // Optionnel : notifier l'utilisateur
    Swal.fire({
      icon: 'error',
      title: 'Erreur',
      text: 'Impossible de charger la liste stock district.',
      confirmButtonText: 'OK',
    });
  } finally {
    // Désactiver le loader si activé
    // commit('SET_LOADING', false);
  }
},    
      
      
  
  
  
  
async getTypeEquipementDansStockDistrict({ commit }) {
  // Activer le loader si besoin
  // commit('SET_LOADING', true);

  try {
    const { data } = await apiGuest.get('/listeTypeEquipementDansStockDistrict', {
      headers: authHeader(),
    });

    commit('SET_TYPE_EQUIPEMENT_STOCK_DISTRICT', data);
  } catch (error) {
    console.error("Erreur lors du chargement des types d'équipement :", error);

    // Optionnel : notifier l'utilisateur
    Swal.fire({
      icon: 'error',
      title: 'Erreur',
      text: 'Impossible de charger les types d\'équipement.',
      confirmButtonText: 'OK',
    });
  } finally {
    // Désactiver le loader si activé
    // commit('SET_LOADING', false);
  }
},

  async getEquipementParTypeProduit({ commit }, objet) {
  
      try {
          const resultat = await apiGuest.get('/afficheEquipementParTypeEquipement/'+ objet.typeEquipement, { headers: authHeader() });
          // Mettre à jour les données dans le store
          commit('SET_EQUIPEMENT_PAR_TYPE_EQUIPEMENT', resultat.data);
      } catch (error) {
        
      }
      },
   

  
  
  
  
   async enregistrerStockDistrict({ commit,dispatch }, objet) {
  const champsRequis = ['type_equipement_id', 'equipement_id','quantite', 'numerolot', 'date_expiration'];
  const champsManquants = champsRequis.filter(champ => !objet[champ]);

  if (champsManquants.length > 0) {
    commit('SET_CHAMP_VIDE_TRUE');
    Swal.fire({
      icon: 'error',
      title: 'Champs vides',
      text: `Veuillez remplir tous les champs requis : ${champsManquants.join(', ')}`,
      confirmButtonText: 'OK',
    });
    return;
  }

  try {
    const response = await apiGuest.post('/enregistrementStockDistrict', objet, {
      headers: authHeader(),
    });

    commit('AJOUTER_STOCK_DISTRICT', response.data);
      dispatch('getTypeEquipementDansStockDistrict');
        dispatch('getListeStockDistrict');
      
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Enregistrement réussi',
      showConfirmButton: false,
      timer: 1500,
    });
  } catch (error) {
    const messageErreur = error?.response?.data?.message || "Une erreur est survenue lors de l'enregistrement.";
    
    Swal.fire({
      icon: 'error',
      title: 'Erreur',
      text: messageErreur,
      confirmButtonText: 'OK',
    });

    console.error("Erreur API :", error);
    return;
  }
},


   
   
   
   
     async getEquipementDuDistrictParType({ commit }, objet) {
  
      try {
          const resultat = await apiGuest.get('/equipementDuDistrictParType/'+ objet.typeEquipement, { headers: authHeader() });
          // Mettre à jour les données dans le store
          commit('SET_EQUIPEMENT_DISTRICT_PAR_TYPE', resultat.data);
      } catch (error) {
        
      }
    },
     
     
     
     
    async enregistrerStockSuperviseur({ commit, dispatch }, objet) {
      if (objet.valeur == 2) {
              const champsRequis = ['type_equipement_id', 'equipement_id','quantite', 'numerolot'];
  const champsManquants = champsRequis.filter(champ => !objet[champ]);

  if (champsManquants.length > 0) {
    commit('SET_CHAMP_VIDE_TRUE');
    Swal.fire({
      icon: 'error',
      title: 'Champs vides',
      text: `Veuillez remplir tous les champs requis : ${champsManquants.join(', ')}`,
      confirmButtonText: 'OK',
    });
    return;
  }
          }


  try {
    const response = await apiGuest.post('/enregistrementStockSuperviseur', objet, {
      headers: authHeader(),
    });

    commit('AJOUTER_STOCK_SUPERVISEUR', response.data);
      dispatch('getSuperviseurParDistrict');
        dispatch('getListeEquipementSuperviseur');
      
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Enregistrement réussi',
      showConfirmButton: false,
      timer: 1500,
    });
  } catch (error) {
    const messageErreur = error?.response?.data?.message || "Une erreur est survenue lors de l'enregistrement.";
    
    Swal.fire({
      icon: 'error',
      title: 'Erreur',
      text: messageErreur,
      confirmButtonText: 'OK',
    });

    console.error("Erreur API :", error);
    return;
  }
    },
    



       async enregistrerStockAsc({ commit, dispatch }, objet) {
      if (objet.valeur == 2) {
              const champsRequis = ['type_equipement_id', 'equipement_id','quantite', 'numerolot'];
  const champsManquants = champsRequis.filter(champ => !objet[champ]);

  if (champsManquants.length > 0) {
    commit('SET_CHAMP_VIDE_TRUE');
    Swal.fire({
      icon: 'error',
      title: 'Champs vides',
      text: `Veuillez remplir tous les champs requis : ${champsManquants.join(', ')}`,
      confirmButtonText: 'OK',
    });
    return;
  }
          }


  try {
    const response = await apiGuest.post('/enregistrementStockSuperviseur', objet, {
      headers: authHeader(),
    });

    commit('AJOUTER_STOCK_SUPERVISEUR', response.data);
      dispatch('getSuperviseurParDistrict');
        dispatch('getlisteEquipementDesAsc');
      
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Enregistrement réussi',
      showConfirmButton: false,
      timer: 1500,
    });
  } catch (error) {
    const messageErreur = error?.response?.data?.message || "Une erreur est survenue lors de l'enregistrement.";
    
    Swal.fire({
      icon: 'error',
      title: 'Erreur',
      text: messageErreur,
      confirmButtonText: 'OK',
    });

    console.error("Erreur API :", error);
    return;
  }
    },
    async supprimerStockSuperviseur({ commit,dispatch }, id) {
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
        apiGuest.delete('/supprimerEquipementSup/' + id, { headers: authHeader() })
           commit('SUPPRIMER_STOCK_SUPERVISEUR', id)
            dispatch('getSuperviseurParDistrict');
        dispatch('getListeEquipementSuperviseur');
            dispatch('getListeEquipementSuperviseur');
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
  },
  getters: {
    
     getterListeEquipementAsc(state) {
      return state.stateListeEquipementAsc.sort((a, b) => (a.libelle < b.libelle) ? -1 : 1)
    },
           getterTypeEquipementParSUp(state) {
      return state.stateTypeEquipementParSUp.sort((a, b) => (a.libelle < b.libelle) ? -1 : 1)
    },
         getterListeEquipementSuperviseur(state) {
      return state.stateListeEquipementSuperviseur.sort((a, b) => (a.libelle < b.libelle) ? -1 : 1)
    },
       getterEquipementDistrictParType(state) {
      return state.stateEquipementDistrictParType.sort((a, b) => (a.libelle < b.libelle) ? -1 : 1)
    },
    getterEquipementParTypeProduit(state) {
      return state.StateEquipementParTypeProduit.sort((a, b) => (a.libelle < b.libelle) ? -1 : 1)
    },
      
 getterTypeEquipementStockDistricts(state) {
      return state.stateTypeEquipementStockDistricts.sort((a, b) => (a.libelle_type_equipement < b.libelle_type_equipement) ? -1 : 1)
    },
    
  getterStockDistricts(state) {
      return state.stateStockDistricts.sort((a, b) => (a.quantite < b.quantite) ? -1 : 1)
    },
  getterSuperviseurParDistrict(state) {
      return state.stateSuperviseurParDistrict.sort((a, b) => (a.nom_prenoms < b.nom_prenoms) ? -1 : 1)
    },
 
  error(state) {
    return state.error;
  }
  }
};
export default StockDistrict;