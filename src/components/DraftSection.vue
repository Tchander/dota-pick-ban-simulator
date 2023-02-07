<template>
  <div class="section">
    <div class="heroes-wrapper">
      <div class="heroes">
        <hero-list
          v-for="attribute in primaryAttributes"
          :key="attribute"
          class="heroes-list"
          :heroes="heroesFilter(attribute)"
          :attribute-title="attribute"
          @clicked="changeSelectedHero"
        />
      </div>
      <confirmation-hero :selected-hero="state.selectedHero" class="confirmation" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { reactive } from 'vue';
import { HeroesPrimaryAttribute } from '@/enum/heroes';
import { useHeroesStore } from '@/stores/heroes';
import HeroList from '@/components/HeroList.vue';
import ConfirmationHero from '@/components/ConfirmationHero.vue';
import { IHeroes } from '@/types';

interface State {
  selectedHero: IHeroes | null;
}

const state = reactive<State>({
  selectedHero: null,
});

const heroesStore = useHeroesStore();
const { heroes } = storeToRefs(heroesStore);

const primaryAttributes = [
  HeroesPrimaryAttribute.STRENGTH,
  HeroesPrimaryAttribute.AGILITY,
  HeroesPrimaryAttribute.INTELLIGENCE,
];

const heroesFilter = (attr: HeroesPrimaryAttribute) => {
  const result: IHeroes[] = heroes.value.filter((hero: IHeroes) => {
    return hero.primary_attr === attr;
  });

  return result.sort((a: IHeroes, b: IHeroes) => {
    return a.localized_name.localeCompare(b.localized_name);
  });
};

const changeSelectedHero = (hero: IHeroes) => {
  state.selectedHero = hero;
};
</script>

<style lang="scss" scoped>
.section {
  display: flex;
  flex-direction: column;
  max-width: 100%;
  padding: 10px 40px;
}

.heroes-wrapper {
  display: flex;
  gap: 40px;
}

.heroes {
  display: flex;
  flex-direction: column;
  width: 80%;
}

.heroes-list {
  &:not(:last-child) {
    margin-bottom: 40px;
  }
}

.confirmation {
  width: 20%;
}
</style>
