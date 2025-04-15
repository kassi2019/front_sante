<template>
  <div id="app">
    <component :is="layout">
      <transition name="fade" mode="out-in">
        <div><router-view></router-view></div>
      </transition>
    </component>
  </div>
</template>

<script>
const default_layout = "default";
export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || default_layout) + "-layout";
    },
  },
  name: "App",
  data() {
    return {};
  },
  methods: {},
};
</script>

<style>
fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
table,
th,
td {
  border: 1px solid #000; /* couleur noire */
  border-collapse: collapse;
font-weight: bolder;font-family:Georgia, 'Times New Roman', Times, serif;
}

</style>
