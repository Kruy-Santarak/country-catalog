<script setup>
const props = defineProps({
  src: { type: String, required: false },
});
</script>

<template>
  <img :src="src" alt="" class="size-4" />
</template>

<style lang="scss" scoped></style>
