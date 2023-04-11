<template>
  <button
    class="bg-active uppercase leading-6 text-white text-xl w-[343px] h-[51px] md:h-[60px]"
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
  @apply text-white bg-active;
}
button:disabled {
  @apply text-white bg-disabled;
}
</style>
