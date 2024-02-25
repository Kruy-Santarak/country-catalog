<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useAlert, useInput, useState } from "../hooks";
import { fuzzySearch, sort } from "../helper";
import store from "../store";

import DataTable from "../components/ui/data-table/DataTable.vue";
import ErrorModal from "../components/ui/modal/ErrorModal.vue";
import CountryItem from "../components/country/CountryItem.vue";
import BaseModal from "../components/ui/modal/BaseModal.vue";
import CountryDetailsItem from "../components/country/details/CountryDetailsItem.vue";

// const [searched, setSearched] = useState(false);
// const [searching, setSearching] = useState(false);
const [isAscSort, setIsAscSort] = useState(false);
const [currentPage, setCurrentPage] = useState(1);
const [loading, setLoading] = useState(false); // const loading = ref(false);
const [errorMessage, setErrorMessage] = useState("");
const [selectedCountry, setSelectedCountry] = useState(null);

// return true if countries already fetched at the first time
const isCountriesFetched = computed(
  () => store.getters["country/isCountriesFetched"]
);
// country items
const countries = computed(() => store.getters["country/getCountries"]);

/**
 * useAlert hook
 * error alert handler
 */
const {
  alertIsVisible: isErrorVisible,
  showAlert: showError,
  hideAlert: hideError,
} = useAlert();
/**
 * useAlert hook
 * country details modal handler
 */
const {
  alertIsVisible: isDetailsModalVisible,
  showAlert: showDetailsModal,
  hideAlert: hideDetailsModal,
} = useAlert();
/**
 * hide/show details modal
 * @param {*} param0
 */
const toggleDetailsModalHandler = ({ show = false, payload }) => {
  show ? showDetailsModal() : hideDetailsModal();
  setSelectedCountry(payload);
};

// page change handler
const pageChangeHandler = (currentPage) => {
  setCurrentPage(currentPage);
};
// sort item handler
const toggleSortItemHandler = (sortType) => {
  setIsAscSort(sortType);
};

const {
  value: searchString,
  changeHandler: inputSearchHandler,
  resetHandler: clearSearchStringHandler,
} = useInput("");

// load all countries and insert into vuex store
const loadCountriesHandler = async () => {
  try {
    setLoading(true); // loading.value = true;
    // interact with vuex store
    await store.dispatch("country/loadCountries");
  } catch (error) {
    console.log(error);
    setErrorMessage(error.message);
    showError();
  } finally {
    setLoading(false); // loading.value = false;
  }
};

const searchByOfficialName = fuzzySearch(countries.value, "officialName");

// const searchHandler = () => {};

// const { value: searchString, change: searchStringInputHandler } = useInput();

// watch(
//   () => searchString.value,
//   (curr, prev) => {
//     if (curr.trim() !== prev.trim()) {
//       setSearching(!!curr.trim());
//     }
//   }
// );

onMounted(() => {
  // load countries on the first page mounted
  if (!isCountriesFetched.value) {
    loadCountriesHandler();
  }
});
</script>

<template>
  <!-- error dialog -->
  <ErrorModal
    :show="isErrorVisible"
    :message="errorMessage"
    @close="hideError"
  />
  <!-- country modal -->
  <BaseModal
    :show="isDetailsModalVisible"
    @close="() => toggleDetailsModalHandler({ show: false, payload: null })"
  >
    <CountryDetailsItem :data="selectedCountry" />
  </BaseModal>
  <!-- country items -->
  <DataTable
    id="country_list_items"
    :loading="loading"
    :items="countries"
    :total-count="countries.length"
    :current-page="currentPage"
    :sort-by="'officialName'"
    :filter-by="'officialName'"
    :asc-sort="isAscSort"
    :search-string="searchString"
    @input-search="inputSearchHandler"
    @clear-search="clearSearchStringHandler"
    @sort="toggleSortItemHandler"
    @change="pageChangeHandler"
  >
    <!-- @fuzzy="searchByOfficialName" -->
    <template #table-row="{ data }">
      <CountryItem
        class="w-full"
        :data="data"
        @toggle-modal="toggleDetailsModalHandler"
      />
    </template>
  </DataTable>
</template>

<style lang="scss" scoped></style>
