<template>
  <button
    v-bind="$attrs"
    class="
      bg-white
      rounded-full
      py-5
      font-semibold
      leading-6
      text-primary text-xl
      border-secondary
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
    const widthStyle = computed(() => {
      return {
        width: props.width,
      };
    });

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
