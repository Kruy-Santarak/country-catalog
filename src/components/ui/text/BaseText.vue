<script setup>
import { useAttrs } from "vue";

const props = defineProps({
  labelFor: { type: String, required: false },
});

const attr = useAttrs();
</script>

<template>
  <component
    :is="!!labelFor ? 'label' : 'p'"
    :v-bind="attr"
    :for="labelFor"
    class="block text-sm md:text-base font-medium text-gray-900 dark:text-white antialiased hover:subpixel-antialiased"
  >
    <slot></slot>
  </component>
</template>

<style lang="scss" scoped></style>
