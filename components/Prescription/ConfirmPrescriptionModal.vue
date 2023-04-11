<template>
  <zn-small-modal
    title="Confirm prescription"
    :show-primary-button="false"
  >
    <template #after-content>
      <p class="my-6">
        By continuing you are confirming that the values match your existing prescription.
      </p>
      <zn-button
        data-test="agreeForPrescription"
        class="!w-full mb-5"
        @click="onConfirm"
      >
        Agree
      </zn-button>
      <button
        data-test="returnToPrescription"
        class="!w-full text-xl !text-primary font-semibold underline"
        @click="onClose"
      >
        Return to prescription
      </button>
    </template>
  </zn-small-modal>
</template>

<script>
import ZnSmallModal from '~/components/Zenni/ZnSmallModal.vue';
import ZnButton from '~/components/Zenni/ZnButton.vue';

export default {
  name: 'ConfirmPrescriptionModal',
  components: { ZnSmallModal, ZnButton },
  emits: ['close', 'confirm'],
  setup(_, { emit }) {
    const onClose = () => {
      emit('close');
    };

    const onConfirm = () => {
      emit('confirm');
    };

    return {
      onClose,
      onConfirm,
    };
  },
};
</script>

<style lang="scss" scoped></style>
