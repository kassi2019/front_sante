// store/index.js
import { createStore } from 'vuex';
import utilisateur from './modules/utilisateur';

import role from './modules/role';  
import module from './modules/module';  
import roleModule from './modules/roleModule';  
import dictrict from './modules/dictrict';  
import medicament from './modules/medicament';
import zoneUtilisateur from './modules/zoneUtilisateur'; 
import chefMenage from './modules/chefMenage'; 
import typePatient from './modules/typePatient'; 
import patient from './modules/patient'; 
import vaccin from './modules/vaccin'; 
import aireSanitaire from './modules/aireSanitaire'; 
import zoneIntervention from './modules/zoneIntervention'; 
const store = createStore({
  modules: {
    utilisateur, 
    role,
    module,
    roleModule,
    dictrict,
    medicament,
    zoneUtilisateur,
    chefMenage,
    typePatient,
    patient,
    vaccin,
    aireSanitaire,
    zoneIntervention
  },
});

export default store;
