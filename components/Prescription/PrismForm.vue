<template>
  <div
    class="prism-form"
    data-test="prismForm"
  >
    <div>
      <h4 class="font-semibold text-lg">
        Right Eye - OD
      </h4>
    </div>
    <div>
      <div class="grid grid-rows-1 grid-cols-2 gap-3 mt-2">
        <zn-select-field
          v-model="prismData.od.prismHor"
          :value="prismData.od.prismHor"
          title="Horizontal"
          :options="prismOptionList"
          data-test-id="odPrismHor"
          :disabled="prismOdDisabled"
          :searchable="false"
          @change="emitChange"
        />
        <div class="flex flex-col">
          <div class="font-semibold flex-shrink-0">
            Base direction
          </div>
          <div class="flex items-center space-x-3 flex-grow">
            <SfRadio
              key="od-out"
              v-model="prismData.od.baseHor"
              value="OUT"
              label="Out"
              :disabled="prismOdDisabled || prismData.od.prismHor === '0' || prismData.od.prismHor === '0.00'"
              data-test="odBaseHorOut"
              @change="emitChange"
            />
            <SfRadio
              key="od-in"
              v-model="prismData.od.baseHor"
              value="IN"
              label="In"
              :disabled="prismOdDisabled || prismData.od.prismHor === '0' || prismData.od.prismHor === '0.00'"
              data-test="odBaseHorIn"
              @change="emitChange"
            />
          </div>
        </div>
      </div>
      <div class="grid grid-rows-1 grid-cols-2 gap-3 mt-2">
        <zn-select-field
          v-model="prismData.od.prismVer"
          :value="prismData.od.prismVer"
          title="Vertical"
          :options="prismOptionList"
          data-test-id="odPrismVer"
          :disabled="prismOdDisabled"
          :searchable="false"
          @change="emitChange"
        />
        <div class="flex flex-col">
          <div class="font-semibold flex-shrink-0">
            Base direction
          </div>
          <div class="flex items-center space-x-3 flex-grow">
            <SfRadio
              key="od-up"
              v-model="prismData.od.baseVer"
              value="UP"
              label="Up"
              :disabled="prismOdDisabled || prismData.od.prismVer === '0' || prismData.od.prismVer === '0.00'"
              data-test="odBaseVerUp"
              @change="emitChange"
            />
            <SfRadio
              key="od-down"
              v-model="prismData.od.baseVer"
              value="DOWN"
              label="Down"
              :disabled="prismOdDisabled || prismData.od.prismVer === '0' || prismData.od.prismVer === '0.00'"
              data-test="odBaseVerDown"
              @change="emitChange"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="mt-4">
      <h4 class="font-semibold text-lg">
        Left Eye - OS
      </h4>
    </div>
    <div>
      <div class="grid grid-rows-1 grid-cols-2 gap-3 mt-2">
        <zn-select-field
          v-model="prismData.os.prismHor"
          :value="prismData.os.prismHor"
          title="Horizontal"
          :options="prismOptionList"
          data-test-id="osPrismHor"
          :disabled="prismOsDisabled"
          :searchable="false"
          @change="emitChange"
        />
        <div class="flex flex-col">
          <div class="font-semibold flex-shrink-0">
            Base direction
          </div>
          <div class="flex items-center space-x-3 flex-grow">
            <SfRadio
              key="os-out"
              v-model="prismData.os.baseHor"
              value="OUT"
              label="Out"
              :disabled="prismOsDisabled || prismData.os.prismHor === '0' || prismData.os.prismHor === '0.00'"
              data-test="osBaseHorOut"
              @change="emitChange"
            />
            <SfRadio
              key="os-in"
              v-model="prismData.os.baseHor"
              value="IN"
              label="In"
              :disabled="prismOsDisabled || prismData.os.prismHor === '0' || prismData.os.prismHor === '0.00'"
              data-test="osBaseHorIn"
              @change="emitChange"
            />
          </div>
        </div>
      </div>
      <div class="grid grid-rows-1 grid-cols-2 gap-3 mt-2">
        <zn-select-field
          v-model="prismData.os.prismVer"
          :value="prismData.os.prismVer"
          title="Vertical"
          :options="prismOptionList"
          data-test-id="osPrismVer"
          :disabled="prismOsDisabled"
          :searchable="false"
          @change="emitChange"
        />
        <div class="flex flex-col">
          <div class="font-semibold flex-shrink-0">
            Base direction
          </div>
          <div class="flex items-center space-x-3 flex-grow">
            <SfRadio
              key="os-up"
              v-model="prismData.os.baseVer"
              value="UP"
              label="Up"
              :disabled="prismOsDisabled || prismData.os.prismVer === '0' || prismData.os.prismVer === '0.00'"
              data-test="osBaseVerUp"
              @change="emitChange"
            />
            <SfRadio
              key="os-down"
              v-model="prismData.os.baseVer"
              value="DOWN"
              label="Down"
              :disabled="prismOsDisabled || prismData.os.prismVer === '0' || prismData.os.prismVer === '0.00'"
              data-test="osBaseVerDown"
              @change="emitChange"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from '@nuxtjs/composition-api';
