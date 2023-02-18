<template>
  <div class="confirmation">
    <div class="confirmation-image-wrapper">
      <img
        class="confirmation-image"
        :src="
          props.selectedHero
            ? require(`@/assets/imgs/heroes/${props.selectedHero.localized_name}.webp`)
            : PLACEHOLDER
        "
        :alt="props.selectedHero ? props.selectedHero.localized_name : 'placeholder'"
      />
    </div>
    <div class="confirmation-button-wrapper">
      <ui-button @clicked="confirmHeroPick">PICK</ui-button>
      <ui-button @clicked="confirmHeroBan">BAN</ui-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { IHero } from '@/types';
import { useHeroesStore } from '@/stores/heroes';
import { usePlayerStore } from '@/stores/player';
import { EmitEvents } from '@/enum/emits';
import { PLACEHOLDER } from '@/constants/images';
import UiButton from '@/components/Ui/UiButton.vue';

const heroesStore = useHeroesStore();
const playerStore = usePlayerStore();

const emit = defineEmits<{
  (e: EmitEvents.RESET): void;
}>();

interface Props {
  selectedHero: IHero;
}

const props = defineProps<Props>();

interface State {
  currentPickNumber: number;
  currentBanNumber: number;
}

const state = reactive<State>({
  currentPickNumber: 0,
  currentBanNumber: 0,
});

const confirmHeroPick = () => {
  heroesStore.heroPicked(props.selectedHero);
  playerStore.pickHero(
    props.selectedHero,
    playerStore.radiantPlayer,
    state.currentPickNumber,
  );
  state.currentPickNumber++;
  emit(EmitEvents.RESET);
};

const confirmHeroBan = () => {
  heroesStore.heroBanned(props.selectedHero);
  playerStore.banHero(
    props.selectedHero,
    playerStore.radiantPlayer,
    state.currentBanNumber,
  );
  state.currentBanNumber++;
  emit(EmitEvents.RESET);
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
