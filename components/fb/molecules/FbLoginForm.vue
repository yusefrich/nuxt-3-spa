<template>
  <form class="login-content py-3 bg-background container" @submit.prevent="$emit('logUser', data)">
    <div class="py-5">
      <div class="text-center pb-2">
        <h5 class="fw-bold my-2 mb-1 d-block text-white">
          {{ $t('i18n_entrar') }}
        </h5>
        <span class="my-2 text-white"><small>{{ $t('i18n_insira_seus_dados_para') }}</small></span>
      </div>
      <input
        v-model="data.email"
        class="w-100 input-control mb-3"
        type="text"
        :placeholder="$t('i18n_nome_do_usuario')"
      >
      <input
        v-model="data.password"
        class="w-100 input-control mb-4"
        type="password"
        :placeholder="$t('i18n_senha')"
      >
      <fb-fut-button
        class="button-login text-white"
        type="submit"
      >
        {{ $t('i18n_entrar').toUpperCase() }}
      </fb-fut-button>
      <div v-if="currentSettings" class="d-flex flex-column align-items-center mt-5">
        <fb-fut-button class="text-white-50" to="/login/novaSenha">
          {{ $t('i18n_esqueceu_a_sua_senha') }}
        </fb-fut-button>
        <span class="text-white-50 mt-3">{{ $t('i18n_novo_no_bet') }} {{ currentSettings.name }}? <fb-fut-button class="text-decoration-none" to="/register">{{ $t('i18n_registrar') }}</fb-fut-button></span>
      </div>
    </div>
  </form>
</template>
<script>
import FbFutButton from '@/components/fb/atoms/FbFutButton.vue'

export default {
  components: {
    FbFutButton
  },
  props: {
    currentSettings: {
      type: Object,
      default: () => (null)
    }
  },
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
<style lang="scss" scoped>
.input-control {
  background-color: transparent;
  border: none;
  padding: 10px 5px;
  border-bottom: 1px solid var(--fut-background-lightest);
  color: white;
  &::placeholder{
    color: rgba(255, 255, 255, 0.5);
  }
}
.button-login {
  background-image: linear-gradient(to right, var(--fut-primary), var(--fut-secondary));
  border: none;
  width: 100%;
  height: 40px;
  color: var(--fut-background-darker);
}
</style>
