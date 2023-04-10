<template>
  <div
    class="prescription-container"
    data-test="prescription-main"
  >
    <div class="step">
      <div class="p-4">
        <p class="text-2xl font-semibold mt-4">
          Next, add your prescription
        </p>
        <div class="flex items-center mt-4 sm:mt-10">
          <p class="text-lg font-semibold mr-3">
            Step 3
          </p>
          <div class="grow h-px bg-divider" />
        </div>
        <div class="mt-4 sm:mt-10 text-lg">
          Use your camera to take a picture of your prescription. You can also
          upload a file or type in the details.
        </div>
        <div class="button-group mt-6 sm:mt-10">
          <zn-button
            data-test="btnTakePicture"
            @click="goToOCR"
          >
            Take a picture
          </zn-button>
          <zn-secondary-button
            :is-secondary="true"
            data-test="btnGoToUploadFile"
            @click="goToUploadFile"
          >
            Upload a file
          </zn-secondary-button>
          <zn-secondary-button
            class="text-xl"
            data-test="btnGoToManunal"
            @click="goToManual"
          >
            Enter details instead
          </zn-secondary-button>
        </div>
        <p class="text-lg text-center">
          <strong>Note:</strong> use a valid prescription for accuracy
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter } from '@nuxtjs/composition-api';
import ZnButton from '@/components/Zenni/ZnButton.vue';
import ZnSecondaryButton from '~/components/Zenni/ZnSecondaryButton.vue';

export default {
  name: 'PrescriptionIndex',
  components: { ZnButton, ZnSecondaryButton },
  // middleware: 'is-authenticated',
  transition: 'fade',
  setup() {
    const router = useRouter();

    const goToOCR = () => {
      sessionStorage.removeItem('PRESCRIPTION_IMAGE');
      router.push('/prescription/ocr');
    };

    const goToUploadFile = () => {
      sessionStorage.removeItem('PRESCRIPTION_IMAGE');
      router.push('/prescription/upload');
    };

    const goToManual = () => {
      router.push('/prescription/manual');
    };

    return {
      goToOCR,
      goToManual,
      goToUploadFile,
    };
  },
};
</script>
<style lang="scss">
.prescription-container {
  @apply font-sans;
  padding: 0;
  height: 100%;

  .button-group {
    @apply py-10 space-y-5 sm:space-y-10 flex flex-col items-center;
  }
}
</style>
