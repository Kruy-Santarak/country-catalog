<script setup>
import { useSlots } from "vue";
import BaseTitle from "../../ui/text/BaseTitle.vue";
import BaseText from "../../ui/text/BaseText.vue";

const props = defineProps({
  title: { type: String, required: false },
  content: { type: String, required: false },
});

const slots = useSlots();
</script>

<template>
  <div class="w-full grid gap-4 grid-cols-10">
    <BaseTitle class="!text-sm col-span-4 capitalize">{{ title }}</BaseTitle>
    <BaseText v-if="content && !slots.content" class="!text-sm col-span-6">
      {{ content }}
    </BaseText>
    <section v-else class="col-span-6">
      <slot name="content"></slot>
    </section>
  </div>
</template>

<style lang="scss" scoped></style>
