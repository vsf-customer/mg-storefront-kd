<template>
  <button
    class="bg-active rounded-full font-semibold leading-6 text-gray-700 text-xl h-[64px] md:h-[60px]"
    :style="widthStyle"
    :disabled="disabled"
    v-bind="$attrs"
    @click="$emit('click')"
  >
    <slot>Button</slot>
  </button>
</template>
<script>
import { computed } from '@nuxtjs/composition-api';

export default {
  name: 'ZnButton',
  props: {
    width: {
      type: String,
      required: false,
      default: '343px',
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
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
  @apply text-white bg-pressed;
}
button:disabled {
  @apply text-white bg-disabled;
}
</style>
