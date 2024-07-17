<script setup lang="ts">
import MobileMenu from "./components/MobileMenu.vue";
import DesktopMenu from "./components/DesktopMenu.vue";
import { useMediaQuery } from "./composables/useMediaQuery";

const isMobile = useMediaQuery("(max-width: 600px)");
</script>

<template>
  <div class="app">
    <MobileMenu v-if="isMobile" />
    <DesktopMenu v-else />

    <main class="main-box">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app {
  margin: auto;
  max-width: 1440px;
  height: 100vh;
  padding: 16px;

  display: flex;
  gap: 16px;
}

.main-box {
  /* border: 5px solid lightgreen; */
  flex-grow: 1;
  overflow-x: auto;
  position: relative;
}

@media screen and (max-width: 600px) {
  .main-box {
    padding: 16px;
  }
}
</style>
