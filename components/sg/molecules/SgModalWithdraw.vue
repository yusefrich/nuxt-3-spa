<template>
  <sg-modal v-model="showModal" close>
    <sg-logo :current-settings="currentSettings" />
    <div class="container">
      <h4 class="mb-0 text-center">
        {{ $t('i18n_confirme_os_dados_do_saque').toUpperCase() }}
      </h4>
      <div class="container">
        <div class="d-flex align-items-center mt-4 mb-3">
          <img class="profile-pic me-2" src="/Sg/Profile-placeholder.png" alt="">
          <span class="text-white fw-bold">{{ $t('i18n_nome_do_usuario') }}</span>
        </div>
        <div class="d-grid">
          <label class="fw-bold text-muted mb-2 ms-3">
            {{ $t('i18n_valor_solicitado').toUpperCase() }}
          </label>
          <div class="input-content w-100 py-2 mb-3 d-flex align-items-center px-3">
            <span class="text-white fw-bold">R$</span>
            <input type="text" placeholder="250">
          </div>
        </div>
        <div class="d-grid">
          <label class="fw-bold text-muted mb-2 ms-3">
            {{ $t('i18n_chave_pix').toUpperCase() }} - CPF
          </label>
          <div class="input-content w-100 mb-5 py-2 d-flex align-items-center px-3">
            <img src="/Sg/SquareProfile.png" alt="">
            <input type="text" placeholder="000.000.000-00">
          </div>
        </div>
      </div>
    </div>
    <div class="px-4">
      <button class="btn-back me-2 w-100" @click="$emit('confirm')">
        {{ $t('i18n_confirmar_solicitacao') }}
      </button>
    </div>
  </sg-modal>
</template>

<script>
import SgModal from '@/components/sg/atoms/SgModal.vue'
import SgLogo from '@/components/sg/atoms/SgLogo.vue'

export default {
  name: 'SgModalWithdraw',
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
  computed: {
    showModal: {
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
@import "@/assets/layout/breakpoints";

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
.profile-pic {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  border: 2px solid var(--fut-primary);
}
.input-content {
  background-color: var(--fut-background-darkest);
  border-radius: 50px;
  border: 2px solid var(--fut-background-lightest);
  width: 100%;
  @include md {
    width: 254px;
  }

  input {
    background-color: transparent;
    border: none;
    outline: none;
    width: auto;
    color: white;
  }
}
.btn-back {
  height: 45px;
  font-weight: bold;
  background: linear-gradient(var(--fut-primary), var(--fut-secondary));
  border: none;
  border-radius: 5px;
}

</style>
