<template>
  <div class="w-full max-w-[700px] mx-auto raleway">
    <div class="px-4 py-3">
      <div>
        <h3 class="text-2xl">
          Select your lens type
        </h3>
        <p
          class="my-7"
        >
          Choose the lens type that matches your prescription.
        </p>
      </div>
      <ul
        class="mt-8 flex flex-col space-y-6"
      >
        <li
          v-for="lensType in lensTypes"
          :key="lensType.value"
          class="cursor-pointer relative after:absolute after:border after:border-gray-200 after:rounded-xl after:inset-0 rounded-xl shadow-lg text-xl font-semibold flex items-center justify-center px-3 h-36 sm:h-32 w-[327px] mx-auto"
          :class="{ 'after:border-[3px] after:border-teals' : filters.lensType === lensType.value }"
          data-test="div-lens-type"
          :data-test-id="lensType.value + '_item'"
          @click="handleChange({ category: 'lensType', value: lensType.value })"
        >
          <div class="flex items-center space-x-4">
            <img
              :src="lensType.image"
              data-test="img-lens-type"
              :data-test-id="lensType.value + '_image'"
              class="h-[75px] flex-shrink-0"
            >
            <div class="flex-grow text-left">
              <div class="flex items-center">
                <span
                  data-test="label-lens-type"
                  :data-test-id="lensType.value + '_label'"
                >{{ lensType.label }}</span>
                <img
                  v-show="filters.lensType === lensType.value"
                  src="/icons/check-teal-icon.png"
                  class="ml-auto pr-2 sm:pr-3"
                  alt="checkmark"
                  loading="lazy"
                >
              </div>
              <p
                class="text-base font-normal mt-2 sm:pr-3"
                data-test="description-lens-type"
                :data-test-id="lensType.value + '_description'"
              >
                {{ lensType.description }}
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="px-4 pb-3 pt-10 flex items-center justify-center">
      <zn-button
        class="w-full"
        data-test="btnContinue"
        data-test-id="continue_button"
        @click="handleContinue"
      >
        Continue
      </zn-button>
    </div>
  </div>
</template>
<script>
// import { onMounted } from '@nuxtjs/composition-api';
import { useProductFilter } from '~/composables/useProductFilter';
import ZnButton from '~/components/Zenni/ZnButton.vue';
// import { useVTO } from '~/composables/useVTO';
import { usePrescription } from '~/composables';

export default {
  name: 'SelectLensType',
  components: {
    ZnButton,
  },
  emits: ['continue'],
  setup(props, { emit }) {
    const { lensTypes, filters, setFilters } = useProductFilter();
    const { prescription, setPrescription } = usePrescription();
    // const { vto } = useVTO();

    const handleChange = ({ category, value }) => {
      setFilters({ category, value });
      const newPrescription = { ...prescription.value };
      if (value === 'SingleVision') {
        if (newPrescription.od) {
          newPrescription.od.add = 0;
        }
        if (newPrescription.os) {
          newPrescription.os.add = 0;
        }
      } else {
        if (newPrescription.od) {
          newPrescription.od.baseHor = 0;
          newPrescription.od.baseVer = 0;
          newPrescription.od.prismHor = 0;
          newPrescription.od.prismVer = 0;
        }
        if (newPrescription.os) {
          newPrescription.os.baseHor = 0;
          newPrescription.os.baseVer = 0;
          newPrescription.os.prismHor = 0;
          newPrescription.os.prismVer = 0;
        }
      }
      setPrescription(newPrescription);
    };

    const handleContinue = () => {
      emit('continue');
    };

    return {
      lensTypes,
      filters,
      handleContinue,
      handleChange,
    };
  },
};
</script>
<style>
</style>
