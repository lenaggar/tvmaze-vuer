<script setup lang="ts">
import BackBtn from "../components/BackBtn.vue";
import PageLayout from "./PageLayout.vue";
</script>

<template>
  <BackBtn />

  <PageLayout>
    <template #header>
      <header class="page-header">
        <h2 class="page-title">{{ $route.params.genreId }}</h2>
      </header>
    </template>

    <template #content>
      <h2>404 - Page not found</h2>
    </template>
  </PageLayout>
</template>

<style scoped></style>
