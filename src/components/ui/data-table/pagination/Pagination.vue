<script setup>
import { ICONS } from "../../../../constant";
import PageItem from "./PageItem.vue";

const emits = defineEmits(["change"]);
const props = defineProps({
  pageSize: { type: Number, required: true },
  currentPage: { type: Number, required: true },
});

const previousPageHandler = () => {
  if (props.currentPage > 1) {
    pageChangeHandler(props.currentPage - 1);
  }
};

const nextPageHandler = () => {
  if (props.currentPage < props.pageSize) {
    pageChangeHandler(props.currentPage + 1);
  }
};

const pageChangeHandler = (goto) => {
  // if(props.currentPage > )
  // console.log(goto);
  if (goto > 0 && goto <= props.pageSize) {
    // setCurrentPage(goto);
    emits("change", goto);
  }
};

// const gotoPageHandler = (goto) => {};

// const nextPageHandler = () => {};

// const previousPageHandler = () => {};
</script>

<template>
  <div class="w-full flex flex-row items-end gap-1">
    <PageItem
      :disabled="currentPage === 1"
      :icon="ICONS.backward"
      @click="previousPageHandler"
    />
    <PageItem
      v-for="page in pageSize"
      :key="`${page}`"
      :active="+currentPage === +page"
      @click="() => pageChangeHandler(page)"
    >
      {{ page }}
    </PageItem>
    <PageItem
      :disabled="currentPage === pageSize"
      :icon="ICONS.forward"
      @click="nextPageHandler"
    />
  </div>
</template>

<style lang="scss" scoped></style>
