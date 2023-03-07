<template>
  <label class="ui-toggle">
    <input
      type="checkbox"
      class="input"
      :checked="props.modelValue"
      @click="onCheckboxClick"
    />
    <span class="checkbox"><i class="circle" /></span>
  </label>
</template>

<script setup lang="ts">
import { withDefaults } from 'vue';
import { EmitEvents } from '@/enum/emits';

interface Props {
  modelValue: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
});

const emit = defineEmits<{
  (e: EmitEvents.UPDATE_MODEL_VALUE, isChecked: boolean): void;
}>();

const onCheckboxClick = () => {
  emit(EmitEvents.UPDATE_MODEL_VALUE, !props.modelValue);
};
</script>

<style lang="scss" scoped>
.ui-toggle {
  display: block;
  position: relative;
  width: 3rem;
  height: 1.5rem;
  cursor: pointer;

  .input {
    position: relative;
    z-index: 1;
    appearance: none;
  }

  .checkbox {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: $red;
    border-radius: 1.5rem;
    transition: 0.3s;
  }

  .input:checked ~ .checkbox {
    background: $green;
  }

  .circle {
    position: absolute;
    top: 0.0625rem;
    left: 0.0625rem;
    width: 1.375rem;
    height: 1.375rem;
    border-radius: 50%;
    background: $white;
    transition: 0.3s;
  }

  .input:checked ~ .checkbox .circle {
    left: 1.5625rem;
  }
}
</style>
