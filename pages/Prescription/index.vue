<template>
  <div
    class="w-full max-w-[700px] mx-auto raleway"
    data-test="prescription-main"
  >
    <div class="step">
      <div class="p-4">
        <div>
          <h3 class="text-2xl">
            Add your prescription
          </h3>
          <p
            class="my-7"
          >
            Use your camera to take a picture of your prescription. You can also upload a file or type in the details.
          </p>
        </div>
        <div class="py-10 space-y-5 sm:space-y-10 flex flex-col items-center mt-6 sm:mt-10">
          <zn-button
            data-test="btnTakePicture"
            @click="goToOCR"
          >
            Take a picture
          </zn-button>
          <zn-button
            data-test="btnGoToUploadFile"
            @click="goToUploadFile"
          >
            Upload a file
          </zn-button>
          <zn-secondary-button
            class="text-xl"
            data-test="btnGoToManunal"
            @click="goToManual"
          >
            Enter details instead
          </zn-secondary-button>
        </div>
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
      router.push('/default/prescription/ocr');
    };

    const goToUploadFile = () => {
      sessionStorage.removeItem('PRESCRIPTION_IMAGE');
      router.push('/default/prescription/upload');
    };

    const goToManual = () => {
      router.push('/default/prescription/manual');
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
