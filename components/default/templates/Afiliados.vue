<template>
  <div class="afiliados">
    <h1>
      {{ $t('i18n_aguarde_voce_sera_redirecionado') }}
    </h1>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Afiliados',
  computed: {
    ...mapGetters({
      loggedInUser: 'loggedInUser'
    })
  },
  mounted () {
    if (!this.loggedInUser) {
      this.saveAffiliateToken(this.$route.query.token)
    }

    window.location.replace(this.localePath('/'))
  },
  methods: {
    ...mapActions({
      saveAffiliateToken: 'onboarding-auth/saveAffiliateToken'
    })
  }
}
</script>

<style lang="scss" scoped>
.afiliados {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: #E0E4EA;
}
</style>
