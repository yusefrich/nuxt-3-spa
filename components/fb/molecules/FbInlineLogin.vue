<template>
  <form class="login-form" @submit.prevent="$emit('logUser', data)">
    <fut-input
      v-model="data.email"
      class="me-2 mx-1 mx-md-2 fut-color-dynamic"
      dark
      :rounded="true"
      :placeholder="`E-mail ou ${$t('i18n_usuario')}`"
      type="text"
    />
    <fut-input
      v-model="data.password"
      class="me-2 mx-1 mx-md-2 mt fut-color-dynamic"
      dark
      :rounded="true"
      placeholder="******"
      type="password"
    />
    <div class="d-flex mt mx-1">
      <fb-fut-button class="button-register d-none d-md-inline me-2 fut-color-dynamic no-break" type="submit">
        {{ $t('i18n_entrar').toUpperCase() }}
      </fb-fut-button>
      <!-- <fb-fut-button class="button-register transition no-break" to="/register">
        <span class="fw-bold text-dark">{{ $t('i18n_registro') }}</span>
      </fb-fut-button> -->

      <!-- <fut-button
        type="submit"
        style="height: 40px;"
        rounded
        class="no-break"
        block
        primary
        :sm="true"
      >
        <strong
          class="text-uppercase font-weight-bold text-head-bg"
        >
          {{ $t('i18n_entrar') }}
        </strong>
      </fut-button> -->
      <!-- <fut-button
        type="button"
        style="height: 40px;"
        rounded
        class="no-break d-table"
        block
        to="/register"
        outline-primary
        :sm="true"
      >
        <strong style="vertical-align: middle" class="text-uppercase font-weight-bold d-table-cell">{{ $t('i18n_cadastro') }}</strong>
      </fut-button> -->
    </div>
  </form>
</template>

<script>
import FutInput from '@/components/default/atoms/FutInput.vue'
import FbFutButton from '@/components/fb/atoms/FbFutButton.vue'
import sportradarTagManager from '@/mixins.js/sportradarTagManager.js'

export default {
  name: 'FutLogin',
  components: {
    FutInput,
    FbFutButton
  },
  mixins: [sportradarTagManager],
  props: {
    currentSettings: {
      type: Object,
      default: () => ({})
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

<style scoped lang="scss">
@import "@/assets/layout/breakpoints";
.button-login {
  // border: 1px solid var(--fut-primary);
  // background: transparent;
  color: white;
  width: 100px;
  border-radius: 7px;
  font-weight: bold;
  font-size: 15px;
  padding: 10px 10px;
  background-color: var(--fut-background-header-white);
  // &:hover {
  //   background-color: var(--fut-background-white);
  // }
}
.button-register {
  background: var(--fut-primary);
  // color: white;
  text-decoration: none;
  border-radius: 7px;
  font-size: 15px;
  padding: 10px 10px;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  padding-top: 10px;
  @include md {
    text-transform: none;
    padding: 10px 20px;
    border-radius: 7px;
    // padding-top: 15px;
  }
  &:hover {
    background-image: linear-gradient(
      to right,
      var(--fut-secondary-lighter),
      var(--fut-secondary-lightest)
    );
  }
}
.text-head-bg{
    color: var(--fut-background);
  }
  .no-break{
    white-space: nowrap;
  }
  .login-form {
    display: flex;

    @media (max-width: 991px) {
      display: block;

      .mt {
        margin-top: 8px;
      }
    }
  }
</style>
