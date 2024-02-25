<script setup>
import { useAttrs } from "vue";

const props = defineProps({
  src: { type: String, required: true },
});

const attrs = useAttrs();
</script>

<template>
  <img v-bind="attrs" :src="src" alt="" class="object-cover size-10" />
</template>

<style lang="scss" scoped></style>
