<template>
  <ui-modal v-bind="$attrs">
    <div class="modal-title">Select draft settings</div>
    <div class="modal-item">
      <div class="modal-item-title">Choose first pick:</div>
      <div class="modal-item-toggle">
        <ui-toggle-checkbox v-model="state.isFirstPickRadiant" />
        <div class="modal-label">
          {{ state.isFirstPickRadiant ? TeamList.RADIANT : TeamList.DIRE }}
        </div>
      </div>
    </div>
    <div class="modal-item">
      <div class="modal-item-title">Timer:</div>
      <div class="modal-item-toggle">
        <ui-toggle-checkbox v-model="state.isTimer" />
        <div class="modal-label">{{ state.isTimer ? 'On' : 'Off' }}</div>
      </div>
    </div>
    <ui-button class="modal-button" @clicked="confirm()">CONFIRM</ui-button>
  </ui-modal>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import UiModal from '@/components/Ui/UiModal.vue';
import UiButton from '@/components/Ui/UiButton.vue';
import UiToggleCheckbox from '@/components/Ui/UiToggleCheckbox.vue';
import { EmitEvents } from '@/enum/emits';
import { TeamList } from '@/enum/teams';

const emit = defineEmits<{
  (e: EmitEvents.CLICKED, isFirstPickRadiant: boolean, isTimer: boolean): void;
}>();

interface State {
  isFirstPickRadiant: boolean;
  isTimer: boolean;
}

const state = reactive<State>({
  isFirstPickRadiant: true,
  isTimer: true,
});

const confirm = () => {
  emit(EmitEvents.CLICKED, state.isFirstPickRadiant, state.isTimer);
};
</script>

<style lang="scss" scoped>
.modal-title {
  @include font(2, 2.5, 700);
  color: $light-grey;
  margin-bottom: 1rem;
}

.modal-item {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  margin-bottom: 1.2rem;
}

.modal-item-toggle {
  display: flex;
  gap: 0.5rem;
}

.modal-item-title {
  @include font(1.2, 1.8, 500);
}

.modal-label {
  @include font(1, 1.5, 400);
}
</style>
