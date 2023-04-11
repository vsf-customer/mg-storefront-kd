<template>
  <button
    v-bind="$attrs"
    class="
      bg-white
      uppercase
      py-5
      leading-6
      text-active text-xl
      border-active
      border-solid
      border
    "
    :style="widthStyle"
    @click="$emit('click')"
  >
    <slot>Button</slot>
  </button>
</template>
<script>
import { computed } from '@nuxtjs/composition-api';

export default {
  name: 'ZnSecondaryButton',
  props: {
    width: {
      type: String,
      required: false,
      default: '343px',
    },
  },
  emits: ['click'],
  setup(props) {
    const widthStyle = computed(() => ({
      width: props.width,
    }));

    return {
      widthStyle,
    };
  },
};
</script>
<style lang="scss" scoped>
button:active {
  @apply text-gray-750 bg-pressed-secondary;
}
button:disabled {
  @apply border-disabled text-disabled;
}
</style>
