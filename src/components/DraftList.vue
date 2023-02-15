<template>
  <div class="draft">
    <div class="draft-top-block">
      <div class="draft-player-name">{{ props.player.name }}</div>
      <div class="draft-timer"></div>
    </div>
    <div class="draft-wrapper">
      <div
        v-for="(hero, index) in props.player.pickedHeroes"
        :key="`${index}${props.player.id}picked`"
        class="draft-hero-pick"
      >
        <img
          :src="
            hero
              ? require(`@/assets/imgs/heroes/${hero.localized_name}.webp`)
              : require('@/assets/imgs/heroes/dota-placeholder.jpg')
          "
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
            :src="require(`@/assets/imgs/heroes/${hero.localized_name}.webp`)"
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
import { IPlayer } from '@/types/player';
import { PLACEHOLDER } from '@/constants/images';

interface Props {
  player: IPlayer;
}

const props = defineProps<Props>();
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
