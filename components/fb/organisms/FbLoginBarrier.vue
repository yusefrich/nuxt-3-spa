<template>
  <div>
    <div v-if="!loggedInUser" class="login-barrier">
      <div class="login-inside">
        <fb-inline-login
          v-if="hasLogin"
          :current-settings="currentSettings"
          class="justify-content-center"
          style="width: 95vw"
          @logUser="$emit('logUser', $event)"
        />
        <p class="text-white mt-3">
          {{ $t('i18n_nao_tem_uma_conta') }} <a class="text-white" href="/register">{{ $t('i18n_registre_se') }}</a>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import FbInlineLogin from '@/components/fb/molecules/FbInlineLogin'

export default {
  components: {
    FbInlineLogin
  },
  props: {
    hasLogin: {
      type: Boolean,
      default: false
    },
    brand: {
      type: String,
      default: ''
    },
    currentSettings: {
      type: Object,
      default: () => ({})
    },
    loggedInUser: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
<style lang="scss" scoped>
.login-barrier{
  width: 100vw;
  height: 100vh;
  background: var(--fut-background);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1051;
}
.login-inside{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  img{
    margin-bottom: 20px;
  }
}
</style>
