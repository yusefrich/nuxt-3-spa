<template>
  <footer>
    <section class="general-links transition" :class="{accordion: width < 600}">
      <article :class="{'accordion-item': width < 600}">
        <h3>
          <button
            :class="{
              'accordion-button collapsed': width < 600,
              'white-icon': theme === 'dark'
            }"
            type="button"
            :disabled="width > 600"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="false"
            aria-controls="collapseOne"
          >
            {{ $t('i18n_regulamento') }}
          </button>
        </h3>
        <div
          id="collapseOne"
          :class="{'accordion-collapse collapse': width < 600}"
          aria-labelledby="headingOne"
          data-bs-parent="#accordionExample"
        >
          <NuxtLink class="a transition text-decoration-none d-block" :to="localePath('/help?slug=about')">
            {{ $t('i18n_quem_somos') }}
          </NuxtLink>
          <NuxtLink class="a transition text-decoration-none d-block" :to="localePath('/help?slug=responsible')">
            {{ $t('i18n_jogo_responsavel') }}
          </NuxtLink>
          <NuxtLink class="a transition text-decoration-none d-block" :to="localePath('/help?slug=privacy')">
            {{ $t('i18n_politica_de_privacidade') }}
          </NuxtLink>
          <NuxtLink class="a transition text-decoration-none d-block" :to="localePath('/help?slug=terms')">
            {{ $t('i18n_termos_e_condicoes') }}
          </NuxtLink>
          <NuxtLink class="a transition text-decoration-none d-block" :to="localePath('/help?slug=rules')">
            {{ $t('i18n_regras_gerais') }}
          </NuxtLink>
          <NuxtLink class="a transition text-decoration-none d-block" :to="localePath('/help?slug=aml')">
            {{ $t('i18n_politica_aml') }}
          </NuxtLink>
          <NuxtLink class="a transition text-decoration-none d-block" :to="localePath('/help?slug=deposits')">
            {{ $t('i18n_depositos_e_saques') }}
          </NuxtLink>
          <NuxtLink class="a transition text-decoration-none d-block" :to="localePath('/help?slug=cookies')">
            {{ $t('i18n_politica_de_cookies') }}
          </NuxtLink>
          <NuxtLink class="a transition text-decoration-none d-block" :to="localePath('/help?slug=kyc_politcs')">
            {{ $t('i18n_kyc_politcs') }}
          </NuxtLink>
          <NuxtLink class="a transition text-decoration-none d-block" :to="localePath('/help?slug=method_impartiality')">
            {{ $t('i18n_method_impartiality') }}
          </NuxtLink>
          <NuxtLink class="a transition text-decoration-none d-block" :to="localePath('/help?slug=accounts_payments_bonus')">
            {{ $t('i18n_accounts_payments_bonus') }}
          </NuxtLink>
        </div>
      </article>
      <article :class="{'accordion-item': width < 600}">
        <h3>
          <button
            :class="{
              'accordion-button collapsed': width < 600,
              'white-icon': theme === 'dark'
            }"
            type="button"
            :disabled="width > 600"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTwo"
            aria-expanded="false"
            aria-controls="collapseTwo"
          >
            {{ $t('i18n_ajuda') }}
          </button>
        </h3>
        <div
          id="collapseTwo"
          :class="{'accordion-collapse collapse': width < 600}"
          aria-labelledby="headingTwo"
          data-bs-parent="#accordionExample"
        >
          <NuxtLink class="a transition text-decoration-none d-block" :to="localePath('/help?slug=faq')">
            {{ $t('i18n_faq') }}
          </NuxtLink>
          <NuxtLink class="a transition text-decoration-none d-block" :to="localePath('/help?slug=suport')">
            {{ $t('i18n_entre_em_contato') }}
          </NuxtLink>
          <NuxtLink class="a transition text-decoration-none d-block" :to="localePath('/help?slug=disputs_resolution')">
            {{ $t('i18n_disputs_resolution') }}
          </NuxtLink>
          <NuxtLink class="a transition text-decoration-none d-block" :to="localePath('/help?slug=auto_exclusion')">
            {{ $t('i18n_auto_exclusion') }}
          </NuxtLink>
          <NuxtLink class="a transition text-decoration-none d-block" :to="localePath('/sobre-nos')">
            {{ $t('i18n_sobre_nos') }}
          </NuxtLink>
          <a
            v-if="checkAfiliates"
            class="a transition text-decoration-none d-block"
            :href="afiliatesLink"
            target="_blank"
          >
            {{ $t('i18n_afiliados') }}
          </a>
          <NuxtLink
            v-else
            class="a transition text-decoration-none d-block"
            :to="localePath(afiliatesLink)"
            target="_blank"
          >
            {{ $t('i18n_afiliados') }}
          </NuxtLink>
        </div>
      </article>
      <article :class="{'accordion-item': width < 600}">
        <h3>
          <button
            :class="{
              'accordion-button collapsed': width < 600,
              'white-icon': theme === 'dark'
            }"
            type="button"
            :disabled="width > 600"
            data-bs-toggle="collapse"
            data-bs-target="#collapseThree"
            aria-expanded="false"
            aria-controls="collapseThree"
          >
            {{ $t('i18n_siga_nos') }}
          </button>
        </h3>
        <div
          id="collapseThree"
          :class="{'accordion-collapse collapse': width < 600}"
          aria-labelledby="headingThree"
          data-bs-parent="#accordionExample"
        >
          <a
            v-if="currentSettings && currentSettings.fb"
            :href="currentSettings.fb"
            class="a transition text-decoration-none d-block"
            target="_blank"
          >
            <font-awesome-icon class="me-2" :icon="['fab', 'facebook']" />Facebook
          </a>
          <a
            v-if="currentSettings && currentSettings.insta"
            :href="currentSettings.insta"
            class="a transition text-decoration-none d-block"
            target="_blank"
          >
            <font-awesome-icon class="me-2" :icon="['fab', 'instagram']" />Instagram
          </a>
          <a
            v-if="currentSettings && currentSettings.tt"
            :href="currentSettings.tt"
            class="a transition text-decoration-none d-block"
            target="_blank"
          >
            <font-awesome-icon class="me-2" :icon="['fab', 'twitter']" />Twitter
          </a>
          <a
            v-if="currentSettings && currentSettings.yt"
            :href="currentSettings.yt"
            class="a transition text-decoration-none d-block"
            target="_blank"
          >
            <font-awesome-icon class="me-2" :icon="['fab', 'youtube']" />Youtube
          </a>
          <a
            v-if="currentSettings && currentSettings.phone"
            :href="'tel:'+currentSettings.phone"
            class="a transition text-decoration-none d-block"
            target="_blank"
          >
            <font-awesome-icon class="me-2" :icon="['fas', 'phone']" />{{ $t('i18n_contato') }}
          </a>
          <a
            v-if="currentSettings && currentSettings.whats"
            :href="'https://wa.me/'+currentSettings.whats"
            class="a transition text-decoration-none d-block"
            target="_blank"
          >
            <font-awesome-icon class="me-2" :icon="['fab', 'whatsapp']" />Whastapp
          </a>
          <a
            v-if="currentSettings && currentSettings.telegram"
            :href="'https://t.me/'+currentSettings.telegram"
            class="a transition text-decoration-none d-block"
            target="_blank"
          >
            <font-awesome-icon class="me-2" :icon="['fab', 'telegram']" />Telegram
          </a>
          <a
            v-if="currentSettings && currentSettings.tiktok"
            :href="currentSettings.tiktok"
            class="a transition text-decoration-none d-block"
            target="_blank"
          >
            <font-awesome-icon class="me-2" :icon="['fab', 'tiktok']" />TikTok
          </a>
        </div>
      </article>
    </section>

    <section class="sponsor transition">
      <div class="footer-menu-sponsor overflow-auto">
        <div v-if="currentSettings" class="content-container d-flex justify-content-center w-100">
          <img v-if="theme === 'dark'" src="/payments/pix branco.svg" height="30" width="auto" alt="">
          <img v-if="theme === 'light'" src="/payments/pix preto.svg" height="30" width="auto" alt="">
        </div>
      </div>
      <div class="d-block d-md-flex justify-content-center pb-3">
        <p class="align-self-center text-center pt-2 pe-4">
          {{ $t('i18n_todos_os_direitos_reservados') }}
        </p>
        <div class="bg-danger rounded-circle text-center mx-auto mx-md-0 age-restriction">
          <h2 style="align-self: center;" class="mb-0 fw-bold">
            +18
          </h2>
        </div>
      </div>
      <div
        v-if="currentSettings && currentSettings.sponsors && currentSettings.sponsors.length > 0"
        class="mb-2"
        :class="{ 'container-fluid px-0 mx-0': currentSettings.footer_style === 2, 'container-sm nsx-container': currentSettings.footer_style !== 2 }"
      >
        <h6 class="text-header-nsx text-center">
          {{ $t('i18n_patrocinador_oficial') }}:
        </h6>
        <div v-if="currentSettings.footer_style === 2">
          <img
            v-for="(spon, index) in currentSettings.sponsors"
            :key="'sponsor_img_'+index"
            :src="spon.img"
            class="patreon style-sponsors-2 w-100"
          >
        </div>
        <div v-else class="d-flex justify-content-center">
          <img
            v-for="(spon, index) in currentSettings.sponsors"
            :key="'sponsor_img_'+index"
            :src="spon.img"
            width="70"
            height="70"
            style="object-fit:contain"
          >
        </div>
      </div>
      <div class="container-sm mb-2 text-center ">
        <div class="d-flex mb-4">
          <div
            v-if="curacaoKey"
            style="width: 370px"
            class="me-4"
          >
            <div
              :id="'apg-' + curacaoKey"
              :data-apg-seal-id="curacaoKey"
              data-apg-image-size="370"
              data-apg-image-type="basic-light-large"
            />
          </div>
          <div v-if="currentSettings && currentSettings.seal" :class="[currentSettings && currentSettings.copyright ? 'me-4' : 'w-100']">
            <iframe :src="currentSettings.seal" width="150" height="50" style="border:none;"></iframe>
          </div>
          <div>
            <!-- eslint-disable -->
            <p
              v-if="currentSettings && currentSettings.copyright"
              v-html="htmlDecode(currentSettings.copyright)"
              style="font-size: 14px"
              class=""
            />
            <!-- eslint-enable -->
          </div>
        </div>
      </div>
      <div
        v-if="currentSettings && currentSettings.footer_imgs"
        style="flex-wrap: wrap"
        class="d-flex justify-content-evenly pb-4"
      >
        <a v-for="imgs in currentSettings.footer_imgs" :key="'data_img_'+imgs.key" :to="imgs.link">
          <img :src="imgs.img" height="90" width="90" class="img-content" alt="">
        </a>
      </div>
    </section>
  </footer>
