<template>
  <div class="grid grid-rows-3 w-full text-sm text-center raleway items-center gap-2 border border-gray-400 pb-5">
    <div class="grid grid-cols-contacts w-full gap-3 font-semibold self-end">
      <div>
        Eye
      </div>
      <div>
        Power/Sph
      </div>
      <div>
        BC
      </div>
      <div>
        Dia
      </div>
      <div>
        Qty
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
      <ZnSelectField
        v-model="rqty"
        :searchable="false"
        :show-label="false"
        :options="qtyOptions"
        @change="emitQty"
      />
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
      <ZnSelectField
        v-model="lqty"
        :searchable="false"
        :show-label="false"
        :options="qtyOptions"
        @change="emitQty"
      />
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
  emits: ['update-qty'],
  setup(props, { emit }) {
    const selectOptions = Array.from({ length: 81 }, (_, i) => {
      const number = -12 + i * 0.25;
      return number.toFixed(2);
    });
    const qtyOptions = Array.from({ length: 10 }, (_, i) => i);
    const rsph = ref('0.00');
    const rbc = ref('0.00');
    const lsph = ref('0.00');
    const lbc = ref('0.00');
    const rqty = ref('1');
    const lqty = ref(null);

    const productPrice = computed(() => getProductPrice(props.product).regular);
    const productSpecialPrice = computed(() => getProductPrice(props.product).special);

    const emitQty = () => {
      const qty = Number(rqty.value) + Number(lqty.value);
      emit('update-qty', qty);
    };

    return {
      selectOptions,
      qtyOptions,
      productPrice,
      productSpecialPrice,
      rsph,
      rbc,
      lsph,
      lbc,
      rqty,
      lqty,
      emitQty,
    };
  },
});
</script>
