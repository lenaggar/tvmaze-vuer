<script setup lang="ts">
import { useRoute } from "vue-router";
import { onMounted, onUnmounted, ref, watch } from "vue";
import burgerMenuIcon from "../assets/burger-menu.svg";
import SideMenu from "./SideMenu.vue";

const route = useRoute();
const isOpen = ref(false);
const mobileMenuWrapperRef = ref<HTMLDivElement | null>(null);

function onMenuOpen() {
  isOpen.value = !isOpen.value;
}

onMounted(() => {
  document.addEventListener("click", handleOutsideClick);
});
onUnmounted(() => {
  document.removeEventListener("click", handleOutsideClick);
});

function handleOutsideClick(event: MouseEvent) {
  console.log(">> event.target", event.target);
  if (!mobileMenuWrapperRef.value?.contains(event.target as Node)) {
    isOpen.value = false;
  }
}

watch(
  () => route.params.genreId,
  () => {
    isOpen.value = false;
  },
);
</script>

<template>
  <div
    class="mobile-menu-wrapper"
    :class="{ open: isOpen }"
    ref="mobileMenuWrapperRef"
  >
    <button class="mobile-menu-btn" @click="onMenuOpen">
      <img class="mobile-menu-icon" :src="burgerMenuIcon" />
    </button>

    <SideMenu />
  </div>
</template>

<style scoped>
.mobile-menu-wrapper {
  display: none;
}

@media screen and (max-width: 1000px) {
  .mobile-menu-wrapper {
    display: block;

    transform: translateX(-100%);
    transition: transform 0.2s ease;
    isolation: isolate;
    z-index: 1000;
    inset: 0;
    right: unset;
    width: 80vw;
    max-width: 400px;
    position: absolute;
    background-color: rgb(24, 24, 24);
    border-right: 2px solid gray;

    &.open {
      transform: translateX(0);
    }

    .mobile-menu-btn {
      background-color: whitesmoke;
      padding: 6px;
      position: absolute;
      top: 24px;
      right: -64px;
    }

    .mobile-menu-icon {
      width: 24px;
    }
  }
}
</style>
