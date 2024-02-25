<script setup>
import { useSlots } from "vue";
import BaseTitle from "../text/BaseTitle.vue";

const emits = defineEmits(["close"]);
const props = defineProps({
  show: { type: Boolean, required: true, default: false },
});

const slots = useSlots();

// close popup dialog handler
const closeHandler = () => {
  console.log("click");
  if (props.show) {
    emits("close");
  }
};
const handleDialogClick = (event) => {
  event.stopImmediatePropagation();
};
</script>

<template>
  <teleport to="body">
    <!-- modal backdrop -->
    <div
      v-show="show"
      class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
    >
      <transition name="dialog">
        <dialog :open="show" @click="closeHandler">
          <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div
              class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
            >
              <!-- modal panel -->
              <div
                @click="handleDialogClick"
                class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full sm:w-full sm:max-w-lg"
              >
                <!-- content -->
                <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <slot></slot>
                </div>
                <!-- actions -->
                <div
                  v-if="slots.actions"
                  class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
                >
                  <slot name="actions"></slot>
                </div>
              </div>
            </div>
          </div>
        </dialog>
      </transition>
    </div>
  </teleport>
</template>

<style lang="scss" scoped></style>
