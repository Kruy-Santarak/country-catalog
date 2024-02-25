<script setup>
import BaseButton from "../../button/BaseButton.vue";

const emits = defineEmits(["click"]);
const props = defineProps({
  active: { type: Boolean, required: false },
  icon: { type: String, required: false },
  disabled: { type: Boolean, required: false },
});

const clickHandler = (event) => {
  emits("click", event);
};
</script>

<template>
  <BaseButton
    :disabled="disabled"
    :primary="active"
    :icon="icon"
    @click="clickHandler"
    class="size-10 p-0 !px-0 justify-center"
  >
    <slot></slot>
  </BaseButton>
</template>

<style lang="scss" scoped></style>
