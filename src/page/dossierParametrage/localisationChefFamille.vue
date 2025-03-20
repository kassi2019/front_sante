<template>
  <div>
    <br /><br /><br />
    <div class="row column_title">
      <div class="col-md-12">
        <div class="page_title">
          <h1 style="text-align: center !important">
            LOCALISATION DES CHEF DE FAMILLE
          </h1>
        </div>
      </div>
    </div>

    <div>
      <div class="col-md-12">
        <div class="white_shd full margin_bottom_30">
          <div id="map-container">
            <div id="map"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Bootstrap -->
    <div
      class="modal fade"
      id="locationModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="locationModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="locationModalLabel">
              {{ selectedLocation?.name }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <h6 class="info-row">
              <span>Nbre d'Enfants de 0 à 11 mois </span>
              <span>{{ Enfantde0a11mois(selectedLocation?.id) }}</span>
            </h6>
            <h6 class="info-row">
              <span>Nbre d'enfants de 12 à 59 mois </span>
              <span>{{ Enfantde12a59mois(selectedLocation?.id) }}</span>
            </h6>

            <h6 class="info-row">
              <span>Nbre Femme enceinte encours </span>
              <span>{{ Femmeenceinte(selectedLocation?.id) }}</span>
            </h6>

            <h6 class="info-row">
              <span>Nbre Total de Femmes </span>
              <span>{{ FemmeRecense(selectedLocation?.id) }}</span>
            </h6>

            <h6 class="info-row">
              <span>Nbre Total d'Hommes </span>
              <span>{{ HommeRecense(selectedLocation?.id) }}</span>
            </h6>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";

export default {
  data() {
    return {
      selectedLocation: null, // Stocke la localisation sélectionnée
      modalInstance: null, // Instance du modal Bootstrap
    };
  },
  computed: {
    ...mapGetters(["getterCarteChefFamille", "getterpatient"]),

    Enfantde12a59mois() {
      return (id) => {
        if (id != null && id != "") {
          return this.getterpatient.filter(
            (qtreel) =>
              qtreel.chef_famille_id == id &&
              12 <= qtreel.age_en_jours <= 59 &&
              qtreel.type_patient_id != 2
          ).length;
        }
      };
    },
    Enfantde0a11mois() {
      return (id) => {
        if (id != null && id != "") {
          return this.getterpatient.filter(
            (qtreel) =>
              qtreel.chef_famille_id == id &&
              qtreel.age_en_jours <= 11 &&
              qtreel.type_patient_id != 2
          ).length;
        }
      };
    },
    Femmeenceinte() {
      return (id) => {
        if (id != null && id != "") {
          return this.getterpatient.filter(
            (qtreel) =>
              qtreel.chef_famille_id == id &&
              qtreel.type_patient_id == 2 &&
              qtreel.encours == 0
          ).length;
        }
      };
    },
    FemmeRecense() {
      return (id) => {
        if (id != null && id != "") {
          return this.getterpatient.filter(
            (qtreel) => qtreel.chef_famille_id == id && qtreel.sexe == "F"
          ).length;
        }
      };
    },
    HommeRecense() {
      return (id) => {
        if (id != null && id != "") {
          return this.getterpatient.filter(
            (qtreel) => qtreel.chef_famille_id == id && qtreel.sexe == "M"
          ).length;
        }
      };
    },
  },
  async mounted() {
    await this.getCarteChefFamille(); // Charge les données avant d'initialiser la carte
    await this.getpatients();
    this.initMap();

    // Récupérer l'instance du modal Bootstrap
    this.modalInstance = new bootstrap.Modal(
      document.getElementById("locationModal")
    );
  },
  methods: {
    ...mapActions(["getCarteChefFamille", "getpatients"]),

    openModal(location) {
      this.selectedLocation = location; // Stocker les infos
      this.modalInstance.show(); // Afficher le modal Bootstrap
    },

    initMap() {
      const map = L.map("map").setView([7.5, -5.0], 7);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      // Charger les frontières de la Côte d'Ivoire
      const geojsonUrl =
        "https://raw.githubusercontent.com/johan/world.geo.json/master/countries/CIV.geo.json";
      fetch(geojsonUrl)
        .then((response) => response.json())
        .then((data) => {
          L.geoJSON(data, {
            style: {
              color: "",
              weight: 2,
              fillOpacity: 0,
            },
          }).addTo(map);
        });

      // Vérifier si des localisations sont disponibles
      this.getterCarteChefFamille.forEach((loc) => {
        if (loc.lat && loc.lng) {
          const marker = L.marker([loc.lat, loc.lng])
            .addTo(map)
            .bindTooltip(loc.name, { permanent: false, direction: "top" });

          marker.on("click", () => this.openModal(loc)); // Ouvre le modal au clic
        }
      });
    },
  },
};
</script>

<style scoped>
#map {
  width: 100%;
  height: 500px;
}
.info-row {
  display: flex;
  justify-content: space-between;
  width: 100%; /* Pour s'assurer que la ligne prend toute la largeur */
  font-size: 16px; /* Ajuste la taille du texte si nécessaire */
  margin-bottom: 10px; /* Espacement entre les lignes */
}
</style>
