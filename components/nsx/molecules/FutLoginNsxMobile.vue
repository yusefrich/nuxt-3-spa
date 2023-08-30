<template>
  <form @submit.prevent="$emit('logUser', data)">
    <p>
      <small>{{ $tc('i18n_ja_tem_conta', 1) }}</small>
    </p>
    <fut-input
      v-model="data.email"
      :nsx-input="true"
      class="mb-3 w-100"
      nsx-validation
      :placeholder="$t('i18n_usuario')"
      type="text"
    />
    <fut-input
      v-model="data.password"
      :nsx-input="true"
      class="mb-3 w-100"
      nsx-validation
      :placeholder="$t('i18n_senha')"
      type="password"
    />
    <nsx-fut-button type="submit" rounded class="no-break btn-nsx" :sm="true">
      {{ $t('i18n_entrar') }}
    </nsx-fut-button>
    <br>
    <nsx-fut-button type="button" rounded class="no-break text-white" :sm="true" @click="$emit('forgot')">
      {{ $t('i18n_esqueci_a_senha') }}
    </nsx-fut-button>
  </form>
</template>
<script>
import FutInput from '@/components/default/atoms/FutInput'
import NsxFutButton from '@/components/nsx/atoms/NsxFutButton'

export default {
  components: { FutInput, NsxFutButton },
  data () {
    return {
      data: {
        email: '',
        password: ''
      }
    }
  }
}
</script>
<style scoped lang="scss">
  .no-break{
    white-space: nowrap;
  }
  .btn-nsx{
    background: linear-gradient(#ff8800,#ff6600);
    font-size: 13.3px;
    color: white;
  }
</style>
