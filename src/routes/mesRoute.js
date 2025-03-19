
import connexion from "../page/connexion.vue"
import presentation from "../page/presentation.vue"
import Role from "../page/dossierGestionUtilisateur/Role.vue"
import Module from "../page/dossierGestionUtilisateur/Module.vue"
import RoleModule from "../page/dossierGestionUtilisateur/RoleModule.vue"
import utilisateur from "../page/dossierGestionUtilisateur/utilisateur.vue"
import TableauBord from "../layouts/TableauBord.vue"
import ZoneIntervention from "../page/dossierParametrage/ZoneIntervention.vue"
import medicament from "../page/dossierParametrage/medicament.vue"
import ZoneUtilisateur from "../page/dossierParametrage/ZoneUtilisateur.vue"
import menage from "../page/dossierParametrage/menage.vue"
import typePatient from "../page/dossierParametrage/typePatient.vue"
import detailPatient from "../page/dossierParametrage/detailPatient.vue"
import localiseZone from "../page/dossierParametrage/localiseZone.vue"
import vaccin from "../page/dossierParametrage/vaccin.vue"
import localisationChefFamille from "../page/dossierParametrage/localisationChefFamille.vue"
import Accueil from "../layouts/TableauBord2.vue"
// import accueil from "../page/accueil.vue"
const gestionutilisateur = [
  {
        path: '/TableauBord',
        name:"TableauBord",
      component: TableauBord,
      //   meta: { layout: "no-sidebar", requiresAuth: true },
     },
  {
        path: '/localisationChefFamille',
        name:"localisationChefFamille",
      component: localisationChefFamille,
      //   meta: { layout: "no-sidebar", requiresAuth: true },
     },
   {
        path: '/vaccin',
        name:"vaccin",
      component: vaccin,
      //   meta: { layout: "no-sidebar", requiresAuth: true },
     },
   {
        path: '/localiseZone',
        name:"localiseZone",
      component: localiseZone,
      //   meta: { layout: "no-sidebar", requiresAuth: true },
     },
     {
    path: "/detailPatient/:id",
    name: "detailPatient",
    component: detailPatient,
  },
   {
        path: '/typePatient',
        name:"typePatient",
      component: typePatient,
      //   meta: { layout: "no-sidebar", requiresAuth: true },
     },
   {
        path: '/menage',
        name:"menage",
      component: menage,
      //   meta: { layout: "no-sidebar", requiresAuth: true },
     },
   {
        path: '/ZoneUtilisateur',
        name:"ZoneUtilisateur",
        component: ZoneUtilisateur
     },
   {
        path: '/medicament',
        name:"medicament",
        component: medicament
     },
 {
        path: '/ZoneIntervention',
        name:"ZoneIntervention",
        component: ZoneIntervention
     },
   {
        path: '/utilisateur',
        name:"utilisateur",
        component: utilisateur
     },
   {
        path: '/RoleModule',
        name:"RoleModule",
        component: RoleModule
     },
   {
        path: '/Module',
        name:"Module",
        component: Module
     },
     {
        path: '/Role',
        name:"Role",
        component: Role
     },
   
   {
        path: '/presentation',
        name:"presentation",
      component: presentation,
        meta: { layout: "no-sidebar", requiresAuth: true },
     },
    
  {
        path: '/connexion',
        name:"connexion",
     component: connexion,
        meta: { layout: "no-sidebar", requiresAuth: true },
     },
{
        path: '/Accueil',
        name:"Accueil",
        component: Accueil,
       //meta: { layout: "no-sidebar", requiresAuth: true },
     },
  
 ]

 export default gestionutilisateur;