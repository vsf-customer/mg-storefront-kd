<template>
  <div
    class="manual-type-wrapper"
    data-test="manual-type-wrapper"
  >
    <PrescriptionEdit
      :prescription="prescription"
      primary-button-label="Save prescription"
      @change="setPrescription"
      @primary-button-clicked="handleSavePrescription"
    >
      <template #header>
        <h2 class="text-2xl font-semibold mt-4">
          Type in your prescription
        </h2>
      </template>
    </PrescriptionEdit>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useRouter,
} from '@nuxtjs/composition-api';
import PrescriptionEdit from '~/components/Prescription/PrescriptionEdit.vue';
import { usePrescription } from '~/composables/usePrescription';

export default defineComponent({
  name: 'ManualTypePrescription',
  components: {
    PrescriptionEdit,
  },
  middleware: 'is-authenticated',
  setup() {
    const { prescription, setPrescription, savePrescription } = usePrescription();
    const router = useRouter();

    const handleSavePrescription = async () => {
      await savePrescription();
      router.push('/products/list');
    };

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
