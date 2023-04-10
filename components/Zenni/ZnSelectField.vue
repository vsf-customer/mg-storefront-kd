<template>
  <div class="zn-select-field w-full flex flex-col">
    <label
      v-if="showLabel"
      class="flex-1 font-semibold text-gray-700 text-base select-label"
      :class="{ 'text-gray-400': disabled }"
      :for="id"
    >{{ title }}</label>
    <v-select
      :class="{ 'mt-0': !showLabel }"
      :name="name"
      :value="selectedValue"
      :disabled="disabled"
      :options="options"
      append-to-body
      :calculate-position="withPopper"
      :clearable="false"
      transition=""
      :components="{OpenIndicator}"
      :placeholder="placeholder"
      :data-test="dataTestId"
      :searchable="searchable"
      @input="valueChanged"
    />
  </div>
</template>

<script>
import { ref, computed } from '@nuxtjs/composition-api';
import vSelect from 'vue-select';
import { createPopper } from '@popperjs/core';

import { SfIcon } from '@storefront-ui/vue';

export default {
  name: 'ZnSelectField',
  components: {
    vSelect,
  },
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
    showLabel: {
      type: Boolean,
      required: false,
      default: true,
    },
    name: {
      type: String,
      required: false,
      default: undefined,
    },
    id: { 
      type: String,
      required: false,
      default: undefined,
    },
    /**
     * An array with objects containing label and value property, or if different should change the labelField and valueField,
     * or can be a primitive array
     */
    options: {
      type: Array,
      required: false,
      default: undefined,
    },
    labelField: {
      type: String,
      required: false,
      default: 'label',
    },
    valueField: {
      type: String,
      required: false,
      default: 'value',
    },
    value: {
      type: [Object, Number, String],
      required: false,
      default: undefined,
    },
    changeReturnValueFunction: {
      type: Function,
      required: false,
      default: undefined,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    placeholder: {
      type: String,
      required: false,
      default: 'Select',
    },
    dataTestId: {
      type: String,
      required: false,
      default: undefined,
    },
    searchable: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  emits: ['change'],
  setup(props, { emit }) {
    const getOptionValue = (option) => {
      if(!option) {
        return null;
      }
      if (typeof option === 'object') {
        return option[props.valueField];
      }
      return option;
    };

    const getOptionLabel = (option) => {
      if(!option) {
        return null;
      }
      if (typeof option === 'object') {
        return option[props.labelField];
      }
      return option;
    };

    const valueData = ref(null);

    const selectedValue = computed(() => props.value || valueData.value);

    const valueChanged = (selectedValue) => {
      if (props.changeReturnValueFunction) {
        emit('change', props.changeReturnValueFunction(getOptionValue(selectedValue)));
      } else {
        emit('change', getOptionValue(selectedValue));
      }
    };

    const withPopper = (dropdownList, component, { width }) => {
      /**
       * We need to explicitly define the dropdown width since
       * it is usually inherited from the parent with CSS.
       */
      dropdownList.style.width = width;

      /**
       * Here we position the dropdownList relative to the $refs.toggle Element.
       *
       * The 'offset' modifier aligns the dropdown so that the $refs.toggle and
       * the dropdownList overlap by 1 pixel.
       *
       * The 'toggleClass' modifier adds a 'drop-up' class to the Vue Select
       * wrapper so that we can set some styles for when the dropdown is placed
       * above.
       */
      const popper = createPopper(component.$refs.toggle, dropdownList, {
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, -1],
            },
          },
          {
            name: 'toggleClass',
            enabled: true,
            phase: 'write',
            fn({ state }) {
              component.$el.classList.toggle(
                'drop-up',
                state.placement === 'top',
              );
            },
          },
        ],
      });

      /**
       * To prevent memory leaks Popper needs to be destroyed.
       * If you return function, it will be called just before dropdown is removed from DOM.
       */
      return () => popper.destroy();
    };

    const OpenIndicator = {
      render: createElement => createElement(SfIcon, {
        props: {
          icon: 'chevron_down',
          size: 'xxs',
        },
      }),
    };

    return {
      selectedValue,
      getOptionLabel,
      getOptionValue,
      valueChanged,
      withPopper,
      OpenIndicator,
    };
  },
};
</script>

<style lang="scss">
.v-select {
  .vs__dropdown-toggle {
    @apply h-12 rounded-lg;
    border: 1px solid #666666;

  }

  &.vs--disabled {
    .vs__dropdown-toggle {
      @apply border-gray-200;
    }
    .vs__selected {
      @apply text-gray-400;
    }
  }

  ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  @apply text-gray-400;
  opacity: 1; /* Firefox */
  } 

  :-ms-input-placeholder { /* Internet Explorer 10-11 */
    @apply text-gray-400;
  }

  ::-ms-input-placeholder { /* Microsoft Edge */
    @apply text-gray-400;
  }
}
</style>
