<template>
  <ui-modal>
    <div class="modal-title">Choose who will have the first pick?</div>
    <div class="modal-buttons">
      <ui-button
        class="modal-button"
        :background-color="'green'"
        @clicked="firstPickChosen(true)"
        >RADIANT</ui-button
      >
      <ui-button
        class="modal-button"
        :background-color="'red'"
        @clicked="firstPickChosen(false)"
        >DIRE</ui-button
      >
    </div>
  </ui-modal>
</template>

<script setup lang="ts">
import UiModal from '@/components/Ui/UiModal.vue';
import UiButton from '@/components/Ui/UiButton.vue';
import { EmitEvents } from '@/enum/emits';

const emit = defineEmits<{
  (e: EmitEvents.CLICKED, isRadiantFirstPick: boolean): void;
}>();

const firstPickChosen = (isRadiantFirstPick: boolean) => {
  emit(EmitEvents.CLICKED, isRadiantFirstPick);
};
</script>

<style lang="scss" scoped>
.modal-title {
  @include font(2, 2.5, 700);
  color: $light-grey;
  margin-bottom: 8rem;
}

.modal-buttons {
  display: flex;
  gap: 1rem;
}
</style>
