<template>
  <div
    class="zn-small-modal absolute inset-0 h-full m-0 p-0 flex flex-center-align w-screen"
    :data-test="`${dataTest}-outer`"
  >
    <div class="overlay z-10" />
    <div
      class="zn-small-modal-modal px-6 md:px-5 pb-4 pt-9 md:pt-10 mx-6 flex flex-col bg-white rounded-2xl z-20 sm:mx-[34px] max-w-[480px]"
      :style="{width}"
      :data-test="dataTest"
    >
      <slot
        v-if="title || $slots.title"
        name="title"
      >
        <div
          class="zn-small-modal-title font-semibold text-[21px]"
          :data-test="`${dataTest}-title`"
        >
          {{ title }}
        </div>
      </slot>
      <slot
        v-if="content || $slots.default"
        name="default"
      >
        <div
          class="zn-small-modal-content text-lg font-normal mt-4"
          :data-test="`${dataTest}-content`"
        >
          {{ content }}
        </div>
      </slot>
      <slot name="after-content" />
      <div class="flex flex-col flex-center-align mt-4">
        <slot
          v-if="showPrimaryButton"
          name="primary-button"
        >
          <zn-button
            :data-test="`${dataTest}-primary`"
            class="primary-button mb-[15px] md:mb-[26px]"
            :width="widthPrimaryButton"
            @click="clickedPrimary"
          >
            {{ primaryButtonLabel }}
          </zn-button>
        </slot>
        <slot
          v-if="showCancelButton"
          name="cancel-button"
        >
          <zn-secondary-button
            :data-test="`${dataTest}-secondary`"
            @click="clickedSecondary"
          >
            {{ cancelButtonLabel }}
          </zn-secondary-button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import ZnButton from './ZnButton.vue';
import ZnSecondaryButton from './ZnSecondaryButton.vue';

export default {
  name: 'ZnSmallModal',
  components: { ZnButton, ZnSecondaryButton },
  props: {
    title: {
      type: String,
      default: undefined,
      required: false,
    },
    content: {
      type: String,
      default: undefined,
      required: false,
    },
    showPrimaryButton: {
      type: Boolean,
      default: true,
      required: false,
    },
    primaryButtonLabel: {
      type: String,
      default: 'Ok',
      required: false,
    },
    showCancelButton: {
      type: Boolean,
      default: false,
      required: false,
    },
    cancelButtonLabel: {
      type: String,
      default: 'Cancel',
      required: false,
    },
    widthPrimaryButton: {
      type: String,
      default: undefined,
      required: false,
    },
    width: {
      type: String,
      default: '',
      required: false,
    },
    dataTest: {
      type: String,
      default: 'znSmallModal',
      required: false,
    },
  },
  emits: ['clickedPrimary', 'clickedSecondary'],
  setup(_, { emit }) {
    const clickedPrimary = () => {
      emit('clickedPrimary');
    };

    const clickedSecondary = () => {
      emit('clickedSecondary');
    };

    return {
      clickedPrimary,
      clickedSecondary,
    };
  },
};
</script>
<style lang="scss" scoped>
.zn-small-modal {
  background-color: rgba(51,51,51,0.4);
  z-index: 9999;
}

.overlay {
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0, 0.4);
  @apply absolute top-0 left-0;
}

a {
  color: #005769;
  &:hover {
    color: #005769;
  }
}
</style>
