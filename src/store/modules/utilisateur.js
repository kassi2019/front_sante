// src/store/index.js
//import { createStore } from 'vuex';
import apiGuest from '../../request/AppRequest';
import authHeader from '../../services/auth-header';
import Swal from 'sweetalert2';  // Assurez-vous d'importer SweetAlert2
import router from '../../routes';
const isLoading = false; // Variable pour contrôler l'état de chargement// Importer le spinner
const utilisateur ={
  state: {
    count: 0, // Le compteur
    user: null,// L'utilisateur
    economique: [] ,
    isLoggedIn: !!localStorage.getItem('token'),
    user: localStorage.getItem('user'),
    loader: false, // Ajout du loader
    stateUtilisateur: [],
    stateModuleUtilisateurConnecter:[]
  },
  mutations: {
   SET_LOADER(state, value) {
    state.loader = value;
  },
    setUser(state, user) {
      state.user = user;
    },
  //  SET_CHAMP_VIDE_TRUE(state, user) {
  //     state.user = user;
  //   },
     SET_LISTE_PERSONNEL_RATTACHE_OPT(state, economique){
       state.economique = economique;
    },
     LOGOUT_USER  (state)  {
    state.isLoggedIn = false
   // state.user = user;
    },
      MODULE_UTILISATEUR_CONNECTER(state, user) {
      state.stateModuleUtilisateurConnecter = user;
    },
     AJOUTER_UTILISATEUR  (state, elementAjouter){
    state.stateUtilisateur.unshift(elementAjouter)
    },
      LISTE_UTILISATEUR(state, user) {
      state.stateUtilisateur = user;
    },
       MODIFIER_UTILISATEUR (state, elementModif){
    state.stateUtilisateur = state.stateUtilisateur.map(response => {

        if (response.id == elementModif.id) {
            response = { ...elementModif }
        }
        return response
    })
    },
        SUPPRIMER_UTILISATEUR(state, produitId) {
    state.stateUtilisateur = state.stateUtilisateur.filter(produit => produit.id !== produitId);
    },
  },
  
  actions: {
//permet d affiche les module de utilisateur connecter
       async getModuleUtilisateurConncte({ commit }) {
        // Activer le loader
        // commit('SET_LOADING', true);
    
        try {
            const resultat = await apiGuest.get('/listeModuleUtilisateurConnecter', { headers: authHeader() });
            
            // Mettre à jour les données dans le store
            commit('MODULE_UTILISATEUR_CONNECTER', resultat.data);
        } catch (error) {
            //console.log(error);
        } finally {
            // Désactiver le loader après l'appel API
            // commit('SET_LOADING', false);
        }
    },

//************************************************************

// permet de supprimer l utilisateur
async supprimerUtilisateur({ commit,dispatch }, id) {
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
  apiGuest.delete('/supprimerUtilisateur/' + id, { headers: authHeader() })
     commit('MODIFIER_UTILISATEUR', id)
     dispatch('getListeUtilisateur');
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
//**************************************************** */
    //permet de faire la modification de utilisateur
    async modifierUtilisateur({ commit,dispatch }, nouveau) {
  apiGuest.put("/modifierUtilisateur/" + nouveau.id, nouveau, { headers: authHeader() })
    .then(response => {
      commit("SUPPRIMER_UTILISATEUR", response.data);
      dispatch('getListeUtilisateur');
  Swal.fire({
                 position: "top-end",
                 icon: "success",
                 title: "Modification réussie",
                 showConfirmButton: false,
                 timer: 1500
               });
    });
},

//***********************************************
    // permet de voir la liste des utilisateur
    

       async getListeUtilisateur({ commit }) {
        // Activer le loader
        // commit('SET_LOADING', true);
    
        try {
            const resultat = await apiGuest.get('/listeUtilisateur', { headers: authHeader() });
            
            // Mettre à jour les données dans le store
            commit('LISTE_UTILISATEUR', resultat.data);
        } catch (error) {
            //console.log(error);
        } finally {
            // Désactiver le loader après l'appel API
            // commit('SET_LOADING', false);
        }
    },
    


//***********************************************
    // permet de se deconnecter
async logoutUser({ commit }) {
        Swal.fire({
           title: "Êtes-vous sûr de",
    text: " vouloir quitter l'application ?",
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'OUI'
        }).then((result) => {
          if (result.isConfirmed) {
        localStorage.removeItem('token');
      commit('LOGOUT_USER');
      router.push({ name: 'connexion' });
             Swal.fire({
                       position: "top-end",
                       icon: "success",
                       title: "Vous êtes maintenant déconnecté(e).",
                       showConfirmButton: false,
                       timer: 1500
                     });
          }
        });
    },

//********************************************

// permet de ce connecter

    async login({ commit }, user) {
  try {
    // Vérification des champs vides
    if (!user.numero || !user.password) {
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

    // Appel à l'API pour l'authentification
    const response = await apiGuest.post('/login', {
      numero: user.numero,
      password: user.password,
    });


    // Si la réponse est valide, traiter les données
    if (response.data && response.data.token) {
      localStorage.setItem('token', JSON.stringify(response.data.token));
      localStorage.setItem('User', JSON.stringify(response.data.user));
      commit('setUser', response.data.user);

      // Affichage d'une alerte de succès
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Connexion réussie",
        showConfirmButton: false,
        timer: 1500
      });

      // Rediriger vers une autre page
      router.push({ name: 'presentation' });
    } else {
      throw new Error("Réponse de l'API invalide");
    }
  } catch (error) {
    // Gestion des erreurs
    console.error("Login failed:", error);
  

    // Affichage d'un message d'erreur
    if (error.response && error.response.data) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: error.response.data.message || "Mot de passe ou numéro incorrect !",
        confirmButtonText: 'OK',
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: "Une erreur est survenue. Veuillez réessayer.",
        confirmButtonText: 'OK',
      });
    }
      }
      
},
//***************************************************************************** */

  
// permet de creer un utilisateur

async creationUtilisateur({ commit,dispatch }, objet) {
      // try {
        if (!objet.noms || !objet.prenoms || !objet.password || !objet.numero) {
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
  const response = await apiGuest.post('/register', objet);
         commit('AJOUTER_UTILISATEUR', response.data); // Sauvegarder le produit dans le store
  dispatch('getListeUtilisateur');

          Swal.fire({
                 position: "top-end",
                 icon: "success",
                 title: "Enregistrement réussie",
                 showConfirmButton: false,
                 timer: 1500
               });
       //}.catch();
  },
  },
  getters: {

    getterUtilisateur(state) {
      return state.stateUtilisateur;
    },
     getterModuleUtilisateurConneceter(state) {
      return state.stateModuleUtilisateurConnecter;
    },

  }
};
export default utilisateur;