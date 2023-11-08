<template>
  <form class="w-md-50 w-100 me-2" action="">
    <div class="container form-content p-3">
      <div class="d-flex align-items-center">
        <img src="/Sg/profileSquare.png" alt="">
        <span class="ms-2 text-white">Dados Pessoais</span>
      </div>
      <div class="d-grid mt-2">
        <label class="ms-2 fw-bold text-muted" for="fullName">Nome</label>
        <input id="fullName" v-model="data.name" class="p-1" :placeholder="$t('i18n_nome')" disabled>
      </div>
      <div class="d-flex mt-2">
        <div class="d-grid w-100 me-2">
          <label class="ms-2 fw-bold text-muted" for="cpf">CPF</label>
          <input id="cpf" v-model="data.document" class="p-1" placeholder="000.000.000-00" disabled>
        </div>
        <div class="d-grid w-100 ms-2">
          <label class="ms-2 fw-bold text-muted" for="birthDate">{{ $t('i18n_data_de_nascimento') }}</label>
          <input id="birthDate" v-model="data.birthdate" class="p-1" placeholder="00/00/00" disabled>
        </div>
      </div>
      <div class="d-flex mt-2">
        <div class="d-grid w-100 me-2">
          <label class="ms-2 fw-bold text-muted" for="email">Email</label>
          <input
            id="email"
            v-model="data.email"
            class="p-1"
            placeholder="userName@email.com"
            type="text"
            disabled
          >
        </div>
        <div class="d-grid w-100 ms-2">
          <label class="ms-2 fw-bold text-muted" for="">{{ $t('i18n_telefone') }}</label>
          <input
            id="phone"
            v-model="data.phone"
            v-mask="['(##) #####-####']"
            class="p-1"
            placeholder="(xx) x xxxx-xxxx"
            type="text"
          >
        </div>
      </div>
      <button class="w-100 mt-3 btn-refresh py-2" type="button" @click="$emit('update', data)">
        <img src="/Sg/refresh-svgrepo-com.png" alt="">
        <span>{{ $t('i18n_atualizar_dados') }}</span>
      </button>
      <div class="d-flex mt-2">
        <div class="d-grid w-33 me-2">
          <label class="ms-2 fw-bold text-muted" for="">{{ $t('i18n_senha_atual') }}</label>
          <input v-model="passwordData.old_password" class="p-1" type="password" :placeholder="$t('i18n_digite_a_sua_senha')">
        </div>
        <div class="d-grid w-33 mx-1">
          <label class="ms-2 fw-bold text-muted" for="">{{ $t('i18n_nova_senha') }}</label>
          <input id="password" v-model="passwordData.password" class="p-1" type="password">
        </div>
        <div class="d-grid w-33 ms-2">
          <label class="ms-2 fw-bold text-muted" for="">{{ $t('i18n_confirme_a_senha') }}</label>
          <input id="password_confirmation" v-model="passwordData.password_confirmation" class="p-1" type="password">
        </div>
      </div>
      <button
        class="w-100 mt-3 btn-refresh py-2"
        type="button"
        @click="$emit('updatePassword', passwordData), cleanPassword()"
      >
        <img src="/Sg/refresh-svgrepo-com.png" alt="">
        <span>{{ $t('i18n_atualizar_senha') }}</span>
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'SgPersonalData',
  props: {
    user: {
      type: Object,
      default: () => ({})
    }
  },
  emits: [
    'update',
    'updatePassword'
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
      },
      passwordData: {
        old_password: '',
        password: '',
        password_confirmation: ''
      }
    }
  },
  mounted () {
    this.data.name = this.user.name
    this.data.document = this.user.player.document
    this.data.birthdate = this.user.player.birthdate
    this.data.email = this.user.email
    this.data.phone = this.user.phone
    this.data.username = this.user.username
  },
  methods: {
    cleanPassword () {
      this.passwordData = {
        old_password: '',
        password: '',
        password_confirmation: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.form-content {
  border-radius: 10px;
  border: 3px solid var(--fut-background-darkest);
}
.select-control {
  background-color: var(--fut-background-darkest);
  border: 2px solid var(--fut-background-lightest);
  border-radius: 5px;
  width: 100%;
  outline: none;
  color: rgba(255, 255, 255, 0.353);
}
.btn-refresh {
  border-radius: 5px;
  border: none;
  font-weight: bold;
  background: linear-gradient(var(--fut-primary), var(--fut-secondary));
  font-size: 14px;
}
input {
  background-color: var(--fut-background-darkest);
  border: 2px solid var(--fut-background-lightest);
  border-radius: 5px;
  width: 100%;
  outline: none;
  color: white;
  &:disabled {
    color: #999999;
  }
}
</style>
