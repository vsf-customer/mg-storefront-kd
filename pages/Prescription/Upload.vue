<template>
  <div
    class="upload-prescription-container"
    data-test="upload-prescription-container"
  >
    <div
      v-if="activeStep === 1"
      class="w-full h-full bg-white"
      data-test="divUploadStep"
      data-test-id="1"
    >
      <div class="step px-6">
        <h1 class="modal-title text-2xl font-semibold">
          Select your file
        </h1>
        <div class="mt-4 w-48">
          <client-only>
            <tippy>
              <template #trigger>
                <div class="flex items-center font-sans">
                  <button
                    class="underline !text-secondary mr-2"
                    data-test="btnSupportedFileInput"
                  >
                    Supported file type
                  </button>
                  <img
                    src="/icons/question-circle.png"
                    class="w-4 h-4"
                    alt="question-circle"
                  >
                </div>
              </template>
              <div
                class="w-40 font-sans"
                data-test="divSupportedFiles"
              >
                <div class="font-semibold">
                  Formats supported:
                </div>
                <div>JPEG, JPG, PNG, WEBP, BMP, TIFF, TIF, GIF</div>
              </div>
            </tippy>
          </client-only>
        </div>
        <div class="camera-container mt-8">
          <label
            htmlFor="file"
            class="relative"
          >
            <span
              v-if="!addedFile"
              data-test="spanSelecetFile"
            >Select a file</span>
            <input
              ref="inputFile"
              name="file"
              class="sr-only w-full h-full"
              type="file"
              accept="image/gif,image/tiff,image/jpeg,image/png,image/bmp,image/webp"
              data-test="inputFile"
              @change="onFileChange"
            ></label>
          <div
            v-if="addedFile"
            data-test="divFileName"
          >
            {{ addedFile.name }}
          </div>
        </div>
        <div
          v-if="addedFile"
          class="button-group"
        >
          <zn-button
            data-test="btnUploadFile"
            @click="onUpload"
          >
            Upload file
          </zn-button>
        </div>
      </div>
    </div>
    <div
      v-if="activeStep === 2"
      data-test="divUploadStep"
      data-test-id="2"
      class="step pt-4 px-3"
    >
      <template v-if="isLoading">
        <div
          class="flex items-center justify-center h-full"
          data-test="loading"
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
          secondary-button-label="Upload file again"
          show-secondary-button
          @change="setPrescription"
          @primary-button-clicked="showConfirmationDialog"
          @secondary-button-clicked="resetUploadValues"
        >
          <template #header>
            <div class="flex items-center">
              <div
                class="text-2xl font-semibold flex-grow"
                data-test="divConfirmPrescriptionDetails"
              >
                Please confirm prescription details
              </div>
              <div
                v-if="imageFile"
                class="flex-shrink-0 relative flex flex-col justify-end items-end"
                @click="showImageDialog = true"
              >
                <img
                  :src="imageFile"
                  class="w-20 h-20 object-cover border border-gray-200"
                  data-test="imgPrescriptionDetails"
                >
                <div class="mt-2 text-teal-800 text-sm underline">
                  Tap to expand
                </div>
              </div>
            </div>
            <div class="mt-4 text-lg">
              You can tap a number to update it.
            </div>
          </template>
        </PrescriptionEdit>
      </template>
    </div>
    <zn-small-modal
      v-if="showImageDialog"
      primary-button-label="Close"
      title="Your prescription"
      data-test="modal-check-prescription-details-message"
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
  useRouter,
  onBeforeMount,
  useContext,
} from '@nuxtjs/composition-api';
import imageCompression from 'browser-image-compression';
import { head } from 'lodash';
import ZnButton from '~/components/Zenni/ZnButton.vue';
import ZnSmallModal from '~/components/Zenni/ZnSmallModal.vue';
import PrescriptionEdit from '~/components/Prescription/PrescriptionEdit.vue';
import ConfirmPrescriptionModal from '~/components/Prescription/ConfirmPrescriptionModal.vue';
import { usePrescription } from '~/composables/usePrescription';
import { useUiState } from '~/composables';

