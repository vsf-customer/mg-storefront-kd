<template>
  <div
    class="zn-dual-select flex flex-col"
    :data-test="dataTestId"
  >
    <label
      v-if="showLabel"
      class="flex-1 font-semibold text-gray-700 text-base"
      :class="{ 'text-gray-400': disabled }"
    >{{ title }}</label>
    <div
      v-click-outside="() => toggleActive(false)"
      class="relative"
    >
      <div
        ref="dualSelectElm"
        class="flex dual-select items-center cursor-pointer h-12 px-1"
        @click.prevent="toggleActive(true)"
      >
        <div
          class="flex-grow px-1"
          v-bind="{[`data-value-${dataTestId}`]: valueData}"
        >
          {{ valueData }}
        </div>
        <div
          class="h-full w-6 flex-shrink-0 flex items-center justify-center"
          @click="toggleActive(!isActive)"
        >
          <SfIcon
            :icon="isActive ? 'chevron_up' : 'chevron_down'"
            size="xxs"
          />
        </div>
      </div>
      <div
        v-if="isActive"
        :class="`absolute flex dual-dropdown bg-white text-center max-h-60	overflow-auto ${dualDropdownStyle}`"
      >
        <div class="w-1/2 separate-border">
          <div class="dual-header py-1">
            -
          </div>
          <div
            v-for="(val, index) in optionsList"
            :key="`minus${index}`"
            :class="`py-1 ${selectedValue == -1 * val ? 'selected-value' : ''}`"
            class="cursor-pointer hover:bg-gray-100"
            @click.prevent="setValue(-1 * val)"
          >
            -{{ val }}
          </div>
        </div>
        <div class="w-1/2">
          <div class="dual-header py-1">
            +
          </div>
          <div
            :class="`py-1 ${selectedValue == 0.00 ? 'selected-value' : ''}`"
            class="cursor-pointer hover:bg-gray-100"
            @click.prevent="setValue(0.00)"
          >
            0.00
          </div>
          <div
            v-for="(val, index) in optionsList"
            :key="`plus${index}`"
            :class="`py-1 ${selectedValue == val ? 'selected-value' : ''}`"
            class="cursor-pointer hover:bg-gray-100"
            @click.prevent="setValue(1 * val)"
          >
            +{{ val }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, computed, watch } from '@nuxtjs/composition-api';
import { SfIcon } from '@storefront-ui/vue';

export default {
  name: 'ZnDualSelect',
  components: { SfIcon },
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    title: {
      type: String,
      required: false,
      default: '',
    },
    value: {
      type: [Object, Number, String],
      required: false,
      default: undefined,
    },
    showLabel: {
      type: Boolean,
      required: false,
      default: true,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 0,
    },
    step: {
      type: Number,
      default: 1,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    dataTestId: {
      type: String,
      required: false,
      default: undefined,
    },
  },
  emits: ['change'],
  setup(props, { emit }) {
    const isActive = ref(false);
    const dualSelectElm = ref(null);
    const valueData = ref(props.value);
    const selectedValue = computed(() => props.value || valueData);
    const dualDropdownStyle = computed(() => {
      if (dualSelectElm.value) {
        const bottom = window.innerHeight - dualSelectElm.value.getBoundingClientRect().top;
        if (bottom > 300) return 'dp-bottom';
      }
      return 'dp-top';
    });
    const toggleActive = (flag = false) => {
      setTimeout(
        () => {
          isActive.value = flag;
        },
        flag ? 0 : 100,
      );
    };

    const setValue = (val) => {
      emit('change', val.toFixed(2));
      if (isActive.value) toggleActive(false);
    };

    const onInput = (e) => {
      valueData.value = e.target.value;
      if (!isActive.value) toggleActive(true);
      emit('change', valueData.value);
    };

    const onKeyPressed = (e) => {
      /* If Enter is pressed */
      if (e.keyCode === 13) toggleActive(false);
    };

    watch(props, () => {
      valueData.value = props.value;
    });

    const min = ref(props.min);
    const max = ref(props.max);
    const step = ref(props.step);
    const optionsList = ref([]);
    for (let i = min.value; i <= max.value; i += step.value) {
      optionsList.value.push(i.toFixed(2));
    }

    return {
      isActive,
      optionsList,
      valueData,
      dualSelectElm,
      dualDropdownStyle,
      setValue,
      selectedValue,
      onInput,
      onKeyPressed,
      toggleActive,
    };
  },
};
</script>
<style lang="scss" scoped>
.dual-select {
  border: 1px solid #666666;
  input {
    max-width: calc(100% - 20px);
  }
}
.dual-dropdown {
  min-width: 10rem;
  z-index: 1000;
  border: 1px solid #d8d1ca;
  &.dp-bottom {
    margin-top: 0.5rem !important;
  }
  &.dp-top {
    bottom: 3.5rem !important;
  }
  .separate-border {
    border-right: 1px solid #ededed;
  }
  .dual-header {
    background: #fafafa;
  }
  .selected-value {
    @apply bg-active text-white;
  }
}
</style>
