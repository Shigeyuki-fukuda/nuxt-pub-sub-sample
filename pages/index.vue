<script lang="ts">
export default {
  name: 'TopPage',
}
</script>

<script setup lang="ts">
import Card1 from "./components/Card1.vue";
import Card2 from "./components/Card2.vue";
import { useModalDisplayEvent } from '../composables/events/modal-display';

const modalVisible = ref(false);
const { on } = useModalDisplayEvent();
on((event) => {
  if (event.action === "OPEN_MODAL") {
    modalVisible.value = true;
  }

  if (event.action === "CLOSE_MODAL") {
    modalVisible.value = false;
  }
});
</script>

<template>
  <div class="bg-gray-100 flex justify-start items-center flex-col h-screen pt-10 pb-10 gap-10">
    <Card1 />
    <Card2 />
  </div>
</template>
