<template>
  <div class="section">
    <draft-settings v-model="state.showSelectFirstPickModal" @clicked="firstPickChosen" />
    <!--    <select-first-pick-->
    <!--      v-model="state.showSelectFirstPickModal"-->
    <!--      @clicked="firstPickChosen"-->
    <!--    />-->
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
        :is-pick="isPick"
        class="confirmation"
        @clicked="heroChosen"
      />
    </div>
    <draft-info />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { reactive, onMounted, computed } from 'vue';
import { useHeroesStore } from '@/stores/heroes';
import { usePlayerStore } from '@/stores/player';
import HeroList from '@/components/HeroList.vue';
import ConfirmationHero from '@/components/ConfirmationHero.vue';
import DraftInfo from '@/components/DraftInfo.vue';
import SelectFirstPick from '@/components/SelectFirstPick.vue';
import { IHero, IPlayer } from '@/types';
import { HeroesPrimaryAttribute } from '@/enum/heroes';
import {
  PICK_ROUNDS,
  FIRST_PICK_PICK_ROUNDS,
  FIRST_PICK_BAN_ROUNDS,
  ROUND_COUNTER_MAPPER,
} from '@/constants/numbers';
import DraftSettings from '@/components/DraftSettings.vue';

interface State {
  selectedHero: IHero | null;
  showSelectFirstPickModal: boolean;
  roundCounter: number;
  firstPickPlayer?: IPlayer;
  secondPickPlayer?: IPlayer;
}

const state = reactive<State>({
  selectedHero: null,
  showSelectFirstPickModal: true,
  roundCounter: 1,
  firstPickPlayer: undefined,
  secondPickPlayer: undefined,
});

const heroesStore = useHeroesStore();
const playerStore = usePlayerStore();
const { heroes } = storeToRefs(heroesStore);

const primaryAttributes = [
  HeroesPrimaryAttribute.STRENGTH,
  HeroesPrimaryAttribute.AGILITY,
  HeroesPrimaryAttribute.INTELLIGENCE,
];

const isPick = computed<boolean>(() => {
  return PICK_ROUNDS.includes(state.roundCounter);
});

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

const firstPickChosen = (isRadiantFirstPick: boolean) => {
  state.showSelectFirstPickModal = false;
  if (isRadiantFirstPick) {
    state.firstPickPlayer = playerStore.radiantPlayer;
    state.secondPickPlayer = playerStore.direPlayer;
  } else {
    state.firstPickPlayer = playerStore.direPlayer;
    state.secondPickPlayer = playerStore.radiantPlayer;
  }
};

const heroPicked = (hero: IHero | null) => {
  const counter = ROUND_COUNTER_MAPPER[state.roundCounter];
  if (FIRST_PICK_PICK_ROUNDS.includes(state.roundCounter)) {
    playerStore.pickHero(hero, counter, state.firstPickPlayer);
  } else {
    playerStore.pickHero(hero, counter, state.secondPickPlayer);
  }
};

const heroBanned = (hero: IHero | null) => {
  const counter = ROUND_COUNTER_MAPPER[state.roundCounter];
  if (FIRST_PICK_BAN_ROUNDS.includes(state.roundCounter)) {
    playerStore.banHero(hero, counter, state.firstPickPlayer);
  } else {
    playerStore.banHero(hero, counter, state.secondPickPlayer);
  }
};

const heroChosen = (hero: IHero | null) => {
  if (isPick.value) {
    heroPicked(hero);
  } else {
    heroBanned(hero);
  }
  state.roundCounter++;
  state.selectedHero = null;
};

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
