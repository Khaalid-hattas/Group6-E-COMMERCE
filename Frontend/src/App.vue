<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import Artwork from "./Artwork.vue";
import Creators from "./Creators.vue";
import Handcraft from "./Handcraft.vue";
import Handmade from "./Handmade.vue";

const currentPage = ref("handcraft");

function updatePage() {
  const hash = window.location.hash;

  currentPage.value =
    hash === "#creators"
      ? "creators"
      : hash === "#artwork"
        ? "artwork"
        : hash === "#handmade"
          ? "handmade"
          : "handcraft";
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
  <Artwork v-else-if="currentPage === 'artwork'" />
  <Handmade v-else-if="currentPage === 'handmade'" />
  <Handcraft v-else />
</template>
