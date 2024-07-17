<script setup lang="ts"></script>

<template>
  <div class="back-btn">
    <RouterLink to="/"
      ><span class="back-btn-text">{{ "< " }} Go Back</span></RouterLink
    >
  </div>
</template>

<style scoped>
.back-btn {
  position: absolute;
  top: 48px;
  left: 50%;
  transform: translateX(-50%);
}

.back-btn-text {
  padding: 8px;

  font-size: 20px;
  font-weight: 500;
  color: white;

  &:hover {
    color: lightsteelblue;
  }
}

@media screen and (max-width: 1000px) {
  .back-btn {
    top: 8px;
  }
}
</style>
