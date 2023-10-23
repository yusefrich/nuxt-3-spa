<template>
  <sg-modal v-model="showPass" width="sm">
    <sg-logo :current-settings="currentSettings" />
    <h4 class="mb-0 text-center">
      {{ $t('i18n_esqueceu_a_sua_senha') }}
    </h4>
    <p class="text-center">
      {{ $t('i18n_solicite_um_link_para') }}
    </p>
    <div class="px-4">
      <div class="content-input mb-3 d-flex justify-content-center align-items-center">
        <img src="/Sg/Profile.png" alt="">
        <input v-model="email" type="email" :placeholder="$t('i18n_digite_o_email_cadastrado')">
      </div>
      <error-badge name="email" :validate="errors" />
      <success-badge name="email" :validate="response" />
      <div class="d-flex my-3 justify-content-center align-items-center">
        <button class="btn-back me-2" @click="showPass = false">
          {{ $t('i18n_voltar') }}
        </button>
        <button :disabled="loading" class="btn-next" @click="()=>{$emit('submit', email)}">
          {{ $t('i18n_enviar_solicitacao') }}
        </button>
      </div>
    </div>
  </sg-modal>
</template>

<script>
import ErrorBadge from '@/components/default/atoms/ErrorBadge'
import SuccessBadge from '@/components/default/atoms/SuccessBadge'
import SgModal from '@/components/sg/atoms/SgModal'
import SgLogo from '@/components/sg/atoms/SgLogo'

export default {
  name: 'SgModalForgotPassword',
  components: {
    SgModal,
    ErrorBadge,
    SuccessBadge,
    SgLogo
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    response: {
      type: Object,
      default: null
    },
    errors: {
      type: Object,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    },
    currentSettings: {
      type: Object,
      default: () => ({})
    }
  },
  emits: [
    'submit',
    'update:modelValue'
  ],
  data () {
    return {
      email: '',
      sended: false
    }
  },
  computed: {
    showPass: {
      get () {
        return this.modelValue
      },
      set (value) {
        this.$emit('update:modelValue', value)
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
.btn-back {
  border: 2px solid var(--fut-secondary); //todo Trocar para primary
  color: var(--fut-secondary); //todo Trocar para primary
  background: transparent;
  font-weight: bold;
  font-size: 12px;
  text-transform: uppercase;
  border-radius: 5px;
  width: 120px;
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
  &:disabled {
    opacity: .5;
  }
}
</style>
