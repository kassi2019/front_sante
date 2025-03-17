import { createApp } from 'vue'
import TheNoSidebar from "./layouts/TheNoSidebar.vue"
import TheDefault from "./layouts/TheDefault.vue"
import "vue3-form-wizard/dist/style.css";
import Vue3FormWizard from "vue3-form-wizard";
import "vue-search-select/dist/VueSearchSelect.css"
import "vue3-treeselect/dist/vue3-treeselect.css";
import App from './App.vue'
import router from './routes/index'
 import store from './store'
const app = createApp(App)
app.component('default-layout', TheDefault)
app.component('no-sidebar-layout', TheNoSidebar)
app.use(Vue3FormWizard);
// createApp(App).mount('#app')
app.use(store);
app.use(router);
app.mount('#app');