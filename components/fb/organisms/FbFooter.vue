<template>
  <footer class="footer-content mt-2 pb-5 d-print-none">
    <fb-fut-button
      class="text-center btn btn-go-up fut-color-dynamic"
      external
      to="#page-top"
    >
      <span class="d-none d-md-inline-block">{{ $t('i18n_voltar_para_cima') }}</span>
      <font-awesome-icon class="d-md-none" :icon="['fas', 'long-arrow-alt-up']" />
    </fb-fut-button>
    <div class="container pt-5">
      <div class="links-footer-content pt-3 pt-md-0">
        <div class="links-footer d-flex flex-column align-items-center align-items-md-start">
          <div class="d-none d-md-block section-hr" />
          <fb-fut-button
            class="d-block py-md-2 a fut-color-dynamic d-block text-center text-md-start"
            to="/help?slug=about"
          >
            <span>{{ $t('i18n_quem_somos') }}</span>
          </fb-fut-button>
          <fb-fut-button
            class="py-md-2 a fut-color-dynamic"
            to="/help?slug=aml"
          >
            <span>{{ $t('i18n_politica_aml') }}</span>
          </fb-fut-button>
          <fb-fut-button
            class="py-md-2 a fut-color-dynamic"
            to="/help?slug=kyc_politcs"
          >
            <span>{{ $t('i18n_kyc_politcs') }}</span>
          </fb-fut-button>
          <fb-fut-button
            class="py-md-2 a fut-color-dynamic"
            to="/help?slug=cookies"
          >
            <span>{{ $t('i18n_politica_de_cookies') }}</span>
          </fb-fut-button>
          <fb-fut-button
            class="d-block py-md-2 a fut-color-dynamic"
            to="/help?slug=suport"
          >
            <span>{{ $t('i18n_entre_em_contato') }}</span>
          </fb-fut-button>
        </div>
        <div class="border-green d-md-none" />
        <div class="links-footer d-flex flex-column align-items-center align-items-md-start">
          <div class="d-none d-md-block section-hr" />
          <fb-fut-button
            class="py-md-2 a fut-color-dynamic"
            to="/help?slug=terms"
          >
            <span>{{ $t('i18n_termos_e_condicoes') }}</span>
          </fb-fut-button>
          <fb-fut-button
            class="py-md-2 a fut-color-dynamic"
            to="/help?slug=deposits"
          >
            <span>{{ $t('i18n_depositos_e_saques') }}</span>
          </fb-fut-button>
          <fb-fut-button
            class="py-md-2 a fut-color-dynamic"
            to="/help?slug=rules"
          >
            <span>{{ $t('i18n_regras_gerais') }}</span>
          </fb-fut-button>
          <fb-fut-button
            class="py-md-2 a fut-color-dynamic"
            :to="afiliatesLink"
            target="_blank"
          >
            <span>{{ $t('i18n_afiliados') }}</span>
          </fb-fut-button>
          <fb-fut-button
            class="py-md-2 a fut-color-dynamic"
            to="/help?slug=accounts_payments_bonus"
          >
            <span>{{ $t('i18n_accounts_payments_bonus') }}</span>
          </fb-fut-button>
          <fb-fut-button
            class="py-md-2 a fut-color-dynamic"
            to="/help?slug=faq"
          >
            <span>{{ $t('i18n_faq') }}</span>
          </fb-fut-button>
        </div>
        <div class="border-green d-md-none" />
        <div class="links-footer d-flex flex-column align-items-center align-items-md-start">
          <div class="d-none d-md-block section-hr" />
          <fb-fut-button
            class="py-md-2 a fut-color-dynamic"
            to="/help?slug=responsible"
          >
            <span>{{ $t('i18n_jogo_responsavel') }}</span>
          </fb-fut-button>
          <fb-fut-button
            class="py-md-2 a fut-color-dynamic"
            to="/help?slug=privacy"
          >
            <span>{{ $t('i18n_politica_de_privacidade') }}</span>
          </fb-fut-button>
          <fb-fut-button
            class="py-md-2 a fut-color-dynamic"
            to="/help?slug=method_impartiality"
          >
            <span>{{ $t('i18n_method_impartiality') }}</span>
          </fb-fut-button>
          <fb-fut-button
            class="py-md-2 a fut-color-dynamic"
            to="/help?slug=disputs_resolution"
          >
            <span>{{ $t('i18n_disputs_resolution') }}</span>
          </fb-fut-button>
          <fb-fut-button
            class="py-md-2 a fut-color-dynamic"
            to="/help?slug=auto_exclusion"
          >
            <span>{{ $t('i18n_auto_exclusion') }}</span>
          </fb-fut-button>
        </div>
        <div class="border-green d-md-none" />
        <div class="links-footer d-block">
          <div class="d-none d-md-block section-hr" />
          <fb-fut-button
            v-if="!applicationType('casino') || applicationType('sports')"
            class="a py-md-2 fut-color-dynamic d-block text-md-start"
            to="/sports"
          >
            <span>{{ $t('i18n_esporte', 2) }}</span>
          </fb-fut-button>
          <fb-fut-button
            v-if="!applicationType('casino') || applicationType('sports')"
            class="a py-md-2 fut-color-dynamic d-block text-md-start"
            to="/aovivo"
          >
            <span>{{ $t('i18n_ao_vivo') }}</span>
          </fb-fut-button>
          <fb-fut-button
            v-if="!applicationType('sports') || applicationType('casino')"
            class="a py-md-2 fut-color-dynamic d-block text-md-start"
            to="/casino"
          >
            <span>{{ $t('i18n_cassino') }}</span>
          </fb-fut-button>
          <fb-fut-button
            v-if="!applicationType('sports') || applicationType('casino')"
            class="a py-md-2 fut-color-dynamic d-block text-md-start"
            to="/casino-aovivo"
          >
            <span>{{ $t('i18n_cassino_ao_vivo') }}</span>
          </fb-fut-button>
          <fb-fut-button
            class="a py-md-2 fut-color-dynamic d-block text-md-start"
            :external="productConfigPromoUrl.status !== null"
            :target="productConfigPromoUrl.status ? '_blank' : '_self'"
            :to="productConfigPromoUrl.url"
          >
            <span>{{ productConfigPromoUrl.status ? $t('i18n_ranking') : $t('i18n_promocao', 2) }}</span>
          </fb-fut-button>
        </div>
        <div class="border-green d-md-none" />

        <div class="links-footer-right mb-5 mb-md-0">
          <img
            v-if="config"
            :src="config.footer_img ? config.footer_img : config.logo"
            class="p-1 logo rounded my-3"
            style="object-fit: contain;"
            alt="Logo FDS"
          >
          <div class="py-4 py-md-0">
            <fb-fut-button
              v-if="config && config.fb"
              class="social-midia-content text-dark"
              target="_blank"
              external
              :to="config.fb"
            >
              <font-awesome-icon :icon="['fab', 'facebook-f']" />
            </fb-fut-button>
            <fb-fut-button
              v-if="config && config.insta"
              class="social-midia-content text-dark"
              target="_blank"
              external
              :to="config.insta"
            >
              <font-awesome-icon :icon="['fab', 'instagram']" />
            </fb-fut-button>
            <fb-fut-button
              v-if="config && config.tiktok"
              class="social-midia-content text-dark"
              target="_blank"
              external
              :to="config.tiktok"
            >
              <font-awesome-icon :icon="['fab', 'tiktok']" />
            </fb-fut-button>
            <fb-fut-button
              v-if="config && config.tt"
              class="social-midia-content text-dark"
              target="_blank"
              external
              :to="config.tt"
            >
              <font-awesome-icon :icon="['fab', 'twitter']" />
            </fb-fut-button>
            <fb-fut-button
              v-if="config && config.yt"
              class="social-midia-content text-dark"
              target="_blank"
              external
              :to="config.yt"
            >
              <font-awesome-icon :icon="['fab', 'youtube']" />
            </fb-fut-button>
            <fb-fut-button
              v-if="config && config.phone"
              class="social-midia-content text-dark"
              target="_blank"
              external
              :to="'tel:'+config.phone"
            >
              <font-awesome-icon :icon="['fab', 'telegram-plane']" />
            </fb-fut-button>
            <fb-fut-button
              v-if="config && config.whats"
              class="social-midia-content text-dark"
              target="_blank"
              external
              :to="'https://wa.me/'+config.whats"
            >
              <font-awesome-icon :icon="['fab', 'whatsapp']" />
            </fb-fut-button>
          </div>
          <div class="mt-2">
            <div class="age-rest text-white fut-color-dynamic ">
              18+
            </div>
          </div>
        </div>
      </div>
      <div v-if="config && config.copyright" class="border-fb my-3" />
      <div class="m-4">
        <div class="d-md-flex mb-4">
          <div v-if="curacaoKey" :style="isMobile ? 'width: 50%' : 'width: 15%'" class="me-md-4 ms-md-0 me-auto ms-auto">
            <div
              :id="'apg-' + curacaoKey"
              :data-apg-seal-id="curacaoKey"
              data-apg-image-size="auto"
              data-apg-image-type="basic-light-large"
            />
          </div>
          <div
            v-if="curacaoIframeSrc"
            :class="[config && config.copyright ? 'me-4' : 'w-100 text-center']"
          >
            <iframe
              :src="curacaoIframeSrc"
              width="150"
              height="50"
              style="border:none;"
            />
          </div>
          <div>
            <!-- eslint-disable -->
            <p
              v-if="config && config.copyright"
              v-html="htmlDecode(config.copyright)"
              style="font-size: 14px"
              class="fut-color-dynamic text-gray text-center mb-0"
            />
            <!-- eslint-enable -->
          </div>
        </div>
      </div>
      <div class="border-fb my-3" />
      <div v-if="config && config.sponsors && config.sponsors.length > 0">
        <h5 class="text-white text-center fut-color-dynamic">
          {{ $t('i18n_patrocinador_oficial') }}:
        </h5>
        <div v-if="config.footer_style === 2">
          <img
            v-for="(spon, index) in config.sponsors"
            :key="'sponsor_img_'+index"
            :src="spon.img"
            class="patreon style-sponsors-2"
          >
        </div>
        <div v-else class="d-flex justify-content-center">
          <img
            v-for="(spon, index) in config.sponsors"
            :key="'sponsor_img_' + index"
            :src="spon.img"
            class="ms-3 mr-3 patreon style-sponsors w-100"
          >
        </div>
      </div>
      <div
        v-if="config && config.footer_imgs"
        class="d-flex justify-content-evenly"
        style="flex-wrap: wrap"
      >
        <fb-fut-button
          v-for="imgs in config.footer_imgs"
          :key="'data_img_'+imgs.key"
          :to="imgs.link"
        >
          <img
            :src="imgs.img"
            height="90"
            width="90"
            class="img-content"
          >
        </fb-fut-button>
      </div>
      <div class="d-grid justify-content-center">
        <span class="text-white fs-4 my-2 fut-color-dynamic">{{ $t('i18n_pagamento') }}</span>
        <img class="pix-style" src="/img/pix.png">
      </div>
    </div>
  </footer>
