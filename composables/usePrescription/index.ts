import {
  reactive, computed, useRouter,
} from '@nuxtjs/composition-api';

export interface Prescription {
  pd: number;
  lensType: string,
  od?: {
    sphere?: number | string;
    cylinders?: number | string;
    axis?: number | string;
    add?: number;
    prismHor?: number;
    prismVer?: number;
    pd?: number;
    baseHor?: string;
    baseVer?: string;
  };
  os?: {
    sphere?: number | string;
    cylinders?: number | string;
    axis?: number | string;
    add?: number;
    prismHor?: number;
    prismVer?: number;
    pd?: number;
    baseHor?: string;
    baseVer?: string;
  };
}

interface State {
  prescription: Prescription;
  product: {
    product: any,
    quantity: number,
  }
}

const state = reactive<State>({
  prescription: {
    pd: 0,
    od: {
      sphere: '0.00',
      cylinders: '0.00',
      axis: '0',
      add: 0,
      prismHor: 0,
      prismVer: 0,
      pd: 0,
      baseHor: '',
      baseVer: '',
    },
    os: {
      sphere: '0.00',
      cylinders: '0.00',
      axis: '0',
      add: 0,
      prismHor: 0,
      prismVer: 0,
      pd: 0,
      baseHor: '',
      baseVer: '',
    },
    lensType: 'SingleVision',
  },
  product: {
    product: undefined,
    quantity: 0,
  },
});

const emptyPrescription = {
  pd: 0,
  od: {
    sphere: '0.00',
    cylinders: '0.00',
    axis: '0',
    add: 0,
    prismHor: 0,
    prismVer: 0,
    pd: 0,
    baseHor: '',
    baseVer: '',
  },
  os: {
    sphere: '0.00',
    cylinders: '0.00',
    axis: '0',
    add: 0,
    prismHor: 0,
    prismVer: 0,
    pd: 0,
    baseHor: '',
    baseVer: '',
  },
  lensType: 'SingleVision',
};

export const usePrescription = () => {
  const setPrescription = (prescriptionNew: Prescription) => {
    state.prescription = prescriptionNew ? { ...prescriptionNew } : { ...emptyPrescription };
  };

  const router = useRouter();

  const prescription = computed(() => state.prescription);
  const product = computed(() => state.product);

  const setProduct = ({ productNew, quantity }) => {
    state.product.product = productNew;
    state.product.quantity = quantity;
    router.push({ path: '/default/select-lens-type' });
  };

  const resetPrism = () => {
    setPrescription({
      ...prescription.value,
      od: {
        ...prescription.value.od, prismHor: 0, prismVer: 0, baseHor: '', baseVer: '',
      },
      os: {
        ...prescription.value.os, prismHor: 0, prismVer: 0, baseHor: '', baseVer: '',
      },
    });
  };

  const savePrescription = () => {
    const prescriptionToSave = {
      ...prescription.value,
    };

    if (prescriptionToSave.od.pd && prescriptionToSave.os.pd) {
      prescriptionToSave.pd = Number(prescriptionToSave.od.pd) + Number(prescriptionToSave.os.pd);
      prescriptionToSave.od.pd = Number(prescriptionToSave.od.pd);
      prescriptionToSave.os.pd = Number(prescriptionToSave.os.pd);
    } else {
      prescriptionToSave.pd = Number(prescriptionToSave.pd);
    }

    prescriptionToSave.od.sphere = Number(prescriptionToSave.od.sphere);
    prescriptionToSave.od.cylinders = Number(prescriptionToSave.od.cylinders);
    prescriptionToSave.od.axis = Number(prescriptionToSave.od.axis);
    prescriptionToSave.od.add = Number(prescriptionToSave.od.add);

    prescriptionToSave.od.prismHor = Number(prescriptionToSave.od.prismHor);
    prescriptionToSave.od.baseHor = prescriptionToSave.od.baseHor || '';
    prescriptionToSave.od.prismVer = Number(prescriptionToSave.od.prismVer);
    prescriptionToSave.od.baseVer = prescriptionToSave.od.baseVer || '';

    prescriptionToSave.os.sphere = Number(prescriptionToSave.os.sphere);
    prescriptionToSave.os.cylinders = Number(prescriptionToSave.os.cylinders);
    prescriptionToSave.os.axis = Number(prescriptionToSave.os.axis);
    prescriptionToSave.os.add = Number(prescriptionToSave.os.add);

    prescriptionToSave.os.prismHor = Number(prescriptionToSave.os.prismHor);
    prescriptionToSave.os.baseHor = prescriptionToSave.os.baseHor || '';
    prescriptionToSave.os.prismVer = Number(prescriptionToSave.os.prismVer);
    prescriptionToSave.os.baseVer = prescriptionToSave.os.baseVer || '';

    prescriptionToSave.lensType = prescriptionToSave.lensType || '';
    setPrescription(prescriptionToSave);
  };

  return {
    prescription,
    product,
    setProduct,
    setPrescription,
    savePrescription,
    resetPrism,
  };
};
