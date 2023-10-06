<template>
  <form
    class="login-form"
    :class="{'d-block': vertical}"
    @submit.prevent="$emit('logUser', data)"
  >
    <fut-input
      v-model="data.email"
      class="me-2 mx-1 mx-md-2 fut-color-dynamic"
      :class="{'mb-2': vertical}"
      dark
      :rounded="true"
      :placeholder="`E-mail ou ${$t('i18n_usuario')}`"
      type="text"
    />
    <fut-input
      v-model="data.password"
      class="me-2 mx-1 mx-md-2 mt fut-color-dynamic"
      :class="{'mb-2': vertical}"
      dark
      :rounded="true"
      placeholder="******"
      type="password"
    />
    <div class="d-flex mt mx-1">
      <fut-button
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
      </fut-button>
      <fut-button
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
      </fut-button>
    </div>
  </form>
</template>

<script>
import FutInput from '@/components/default/atoms/FutInput'
import FutButton from '@/components/default/atoms/FutButton'
import sportradarTagManager from '@/mixins.js/sportradarTagManager.js'

export default {
  name: 'FutLogin',
  components: {
    FutInput,
    FutButton
  },
  props: {
    vertical: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'logUser'
  ],
  mixins: [sportradarTagManager],
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
