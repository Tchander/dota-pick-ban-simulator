<template>
  <div class="confirmation">
    <div class="confirmation-image-wrapper">
      <img
        v-if="props.selectedHero"
        class="confirmation-image"
        :src="require(`@/assets/imgs/heroes/${props.selectedHero.localized_name}.webp`)"
        :alt="props.selectedHero.localized_name"
      />
    </div>
    <div class="confirmation-button">SUGGEST</div>
  </div>
</template>

<script setup lang="ts">
import { IHeroes } from '@/types';

interface Props {
  selectedHero: IHeroes | null;
}

const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
.confirmation {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: rgba(#222330, 0.5);
  border: 1px solid #222330;
  border-radius: 8px;
  box-shadow: 0 4px 20px 0 #222330;
  padding: 16px;
}

.confirmation-image-wrapper {
  border: 1px solid #222330;
  border-radius: 8px;
  box-shadow: 0 4px 20px 0 #222330;
  height: 100%;
  max-height: 196px;
}

.confirmation-image {
  width: 100%;
  border-radius: 8px;
}

.confirmation-button {
  @include font(20, 28, 700);
  padding: 16px;
  background-color: #3e3e48;
  color: #d9d9d9;
  border: 1px solid #222330;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #222330;
  }
}
</style>
