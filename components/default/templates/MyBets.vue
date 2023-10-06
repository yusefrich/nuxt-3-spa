<template>
  <div class="container-sm">
    <fut-button to="/" class="btn px-0">
      <p class="text-primary fw-bold">
        <font-awesome-icon class="me-3" :icon="['fas', 'long-arrow-alt-left']" />{{ $t('i18n_voltar') }}
      </p>
    </fut-button>
    <h2 class="fw-bold text-white mb-5 fut-color-dynamic">
      {{ $t('i18n_minhas_apostas') }}
    </h2>
    <fut-filter-dynamic
      class="mb-4"
      @changeFilter="(payload)=>{fetchUserBets(payload);filters=payload}"
    />
    <hr class="bg-white">
    <bets-group
      v-if="userBets"
      :bets="userBets.all"
      @submitCashout="payload => submitCashout(payload)"
    />
    <div class="text-center mb-2">
      <fut-button
        v-if="getHasMoreBets"
        primary
        @click="addUserBets(filters)"
      >
        {{ $t('i18n_mais') }}
      </fut-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useBaseStore } from '@/stores/base'

import FutButton from '@/components/default/atoms/FutButton'
import BetsGroup from '@/components/default/molecules/BetsGroup'
import FutFilterDynamic from '@/components/default/molecules/FutFilterDynamic'

export default {
  name: 'MyBets',
  components: {
    BetsGroup,
    FutFilterDynamic,
    FutButton
  },
  data () {
    return {
      filters: null
    }
  },
  computed: {
    ...mapState(useBaseStore, {
      userBets: 'userBets',
      getHasMoreBets: 'getHasMoreBets'
    })
  },
  created () {
    this.fetchUserBets()
  },
  methods: {
    ...mapActions(useBaseStore, {
      fetchUserBets: 'fetchUserBets',
      addUserBets: 'addUserBets'
    }),
    // ...mapActions({
    //   commitCashOut: 'onboarding-tickets/commitCashOut',
    // }),
    submitCashout (id) {
      this.commitCashOut(id).then(() => {
        location.reload()
      })
    }
  }
}
</script>
