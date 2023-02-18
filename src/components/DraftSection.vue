<template>
  <div class="section">
    <!--    <ui-modal v-model="state.showSelectFirstPickModal">-->
    <!--      <div class="modal-title">Choose who will have the first pick?</div>-->
    <!--      <div class="modal-buttons">-->
    <!--        <ui-button class="modal-button" :background-color="'green'">RADIANT</ui-button>-->
    <!--        <ui-button class="modal-button" :background-color="'red'">DIRE</ui-button>-->
    <!--      </div>-->
    <!--    </ui-modal>-->
    <select-first-pick
      v-model="state.showSelectFirstPickModal"
      @clicked="firstPickChosen"
    />
    <div class="heroes-wrapper">
      <div class="heroes">
        <hero-list
          v-for="attribute in primaryAttributes"
          :key="attribute"
          class="heroes-list"
          :heroes="heroesFilter(attribute)"
          :attribute-title="attribute"
          :selected-hero="state.selectedHero"
          @clicked="changeSelectedHero"
        />
      </div>
      <confirmation-hero
        :selected-hero="state.selectedHero"
        class="confirmation"
        @reset="resetSelectedHero"
      />
    </div>
    <draft-info />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { reactive, onMounted } from 'vue';
import { useHeroesStore } from '@/stores/heroes';
import { usePlayerStore } from '@/stores/player';
import HeroList from '@/components/HeroList.vue';
import ConfirmationHero from '@/components/ConfirmationHero.vue';
import DraftInfo from '@/components/DraftInfo.vue';
import { IHero } from '@/types';
import { HeroesPrimaryAttribute } from '@/enum/heroes';
import SelectFirstPick from '@/components/SelectFirstPick.vue';

interface State {
  selectedHero: IHero | null;
  isRadiantPickFirst: boolean;
  showSelectFirstPickModal: boolean;
}

const state = reactive<State>({
  selectedHero: null,
  isRadiantPickFirst: true,
  showSelectFirstPickModal: true,
});

const heroesStore = useHeroesStore();
const playerStore = usePlayerStore();
const { heroes } = storeToRefs(heroesStore);

const primaryAttributes = [
  HeroesPrimaryAttribute.STRENGTH,
  HeroesPrimaryAttribute.AGILITY,
  HeroesPrimaryAttribute.INTELLIGENCE,
];

const heroesFilter = (attr: HeroesPrimaryAttribute) => {
  const result: IHero[] = heroes.value.filter((hero: IHero) => {
    return hero.primary_attr === attr;
  });

  return result.sort((a: IHero, b: IHero) => {
    return a.localized_name.localeCompare(b.localized_name);
  });
};

const changeSelectedHero = (hero: IHero) => {
  state.selectedHero = hero;
};

const resetSelectedHero = () => {
  state.selectedHero = null;
};

const firstPickChosen = (isRadiantFirstPick: boolean) => {
  console.log(isRadiantFirstPick);
  state.showSelectFirstPickModal = false;
};

const startGame = () => {};

const init = () => {
  playerStore.setNumberOfPickedHeroes();
  playerStore.setNumberOfBannedHeroes();
};

onMounted(() => {
  init();
});
</script>

<style lang="scss" scoped>
.section {
  display: flex;
  flex-direction: column;
  max-width: 100%;
  padding: 0.6rem 2.4rem;
}

//.modal-title {
//  @include font(2, 2.5, 700);
//  color: $light-grey;
//  margin-bottom: 8rem;
//}
//
//.modal-buttons {
//  display: flex;
//  gap: 1rem;
//}

.heroes-wrapper {
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
}

.heroes {
  display: flex;
  flex-direction: column;
  width: calc(100% - 20.75rem);
}

.heroes-list {
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
}

.confirmation {
  width: 18.75rem;
}
</style>
