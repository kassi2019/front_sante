<template>
  <div class="loader-wrapper">
    <TailSpin
      v-if="loading"
      height="50"
      width="50"
      color="#00BFFF"
      ariaLabel="loading"
    />
  </div>
</template>

<script>
import { TailSpin } from "react-loader-spinner"; // Importer le spinner de react-loader-spinner

export default {
     components: {
    TailSpin,

  },
  name: "Loader",
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    },

    // props: ["loading"],
};
</script>

<style scoped>
.loader-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
