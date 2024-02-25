<script setup>
import { ICONS } from "../../constant";

import BaseImage from "../ui/image/BaseImage.vue";
import BaseTitle from "../ui/text/BaseTitle.vue";
</script>

<template>
  <nav class="py-3.5 bg-gray-900">
    <div class="container flex flex-row justify-between items-center">
      <!-- logo -->
      <router-link :to="{ name: 'ListCountries' }">
        <BaseImage :src="ICONS.logo" class="size-16" />
      </router-link>
      <!-- heading text -->
      <BaseTitle class="text-primary-default">
        Choose your destination
      </BaseTitle>
    </div>
  </nav>
</template>

<style lang="scss" scoped></style>
