<template>
  <ui-modal v-bind="$attrs">
    <div class="modal-title">Select draft settings</div>
    <div class="modal-item">
      <ui-toggle-checkbox v-model="state.isFirstPickRadiant" />
      <div class="modal-label">{{ state.isFirstPickRadiant ? 'Radiant' : 'Dire' }}</div>
    </div>
    <ui-button class="modal-button" @clicked="confirm()">CONFIRM</ui-button>
  </ui-modal>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import UiModal from '@/components/Ui/UiModal.vue';
import UiButton from '@/components/Ui/UiButton.vue';
import { EmitEvents } from '@/enum/emits';
import UiToggleCheckbox from '@/components/Ui/UiToggleCheckbox.vue';

const emit = defineEmits<{
  (e: EmitEvents.CLICKED): void;
}>();

interface State {
  isFirstPickRadiant: boolean;
}

const state = reactive<State>({
  isFirstPickRadiant: true,
});

const confirm = () => {
  emit(EmitEvents.CLICKED);
};
</script>

<style lang="scss" scoped>
.modal-title {
  @include font(2, 2.5, 700);
  color: $light-grey;
  margin-bottom: 2rem;
}

.modal-item {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.modal-label {
  @include font(1, 1.5, 400);
}
</style>
