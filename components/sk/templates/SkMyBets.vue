<template>
  <div class="container">
    <div class="sk-my-bets-header">
      <h1>
        <font-awesome-icon class="icon" :icon="['fas', 'receipt']" />
        <span>{{ $t('i18n_apostas_esportivas') }}</span>
      </h1>
      <button @click="$router.go(-1)">
        <font-awesome-icon class="icon transition" :icon="['fas', 'times']" />
      </button>
    </div>

    <div class="d-flex mb-3">
      <sk-components-select
        :components-list="componentsList"
        :selected-component="currentComponent"
        @changeComponent="changeComponent($event)"
      />
    </div>

    <sk-bets-history
      :items="bets"
      :logo="currentSettings.logo"
      :is-mobile="isMobile"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useBaseStore } from '@/stores/base'
import { useSettingsStore } from '@/stores/settings'

import SkComponentsSelect from '@/components/sk/molecules/SkComponentsSelect.vue'
import SkBetsHistory from '@/components/sk/organisms/SkBetsHistory.vue'
import windowWidth from '@/mixins.js/windowWidth.js'

export default {
  name: 'SkMyBets',
  components: {
    SkComponentsSelect,
    SkBetsHistory
  },
  mixins: [windowWidth],
  data () {
    return {
      currentComponent: 'active'
    }
  },
  computed: {
    ...mapState(useBaseStore, {
      userBets: 'userBets'
    }),
    ...mapState(useSettingsStore, {
      currentSettings: 'currentSettings'
    }),
    componentsList () {
      return {
        active: {
          text: this.$t('i18n_ativo')
        },
        defined: {
          text: this.$t('i18n_definido')
        }
      }
    },
    bets () {
      if (!this.userBets) {
        return []
      }

      if (this.currentComponent === 'active') {
        return this.userBets.pending
      }

      return this.userBets.done
    },
    isMobile () {
      return this.width <= 821
    }
  },
  watch: {
    '$route.query.tab' (value) {
      this.currentComponent = value
    }
  },
  created () {
    this.currentComponent = this.$route.query.tab || 'active'
    this.fetchUserBets()
  },
  methods: {
    ...mapActions(useBaseStore, {
      fetchUserBets: 'fetchUserBets'
    }),
    changeComponent (compName) {
      this.$router.replace({ query: { tab: compName } })
      this.currentComponent = compName
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 34px 3vw 0 3vw !important;

  .sk-my-bets-header {
    display: flex;
    justify-content: space-between;
    color: var(--fut-color-dynamic);
    margin-bottom: 24px;

    h1 {
      font-weight: 700;
      font-size: 1.125rem;
      display: flex;
      align-items: center;
      margin: 0;

      .icon {
        color: var(--fut-secondary);
        margin-right: 8px;
      }
    }
    button {
      border: none;
      background: transparent;

      .icon {
        color: var(--fut-secondary);
      }
      &:hover {
        .icon {
          color: var(--fut-color-dynamic);
        }
      }
      &:active {
        .icon {
          transform: scale(.90);
        }
      }
    }
  }
}
</style>
