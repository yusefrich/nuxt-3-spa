<template>
  <div>
    <footer class="py-5">
      <div class="text-center">
        <img class="mb-4 mt-3 text-center footer-image" :src="config?config.footer_img?config.footer_img:config.logo:''" alt="">
      </div>
      <div class="container">
        <div class="container-sm mb-2 text-center text-white fut-color-dynamic d-flex">
          <div v-if="curacaoKey" style="width: 370px" class="me-4">
            <div
              :id="'apg-' + curacaoKey"
              :data-apg-seal-id="curacaoKey"
              data-apg-image-size="370"
              data-apg-image-type="basic-light-large"
            />
          </div>
          <div v-if="config && config.seal" :class="[config && config.copyright ? 'me-4' : 'w-100']">
            <iframe :src="config.seal" width="150" height="50" style="border:none;"></iframe>
          </div>
          <div>
            <!-- eslint-disable-next-line -->
            <p v-if="config && config.copyright" class="fut-color-dynamic" v-html="htmlDecode(config.copyright)" />
          </div>
        </div>
      </div>
      <div v-if="config && config.footer_imgs" class="d-flex justify-content-center align-items-center py-4" style="flex-wrap: wrap">
        <a v-for="imgs in config.footer_imgs" :key="'data_img_'+imgs.key" :href="imgs.link">
          <img class="img-content w-100" :src="imgs.img" height="50px" width="30%" alt="">
        </a>
      </div>
      <div class="container d-md-flex d-none pb-5">
        <div class="footer-menu container text-center">
          <div>
            <h4 class="tittle-footer mb-0">
              {{ config.name }}
            </h4>
            <a class="d-block a footer-menu-items" :href="localePath('/help?slug=about')">
              <span>{{ $t('i18n_quem_somos') }}</span>
            </a>
            <a class="d-block a footer-menu-items" :href="localePath('/help?slug=suport')">
              <span>{{ $t('i18n_entre_em_contato') }}</span>
            </a>
            <a class="a footer-menu-items" :href="localePath('/help?slug=faq')">
              <span>{{ $t('i18n_faq') }}</span>
            </a>
            <a class="a footer-menu-items" :href="afiliatesLink" target="_blank">
              <span>{{ $t('i18n_afiliados') }}</span>
            </a>
            <a class="a footer-menu-items" :href="localePath('/help?slug=auto_exclusion')">
              <span>{{ $t('i18n_auto_exclusion') }}</span>
            </a>
          </div>
        </div>
        <div class="footer-menu container text-center">
          <div>
            <h4 class="tittle-footer mb-0">
              {{ $t('i18n_ajuda_e_termos_legais') }}
            </h4>
            <a class="a footer-menu-items" :href="('/help?slug=responsible')">
              <span>{{ $t('i18n_jogo_responsavel') }}</span>
            </a>
            <a class="a footer-menu-items" :href="localePath('/help?slug=privacy')">
              <span>{{ $t('i18n_politica_de_privacidade') }}</span>
            </a>
            <a class="a footer-menu-items" :href="localePath('/help?slug=terms')">
              <span>{{ $t('i18n_termos_e_condicoes') }}</span>
            </a>
            <a class="a footer-menu-items" :href="localePath('/help?slug=rules')">
              <span>{{ $t('i18n_regras_gerais') }}</span>
            </a>
            <a class="a footer-menu-items" :href="localePath('/help?slug=aml')">
              <span>{{ $t('i18n_politica_aml') }}</span>
            </a>
            <a class="a footer-menu-items" :href="localePath('/help?slug=deposits')">
              <span>{{ $t('i18n_depositos_e_saques') }}</span>
            </a>
          </div>
        </div>
        <div class="footer-menu container text-center">
          <div>
            <h4 class="tittle-footer mb-0">
              {{ $t('i18n_ajuda_e_termos_legais') }}
            </h4>
            <a class="a footer-menu-items" :href="localePath('/help?slug=cookies')">
              <span>{{ $t('i18n_politica_de_cookies') }}</span>
            </a>
            <a class="a footer-menu-items" :href="localePath('/help?slug=disputs_resolution')">
              <span>{{ $t('i18n_disputs_resolution') }}</span>
            </a>
            <a class="a footer-menu-items" :href="localePath('/help?slug=method_impartiality')">
              <span>{{ $t('i18n_method_impartiality') }}</span>
            </a>
            <a class="a footer-menu-items" :href="localePath('/help?slug=kyc_politcs')">
              <span>{{ $t('i18n_kyc_politcs') }}</span>
            </a>
            <a class="a footer-menu-items" :href="localePath('/help?slug=accounts_payments_bonus')">
              <span>{{ $t('i18n_accounts_payments_bonus') }}</span>
            </a>
          </div>
        </div>
      </div>
      <div class="container-fluid">
        <h4 v-if="config" class="tittle-footer text-center">
          {{ config.name }}
        </h4>
        <h4 v-if="config" class="tittle-footer text-center">
          {{ config.desc }}
        </h4>
        <div v-if="config && config.sponsors && config.sponsors.length > 0">
          <h6 class="text-white text-center">
            {{ $t('i18n_patrocinador_oficial') }}:
          </h6>
          <div v-if="config.footer_style === 2">
            <img
              v-for="(spon, index) in config.sponsors"
              :key="'sponsor_img_'+index"
              :src="spon.img"
              width="100%"
              class="patreon style-sponsors-2"
            >
          </div>
          <div v-else class="d-flex justify-content-center">
            <img
              v-for="(spon, index) in config.sponsors"
              :key="'sponsor_img_'+index"
              :src="spon.img"
              class="ms-3 mr-3"
              width="70px"
              height="70px"
              style="object-fit:contain"
            >
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  props: {
    config: {
      type: Object,
      default: () => ({})
    },
    curacaoKey: {
      type: String,
      default: null
    },
    curacaoFunc: {
      type: String,
      default: null
    }
  },
  computed: {
    afiliatesLink () {
      return process.env.PRODUCT_CONFIG_AFILIATES_URL ? process.env.PRODUCT_CONFIG_AFILIATES_URL : '/help?slug=affiliates'
    }
  },
  mounted () {
    if (this.curacaoKey) {
      window[this.curacaoFunc].init()
    }
  },
  methods: {
    htmlDecode (input) {
      const doc = new DOMParser().parseFromString(input, 'text/html')
      return doc.documentElement.textContent
    }
  }
}
</script>

<style lang="scss" scoped>
footer {
  background-color: var(--fut-background-darkest);
  p {
    color: white;
    font-size: 14px;
    a {
      text-decoration: none;
      color: var(--fut-primary);
    }
  }
}
.tittle-footer {
  color: var(--fut-primary);
  font-weight: bold;
  font-size: 18px;
}
.subtittle-footer {
  color: var(--fut-primary);
  font-weight: bold;
}
.footer-menu-items {
  text-decoration: none;
  display: block;
  color: white;
  &:hover {
    color: var(--fut-primary);
  }
}
.border-background {
  border-bottom: 1px solid var(--fut-background-lighter);
}
.footer-image {
  width: 250px;
}
</style>