</template>

<script>
import windowWidth from '@/mixins.js/windowWidth.js'

export default {
  name: 'MdFooter',
  mixins: [windowWidth],
  props: {
    currentSettings: {
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
    },
    theme: {
      type: String,
      default: ''
    }
  },
  computed: {
    checkAfiliates () {
      return process.env.PRODUCT_CONFIG_AFILIATES_URL
    },
    afiliatesLink () {
      return process.env.PRODUCT_CONFIG_AFILIATES_URL ? process.env.PRODUCT_CONFIG_AFILIATES_URL : '/affiliates'
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
.general-links {
  display: flex;
  justify-content: center;
  background: var(--md-comp-bg-color);
  border-top: 1px solid var(--md-comp-border-color);
  border-bottom: 1px solid var(--md-comp-border-color);
  box-shadow: 0 8px 10px 0 var(--md-shadow-color);
  color: var(--md-font-color) !important;
  padding: 24px;

  article {
    width: 30%;
    text-align: center;
    h3 {
      button {
        border: none;
        background: transparent;
        color: var(--md-font-color);
      }
    }
    .accordion-collapse {
      background: var(--md-comp-bg-color);
    }
    .a {
      padding: 12px 0;
      color: var(--md-menu-items-font-color) !important;
      &:hover {
        color: var(--fut-primary-darker) !important;
      }
    }
  }
  .accordion-item {
    background: var(--md-comp-bg-color);
    border: none;
  }
  .accordion-button::after {
    background-image: url('/md/chevron-down-b.svg');
  }
  .accordion-button.white-icon::after {
    background-image: url('/md/chevron-down-w.svg') !important;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    article {
      width: 100%;
    }
  }
}

.sponsor{
  background: var(--md-bg-color);
  color: var(--md-font-color);
}
.footer-menu-sponsor {
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
}

.content-container {
  img{
    margin-left: 10px;
    margin-right: 10px;
    display: inline;
    max-width: 28%;
    object-fit: contain;
  }
}

.age-restriction{
  height: 65px;
  width: 65px;
  display: flex;
  justify-content: center;
  h2{
    align-self: center;
  }
}
.img-content{
  object-fit: contain;
}

@media (max-width: 768px) {
  footer {
    padding-bottom: 40px;
  }
}
</style>
