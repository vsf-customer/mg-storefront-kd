<template>
  <div
    class="w-full max-w-[700px] mx-auto raleway h-screen"
    data-test="ocr-type-wrapper"
  >
    <div
      v-if="isLoading"
      class="flex items-center justify-center h-screen w-full"
      data-test="divLoading"
    >
      <img
        src="/icons/loading-icon.svg"
        class="h-[70px]"
      >
    </div>
    <div
      v-else-if="activeStep === 1 && !imageFile"
      data-test="divStep"
      data-test-id="1"
    >
      <div class="flex flex-col h-full pt-6">
        <div class="flex-shrink-0">
          <div class="w-full flex items-center justify-end px-3">
            <div
              v-if="activeStep === 1"
              class="w-10 h-10"
              data-test="btnCloseModal"
              @click="closeModal"
            >
              <img
                src="/icons/close.svg"
                class="h-8 w-8"
                alt="error"
                loading="lazy"
              >
            </div>
          </div>
          <h3 class="text-2xl">
            Scan prescription
          </h3>
          <div
            class="mt-4"
            data-test="prescriptionInformation"
          >
            Center the prescription information within the grid and take a
            picture.
          </div>
        </div>
        <div
          class="camera-container mt-8"
          data-test="camera-wrapper"
        >
          <vue-web-cam
            v-show="!imageFile"
            ref="camera"
            width="100%"
            :device-id="deviceId"
            @cameras="onCameras"
            @camera-change="onCameraChange"
          />
          <div
            v-show="!imageFile"
            class="overlay"
            data-test="divOverlay"
          />
        </div>
        <div class="button-group flex-shrink-0">
          <div
            data-test="btnShutterButtonToCapture"
            class="shutter-button"
            @click="onCapture"
          />
        </div>
      </div>
    </div>
    <div
      v-else
      class="ocr-prescription-container"
    >
      <div
        v-if="activeStep === 2"
        class="step pt-4 px-3"
        data-test="divStep"
        data-test-id="2"
      >
        <template v-if="isLoading">
          <div
            class="flex items-center justify-center h-full"
            data-test="divLoading"
          >
            <img
              src="/icons/loading-icon.svg"
              class="h-[70px]"
            >
          </div>
        </template>
        <template v-else>
          <PrescriptionEdit
            :prescription="prescription"
            primary-button-label="Confirm prescription"
            secondary-button-label="Take picture again"
            show-secondary-button
            @change="setPrescription"
            @primary-button-clicked="showConfirmationDialog"
            @secondary-button-clicked="takePhotoAgain"
          >
            <template #header>
              <div class="flex items-center">
                <div class="text-2xl font-semibold flex-grow">
                  Please confirm prescription details
                </div>
                <div
                  v-if="imageFile"
                  class="flex-shrink-0 relative flex flex-col justify-end items-end"
                  data-test="divShowImageDialog"
                  @click="showImageDialog = true"
                >
                  <img
                    :src="imageFile"
                    class="w-20 h-20 object-cover border border-gray-200"
                    data-test="imageFile"
                  >
                  <div class="mt-2 text-teal-800 text-sm underline">
                    Tap to expand
                  </div>
                </div>
              </div>
              <div
                class="mt-4 text-lg"
                data-test="divTapNumberInfo"
              >
                You can tap a number to update it.
              </div>
            </template>
          </PrescriptionEdit>
        </template>
      </div>
    </div>
    <zn-small-modal
      v-if="showImageDialog"
      primary-button-label="Close"
      title="Your prescription"
      data-test="modal-check-details-message"
      @clickedPrimary="() => (showImageDialog = false)"
    >
      <div>Please check the details to make sure they match.</div>
      <div class="w-full">
        <div
          v-if="imageFile"
          class="w-full h-60 relative border border-gray-200"
        >
          <img
            :src="imageFile"
            class="absolute w-full h-full object-cover"
          >
        </div>
      </div>
    </zn-small-modal>
    <zn-small-modal
      v-if="showFileError"
      :content="fileErrorMsg"
      data-test="modal-file-error-message"
      @clickedPrimary="() => (showFileError = false)"
    />
    <ConfirmPrescriptionModal
      v-if="showConfirmPrescription"
      @confirm="onConfirm"
      @close="() => showConfirmationDialog(false)"
    />
  </div>
</template>

<script>
import {
  ref,
  watch,
  nextTick,
  useRouter,
  useContext,
  onBeforeMount,
} from '@nuxtjs/composition-api';
import { head } from 'lodash';
import ZnSmallModal from '~/components/Zenni/ZnSmallModal.vue';
import PrescriptionEdit from '~/components/Prescription/PrescriptionEdit.vue';
import ConfirmPrescriptionModal from '~/components/Prescription/ConfirmPrescriptionModal.vue';
import { usePrescription } from '~/composables/usePrescription';
import { useUiState } from '~/composables';

