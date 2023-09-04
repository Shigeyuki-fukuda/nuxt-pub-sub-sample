<script lang="ts">
export default {
  name: 'Card1',
}
</script>

<script setup lang="ts">
import { useModalDisplayEvent } from '../../composables/events/modal-display';

const { dispatch } = useModalDisplayEvent();
const displayModal = (): void => {
  dispatch({ action: "OPEN_MODAL" });
}
</script>

<template>
  <div class="flex flex-col justify-start items-center">
    <div class="bg-white shadow-md rounded-md p-6 w-[500px]">
      <h2 class="text-xl font-semibold text-gray-800 mb-2 sm:text-2xl">Card Title1</h2>
      <p class="text-gray-600 mb-4 sm:text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt justo quis eros tincidunt, at pellentesque erat tristique.</p>
      <button
        class="rounded-full w-[120px] bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        @click="displayModal"
      >
        OpenModal
      </button>
    </div>
  </div>
</template>
