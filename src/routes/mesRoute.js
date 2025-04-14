
import connexion from "../page/connexion.vue"
import presentation from "../page/presentation.vue"
import Role from "../page/dossierGestionUtilisateur/Role.vue"
import Module from "../page/dossierGestionUtilisateur/Module.vue"
import RoleModule from "../page/dossierGestionUtilisateur/RoleModule.vue"
import utilisateur from "../page/dossierGestionUtilisateur/utilisateur.vue"
import TableauBord from "../layouts/TableauBord.vue"
import District from "../page/dossierParametrage/District.vue"
import medicament from "../page/dossierParametrage/medicament.vue"
import ZoneUtilisateur from "../page/dossierParametrage/ZoneUtilisateur.vue"
import menage from "../page/dossierParametrage/menage.vue"
import typePatient from "../page/dossierParametrage/typePatient.vue"
import detailPatient from "../page/dossierParametrage/detailPatient.vue"
import localiseZone from "../page/dossierParametrage/localiseZone.vue"
import vaccin from "../page/dossierParametrage/vaccin.vue"
import localisationChefFamille from "../page/dossierParametrage/localisationChefFamille.vue"
import Accueil from "../layouts/TableauBord2.vue"
import aireSanitaire from "../page/dossierParametrage/aireSanitaire.vue"
import zoneIntervention from "../page/dossierParametrage/zoneIntervention1.vue"
import equipement from "../page/GestionStock/equipement.vue"
import typeEquipement from "../page/GestionStock/typeEquipement.vue"
// import inventaireEquipement from "../page/GestionStock/inventaireEquipement.vue"
import AffectationEquipement from "../page/GestionStock/AffectationEquipement.vue"
import stockAsc from "../page/GestionStock/stockAsc.vue"
// import accueil from "../page/accueil.vue"
const gestionutilisateur = [
   {
        path: '/stockAsc',
        name:"stockAsc",
      component: stockAsc,
     
     },
  {
        path: '/AffectationEquipement',
        name:"AffectationEquipement",
      component: AffectationEquipement,
     
     },
  //  {
  //       path: '/inventaireEquipement',
  //       name:"inventaireEquipement",
  //     component: inventaireEquipement,
     
  //    },
   {
        path: '/typeEquipement',
        name:"typeEquipement",
      component: typeEquipement,
     
     },
  {
        path: '/equipement',
        name:"equipement",
      component: equipement,
     
     },
  {
        path: '/zoneIntervention',
        name:"zoneIntervention",
      component: zoneIntervention,
     
     },
    {
        path: '/aireSanitaire',
        name:"aireSanitaire",
      component: aireSanitaire,
      //   meta: { layout: "no-sidebar", requiresAuth: true },
     },
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
        path: '/District',
        name:"District",
        component: District
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