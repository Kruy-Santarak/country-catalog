<script setup>
import Chip from "../ui/Chip.vue";
import BaseText from "../ui/text/BaseText.vue";

const props = defineProps({
  data: { type: Array, required: false },
});
</script>

<template>
  <div class="w-full">
    <section v-if="data.length" class="w-full flex gap-1">
      <Chip
        v-for="(item, index) in data.slice(0, 3)"
        :key="`${index}-${item}`"
        class="max-w-1/3"
      >
        <BaseText class="!text-xs truncate">
          {{ item }}
        </BaseText>
      </Chip>
    </section>
    <BaseText v-else>-</BaseText>
  </div>
</template>

<style lang="scss" scoped></style>
