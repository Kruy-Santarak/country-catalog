<script setup>
import { useAlert } from "../../hooks";
import CountryDTO from "../../model/CountryDTO";
import BaseCard from "../ui/card/BaseCard.vue";
import BaseImage from "../ui/image/BaseImage.vue";
import BaseText from "../ui/text/BaseText.vue";
import BaseTitle from "../ui/text/BaseTitle.vue";
import AlternativeName from "./AlternativeName.vue";

const emits = defineEmits(["toggle-modal"]);
const props = defineProps({
  data: {
    type: CountryDTO,
    required: true,
    default: () => new CountryDTO(),
  },
});

const toggleDetailsModalHandler = (event) => {
  event.stopPropagation();
  event.preventDefault();
  emits("toggle-modal", { show: true, payload: props.data });
};

// const {} = useAlert();
</script>

<template>
  <!-- country card -->
  <router-link
    v-if="data"
    :to="{
      name: 'CountryDetails',
      params: { name: data.officialName || 'defaultName' },
    }"
  >
    <BaseCard class="w-full max-w-full grid grid-cols-12 gap-4 p-5">
      <!-- country info -->
      <section class="col-span-4 flex flex-row items-center">
        <BaseImage
          :src="data.flag"
          class="w-14 h-10 rounded-lg !object-cover mr-3.5"
        />
        <section class="truncate">
          <BaseTitle
            class="!text-sm truncate hover:text-primary-default"
            @click="toggleDetailsModalHandler"
          >
            {{ data.officialName }}
          </BaseTitle>
          <BaseText class="!text-xs truncate">{{ data.nativeName }}</BaseText>
        </section>
      </section>
      <!-- iso code -->
      <section class="col-span-2">
        <BaseTitle class="!text-sm truncate">ISO Code</BaseTitle>
        <BaseText class="!text-sm truncate">{{ data.isoCode() }}</BaseText>
      </section>
      <!-- country code -->
      <section class="col-span-2">
        <BaseTitle class="!text-sm truncate">Country Code</BaseTitle>
        <BaseText class="!text-sm truncate">{{ data.countryCode() }}</BaseText>
      </section>
      <!-- alternative name -->
      <section class="col-span-4">
        <BaseTitle class="!text-sm truncate">Alternative Name</BaseTitle>
        <AlternativeName :data="data.alternativeName" />
      </section>
    </BaseCard>
  </router-link>
</template>

<style lang="scss" scoped></style>
