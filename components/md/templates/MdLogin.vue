<template>
  <div class="login-bg">
    <section>
      <div class="login-banner" />
      <div class="login-form px-4 pt-5">
        <n-link :to="localePath('/')">
          <img class="sidebar-logo mb-3" :src="currentSettings.logo" alt="Logo">
        </n-link>
        <h5 class="text-muted fw-normal mb-4">
          {{ $t('i18n_bem_vindo_de_volta') }}
        </h5>
        <form>
          <div class="mb-3">
            <label for="userName" class="form-label">Email</label>
            <input
              id="userName"
              v-model="infos.email"
              type="text"
              class="form-control"
              placeholder="Username ou e-mail"
            >
          </div>
          <div class="mb-3">
            <label for="userPassword" class="form-label">{{ $t('i18n_senha') }}</label>
            <input
              id="userPassword"
              v-model="infos.password"
              type="password"
              class="form-control"
              autocomplete="current-password"
              :placeholder="$t('i18n_senha')"
            >
          </div>
          <div class="form-check mb-3">
            <input id="authCheck" type="checkbox" class="form-check-input">
            <label class="form-check-label" for="authCheck">
              {{ $t('i18n_lembre_se_de_mim') }}
            </label>
          </div>
          <div>
            <md-button
              padding="6px"
              class="me-2 mb-md-0"
              @click="logUser()"
            >
              Login
            </md-button>
            <n-link :to="localePath('/register')" class="btn btn-outline-primary btn-icon-text">
              {{ $t('i18n_registrar') }}
            </n-link>
          </div>
          <div class="d-block my-3 text-muted cursor-pointer" @click="modal = true">
            {{ $t('i18n_esqueceu_a_sua_senha') }}
          </div>
        </form>
      </div>
    </section>
    <div class="redirect-btns">
      <n-link class="links" :to="localePath('/')">
        <font-awesome-icon :icon="['fas', 'chevron-left']" />
        {{ $t('i18n_voltar') }}
      </n-link>
      <n-link class="links" to="#">
        <font-awesome-icon :icon="['fas', 'book']" />
        {{ $t('i18n_termos_de_uso') }}
      </n-link>
    </div>
    <md-modal-forgot-password
      v-model="modal"
      :errors="getOnboardingAuthErrors"
      :loading="getOnboardingAuthLoading"
      @sendForgottenPasswordEmail="sendEmail($event)"
      @clearErros="$store.commit('onboarding-auth/SET_ERRORS', null)"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import MdButton from '@/components/md/atoms/MdButton.vue'
import MdModalForgotPassword from '@/components/md/molecules/MdModalForgotPassword.vue'

export default {
  name: 'MdLogin',
  components: {
    MdButton,
    MdModalForgotPassword
  },
  data () {
    return {
      infos: {
        email: '',
        password: ''
      },
      modal: false
    }
  },
  computed: {
    ...mapGetters({
      currentSettings: 'settings/currentSettings',
      getOnboardingAuthLoading: 'onboarding-auth/getOnboardingAuthLoading',
      getOnboardingAuthErrors: 'onboarding-auth/getOnboardingAuthErrors'
    })
  },
  methods: {
    ...mapActions({
      login: 'login',
      authUser: 'authUser',
      sendForgottenPasswordEmail: 'onboarding-auth/sendForgottenPasswordEmail'
    }),
    async logUser () {
      await this.login(this.infos)

      this.authUser().then(() => {
        if (this.$route.query.from) {
          this.$router.push(this.localePath(this.$route.query.from))

          return
        }

        this.$router.push(this.localePath('/'))
      })
    },
    sendEmail (email) {
      this.sendForgottenPasswordEmail(email).then(() => {
        this.modal = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-bg {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: var(--md-bg-color);
  z-index: 1000;
  min-height: 665px;
  overflow: auto;

  display: flex;
  justify-content: center;
  align-items: center;

  section {
    display: flex;
    width: 50%;
    min-height: 500px;
    background: var(--md-comp-bg-color);
    border: 1px solid var(--md-comp-border-color);
    -webkit-box-shadow: 0 0 10px 0 var(--md-shadow-color);
    box-shadow: 0 0 10px 0 var(--md-shadow-color);

    .login-banner {
      width: 50%;
      background: #ccc;
      background-image: url('/md/bet-apostas.webp');
      background-position: center;
      background-size: cover;
    }

    .login-form {
      width: 100%;

      .sidebar-logo {
        max-height: 60px;
        max-width: 150px;
        background-size: cover;
        background: var(--fut-background-logo);
        padding: 4px;
        border-radius: 4px;
      }
      .text-muted {
        font-size: 17px;
      }
      .form-label, .form-check-label {
        color: var(--md-font-color);
      }
      .form-control {
        border: 1px solid var(--md-comp-border-color);
        background: var(--md-comp-bg-color);
        color: var(--md-font-color);
        box-shadow: 0 0 0 0;
      }
      .btn-outline-primary {
        color: var(--fut-primary);
        border-color: var(--fut-primary);

        &:hover {
          color: #fff;
          background: var(--fut-primary);
          border-color: var(--fut-primary);
        }
      }
      a {
        text-decoration: none;
      }
    }
  }

  .redirect-btns {
    position: absolute;
    right: 55px;
    bottom: 30px;
    .links {
      text-decoration: none;
      color: #fff;
      padding: 10px 15px;
      border-radius: 4px;
      &:first-child {
        background: #FF3366;
        margin-right: 4px;
        &:hover {
          background: #d72b56;
        }
        &:active {
          background: #FF336699;
        }
      }
      &:last-child {
        background: var(--fut-primary);
        &:hover {
          background: var(--fut-primary-darkest);
        }
        &:active {
          background: var(--fut-primary-lightest);
        }
      }
    }
  }
}
.cursor-pointer{
  cursor: pointer;
}

@media(max-width: 768px) {
  .login-banner {
    display: none;
  }
  section {
    width: 100% !important;
    margin: 0 25px;
  }
}

@media (max-width: 425px) {
  section {
    margin: 0;
    height: 100%;
    padding-top: 30px;
  }
  .redirect-btns {
    right: 10px !important;
  }
}
</style>
