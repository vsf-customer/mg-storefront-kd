<template>
  <select-lens-type @continue="handleContinue" />
</template>
<script>
import { useRouter, onMounted } from '@nuxtjs/composition-api';
import SelectLensType from '~/components/Prescription/SelectLensType.vue';
import { usePrescription } from '~/composables/usePrescription';

export default {
  name: 'SelectLensTypePage',
  components: {
    SelectLensType,
  },
  // middleware: 'is-authenticated',
  setup() {
    const router = useRouter();
    const { product } = usePrescription();

    const handleContinue = () => {
      router.push('/default/prescription');
    };

    onMounted(() => {
      if (!product.value.product) {
        router.push('/default');
      }
    });

    return {
      handleContinue,
    };
  },
};
</script>
<style lang="scss" scoped>
  .filter-section {
  @apply px-4 py-3;
      .filter-item {
          @apply border border-gray-200 bg-white rounded-lg text-center text-xl font-semibold text-gray-500 flex items-center justify-center;
          box-shadow: 0px 2px 1px rgba(151, 151, 151, 0.2);
          &.selected {
              @apply border-[3px] border-teal-600;
          }
      }
  }
  </style>
