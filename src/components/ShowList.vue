<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

const { items, onLastItemIntersecting } = defineProps<{
  items: { id: unknown }[];
  onLastItemIntersecting: () => void;
}>();

const listContainerRef = ref<HTMLElement | null>(null);
const horizontalListRef = ref<HTMLElement | null>(null);
const intersectionObserverRef = ref<IntersectionObserver | null>(null);
const firstItemRef = ref<HTMLElement | null>(null);
const lastItemRef = ref<HTMLElement | null>(null);

onMounted(() => {
  horizontalListRef.value = document.getElementById("virtual-scroller");

  if (!horizontalListRef.value) {
    return;
  }

  horizontalListRef.value.addEventListener("wheel", scrollToRight);
  intersectionObserverRef.value = new IntersectionObserver(
    (entries /*, observer*/) => {
      entries.forEach((entry) => {
        if (entry.target.id === "virtual-scroller-first-item") {
          if (entry.isIntersecting) {
            listContainerRef.value?.classList.add("at-beginning");
          } else {
            listContainerRef.value?.classList.remove("at-beginning");
          }
        } else if (entry.target.id === "virtual-scroller-last-item") {
          if (entry.isIntersecting) {
            listContainerRef.value?.classList.add("at-end");

            onLastItemIntersecting();
            // TODO: stop observing the last item when it's not in view anymore
            // if (/* something here! */) {
            //   observer.unobserve(entry.target);
            // }
          } else {
            listContainerRef.value?.classList.remove("at-end");
          }
        }
      });
    },
    {
      root: horizontalListRef.value,
      rootMargin: "20px",
      threshold: 1.0,
    },
  );

  firstItemRef.value = document.getElementById("virtual-scroller-first-item");
  if (firstItemRef.value) {
    intersectionObserverRef.value.observe(firstItemRef.value);
  }

  lastItemRef.value = document.getElementById("virtual-scroller-last-item");
  if (lastItemRef.value) {
    intersectionObserverRef.value.observe(lastItemRef.value);
  }
});

onUnmounted(() => {
  horizontalListRef.value?.removeEventListener("wheel", scrollToRight);

  if (intersectionObserverRef.value && lastItemRef.value) {
    intersectionObserverRef.value.unobserve(lastItemRef.value);
  }
});

function scrollToRight(event: WheelEvent) {
  event.preventDefault();
  horizontalListRef.value?.scrollBy({ left: event.deltaY });
}
</script>

<template>
  <!-- virtualize list component to improve performance for loading and navigating through large lists -->
  <div ref="listContainerRef" class="scroll-list-container">
    <RecycleScroller
      id="virtual-scroller"
      direction="horizontal"
      key-field="id"
      :items="/**
       * you can use this to make long lists shorter (render only every 30th item)
       * and test infinite scrolling and intersection observer functionality
       * 👇🏻
       * [...new Set(items)].filter((_, i) => i % 30 === 0)
       **/
      [...new Set(items)]"
      :item-size="220"
      listClass="virtual-scroller-list"
      listTag="ul"
      itemClass="virtual-scroller-item"
      itemTag="li"
    >
      <template #before>
        <div id="virtual-scroller-first-item">
          <slot name="before"></slot>
        </div>
      </template>

      <template v-slot="{ item }">
        <!-- give the caller control to decide what to render for each item -->
        <slot :item="item"></slot>
      </template>

      <template #after>
        <div id="virtual-scroller-last-item">
          <slot name="after"></slot>
        </div>
      </template>
    </RecycleScroller>
  </div>
</template>

<style scoped>
.scroll-list-container {
  position: relative;

  &:not(&.at-beginning):before {
    content: "";
    position: absolute;
    z-index: 1;
    top: 0;
    bottom: 0;
    left: 0;
    pointer-events: none;
    background-image: linear-gradient(
      to left,
      rgba(36, 36, 36, 0),
      rgba(36, 36, 36, 1) 90%
    );
    width: 4em;
  }

  &:not(&.at-end):after {
    content: "";
    position: absolute;
    z-index: 1;
    top: 0;
    bottom: 0;
    right: 0;
    pointer-events: none;
    background-image: linear-gradient(
      to right,
      rgba(36, 36, 36, 0),
      rgba(36, 36, 36, 1) 90%
    );
    width: 4em;
  }
}
</style>

<style>
#virtual-scroller {
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  .virtual-scroller-list {
    min-height: 480px;
  }
}
</style>
