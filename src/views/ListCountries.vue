<script setup>
import { computed, onMounted } from "vue";
import { useAlert, useState } from "../hooks";
import store from "../store";

import DataTable from "../components/ui/data-table/DataTable.vue";
import ErrorModal from "../components/ui/modal/ErrorModal.vue";
import CountryItem from "../components/country/CountryItem.vue";
import BaseModal from "../components/ui/modal/BaseModal.vue";
import CountryDetailsItem from "../components/country/details/CountryDetailsItem.vue";

const [isAscOrder, setIsAscOrder] = useState(false);
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
  setIsAscOrder(sortType);
};

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
    :order-by="'officialName'"
    :filter-by="'officialName'"
    :asc-order="isAscOrder"
    @sort="toggleSortItemHandler"
    @change="pageChangeHandler"
  >
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
