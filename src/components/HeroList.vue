<template>
  <div>
    <div class="attribute-title">{{ ATTRIBUTE_TITLE_MAPPER[props.attributeTitle] }}</div>
    <div class="hero-wrapper">
      <div
        v-for="hero in props.heroes"
        :key="hero.id"
        class="hero"
        :class="[
          { hero_disabled: hero.isPicked || hero.isBanned },
          { hero_active: props.selectedHero ? props.selectedHero.id === hero.id : '' },
        ]"
      >
        <img
          class="hero-img"
          :class="{ 'hero-img_disabled': hero.isPicked || hero.isBanned }"
          :src="require(`@/assets/imgs/heroes/${hero.localized_name}.webp`)"
          :alt="hero.localized_name"
          @click="handleClick(hero)"
        />
        <div
          class="hero-banned-line"
          :class="{ 'hero-banned-line_active': hero.isBanned }"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IHero } from '@/types';
import { EmitEvents } from '@/enum/emits';
import { HeroesPrimaryAttribute } from '@/enum/heroes';
import { ATTRIBUTE_TITLE_MAPPER } from '@/constants/heroes';

const emit = defineEmits<{
  (e: EmitEvents.CLICKED, hero: IHero): void;
}>();

interface Props {
  heroes: IHero[];
  attributeTitle: HeroesPrimaryAttribute;
  selectedHero: IHero | null;
}

const props = defineProps<Props>();

const handleClick = (hero: IHero) => {
  if (!hero.isPicked && !hero.isBanned) {
    emit(EmitEvents.CLICKED, hero);
  }
};
</script>

<style lang="scss" scoped>
.attribute-title {
  @include font(1.5, 1.85, 700);
  color: $light-grey;
  margin-bottom: 0.625rem;
}

.hero-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.hero {
  width: 5.25rem;
  height: 2.9375rem;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    scale: 1.1;
    border: 1px solid $light-grey;
  }

  &_disabled {
    &:hover {
      scale: none;
      cursor: default;
      border: none;
    }
  }

  &_active {
    scale: 1.1;
    border: 1px solid $light-grey;
  }
}

.hero-img {
  width: 100%;
  height: 100%;
  border: 1px solid transparent;
  border-radius: 0.2rem;

  &_disabled {
    opacity: 0.2;
  }
}

.hero-banned-line {
  display: none;

  &_active {
    display: block;
    width: calc(5.25rem * 1.35);
    border-top: 0.25rem solid $red;
    transform: rotate(-30deg);
    transform-origin: left;
    position: relative;
    top: 0;
    left: -0.5rem;
    border-radius: 0.5rem;
  }
}
</style>
