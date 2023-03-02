<template>
  <div>
    <teleport to="body">
      <div v-if="props.modelValue" ref="modal" class="ui-modal">
        <div class="ui-modal-backdrop" />
        <div class="ui-modal-container">
          <div class="ui-modal-container-inner">
            <slot name="default">
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
            </slot>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script lang="ts" setup>
import { ref, withDefaults } from 'vue';
import { EmitEvents } from '@/enum/emits';

interface Props {
  modelValue: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
});

const emit = defineEmits<{
  (e: EmitEvents.UPDATE_MODEL_VALUE): void;
  (e: EmitEvents.CLICKED): void;
}>();

const refModal = ref<HTMLDivElement>();

function closeModal() {
  if (refModal.value) {
    refModal.value.blur();
  }

  emit(EmitEvents.UPDATE_MODEL_VALUE);
}
</script>

<style lang="scss" scoped>
.ui-modal {
  height: 100%;
  left: 0;
  top: 0;
  position: fixed;
  width: 100%;
  z-index: 1001;
  padding: 2rem 1rem;
  overflow-y: auto;
  text-align: center;

  &:before {
    content: '';
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }
}

.ui-modal-backdrop {
  background: rgba($black, 0.8);
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  z-index: 1002;
}

.ui-modal-container {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  text-align: left;
  background-color: $dark-grey;
  box-shadow: 0 0.5rem 0.625rem -0.375px rgba(16, 24, 40, 0.1),
    0 1.25rem 1.5625rem -0.3125rem rgba(16, 24, 40, 0.1);
  border-radius: 0.5rem;
  min-height: 12.5rem;
  padding: 2.5rem 1.5rem;
  z-index: 1003;

  max-width: 100%;
  overflow-x: auto;
}

.ui-modal-container-inner {
  position: relative;
  width: fit-content;
}
</style>
