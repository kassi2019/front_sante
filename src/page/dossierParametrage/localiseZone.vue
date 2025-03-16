<template>
  <div>
    <div class="row column_title">
      <div class="col-md-12">
        <div class="page_title">
          <h2>Type patient</h2>
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
            <h6>
              Nbre d'enfants de 12 à 59 mois:<span>{{
                selectedLocation?.lat
              }}</span>
            </h6>
            <h6>
              Nbre d'Enfant de 0 à 11 mois:<span>{{
                selectedLocation?.lat
              }}</span>
            </h6>
            <h6>
              Nbre Femme enceinte recensé:<span>{{
                selectedLocation?.lat
              }}</span>
            </h6>
            <h6>
              Nbre total de Femme:<span>{{ selectedLocation?.lat }}</span>
            </h6>
            <h6>
              Nbre total d'enfant':<span>{{ selectedLocation?.lat }}</span>
            </h6>
            <h6>
              id::<span>{{ selectedLocation?.id }}</span>
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
    ...mapGetters(["gettersCarteZone"]),
  },
  async mounted() {
    await this.getCarteZone(); // Charge les données avant d'initialiser la carte
    this.initMap();

    // Récupérer l'instance du modal Bootstrap
    this.modalInstance = new bootstrap.Modal(
      document.getElementById("locationModal")
    );
  },
  methods: {
    ...mapActions(["getCarteZone"]),

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
      if (this.gettersCarteZone && this.gettersCarteZone.length > 0) {
        this.gettersCarteZone.forEach((loc) => {
          if (loc.lat && loc.lng) {
            const marker = L.marker([loc.lat, loc.lng]).addTo(map);
            marker.on("click", () => this.openModal(loc)); // Ouvre le modal au clic
          }
        });
      }
    },
  },
};
</script>

<style>
#map {
  width: 100%;
  height: 500px;
}
</style>
