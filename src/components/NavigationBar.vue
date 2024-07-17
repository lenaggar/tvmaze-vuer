<script setup lang="ts">
import { RouterLink } from "vue-router";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";

import { showStore } from "../store";

const store = showStore();
</script>

<template>
  <nav class="genres-list">
    <RouterLink
      v-for="{ count, genre } of store.genresWithCount"
      :key="genre"
      :to="`/genres/${genre}`"
      class="genre-item"
      :class="{ active: $route.params.genreId === genre }"
      active-class="active"
    >
      <span class="genre-title">
        {{ genre }}
      </span>
      <span class="genre-count"> ({{ count }})</span>
    </RouterLink>
  </nav>
</template>

<style scoped>
.genres-list {
  display: flex;
  flex-direction: column;
  padding-left: 24px;
  overflow-y: auto;
}

.genre-item {
  color: white;
  padding: 6px 0;

  &:hover {
    color: lightsteelblue;
  }

  &.active {
    color: lightsteelblue;
  }
}

.genre-title {
  font-size: 20px;
  text-transform: capitalize;
}
</style>
