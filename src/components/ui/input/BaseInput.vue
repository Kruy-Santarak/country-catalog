<script setup>
import { computed } from "vue";
import debounce from "lodash/debounce";

import BaseText from "../text/BaseText.vue";
import BaseIcon from "../image/BaseIcon.vue";
import { useState } from "../../../hooks";
import BaseSpinner from "../BaseSpinner.vue";

const emits = defineEmits(["search", "input", "change", "blur", "clear"]);
const props = defineProps({
  id: { type: String, required: true },
  name: { type: String, required: true },
  label: { type: String, required: false },
  placeholder: { type: String, required: false },
  type: { type: String, required: false, default: () => "text" },
  icon: { type: String, required: false },
  loading: { type: Boolean, required: false },
  value: { type: String, required: true },
});

const [searched, setSearched] = useState(true);
const [searching, setSearching] = useState(false);

const isInputSearch = computed(
  () => props.type.toLocaleLowerCase() === "search"
);
/**
 * inputEle padding style
 */
const inputPadding = computed(() => {
  const paddingRight = props.icon && "ps-10";
  const paddingLeft = (props.loading || searching.value) && "pe-10";
  return `p-2.5 ${paddingLeft} ${paddingRight}`;
});
/**
 * inputEle input handler
 * @param {*} event
 */
const inputHandler = (event) => {
  emits("input", event);

  if (isInputSearch.value && !!event.target.value.trim()) {
    searchHandler();
  }
};
/**
 * inputEle change handler
 * @param {*} event
 */
const changeHandler = (event) => {
  emits("change", event);
};
/**
 * inputEle blur handler
 * @param {*} event
 */
const blurHandler = (event) => {};
/**
 * search handler
 * searchHandler function make the spinning button appeared when typing
 * and disappeared after typing finished in 1s
 */
const searchHandler = debounce(async () => {
  if (searched.value) {
    setSearched(false);
    await emits("search");
    setSearched(true);
  }
}, 1000);
</script>

<template>
  <div class="w-full">
    <BaseText v-if="label" :label-for="id" class="mb-2 inline-block">
      {{ label }}
    </BaseText>

    <div class="flex items-center relative">
      <section
        v-if="icon"
        class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none"
      >
        <BaseIcon :src="icon" />
      </section>
      <!-- input -->
      <input
        :id="id"
        :type="type"
        :placeholder="placeholder"
        :value="value"
        @input="inputHandler"
        @change="changeHandler"
        @blur="blurHandler"
        :class="`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full h-10 max-h-10 ${inputPadding}`"
      />
      <!-- spinning -->
      <section
        v-if="loading"
        class="absolute inset-y-0 end-0 flex items-center pe-3.5 pointer-events-none"
      >
        <BaseSpinner />
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
