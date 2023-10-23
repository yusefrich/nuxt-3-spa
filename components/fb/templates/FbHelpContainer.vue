<template>
  <div>
    <fb-fut-button
      class="btn btn-fb-help w-100 text-start d-print-none"
      :class="{active: currentSlug === 'rules' || initialSlug === 'rules', 'bg-secondary': currentSettings.font === 'dark'}"
      data-bs-toggle="collapse"
      data-bs-target="#rules"
      @click="()=>{fetchRules(); toggleSlug('rules')}"
    >
      {{ $t('i18n_regras_gerais') }}
    </fb-fut-button>
    <div id="rules" class="collapse mb-2" :class="{ show: initialSlug === 'rules' }">
      <div v-if="currentSlug === 'rules'">
        <spinner v-if="getLegalLoading" />
      </div>
      <h5 class="text-dark d-none d-print-block text-center fw-bold">{{ $t('i18n_regras_gerais') }}</h5>
      <fb-fut-button class="p-2 float-end d-print-none mt-3" primary @click="printPage()"><font-awesome-icon class="me-1" :icon="['fas', 'print']" />{{ $t('i18n_imprimir') }}</fb-fut-button>
      <fut-html-render :content="getLegalRules" />
    </div>
    <fb-fut-button
      class="btn btn-fb-help w-100 text-start d-print-none"
      :class="{active: currentSlug === 'deposits' || initialSlug === 'deposits', 'bg-secondary': currentSettings.font === 'dark'}"
      data-bs-toggle="collapse"
      data-bs-target="#deposits"
      @click="()=>{fetchDeposits(); toggleSlug('deposits')}"
    >
      {{ $t('i18n_depositos_e_saques') }}
    </fb-fut-button>
    <div id="deposits" class="collapse mb-2" :class="{ show: initialSlug === 'deposits' }">
      <div v-if="currentSlug === 'deposits'">
        <spinner v-if="getLegalLoading" />
      </div>
      <h5 class="text-dark d-none d-print-block text-center fw-bold">{{ $t('i18n_depositos_e_saques') }}</h5>
      <fb-fut-button class="p-2 float-end d-print-none mt-3" primary @click="printPage()"><font-awesome-icon class="me-1" :icon="['fas', 'print']" />{{ $t('i18n_imprimir') }}</fb-fut-button>
      <fut-html-render :content="getLegalDeposits" />
    </div>
    <fb-fut-button
      class="btn btn-fb-help w-100 text-start d-print-none"
      :class="{active: currentSlug === 'responsible' || initialSlug === 'responsible', 'bg-secondary': currentSettings.font === 'dark'}"
      data-bs-toggle="collapse"
      data-bs-target="#responsible"
      @click="()=>{fetchResponsible(); toggleSlug('responsible')}"
    >
      {{ $t('i18n_jogo_responsavel') }}
    </fb-fut-button>
    <div id="responsible" class="collapse mb-2" :class="{ show: initialSlug === 'responsible' }">
      <div v-if="currentSlug === 'responsible'">
        <spinner v-if="getLegalLoading" />
      </div>
      <h5 class="text-dark d-none d-print-block text-center fw-bold">{{ $t('i18n_jogo_responsavel') }}</h5>
      <fb-fut-button class="p-2 float-end d-print-none mt-3" primary @click="printPage()"><font-awesome-icon class="me-1" :icon="['fas', 'print']" />{{ $t('i18n_imprimir') }}</fb-fut-button>
      <fut-html-render :content="getLegalResponsible" />
    </div>
    <fb-fut-button
      class="btn btn-fb-help w-100 text-start d-print-none"
      :class="{active: currentSlug === 'suport' || initialSlug === 'suport', 'bg-secondary': currentSettings.font === 'dark'}"
      data-bs-toggle="collapse"
      data-bs-target="#suport"
      @click="()=>{fetchSuport(); toggleSlug('suport')}"
    >
      {{ $t('i18n_suporte') }}
    </fb-fut-button>
    <div id="suport" class="collapse mb-2" :class="{ show: initialSlug === 'suport' }">
      <div v-if="currentSlug === 'suport'">
        <spinner v-if="getLegalLoading" />
      </div>
      <h5 class="text-dark d-none d-print-block text-center fw-bold">{{ $t('i18n_suporte') }}</h5>
      <fb-fut-button class="p-2 float-end d-print-none mt-3" primary @click="printPage()"><font-awesome-icon class="me-1" :icon="['fas', 'print']" />{{ $t('i18n_imprimir') }}</fb-fut-button>
      <fut-html-render :content="getLegalSuport" />
    </div>
    <fb-fut-button
      class="btn btn-fb-help w-100 text-start d-print-none"
      :class="{active: currentSlug === 'terms' || initialSlug === 'terms', 'bg-secondary': currentSettings.font === 'dark'}"
      data-bs-toggle="collapse"
      data-bs-target="#terms"
      @click="()=>{fetchTerms(); toggleSlug('terms')}"
    >
      {{ $t('i18n_termos_e_condicoes') }}
    </fb-fut-button>
    <div id="terms" class="collapse mb-2" :class="{ show: initialSlug === 'terms' }">
      <div v-if="currentSlug === 'terms'">
        <spinner v-if="getLegalLoading" />
      </div>
      <h5 class="text-dark d-none d-print-block text-center fw-bold">{{ $t('i18n_termos_e_condicoes') }}</h5>
      <fb-fut-button class="p-2 float-end d-print-none mt-3" primary @click="printPage()"><font-awesome-icon class="me-1" :icon="['fas', 'print']" />{{ $t('i18n_imprimir') }}</fb-fut-button>
      <fut-html-render :content="getLegalTerms" />
    </div>
    <fb-fut-button
      class="btn btn-fb-help w-100 text-start d-print-none"
      :class="{active: currentSlug === 'privacy' || initialSlug === 'privacy', 'bg-secondary': currentSettings.font === 'dark'}"
      data-bs-toggle="collapse"
      data-bs-target="#privacy"
      @click="()=>{fetchPrivacy(); toggleSlug('privacy')}"
    >
      {{ $t('i18n_politica_de_privacidade') }}
    </fb-fut-button>
    <div id="privacy" class="collapse mb-2" :class="{ show: initialSlug === 'privacy' }">
      <div v-if="currentSlug === 'privacy'">
        <spinner v-if="getLegalLoading" />
      </div>
      <h5 class="text-dark d-none d-print-block text-center fw-bold">{{ $t('i18n_politica_de_privacidade') }}</h5>
      <fb-fut-button class="p-2 float-end d-print-none mt-3" primary @click="printPage()"><font-awesome-icon class="me-1" :icon="['fas', 'print']" />{{ $t('i18n_imprimir') }}</fb-fut-button>
      <fut-html-render :content="getLegalPrivacy" />
    </div>
    <fb-fut-button
      class="btn btn-fb-help w-100 text-start d-print-none"
      :class="{active: currentSlug === 'aml' || initialSlug === 'aml', 'bg-secondary': currentSettings.font === 'dark'}"
      data-bs-toggle="collapse"
      data-bs-target="#aml"
      @click="()=>{fetchAml(); toggleSlug('aml')}"
    >
      aml
    </fb-fut-button>
    <div id="aml" class="collapse mb-2" :class="{ show: initialSlug === 'aml' }">
      <div v-if="currentSlug === 'aml'">
        <spinner v-if="getLegalLoading" />
      </div>
      <h5 class="text-dark d-none d-print-block text-center fw-bold">aml</h5>
      <fb-fut-button class="p-2 float-end d-print-none mt-3" primary @click="printPage()"><font-awesome-icon class="me-1" :icon="['fas', 'print']" />{{ $t('i18n_imprimir') }}</fb-fut-button>
      <fut-html-render :content="getLegalAml" />
    </div>
    <fb-fut-button
      class="btn btn-fb-help w-100 text-start d-print-none"
      :class="{active: currentSlug === 'cookies' || initialSlug === 'cookies', 'bg-secondary': currentSettings.font === 'dark'}"
      data-bs-toggle="collapse"
      data-bs-target="#cookies"
      @click="()=>{fetchCookies(); toggleSlug('cookies')}"
    >
      {{ $t('i18n_politica_de_cookies') }}
    </fb-fut-button>
    <div id="cookies" class="collapse mb-2" :class="{ show: initialSlug === 'cookies' }">
      <div v-if="currentSlug === 'cookies'">
        <spinner v-if="getLegalLoading" />
      </div>
      <h5 class="text-dark d-none d-print-block text-center fw-bold">{{ $t('i18n_politica_de_cookies') }}</h5>
      <fb-fut-button class="p-2 float-end d-print-none mt-3" primary @click="printPage()"><font-awesome-icon class="me-1" :icon="['fas', 'print']" />{{ $t('i18n_imprimir') }}</fb-fut-button>
      <fut-html-render :content="getLegalCookies" />
    </div>
    <fb-fut-button
      class="btn btn-fb-help w-100 text-start d-print-none"
      :class="{active: currentSlug === 'faq' || initialSlug === 'faq', 'bg-secondary': currentSettings.font === 'dark'}"
      data-bs-toggle="collapse"
      data-bs-target="#faq"
      @click="()=>{fetchFaq(); toggleSlug('faq')}"
    >
      faq
    </fb-fut-button>
    <div id="faq" class="collapse mb-2" :class="{ show: initialSlug === 'faq' }">
      <div v-if="currentSlug === 'faq'">
        <spinner v-if="getLegalLoading" />
      </div>
      <h5 class="text-dark d-none d-print-block text-center fw-bold">faq</h5>
      <fb-fut-button class="p-2 float-end d-print-none mt-3" primary @click="printPage()"><font-awesome-icon class="me-1" :icon="['fas', 'print']" />{{ $t('i18n_imprimir') }}</fb-fut-button>
      <fut-html-render :content="getLegalFaq" />
    </div>
    <fb-fut-button
      class="btn btn-fb-help w-100 text-start d-print-none"
      :class="{active: currentSlug === 'about' || initialSlug === 'about', 'bg-secondary': currentSettings.font === 'dark'}"
      data-bs-toggle="collapse"
      data-bs-target="#about"
      @click="()=>{fetchAbout(); toggleSlug('about')}"
    >
      {{ $t('i18n_quem_somos') }}
    </fb-fut-button>
    <div id="about" class="collapse mb-2" :class="{ show: initialSlug === 'about' }">
      <div v-if="currentSlug === 'about'">
        <spinner v-if="getLegalLoading" />
      </div>
      <h5 class="text-dark d-none d-print-block text-center fw-bold">{{ $t('i18n_quem_somos') }}</h5>
      <fb-fut-button class="p-2 float-end d-print-none mt-3" primary @click="printPage()"><font-awesome-icon class="me-1" :icon="['fas', 'print']" />{{ $t('i18n_imprimir') }}</fb-fut-button>
      <fut-html-render :content="getLegalAbout" />
    </div>
    <fb-fut-button
      class="btn btn-fb-help w-100 text-start d-print-none"
      :class="{active: currentSlug === 'affiliates' || initialSlug === 'affiliates', 'bg-secondary': currentSettings.font === 'dark'}"
      data-bs-toggle="collapse"
      data-bs-target="#affiliates"
      @click="()=>{fetchAffiliates(); toggleSlug('affiliates')}"
    >
      {{ $t('i18n_afiliados') }}
    </fb-fut-button>
    <div id="affiliates" class="collapse mb-2" :class="{ show: initialSlug === 'affiliates' }">
      <div v-if="currentSlug === 'affiliates'">
        <spinner v-if="getLegalLoading" />
      </div>
      <h5 class="text-dark d-none d-print-block text-center fw-bold">{{ $t('i18n_afiliados') }}</h5>
      <fb-fut-button class="p-2 float-end d-print-none mt-3" primary @click="printPage()"><font-awesome-icon class="me-1" :icon="['fas', 'print']" />{{ $t('i18n_imprimir') }}</fb-fut-button>
      <fut-html-render :content="getLegalAffiliates" />
    </div>
    <!-- new -->
    <fb-fut-button
      class="btn btn-fb-help w-100 text-start d-print-none"
      :class="{active: currentSlug === 'auto_exclusion' || initialSlug === 'auto_exclusion', 'bg-secondary': currentSettings.font === 'dark'}"
      data-bs-toggle="collapse"
      data-bs-target="#auto_exclusion"
      @click="()=>{fetchLegalAutoExclusion(); toggleSlug('auto_exclusion')}"
    >
      {{ $t('i18n_auto_exclusion') }}
    </fb-fut-button>
    <div id="auto_exclusion" class="collapse mb-2" :class="{ show: initialSlug === 'auto_exclusion' }">
      <div v-if="currentSlug === 'auto_exclusion'">
        <spinner v-if="getLegalLoading" />
      </div>
      <h5 class="text-dark d-none d-print-block text-center fw-bold">{{ $t('i18n_auto_exclusion') }}</h5>
      <fb-fut-button class="p-2 float-end d-print-none mt-3" primary @click="printPage()"><font-awesome-icon class="me-1" :icon="['fas', 'print']" />{{ $t('i18n_imprimir') }}</fb-fut-button>
      <fut-html-render :content="getLegalAutoExclusion" />
    </div>
    <!-- new -->
    <fb-fut-button
      class="btn btn-fb-help w-100 text-start d-print-none"
      :class="{active: currentSlug === 'disputs_resolution' || initialSlug === 'disputs_resolution', 'bg-secondary': currentSettings.font === 'dark'}"
      data-bs-toggle="collapse"
      data-bs-target="#disputs_resolution"
      @click="()=>{fetchLegalDisputsResolution(); toggleSlug('disputs_resolution')}"
    >
      {{ $t('i18n_disputs_resolution') }}
    </fb-fut-button>
    <div id="disputs_resolution" class="collapse mb-2" :class="{ show: initialSlug === 'disputs_resolution' }">
      <div v-if="currentSlug === 'disputs_resolution'">
        <spinner v-if="getLegalLoading" />
      </div>
      <h5 class="text-dark d-none d-print-block text-center fw-bold">{{ $t('i18n_disputs_resolution') }}</h5>
      <fb-fut-button class="p-2 float-end d-print-none mt-3" primary @click="printPage()"><font-awesome-icon class="me-1" :icon="['fas', 'print']" />{{ $t('i18n_imprimir') }}</fb-fut-button>
      <fut-html-render :content="getLegalDisputsResolution" />
    </div>
    <!-- new -->
    <fb-fut-button
      class="btn btn-fb-help w-100 text-start d-print-none"
      :class="{active: currentSlug === 'method_impartiality' || initialSlug === 'method_impartiality', 'bg-secondary': currentSettings.font === 'dark'}"
      data-bs-toggle="collapse"
      data-bs-target="#method_impartiality"
      @click="()=>{fetchLegalMethodImpartiality(); toggleSlug('method_impartiality')}"
    >
      {{ $t('i18n_method_impartiality') }}
    </fb-fut-button>
    <div id="method_impartiality" class="collapse mb-2" :class="{ show: initialSlug === 'method_impartiality' }">
      <div v-if="currentSlug === 'method_impartiality'">
        <spinner v-if="getLegalLoading" />
      </div>
      <h5 class="text-dark d-none d-print-block text-center fw-bold">{{ $t('i18n_method_impartiality') }}</h5>
      <fb-fut-button class="p-2 float-end d-print-none mt-3" primary @click="printPage()"><font-awesome-icon class="me-1" :icon="['fas', 'print']" />{{ $t('i18n_imprimir') }}</fb-fut-button>
      <fut-html-render :content="getLegalMethodImpartiality" />
    </div>
    <!-- new -->
    <fb-fut-button
      class="btn btn-fb-help w-100 text-start d-print-none"
      :class="{active: currentSlug === 'kyc_politcs' || initialSlug === 'kyc_politcs', 'bg-secondary': currentSettings.font === 'dark'}"
      data-bs-toggle="collapse"
      data-bs-target="#kyc_politcs"
      @click="()=>{fetchLegalKycPolitcs(); toggleSlug('kyc_politcs')}"
    >
      {{ $t('i18n_kyc_politcs') }}
    </fb-fut-button>
    <div id="kyc_politcs" class="collapse mb-2" :class="{ show: initialSlug === 'kyc_politcs' }">
      <div v-if="currentSlug === 'kyc_politcs'">
        <spinner v-if="getLegalLoading" />
      </div>
      <h5 class="text-dark d-none d-print-block text-center fw-bold">{{ $t('i18n_kyc_politcs') }}</h5>
      <fb-fut-button class="p-2 float-end d-print-none mt-3" primary @click="printPage()"><font-awesome-icon class="me-1" :icon="['fas', 'print']" />{{ $t('i18n_imprimir') }}</fb-fut-button>
      <fut-html-render :content="getLegalKycPolitcs" />
    </div>
    <!-- new -->
    <fb-fut-button
      class="btn btn-fb-help w-100 text-start d-print-none"
      :class="{active: currentSlug === 'accounts_payments_bonus' || initialSlug === 'accounts_payments_bonus', 'bg-secondary': currentSettings.font === 'dark'}"
      data-bs-toggle="collapse"
      data-bs-target="#accounts_payments_bonus"
      @click="()=>{fetchLegalAccountsPaymentsBonus(); toggleSlug('accounts_payments_bonus')}"
    >
      {{ $t('i18n_accounts_payments_bonus') }}
    </fb-fut-button>
    <div id="accounts_payments_bonus" class="collapse mb-2" :class="{ show: initialSlug === 'accounts_payments_bonus' }">
      <div v-if="currentSlug === 'accounts_payments_bonus'">
        <spinner v-if="getLegalLoading" />
      </div>
      <h5 class="text-dark d-none d-print-block text-center fw-bold">{{ $t('i18n_accounts_payments_bonus') }}</h5>
      <fb-fut-button class="p-2 float-end d-print-none mt-3" primary @click="printPage()"><font-awesome-icon class="me-1" :icon="['fas', 'print']" />{{ $t('i18n_imprimir') }}</fb-fut-button>
      <fut-html-render :content="getLegalAccountsPaymentsBonus" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useLegalStore } from '@/stores/legal'
