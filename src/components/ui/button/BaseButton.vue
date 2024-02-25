<script setup>
import { computed, useAttrs, useSlots } from "vue";
import BaseSpinner from "../BaseSpinner.vue";
import BaseIcon from "../image/BaseIcon.vue";

const emits = defineEmits(["click"]);
const props = defineProps({
  primary: { type: Boolean, required: false },
  secondary: { type: Boolean, required: false },
  loading: { type: Boolean, required: false, default: () => false },
  disabled: { type: Boolean, required: false, default: () => false },
  icon: { type: String, required: false },
});

const attrs = useAttrs();
const slots = useSlots();

// disabled button (prevent button from click)
const isDisabled = computed(() => props.loading || props.disabled);
// button variant
const buttonVariant = computed(() => {
  const textColor =
    props.primary || props.secondary ? "text-white" : "text-gray-800";
  const background = props.primary
    ? {
        default: "bg-primary-default",
        disabled: "bg-primary-light",
        hover: "bg-primary-dark",
      }
    : props.secondary
    ? {
        default: "bg-secondary-default",
        disabled: "bg-secondary-light",
        hover: "bg-secondary-dark",
      }
    : {
        default: "bg-gray-200",
        disabled: "bg-gray-50",
        hover: "bg-gray-400",
      };
  return `${background.default} ${"disabled:" + background.disabled} 
  ${"hover:" + background.hover} ${textColor}`;
});

// button click event handler
const clickHandler = (event) => {
  if (!isDisabled.value) {
    emits("click", event);
  }
};
</script>

<template>
  <button
    v-bind="attrs"
    :disabled="isDisabled"
    @click="clickHandler"
    :class="`${buttonVariant} flex justify-center items-center font-medium text-sm h-10 max-h-10 px-10 rounded-xl transition-all relative`"
  >
    <!-- button loading spinner -->
    <BaseSpinner v-if="loading" class="absolute left-2 h-full" />
    <!-- button icon -->
    <BaseIcon v-if="!!icon" :src="icon" class="mr-2" />
    <!-- button content -->
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped></style>
