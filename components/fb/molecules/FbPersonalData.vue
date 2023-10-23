<template>
  <div class="container">
    <div class="row">
      <div class="col d-flex flex-column fut-color-dynamic">
        <label for="fullName">{{ $t('i18n_nome') }}</label>
        <input class="fut-color-dynamic-gray" id="fullName" v-model="data.name" disabled type="text">
      </div>
    </div>
    <div class="row">
      <div class="col d-flex flex-column fut-color-dynamic">
        <label for="cpf">CPF</label>
        <input class="fut-color-dynamic-gray" id="cpf" v-model="data.document" type="text" disabled>
      </div>
      <div class="col d-flex flex-column fut-color-dynamic">
        <label for="birthDate">{{ $t('i18n_data_de_nascimento') }}</label>
        <input class="fut-color-dynamic-gray" id="birthDate" v-model="data.birthdate" disabled type="date">
      </div>
    </div>
    <div class="row">
      <div class="col d-flex flex-column fut-color-dynamic">
        <label for="email">Email</label>
        <input class="fut-color-dynamic-gray" id="email" v-model="data.email" type="text" disabled>
      </div>
      <div class="col d-flex flex-column fut-color-dynamic">
        <label for="phone">{{ $t('i18n_telefone') }}</label>
        <input
          id="phone"
          class="fut-color-dynamic"
          v-model="data.phone"
          v-mask="['(##) #####-####']"
          placeholder="(xx) x xxxx-xxxx"
          type="text"
        >
      </div>
    </div>
    <div class="row">
      <div class="col-6 d-flex flex-column fut-color-dynamic">
        <label for="userName">{{ $t('i18n_nome_de_usuario') }}</label>
        <input class="fut-color-dynamic-gray" id="userName" v-model="data.username" disabled type="text">
      </div>
    </div>
    <div class="row">
      <div class="col d-flex flex-row-reverse">
        <fb-fut-button
          :loading="$attrs['load']"
          type="button"
          class="btn btn-primary text-white fut-color-dynamic"
          @click="$emit('updateData', data)"
        >
          {{ $t('i18n_salvar_alteracoes').toUpperCase() }}
        </fb-fut-button>
      </div>
    </div>
  </div>
</template>

<script>
import FbFutButton from '@/components/fb/atoms/FbFutButton.vue'

export default {
  name: 'FbPersonalData',
  components: {
    FbFutButton
  },
  emits: [
    'updateData'
  ],
  data () {
    return {
      data: {
        name: '',
        document: '',
        birthdate: '',
        email: '',
        phone: '',
        username: ''
      }
    }
  },
  mounted () {
    this.data.name = this.$attrs['logged-in-user'].name
    this.data.username = this.$attrs['logged-in-user'].username
    this.data.email = this.$attrs['logged-in-user'].email
    this.data.phone = this.$attrs['logged-in-user'].phone
    this.data.document = this.$attrs['logged-in-user'].player.document
    this.data.birthdate = this.$attrs['logged-in-user'].player.birthdate
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
#birthDate::-webkit-calendar-picker-indicator {
  filter: invert(1);
  opacity: .5;
}
.btn {
  box-shadow: none;
  outline: none;
  font-size: 11px;
  padding: 6px 12px;
}
</style>
