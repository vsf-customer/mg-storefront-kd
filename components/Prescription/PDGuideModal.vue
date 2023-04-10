<template>
  <div data-test="pdGuideModal">
    <div
      id="exampleModalCenteredScrollable"
      class="modal"
      tabindex="-1"
      aria-labelledby="exampleModalCenteredScrollable"
      aria-modal="true"
      role="dialog"
      style="display: block"
    >
      <div
        class="modal-dialog modal-dialog-centered modal-dialog-scrollable relative w-auto pointer-events-none"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="text-xl font-semibold leading-normal text-gray-800">
              Pupillary Distance (PD)
            </h5>
          </div>
          <div class="modal-body relative p-4">
            <div class="text-lg">
              Is the distance between the centers of your pupils and is used to
              determine where you look through the lens of your glasses. You can
              use a ruler to confirm your details.
            </div>
            <div class="mt-10 flex flex-col items-center">
              <img
                src="/images/pd-guide-eyes.svg"
                alt="error"
                loading="lazy"
              >
              <div class="font-semibold text-center">
                Average range of adult: 54-74 mm <br>(2.12 - 2.91 inches)
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <!-- <zn-button
              width="100%"
              class="w-full"
              :is-secondary="true"
              @click="goToManual"
            >
              Enter details
            </zn-button> -->
            <zn-blue-link
              class="text-xl"
              @click="handleClose"
            >
              Close
            </zn-blue-link>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop" />
  </div>
</template>

<script>
import { useRouter } from '@nuxtjs/composition-api';
import ZnButton from '../Zenni/ZnButton.vue';
import ZnBlueLink from '../Zenni/ZnBlueLink.vue';

export default {
  name: 'PDGuideModal',
  components: { ZnButton, ZnBlueLink },
  emits: ['close'],
  setup(_, { emit }) {
    const router = useRouter();

    const handleClose = () => {
      emit('close');
    };

    const goToManual = () => {
      emit('close');
      router.push('/prescription/manual');
    };

    return { router, handleClose, goToManual };
  },
};
</script>

<style lang="scss" scoped>
.modal {
  z-index: 1055;
  @apply fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto;

  .modal-dialog {
    max-width: 500px;
    margin: 1.75rem auto;
    @apply px-6;
  }

  .modal-content {
    @apply border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current;
  }

  .modal-header {
    @apply flex flex-shrink-0 items-center justify-between p-4 rounded-t-md;
  }

  .modal-dialog-scrollable {
    height: calc(100% - 3.5rem);
    .modal-content {
      max-height: 100%;
      overflow: hidden;
    }
    .modal-body {
      overflow-y: auto;
    }
  }

  .modal-dialog-centered {
    display: flex;
    align-items: center;
    min-height: calc(100% - 3.5rem);
  }

  .modal-footer {
    @apply py-10 space-y-5 flex flex-col items-center  flex-shrink-0 flex-wrap p-4 rounded-b-md;
  }
}
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  opacity: 0.5;
}
</style>
