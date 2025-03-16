<template>
  <div>
    <Sidebar></Sidebar>
    <div id="content">
      <TheNavBar></TheNavBar>
      <div class="midde_cont">
        <div class="container-fluid">
          <!-- <titre></titre> -->
          <!-- <TableauBord></TableauBord> -->
          <slot />
        </div>
        <!-- <footer></footer> -->
      </div>
    </div>
  </div>
</template>
<script>
import Sidebar from "./Sidebar.vue";
import TheNavBar from "./TheNavBar.vue";
import TableauBord from "./TableauBord.vue";
// import footer from "./footer.vue";
export default {
  components: {
    Sidebar,
    TheNavBar,
    TableauBord,
    // footer,
  },
  data() {
    return {};
  },
};
</script>

<style></style>
