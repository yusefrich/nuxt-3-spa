<template>
  <div class="container-sm text-start">
    <div class="d-flex">
      <nsx-fut-button class="nsx-button me-2 nowrap" :class="{active: currentMenu === 0}" @click="currentMenu=0">
        {{ $t('i18n_pendentes') }}
      </nsx-fut-button>
      <nsx-fut-button class="nsx-button me-2 nowrap" :class="{active: currentMenu === 1}" @click="currentMenu=1">
        {{ $t('i18n_resolvidas') }}
      </nsx-fut-button>
    </div>
    <nsx-filter-dynamic class="mb-4 mt-3" @changeFilter="(payload)=>{$emit('fetchUserBets', payload);filters=payload}" />
    <h5 v-if="currentMenu === 0">
      {{ $t('i18n_pendentes') }}
    </h5>
    <h5 v-if="currentMenu === 1">
      {{ $t('i18n_resolvidas') }}
    </h5>
    <nsx-bets-list
      v-if="currentMenu === 0?pending.length > 0:done.length > 0"
      :bets="currentMenu === 0?pending:currentMenu === 1?done:[]"
    />
    <div v-else>
      <p class="text-center">
        {{ $t('i18n_nenhuma_aposta_foi_encontrada') }}
      </p>
    </div>
  </div>
</template>
<script>
import NsxBetsList from '@/components/nsx/molecules/NsxBetsList.vue'
import NsxFilterDynamic from '@/components/nsx/molecules/NsxFilterDynamic.vue'
import NsxFutButton from '@/components/nsx/atoms/NsxFutButton'

export default {
  components: {
    NsxBetsList,
    NsxFutButton,
    NsxFilterDynamic
  },
  props: {
    pending: {
      type: Array,
      default: () => ([])
    },
    done: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      currentMenu: 0,
      list: [],
      rawList: []
    }
  },
  mounted () {
    this.$emit('fetchUserBets', {})
    this.list = []
    this.rawList = []
    this.list = [...this.pending]
    this.rawList = [...this.pending]
  }
}
</script>
<style scoped lang="scss">
p{
  color: var(--nsx-dark-2);
  font-size: 13.3px;
}
.nsx-button{
  color: #fff;
  background: #6c757d;
  text-align: center;
  vertical-align: middle;
  border-radius: 0.2rem !important;
  padding: 2px 10px;
  font-size: 14px;
}
.nsx-button:hover{
  background: #5b646b;
}
.nsx-button.active{
  background: linear-gradient(#ff8800,#ff6600) !important;
}
</style>
