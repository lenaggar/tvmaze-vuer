<script setup lang="ts">
import SideMenu from "./SideMenu.vue";
</script>

<template>
  <aside class="nav-box">
    <SideMenu />
  </aside>
</template>

<style scoped>
.nav-box {
  /* border: 5px solid lightpink; */
  flex-basis: 400px;
  flex-grow: 0;
  flex-shrink: 0;
}

@media screen and (max-width: 1000px) {
  .nav-box {
    display: none;
  }
}
</style>
