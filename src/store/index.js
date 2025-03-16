// store/index.js
import { createStore } from 'vuex';
import utilisateur from './modules/utilisateur';

import role from './modules/role';  
import module from './modules/module';  
import roleModule from './modules/roleModule';  
import zoneIntervention from './modules/zoneIntervention';  
import medicament from './modules/medicament';
import zoneUtilisateur from './modules/zoneUtilisateur'; 
import chefMenage from './modules/chefMenage'; 
import typePatient from './modules/typePatient'; 
import patient from './modules/patient'; 
import vaccin from './modules/vaccin'; 
const store = createStore({
  modules: {
    utilisateur, 
    role,
    module,
    roleModule,
    zoneIntervention,
    medicament,
    zoneUtilisateur,
    chefMenage,
    typePatient,
    patient,
    vaccin
  },
});

export default store;
