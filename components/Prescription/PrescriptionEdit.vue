<template>
  <div
    class="prescription-edit-wrapper"
    data-test="prescription-edit-wrapper"
  >
    <slot name="header" />
    <p class="text-lg font-semibold mt-4">
      Enter Pupillary Distance (PD)
    </p>
    <div
      class="radio-button-group grid grid-rows-1 grid-cols-2 gap-3 w-full mt-[22px]"
    >
      <div class="first-column flex flex-col items-start justify-start">
        <div class="radio-button flex flex-center-align">
          <input
            id="qtdNumber1"
            v-model="oneNumber"
            type="radio"
            name="qtdNumber"
            value="1"
            data-test="oneNumber"
          >
          <label
            class="ml-2"
            for="qtdNumber1"
          >One Number</label>
        </div>
        <zn-select-field
          v-if="oneNumber === '1'"
          v-model="prescriptionData.pd"
          :show-label="false"
          :options="pdOptionList"
          class="w-full mt-2"
          data-test-id="singlePd"
          :searchable="false"
          placeholder="Select your pupillary distance"
          @change="emitChange"
        />
        <zn-select-field
          v-else
          v-model="prescriptionData.od.pd"
          :show-label="false"
          :options="pdDualOptionList"
          class="w-full mt-2"
          data-test-id="singlePd"
          :searchable="false"
          placeholder="Right"
          @change="emitChange"
        />
      </div>
      <div class="second-colum flex flex-col items-start justify-start">
        <div class="radio-button flex flex-center-align">
          <input
            id="qtdNumber2"
            v-model="oneNumber"
            type="radio"
            name="qtdNumber"
            value="2"
            data-test="twoNumber"
          >
          <label
            class="ml-2"
            for="qtdNumber2"
          >Two Numbers</label>
        </div>
        <zn-select-field
          v-if="oneNumber === '2'"
          v-model="prescriptionData.os.pd"
          :show-label="false"
          :options="pdDualOptionList"
          class="w-full mt-2"
          data-test-id="dualPd"
          :searchable="false"
          placeholder="Left"
          @change="emitChange"
        />
      </div>
    </div>

    <div
      class="flex items-center mt-4 space-x-2"
      data-test="measurePd"
      @click="showModal = true"
    >
      <button class="underline !text-secondary">
        How to measure your PD?
      </button>
      <img
        src="/icons/question-circle.png"
        class="w-4 h-4"
        alt="question-circle"
      >
    </div>
    <div class="mt-4 mb-6 h-px bg-divider" />
    <div>
      <h4 class="font-semibold text-lg">
        Right Eye - OD
      </h4>
    </div>
    <div class="grid grid-rows-1 grid-cols-3 gap-3 mt-2">
      <zn-dual-select
        v-model="prescriptionData.od.sphere"
        title="Sphere (SPH)"
        :min="0.25"
        :max="20"
        :step="0.25"
        data-test-id="odSphere"
        @change="emitChange"
      />
      <zn-dual-select
        v-model="prescriptionData.od.cylinders"
        title="Cylinder (CYL)"
        :min="0.25"
        :max="6"
        :step="0.25"
        data-test-id="odCyl"
        @change="emitChange"
      />
      <zn-select-field
        v-model="prescriptionData.od.axis"
        :disabled="
          !prescription.od.cylinders || prescription.od.cylinders === '0.00'
        "
        title="Axis"
        :options="axisOptionList"
        data-test-id="odAxis"
        :searchable="false"
        @change="emitChange"
      />
    </div>

    <div class="mt-5">
      <h4 class="font-semibold text-lg">
        Left Eye - OS
      </h4>
    </div>
    <div class="grid grid-rows-1 grid-cols-3 gap-3 mt-2">
      <zn-dual-select
        v-model="prescriptionData.os.sphere"
        title="Sphere (SPH)"
        :min="0.25"
        :max="20"
        :step="0.25"
        data-test-id="osSphere"
        @change="emitChange"
      />
      <zn-dual-select
        v-model="prescriptionData.os.cylinders"
        title="Cylinder (CYL)"
        :min="0.25"
        :max="6"
        :step="0.25"
        data-test-id="osCyl"
        @change="emitChange"
      />
      <zn-select-field
        v-model="prescriptionData.os.axis"
        :disabled="
          !prescription.os.cylinders || prescription.os.cylinders === '0.00'
        "
        title="Axis"
        :options="axisOptionList"
        data-test-id="osAxis"
        :searchable="false"
        @change="emitChange"
      />
    </div>

    <div class="mt-5 mb-6 h-px bg-divider" />

    <div v-if="prescriptionData.lensType === 'SingleVision'">
      <div
        class="prism-notice px-3 py-2"
        data-test="prismNotice"
      >
        <span class="font-bold">Note:</span> If your prescription includes prism values, you will need to add them.
      </div>
      <button
        type="button"
        class="flex items-center mt-4 !text-secondary space-x-2 cursor-pointer"
        data-test="addPrismValues"
        :class="{
          '!text-gray-500': isPrismFormDisabled,
          '!pointer-events-none': isPrismFormDisabled,
          'cursor-none': isPrismFormDisabled,
        }"
        @click="setShowPrismForm"
      >
        <span class="underline">{{ showPrismForm ? 'Remove Prism Values' : 'Add Prism Values' }}</span>
        <img
          src="/icons/question-icon-disabled.png"
          class="w-6 h-6"
          alt="question-circle-disabled"
        >
      </button>
      <div
        v-if="showPrismForm && !isPrismFormDisabled"
        class="mt-6"
      >
        <prism-form
          :prescription="prescriptionData"
          @change="handlePrismChange"
        />
      </div>
    </div>

    <div v-else>
      <h4 class="font-semibold text-lg">
        NV Add (Near Vision Add)
      </h4>
      <div class="grid grid-rows-1 grid-cols-3 mt-2">
        <zn-select-field
          v-if="hasOsNvAddOnly"
          v-model="prescriptionData.os.add"
          :show-label="false"
          :options="nvAddOptionList"
          placeholder="Select"
          data-test-id="nvAdd"
          :searchable="false"
          @change="emitChange"
        />
        <zn-select-field
          v-else
          v-model="prescriptionData.od.add"
          :show-label="false"
          :options="nvAddOptionList"
          placeholder="Select"
          data-test-id="nvAdd"
          :searchable="false"
          @change="emitChange"
        />
      </div>
    </div>
    <div class="button-group">
      <zn-button
        data-test="savePrescription"
        @click="handlePrimaryButtonClicked"
      >
        {{ primaryButtonLabel }}
      </zn-button>
      <zn-button
        v-if="showSecondaryButton"
        @click="handleSecondaryButtonClicked"
      >
        {{ secondaryButtonLabel }}
      </zn-button>
    </div>
    <PDGuideModal
      v-show="showModal"
      @close="showModal = false"
    />
    <zn-small-modal
      v-if="showWarningModal"
      primary-button-label="Confirm"
      secondary-button-label="Cancel"
      title="Warning, please confirm"
      data-test="modal-warning-please-confirm"
      :show-cancel-button="true"
      @clickedSecondary="showWarningModal = false"
      @clickedPrimary="handleWarningModalPrimaryButtonClicked"
    >
      <div class="py-2">
        <ul class="mt-6 space-y-2 list-disc list mx-5">
          <li
            v-for="(warningError, warningIndex) in warningMessages"
            :key="'warning_item_' + warningIndex"
            class="text-yellow-600 font-semibold"
          >
            {{ warningError }}
          </li>
        </ul>
      </div>
    </zn-small-modal>

    <zn-small-modal
      v-if="showErrorModal"
      primary-button-label="Continue"
      data-test="modal-prescription-error"
      title="Error, please edit the prescription"
      @clickedPrimary="showErrorModal = false"
    >
      <div class="py-2">
        <ul class="mt-6 space-y-2 list-disc list mx-5">
          <li
            v-for="(error, index) in errorMessages"
            :key="'error_item_' + index"
            class="text-red-600 font-semibold"
          >
            {{ error }}
          </li>
        </ul>
      </div>
    </zn-small-modal>
  </div>
