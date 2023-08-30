<template>
  <div class="my-5 py-5 text-center">
    <p class="text-white mb-4">
      Informe o Email/usuário e senha cadastrados.
    </p>
    <fut-login class="justify-content-center" @logUser="logUser($event)" />
    <p class="mt-1">
      <small class="text-white">Não tem uma conta cadastrada? <a :href="localePath('/register')">Cadastre-se</a></small>
    </p>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import FutLogin from '@/components/default/molecules/FutLogin.vue'
import sportradarTagManager from '@/mixins.js/sportradarTagManager.js'

export default {
  name: 'Login',
  components: {
    FutLogin
  },
  mixins: [sportradarTagManager],
  methods: {
    ...mapActions({
      login: 'login',
      authUser: 'authUser'
    }),
    async logUser (event) {
      await this.login(event)

      this.authUser().then((data) => {
        this.srtmLogin(data.id)

        if (this.$route.query.from) {
          this.$router.push(this.localePath(this.$route.query.from))
          return
        }

        this.$router.push(this.localePath('/'))
      })
    }
  }
}
</script>
