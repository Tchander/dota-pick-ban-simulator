<template>
  <div class="confirmation">
    <div class="confirmation-image-wrapper">
      <img
        class="confirmation-image"
        :src="
          props.selectedHero !== NO_HERO
            ? getImageByName(`heroes/${props.selectedHero.localized_name}.webp`)
            : PLACEHOLDER
        "
        :alt="
          props.selectedHero !== NO_HERO
            ? props.selectedHero.localized_name
            : 'placeholder'
        "
      />
    </div>
    <div class="confirmation-button-wrapper">
      <ui-button
        :background-color="props.isPick ? Colors.GREEN : Colors.RED"
        :is-disabled="props.selectedHero === NO_HERO"
        @clicked="heroClicked"
        >{{ props.isPick ? 'PICK' : 'BAN' }}</ui-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { IHero, NoHero } from '@/types';
import { useHeroesStore } from '@/stores/heroes';
import { usePlayerStore } from '@/stores/player';
import UiButton from '@/components/Ui/UiButton.vue';
import { EmitEvents } from '@/enum/emits';
import { PLACEHOLDER } from '@/constants/images';
import { NO_HERO } from '@/constants/heroes';
import { Colors } from '@/enum/ui';
import { getImageByName } from '@/helpers';

const heroesStore = useHeroesStore();
const playerStore = usePlayerStore();

const emit = defineEmits<{
  (e: EmitEvents.CLICKED, hero: IHero | NoHero): void;
}>();

interface Props {
  selectedHero: IHero | NoHero;
  isPick: boolean;
}

const props = defineProps<Props>();

const heroClicked = () => {
  if (props.isPick) {
    heroesStore.heroPicked(props.selectedHero);
  } else {
    heroesStore.heroBanned(props.selectedHero);
  }
  emit(EmitEvents.CLICKED, props.selectedHero);
};
</script>

<style lang="scss" scoped>
.confirmation {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: rgba($dark-blue, 0.5);
  border: 1px solid $dark-blue;
  border-radius: 0.5rem;
  box-shadow: 0 0.25rem 1.25rem 0 $dark-blue;
  padding: 1rem;
}

.confirmation-image-wrapper {
  border: 1px solid $dark-blue;
  border-radius: 0.5rem;
  box-shadow: 0 0.25rem 1.25rem 0 $dark-blue;
  height: 9.3125rem;
}

.confirmation-image {
  width: 100%;
  border-radius: 0.5rem;
}

.confirmation-button-wrapper {
  display: flex;
  gap: 20px;
}
</style>