</template>

<script>
import {
  ref,
  watch,
  computed,
  onMounted,
  useContext,
} from '@nuxtjs/composition-api';
import ZnSelectField from '~/components/Zenni/ZnSelectField.vue';
import ZnDualSelect from '~/components/Zenni/ZnDualSelect.vue';
import PDGuideModal from '~/components/Prescription/PDGuideModal.vue';
import PrismForm from '~/components/Prescription/PrismForm.vue';
import ZnSmallModal from '~/components/Zenni/ZnSmallModal.vue';
import ZnButton from '~/components/Zenni/ZnButton.vue';
import { usePrescription } from '~/composables/usePrescription';

import flattenDeep from 'lodash/flattenDeep';

export default {
  name: 'PrescriptionEdit',
  components: {
    ZnSelectField,
    ZnDualSelect,
    PDGuideModal,
    PrismForm,
    ZnSmallModal,
    ZnButton,
  },
  props: {
    prescription: {
      type: Object,
      default: () => ({
        pd: 0,
        lensType: 'SingleVision',
        od: {
          sphere: 0,
          cylinders: 0,
          axis: '0',
          add: '0.00',
          prismHor: 0,
          prismVer: 0,
          pd: 0,
          baseHor: '',
          baseVer: '',
        },
        os: {
          sphere: 0,
          cylinders: 0,
          axis: '0',
          add: '0.00',
          prismHor: 0,
          prismVer: 0,
          pd: 0,
          baseHor: '',
          baseVer: '',
        },
      }),
    },
    primaryButtonLabel: {
      type: String,
      default: 'Save Prescription',
    },
    showSecondaryButton: {
      type: Boolean,
      default: false,
    },
    secondaryButtonLabel: {
      type: String,
      default: 'Cancel',
    },
  },
  emits: ['change', 'primary-button-clicked', 'secondary-button-clicked'],
  setup(props, { emit }) {
    const { $axios } = useContext();
    const { prescription: prescriptionState, setPrescription, resetPrism } =
      usePrescription();
    const showModal = ref(false);
    const prescriptionData = ref(Object.assign({}, props.prescription));
    const showPrismForm = ref(false);
    const optionsList = [];

    const showErrorModal = ref(false);
    const showWarningModal = ref(false);
    const errorModalMessage = ref('');
    const errorMessages = ref([]);
    const warningMessages = ref([]);

    const isPrismFormDisabled = computed(
      () =>
        (prescriptionState.value.od.sphere === 0 &&
          prescriptionState.value.os.sphere === 0) ||
        (prescriptionState.value.od.sphere === '0.00' &&
          prescriptionState.value.os.sphere === '0.00'),
    );

    for (let i = 40; i <= 78; i += 1) {
      optionsList.push(i);
    }

    const dualOptionsList = [];
    for (let i = 20; i <= 40; i += 0.5) {
      dualOptionsList.push(i.toFixed(1));
    }

    const pdOptionList = ref(optionsList);
    const pdDualOptionList = ref(dualOptionsList);

    const oneNumber = ref('1');

    const hasOsNvAddOnly = computed(() => {
      if (
        props.prescription &&
        !props.prescription.od.add &&
        props.prescription.os.add
      )
        return true;
      return false;
    });

    watch(
      () => props.prescription,
      (newValue) => {
        const updatedPrescription = {
          ...newValue,
          od: {
            ...newValue.od,
            add: newValue.od.add || 0,
            axis: newValue.od.axis || '0',
          },
          os: {
            ...newValue.os,
            add: newValue.os.add || 0,
            axis: newValue.os.axis || '0',
          },
        };

        prescriptionData.value = updatedPrescription;
        if (hasPrismValue(updatedPrescription)) showPrismForm.value = true;
      },
    );

    const hasValue = (value) =>
      value !== undefined &&
      value !== null &&
      value !== '' &&
      value !== '0' &&
      value !== '0.00' &&
      value !== 0;
    const hasPrismValue = (value) =>
      hasValue(value?.od?.prismHor) ||
      hasValue(value?.os?.prismHor) ||
      hasValue(value?.od?.prismVer) ||
      hasValue(value?.os?.prismVer);

    onMounted(() => {
      if (hasPrismValue(prescriptionState.value)) showPrismForm.value = true;

      if (prescriptionState.value?.od.pd || prescriptionState.value?.os.pd) {
        oneNumber.value = '2';
      }
    });

    watch(oneNumber, (newValue) => {
      if (newValue === '1') {
        const updatedPrescription = {
          ...prescriptionData.value,
          pd: prescriptionData.value.pd,
          od: {
            ...prescriptionData.value.od,
            pd: 0,
          },
          os: {
            ...prescriptionData.value.os,
            pd: 0,
          },
        };
        emit('change', updatedPrescription);
      } else {
        const updatedPrescription = {
          ...prescriptionData.value,
          pd: 0,
          od: {
            ...prescriptionData.value.od,
            pd: prescriptionData.value.od.pd || 0,
          },
          os: {
            ...prescriptionData.value.os,
            pd: prescriptionData.value.os.pd || 0,
          },
        };
        emit('change', updatedPrescription);
      }
    });

    const emitChange = () => {
      const odCylHasValue = hasValue(prescriptionData.value.od.cylinders);
      const osCylHasValue = hasValue(prescriptionData.value.os.cylinders);

      const nvAddHasValue = hasValue(prescriptionData.value.od.add);

      if (!osCylHasValue && hasValue(prescriptionData.value.os.axis)) {
        prescriptionData.value.os.axis = 0;
      }

      if (!odCylHasValue && hasValue(prescriptionData.value.od.axis)) {
        prescriptionData.value.od.axis = 0;
      }

      if (
        prescriptionData.value.od.sphere === '0.00' ||
        prescriptionData.value.od.sphere === 0
      ) {
        prescriptionData.value = {
          ...prescriptionData.value,
          od: {
            ...prescriptionData.value.od,
            prismHor: '0.00',
            baseHor: '',
            prismVer: '0.00',
            baseVer: '',
          },
        };
      }

      if (
        prescriptionData.value.os.sphere === '0.00' ||
        prescriptionData.value.os.sphere === 0
      ) {
        prescriptionData.value = {
          ...prescriptionData.value,
          os: {
            ...prescriptionData.value.os,
            prismHor: '0.00',
            baseHor: '',
            prismVer: '0.00',
            baseVer: '',
          },
        };
      }

      if (nvAddHasValue) {
        prescriptionData.value = {
          ...prescriptionData.value,
          os: {
            ...prescriptionData.value.os,
            add: prescriptionData.value.od.add,
          },
        };
      }

      emit('change', prescriptionData.value);
    };

    const handlePrismChange = (prismData) => {
      const updatedPrescription = {
        ...prescriptionData.value,
        os: {
          ...prescriptionData.value.os,
          prismHor: prismData.os.prismHor,
          prismVer: prismData.os.prismVer,
          baseHor: prismData.os.baseHor,
          baseVer: prismData.os.baseVer,
        },
        od: {
          ...prescriptionData.value.od,
          prismHor: prismData.od.prismHor,
          prismVer: prismData.od.prismVer,
          baseHor: prismData.od.baseHor,
          baseVer: prismData.od.baseVer,
        },
      };
      emit('change', updatedPrescription);
    };

    const axisOptionList = ref([]);
    for (let i = 0; i <= 180; i++) {
      axisOptionList.value.push(i.toString());
    }

    const nvAddOptionList = ref([]);
    for (let i = 1; i <= 3; i += 0.25) {
      nvAddOptionList.value.push({ value: i, label: i.toFixed(2) });
    }

    const handlePrimaryButtonClicked = async () => {
      let savedPrescription = prescriptionData.value;

      if (prescriptionData.value.lensType === 'SingleVision') {
        savedPrescription = {
          ...prescriptionData.value,
          od: {
            ...prescriptionData.value.od,
            add: 0,
          },
          os: {
            ...prescriptionData.value.os,
            add: 0,
          },
        };
      } else {
        savedPrescription = {
          ...prescriptionData.value,
          od: {
            ...prescriptionData.value.od,
            prismHor: 0,
            prismVer: 0,
            baseHor: '',
            baseVer: '',
          },
          os: {
            ...prescriptionData.value.os,
            prismHor: 0,
            prismVer: 0,
            baseHor: '',
            baseVer: '',
          },
        };
      }

      const { data: results } = await $axios.post(
        '/validatePrescriptionAndLens',
        savedPrescription,
      );
      const prescriptionValidateResults = results.validatePrescriptionResults;
      const lensTypeValidationResults = results.validateLensResults;

      if (
        !prescriptionValidateResults.warning &&
        prescriptionValidateResults.success &&
        lensTypeValidationResults.hasLens
      ) {
        setPrescription(prescriptionData.value);
        emit('primary-button-clicked');
        return;
      }

      errorMessages.value = [];
      warningMessages.value = [];

      if (!prescriptionValidateResults.success) {
        errorMessages.value = flattenDeep(
          Object.keys(prescriptionValidateResults.errorMessages).map((key) => {
            return prescriptionValidateResults.errorMessages[key];
          }),
        );
        if (errorMessages.value.length > 0) {
          showErrorModal.value = true;
        }
        return;
      }

      if (!lensTypeValidationResults.hasLens) {
        errorMessages.value = [lensTypeValidationResults.errorMessage];
        showErrorModal.value = true;
        return;
      }

      if (prescriptionValidateResults.warning) {
        warningMessages.value = flattenDeep(
          Object.keys(prescriptionValidateResults.warningMessages).map(
            (key) => {
              return prescriptionValidateResults.warningMessages[key];
            },
          ),
        );
        if (warningMessages.value.length > 0) {
          showWarningModal.value = true;
        }
      }
    };

    const handleWarningModalPrimaryButtonClicked = () => {
      showWarningModal.value = false;
      emit('primary-button-clicked');
    };

    const handleSecondaryButtonClicked = () => {
      emit('secondary-button-clicked');
    };

    const setShowPrismForm = () => {
      if(!showPrismForm.value) {
        showPrismForm.value = true;
      } else {
        resetPrism();
        showPrismForm.value = false;
      }
    };

    return {
      hasOsNvAddOnly,
      axisOptionList,
      emitChange,
      oneNumber,
      pdOptionList,
      pdDualOptionList,
      prescriptionData,
      nvAddOptionList,
      showModal,
      showPrismForm,
      setShowPrismForm,
      isPrismFormDisabled,
      showErrorModal,
      errorModalMessage,
      errorMessages,
      warningMessages,
      showWarningModal,
      handlePrismChange,
      handlePrimaryButtonClicked,
      handleSecondaryButtonClicked,
      handleWarningModalPrimaryButtonClicked,
    };
  },
};
</script>

<style lang="scss">
.prescription-edit-wrapper {
  @apply h-full w-full;

  .zn-dual-select label,
  .zn-select-field label {
    font-weight: 400;
  }

  .v-select {
    .vs__dropdown-menu {
      @apply grid grid-cols-2 divide-x;
    }
  }

  .pd-modal {
    @apply fixed inset-0 z-50 overflow-hidden;
    .modal-overlay {
      @apply fixed inset-0 bg-black opacity-50;
    }
    .modal-wrapper {
      @apply flex items-center justify-center h-full bg-white rounded-lg;
    }
  }

  .button-group {
    @apply py-6 space-y-5 flex flex-col items-center;
  }

  .prism-notice {
    background: rgba(179, 247, 238, 0.4);
    border-radius: 8px;
  }
}
</style>
