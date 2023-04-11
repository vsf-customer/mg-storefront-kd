<template>
  <button
    v-bind="$attrs"
    class="
      bg-white
      uppercase
      text-black text-xl
      border-black
      h-[60px]
      border-solid
      border-2
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
