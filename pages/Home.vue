<template>
  <div id="home">
    <HeroSection
      class="hero-section"
      :title="hero.title"
      :subtitle="hero.subtitle"
      :button-text="hero.buttonText"
      :link="hero.link"
      :image-src="hero.imageSrc"
      :image-width="hero.imageWidth"
      :image-height="hero.imageHeight"
      :nuxt-img-config="hero.imageConfig"
      image-tag="nuxt-img"
    />
    <LazyHydrate when-visible>
      <SfBannerGrid
        :banner-grid="1"
        class="banner-grid"
      >
        <template
          v-for="item in banners"
          #[item.slot]
        >
          <SfBanner
            :key="item.slot"
            :title="item.title"
            :subtitle="item.subtitle"
            :description="item.description"
            :button-text="item.buttonText"
            image-tag="nuxt-img"
            :image="item.image"
            :nuxt-img-config="item.imageConfig"
            :class="item.class"
          />
        </template>
      </SfBannerGrid>
    </LazyHydrate>
    <LoadWhenVisible>
      <NewProducts
        class="products"
        :button-text="$t('See more')"
        :title="$t('New Products')"
        link="/len.html"
      />
    </LoadWhenVisible>
    <LoadWhenVisible>
      <CallToAction
        :title="callToAction.title"
        :button-text="callToAction.buttonText"
        :description="callToAction.description"
        image-tag="nuxt-img"
        :image-src="callToAction.imageSrc"
        :image-width="callToAction.imageWidth"
        :image-height="callToAction.imageHeight"
        :nuxt-img-config="callToAction.imageConfig"
        class="call-to-action"
      />
    </LoadWhenVisible>
    <!-- <LoadWhenVisible>
      <InstagramFeed />
    </LoadWhenVisible> -->
    <LoadWhenVisible>
      <MobileStoreBanner />
    </LoadWhenVisible>
  </div>
</template>
<script lang="ts" type="module">
import {
  defineComponent,
  ref,
  useContext,
  onMounted,
  useFetch,
} from '@nuxtjs/composition-api';
import LazyHydrate from 'vue-lazy-hydration';
import { useCache, CacheTagPrefix } from '@vue-storefront/cache';
import { SfBanner, SfBannerGrid } from '@storefront-ui/vue';
import { CmsPage } from '~/modules/GraphQL/types';
import HeroSection from '~/components/HeroSection.vue';
import { getMetaInfo } from '~/helpers/getMetaInfo';
import { useContent } from '~/composables';
import LoadWhenVisible from '~/components/utils/LoadWhenVisible.vue';