import ZnSelectField from '~/components/Zenni/ZnSelectField.vue';
import { SfRadio } from '@storefront-ui/vue';

export default {
  name: 'PrismForm',
  components: {
    ZnSelectField,
    SfRadio,
  },
  props: {
    prescription: {
      type: Object,
      default: () => ({
        od: {
          prismHor: 0,
          prismVer: 0,
          baseHor: '',
          baseVer: '',
        },
        os: {
          prismHor: 0,
          prismVer: 0,
          baseHor: '',
          baseVer: '',
        },
      }),
    },
  },
  emits: ['change'],
  setup(props, {emit}) {
    const prismData = ref({
      od: {
        prismHor: '0.00',
        baseHor: '',
        prismVer: '0.00',
        baseVer: '',
      },
      os: {
        prismHor: '0.00',
        baseHor: '',
        prismVer: '0.00',
        baseVer: '',
      },
    });

    const prismOsDisabled = computed(() => !props.prescription.os.sphere || props.prescription.os.sphere === '0.00');
    const prismOdDisabled = computed(() => !props.prescription.od.sphere || props.prescription.od.sphere === '0.00');
   
    const prismOptionList = computed(() => {
      const options = [];
      for (let i = 0; i <= 5; i += 0.25) {
        options.push({
          value: i.toFixed(2),
          label: `${i.toFixed(2)}`,
        });
      }
      return options;
    });

    const emitChange = () => {
      if(prismData.value.od.prismHor === '0.00') {
        prismData.value.od.baseHor = '';
      }
      if(prismData.value.od.prismVer === '0.00') {
        prismData.value.od.baseVer = '';
      }
      if(prismData.value.os.prismHor === '0.00') {
        prismData.value.os.baseHor = '';
      }
      if(prismData.value.os.prismVer === '0.00') {
        prismData.value.os.baseVer = '';
      }
      emit('change', prismData.value);
    };

    const convertPrismData = () => {
      prismData.value = {
        od: {
          prismHor: props.prescription.od.prismHor || '0.00',
          baseHor: props.prescription.od.baseHor|| '',
          prismVer: props.prescription.od.prismVer || '0.00',
          baseVer: props.prescription.od.baseVer || '',
        },
        os: {
          prismHor: props.prescription.os.prismHor || '0.00',
          baseHor: props.prescription.os.baseHor || '',
          prismVer: props.prescription.os.prismVer || '0.00',
          baseVer: props.prescription.os.baseVer || '',
        },
      };
    };

    onMounted(() => {
      convertPrismData();
    });

    watch(() => props.prescription, () => {
      convertPrismData();
    });

    return {
      prismData,
      prismOptionList,
      prismOsDisabled,
      prismOdDisabled,
      emitChange,
    };
  },
};
</script>

<style lang="scss">
.prism-form {
    .sf-radio {
      .sf-radio__container {
        @apply flex items-center p-0;
      }

      .sf-radio__content {
        margin: 0 0 0 8px;
      }
  }
  .select-label {
    @apply text-base;
    font-weight: 600 !important;
  }
}
</style>
