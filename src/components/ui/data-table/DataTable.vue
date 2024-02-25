<script setup>
import { computed, watch } from "vue";
import { ICONS } from "../../../constant";
import BaseInput from "../input/BaseInput.vue";
import pagination from "./pagination/Pagination.vue";
import BaseSpinner from "../BaseSpinner.vue";
import BaseText from "../text/BaseText.vue";
import SortItem from "./SortItem.vue";
import { useInput, useState } from "../../../hooks";
import { fuzzySearch, sort } from "../../../helper";

const emits = defineEmits(["change", "input-search", "sort"]);
const props = defineProps({
  id: { type: String, required: true },
  loading: { type: Boolean, required: false },
  items: { type: Array, required: false },
  sortBy: { type: String, required: false },
  filterBy: { type: String, required: false },
  ascSort: { type: Boolean, required: false, default: () => true },
  currentPage: { type: Number, required: false, default: () => 1 },
  limit: { type: Number, required: false, default: () => 25 },
});

// const [currentPage, setCurrentPage] = useState(props.currentPage);
const [searching, setSearching] = useState(false);
const [searchedItem, setSearchedItem] = useState(null);
const [isSearched, setIsSearched] = useState(false);

// total item count
const itemsCount = computed(() => +props.items.length);
// total page size
const pageSize = computed(() => Math.ceil(itemsCount.value / props.limit));
// sorted items
const sortedItem = computed(() =>
  sort(props.items, props.sortBy, props.ascSort)
);
// placed items into array of each page
const paginatedItems = computed(() =>
  paginatedHandler(props.items, pageSize.value, props.limit)
);
// current page items
const currentPageItems = computed(() =>
  (() => paginatedItems.value[props.currentPage - 1])()
);

const {
  value: searchString,
  changeHandler: inputSearchStringHandler,
  resetHandler: resetSearchStringHandler,
} = useInput();

// return items of each pages
const paginatedHandler = (items = [], pageSize, limit) => {
  return Array.from({ length: pageSize }, (_, index) => {
    const start = index * limit;
    return items.slice(start, start + limit);
  });
};

const searchByFilterKey = fuzzySearch(sortedItem.value, props.filterBy);

const searchCountryHandler = async () => {
  try {
    setSearching(true);
    if (searchString.value.trim()) {
      const response = await searchByFilterKey(searchString.value);
      setSearchedItem([...response]);
    } else {
      setSearchedItem(null);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setSearching(false);
  }
};

// update current page
const pageChangeHandler = (goto) => {
  emits("change", goto);
};
// sort item handler
const sortItemHandler = (type) => {
  emits("sort", type);
};
// // search item handler
// const searchHandler = () => {
//   emits("fuzzy");
// };

watch(
  () => searchString.value,
  (curr, prev) => {
    if (curr.trim() !== prev.trim()) {
      setIsSearched(!!curr.trim());
      setSearching(!!curr.trim());

      if (!curr.trim()) {
        setSearchedItem(null);
      }
    }
  }
);
</script>

<template>
  <div class="w-full max-w-full">
    <!-- table header -->
    <section class="grid grid-cols-5 gap-4 mb-10">
      <!-- search element -->
      <BaseInput
        class="col-span-2"
        id="input-search"
        name="input-search"
        placeholder="search"
        type="search"
        :icon="ICONS.magnifying_glass"
        :value="searchString"
        :loading="searching"
        @input="inputSearchStringHandler"
        @reset="resetSearchStringHandler"
        @search="searchCountryHandler"
      />
      <!-- sorting element -->
      <SortItem :asc="props.ascSort" @change="sortItemHandler" />
    </section>
    <!-- spinner loading -->
    <section
      v-if="loading && !currentPageItems?.length"
      class="w-full flex justify-center"
    >
      <section class="flex items-center gap-2">
        <BaseSpinner />
        <BaseText>Loading...</BaseText>
      </section>
    </section>
    <!-- content -->
    <section v-else class="w-full flex flex-col gap-2">
      <slot
        name="table-row"
        v-for="(item, index) in currentPageItems"
        :key="`${id}-${index}`"
        :data="item"
      ></slot>
    </section>
    <!-- pagination -->
    <section v-if="!!items.length" class="mt-10">
      <pagination
        :page-size="pageSize"
        :current-page="currentPage"
        @change="pageChangeHandler"
      />
    </section>
  </div>
</template>

<style lang="scss" scoped></style>
