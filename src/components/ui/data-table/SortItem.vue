<script setup>
import { computed } from "vue";
import { ICONS } from "../../../constant";

import BaseButton from "../button/BaseButton.vue";

const emits = defineEmits(["change"]);
const props = defineProps({
  asc: { type: Boolean, required: true, default: () => true },
});

const sortType = computed(() => (props.asc ? "A-Z" : "Z-A"));

// toggle sort handler
const sortItemToggleHandler = () => {
  emits("change", !props.asc);
};
</script>

<template>
  <BaseButton
    :icon="ICONS.adjustments_horizontal"
    @click="sortItemToggleHandler"
  >
    {{ sortType }}
  </BaseButton>
</template>

<style lang="scss" scoped></style>
