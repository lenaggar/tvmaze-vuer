<script setup lang="ts">
import { Show } from "../schemas/show-schema";

defineProps<{
  show: Show;
}>();
</script>

<template>
  <img
    v-if="show.image?.original"
    :src="show.image.original"
    :alt="show.name"
    class="show-image"
  />
  <!-- image placeholder -->
  <img
    v-else
    src="/no-cover-poster.jpg"
    alt="Placeholder image"
    class="show-image"
  />
</template>

<style scoped>
.show-image {
  width: 200px;
  height: 300px;
  object-fit: cover;
  border-radius: 4px;
  transition: box-shadow 0.2s ease;
}
</style>
