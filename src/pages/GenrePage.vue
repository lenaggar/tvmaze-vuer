<script setup lang="ts">
import { RouterLink, useRoute } from "vue-router";
import { showStore } from "../store";
import ShowList from "../components/ShowList.vue";
import ShowItem from "../components/ShowItem.vue";
import BackBtn from "../components/BackBtn.vue";
import PageLayout from "./PageLayout.vue";
import { ref, watch } from "vue";

const store = showStore();
const route = useRoute();
const listRerenderRef = ref(0);

const shows = ref(store.showsByGenre(route.params.genreId as string));
watch(
  () => route.params.genreId,
  (genreId) => {
    shows.value = store.showsByGenre(genreId as string);
    listRerenderRef.value += 1;
  },
);
</script>

<template>
  <BackBtn />

  <PageLayout>
    <template #header>
      <header class="page-header">
        <h2 class="page-title">{{ route.params.genreId }}</h2>
      </header>
    </template>

    <template #content>
      <ShowList
        :items="shows"
        @last-item-intersecting="() => {}"
        :key="listRerenderRef"
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
}

.page-title {
  text-transform: uppercase;
  font-size: 64px;
  font-weight: bold;
}

@media screen and (max-width: 1000px) {
  .page-header {
    margin-bottom: 20px;
  }

  .page-title {
    font-size: 32px;
  }
}

.genre-page-header {
  margin-bottom: 40px;
}

.genre-page-title {
  text-transform: uppercase;
  font-size: 64px;
  font-weight: bold;
}
</style>
