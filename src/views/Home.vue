<template>
  <draft-section />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useHeroesStore } from '@/stores/heroes';
import DraftSection from '@/components/DraftSection.vue';

const heroesStore = useHeroesStore();

onMounted(() => {
  heroesStore.getHeroes();
});
</script>
