<template>
  <transition-group
    appear
    class="grid-layout"
    name="slide"
    tag="div"
  >
    <template v-if="loading">
      <div
        v-for="n in 4 * 3"
        :key="n"
        class="sf-product-card card"
        data-testid="skeleton"
      >
        <SkeletonLoader :height="`${imageSize.height}px`" />
        <SkeletonLoader />
        <SkeletonLoader />
      </div>
    </template>
    <template v-else>
      <SfProductCard
        v-for="product in productsWithCommonProductCardProps"
        :key="product.uid"
        v-bind="product.commonProps"
        class="card"
        data-testid="product-card"
        :image-height="imageSize.height"
        :image-width="imageSize.width"
        :show-add-to-cart-button="false"
        @click:wishlist="$emit('click:wishlist', product)"
        @click:add-to-cart="
          $emit('click:add-to-cart', { product, quantity: 1 })
        "
      >
        <template #title="{ title, link }">
          <template v-if="!isContactLens">
            <SfButton
              class="sf-add-to-cart__button"
              @click="$emit('click:add-to-cart', { product, quantity: 1 })"
            >
              {{ $t("Add to cart") }}
            </SfButton>
            <VirtualTryOnButton class="mt-2" />
          </template>
          <SfButton
            :link="link"
            class="sf-button--pure sf-product-card__link"
            data-testid="product-link"
            :aria-label="'Go To Product'"
            v-on="$listeners"
          >
            <span class="sf-product-card__title">
              {{ title }}
            </span>
          </SfButton>
        </template>
        <template #price>
          <CategoryProductPrice :product="product" />
        </template>
        <template
          #image="{
            image,
            title,
            link,
            imageHeight,
            imageWidth,
            imageTag,
            nuxtImgConfig,
          }"
        >
          <SfButton
            :link="link"
            class="sf-button--pure sf-product-card__link"
            data-testid="product-link"
            :aria-label="'Go To Product'"
            v-on="$listeners"
          >
            <template v-if="Array.isArray(image)">
              <SfImage
                v-for="(picture, key) in image.slice(0, 2)"
                :key="key"
                class="sf-product-card__picture"
                :src="picture"
                :alt="title"
                :width="imageWidth"
                :height="imageHeight"
                :image-tag="imageTag"
                :nuxt-img-config="nuxtImgConfig"
              >
                <template #placeholder>
                  <div />
                </template>
              </SfImage>
            </template>
            <SfImage
              v-else
              class="sf-product-card__image"
              :src="image"
              :alt="title"
              :width="imageWidth"
              :height="imageHeight"
              :image-tag="imageTag"
              :nuxt-img-config="nuxtImgConfig"
            >
              <template #placeholder>
                <div />
              </template>
            </SfImage>
          </SfButton>
        </template>
      </SfProductCard>
    </template>
  </transition-group>
</template>

<script lang="ts">
import {
  defineComponent, PropType, toRefs, computed,
} from '@nuxtjs/composition-api';
import { SfProductCard, SfButton, SfImage } from '@storefront-ui/vue';
import { useImage } from '~/composables';
import type { Product } from '~/modules/catalog/product/types';

import SkeletonLoader from '~/components/SkeletonLoader/index.vue';
import CategoryProductPrice from '~/modules/catalog/category/components/views/CategoryProductPrice.vue';
import VirtualTryOnButton from '~/components/VirtualTryOnButton.vue';
import { contactLensesSKUs } from '~/components/constants';
import { useProductsWithCommonProductCardProps } from './useProductsWithCommonCardProps';

export default defineComponent({
  components: {
    CategoryProductPrice,
    SfProductCard,
    SkeletonLoader,
    SfButton,
    SfImage,
    VirtualTryOnButton,
  },
  props: {
    products: {
      type: Array as PropType<Product[]>,
      required: true,
    },
    pricesLoaded: Boolean,
    loading: Boolean,
  },
  emits: ['click:wishlist', 'click:add-to-cart'],
  setup(props) {
    const {
      imageSizes: { productCard: imageSize },
    } = useImage();
    const { products } = toRefs(props);
    const { productsWithCommonProductCardProps } = useProductsWithCommonProductCardProps(products);
    const isContactLens = computed(() => products.value.some((product) => contactLensesSKUs.includes(product.sku)));
    return {
      imageSize,
      isContactLens,
      productsWithCommonProductCardProps,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "./transition.scss";
.grid-layout {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: center;

  @include for-desktop {
    justify-content: flex-start;
    margin: var(--spacer-sm) 0 0 var(--spacer-sm);
  }
}
.card {
  --product-card-title-font-weight: var(--font-weight--medium);
  --product-card-title-margin: var(--spacer-xs) 0 0 0;
  flex: 1 1 100%;

  @include for-desktop {
    --product-card-max-width: 25%;
    --product-card-title-font-weight: var(--font-weight--normal);
    --product-card-title-margin: var(--spacer-sm) 0 0 0;
    --product-card-add-button-bottom: var(--spacer-base);
  }
}

::v-deep .sf-product-card {
  .card {
    will-change: transform, opacity;
  }

  &__image-wrapper {
    height: 257px;
  }

  &__add-button {
    @include for-mobile {
      opacity: 1;
      display: flex;
      bottom: 1rem;
      right: 0;
    }
  }
}

::v-deep .sf-product-card::after {
  content: none;
}
</style>
