<template>
  <div class="d-flex justify-content-center">
    <div v-if="loggedInUser && getOnboardingAuthBonus" class="profile-content container-fluid px-0">
      <h2 class="text-white fut-color-dynamic section-title ps-2">{{ $t('i18n_bonus') }}</h2>
      <div class="header-profile w-100 mt-3" />
      <div class="px-3 w-100 d-flex nav-container">
        <fb-fut-button class="bonus-btn d-flex justify-content-between w-md-100 fut-dynamic-color me-md-4" :class="{active: current === 0}" @click="current = 0">
          <span class="bonus-btn-title" style="white-space: nowrap">{{ $t('i18n_bonus_ativos') }} <span class="d-md-none">{{ getOnboardingAuthBonus.active.count }}</span></span>
          <span v-if="current === 0" class="bonus-btn-counter d-none d-md-inline">{{ getOnboardingAuthBonus.active.count }}</span>
        </fb-fut-button>
        <fb-fut-button class="bonus-btn d-flex justify-content-between w-md-100 fut-dynamic-color me-md-4" :class="{active: current === 1}" @click="current = 1">
          <span class="bonus-btn-title">{{ $t('i18n_bonus_concluidos') }} <span class="d-md-none">{{ getOnboardingAuthBonus.completed.count }}</span></span>
          <span v-if="current === 1" class="bonus-btn-counter d-none d-md-inline">{{ getOnboardingAuthBonus.completed.count }}</span>
        </fb-fut-button>
        <fb-fut-button class="bonus-btn d-flex justify-content-between w-md-100 fut-dynamic-color" :class="{active: current === 2}" @click="current = 2">
          <span class="bonus-btn-title">{{ $t('i18n_bonus_perdidos') }} <span class="d-md-none">{{ getOnboardingAuthBonus.lost.count }}</span></span>
          <span v-if="current === 2" class="bonus-btn-counter d-none d-md-inline">{{ getOnboardingAuthBonus.lost.count }}</span>
        </fb-fut-button>
      </div>
      <div class="mobile-nav-outline w-100 d-block d-md-none"></div>
      <div v-if="current === 0" class="bonus-container mt-2 mx-3">
        <fb-progress-bar
          :rollover="loggedInUser.bonus"
          :loading="loading"
          class="section-bar d-block"
          @cancelUserBonus="cancelUserBonus()"
        />
      </div>
      <div v-if="current === 1" class="bonus-container mt-2 mx-3">
        <div v-if="getOnboardingAuthBonus && getOnboardingAuthBonus.completed && getOnboardingAuthBonus.completed.bonus_sum" :key="'completed_sum_' + index" class="container-bonus-section">
          <div class="container-header">
            <p class="mb-0 text-white fut-color-dynamic">Soma de bonus: {{ getOnboardingAuthBonus.completed.bonus_sum }}</p>
          </div>
        </div>
        <template v-for="(item, index) in getOnboardingAuthBonus.completed">
          <div v-if="item.code" :key="'completed_' + index" class="container-bonus-section">
            <div class="container-header">
              <p class="mb-0 text-white fut-color-dynamic">Completados</p>
            </div>
            <div class="container-content">
              <p class="mb-0 text-white">Código: {{ item.code }}</p>
              <p class="mb-0 text-white">Validade: {{ item.expires }}</p>
              <p class="mb-0 text-white">Rollover: {{ item.rollover }}</p>
              <!-- <code>{{ item }}</code> -->
            </div>
          </div>
        </template>
      </div>
      <div v-if="current === 2" class="bonus-container mt-2 mx-3">
        <template v-for="(item, index) in getOnboardingAuthBonus.lost">
          <div v-if="item.code" :key="'lost_' + index" class="container-bonus-section">
            <div class="container-header">
              <p class="mb-0 text-white fut-color-dynamic">Perdido</p>
            </div>
            <div class="container-content">
              <p class="mb-0 text-white">Código: {{ item.code }}</p>
              <p class="mb-0 text-white">Validade: {{ item.expires }}</p>
              <p class="mb-0 text-white">Rollover: {{ item.rollover }}</p>
              <!-- <code>{{ item }}</code> -->
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useBaseStore } from '@/stores/base'
import { useOnboardingAuthStore } from '@/stores/onboarding-auth'

import FbFutButton from '@/components/fb/atoms/FbFutButton.vue'

export default {
  components: {
    FbFutButton
  },
  data () {
    return {
      current: 0,
      loading: false
    }
  },
  computed: {
    ...mapState(useBaseStore, {
      loggedInUser: 'loggedInUser'
    }),
    ...mapState(useOnboardingAuthStore, {
      getOnboardingAuthBonus: 'getOnboardingAuthBonus'
    })
  },
  mounted () {
    this.fetchUserBonus()
  },
  methods: {
    ...mapActions(useOnboardingAuthStore, {
      sendCancelUserBonus: 'onboarding-auth/sendCancelUserBonus',
      fetchUserBonus: 'onboarding-auth/fetchUserBonus'
    }),
    cancelUserBonus () {
      this.loading = true
      
      this.sendCancelUserBonus({
        bonus: true
      }).then(() => {
        window.location.reload()
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/layout/breakpoints";
.container-bonus-section {
  @include md {
    background: var(--fut-background-lightest);
  }
  background: var(--fut-background-darker);
  margin-bottom: 5px;
  .container-header{
    @include md {
      border-bottom: 1px solid rgb(102, 99, 99);
    }
    border-bottom: 1px solid rgb(53, 51, 51);
    padding: 5px 15px;
  }
  .container-content{
    padding: 5px 15px;
  }
}
.w-md-100{
  @include md {
    width: 100%;
  }
}
.section-title{
  margin-top: 20px;
  margin-bottom: 40px;
  font-size: 25px;
}
.bonus-btn {
  text-transform: uppercase;
  color: white;
  font-weight: bold;
  z-index: 1;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  @include md {
    text-transform: initial;
    background: var(--fut-background);
    font-size: 14px;
    padding: 15px;
  }
  &.active{
    color: var(--fut-primary);
    border-bottom: 1.6px solid var(--fut-primary);
    border-radius: 0;
    @include md {
      border-radius: 0.25rem;
      border-bottom: 0px;
      color: var(--fut-background-black);
      background: var(--fut-primary);
    }
  }
}
.bonus-btn-counter{
  @include md {
    padding: 20px;
    background: var(--fut-background);
    border-radius: 5px;
    color: var(--fut-primary);
    font-size: 20px;
    line-height: 16px;
  }
}
.bonus-btn-title{
  align-self: center;
}
.profile-content {
  max-width: 1200px;
  @include md {
    margin-bottom: 25%;
  }
}
.mobile-nav-outline{
  height: 1.6px;
  background: white;
  transform: translateY(-1.6px);
  z-index: 0;
  position: relative;
}
.header-profile {
  background-color: var(--fut-background);
}
.section-bar {
  @include md {
    background-color: var(--fut-background-lightest);
  }
}
.section-details {
  background-color: var(--fut-background-lightest);
  .section-details-header {
    color: white;
    border-bottom: 1px solid black;
    background-color: var(--fut-background-lightest);
    @include md {
      border-bottom: 1px solid rgb(102, 99, 99);
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
.border-count {
  margin-top: 15px;
  border: 5px solid var(--fut-primary);
  font-size: 48px;
  line-height: 50px;
  width: 60px;
  border-radius: 50%;
  margin: 0 auto;
}
</style>
