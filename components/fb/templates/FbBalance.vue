<template>
  <div class="d-flex justify-content-center">
    <div class="profile-content">
      <div
        class="header-profile w-100 mt-3 p-2 align-items-center text-white fut-color-dynamic"
      >
        <font-awesome-icon class="mr-10" :icon="['fas', 'money-bill']" />
        <span>{{ $t('i18n_saldo_do_usuario') }}</span>
      </div>
      <div class="d-md-flex d-grid">
        <div class="section-details w-100 me-0 mt-2">
          <div class="container py-1 section-details-header align-items-center fut-color-dynamic">
            <font-awesome-icon class="mr-10" :icon="['fas', 'coins']" />
            <span> {{ $t('i18n_saldo') }} </span>
          </div>
          <div class="d-grid px-40 py-3">
            <span class="text-white fut-color-dynamic">BRL</span>
            <span class="fs-60 text-primary">{{ getFormattedValue(loggedInUser.balance) }}</span>
          </div>
        </div>
        <div class="section-details w-100 ms-md-1 ms-0 mt-2">
          <div class="section-details-header align-items-center py-1 container fut-color-dynamic">
            <font-awesome-icon class="mr-10" :icon="['fas', 'money-bill']" />
            <span>{{ $t('i18n_saldo_de_bonus') }}</span>
          </div>
          <div class="d-grid px-40 py-3">
            <span class="text-white fut-color-dynamic">BRL</span>
            <span class="fs-60 text-primary">{{ getFormattedValue(loggedInUser.balance_bonus) }}</span>
          </div>
        </div>
      </div>
      <div class="d-md-flex d-grid">
        <div class="section-details w-100 me-0 mt-2">
          <div class="container py-1 section-details-header align-items-center fut-color-dynamic">
            <font-awesome-icon class="mr-10" :icon="['fas', 'coins']" />
            <span> {{ $t('i18n_aposta_gratis') }} </span>
          </div>
          <div class="d-grid px-40 py-3">
            <span class="text-white fut-color-dynamic">BRL</span>
            <span class="fs-60 text-primary">{{ getFormattedValue(loggedInUser.free_bet) }}</span>
          </div>
        </div>
        <div class="section-details w-100 ms-md-1 ms-0 mt-2">
          <div class="section-details-header align-items-center py-1 container fut-color-dynamic">
            <font-awesome-icon class="mr-10" :icon="['fas', 'money-bill']" />
            <span>{{ $t('i18n_saldo_bloqueado') }}</span>
          </div>
          <div class="d-grid px-40 py-3">
            <span class="text-white fut-color-dynamic">BRL</span>
            <span class="fs-60 text-primary">{{ getFormattedValue(loggedInUser.player.freebet_closed) }}</span>
          </div>
        </div>
      </div>

      <div
        class="header-profile w-100 mt-1 p-2 align-items-center text-white fut-color-dynamic"
      >
        <font-awesome-icon class="mr-10" :icon="['fas', 'money-bill']" />
        <span>{{ $t('i18n_bonus_e_rollover') }}</span>
      </div>

      <div class="d-block d-md-flex mt-md-1">
        <fb-progress-bar
          :rollover="loggedInUser.bonus"
          :loading="getOnboardingAuthLoading"
          class="section-details d-block"
          @cancelUserBonus="cancelUserBonus()"
        />
        <div class="section-details w-100 ms-md-1 ms-0 d-none d-md-block" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useBaseStore } from '@/stores/base'
import { useOnboardingAuthStore } from '@/stores/onboarding-auth'

import FbProgressBar from '@/components/fb/molecules/FbProgressBar'

export default {
  components: {
    FbProgressBar
  },
  computed: {
    ...mapState(useBaseStore, {
      loggedInUser: 'loggedInUser'
    }),
    ...mapState(useOnboardingAuthStore, {
      getOnboardingAuthLoading: 'getOnboardingAuthLoading'
    })
  },
  methods: {
    ...mapActions(useOnboardingAuthStore, {
      sendCancelUserBonus: 'sendCancelUserBonus'
    }),
    cancelUserBonus () {
      this.sendCancelUserBonus({
        bonus: true
      }).then(() => {
        window.location.reload()
      })
    },
    getFormattedValue (value) {
      const formattedResult = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })
      return formattedResult.format(value)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/layout/breakpoints";

.profile-content {
  width: 100%;
  @include md {
    width: 85%;
    margin-bottom: 25%;
  }
}
.header-profile {
  background-color: var(--fut-background);
}
.section-details {
  background-color: var(--fut-background-lighter);
  .section-details-header {
    color: white;
    background-color: var(--fut-background);
    @include md {
      border-bottom: 1px solid rgba(102, 99, 99, 0.521);
    }
  }
  .d-grid{
    @include _md {
      border-bottom: 1px solid black;
    }
  }
}
.label-control {
  color: white;
  font-size: 13px;
  width: 20%;
  @include md {
    width: auto;
  }
}
.input-control {
  background-color: transparent;
  border: none;
  color: white;
  outline: none;
  @include md {
    width: 100%;
    background-color: var(--fut-background);
  }
    &::placeholder {
      color: white;
      font-weight: bold;
      @include md {
        color: gray;
        font-weight: normal;
      }
    }
}
.contianer-md {
  margin: 0 20px;
  @include md {
    margin: 0 40px;
  }
}
.select-control {
  background-color: var(--fut-background);
  color: white;
  border: none;
  outline-color: var(--fut-primary);
  width: 100%;
}
.button-feature {
  background-image: linear-gradient(
    to right,
    var(--fut-primary),
    var(--fut-secondary)
  );
  border: none;
  border-radius: 5px;
}
.w-35 {
  width: 80%;
  @include md {
    width: 35%;
  }
}
.w-25-feature {
  width: 80%;
  @include md {
    width: 25%;
  }
}
.input-control-no-disabled {
  background-color: transparent;
  border: none;
  color: white;
  outline: none;
  border-bottom: 1px solid var(--fut-background-lightest);
  @include md {
    width: 100%;
    background-color: var(--fut-background);
  }
  &::placeholder {
    color: white;
    font-weight: bold;
    @include md {
      color: gray;
      font-weight: normal;
    }
  }
}
.fs-60 {
  font-size: 60px;
  line-height: 0.8;
}
</style>