import { useSettingsStore } from '@/stores/settings'

import FutHtmlRender from '@/components/default/atoms/FutHtmlRender'
import FbFutButton from '@/components/fb/atoms/FbFutButton'
import Spinner from '@/components/default/atoms/Spinner'

export default {
  components: {
    FutHtmlRender,
    FbFutButton,
    Spinner
  },
  data () {
    return {
      currentSlug: null,
      initialSlug: null
    }
  },
  computed: {
    ...mapState(useSettingsStore, {
      currentSettings: 'currentSettings'
    }),
    ...mapState(useLegalStore, {
      getLegalLoading: 'getLegalLoading',
      getLegalRules: 'getLegalRules',
      getLegalDeposits: 'getLegalDeposits',
      getLegalResponsible: 'getLegalResponsible',
      getLegalSuport: 'getLegalSuport',
      getLegalTerms: 'getLegalTerms',
      getLegalPrivacy: 'getLegalPrivacy',
      getLegalAml: 'getLegalAml',
      getLegalCookies: 'getLegalCookies',
      getLegalFaq: 'getLegalFaq',
      getLegalAbout: 'getLegalAbout',
      getLegalAffiliates: 'getLegalAffiliates',
      getLegalAutoExclusion: 'getLegalAutoExclusion',
      getLegalDisputsResolution: 'getLegalDisputsResolution',
      getLegalMethodImpartiality: 'getLegalMethodImpartiality',
      getLegalKycPolitcs: 'getLegalKycPolitcs',
      getLegalAccountsPaymentsBonus: 'getLegalAccountsPaymentsBonus'
    })
  },
  mounted () {
    if (this.$route.query.slug) {
      this.initialSlug = this.$route.query.slug
      switch (this.$route.query.slug) {
        case 'rules':
          this.fetchLegalRules()
          break
        case 'deposits':
          this.fetchLegalDeposits()
          break
        case 'responsible':
          this.fetchLegalResponsible()
          break
        case 'suport':
          this.fetchLegalSuport()
          break
        case 'terms':
          this.fetchLegalTerms()
          break
        case 'privacy':
          this.fetchLegalPrivacy()
          break
        case 'aml':
          this.fetchLegalAml()
          break
        case 'cookies':
          this.fetchLegalCookies()
          break
        case 'faq':
          this.fetchLegalFaq()
          break
        case 'about':
          this.fetchLegalAbout()
          break
        case 'affiliates':
          this.fetchLegalAffiliates()
          break
        case 'auto_exclusion':
          this.fetchLegalAutoExclusion()
          break
        case 'disputs_resolution':
          this.fetchLegalDisputsResolution()
          break
        case 'method_impartiality':
          this.fetchLegalMethodImpartiality()
          break
        case 'kyc_politcs':
          this.fetchLegalKycPolitcs()
          break
        case 'accounts_payments_bonus':
          this.fetchLegalAccountsPaymentsBonus()
          break
        default:
          break
      }
    }
  },
  methods: {
    ...mapActions(useLegalStore, {
      fetchLegalRules: 'fetchLegalRules',
      fetchLegalDeposits: 'fetchLegalDeposits',
      fetchLegalResponsible: 'fetchLegalResponsible',
      fetchLegalSuport: 'fetchLegalSuport',
      fetchLegalTerms: 'fetchLegalTerms',
      fetchLegalPrivacy: 'fetchLegalPrivacy',
      fetchLegalAml: 'fetchLegalAml',
      fetchLegalCookies: 'fetchLegalCookies',
      fetchLegalFaq: 'fetchLegalFaq',
      fetchLegalAbout: 'fetchLegalAbout',
      fetchLegalAffiliates: 'fetchLegalAffiliates',
      fetchLegalAutoExclusion: 'fetchLegalAutoExclusion',
      fetchLegalDisputsResolution: 'fetchLegalDisputsResolution',
      fetchLegalMethodImpartiality: 'fetchLegalMethodImpartiality',
      fetchLegalKycPolitcs: 'fetchLegalKycPolitcs',
      fetchLegalAccountsPaymentsBonus: 'fetchLegalAccountsPaymentsBonus'
    }),
    printPage () {
      window.print()
    },
    toggleSlug (slug) {
      if (slug === this.currentSlug || slug === this.initialSlug) {
        this.currentSlug = null
        this.initialSlug = null
        return
      }
      this.initialSlug = null
      this.currentSlug = slug
    },
    fetchRules () {
      this.fetchLegalRules()
    },
    fetchDeposits () {
      this.fetchLegalDeposits()
    },
    fetchResponsible () {
      this.fetchLegalResponsible()
    },
    fetchSuport () {
      this.fetchLegalSuport()
    },
    fetchTerms () {
      this.fetchLegalTerms()
    },
    fetchPrivacy () {
      this.fetchLegalPrivacy()
    },
    fetchAml () {
      this.fetchLegalAml()
    },
    fetchCookies () {
      this.fetchLegalCookies()
    },
    fetchFaq () {
      this.fetchLegalFaq()
    },
    fetchAbout () {
      this.fetchLegalAbout()
    },
    fetchAffiliates () {
      this.fetchLegalAffiliates()
    }
  }
}
</script>

<style scoped lang="scss">
.btn-fb-help{
  background: var(--fut-background);
  color: white;
  padding: 15px 20px;
  margin-bottom: 10px;
  &:hover{
    color: var(--fut-background-black);
    background: linear-gradient(90deg, var(--fut-primary) 0%, var(--fut-secondary) 100%);
  }
  &.active{
    color: var(--fut-background-black);
    background: linear-gradient(90deg, var(--fut-primary) 0%, var(--fut-secondary) 100%);
  }
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
}
</style>