export default {
  name: 'OCRPrescription',
  components: {
    PrescriptionEdit,
    ZnSmallModal,
    ConfirmPrescriptionModal,
  },
  // middleware: 'is-authenticated',
  setup() {
    const { $cookies } = useContext();
    const { prescription, setPrescription, savePrescription } = usePrescription();

    const camera = ref(null);
    const imageFile = ref(null);
    const deviceId = ref(null);
    const devices = ref([]);
    const activeStep = ref(1);
    const showImageDialog = ref(false);

    const isLoading = ref(false);

    const router = useRouter();

    const showFileError = ref(false);
    const showConfirmPrescription = ref(false);
    const fileErrorMsg = ref('');

    const goToStep = (step) => {
      activeStep.value = step;
    };

    const closeModal = () => {
      imageFile.value = null;
      deviceId.value = null;
      router.push('/default/prescription');
    };

    const onCameras = (cameras) => {
      devices.value = cameras;
    };

    const onCameraChange = (dId) => {
      deviceId.value = dId;
    };

    const takePhotoAgain = () => {
      activeStep.value = 1;
      imageFile.value = null;
      deviceId.value = null;
      sessionStorage.removeItem('PRESCRIPTION_IMAGE');
    };

    const prismValue = (eye) => {
      const isHorizontal = eye.base?.toUpperCase() === 'IN' || eye.base?.toUpperCase() === 'OUT';
      const isVertical = eye.base?.toUpperCase() === 'UP' || eye.base?.toUpperCase() === 'DOWN';
      return {
        prismHor: isHorizontal ? eye.prism.toFixed(2) : 0,
        baseHor: isHorizontal ? eye.base?.toUpperCase() : '',
        prismVer: isVertical ? eye.prism.toFixed(2) : 0,
        baseVer: isVertical ? eye.base?.toUpperCase() : '',
      };
    };

    const onCapture = async () => {
      try {
        isLoading.value = true;
        const image = camera?.value?.capture();
        imageFile.value = image;
        sessionStorage.setItem('PRESCRIPTION_IMAGE', image);
        setPrescription({
          ...prescription.value,
          pd: 65,
          od: {
            ...prescription.value.od,
            sphere: '0.25',
          },
          os: {
            ...prescription.value.os,
            sphere: '0.25',
          },
        });
        setTimeout(() => {
          isLoading.value = false;
          router.push({ path: '/default/prescription' });
        }, 1000);
      } catch (error) {
        console.error(error);
      } finally {
        isLoading.value = false;
      }
    };

    const showConfirmationDialog = (flag = true) => {
      showConfirmPrescription.value = flag;
    };

    const onConfirm = async () => {
      showConfirmationDialog(false);
      savePrescription();
    };

    const goBack = () => {
      activeStep.value = 1;
      imageFile.value = null;
      nextTick(() => {
        camera?.value?.start();
      });
    };

    const goToHome = () => {
      imageFile.value = null;
      router.push('/default/prescription');
    };

    onBeforeMount(async () => {
      imageFile.value = sessionStorage.getItem('PRESCRIPTION_IMAGE');
      if (imageFile.value !== null) {
        try {
          isLoading.value = true;
          activeStep.value = 2;

          await savePrescription();
        } catch (error) {
          activeStep.value = 1;
          console.error(error);
        } finally {
          isLoading.value = false;
        }
      }
    });

    watch(devices, () => {
      deviceId.value = devices.value.length > 1 ? devices.value[1]?.deviceId : head(devices.value)?.deviceId;
    });

    return {
      activeStep,
      deviceId,
      fileErrorMsg,
      imageFile,
      isLoading,
      camera,
      prescription,
      showImageDialog,
      showFileError,
      onCameras,
      onCameraChange,
      takePhotoAgain,
      onCapture,
      closeModal,
      goToStep,
      onConfirm,
      goBack,
      setPrescription,
      showConfirmPrescription,
      showConfirmationDialog,
    };
  },
};
</script>

<style lang="scss" scoped>
.camera-container {
  @apply relative overflow-hidden;
  height: 400px;

  .overlay {
    @apply absolute top-0 left-0 w-full h-full flex items-center justify-center;
    background: rgba(0, 0, 0, 0.5);

    clip-path: polygon(
      0% 0%,
      0% 100%,
      5% 100%,
      5% 20%,
      95% 20%,
      95% 80%,
      5% 80%,
      5% 100%,
      100% 100%,
      100% 0%
    );
  }
}

video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.button-group {
  @apply py-6 space-y-5 flex flex-col items-center;
}

.shutter-button {
  @apply bg-active rounded-full relative w-16 h-16 cursor-pointer;

  &:after {
    content: "";
    @apply absolute top-1 left-1 w-14 h-14 rounded-full bg-active border border-white;
  }
}
.pd-size-container {
  @apply mt-10;
}

.close-button {
  @apply bg-black text-white rounded-full w-10 h-10 flex items-center justify-center;
}

.ocr-prescription-container {
  width: 100%;
  height: 100%;
  @apply flex flex-col font-sans;

  h1 {
    @apply text-xl font-bold px-6;
  }

  .step {
    .modal-title {
      @apply pt-2;
    }
  }

  h2 {
    @apply text-lg font-bold px-6;
  }
  .step {
    @apply h-full flex flex-col;
  }

  .step-title {
    @apply grid gap-2 w-full items-center text-center font-semibold;
    grid-template-columns: auto minmax(10px, 1fr);

    &:after {
      content: "";
      border-top: 1px solid;
      @apply border-gray-300;
    }
  }

  .eye-glasses {
    @apply flex items-center justify-center mt-10;
  }
}
</style>
