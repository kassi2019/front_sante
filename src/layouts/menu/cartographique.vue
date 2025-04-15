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

      <!-- <li>
        <a href="" @click.prevent="affichePage('inventaireEquipement')"
          ><i class="fa fa-hand-o-right"></i>
          <span>Inventaire d'équipement ASC</span></a
        >
      </li> -->

      <li >
        <a href="" @click.prevent="affichePage('menage')"
          ><i class="fa fa-hand-o-right"></i> <span style="font-size: 17px !important;font-weight: bolder;font-family:Georgia, 'Times New Roman', Times, serif;">Ménages</span></a
        >
      </li>
      <!-- <li v-else-if="idrole == 7">
        <a href="" @click.prevent="affichePage('menage')"
          ><i class="fa fa-hand-o-right"></i> <span>Liste des ménages</span></a
        >
      </li>
      <li v-else data-bs-toggle="modal" data-bs-target="#staticBackdrop2">
        <a href="" data-bs-toggle="modal" data-bs-target="#staticBackdrop2"
          ><i class="fa fa-hand-o-right"></i> <span>Liste des ménages</span></a
        >
      </li> -->

      <!-- <li>
        <a href="" @click.prevent="affichePage('localisationChefFamille')"
          ><i class="fa fa-hand-o-right"></i> <span>Carte des ménages</span></a
        >
      </li>
      <li>
        <a href="" @click.prevent="affichePage('localiseZone')"
          ><i class="fa fa-hand-o-right"></i> <span>Carte districts</span></a
        >
      </li>
      <li>
        <a href="" @click.prevent="affichePage('localiseZone')"
          ><i class="fa fa-hand-o-right"></i>
          <span>Carte aires sanitaire</span></a
        >
      </li>
      <li>
        <a href="" @click.prevent="affichePage('localiseZone')"
          ><i class="fa fa-hand-o-right"></i>
          <span>Carte zones d'interventions</span></a
        >
      </li> -->
      <li style="background-color: #007b9a">
        <a href="" @click.prevent="affichePage('presentation')"
          ><i class="fa fa-eye"></i> <span>VOIR MODULES</span></a
        >
      </li>
    </ul>
  </div>
</template>

<script>
//import { useStore } from "vuex"; // Importation du store
import { mapActions, mapGetters } from "vuex";

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
    ...mapGetters([
      "getterRole",
      "loading",
      "getterHistoAffectationEquipements",
    ]),
    idUser() {
      let objLinea = localStorage.getItem("User");
      let objJson = JSON.parse(objLinea);
      return objJson.id;
    },
    idrole() {
      let objLinea = localStorage.getItem("User");
      let objJson = JSON.parse(objLinea);
      return objJson.id_roles;
    },
    AfficheIdUtilisateur() {
      return ($id) => {
        if ($id != null && $id != "") {
          const qtereel = this.getterHistoAffectationEquipements.find(
            (qtreel) => qtreel.agent_id == $id && qtreel.status == 1
          );

          if (qtereel) {
            return qtereel.agent_id;
          }
          return "0";
        }
      };
    },
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
