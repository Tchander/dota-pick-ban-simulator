<template>
  <div class="draft">
    <div class="draft-top-block">
      <div class="draft-player-name">{{ props.player.name }}</div>
      <div v-if="isTimer" class="draft-timer">
        <div class="draft-reserve-time">
          Reserve time: <span class="draft-time">{{ transformTime(reserveTime) }}</span>
        </div>
        <div class="draft-main-time">
          Main time: <span class="draft-time">{{ transformTime(mainTime) }}</span>
        </div>
      </div>
    </div>
    <div class="draft-wrapper">
      <div
        v-for="(hero, index) in props.player.pickedHeroes"
        :key="`${index}${props.player.id}picked`"
        class="draft-hero-pick"
      >
        <img
          :src="hero ? `src/assets/imgs/heroes/${hero.localized_name}.webp` : PLACEHOLDER"
          :alt="hero ? hero.localized_name : 'placeholder'"
          class="draft-hero-img draft-hero-img_pick"
        />
      </div>
    </div>
    <div class="draft-wrapper">
      <div
        v-for="(hero, idx) in props.player.bannedHeroes"
        :key="`${idx}${props.player.id}banned`"
        class="draft-hero-ban"
      >
        <template v-if="hero">
          <img
            v-if="hero"
            :src="`src/assets/imgs/heroes/${hero.localized_name}.webp`"
            :alt="hero.localized_name"
            class="draft-hero-img draft-hero-img_ban"
          />
          <div class="draft-crossed-ban-line" />
        </template>
        <img
          v-else
          :src="PLACEHOLDER"
          alt="placeholder"
          class="draft-hero-img draft-hero-img_ban"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useTimerStore } from '@/stores/timer';
import { useConfigStore } from '@/stores/config';
import { IPlayer } from '@/types';
import { PLACEHOLDER } from '@/constants/images';
import { SECONDS_IN_MINUTE } from '@/constants/numbers';
import { TeamList } from '@/enum/teams';

const configStore = useConfigStore();
const timerStore = useTimerStore();
const { radiantMainTime, radiantReserveTime, direMainTime, direReserveTime } =
  storeToRefs(timerStore);
const { isTimer } = storeToRefs(configStore);

interface Props {
  player: IPlayer;
  team: TeamList;
}

const props = defineProps<Props>();

const reserveTime = computed<number>(() => {
  if (props.team !== TeamList.RADIANT) return direReserveTime.value;
  return radiantReserveTime.value;
});

const mainTime = computed<number>(() => {
  if (props.team !== TeamList.RADIANT) return direMainTime.value;
  return radiantMainTime.value;
});

const transformTime = (time: number) => {
  const integer = Math.floor(time / SECONDS_IN_MINUTE);
  const fractional = Math.floor(time % SECONDS_IN_MINUTE);
  return `${integer}:${fractional >= 10 ? fractional : `0${fractional}`}`;
};
</script>

<style lang="scss" scoped>
.draft {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid $dark-blue;
  border-radius: 0.5rem;
}

.draft-top-block {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.draft-player-name {
  @include font(2, 3, 700);
}

.draft-timer {
  display: flex;
  gap: 2rem;
}

.draft-reserve-time {
  @include font(1.5, 2.25, 400);
}

.draft-main-time {
  @include font(1.5, 2.25, 400);
}

.draft-time {
  @include font(2, 3, 700);
}

.draft-wrapper {
  display: flex;
  gap: 1rem;
}

.draft-hero-pick {
  width: 20%;
  height: 5.5625rem;
  box-shadow: 0 0.25rem 1.25rem 0 $dark-blue;
}

.draft-hero-ban {
  width: 14%;
  height: 3.8125rem;
  position: relative;
}

.draft-hero-img {
  width: 100%;
  height: 100%;
  border: 1px solid transparent;
  border-radius: 0.4rem;

  &_ban {
    opacity: 0.2;
  }
}

.draft-hero-empty {
  width: 100%;
  height: 100%;
  border: 1px solid $dark-grey;
  border-radius: 0.4rem;
}

.draft-crossed-ban-line {
  display: block;
  width: calc(3.8125rem * 2.33);
  border-top: 0.25rem solid $red;
  transform: rotate(-30deg);
  transform-origin: left;
  position: absolute;
  top: 4rem;
  left: -0.5rem;
  border-radius: 0.5rem;
}
</style>
