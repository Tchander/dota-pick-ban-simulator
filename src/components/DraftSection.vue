<template>
  <div class="section">
    <draft-settings
      v-model="state.showSelectFirstPickModal"
      @clicked="settingsConfirmed"
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
import { reactive, onMounted, computed, watch } from 'vue';
import { useHeroesStore } from '@/stores/heroes';
import { usePlayerStore } from '@/stores/player';
import HeroList from '@/components/HeroList.vue';
import ConfirmationHero from '@/components/ConfirmationHero.vue';
import DraftInfo from '@/components/DraftInfo.vue';
import { IHero, IPlayer } from '@/types';
import { HeroesPrimaryAttribute } from '@/enum/heroes';
import {
  PICK_ROUNDS,
  FIRST_PICK_PICK_ROUNDS,
  FIRST_PICK_BAN_ROUNDS,
  ROUND_COUNTER_MAPPER,
  DEFAULT_NUMBER_OF_ROUNDS,
  ONE_SECOND,
} from '@/constants/numbers';
import DraftSettings from '@/components/DraftSettings.vue';
import { useConfigStore } from '@/stores/config';
import { useTimerStore } from '@/stores/timer';
import { TimerMapper } from '@/enum/timer';

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
const configStore = useConfigStore();
const timerStore = useTimerStore();
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
  if (state.roundCounter > DEFAULT_NUMBER_OF_ROUNDS) return;
  state.selectedHero = hero;
};

const setTeamsByFirstPick = () => {
  if (configStore.isRadiantFirstPick) {
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

const timerStart = () => {
  window.clearInterval(timerStore.radiantTimerInterval);
  window.clearInterval(timerStore.direTimerInterval);
  timerStore.setTimeByDefault(TimerMapper.RADIANT_MAIN_TIME);
  timerStore.setTimeByDefault(TimerMapper.DIRE_MAIN_TIME);

  if (state.roundCounter > DEFAULT_NUMBER_OF_ROUNDS) return;

  if (
    FIRST_PICK_PICK_ROUNDS.includes(state.roundCounter) ||
    FIRST_PICK_BAN_ROUNDS.includes(state.roundCounter)
  ) {
    if (configStore.isRadiantFirstPick) {
      timerStore.radiantTimerInterval = window.setInterval(() => {
        if (timerStore.radiantMainTime === 0) {
          if (timerStore.radiantReserveTime === 0) {
            heroChosen(null);
          } else {
            timerStore.decreaseTimer(TimerMapper.RADIANT_RESERVE_TIME);
          }
        } else {
          timerStore.decreaseTimer(TimerMapper.RADIANT_MAIN_TIME);
        }
      }, ONE_SECOND);
    } else {
      timerStore.direTimerInterval = window.setInterval(() => {
        if (timerStore.direMainTime === 0) {
          if (timerStore.direReserveTime === 0) {
            heroChosen(null);
          } else {
            timerStore.decreaseTimer(TimerMapper.DIRE_RESERVE_TIME);
          }
        } else {
          timerStore.decreaseTimer(TimerMapper.DIRE_MAIN_TIME);
        }
      }, ONE_SECOND);
    }
  } else if (configStore.isRadiantFirstPick) {
    timerStore.direTimerInterval = window.setInterval(() => {
      if (timerStore.direMainTime === 0) {
        if (timerStore.direReserveTime === 0) {
          heroChosen(null);
        } else {
          timerStore.decreaseTimer(TimerMapper.DIRE_RESERVE_TIME);
        }
      } else {
        timerStore.decreaseTimer(TimerMapper.DIRE_MAIN_TIME);
      }
    }, ONE_SECOND);
  } else {
    timerStore.radiantTimerInterval = window.setInterval(() => {
      if (timerStore.radiantMainTime === 0) {
        if (timerStore.radiantReserveTime === 0) {
          heroChosen(null);
        } else {
          timerStore.decreaseTimer(TimerMapper.RADIANT_RESERVE_TIME);
        }
      } else {
        timerStore.decreaseTimer(TimerMapper.RADIANT_MAIN_TIME);
      }
    }, ONE_SECOND);
  }
};

const settingsConfirmed = (isRadiantFirstPick: boolean, isTimer: boolean) => {
  state.showSelectFirstPickModal = false;
  configStore.setIsRadiantFirstPick(isRadiantFirstPick);
  configStore.setTimer(isTimer);
  setTeamsByFirstPick();

  if (configStore.isTimer) {
    timerStart();
  }
};

const init = () => {
  playerStore.setNumberOfPickedHeroes();
  playerStore.setNumberOfBannedHeroes();
};

watch(
  () => state.roundCounter,
  () => {
    if (configStore.isTimer) {
      timerStart();
    }
  },
);

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
