<template>
  <div class="sk-my-bets-ticket">
    <div class="header">
      <sk-components-select
        :components-list="componentsList"
        :selected-component="currentComponent"
        background="var(--fut-background)"
        @changeComponent="changeComponent($event)"
      />
    </div>

    <div class="body">
      <sk-bets-history
        v-if="true"
        :items="bets"
        :logo="logo"
        on-ticket
      />
    </div>

    <div class="footer">
      <NuxtLink :to="localePath(`/my-bets?tab=${currentComponent}`)" class="see-all transition">
        <span>{{ $t('i18n_ver_todos') }}</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import SkComponentsSelect from '@/components/sk/molecules/SkComponentsSelect.vue'
import SkBetsHistory from '@/components/sk/organisms/SkBetsHistory.vue'

export default {
  name: 'SkMyBetsTicket',
  components: {
    SkComponentsSelect,
    SkBetsHistory
  },
  props: {
    userBets: {
      type: Object,
      default: () => ({})
    },
    logo: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      currentComponent: 'active'
    }
  },
  computed: {
    componentsList () {
      return {
        active: {
          text: this.$t('i18n_ativo'),
          icon: ['fas', 'history']
        },
        defined: {
          text: this.$t('i18n_definido'),
          icon: ['fas', 'check-circle']
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
    }
  },
  created () {
    this.$emit('fetchUserBets')
  },
  methods: {
    changeComponent (compName) {
      this.currentComponent = compName
    }
  }
}
</script>

<style lang="scss" scoped>
.sk-my-bets-ticket {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 60px);

  .header {
    display: flex;
    padding: .5rem;
    border-bottom: 2px solid var(--fut-background-lighter);
  }

  .body {
    flex-grow: 1;
    overflow: auto;
    padding: .5rem 1rem;

    &::-webkit-scrollbar-track {
      background-color: transparent;
    }
    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 3px;
      background: var(--fut-background-lightest-2);
    }
  }

  .footer {
    display: flex;
    background: var(--fut-background-lighter);
    padding: 1rem;
    box-shadow: 0 -1px 3px 0 rgba(0, 0, 0, .2), 0 -1px 2px 0 rgba(0, 0, 0, .12);
    z-index: 1;

    .see-all {
      display: flex;
      justify-content: center;
      width: 100%;
      text-decoration: none;
      background: var(--fut-background-darkest);
      color: var(--fut-secondary);
      padding: 11.5px 20px;
      border-radius: .25rem;
      box-shadow: 0rem .0625rem .1875rem #00000033 , 0rem .0625rem .125rem #0000001f;

      span {
        font-size: .875rem;
        font-weight: 600;
      }

      &:hover {
        color: var(--fut-color-dynamic);
        background: var(--fut-background-black);
      }
      &:active {
        span {
          display: flex;
          transform: scale(.95);
        }
      }
    }
  }
}

@media (max-width: 821px) {
  .sk-my-bets-ticket {
    height: calc(100vh - 128px) !important;
  }
}
</style>
