<template>
  <div class="sidebar_blog_2">
    <h4 style="text-align: center">Cartographie</h4>
    <ul class="list-unstyled components">
      <!-- <li>
                        <a href="#element5" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle"><i class="fa fa-diamond purple_color"></i> <span>Elements</span></a>
                        <ul class="collapse list-unstyled" id="element5">
                           <li><a href="general_elements.html">> <span>General Elements</span></a></li>
                           <li><a href="media_gallery.html">> <span>Media Gallery</span></a></li>
                           <li><a href="icons.html">> <span>Icons</span></a></li>
                           <li><a href="invoice.html">> <span>Invoice</span></a></li>
                        </ul>
                     </li> -->
                     <!-- <li>
        <a href="" @click.prevent="affichePage('typePatient')"
          ><i class="fa fa-hand-o-right"></i> <span>Type de patient</span></a
        >
      </li> -->
      <li>
        <a href="" @click.prevent="affichePage('menage')"
          ><i class="fa fa-hand-o-right"></i> <span>Chef de famille</span></a
        >
      </li>
    
      <li style="background-color: #007b9a">
        <a href="" @click.prevent="affichePage('presentation')"
          ><i class="fa fa-eye"></i> <span>VOIR LES MODULES</span></a
        >
      </li>
    </ul>
  </div>
</template>

<script>
//import { useStore } from "vuex"; // Importation du store
import { mapActions } from "vuex";

export default {
  components: {},
  name: "Counter",

  user: {
    numero: "",
    password: "",
  },
  data() {
    return {};
  },
  created() {
    // this.id_module = localStorage.getItem("id_module");
  },
  computed: {
    //  nameUser() {
    //   let objLinea = localStorage.getItem("User");
    //   let objJson = JSON.parse(objLinea);
    //   return objJson.noms;
    // },
  },

  methods: {
    ...mapActions(["login"]),

    async affichePage(route_name) {
      this.$router.push({
        name: route_name,
      });
    },
    // Appeler une action pour récupérer l'utilisateur
  },
};
</script>

<style scoped>
li:hover {
  background-color: #5f8ca3 !important;
  font-weight: bold !important;
  font-size: 16px !important;
  font-family: Arial, sans-serif !important;
}
</style>
