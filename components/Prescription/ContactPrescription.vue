<template>
  <div class="grid grid-rows-3 w-full text-sm text-center raleway items-center gap-2 border border-gray-400 pb-5">
    <div class="grid grid-cols-contacts w-full gap-3 font-semibold self-end">
      <div>
        Eye
      </div>
      <div>
        Power/Sphere
      </div>
      <div>
        BC
      </div>
      <div>
        Dia
      </div>
      <div>
        Price/Box
      </div>
    </div>
    <div class="grid grid-cols-contacts w-full gap-3 items-center justify-center">
      <div>R (OD)</div>
      <ZnSelectField
        v-model="rsph"
        :searchable="false"
        :show-label="false"
        :options="selectOptions"
      />
      <ZnSelectField
        v-model="rbc"
        :searchable="false"
        :show-label="false"
        :options="selectOptions"
      />
      <div>14</div>
      <div>
        <SfPrice
          class="!items-center !justify-center"
          :regular="$fc(productPrice)"
          :special="productSpecialPrice && $fc(productSpecialPrice)"
        />
      </div>
    </div>
    <div class="grid grid-cols-contacts w-full gap-3 items-center justify-center">
      <div>L (OS)</div>
      <ZnSelectField
        v-model="lsph"
        :searchable="false"
        :show-label="false"
        :options="selectOptions"
      />
      <ZnSelectField
        v-model="lbc"
        :searchable="false"
        :show-label="false"
        :options="selectOptions"
      />
      <div>14</div>
      <div>
        <SfPrice
          class="!items-center !justify-center"
          :regular="$fc(productPrice)"
          :special="productSpecialPrice && $fc(productSpecialPrice)"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, computed } from '@nuxtjs/composition-api';
import { SfPrice } from '@storefront-ui/vue';
import {
  getPrice as getProductPrice,
} from '~/modules/catalog/product/getters/productGetters';
import { ZnSelectField } from '..';

export default defineComponent({
  name: 'ContactPrescription',
  components: {
    ZnSelectField,
    SfPrice,
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const selectOptions = Array.from({ length: 81 }, (_, i) => {
      const number = -12 + i * 0.25;
      return number.toFixed(2);
    });
    const rsph = ref('0.00');
    const rbc = ref('0.00');
    const lsph = ref('0.00');
    const lbc = ref('0.00');

    const productPrice = computed(() => getProductPrice(props.product).regular);
    const productSpecialPrice = computed(() => getProductPrice(props.product).special);

    return {
      selectOptions,
      productPrice,
      productSpecialPrice,
      rsph,
      rbc,
      lsph,
      lbc,
    };
  },
});
</script>
