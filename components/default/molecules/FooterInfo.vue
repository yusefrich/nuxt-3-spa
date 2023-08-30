<template>
  <div class="footer-menu justify-content-center d-print-none">
    <div class="content-container container-fluid">
      <div class="row d-md-none">
        <div class="col-md-4 text-center">
          <fut-button
            class="a text-decoration-none p-0"
            data-bs-toggle="collapse"
            to="#collapseRegulamento"
            role="button"
            external
            aria-expanded="false"
            aria-controls="collapseRegulamento"
          >
            <h3 class="text-white fut-color-dynamic d-flex justify-content-between">
              {{ $t('i18n_regulamento') }} <font-awesome-icon class="text-primary icon m-1 ms-3" :icon="['fas', 'chevron-down']" />
            </h3>
          </fut-button>
          <div id="collapseRegulamento" class="collapse show">
            <fut-button class="a text-white fut-color-dynamic text-decoration-none d-block" to="/jogo-responsavel">
              {{ $t('i18n_jogo_responsavel') }}
            </fut-button>
            <fut-button class="a text-white fut-color-dynamic text-decoration-none d-block" to="/termos-e-condicoes">
              {{ $t('i18n_termos_e_condicoes') }}
            </fut-button>
            <fut-button class="a text-white fut-color-dynamic text-decoration-none d-block" to="/regras-gerais">
              {{ $t('i18n_regras_de_apostas') }}
            </fut-button>
            <fut-button class="a text-white fut-color-dynamic text-decoration-none d-block" to="/depositos-e-saques">
              {{ $t('i18n_depositos_e_saques') }}
            </fut-button>
            <fut-button class="a text-white fut-color-dynamic text-decoration-none d-block" to="/privacidade">
              {{ $t('i18n_politica_de_privacidade') }}
            </fut-button>
            <fut-button class="a text-white fut-color-dynamic text-decoration-none d-block" to="/aml">
              {{ $t('i18n_politica_aml') }}
            </fut-button>
            <fut-button class="a text-white fut-color-dynamic text-decoration-none d-block" to="/cookies">
              {{ $t('i18n_politica_de_cookies') }}
            </fut-button>
          </div>
        </div>
        <div class="col-md-4 text-center">
          <fut-button
            class="a text-decoration-none p-0"
            data-bs-toggle="collapse"
            to="#collapseHelp"
            role="button"
            external
            aria-expanded="false"
            aria-controls="collapseHelp"
          >
            <h3 class="text-white fut-color-dynamic d-flex justify-content-between">
              {{ $t('i18n_ajuda') }} <font-awesome-icon class="text-primary icon m-1 ms-3" :icon="['fas', 'chevron-down']" />
            </h3>
          </fut-button>
          <div id="collapseHelp" class="collapse">
            <fut-button class="a text-white fut-color-dynamic text-decoration-none d-block" to="/faq">
              FAQ
            </fut-button>
            <fut-button class="a text-white fut-color-dynamic text-decoration-none d-block" to="/suporte">
              {{ $t('i18n_entre_em_contato') }}
            </fut-button>
            <fut-button class="a text-white fut-color-dynamic text-decoration-none d-block" to="/sobre-nos">
              {{ $t('i18n_sobre_nos') }}
            </fut-button>
            <fut-button class="a text-white fut-color-dynamic text-decoration-none d-block" to="/affiliates">
              {{ $t('i18n_afiliados') }}
            </fut-button>
          </div>
        </div>
        <div class="col-md-4 text-center">
          <fut-button
            class="a text-decoration-none p-0"
            data-bs-toggle="collapse"
            to="#collapseFollow"
            role="button"
            external
            aria-expanded="false"
            aria-controls="collapseFollow"
          >
            <h3 class="text-white fut-color-dynamic d-flex justify-content-between">
              {{ $t('i18n_siga_nos') }} <font-awesome-icon class="text-primary icon m-1 ms-3" :icon="['fas', 'chevron-down']" />
            </h3>
          </fut-button>
          <div id="collapseFollow" class="collapse">
            <fut-button
              v-if="currentSettings && currentSettings.fb"
              :to="currentSettings.fb"
              external
              class="a text-white fut-color-dynamic text-decoration-none d-block"
              target="_blank"
            >
              <font-awesome-icon class="me-2" :icon="['fab', 'facebook']" />Facebook
            </fut-button>
            <fut-button
              v-if="currentSettings && currentSettings.insta"
              :to="currentSettings.insta"
              external
              class="a text-white fut-color-dynamic text-decoration-none d-block"
              target="_blank"
            >
              <font-awesome-icon class="me-2" :icon="['fab', 'instagram']" />Instagram
            </fut-button>
            <fut-button
              v-if="currentSettings && currentSettings.tiktok"
              :to="currentSettings.tiktok"
              external
              class="a text-white fut-color-dynamic text-decoration-none d-block"
              target="_blank"
            >
              <font-awesome-icon class="me-2" :icon="['fab', 'tiktok']" />TikTok
            </fut-button>
            <fut-button
              v-if="currentSettings && currentSettings.tt"
              :to="currentSettings.tt"
              external
              class="a text-white fut-color-dynamic text-decoration-none d-block"
              target="_blank"
            >
              <font-awesome-icon class="me-2" :icon="['fab', 'twitter']" />Twitter
            </fut-button>
            <fut-button
              v-if="currentSettings && currentSettings.yt"
              :to="currentSettings.yt"
              external
              class="a text-white fut-color-dynamic text-decoration-none d-block"
              target="_blank"
            >
              <font-awesome-icon class="me-2" :icon="['fab', 'youtube']" />Youtube
            </fut-button>
            <fut-button
              v-if="currentSettings && currentSettings.phone"
              :to="'tel:'+currentSettings.phone"
              external
              class="a text-white fut-color-dynamic text-decoration-none d-block"
              target="_blank"
            >
              <font-awesome-icon class="me-2" :icon="['fas', 'phone']" />{{ $t('i18n_contato') }}
            </fut-button>
            <fut-button
              v-if="currentSettings && currentSettings.whats"
              :to="'https://wa.me/'+currentSettings.whats"
              external
              class="a text-white fut-color-dynamic text-decoration-none d-block"
              target="_blank"
            >
              <font-awesome-icon class="me-2" :icon="['fab', 'whatsapp']" />Whastapp
            </fut-button>
            <fut-button
              v-if="currentSettings && currentSettings.telegram"
              :to="'https://t.me/'+currentSettings.telegram"
              external
              class="a text-white fut-color-dynamic text-decoration-none d-block"
              target="_blank"
            >
              <font-awesome-icon class="me-2" :icon="['fab', 'telegram']" />Telegram
            </fut-button>
            <fut-button
              v-if="currentSettings && currentSettings.tiktok"
              :to="currentSettings.tiktok"
              external
              class="a text-white fut-color-dynamic text-decoration-none d-block"
              target="_blank"
            >
              <font-awesome-icon class="me-2" :icon="['fab', 'tiktok']" />TikTok
            </fut-button>
          </div>
        </div>
      </div>
      <div class="row d-none d-md-flex">
        <div class="col-4">
          <h3 class="text-white fut-color-dynamic">
            {{ $t('i18n_regulamento') }}
          </h3>
          <fut-button class="a text-white fut-color-dynamic text-decoration-none d-block" to="/jogo-responsavel">
            {{ $t('i18n_jogo_responsavel') }}
          </fut-button>
          <fut-button class="a text-white fut-color-dynamic text-decoration-none d-block" to="/termos-e-condicoes">
            {{ $t('i18n_termos_e_condicoes') }}
          </fut-button>
          <fut-button class="a text-white fut-color-dynamic text-decoration-none d-block" to="/regras-gerais">
            {{ $t('i18n_regras_de_apostas') }}
          </fut-button>
          <fut-button class="a text-white fut-color-dynamic text-decoration-none d-block" to="/depositos-e-saques">
            {{ $t('i18n_depositos_e_saques') }}
          </fut-button>
          <fut-button class="a text-white fut-color-dynamic text-decoration-none d-block" to="/privacidade">
            {{ $t('i18n_politica_de_privacidade') }}
          </fut-button>
          <fut-button class="a text-white fut-color-dynamic text-decoration-none d-block" to="/aml">
            {{ $t('i18n_politica_aml') }}
          </fut-button>
          <fut-button class="a text-white fut-color-dynamic text-decoration-none d-block" to="/cookies">
            {{ $t('i18n_politica_de_cookies') }}
          </fut-button>
          <fut-button class="a text-white fut-color-dynamic text-decoration-none d-block" to="/auto-exclusao">
            {{ $t('i18n_auto_exclusion') }}
          </fut-button>
          <fut-button class="a text-white fut-color-dynamic text-decoration-none d-block" to="/resolucao-de-disputas">
            {{ $t('i18n_disputs_resolution') }}
          </fut-button>
          <fut-button class="a text-white fut-color-dynamic text-decoration-none d-block" to="/imparcialidade">
            {{ $t('i18n_method_impartiality') }}
          </fut-button>
          <fut-button class="a text-white fut-color-dynamic text-decoration-none d-block" to="/kyc">
            {{ $t('i18n_kyc_politcs') }}
          </fut-button>
          <fut-button class="a text-white fut-color-dynamic text-decoration-none d-block" to="/pagamento-de-bonus">
            {{ $t('i18n_accounts_payments_bonus') }}
          </fut-button>
        </div>
        <div class="col-4">
          <h3 class="text-white fut-color-dynamic">
            {{ $t('i18n_ajuda') }}
          </h3>
          <fut-button class="text-white fut-color-dynamic text-decoration-none d-block text-center" to="/faq">
            FAQ
          </fut-button>
          <fut-button class="a text-white fut-color-dynamic text-decoration-none d-block" to="/suporte">
            {{ $t('i18n_entre_em_contato') }}
          </fut-button>
          <fut-button class="a text-white fut-color-dynamic text-decoration-none d-block" to="/sobre-nos">
            {{ $t('i18n_sobre_nos') }}
          </fut-button>
          <fut-button class="a text-white fut-color-dynamic text-decoration-none d-block" :to="afiliatesLink" :external="checkAfiliates ? true : false" target="_blank">
            {{ $t('i18n_afiliados') }}
          </fut-button>
        </div>
        <div class="col-4">
          <h3 class="text-white fut-color-dynamic">
            {{ $t('i18n_siga_nos') }}
          </h3>
          <fut-button
            v-if="currentSettings && currentSettings.fb"
            :to="currentSettings.fb"
            external
            class="a text-white fut-color-dynamic text-decoration-none d-block"
            target="_blank"
          >
            <font-awesome-icon class="me-2" :icon="['fab', 'facebook']" />Facebook
          </fut-button>
          <fut-button
            v-if="currentSettings && currentSettings.insta"
            :to="currentSettings.insta"
            external
            class="a text-white fut-color-dynamic text-decoration-none d-block"
            target="_blank"
          >
            <font-awesome-icon class="me-2" :icon="['fab', 'instagram']" />Instagram
          </fut-button>
          <fut-button
            v-if="currentSettings && currentSettings.tt"
            :to="currentSettings.tt"
            external
            class="a text-white fut-color-dynamic text-decoration-none d-block"
            target="_blank"
          >
            <font-awesome-icon class="me-2" :icon="['fab', 'twitter']" />Twitter
          </fut-button>
          <fut-button
            v-if="currentSettings && currentSettings.yt"
            :to="currentSettings.yt"
            external
            class="a text-white fut-color-dynamic text-decoration-none d-block"
            target="_blank"
          >
            <font-awesome-icon class="me-2" :icon="['fab', 'youtube']" />Youtube
          </fut-button>
          <fut-button
            v-if="currentSettings && currentSettings.phone"
            :to="'tel:'+currentSettings.phone"
            external
            class="a text-white fut-color-dynamic text-decoration-none d-block"
            target="_blank"
          >
            <font-awesome-icon class="me-2" :icon="['fas', 'phone']" />{{ $t('i18n_contato') }}
          </fut-button>
          <fut-button
            v-if="currentSettings && currentSettings.whats"
            :to="'https://wa.me/'+currentSettings.whats"
            external
            class="a text-white fut-color-dynamic text-decoration-none d-block"
            target="_blank"
          >
            <font-awesome-icon class="me-2" :icon="['fab', 'whatsapp']" />Whastapp
          </fut-button>
          <fut-button
            v-if="currentSettings && currentSettings.telegram"
            :to="'https://t.me/'+currentSettings.telegram"
            external
            class="a text-white fut-color-dynamic text-decoration-none d-block"
            target="_blank"
          >
            <font-awesome-icon class="me-2" :icon="['fab', 'telegram']" />Telegram
          </fut-button>
          <fut-button
            v-if="currentSettings && currentSettings.tiktok"
            :to="currentSettings.tiktok"
            external
            class="a text-white fut-color-dynamic text-decoration-none d-block"
            target="_blank"
          >
            <font-awesome-icon class="me-2" :icon="['fab', 'tiktok']" />TikTok
          </fut-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FutButton from '@/components/default/atoms/FutButton.vue'

export default {
  components: {
    FutButton
  },
  props: {
    currentSettings: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    checkAfiliates () {
      return process.env.PRODUCT_CONFIG_AFILIATES_URL
    },
    afiliatesLink () {
      return process.env.PRODUCT_CONFIG_AFILIATES_URL ? process.env.PRODUCT_CONFIG_AFILIATES_URL : '/affiliates'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/layout/variables";
@import "@/assets/layout/breakpoints";
.footer-menu {
  padding-top: 80px;
  padding-bottom: 80px;
  background: var(--fut-background-darkest);
  display: flex;
}
.content-container {
  max-width: 800px;
  width: 100%;
}
h3{
    // @include md {
    //   border-left: 4px solid var(--fut-primary);
    // }
    border-bottom: 4px solid var(--fut-primary);
    padding-left: 10px;
    padding-bottom: 5px;
    font-weight: bold;
    text-align: center;
}
.a{
    padding-left: 15px;
    line-height: 3rem;
}
</style>
