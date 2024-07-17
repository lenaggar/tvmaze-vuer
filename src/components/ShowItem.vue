<script setup lang="ts">
import { Show } from "../schemas/show-schema";
import ShowImage from "./ShowImage.vue";

defineProps<{
  show: Show;
}>();
</script>

<template>
  <article class="show-item">
    <div class="image-wrapper">
      <ShowImage :show="show" />
      <p v-if="show.rating.average" class="show-rating">
        {{ show.rating.average.toFixed(1) }}
      </p>
    </div>
    <div class="show-title-wrapper">
      <h2 class="line-clamp-2">
        {{ show.name }}
      </h2>
    </div>
    <p v-html="show.summary" class="line-clamp-3"></p>
  </article>
</template>

<style scoped>
.show-item {
  width: 200px;
  max-height: 480px;
  color: white;
  transition: color 0.3s ease;

  &:hover {
    color: lightsteelblue;
  }
}

.image-wrapper {
  position: relative;
  margin-bottom: 16px;
}

.show-title-wrapper {
  margin-bottom: 8px;
}

.show-rating {
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 4px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 4px;
}

.line-clamp-2 {
  height: 2lh;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
