<script setup lang="ts">
import NavigationBar from "./NavigationBar.vue";
import SearchBox from "./SearchBox.vue";
</script>

<template>
  <section class="side-menu">
    <div class="side-menu-logo-box">
      <h1 class="side-menu-logo-text">TVmaze Vuer</h1>
    </div>

    <div class="side-menu-search-box">
      <SearchBox />
    </div>

    <div class="side-menu-genres-box">
      <header>
        <h2 class="side-menu-genres-title">Genres</h2>
      </header>
      <NavigationBar />
    </div>
  </section>
</template>

<style scoped>
.side-menu {
  max-height: 100%;
  padding: 48px 16px 48px 24px;
  display: flex;
  flex-direction: column;
  gap: 40px;

  .side-menu-logo-box {
    /* border: 5px solid lightyellow; */
    padding: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .side-menu-logo-text {
    font-size: 48px;
    font-weight: 700;
    font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  }

  .side-menu-search-box {
    /* border: 5px solid lightskyblue; */
    padding: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .side-menu-genres-box {
    /* border: 5px solid lightcoral; */
    padding: 8px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: auto;
  }

  .side-menu-genres-title {
    font-size: 32px;
    font-weight: 700;
    color: lightgrey;
  }
}
</style>
