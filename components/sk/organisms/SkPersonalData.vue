<template>
  <div class="sk-personal-data">
    <sk-card>
      <div class="info">
        <h2>
          {{ $t('i18n_informacoes_pessoais') }}
        </h2>

        <div class="form">
          <sk-input
            v-model="userInfo.name"
            name="fullName"
            :label="$t('i18n_nome')"
            style="grid-area: name;"
            readonly
          />
          <sk-input
            v-model="userInfo.document"
            mask="999.999.999-99"
            name="cpf"
            label="CPF"
            style="grid-area: cpf;"
            readonly
          />
          <sk-input
            v-model="userInfo.birthdate"
            name="birthDate"
            :label="$t('i18n_data_de_nascimento')"
            type="date"
            style="grid-area: birthdate;"
            readonly
          />
          <sk-input
            v-model="userInfo.email"
            name="email"
            label="E-mail"
            style="grid-area: email;"
            readonly
          />
          <sk-input
            v-model="userInfo.phone"
            mask="(99) 9 9999-9999"
            name="phone"
            :label="$t('i18n_telefone')"
            style="grid-area: phone;"
          />
          <sk-input
            v-model="userInfo.username"
            name="userName"
            :label="$t('i18n_nome_de_usuario')"
            style="grid-area: username;"
          />
        </div>
      </div>

      <div class="submit-area">
        <button
          @click="$emit('submit', userInfo)"
        >
          <span>{{ $t('i18n_salvar') }}</span>
        </button>
      </div>
    </sk-card>
  </div>
</template>

<script>
import SkCard from '@/components/sk/atoms/SkCard.vue'

export default {
  name: 'SkPersonalData',
  components: {
    SkCard
  },
  props: {
    loggedInUser: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      userInfo: {
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
    this.userInfo.name = this.loggedInUser.name
    this.userInfo.username = this.loggedInUser.username
    this.userInfo.email = this.loggedInUser.email
    this.userInfo.phone = this.loggedInUser.phone
    this.userInfo.document = this.loggedInUser.player.document
    this.userInfo.birthdate = this.loggedInUser.player.birthdate
  }
}
</script>

<style lang="scss" scoped>
.sk-personal-data {
  padding: 1.5rem;
  background: var(--fut-background-darkest);
  border-radius: .5rem;
  color: var(--fut-color-dynamic);

  .info {
    padding: 1.5rem;
    color: var(--fut-color-dynamic);

    h2 {
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0;
      padding-bottom: 1.25rem;
      border-bottom: 1px solid var(--fut-background-lightest-2);
    }

    .form {
      display: grid;
      grid:
        "name name"
        "cpf birthdate"
        "email phone"
        "username ."
      ;
      margin-top: 1rem;
      gap: 1rem;
    }
  }

  .submit-area {
    border-top: 1px solid var(--fut-background-lightest-2);
    padding: 1rem;
    display: flex;
    justify-content: flex-end;

    button {
      display: flex;
      justify-content: center;
      border: none;
      background: var(--fut-primary);
      padding: 11.5px 20px;
      border-radius: .25rem;
      min-width: 12ch;
      box-shadow: 0rem .0625rem .1875rem #00000033 , 0rem .0625rem .125rem #0000001f;

      span {
        color: var(--fut-color-dynamic);
        font-size: .875rem;
        font-weight: 600;
      }

      &:hover {
        background: var(--fut-primary-darkest);
      }
      &:active {
        span {
          display: flex;
          transform: scale(.95);
        }
      }
    }
  }
}

@media (max-width: 821px) {
  .sk-personal-data {
    padding: .5rem;

    .info {
      padding: .5rem;
    }
  }
}
</style>
