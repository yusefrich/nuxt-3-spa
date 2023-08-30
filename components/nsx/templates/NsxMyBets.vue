<template>
  <div class="d-block d-md-flex">
    <div class="row m-0 bets-content">
      <div class="col-12 px-0 min-height-nsx">
        <nav class="d-flex" style="background: var(--nsx-dark-2)">
          <div id="nav-tab" class="nav nav-tabs mx-2" role="tablist">
            <nsx-fut-button
              class="nav-link fut-color-dynamic"
              role="tab"
              aria-selected="true"
              disabled
            >
              {{ $t('i18n_encerrar_aposta') }}
            </nsx-fut-button>
            <nsx-fut-button
              class="nav-link fut-color-dynamic"
              :class="{active: list === userBets.live}"
              role="tab"
              aria-selected="true"
              @click="list = userBets.live; initial = false"
            >
              {{ $t('i18n_ao_vivo') }}
            </nsx-fut-button>
            <nsx-fut-button
              class="nav-link fut-color-dynamic"
              :class="{active: list === userBets.pending || initial}"
              role="tab"
              aria-selected="true"
              @click="list = userBets.pending; initial = false"
            >
              {{ $t('i18n_pendentes') }}
            </nsx-fut-button>
            <nsx-fut-button
              class="nav-link fut-color-dynamic"
              :class="{active: list === done}"
              role="tab"
              aria-selected="true"
              @click="list = done; initial = false"
            >
              {{ $t('i18n_resolvidas') }}
            </nsx-fut-button>
            <nsx-fut-button
              class="nav-link fut-color-dynamic"
              :class="{active: list === userBets.all}"
              role="tab"
              aria-selected="true"
              @click="list = userBets.all; initial = false"
            >
              {{ $t('i18n_todas') }}
            </nsx-fut-button>
          </div>
        </nav>
        <div v-if="list === userBets.all && list.length <= 0" class="p-2">
          <p class="fut-color-dynamic">
            - {{ $t('i18n_nao_ha_nenhuma_aposta') }}
          </p>
        </div>
        <div v-if="list === userBets.live && list.length <= 0" class="p-2">
          <p class="fut-color-dynamic">
            - {{ $t('i18n_nao_ha_nenhuma_aposta_ao_vivo') }}
          </p>
        </div>
        <div v-if="list === done && list.length <= 0" class="p-2">
          <p class="fut-color-dynamic">
            - {{ $t('i18n_nao_ha_nenhuma_aposta_resolvida') }}
          </p>
        </div>
        <div v-if="list === userBets.pending && list.length <= 0" class="p-2">
          <p class="fut-color-dynamic">
            - {{ $t('i18n_nao_ha_nenhuma_aposta_pendente') }}
          </p>
        </div>
        <nsx-bets-group
          v-if="list"
          :bets="list"
          :loading="getloading"
          @submitCashout="cashout($event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import NsxBetsGroup from '@/components/nsx/molecules/NsxBetsGroup.vue'
import NsxFutButton from '@/components/nsx/atoms/NsxFutButton.vue'

export default {
  name: 'NsxMyBets',
  components: {
    NsxBetsGroup,
    NsxFutButton
  },
  props: {
    done: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      list: [],
      initial: true
    }
  },
  computed: {
    ...mapGetters({
      currentSettings: 'settings/currentSettings',
      getloading: 'onboarding-tickets/getloading',
      userBets: 'userBets'
    })
  },
  created () {
    this.fetchUserBets()
  },
  mounted () {
    this.list = this.userBets.pending
  },
  methods: {
    ...mapActions({
      fetchUserBets: 'fetchUserBets',
      commitCashOut: 'onboarding-tickets/commitCashOut'
    }),
    cashout (id) {
      this.commitCashOut(id).then(() => {
        location.reload()
      })
    }
  }
}
</script>

<style scoped lang="scss">
.bets-tickets{
  width: 250px;
}
.bets-content{
  width: 100%;
  &::-webkit-scrollbar-track {
    opacity: .3;
    border-radius: 0.125rem;
    background-color: var(--nsx-dark-7);
  }
  &::-webkit-scrollbar {
    opacity: .3;
    width: 13px;
  }
  &::-webkit-scrollbar-thumb {
    border: solid 2px var(--nsx-dark-7);
    opacity: .3;
    border-radius:50px;
    width: 5px;
    background-color: var(--nsx-dark-6);
  }
}
.bg-leagues{
  background-color: var(--nsx-dark-2);
}
.text-nav{
  color: var(--nsx-gray-0);
}
.nav-link{
  color: var(--nsx-gray-0);
  border: none;
  font-size: 13.3px;
  padding: .35rem .5rem;
  border-bottom: 3px solid transparent !important;
}
.nav-link:hover{
  color: #dbdbdb;
  opacity: 1;
  border: none;
  border-radius: 0;
}
.nav-tabs .nav-link.active, .nav-tabs .nav-item.show .nav-link{
  color: #dbdbdb;
  background-color: transparent;
  border: none;
  border-radius: 0;
  border-bottom: 3px solid #ffa500 !important;
  font-weight: 500;
}
.nav-tabs{
  border-bottom: none !important;
}
.bg-gray{
  background: #838383;
  span{
    color: #dbdbdb;
  }
}
.min-height-nsx{
  min-height: calc(100vh - 50px);
}
</style>
