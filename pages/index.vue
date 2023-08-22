<script lang="ts">
export default {
  name: 'TopPage',
}
</script>

<script setup lang="ts">
import Card1 from "../components/Card1.vue";
import Card2 from "../components/Card2.vue";
</script>

<template>
  <div class="bg-gray-100 flex justify-start items-center flex-col h-screen pt-10 pb-10 gap-10">
    <Card1 />
    <Card2 />
  </div>
</template>
