<template>
  <button
    class="blue-link underline font-semibold" 
    v-bind="$attrs"
    @click.prevent="$emit('click')"
  >
    <slot>{{ title }}</slot>
  </button>
</template>
<script>

export default {
  name: 'ZnBlueLink',
  props: {
    title: {
      type: String,
      required: false,
      default: 'Edit',
    },
  },
  emits: ['click'],
  setup() {
    return {
    };
  },
};
</script>

<style lang="scss" scoped>

    .blue-link {
        color: #005769;
        &:hover {
            color: #005769;
        }
    }
</style>
