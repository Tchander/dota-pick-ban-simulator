<template>
  <div
    class="ui-button"
    :class="[`background_${props.backgroundColor}`, `color_${props.color}`]"
    @click="handleClick()"
  >
    <slot name="default">
      <span>Click me</span>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { EmitEvents } from '@/enum/emits';

const emit = defineEmits<{
  (e: EmitEvents.CLICKED): void;
}>();

interface Props {
  backgroundColor?: string;
  color?: string;
}

const props = withDefaults(defineProps<Props>(), {
  backgroundColor: 'dark-blue',
  color: 'light-grey',
});

const handleClick = () => {
  emit(EmitEvents.CLICKED);
};
</script>

<style lang="scss" scoped>
.ui-button {
  @include font(1.25, 1.75, 700);
  padding: 1rem;
  width: 100%;
  border-radius: 0.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.background {
  &_dark-blue {
    background-color: $dark-blue;
    border: 1px solid $dark-blue;

    &:hover {
      background-color: $dark-blue;
    }
  }

  &_green {
    background-color: $green;
    border: 1px solid $green;

    &:hover {
      background-color: $dark-green;
      border: 1px solid $dark-green;
    }
  }

  &_red {
    background-color: $light-red;
    border: 1px solid $light-red;

    &:hover {
      background-color: $dark-red;
      border: 1px solid $dark-red;
    }
  }
}

.color {
  &_light-grey {
    color: $light-grey;
  }
}
</style>
