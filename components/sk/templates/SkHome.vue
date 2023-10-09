<template>
  <div id="sk-home">
    <div
      v-if="currentSettings && currentSettings.ads && currentSettings.ads.length"
      class="sk-home-banner"
    >
      <div class="container">
        <sk-carousel
          :items="currentSettings.ads"
          full-width
          :is-mobile="isMobile"
          class="slider transition"
          name="ads"
        />
      </div>
    </div>

    <div class="container">
      <div class="sk-product-cards">
        <div
          v-for="(item, idx) in productCards"
          :key="idx"
          class="sk-card text-white"
        >
          <NuxtLink :to="localePath(item.to)" class="link">
            <h1>
              <font-awesome-icon class="icon transition" :icon="item.icon" />
              <span>{{ item.title }}</span>
            </h1>
          </NuxtLink>
          <!-- <img :src="item.img"> -->
          <sk-carousel
            :items="item.slides"
            full-width
            is-mobile
            class="slider transition"
            :name="`${idx}`"
          />
          <NuxtLink :to="localePath(item.to)" class="link">
            <div class="infos">
              <h2>
                {{ item.subtitle }}
              </h2>
              <p>
                {{ item.desc }}
              </p>
            </div>
          </NuxtLink>
          <NuxtLink :to="localePath(item.to)" class="card-btn link transition">
            <span>{{ item.btnText }}</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'

import { useSettingsStore } from '@/stores/settings'
import { useMetadataCasinoStore } from '@/stores/metadata-casino'

import SkCarousel from '@/components/sk/molecules/SkCarousel'
import windowWidth from '~/mixins.js/windowWidth'

export default {
  name: 'SkHome',
  components: {
    SkCarousel
  },
  mixins: [windowWidth],
  computed: {
    ...mapState(useSettingsStore, {
      currentSettings: 'currentSettings',
      currentSlides: 'currentSlides'
    }),
    ...mapState(useMetadataCasinoStore, {
      getCasinoSliders: 'getCasinoSliders'
    }),
    sportsSlides () {
      if (!this.currentSlides) {
        return null
      }

      if (Array.isArray(this.currentSlides)) {
        return this.currentSlides.map(slide => ({
          img: this.width > 768 ? slide.img : slide.img_mobile,
          link: slide.link
        }))
      }

      return Object.values(this.currentSlides).map(slide => ({
        img: this.width > 768 ? slide.img : slide.img_mobile,
        link: slide.link
      }))
    },
    casinoSlides () {
      const emptyArr = []

      if (this.getCasinoSliders !== null && Array.isArray(this.getCasinoSliders)) {
        return this.width > 768
          ? this.getCasinoSliders.slides
          : this.getCasinoSliders.slides_mobile
            ? this.getCasinoSliders.slides_mobile
            : emptyArr
      }

      if (this.getCasinoSliders !== null && !Array.isArray(this.getCasinoSliders)) {
        return Object.values(this.width > 768 ? this.getCasinoSliders.slides : this.getCasinoSliders.slides_mobile).map(slide => ({
          img: slide.img,
          link: slide.link
        }))
      }

      return emptyArr
    },
    productCards () {
      return [
        {
          title: this.$t('i18n_cassino'),
          icon: ['fas', 'dice'],
          img: '/Sk/casino-banner.avif',
          subtitle: this.$t('i18n_lider_entre_os_cassinos'),
          desc: this.$t('i18n_navegue_pela_nossa_enorme'),
          btnText: this.$t('i18n_ir_para_o_cassino'),
          to: '/casino',
          slides: this.casinoSlides
        },
        {
          title: this.$t('i18n_esporte', 2),
          icon: ['fas', 'basketball-ball'],
          img: '/Sk/sports-banner.avif',
          subtitle: this.$t('i18n_melhores_apostas_esportivas'),
          desc: this.$t('i18n_aposte_em_seus_times'),
          btnText: this.$t('i18n_ir_para_as_apostas'),
          to: '/sports?tab=SkLobby',
          slides: this.sportsSlides
        }
      ]
    },
    isMobile () {
      return this.width <= 821
    }
  },
  created () {
    this.fetchSliders()
    this.fetchCasinoSliders()
  },
  methods: {
    ...mapActions(useSettingsStore, {
      fetchSliders: 'fetchSliders'
    }),
    ...mapActions(useMetadataCasinoStore, {
      fetchCasinoSliders: 'fetchCasinoSliders'
    })
  }
}
</script>

<style lang="scss" scoped>
#sk-home {
  width: 100%;
  overflow-x: hidden;

  .sk-home-banner {
    background: var(--fut-background-darkest);

    .banner-wrapper {
      position: relative;
      background: transparent;
      padding: 0 3vw;
      display: flex;
      justify-content: space-between;
      background-repeat: no-repeat;
      background-size: contain;
      background-position-x: 87%;

      .authenticate-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 40%;

        .title {
          color: var(--fut-color-dynamic);
          font-weight: 700;
          font-size: 1.25rem;
          margin-bottom: 20px;
        }
        button {
          background: var(--fut-primary);
          border: none;
          color: var(--fut-color-dynamic);
          font-weight: 600;
          font-size: .875rem;
          padding: 10.5px 14px;
          border-radius: 30px;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .2), 0 1px 2px 0 rgba(0, 0, 0, .12);

          span {
            white-space: nowrap;
          }

          &:hover {
            background: var(--fut-primary-darker);
          }
          &:active {
            span {
              display: flex;
              align-items: center;
              justify-content: center;
              transform: scale(.95);
            }
          }
        }
      }
      .mobile-authenticate-wrapper {
        width: 100%;
        height: 215px;
      }
      .banner-img {
        width: 50%;

        img {
          width: 100%;
          opacity: 0;
        }
      }
    }
  }

  .sk-product-cards {
    display: grid;
    grid-gap: 2rem;
    grid-template-columns: repeat(2,1fr);
    margin-top: 24px;

    .sk-card {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .link {
        text-decoration: none;
        color: var(--fut-color-dynamic);
      }

      h1 {
        display: flex;
        align-items: center;
        margin: 0;
        line-height: 70%;

        .icon {
          color: var(--fut-secondary);
          width: 20px;
          height: 20px;
        }
        span {
          margin-left: 8px;
          font-size: 1.125rem;
          font-weight: 600;
        }
        &:hover {
          .icon {
            color: var(--fut-color-dynamic);
          }
        }
      }

      img {
        width: 100%;
        object-fit: contain;
        border-radius: 4px;
        margin: 0;
        transition: all ease-in-out 200ms;
      }

      .infos {
        display: flex;
        flex-direction: column;
        flex-grow: 1;

        h2 {
          color: var(--fut-color-dynamic);
          font-size: 1rem;
          font-weight: 700;
          line-height: 1.5;
        }

        p {
          color: var(--fut-secondary);
          font-size: .875rem;
          font-weight: 400;
          margin: 0;
        }
      }

      .card-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--fut-color-dynamic);
        font-weight: 600;
        background: var(--fut-primary);
        border-radius: .25rem;
        padding: .75em 0;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .2), 0 1px 2px 0 rgba(0, 0, 0, .12);

        &:hover {
          background: var(--fut-primary-darker);
        }
        &:active {
          span {
            display: flex;
            align-items: center;
            justify-content: center;
            transform: scale(.95);
          }
        }
      }

      &:hover {
        img, .slider {
          margin: -4px 0 4px 0;
        }
      }
    }
  }
}

.container {
  padding: 0 3vw !important;
}

@media (max-width: 821px) {
  .sk-product-cards {
    grid-template-columns: 100% !important;
  }
}
</style>
