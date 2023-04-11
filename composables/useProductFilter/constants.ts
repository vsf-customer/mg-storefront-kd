export const CATEGORY = [
  {
    label: 'Women\'s',
    value: 'Women_s',
    image: '/icons/product-filter/icon-women.svg',
  },
  {
    label: 'Men\'s',
    value: 'Men_s',
    image: '/icons/product-filter/icon-men.svg',
  },
];

export const FRAME_SHAPES = [
  {
    label: 'Aviator',
    value: 'Aviator',
    image: '/icons/product-filter/icon-aviator.svg',
    faceShapes: ['HEART'],
  },
  {
    label: 'Cat Eye',
    value: 'CatEye',
    image: '/icons/product-filter/icon-cateye.svg',
  },
  {
    label: 'Oval',
    value: 'Oval',
    image: '/icons/product-filter/icon-oval.svg',
    faceShapes: ['SQUARE', 'DIAMOND'],
  },
  {
    label: 'Rectangle',
    value: 'Rectangle',
    image: '/icons/product-filter/icon-rectangle.svg',
    faceShapes: ['OVAL', 'ROUND', 'TRIANGLE'],
  },
  {
    label: 'Round',
    value: 'Round',
    image: '/icons/product-filter/icon-round.svg',
    faceShapes: ['SQUARE'],
  },
  {
    label: 'Square',
    value: 'Square',
    image: '/icons/product-filter/icon-square.svg',
    faceShapes: ['HEART', 'OVAL'],
  },
];

export const SIZES = [
  {
    label: 'X-Small',
    value: 'Extra-Small (Petite)',
  },
  {
    label: 'Small',
    value: 'Small',
  },
  {
    label: 'Medium',
    value: 'Medium',
  },
  {
    label: 'Large',
    value: 'Large',
  },
];

export const LENS_TYPES = [
  {
    label: 'Single Vision',
    value: 'SingleVision',
    description: 'The most common prescription lens',
    image: '/icons/product-filter/icon-single-vision.svg',
  },
  {
    label: 'Bifocal',
    value: 'Bifocals',
    description: 'Two viewing areas for distance & reading',
    image: '/icons/product-filter/icon-bifocal.svg',
  },
  {
    label: 'Progressive',
    value: 'Progressive',
    description: 'Multifocal lenses with three viewing areas',
    image: '/icons/product-filter/icon-progressive.svg',
  },
];

export const FEATURES = [
  {
    label: 'Light Weight',
    value: 'Lightweight',
    image: '/icons/product-filter/icon-feather.svg',
  },
  {
    label: 'Nose Pads',
    value: 'Nose Pads',
    image: '/icons/product-filter/icon-nose-pads.svg',
  },
];

export const COLORS = [
  {
    label: 'Black',
    value: 'Black',
    color: '#5D6266',
  },
  {
    label: 'Blues',
    value: 'Blue',
    color: '#9ED0FE',
  },
  {
    label: 'Neutrals',
    value: 'Neutrals',
    color: '#E1DAD3',
  },
  {
    label: 'Reds',
    value: 'Red',
    color: '#E06F6F',
  },
  {
    label: 'Greens',
    value: 'Green',
    color: '#94D7AE',
  },
  {
    label: 'Multicolor',
    value: 'Multicolor',
    image: '/icons/product-filter/icon-pattern.svg',
  },
];

export const COLOR_MAPPINGS = {
  'Black': ['Black'],
  'Blue': ['Blue', 'Navy', 'Navy Ombre', 'Metallic Blue', 'Purple'],
  'Neutrals': ['Gold', 'Gray', 'Brown', 'Clear', 'Smoke', 'Storm', 'Graphine', 'Silver', 'Serenity'],
  'Red': ['Red', 'Pink', 'Cranberrty', 'Rose Gold', 'Wine/Rose Ombre'],
  'Green': ['Green', 'Emerald', 'Azure', 'Teal'],
  'Multicolor': ['Multicolor', 'Translucent', 'Eggplant', 'Coral', 'Pattern', 'Black Pattern', 'Tortoise', 'Floral', 'Rainbow', 'Tortoiseshell', 'Blush', 'Polka Dot', 'Ivory Tortoiseshell', 'Clear'],
};