</template>

<script>
import FbFutButton from '@/components/fb/atoms/FbFutButton.vue'

export default {
  name: 'FbFooter',
  components: {
    FbFutButton
  },
  props: {
    config: {
      type: Object,
      default: () => ({})
    },
    curacaoIframeSrc: {
      type: String,
      default: null
    },
    curacaoKey: {
      type: String,
      default: null
    },
    curacaoFunc: {
      type: String,
      default: null
    },
    isMobile: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    productConfigPromoUrl () {
      return { status: process.env.PRODUCT_CONFIG_PROMO_URL, url: process.env.PRODUCT_CONFIG_PROMO_URL ? process.env.PRODUCT_CONFIG_PROMO_URL : '/promo' }
    },
    afiliatesLink () {
      return process.env.PRODUCT_CONFIG_AFILIATES_URL ? process.env.PRODUCT_CONFIG_AFILIATES_URL : '/help?slug=affiliates'
    }
  },
  mounted () {
    if (this.curacaoKey) {
      console.log('this is the curacao func', this.curacaoKey)
      window[this.curacaoFunc].init()
    }
  },
  methods: {
    scrollTop () {
      window.scrollTo(0, 0)
    },
    htmlDecode (input) {
      const doc = new DOMParser().parseFromString(input, 'text/html')
      return doc.documentElement.textContent
    },
    applicationType (term) {
      const config = '' + process.env.PRODUCT_CONFIG
      return config.includes(term)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/layout/breakpoints";
.btn-go-up{
  position: absolute;
  top: 10px;
  right: 20px;
  border-radius: 10px;
  color: white;
  padding: 10px 30px;
  background: var(--fut-background-lighter);
  font-size: 13px;
  box-shadow: 0 3px 8px rgb(0 0 0 / 40%);
  width: 95%;
  right: 2.5%;
  @include md {
    right: 20px;
    padding: 5px 30px;
    width: initial;
  }
}
.age-rest{
  // @include md {
    // float: right;
  // }
  font-size: 15px;
  width: 35px;
  height: 35px;
  line-height: 30px;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  border: 3px solid var(--fut-primary);
  text-align: center;
  margin-top: 8px;
  display: inline-block;
}
.img-content{
  object-fit: contain;
}
.links-footer-content {
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  text-align: center;
  @include md
  {
    display: flex;
    justify-content: center;
    flex-direction: row;
    text-align: left;
  }
}
.footer-content {
  background-color: var(--fut-background);
  position: relative;
}
.links-footer {
  width: 100%;
  font-size: 12px;
  margin: 25px 0 12px 0;
  @include md {
    width: 30%;
    font-size: 13px;
  }
  .a {
    text-decoration: none;
    color: white;
    margin-top: 10px;
    font-size: 12px;
      &:hover {
          color: var(--fut-primary);
        }
      @include md {
        font-size: 13px;
        margin-top: 0px;
      }
    }
}
.links-footer-right {
  width: 100%;
  @include md {
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
}
.logo {
  max-width: 300px;
  width: 100%;
  height: 60%;
  @include md {
    max-width: 200px;
    height: 40px;
  }
}
.social-midia-content {
  color: white;
  line-height: 30px;
  text-align: center;
  width: 40px;
  height: 40px;
  padding: 5px;
  @include md {
    width: 30px;
    height: 30px;
    padding: 0px;
  }
  border-radius: 5px;
  margin: 2px 6px 0 5px;
  font-weight: bold;
  cursor: pointer;
  svg {
    height: 26px;
    vertical-align: middle;
    @include md {
      height: 17px;
    }
  }
  a {
    font-size: 20px;
  }
  background-color: white;
  &:hover{
    // color: var(--fut-primary);
    background-color: var(--fut-primary);
  }
}
.border-fb {
  border: 2px solid var(--fut-primary)
}
.border-green {
  border: 2px solid var(--fut-primary);
  width: 63px;
  margin: 0 auto;
  border-radius: 20px;
}
.text-gray {
  text-align: center;
  color: white;
  @include md {
    color: gray;
    text-align: left;
  }
}
.pix-style {
  filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(49deg) brightness(300%) contrast(104%);
  width: 100px;
}
.style-sponsors {
  width: 70px;
  height: 70px;
  object-fit: contain;
}
.style-sponsors-2 {
  width: 100%;
}
.section-hr {
  height: 5px;
  width: 90px;
  background: var(--fut-primary);
  border-radius: 5px;
}
</style>
