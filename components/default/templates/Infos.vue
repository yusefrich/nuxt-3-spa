<template>
  <div class="pt-5">
    <div v-if="!noPrint" class="container">
      <fut-button
        primary
        class="p-2 float-end d-print-none"
        @click="printPage()"
      >
        <font-awesome-icon class="me-1" :icon="['fas', 'print']" />{{ $t('i18n_imprimir') }}
      </fut-button>
    </div>
    <fut-html-render :content="getInfo" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useLegalStore } from '@/stores/legal'

import FutButton from '@/components/default/atoms/FutButton.vue'
import FutHtmlRender from '@/components/default/atoms/FutHtmlRender.vue'

export default {
  name: 'Infos',
  components: {
    FutButton,
    FutHtmlRender
  },
  props: {
    noPrint: {
      type: Boolean,
      default: false
    },
    page: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapState(useLegalStore, {
      getLegalAffiliates: 'getLegalAffiliates',
      getLegalAml: 'getLegalAml',
      getLegalAutoExclusion: 'getLegalAutoExclusion',
      getLegalCookies: 'getLegalCookies',
      getLegalDeposits: 'getLegalDeposits',
      getLegalFaq: 'getLegalFaq',
      getLegalMethodImpartiality: 'getLegalMethodImpartiality',
      getLegalResponsible: 'getLegalResponsible',
      getLegalKycPolitcs: 'getLegalKycPolitcs',
      getLegalAccountsPaymentsBonus: 'getLegalAccountsPaymentsBonus',
      getLegalPrivacy: 'getLegalPrivacy',
      getLegalRules: 'getLegalRules',
      getLegalDisputsResolution: 'getLegalDisputsResolution',
      getLegalAbout: 'getLegalAbout',
      getLegalSuport: 'getLegalSuport',
      getLegalTerms: 'getLegalTerms'
    }),
    getInfo () {
      switch (this.page) {
        case 'affiliates':
          return this.getLegalAffiliates
        case 'aml':
          return this.getLegalAml
        case 'auto-exclusao':
          return this.getLegalAutoExclusion
        case 'cookies':
          return this.getLegalCookies
        case 'depositos-e-saques':
          return this.getLegalDeposits
        case 'faq':
          return this.getLegalFaq
        case 'imparcialidade':
          return this.getLegalMethodImpartiality
        case 'jogo-responsavel':
          return this.getLegalResponsible
        case 'kyc':
          return this.getLegalKycPolitcs
        case 'pagamento-de-bonus':
          return this.getLegalAccountsPaymentsBonus
        case 'privacidade':
          return this.getLegalPrivacy
        case 'regras-gerais':
          return this.getLegalRules
        case 'resolucao-de-disputas':
          return this.getLegalDisputsResolution
        case 'sobre-nos':
          return this.getLegalAbout
        case 'suporte':
          return this.getLegalSuport
        case 'termos-e-condicoes':
          return this.getLegalTerms
        default:
          return ''
      }
    }
  },
  created () {
    switch (this.page) {
      case 'affiliates':
        this.fetchLegalAffiliates()
        break
      case 'aml':
        this.fetchLegalAml()
        break
      case 'auto-exclusao':
        this.fetchLegalAutoExclusion()
        break
      case 'cookies':
        this.fetchLegalCookies()
        break
      case 'depositos-e-saques':
        this.fetchLegalDeposits()
        break
      case 'faq':
        this.fetchLegalFaq()
        break
      case 'imparcialidade':
        this.fetchLegalMethodImpartiality()
        break
      case 'jogo-responsavel':
        this.fetchLegalResponsible()
        break
      case 'kyc':
        this.fetchLegalKycPolitcs()
        break
      case 'pagamento-de-bonus':
        this.fetchLegalAccountsPaymentsBonus()
        break
      case 'privacidade':
        this.fetchLegalPrivacy()
        break
      case 'regras-gerais':
        this.fetchLegalRules()
        break
      case 'resolucao-de-disputas':
        this.fetchLegalDisputsResolution()
        break
      case 'sobre-nos':
        this.fetchLegalAbout()
        break
      case 'suporte':
        this.fetchLegalSuport()
        break
      case 'termos-e-condicoes':
        this.fetchLegalTerms()
        break
    }
  },
  methods: {
    ...mapActions(useLegalStore, {
      fetchLegalAffiliates: 'fetchLegalAffiliates',
      fetchLegalAml: 'fetchLegalAml',
      fetchLegalAutoExclusion: 'fetchLegalAutoExclusion',
      fetchLegalCookies: 'fetchLegalCookies',
      fetchLegalDeposits: 'fetchLegalDeposits',
      fetchLegalFaq: 'fetchLegalFaq',
      fetchLegalMethodImpartiality: 'fetchLegalMethodImpartiality',
      fetchLegalResponsible: 'fetchLegalResponsible',
      fetchLegalKycPolitcs: 'fetchLegalKycPolitcs',
      fetchLegalAccountsPaymentsBonus: 'fetchLegalAccountsPaymentsBonus',
      fetchLegalPrivacy: 'fetchLegalPrivacy',
      fetchLegalRules: 'fetchLegalRules',
      fetchLegalDisputsResolution: 'fetchLegalDisputsResolution',
      fetchLegalAbout: 'fetchLegalAbout',
      fetchLegalSuport: 'fetchLegalSuport',
      fetchLegalTerms: 'fetchLegalTerms'
    }),
    printPage () {
      window.print()
    }
  }
}
</script>
