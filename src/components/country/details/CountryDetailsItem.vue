<script setup>
import CountryDTO from "../../../model/CountryDTO";
import BaseSpinner from "../../ui/BaseSpinner.vue";
import Chip from "../../ui/Chip.vue";
import BaseImage from "../../ui/image/BaseImage.vue";
import BaseText from "../../ui/text/BaseText.vue";
import CountryDetailRecord from "./CountryDetailRecord.vue";

const props = defineProps({
  loading: { type: Boolean, required: false },
  data: { type: CountryDTO, required: true },
});
</script>

<template>
  <!-- loading -->

  <section v-if="loading" class="w-full flex justify-center">
    <section class="flex items-center gap-2">
      <BaseSpinner />
      <BaseText>Loading...</BaseText>
    </section>
  </section>
  <!-- content -->
  <div v-if="!loading && data" class="w-full grid grid-cols-12 gap-10">
    <!-- image -->
    <section class="col-span-4">
      <BaseImage
        :src="data.flag"
        class="w-full h-auto rounded-lg !object-cover mr-3.5"
      />
    </section>
    <!-- info -->
    <section class="col-span-8 grid gap-1">
      <!-- official name -->
      <CountryDetailRecord title="official name" :content="data.officialName" />
      <!-- alternative name -->
      <CountryDetailRecord title="alternative name">
        <template #content>
          <section
            v-if="data.alternativeName.length"
            class="w-full flex gap-1 flex-wrap"
          >
            <Chip
              v-for="(item, index) in data.alternativeName"
              :key="`${index}-${item}`"
            >
              <BaseText class="!text-xs">
                {{ item }}
              </BaseText>
            </Chip>
          </section>
        </template>
      </CountryDetailRecord>
      <!-- native name -->
      <CountryDetailRecord title="native name" :content="data.nativeName" />
      <!-- capital city -->
      <CountryDetailRecord title="capital">
        <template #content>
          <section
            v-if="data.capital?.length"
            class="w-full flex gap-1 flex-wrap"
          >
            <Chip
              v-for="(item, index) in data.capital"
              :key="`${index}-${item}`"
            >
              <BaseText class="!text-xs">
                {{ item }}
              </BaseText>
            </Chip>
          </section>
        </template>
      </CountryDetailRecord>
      <!-- iso code -->
      <CountryDetailRecord title="iso code" :content="data.isoCode()" />
      <!-- country code -->
      <CountryDetailRecord title="country code" :content="data.countryCode()" />
      <!-- area -->
      <CountryDetailRecord title="area" :content="`${data.area}`" />
      <!-- google map -->
      <CountryDetailRecord title="google map">
        <template #content>
          <a :href="data.googleMap" target="_blank">
            <BaseText
              class="text-secondary-default truncate hover:text-secondary-dark"
            >
              {{ data.googleMap }}
            </BaseText>
          </a>
        </template>
      </CountryDetailRecord>
    </section>
  </div>
</template>
