<script setup>
import { useAttrs } from "vue";

const attrs = useAttrs();
</script>

<template>
  <h2
    v-bind="attrs"
    class="block text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white"
  >
    <slot></slot>
  </h2>
</template>

<style lang="scss" scoped></style>
