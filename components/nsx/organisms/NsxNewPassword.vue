<template>
  <div class="row">
    <div class="col-12 mt-3">
      <h5>
        {{ $t('i18n_alterar_senha') }} {{ errors }}
      </h5>
    </div>
    <div class="col-12">
      <div class="register-container ps-3">
        <label><span class="required" />{{ $t('i18n_senha_atual') }}</label>
        <fut-input
          v-model="data.old_password"
          :validate="errors?errors:{}"
          :nsx-input="true"
          type="password"
          nsx-validation
          name="old_password"
          class="mx-0 mb-2"
        />
        <label><span class="required" />{{ $t('i18n_nova_atual') }}</label>
        <fut-input
          id="password"
          v-model="data.password"
          :validate="errors?errors:{}"
          :nsx-input="true"
          type="password"
          name="password"
          nsx-validation
          class="mx-0 mb-2"
        />
        <label><span class="required" />{{ $t('i18n_confirme_a_senha') }}</label>
        <fut-input
          id="password_confirmation"
          v-model="data.password_confirmation"
          :validate="errors?errors:(data.password !== '' && data.password !== data.password_confirmation)?{password_confirmation: ['As senhas devem ser iguais']}:{}"
          :nsx-input="true"
          type="password"
          nsx-validation
          name="password_confirmation"
          class="mx-0 mb-2"
        />
        <br>
        <div class="text-end">
          <nsx-fut-button
            class="no-break mt-3 text-center mb-5 nsx-button"
            :disabled="data.password !== data.password_confirmation"
            @click="$emit('updatePassword', data), cleanPassword()"
          >
            {{ $t('i18n_salvar_dados') }}
          </nsx-fut-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FutInput from '@/components/default/atoms/FutInput.vue'
import NsxFutButton from '@/components/nsx/atoms/NsxFutButton.vue'

export default {
  name: 'NsxNewPassword',
  components: {
    FutInput,
    NsxFutButton
  },
  props: {
    errors: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      data: {
        old_password: '',
        password: '',
        password_confirmation: ''
      }
    }
  },
  mounted () {
    this.$emit('clear')
  },
  methods: {
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
  .register-container{
    max-width: 400px;
  }
  .no-break{
    white-space: nowrap;
  }
  .required{
    width: 8px !important;
    position: absolute;
    height: 8px !important;
    border-radius: 8px;
    margin-right: 30px;
    left: -17px;
    top: 8px;
  }
  label{
    position: relative;
    font-size: 13.3px;
  }
  .nsx-button{
    color: white;
    font-size: .875rem;
    line-height: 1.5;
    border-radius: 0.2rem !important;
    background: linear-gradient(#ff8800,#ff6600);
    padding: 0.25rem 0.5rem;
  }
  .nsx-button:hover{
    box-shadow: 0 0 3px 3px #ff8800 !important;
  }
</style>
