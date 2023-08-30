<template>
  <div class="text-start">
    <div class="overflow-auto">
      <div class="data-header d-flex w-100">
        <nsx-fut-button class="nsx-button me-2 nowrap active">
          {{ $t('i18n_historico') }}
        </nsx-fut-button>
      </div>
    </div>
    <h5 class="mt-3">
      {{ $t('i18n_historico') }}
    </h5>
    <div class="history-container">
      <span>{{ $t('i18n_nenhuma_mensagem_foi_encontrada') }}</span>
    </div>
  </div>
</template>
<script>
import NsxFutButton from '@/components/nsx/atoms/NsxFutButton'
export default {
  components: { NsxFutButton }
}
</script>

<style scoped lang="scss">
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
.history-container{
  background-color: #dbdbdb;
  color: #3a3a3a;
  margin-top: 0.3rem;
  border-radius: 5px;
  overflow: hidden;
  padding: 0.5rem;
  font-size: 13.3px;
}
</style>
