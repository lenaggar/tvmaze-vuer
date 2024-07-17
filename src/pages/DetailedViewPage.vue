<script setup lang="ts">
import { useRoute } from "vue-router";
import BackBtn from "../components/BackBtn.vue";
import { showStore } from "../store";
import PageLayout from "./PageLayout.vue";
import { onMounted, ref, watch } from "vue";
import { Show } from "../schemas/show-schema";

const route = useRoute();
const store = showStore();

const show = ref<Show | null>(null);

onMounted(() => {
  const properShowId = Number(route.params.showId);
  if (!isNaN(properShowId)) {
    loadShow(properShowId);
  }
});

watch(
  () => route.params.showId,
  (showId) => {
    const properShowId = Number(showId);
    if (!isNaN(properShowId)) {
      loadShow(properShowId);
    }
  },
);

async function loadShow(showId: number) {
  const result = store.getShowById(showId);

  if (result) {
    show.value = result;
  } else {
    await store.fetchShow(showId);
    show.value = store.getShowById(showId) ?? null;
  }
}
</script>

<template>
  <BackBtn />

  <!--
    TODO: this page's UI could be much more intuitive and user-friendly,
    but for the sake of time, I will leave it at this state
  -->

  <PageLayout>
    <template #content>
      <div v-if="show" class="detailed-view-page">
        <img class="show-image" :src="show.image?.original" :alt="show.name" />

        <br />

        <h3>{{ show.name }}</h3>

        <br />

        <p>
          Rating:
          <span v-if="show.rating.average">
            {{ show.rating.average }} / 10.0
          </span>
          <span v-else>N/A</span>
        </p>

        <br />
        <p>Year: {{ show.premiered }}</p>

        <br />

        <p v-html="show.summary"></p>

        <br />

        <a v-if="show.officialSite" :href="show.officialSite">
          Official website
        </a>
      </div>
    </template>
  </PageLayout>
</template>

<style scoped>
.detailed-view-page {
  margin: 64px 0 40px;
}

.show-image {
  border-radius: 4px;
  max-height: 600px;
  object-fit: cover;
}

@media screen and (max-width: 1000px) {
  .page-layout-wrapper {
    justify-content: unset;
  }
}
</style>
