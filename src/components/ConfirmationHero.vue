<template>
  <div class="confirmation">
    <div class="confirmation-image-wrapper">
      <img
        class="confirmation-image"
        :src="
          props.selectedHero
            ? `src/assets/imgs/heroes/${props.selectedHero.localized_name}.webp`
            : PLACEHOLDER
        "
        :alt="props.selectedHero ? props.selectedHero.localized_name : 'placeholder'"
      />
    </div>
    <div class="confirmation-button-wrapper">
      <ui-button
        :background-color="props.isPick ? Colors.GREEN : Colors.RED"
        :is-disabled="isButtonDisabled"
        @clicked="heroClicked"
        >{{ props.isPick ? 'PICK' : 'BAN' }}</ui-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { IHero } from '@/types';
import { useHeroesStore } from '@/stores/heroes';
import { usePlayerStore } from '@/stores/player';
import { EmitEvents } from '@/enum/emits';
import { PLACEHOLDER } from '@/constants/images';
import UiButton from '@/components/Ui/UiButton.vue';
import { Colors } from '@/enum/ui';

const heroesStore = useHeroesStore();
const playerStore = usePlayerStore();

const emit = defineEmits<{
  (e: EmitEvents.CLICKED, hero: IHero | null): void;
}>();

interface Props {
  selectedHero: IHero | null;
  isPick: boolean;
}

const props = defineProps<Props>();

const isButtonDisabled = computed<boolean>(() => {
  return !props.selectedHero;
});

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
