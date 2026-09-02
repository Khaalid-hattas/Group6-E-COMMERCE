<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import Creators from "./Creators.vue";
import Handmade from "./Handmade.vue";

const currentPage = ref("handmade");

function updatePage() {
  currentPage.value =
    window.location.hash === "#creators" ? "creators" : "handmade";
  window.scrollTo(0, 0);
}

onMounted(() => {
  updatePage();
  window.addEventListener("hashchange", updatePage);
});

onBeforeUnmount(() => window.removeEventListener("hashchange", updatePage));
</script>

<template>
  <Creators v-if="currentPage === 'creators'" />
  <Handmade v-else />
</template>
