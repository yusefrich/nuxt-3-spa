<template>
  <sg-modal v-model="showLogin" width="sm" close>
    <sg-logo :current-settings="currentSettings" />
    <h4 class="mb-0 text-center">
      {{ $t('i18n_vamos_jogar') }}
    </h4>
    <p class="text-center">
      {{ $t('i18n_insira_seus_dados_e_acesse') }}
    </p>
    <div class="px-4">
      <form @submit.prevent="$emit('submit', payload)">
        <div class="content-input mb-3 d-flex justify-content-center align-items-center">
          <img src="/Sg/Profile.png" alt="">
          <input v-model="payload.email" type="text" :placeholder="$t('i18n_nome_de_usuario_ou_email')">
        </div>
        <div class="content-input mb-3 d-flex justify-content-center align-items-center">
          <img src="/Sg/password-svgrepo-com.png" alt="">
          <input v-model="payload.password" type="password" :placeholder="$t('i18n_digite_a_sua_senha')">
        </div>
        <div class="container text-center">
          <button class="border-0 bg-transparent" type="button" @click="$emit('showPass')">
            <small class="mt-2 mb-3 text-white">{{ $t('i18n_esqueci_a_minha_senha') }}</small>
          </button>
        </div>
        <div class="d-flex my-3 justify-content-center align-items-center">
          <button class="btn-back-2 me-2" type="button" @click="$emit('showCad')">
            {{ $t('i18n_ainda_nao_tenho_conta') }}
          </button>
          <button class="btn-next" type="submit">
            {{ $t('i18n_entrar') }}
          </button>
        </div>
      </form>
    </div>
  </sg-modal>
</template>

<script>
import SgModal from '@/components/sg/atoms/SgModal.vue'
import SgLogo from '@/components/sg/atoms/SgLogo.vue'

export default {
  name: 'SgModalLogin',
  components: {
    SgModal,
    SgLogo
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    currentSettings: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      payload: {
        email: null,
        password: null
      }
    }
  },
  computed: {
    showLogin: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
h4 {
  font-size: 24px;
  color: white;
  margin-top: 31px;
  font-weight: bold;
}
p {
  font-size: 13px;
  color: white;
}
input {
  background-color: transparent;
  outline: none;
  border: none;
  color: white;
  margin-left: 10px;
  width: 81%;
}
.content-input {
  border: 2px solid var(--fut-background-lightest);
  border-radius: 5px;
  height: 50px;
}
.btn-back-2 {
  border: 2px solid var(--fut-secondary); //todo Trocar para primary
  color: var(--fut-secondary); //todo Trocar para primary
  background: transparent;
  font-weight: bold;
  font-size: 12px;
  text-transform: uppercase;
  border-radius: 5px;
  width: 180px;
  height: 39px;
}
.btn-next {
  border: none;
  background: linear-gradient(var(--fut-primary), var(--fut-secondary));
  font-weight: bold;
  text-transform: uppercase;
  border-radius: 5px;
  width: 160px;
  font-size: 12px;
  height: 39px;
}
</style>