export default defineComponent({
  name: 'HomePage',
  components: {
    HeroSection,
    LazyHydrate,
    LoadWhenVisible,
    SfBanner,
    SfBannerGrid,
    CallToAction: () => import(/* webpackPrefetch: true */ '~/components/CallToAction.vue'),
    InstagramFeed: () => import(/* webpackPrefetch: true */ '~/components/InstagramFeed.vue'),
    MobileStoreBanner: () => import(/* webpackPrefetch: true */ '~/components/MobileStoreBanner.vue'),
    NewProducts: () => import(/* webpackPrefetch: true */ '~/components/NewProducts.vue'),
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup() {
    const { addTags } = useCache();
    const { loadPage } = useContent();
    const { app } = useContext();
    const year = new Date().getFullYear();
    const { isDesktop } = app.$device;

    const page = ref<CmsPage | null>(null);
    const hero = ref({
      title: app.i18n.t('Prescription Sunglasses'),
      subtitle: app.i18n.t('Our affordable sunnies protect your eyes and your wallet all year long.', { year }),
      buttonText: app.i18n.t('Learn more'),
      imageSrc: '/homepage/mens_sunglasses_2.png',
      imageWidth: isDesktop ? 1240 : 328,
      imageHeight: isDesktop ? 400 : 224,
      imageConfig: {
        fit: 'contain',
        format: 'png',
      },
      link: '/womens.html',
    });
    const banners = ref([
      {
        slot: 'banner-A',
        subtitle: app.i18n.t('Glasses'),
        title: app.i18n.t('TOP-RATED GLASSES'),
        description: app.i18n.t(
          'Popular styles our customers rave about.',
        ),
        buttonText: app.i18n.t('Shop now'),
        image: {
          mobile:
            '/homepage/top-rated.png',
          desktop:
            '/homepage/top-rated.png',
        },
        imageConfig: {
          fit: 'cover',
          width: isDesktop ? 332 : 328,
          height: isDesktop ? 840 : 343,
          format: 'webp',
        },
        class: 'sf-banner--slim desktop-only',
        link: '/women/women-clothing-skirts',
      },
      {
        slot: 'banner-B',
        subtitle: app.i18n.t('Final Sale'),
        title: app.i18n.t('LAST CHANCE TO BUY'),
        description: app.i18n.t(
          'Get your hands on these soon-to-be-discontinued styles before they’re gone!',
        ),
        buttonText: app.i18n.t('Shop now'),
        image: '/homepage/last-chance.png',
        imageConfig: {
          fit: 'cover',
          width: isDesktop ? 496 : 328,
          height: isDesktop ? 840 : 343,
          format: 'webp',
        },
        class: 'sf-banner--slim banner-central desktop-only',
        link: '/women/women-clothing-dresses',
      },
      {
        slot: 'banner-C',
        subtitle: app.i18n.t('Work glasses'),
        title: app.i18n.t('The Office Line'),
        image: '/homepage/bannerC.webp',
        imageConfig: {
          fit: 'cover',
          width: isDesktop ? 332 : 328,
          height: isDesktop ? 400 : 343,
          format: 'webp',
        },
        class: 'sf-banner--slim banner__tshirt',
        link: '/women/women-clothing-shirts',
      },
      {
        slot: 'banner-D',
        subtitle: app.i18n.t('Summer deals'),
        title: app.i18n.t('Eco Line'),
        image: '/homepage/colorful.png',
        imageConfig: {
          fit: 'cover',
          width: isDesktop ? 332 : 328,
          height: isDesktop ? 400 : 343,
          format: 'webp',
        },
        class: 'sf-banner--slim',
        link: '/women/women-shoes-sandals',
      },
    ]);
    const callToAction = ref({
      title: app.i18n.t('Stay connected to Zenni.'),
      description: app.i18n.t('Sign up for exclusive offers and news from us'),
      buttonText: app.i18n.t('Sign Up'),
      imageSrc: '/homepage/newsletter.png',
      imageWidth: isDesktop ? 1240 : 400,
      imageHeight: isDesktop ? 202 : 200,
      imageConfig: {
        fit: 'cover',
        format: 'webp',
      },
    });

    useFetch(async () => {
      page.value = await loadPage({ identifier: 'home' });
    });

    onMounted(() => {
      addTags([{ prefix: CacheTagPrefix.View, value: 'home' }]);
    });

    // @ts-ignore
    return {
      banners,
      callToAction,
      hero,
      page,
    };
  },
  head() {
    return getMetaInfo(this.page);
  },
});
</script>

<style lang="scss" scoped>
.article-meta h4 a {
  color: #111111;
  font-weight: 600;
  font-size: 20px;
}

.article-meta {
  margin-top: 10px;
}

.article-item__meta-item:not(:last-child)::after {
  display: inline-block;
  content: '';
  width: 5px;
  height: 5px;
  margin: -1px 10px 0 10px;
  border-radius: 100%;
  background: rgba(0, 0, 0, 0.4);
  vertical-align: middle;
}

#home {
  box-sizing: border-box;
  padding: 0 var(--spacer-sm);
  @include for-desktop {
    max-width: 1240px;
    padding: 0;
    margin: 0 auto;
  }
}

.hero-section {
  margin: var(--spacer-xl) auto var(--spacer-lg);

  ::v-deep .sf-link:hover {
    color: var(--c-white);
  }

  @include for-desktop {
    margin: var(--spacer-xl) auto var(--spacer-2xl);
  }
}

.banner-grid {
  --banner-container-width: 50%;
  margin: var(--spacer-xl) 0;

  ::v-deep .sf-link:hover {
    color: var(--c-white);
  }

  @include for-desktop {
    margin: var(--spacer-2xl) 0;
    ::v-deep .sf-link {
      --button-width: auto;
    }
  }
}

.banner {
  &__tshirt {
    background-position: left;
  }

  &-central {
    @include for-desktop {
      --banner-container-flex: 0 0 70%;
    }
  }
}

.similar-products {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: var(--spacer-2xs);
  --heading-padding: 0;
  border-bottom: 1px var(--c-light) solid;
  @include for-desktop {
    border-bottom: 0;
    justify-content: center;
    padding-bottom: 0;
  }
}

.call-to-action {
  background-position: right;
  margin: var(--spacer-xs) 0;
  @include for-desktop {
    margin: var(--spacer-xl) 0 var(--spacer-2xl) 0;
  }
}

.products {
  margin-top: var(--spacer-base);
}

.carousel {
  margin: 0 calc(-1 * var(--spacer-sm)) 0 0;
  @include for-desktop {
    margin: 0;
  }

  &__item {
    margin: 1.375rem 0 2.5rem 0;
    @include for-desktop {
      margin: var(--spacer-xl) 0 var(--spacer-xl) 0;
    }

    &__product {
      --product-card-add-button-transform: translate3d(0, 30%, 0);
    }
  }
}
</style>
