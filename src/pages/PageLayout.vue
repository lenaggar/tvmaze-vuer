<script setup lang="ts"></script>

<template>
  <div class="page-layout-wrapper">
    <slot name="header"></slot>
    <div class="page-content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style scoped>
.page-layout-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}

.page-content {
  width: 100%;
}
</style>
