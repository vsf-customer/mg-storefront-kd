import {
  reactive, computed, watch, ref,
} from '@nuxtjs/composition-api';
import { usePrescription } from '../usePrescription';

import {
  SIZES, FRAME_SHAPES, CATEGORY, LENS_TYPES, FEATURES, COLORS,
} from './constants';

const state = reactive({
  filters: {
    frameShapes: [],
    sizes: [],
    category: '',
    lensType: '',
    features: [],
    colors: [],
  },
});

export const useProductFilter = () => {
  const sizes = ref(SIZES);
  const frameShapes = ref(FRAME_SHAPES);
  const categories = ref(CATEGORY);
  const lensTypes = ref(LENS_TYPES);
  const features = ref(FEATURES);
  const colors = ref(COLORS);

  const filters = computed(() => state.filters);

  const { prescription, setPrescription } = usePrescription();

  const updateArrayFilters = ({ category, value }) => {
    if (filters.value[category].includes(value)) {
      const newFilters = {
        ...filters.value,
        [category]: filters.value[category].filter((filter) => filter !== value),
      };
      state.filters = { ...newFilters };
    } else {
      const newFilters = {
        ...filters.value,
        [category]: [...filters.value[category], value],
      };
      state.filters = { ...newFilters };
    }
  };

  const setFilters = ({ category, value }) => {
    if (category === 'sizes' || category === 'colors' || category === 'frameShapes' || category === 'features') {
      updateArrayFilters({ category, value });
    } else {
      const newFilters = {
        ...filters.value,
        [category]: value,
      };
      state.filters = { ...newFilters };
      if (category === 'lensType' && value !== prescription.value.lensType) {
        setPrescription({ ...prescription.value, lensType: value || 'SingleVision' });
      }
    }

    sessionStorage.setItem('FILTERS', JSON.stringify(state.filters));
  };

  const hasFilterValue = computed(
    () => state.filters.colors.length
    || state.filters.features.length
    || state.filters.frameShapes.length
    || state.filters.sizes.length
    || state.filters.category,
  );

  const clearFilters = () => {
    const lensType = state.filters.lensType || '';
    state.filters = {
      frameShapes: [],
      sizes: [],
      category: '',
      lensType,
      features: [],
      colors: [],
    };
    sessionStorage.setItem('FILTERS', JSON.stringify(state.filters));
  };

  watch(prescription, () => {
    if (prescription.value.lensType && !state.filters.lensType) {
      setFilters({ category: 'lensType', value: prescription.value.lensType });
    }
  });

  return {
    filters,
    sizes,
    frameShapes,
    categories,
    lensTypes,
    features,
    colors,
    hasFilterValue,
    setFilters,
    clearFilters,
  };
};
