<template>
  <div class="container pt-3">
    <div class="row">
      <div class="col-md-2">
        <fut-sidebar-user-menu
          :current-layout-style="getCurrentLayoutStyle"
        />
      </div>
      <div class="col-md-10">
        <div class="d-flex justify-content-between">
          <div>
            <h5 class="text-white fut-color-dynamic">
              {{ loggedInUser.name }}
            </h5>
            <h3 class="text-primary">
              R$ {{ loggedInUser.balance }}
            </h3>
          </div>
          <div>
            <fut-button class="text-dark fut-color-dynamic" rounded primary to="/logout">
              <font-awesome-icon class="icon text-dark me-1" :icon="['fas', 'sign-out-alt']" /> {{ $t('i18n_sair') }}
            </fut-button>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <p class="text-white fut-color-dynamic mb-0">
              {{ $t('i18n_disponivel') }}
            </p>
            <h4 class="text-primary">
              R$ {{ loggedInUser.balance }}
            </h4>
          </div>
          <div class="col-6">
            <p class="text-white fut-color-dynamic mb-0">
              {{ $t('i18n_saldo_de_bonus') }}
            </p>
            <h4 class="text-primary">
              R$ {{ loggedInUser.balance_bonus }}
            </h4>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <p class="text-white fut-color-dynamic mb-0">
              {{ $t('i18n_aposta_gratis') }}
            </p>
            <h4 class="text-primary">
              R$ {{ loggedInUser.free_bet }}
            </h4>
          </div>
          <div class="col-6">
            <p class="text-white fut-color-dynamic mb-0">
              {{ $t('i18n_saldo_bloqueado') }}
            </p>
            <h4 class="text-primary">
              R$ {{ loggedInUser.player.freebet_closed }}
            </h4>
          </div>
        </div>
        <!-- <h1 class="text-dark">teste</h1> -->
        <div class="row">
          <progress-bar
            :rollover="loggedInUser.bonus"
            :loading="getOnboardingAuthLoading"
            @cancelUserBonus="cancelUserBonus()"
          />
        </div>
        <hr class="bg-primary">
        <slot />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import FutSidebarUserMenu from '@/components/default/organisms/FutSidebarUserMenu.vue'
import FutButton from '@/components/default/atoms/FutButton'
import ProgressBar from '@/components/default/molecules/ProgressBar.vue'

export default {
  components: {
    FutSidebarUserMenu,
    FutButton,
    ProgressBar
  },
  props: {
    resolvedBets: {
      type: Array,
      default: () => []
    },
    pendingBets: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapGetters({
      loggedInUser: 'loggedInUser',
      getCurrentLayoutStyle: 'layout/getCurrentLayoutStyle',
      getOnboardingAuthLoading: 'onboarding-auth/getOnboardingAuthLoading'
    })
  },
  methods: {
    ...mapActions({
      sendCancelUserBonus: 'onboarding-auth/sendCancelUserBonus'
    }),
    cancelUserBonus () {
      this.sendCancelUserBonus({
        bonus: true
      }).then(() => {
        window.location.reload()
      })
    }
  }
}
</script>
