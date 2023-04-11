<template>
  <div
    class="manual-type-wrapper raleway h-screen"
    data-test="manual-type-wrapper"
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
    <PrescriptionEdit
      v-else
      :prescription="prescription"
      primary-button-label="Confirm prescription"
      @change="setPrescription"
      @primary-button-clicked="handleSavePrescription"
    >
      <template #header>
        <h3 class="text-2xl my-4">
          Please confirm prescription details
        </h3>
      </template>
    </PrescriptionEdit>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useRouter,
  onBeforeMount,
  ref,
} from '@nuxtjs/composition-api';
import PrescriptionEdit from '~/components/Prescription/PrescriptionEdit.vue';
import { usePrescription, emptyPrescription } from '~/composables/usePrescription';
import { useCart } from '~/modules/checkout/composables/useCart';

export default defineComponent({
  name: 'ManualTypePrescription',
  components: {
    PrescriptionEdit,
  },
  // middleware: 'is-authenticated',
  setup() {
    const { addItem } = useCart();
    const {
      prescription, setPrescription, product,
    } = usePrescription();
    const router = useRouter();
    const isLoading = ref(false);

    const handleSavePrescription = async () => {
      isLoading.value = true;
      setPrescription({ ...emptyPrescription });
      await addItem({ ...product.value });
      await router.push('/default/cart');
    };

    onBeforeMount(() => {
      sessionStorage.removeItem('PRESCRIPTION_IMAGE');
    });

    return {
      prescription,
      isLoading,
      handleSavePrescription,
      setPrescription,
    };
  },
});
</script>

<style lang="scss" scoped>
.manual-type-wrapper {
  @apply font-sans w-full py-3 px-1;
  .button-group {
    @apply py-6 space-y-5 flex flex-col items-center;
  }
}
</style>
