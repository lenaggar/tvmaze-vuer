<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import debounce from "lodash.debounce";
import {} from "vue-search-select";
import { searchShows } from "../api";
import { Show } from "../schemas/show-schema";
import { validateShows } from "../utils/validate-shows";

const wrapperRef = ref<HTMLDivElement | null>(null);
const inputRef = ref<HTMLInputElement | null>(null);

const searchResults = ref<Show[]>([]);
const resultsVisible = ref(false);

onMounted(() => {
  if (inputRef.value) {
    inputRef.value.focus();
  }
  document.addEventListener("click", handleOutsideClick);
});
onUnmounted(() => {
  document.removeEventListener("click", handleOutsideClick);
});

function handleOutsideClick(event: MouseEvent) {
  if (!wrapperRef.value?.contains(event.target as Node)) {
    resultsVisible.value = false;
  }
}

const onSearch = debounce(async (event: Event) => {
  const searchQuery = (event.target as HTMLInputElement).value;

  if (!searchQuery) {
    searchResults.value = [];
    resultsVisible.value = false;
    return;
  }

  const result = await searchShows(searchQuery);
  searchResults.value = validateShows(result);
  resultsVisible.value = true;
}, 500);
</script>

<template>
  <div class="wrapper" ref="wrapperRef">
    <input
      ref="inputRef"
      class="search-input"
      type="text"
      placeholder="Search..."
      @input="onSearch"
    />

    <ul v-if="resultsVisible" class="search-results-list">
      <RouterLink
        v-for="show in searchResults"
        :to="`/shows/${show.id}`"
        @click="resultsVisible = false"
        :key="show.id"
      >
        <li class="search-result-item">
          <img
            v-if="show.image?.medium"
            :src="show.image.medium"
            :alt="show.name"
            class="show-thumb"
          />
          <!-- image placeholder -->
          <img
            v-else
            src="/no-cover-poster.jpg"
            alt="Placeholder image"
            class="show-thumb"
          />
          <div class="show-info">
            <p class="show-title">{{ show.name }}</p>
            <p class="show-year">{{ show.premiered }}</p>
          </div>
        </li>
      </RouterLink>
    </ul>
  </div>
</template>

<style scoped>
.wrapper {
  position: relative;
  width: 100%;
}

.search-input {
  width: 100%;
  padding: 8px 16px;
  font-size: 16px;
}

.search-results-list {
  position: absolute;
  background-color: lightgray;
  width: 100%;
  max-height: 50vh;
  margin-top: 4px;
  border-radius: 4px;
  overflow-y: auto;

  display: flex;
  flex-direction: column;
}

.search-result-item {
  flex-grow: 0;
  flex-shrink: 0;

  padding: 8px 16px;
  color: darkslategrey;

  &:hover {
    font-weight: 500;
  }

  display: flex;
  gap: 8px;
}

.show-thumb {
  height: 120px;
  width: 80px;
}

.show-info {
}

.show-title {
  font-size: 18px;
}

.show-year {
  font-size: 14px;
  font-weight: normal;
  color: gray;
}
</style>