export default {
  name: 'UploadFilePrescription',
  components: {
    ZnButton,
    PrescriptionEdit,
    ZnSmallModal,
    ConfirmPrescriptionModal,
  },
  middleware: 'is-authenticated',
  setup() {
    const { $cookies } = useContext();
    const { prescription, setPrescription, savePrescription } =
      usePrescription();
    const imageFile = ref(null);
    const activeStep = ref(1);
    const inputFile = ref(null);
    const addedFile = ref(null);
    const showImageDialog = ref(false);
    const uploadedFile = ref(null);
    const showFileError = ref(false);
    const showConfirmPrescription = ref(false);
    const fileErrorMsg = ref('');

    const isLoading = ref(false);

    const router = useRouter();

    const { setBackButtonFunction, setHideBackButton } = useUiState();

    const goToHome = () => {
      imageFile.value = null;
      router.push('/prescription');
    };
    setHideBackButton(false);
    setBackButtonFunction(goToHome);

    const showError = () => {
      showFileError.value = true;
      fileErrorMsg.value =
        'Failed to parse prescription! Please upload correct file again.';
      resetUploadValues();
    };
    const resetUploadValues = () => {
      activeStep.value = 1;
      imageFile.value = null;
      addedFile.value = null;
      sessionStorage.removeItem('PRESCRIPTION_IMAGE');
    };

    const onFileChange = (event) => {
      const file = head(event.target.files);
      if (file) {
        const acceptedFileTypes = [
          'image/gif',
          'image/tiff',
          'image/jpeg',
          'image/png',
          'image/bmp',
          'image/webp',
        ];
        const fileSize = (file.size / 1024 / 1024).toFixed(4);
        /* limit file size as 20 MB */
        if (fileSize > 20 || !acceptedFileTypes.includes(file['type'])) {
          showFileError.value = true;
          fileErrorMsg.value =
            fileSize > 20
              ? 'Maximum file size is 20MB!'
              : 'Please upload valid image file!';
          return;
        }
        showFileError.value = false;
        addedFile.value = file;
      }
    };

    const prismValue = (eye) => {
      const isHorizontal =
        eye.base?.toUpperCase() === 'IN' || eye.base?.toUpperCase() === 'OUT';
      const isVertical =
        eye.base?.toUpperCase() === 'UP' || eye.base?.toUpperCase() === 'DOWN';
      return {
        prismHor: isHorizontal ? eye.prism.toFixed(2) : 0.0,
        baseHor: isHorizontal ? eye.base?.toUpperCase() : '',
        prismVer: isVertical ? eye.prism.toFixed(2) : 0.0,
        baseVer: isVertical ? eye.base?.toUpperCase() : '',
      };
    };

    const getPrescriptionDataFromFile = async () => {
      try {
        const file = uploadedFile.value;
        const formData = new FormData();
        formData.append(
          process.env.GOOGLE_OCR_API_ENABLED ? 'image_file' : 'files',
          file,
        );
        const result = process.env
          .GOOGLE_OCR_API_ENABLED
          ? await fetch('/aiml-ocr-prescription', {
            method: 'POST',
            body: formData,
            headers: {
              Authorization: 'Bearer ' + $cookies.get('token'),
            },
          })
          : await fetch(`${process.env.prescriptionUrl}/api/v1/ocr/prescription`, {
            method: 'POST',
            body: formData,
          });
        const { prescription: scannedPrescriptionData } = await result.json();
        if (!scannedPrescriptionData) return false;
        setPrescription({
          od: {
            sphere: scannedPrescriptionData?.od?.sphere?.toFixed(2) || 0,
            cylinders: scannedPrescriptionData?.od?.cylinders?.toFixed(2) || 0,
            axis: scannedPrescriptionData?.od?.axis || 0,
            add: scannedPrescriptionData?.od?.add || '0.00',
            ...prismValue(scannedPrescriptionData?.od),
            pd: scannedPrescriptionData?.od?.pd || 0,
          },
          os: {
            sphere: scannedPrescriptionData?.os?.sphere?.toFixed(2) || 0,
            cylinders: scannedPrescriptionData?.os?.cylinders?.toFixed(2) || 0,
            axis: scannedPrescriptionData?.os?.axis || 0,
            add: scannedPrescriptionData?.os?.add || '0.00',
            ...prismValue(scannedPrescriptionData?.os),
            pd: scannedPrescriptionData?.os?.pd || 0,
          },
          pd: scannedPrescriptionData?.pd || prescription.value.pd || 0,
          lensType:
            scannedPrescriptionData?.od?.pd && scannedPrescriptionData?.os?.pd
              ? 'Bifocals'
              : prescription.value.lensType || 'SingleVision',
        });
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    };

    const saveImgWithCompressOption = async () => {
      const fileSize = (uploadedFile.value.size / 1024 / 1024).toFixed(4);
      let fileWithCompressOption = uploadedFile.value;
      if (fileSize > 3 && fileSize <= 20) {
        const compressOptions = {
          maxSizeMB: 3,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };
        fileWithCompressOption = await imageCompression(
          uploadedFile.value,
          compressOptions,
        );
      }
      if (!fileWithCompressOption) return;
      let imageReader = new FileReader();
      imageReader.onload = async (e) => {
        imageFile.value = e.target.result;
        sessionStorage.setItem('PRESCRIPTION_IMAGE', e.target.result);
      };
      imageReader.readAsDataURL(fileWithCompressOption);
    };

    const onUpload = async () => {
      try {
        isLoading.value = true;
        activeStep.value = 2;
        const file = inputFile?.value?.files[0];
        uploadedFile.value = file;
        const success = await getPrescriptionDataFromFile();
        if (!success) {
          showError();
        } else {
          await saveImgWithCompressOption();
        }
      } catch (error) {
        showError();
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
      await savePrescription();
      router.push('/products/list');
    };

    onBeforeMount(async () => {
      imageFile.value = sessionStorage.getItem('PRESCRIPTION_IMAGE');
      if (imageFile.value) {
        const imageResponse = await fetch(imageFile.value);
        const imageBlob = await imageResponse.blob();
        uploadedFile.value = new File([imageBlob], 'Captured File', {
          type: 'image/jpeg',
        });
        if (uploadedFile.value !== null) {
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
      }
    });

    return {
      activeStep,
      imageFile,
      isLoading,
      prescription,
      resetUploadValues,
      onUpload,
      goToHome,
      onConfirm,
      onFileChange,
      showConfirmPrescription,
      showConfirmationDialog,
      inputFile,
      addedFile,
      fileErrorMsg,
      setPrescription,
      showImageDialog,
      showFileError,
    };
  },
};
</script>

<style lang="scss" scoped>
.upload-prescription-container {
  width: 100%;
  height: 100%;
  @apply flex flex-col font-sans;

  .camera-container {
    @apply flex-grow relative border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer mb-6;

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

  h1 {
    @apply text-2xl font-bold;
  }

  h2 {
    @apply text-lg font-bold;
  }

  video {
    width: 100%;
    max-height: 100%;
    object-fit: cover;
    height: 100%;
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

  .button-group {
    @apply py-10 space-y-5 flex flex-col items-center;
  }

  .step {
    @apply h-full flex flex-col;
  }

  .shutter-button {
    @apply bg-gray-900 rounded-full relative w-16 h-16;

    &:after {
      content: "";
      @apply absolute top-1 left-1 w-14 h-14 rounded-full bg-gray-900 border border-white;
    }
  }
  .pd-size-container {
    @apply mt-10;
  }

  .modal {
    --icon-color: #fff;
    .sf-modal__container {
      .sf-modal__bar {
        @apply bg-transparent px-4;

        .sf-button {
          @apply bg-black text-white rounded-full w-10 h-10;
        }
      }
      .sf-modal__content {
        padding: 0px;
        font: inherit !important;
        height: 100%;
      }
    }
  }
}
</style>
