<template>
  <form class="d-flex" @submit.prevent="$emit('logUser', data)">
    <div>
      <fut-input
        v-model="data.email"
        :nsx-input="true"
        style="max-width: 90px"
        class="me-2 mx-md-2 login-btn"
        :placeholder="$t('i18n_usuario')"
        type="text"
      />
    </div>
    <div>
      <div class="d-flex">
        <div>
          <fut-input
            v-model="data.password"
            :nsx-input="true"
            style="max-width: 90px"
            class="mx-2 login-btn text-dark"
            :placeholder="$t('i18n_senha')"
            type="password"
          />
        </div>
        <nsx-fut-button
          :loading="loading"
          rounded
          type="submit"
          class="no-break btn-nsx"
          :sm="true"
        >
          OK
        </nsx-fut-button>
      </div>
    </div>
  </form>
</template>
<script>
import FutInput from '@/components/default/atoms/FutInput'
import NsxFutButton from '@/components/nsx/atoms/NsxFutButton'

export default {
  components: { FutInput, NsxFutButton },
  props: {
    loading: {
      type: Boolean,
      default: false
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
  .no-break{
    white-space: nowrap;
  }
  .btn-nsx{
    background: #ffa500;
    font-size: 13.3px;
    color: white;
  }
  .login-btn{
    border-radius: 2px !important;
    overflow: hidden !important;
  }
</style>
