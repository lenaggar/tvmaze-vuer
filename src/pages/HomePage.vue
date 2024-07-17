<script setup lang="ts">
import { onMounted } from "vue";
import { RouterLink } from "vue-router";
import { showStore } from "../store";
import ShowList from "../components/ShowList.vue";
import ShowItem from "../components/ShowItem.vue";
import PageLayout from "./PageLayout.vue";

const store = showStore();

onMounted(() => {
  if (!store.hasItems) {
    // Fetch the first page of shows
    store.getNextPage();
  }
});
</script>

<template>
  <PageLayout>
    <template #header>
      <header class="page-header">
        <h2 class="page-title">All shows</h2>
        <span class="page-subtitle">({{ store.count }})</span>
      </header>
    </template>

    <template #content>
      <ShowList
        :items="store.shows"
        @last-item-intersecting="store.getNextPage"
      >
        <template v-slot="{ item }">
          <RouterLink :to="`/shows/${item.id}`">
            <ShowItem :show="item" />
          </RouterLink>
        </template>
      </ShowList>
    </template>
  </PageLayout>
</template>

<style scoped>
.page-header {
  margin-bottom: 36px;
  display: flex;
  gap: 8px;
  align-items: center;
}

.page-title {
  text-transform: uppercase;
  font-size: 64px;
  font-weight: bold;
  color: whitesmoke;
}

.page-subtitle {
  font-size: 40px;
  color: lightgray;
}

@media screen and (max-width: 1000px) {
  .page-header {
    margin-bottom: 20px;
  }

  .page-title {
    font-size: 32px;
  }

  .page-subtitle {
    font-size: 24px;
  }
}
</style>
