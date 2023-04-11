<template>
  <div
    class="manual-type-wrapper raleway"
    data-test="manual-type-wrapper"
  >
    <PrescriptionEdit
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

    const handleSavePrescription = async () => {
      setPrescription({ ...emptyPrescription });
      await addItem({ ...product.value });
      router.push('/default/cart');
    };

    onBeforeMount(() => {
      sessionStorage.removeItem('PRESCRIPTION_IMAGE');
    });

    return {
      prescription,
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
