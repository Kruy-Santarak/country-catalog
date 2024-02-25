<script setup>
import LayoutHeader from "./components/layout/LayoutHeader.vue";
</script>

<template>
  <LayoutHeader class="sticky" />
  <div class="container py-10">
    <router-view />
  </div>
</template>

<style scoped lang="scss"></style>
