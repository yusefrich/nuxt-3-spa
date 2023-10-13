<template>
  <div class="container">
    <div class="row">
      <div class="col-6 d-flex flex-column fut-color-dynamic">
        <label for="currentPassword">{{ $t('i18n_senha_atual') }}</label>
        <div class="position-relative">
          <input
            id="currentPassword"
            v-model="data.old_password"
            class="fut-color-dynamic"
            :type="passwordType"
          >
          <button
            class="border-0 bg-transparent password-eye-button"
            type="button"
            @click="showPassword()"
          >
            <fa
              v-if="passwordType === 'text'"
              class="text-white fut-color-dynamic"
              :icon="['fas', 'eye']"
            />
            <fa
              v-else
              class="text-white fut-color-dynamic"
              :icon="['fas', 'eye-slash']"
            />
          </button>
        </div>
        <error-badge name="old_password" :validate="$attrs['error']?$attrs['error']:{}" />
      </div>
    </div>
    <div class="row">
      <div class="col d-flex flex-column fut-color-dynamic">
        <label for="newPassword">{{ $t('i18n_nova_senha') }}</label>
        <div class="position-relative">
          <input
            id="newPassword"
            v-model="data.password"
            class="fut-color-dynamic"
            :type="passwordType"
          >
          <button
            class="border-0 bg-transparent password-eye-button fut-color-dynamic"
            type="button"
            @click="showPassword()"
          >
            <fa
              v-if="passwordType === 'text'"
              class="text-white fut-color-dynamic"
              :icon="['fas', 'eye']"
            />
            <fa
              v-else
              class="text-white fut-color-dynamic"
              :icon="['fas', 'eye-slash']"
            />
          </button>
        </div>
        <div class="password-checklist text-white fut-color-dynamic">
          <p
            :class="[
              'mb-0',
              `${(checkIfPasswordHas('uppercase', data.password) || checkIfPasswordHas('lowercase', data.password)) && checkIfPasswordHas('numbers', data.password) ? 'text-success' : 'text-danger'}`
            ]"
          >
            <small><fa :icon="['far', 'check-circle']" /> {{ $t('i18n_letras_e_numeros') }}.</small>
          </p>
          <p :class="['mb-0', `${checkIfPasswordHas('length', data.password) ? 'text-success' : 'text-danger'}`]">
            <small><fa :icon="['far', 'check-circle']" /> 8 {{ $t('i18n_digitos') }}.</small>
          </p>
        </div>
        <error-badge name="password" :validate="$attrs['error']?$attrs['error']:{}" />
      </div>
      <div class="col d-flex flex-column fut-color-dynamic">
        <label for="repeatNewPassword">{{ $t('i18n_repita_nova_senha') }}</label>
        <div class="position-relative">
          <input
            id="repeatNewPassword"
            v-model="data.password_confirmation"
            class="fut-color-dynamic"
            :type="passwordType"
          >
          <button
            class="border-0 bg-transparent password-eye-button"
            type="button"
            @click="showPassword()"
          >
            <fa
              v-if="passwordType === 'text'"
              class="text-white fut-color-dynamic"
              :icon="['fas', 'eye']"
            />
            <fa
              v-else
              class="text-white fut-color-dynamic"
              :icon="['fas', 'eye-slash']"
            />
          </button>
        </div>
        <error-badge name="password_confirmation" :validate="$attrs['error']?$attrs['error']:{}" />
      </div>
    </div>
    <div class="row">
      <div class="col d-flex flex-row-reverse">
        <fb-fut-button
          :loading="$attrs['load']"
          type="button"
          class="btn btn-primary text-white fut-color-dynamic"
          @click="$emit('updatePassword', data), cleanPassword()"
        >
          {{ $t('i18n_atualizar_senha').toUpperCase() }}
        </fb-fut-button>
      </div>
    </div>
  </div>
</template>

<script>
import ErrorBadge from '@/components/default/atoms/ErrorBadge.vue'
import FbFutButton from '@/components/fb/atoms/FbFutButton.vue'

export default {
  name: 'FbPasswordData',
  components: {
    ErrorBadge,
    FbFutButton
  },
  data () {
    return {
      data: {
        old_password: '',
        password: '',
        password_confirmation: ''
      },
      passwordType: 'password'
    }
  },
  methods: {
    showPassword () {
      this.passwordType === 'password' ? this.passwordType = 'text' : this.passwordType = 'password'
    },
    checkIfPasswordHas (data, string) {
      let checkPassword = false
      switch (data) {
        case 'numbers': {
          checkPassword = /[0-9]/.test(string)
          break
        }
        case 'uppercase': {
          checkPassword = /[A-Z]/.test(string)
          break
        }
        case 'lowercase': {
          checkPassword = /[a-z]/.test(string)
          break
        }
        case 'simbol': {
          checkPassword = /[!@#$%^&*()_+\-=[\]{};':\\|,.<>/?]/.test(string)
          break
        }
        case 'length': {
          checkPassword = string.length >= 8
          break
        }
        default:
          break
      }
      return checkPassword
    },
    cleanPassword () {
      this.data = {
        old_password: '',
        password: '',
        password_confirmation: ''
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/layout/breakpoints";

.row {
  margin-top: 25px !important;
  margin-bottom: 25px !important;
}
label {
  font-size: 14px;
}
input {
  background-color: transparent;
  border: none;
  color: white;
  font-size: 16px;
  padding: 7px;
  border-radius: 5px;
  width: 100%;
  &:disabled{
    color: var(--fut-background-white);
  }
  @include md {
    width: 100%;
    background-color: var(--fut-background);
  }
  &::placeholder {
    color: white;
    font-weight: bold;
    @include md {
      color: gray;
      font-weight: normal;
    }
  }
}
.password-eye-button{
  position: absolute;
  right: 3px;
  top: 7px;
}
.btn {
  box-shadow: none;
  outline: none;
  font-size: 11px;
  padding: 6px 12px;
}
</style>
