<template>
  <div>
    <br /><br /><br />
    <!-- 
    <div class="row column_title">
      <div class="col-md-12">
        <div class="page_title">
          <h5 style="text-align: center !important">
            CARTE DES ZONES D'INTERVENTIONS DES AGENTS DE SANTE COMMUNAUTAIRE
          </h5>
        </div>
      </div>
    </div> -->
    <div class="row column_title">
      <div class="col-md-12">
        <div class="page_title">
          <h2>TABLEAU DE BORD</h2>
        </div>
      </div>
    </div>
    <div class="row column1">
      <div class="col-md-6 col-lg-2" style="cursor: pointer">
        <div
          class="full counter_section margin_bottom_30"
          style="cursor: pointer"
        >
          <!-- <div class="couter_icon">
            <div>
              <i class="fa fa-user yellow_color" style="font-size: 14px;"></i>
            </div>
          </div> -->
          <div class="counter_no" style="cursor: pointer">
            <div>
              <p
                class="total_no"
                style="text-align: center; font-weight: bolder"
              >
                {{ Enfantde0a11moisTotal }}
              </p>
              <p
                class="head_couter logo-text1"
                style="color: black; font-weight: bolder;text-align: center !important;"
              >
                Enfant de 0 à 11 mois
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-2" style="cursor: pointer">
        <div
          class="full counter_section margin_bottom_30"
          style="cursor: pointer"
        >
          <!-- <div class="couter_icon">
            <div>
              <i class="fa fa-clock-o blue1_color" style="font-size: 14px;"></i>
            </div>
          </div> -->
          <div class="counter_no">
            <div>
              <p
                class="total_no"
                style="text-align: center; font-weight: bolder"
              >
                {{ Enfantde12a59moisTotal }}
              </p>
              <p
                class="head_couter logo-text1"
                style="color: black; font-weight: bolder;text-align: center !important;"
              >
                Enfant de 12 à 59 mois
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-2" style="cursor: pointer">
        <div
          class="full counter_section margin_bottom_30"
          style="cursor: pointer"
        >
          <!-- <div class="couter_icon">
            <div>
              <i class="fa fa-cloud-download green_color" style="font-size: 14px;"></i>
            </div>
          </div> -->
          <div class="counter_no">
            <div>
              <p
                class="total_no"
                style="text-align: center; font-weight: bolder"
              >
                {{ FemmeenceinteTotal }}
              </p>
              <p
                class="head_couter logo-text1"
                style="color: black; font-weight: bolder;text-align: center !important;"
              >
                Femme Enceinte encours
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-2" style="cursor: pointer">
        <div
          class="full counter_section margin_bottom_30"
          style="cursor: pointer"
        >
          <!-- <div class="couter_icon">
            <div>
              <i class="fa fa-cloud-download green_color" style="font-size: 14px;"></i>
            </div>
          </div> -->
          <div class="counter_no">
            <div>
              <p
                class="total_no"
                style="text-align: center; font-weight: bolder"
              >
                {{ FemmeRecenseTotal }}
              </p>
              <p
                class="head_couter logo-text1"
                style="color: black; font-weight: bolder;text-align: center !important;"
              >
                Nbre total de Femme
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-2" style="cursor: pointer">
        <div
          class="full counter_section margin_bottom_30"
          style="cursor: pointer"
        >
          <!-- <div class="couter_icon">
            <div>
              <i class="fa fa-cloud-download green_color" style="font-size: 14px;"></i>
            </div>
          </div> -->
          <div class="counter_no">
            <div>
              <p
                class="total_no"
                style="text-align: center; font-weight: bolder"
              >
                {{ HommeRecenseTotal }}
              </p>
              <p
                class="head_couter logo-text1"
                style="color: black; font-weight: bolder;text-align: center !important;"
              >
                Nbre total d'Hommes
              </p>
            </div>
          </div>
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
            <h5 class="modal-title logo-text" id="locationModalLabel">
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

            <!-- <h6 class="info-row">
              <span>ID :</span>
              <span>{{ selectedLocation?.id }}</span>
            </h6> -->
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-danger"
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
    ...mapGetters(["gettersCarteZone", "getterpatient"]),
    HommeRecenseTotal() {
      return this.getterpatient.filter((qtreel) => qtreel.sexe == "M").length;
    },
    FemmeRecenseTotal() {
      return this.getterpatient.filter((qtreel) => qtreel.sexe == "F").length;
    },
    FemmeenceinteTotal() {
      return this.getterpatient.filter(
        (qtreel) => qtreel.type_patient_id == 2 && qtreel.encours == 0
      ).length;
    },
    Enfantde12a59moisTotal() {
      return this.getterpatient.filter(
        (qtreel) =>
          12 <= qtreel.age_en_jours &&
          qtreel.age_en_jours <= 59 &&
          qtreel.type_patient_id != 2
      ).length;
    },
    Enfantde0a11moisTotal() {
      return this.getterpatient.filter(
        (qtreel) => qtreel.age_en_jours <= 11 && qtreel.type_patient_id != 2
      ).length;
    },
    Enfantde12a59mois() {
      return (id) => {
        if (id != null && id != "") {
          return this.getterpatient.filter(
            (qtreel) =>
              qtreel.zone_intervention_id == id &&
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
              qtreel.zone_intervention_id == id &&
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
              qtreel.zone_intervention_id == id &&
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
            (qtreel) => qtreel.zone_intervention_id == id && qtreel.sexe == "F"
          ).length;
        }
      };
    },
    HommeRecense() {
      return (id) => {
        if (id != null && id != "") {
          return this.getterpatient.filter(
            (qtreel) => qtreel.zone_intervention_id == id && qtreel.sexe == "M"
          ).length;
        }
      };
    },
  },
  async mounted() {
    await this.getCarteZone(); // Charge les données avant d'initialiser la carte
    await this.getpatients();
    this.initMap();

    // Récupérer l'instance du modal Bootstrap
    this.modalInstance = new bootstrap.Modal(
      document.getElementById("locationModal")
    );
  },
  methods: {
    ...mapActions(["getCarteZone", "getpatients"]),

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
            
            // Ajouter un tooltip avec le nom de la localisation
            marker.bindTooltip(loc.name, {
              permanent: false, // S'affiche au survol
              direction: "top",
            });

            marker.on("click", () => this.openModal(loc)); // Ouvre le modal au clic
          }
        });
      }
    },
  },
};
</script>

<style scoped>
#map {
  width: 100%;
  height: 500px;
}
.logo-text {
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-size: 30px;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #005797;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  font-style: italic;
}

.logo-text1 {
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-size: 13px !important;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  font-style: italic;
}
.info-row {
  display: flex;
  justify-content: space-between;
  width: 100%; /* Pour s'assurer que la ligne prend toute la largeur */
  font-size: 16px; /* Ajuste la taille du texte si nécessaire */
  margin-bottom: 10px; /* Espacement entre les lignes */
}

.row.column1 {
  display: flex;
  justify-content: center; /* Centre horizontalement */
  flex-wrap: wrap; /* Permet le retour à la ligne si besoin */
  gap: 20px; /* Espacement entre les éléments */
}

.col-md-6.col-lg-2 {
  display: flex;
  justify-content: center; /* Centre chaque élément horizontalement */
  align-items: center; /* Centre verticalement */
}

.full.counter_section {
  width: 250px; /* Ajuste la largeur du cercle */
  height: 120px; /* Ajuste la hauteur du cercle */
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 80%; /* Rend le div complètement rond */
  background-color: #f8f9fa; /* Couleur de fond */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Ombre légère */
  text-align: center;
  padding: 10px;
  border: 1px solid #000 !important;
}
</style>
