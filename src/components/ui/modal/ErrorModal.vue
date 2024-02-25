<script setup>
import BaseTitle from "../text/BaseTitle.vue";
import BaseModal from "./BaseModal.vue";
import BaseButton from "../button/BaseButton.vue";
import BaseText from "../text/BaseText.vue";

const emits = defineEmits(["close"]);
const props = defineProps({
  show: { type: Boolean, required: true },
  message: { type: String, required: false },
});

const closeHandler = () => {
  props.show && emits("close");
};
</script>

<template>
  <BaseModal :show="show">
    <BaseTitle class="!text-xl">Error</BaseTitle>

    <BaseText>{{ message }}</BaseText>

    <template #actions>
      <BaseButton :secondary="true" @click="closeHandler">Close</BaseButton>
    </template>
  </BaseModal>
</template>

<style lang="scss" scoped></style>
