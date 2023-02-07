<template>
  <div>
    <div class="attribute-title">{{ ATTRIBUTE_TITLE_MAPPER[props.attributeTitle] }}</div>
    <div class="hero-wrapper">
      <img
        v-for="hero in props.heroes"
        :key="hero.id"
        class="hero"
        :src="require(`@/assets/imgs/heroes/${hero.localized_name}.webp`)"
        :alt="hero.localized_name"
        @click="handleClick(hero)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { IHeroes } from '@/types';
import { EmitEvents } from '@/enum/emits';
import { HeroesPrimaryAttribute } from '@/enum/heroes';
import { ATTRIBUTE_TITLE_MAPPER } from '@/constants/heroes';

const emit = defineEmits([EmitEvents.CLICKED]);

interface Props {
  heroes: IHeroes[];
  attributeTitle: HeroesPrimaryAttribute;
}

const props = defineProps<Props>();

const handleClick = (hero: IHeroes) => {
  emit(EmitEvents.CLICKED, hero);
};
</script>

<style lang="scss" scoped>
.attribute-title {
  @include font(24, 30, 700);
  color: #d9d9d9;
  margin-bottom: 10px;
}
.hero-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.hero {
  width: 84px;
  cursor: pointer;
}
</style>
