<template>
  <div
    class="w-full max-w-[700px] mx-auto raleway"
    data-test="prescription-main"
  >
    <div
      v-if="isLoading"
      class="flex flex-col items-center justify-center h-screen text-center"
      data-test="divLoading"
    >
      <img
        src="/icons/loading-icon.svg"
        class="h-[70px]"
      >
      <p>
        Calculating your<br>prescription information
      </p>
    </div>
    <div
      v-else
      class="step"
    >
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
        <div
          v-if="image"
          class="image-container flex justify-center items-center"
        >
          <img
            :src="image"
            class="w-full"
          >
          <div class="overlay" />
        </div>
        <div class="py-10 space-y-5 sm:space-y-10 flex flex-col items-center mt-6 sm:mt-10">
          <zn-button
            v-if="image"
            data-test="btnTakePicture"
            @click="savePrescription"
          >
            Save Prescription
          </zn-button>
          <component
            :is="image ? 'zn-secondary-button' : 'zn-button'"
            data-test="btnTakePicture"
            @click="goToOCR"
          >
            Take a picture
          </component>
          <zn-secondary-button
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
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter, onMounted, ref } from '@nuxtjs/composition-api';
import ZnButton from '@/components/Zenni/ZnButton.vue';
import ZnSecondaryButton from '~/components/Zenni/ZnSecondaryButton.vue';
import { usePrescription } from '~/composables/usePrescription';

export default {
  name: 'PrescriptionIndex',
  components: { ZnButton, ZnSecondaryButton },
  // middleware: 'is-authenticated',
  transition: 'fade',
  setup() {
    const router = useRouter();
    const { prescription, setPrescription } = usePrescription();
    const image = ref(null);
    const isLoading = ref(false);

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

    const savePrescription = () => {
      isLoading.value = true;
      setTimeout(() => {
        sessionStorage.setItem('PRESCRIPTION_IMAGE', image.value);
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
        router.push('/default/prescription/manual');
      }, 1500);
    };

    onMounted(() => {
      const sessionImage = sessionStorage.getItem('PRESCRIPTION_IMAGE');
      if (sessionImage) {
        image.value = sessionImage;
      }
    });

    return {
      image,
      isLoading,
      savePrescription,
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
.image-container {
  @apply relative overflow-hidden mx-auto;
  max-width: 376px;

  .overlay {
    @apply absolute top-0 left-0 w-full h-full flex items-center justify-center;
    background: rgba(0, 0, 0, 0.5);

    clip-path: polygon(
      0% 0%,
      0% 100%,
      5% 100%,
      5% 10%,
      95% 10%,
      95% 90%,
      5% 90%,
      5% 100%,
      100% 100%,
      100% 0%
    );
  }
}
</style>
