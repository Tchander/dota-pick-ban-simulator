<template>
  <div class="hero-wrapper">
    <div v-for="hero in heroes" :key="hero.id" class="hero">
      <img
        class="hero-image"
        :src="require(`@/assets/imgs/heroes/${hero.localized_name}.webp`)"
        :alt="hero.localized_name"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useHeroesStore } from '@/stores/heroes';

const heroesStore = useHeroesStore();
const { heroes } = storeToRefs(heroesStore);

onMounted(() => {
  heroesStore.getHeroes();
});
</script>

<style lang="scss" scoped>
.hero-wrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 10px 20px;
}

.hero {
  font-size: 16px;
  line-height: 20px;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.hero-image {
  width: 118px;
}
</style>
