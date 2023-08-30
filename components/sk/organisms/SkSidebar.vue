<template>
  <aside
    id="sk-sidebar"
    :class="[
      toggleSidebar && !isMobile ? 'open' : !isMobile ? 'closed' : '',
      mobileToogleSidebar && isMobile ? 'mobile-open' : isMobile ? 'mobile-closed' : '',
      { 'median-sidebar': isMedianScreen && toggleSidebar }
    ]"
  >
    <sk-header class="sidebar-header">
      <button
        v-if="!isMobile"
        class="toggle-sidebar transition"
        @click="toggleSidebar = !toggleSidebar"
      >
        <font-awesome-icon class="icon" :icon="['fas', 'bars']" />
      </button>
      <nav v-if="toggleSidebar || isMobile">
        <n-link
          class="links transition"
          :to="localePath('/casino')"
          :class="{ active: currentRoute('/casino') }"
        >
          <span>{{ $t('i18n_cassino').toUpperCase() }}</span>
        </n-link>
        <n-link
          class="links transition"
          :to="localePath('/sports?tab=SkLobby')"
          :class="{ active: currentRoute('/sports') || currentRoute('/sport') }"
        >
          <span>{{ $tc('i18n_esporte', 2).toUpperCase() }}</span>
        </n-link>
      </nav>
    </sk-header>

    <nav v-if="closedSidebar" class="closed-nav">
      <n-link
        class="links transition"
        :to="localePath('/casino')"
        :class="{ active: currentRoute('/casino') }"
      />
      <n-link
        class="links transition"
        :to="localePath('/sports?tab=SkLobby')"
        :class="{ active: currentRoute('/sports') || currentRoute('/sport') }"
      />
    </nav>

    <div
      :key="sidebarKey"
      class="sidebar-body transition"
      :style="`
        padding: ${closedSidebar ? '0 2px 4rem .5rem' : '1rem .6rem 6rem 1rem'};
      `"
    >
      <div v-if="currentRoute('/casino')" class="sidebar-list">
        <sk-collapsed-list
          name="casino"
          :title="$t('i18n_jogos')"
          :closed-sidebar="closedSidebar"
          no-collapse
          @openSidebar="toggleSidebar = true"
        >
          <ul class="casino-categories-list">
            <li
              v-for="(item, idx) in casinoCategories"
              :key="idx"
            >
              <n-link :to="localePath(`/casino/category/${item.slug}`)" class="c-link sidebar-btn transition">
                <font-awesome-icon class="icon transition" :icon="item.icon" />
                <span>{{ item.text }}</span>
              </n-link>
            </li>
          </ul>
        </sk-collapsed-list>
      </div>
      <div v-if="currentRoute('/casino')" class="sidebar-list">
        <n-link
          :to="localePath('/casino/provider')"
          class="sidebar-btn transition"
        >
          <font-awesome-icon class="icon transition" :icon="['fas', 'network-wired']" />
          <span>{{ $t('i18n_provedores') }}</span>
        </n-link>
      </div>

      <div v-if="(currentRoute('/sports') || currentRoute('/sport'))" class="sidebar-list">
        <n-link
          :to="localePath('/sports?tab=SkLive')"
          class="sidebar-btn transition"
          :class="{
            active: currentRoute('/sports?tab=SkLive'),
            'd-flex justify-content-center': closedSidebar
          }"
        >
          <font-awesome-icon class="icon transition" :icon="['fas', 'play-circle']" />
          <span v-if="!closedSidebar">{{ $t('i18n_eventos_ativos') }}</span>
        </n-link>
        <n-link
          :to="localePath('/sports?tab=SkPreMatch')"
          class="sidebar-btn transition"
          :class="{
            active: currentRoute('/sports?tab=SkPreMatch'),
            'd-flex justify-content-center': closedSidebar
          }"
        >
          <font-awesome-icon class="icon transition" :icon="['fas', 'stopwatch']" />
          <span v-if="!closedSidebar">{{ $t('i18n_comecando_em_breve') }}</span>
        </n-link>
        <n-link
          :to="localePath('/sports?tab=SkMyBets')"
          class="sidebar-btn transition"
          :class="{
            active: currentRoute('/sports?tab=SkMyBets'),
            'd-flex justify-content-center': closedSidebar
          }"
        >
          <font-awesome-icon class="icon transition" :icon="['fas', 'receipt']" />
          <span v-if="!closedSidebar">{{ $t('i18n_minhas_apostas') }}</span>
        </n-link>
      </div>
      <div v-if="(currentRoute('/sports') || currentRoute('/sport')) && preMatchMainLeagues && preMatchMainLeagues.length > 0" class="sidebar-list">
        <sk-collapsed-list
          name="top_leagues"
          :title="$t('i18n_principais_ligas')"
          :closed-sidebar="closedSidebar"
          :title-icon="['fas', 'star']"
          @openSidebar="toggleSidebar = true"
        >
          <ul class="casino-categories-list">
            <li
              v-for="(league, idx) in preMatchMainLeagues"
              :key="idx"
            >
              <n-link :to="localePath(`/sport/${league.sport_id}/league/${league.id}`)" class="c-link sidebar-btn transition">
                <img v-if="league.icon" :src="league.icon" alt="Sport icon" class="sport-icon">
                <font-awesome-icon v-else class="icon transition" :icon="['fas', 'star']" />
                <span>{{ league.name }}</span>
              </n-link>
            </li>
          </ul>
        </sk-collapsed-list>
      </div>
      <div v-if="(currentRoute('/sports') || currentRoute('/sport'))" class="sidebar-list">
        <sk-collapsed-list
          name="sport"
          :title="$tc('i18n_esporte', 2)"
          :closed-sidebar="closedSidebar"
          :title-icon="['fas', 'futbol']"
          @openSidebar="toggleSidebar = true"
        >
          <ul class="casino-categories-list">
            <li
              v-for="(sport, idx) in allSportsData"
              :key="idx"
            >
              <sk-collapsed-list
                :name="`sport_${sport.id}`"
                :title="sport.name"
                :title-icon="sportsIcons[sport.id]"
              >
                <ul class="casino-categories-list countries">
                  <li
                    v-for="(country, cIdx) in sport.country"
                    :key="cIdx"
                  >
                    <sk-collapsed-list
                      :name="`country_${country.id}`"
                      :title="country.name"
                    >
                      <ul class="casino-categories-list leagues">
                        <li
                          v-for="(league, lIdx) in country.leagues"
                          :key="lIdx"
                        >
                          <n-link
                            :to="localePath(`/sport/${sport.id}/league/${league.id}`)"
                            class="c-link sidebar-btn transition"
                          >
                            <div class="league-wrapper">
                              <span class="league-name">{{ league.name }}</span>
                              <span class="games ms-3">{{ league.games }}</span>
                            </div>
                          </n-link>
                        </li>
                      </ul>
                    </sk-collapsed-list>
                  </li>
                </ul>
              </sk-collapsed-list>
            </li>
          </ul>
        </sk-collapsed-list>
      </div>

      <div class="sidebar-list">
        <sk-collapsed-list
          v-if="loggedInUser"
          name="user"
          :title="$t('i18n_perfil')"
          :items="userList"
          :title-icon="['fas', 'user']"
          :closed-sidebar="closedSidebar"
          border-bottom
          @openSidebar="toggleSidebar = true"
        />
        <sk-collapsed-list
          name="promo"
          :title="$tc('i18n_promocao', 2)"
          :items="promosList"
          :title-icon="['fas', 'gift']"
          :closed-sidebar="closedSidebar"
          border-bottom
          @openSidebar="toggleSidebar = true"
        />
        <n-link
          :to="localePath('/affiliates')"
          class="sidebar-btn transition"
        >
          <font-awesome-icon class="icon transition" :icon="['fas', 'bezier-curve']" />
          <span>{{ $t('i18n_afiliados') }}</span>
        </n-link>
      </div>

      <div class="sidebar-list">
        <n-link
          :to="localePath('/suporte')"
          class="sidebar-btn transition"
        >
          <font-awesome-icon class="icon transition" :icon="['fas', 'headset']" />
          <span>{{ $t('i18n_suporte') }}</span>
        </n-link>
        <sk-collapsed-list
          name="lang"
          :title="langTitle"
          :title-icon="['fas', 'globe']"
          :closed-sidebar="closedSidebar"
          @openSidebar="toggleSidebar = true"
        >
          <ul class="languages-list">
            <li
              v-for="(item, idx) in languages"
              :key="idx"
            >
              <button
                class="sidebar-btn transition"
                :class="{ selected: item.locale === $i18n.locale }"
                @click="item.action()"
              >
                <span>{{ item.text }}</span>
                <div class="select-circle transition">
                  <span v-if="item.locale === $i18n.locale" />
                </div>
              </button>
            </li>
          </ul>
        </sk-collapsed-list>
      </div>
    </div>

    <div
      v-if="isMedianScreen && toggleSidebar"
      class="bg-overlay"
      @click="toggleSidebar = false"
    />
  </aside>
</template>

<script>
import SkHeader from '@/components/sk/atoms/SkHeader.vue'
import SkCollapsedList from '@/components/sk/molecules/SkCollapsedList.vue'
// import SkLangSwitcher from '@/components/sk/molecules/SkLangSwitcher.vue'

export default {
  name: 'SkSidebar',
  components: {
    SkHeader,
    SkCollapsedList
    // SkLangSwitcher
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    isMobile: {
      type: Boolean,
      default: false
    },
    isMedianScreen: {
      type: Boolean,
      default: false
    },
    mobileToogleSidebar: {
      type: Boolean,
      default: false
    },
    promos: {
      type: Array,
      default: () => ([])
    },
    casinoCategories: {
      type: Array,
      default: () => ([])
    },
    preMatchMainLeagues: {
      type: Array,
      default: () => ([])
    },
    allSportsData: {
      type: Array,
      default: () => ([])
    },
    loggedInUser: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      sportsIcons: {
        6046: '/md/sports/icon-futebol.svg',
        35709: '/md/sports/icon-handball.svg',
        48242: '/md/sports/icon-basquete.svg',
        54094: '/md/sports/icon-tenis.svg',
        131506: '/md/sports/icon-fut-americano.svg',
        154830: '/md/sports/icon-volei.svg',
        154914: '/md/sports/baseboll-icon.svg',
        154919: '/md/sports/icon-boxe.svg',
        265917: '/md/sports/icon-tenis-mesa.svg',
        621569: '/md/sports/icon-volei-praia.svg',
        687890: '/md/sports/icon-e-sports.svg'
      },
      sidebarKey: 0
    }
  },
  computed: {
    toggleSidebar: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    },
    promosList () {
      if (this.promos && this.promos.length) {
        const formattedPromos = this.promos.map((item) => {
          return {
            link: `/promo/${item.id}`,
            text: item.name
          }
        })

        formattedPromos.push({
          link: '/promo',
          text: this.$t('i18n_ver_todos')
        })

        return formattedPromos
      }

      return []
    },
    userList () {
      return [
        { text: this.$t('i18n_carteira'), action: () => this.$emit('modalWallet'), icon: ['fas', 'wallet'] },
        { text: this.$t('i18n_saldo'), link: '/user/bank/transactions?tab=balance', icon: ['fas', 'money-bill-wave-alt'] },
        { text: this.$t('i18n_afiliados'), link: '/affiliates', icon: ['fas', 'bezier-curve'] },
        { text: this.$t('i18n_configuracoes'), link: '/user/my-account/dados', icon: ['fas', 'cog'] },
        { text: this.$t('i18n_transacoes'), link: '/user/bank/transactions', icon: ['fas', 'clipboard-list'] },
        { text: this.$t('i18n_apostas_esportivas'), link: '/my-bets', icon: ['fas', 'basketball-ball'] },
        { text: this.$t('i18n_sair'), action: () => this.$emit('logout'), icon: ['fas', 'sign-out-alt'] }
      ]
    },
    closedSidebar () {
      if (!this.isMobile && !this.toggleSidebar) {
        return true
      }

      return false
    },
    languages () {
      return [
        {
          text: this.$t('i18n_portugues'),
          action: () => this.$emit('changeLanguage', 'PT'),
          locale: 'PT'
        },
        {
          text: this.$t('i18n_ingles'),
          action: () => this.$emit('changeLanguage', 'EN'),
          locale: 'EN'
        },
        {
          text: this.$t('i18n_espanhol'),
          action: () => this.$emit('changeLanguage', 'ES'),
          locale: 'ES'
        }
      ]
    },
    langTitle () {
      return `${this.$t('i18n_idioma')}: ${this.languages.find(item => item.locale === this.$i18n.locale).text}`
    }
  },
  watch: {
    toggleSidebar (value) {
      if (!value) {
        this.sidebarKey++
      }
    }
  },
  methods: {
    currentRoute (route) {
      return this.$route.fullPath.includes(route) || route === `${window.location.origin}${this.$route.fullPath}`
    }
  }
}
</script>

<style lang="scss" scoped>
#sk-sidebar {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--fut-background-darkest);
  filter: drop-shadow(0 0 5px rgba(25,25,25,.25));
  z-index: 3;

  .sidebar-header {
    display: flex;
    flex-shrink: 0;
    background: var(--fut-background-darkest) !important;

    .toggle-sidebar {
      display: flex;
      justify-content: center;
      align-items: center;
      min-width: 3.75rem;
      height: 100%;
      border: none;
      background: transparent;
      color: var(--fut-secondary);
      padding: 10px 14px;
      border-radius: 20px;

      .icon {
        width: 16px;
        height: 26px;
      }

      &:hover {
        color: var(--fut-color-dynamic);
      }
    }

    nav {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      gap: .5rem;
      padding: 0 1rem 0 0;

      .links {
        min-height: 2.25rem;
        text-decoration: none;
        color: var(--fut-color-dynamic);
        font-weight: 700;
        border-radius: .25rem;
        display: flex;
        flex-grow: 1;
        align-items: center;
        background-size: cover;
        background-repeat: no-repeat;

        span {
          margin-left: 3px;
          font-size: 15px;
        }

        &:first-of-type {
          background-color: var(--fut-background-lightest-2);
          background-image: url(/Sk/casino-sidebar.png);

          &:hover, &.active {
            background-image: url(/Sk/casino-hover-sidebar.jpg);
          }
        }
        &:last-of-type {
          background-color: var(--fut-background-lightest-2);
          background-image: url(/Sk/sports-sidebar.png);

          &:hover, &.active {
            background-image: url(/Sk/sports-hover-sidebar.jpg);
          }
        }
      }
    }

    .icon {
      width: 14px;
      height: 14px;
    }
  }

  .closed-nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: .5rem;
    padding: 1rem 0 .5rem 0;

    .links {
      min-height: 2.75rem;
      width: 2.75rem;
      text-decoration: none;
      color: var(--fut-color-dynamic);
      font-weight: 700;
      border-radius: .25rem;
      display: flex;
      flex-grow: 1;
      align-items: center;
      background-size: cover;
      background-repeat: no-repeat;

      span {
        margin-left: 3px;
        font-size: 15px;
      }

      &:first-of-type {
        background-color: var(--fut-background-lightest-2);
        background-image: url(/Sk/casino-small-sidebar.png);

        &:hover, &.active {
          background-image: url(/Sk/casino-hover-small-sidebar.jpg);
        }
      }
      &:last-of-type {
        background-color: var(--fut-background-lightest-2);
        background-image: url(/Sk/sports-small-sidebar.png);

        &:hover, &.active {
          background-image: url(/Sk/sports-hover-small-sidebar.jpg);
        }
      }
    }
  }

  .sidebar-body {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: auto;
    background: var(--fut-background-darkest);
    gap: .5rem;
    scrollbar-gutter: stable;

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

    .sidebar-list {
      background: var(--fut-background-darker);
      border-radius: .25rem;
    }

    .casino-categories-list {
      list-style: none;
      padding: 0;
      margin: 0;

      .c-link {
        display: flex;
        align-items: center;

        .icon {
          color: var(--fut-secondary);
          margin-right: 8px;
        }

        &:hover {
          .icon {
            color: var(--fut-color-dynamic);
          }
        }
      }
    }
  }

  .sidebar-btn {
    text-decoration: none;
    color: var(--fut-color-dynamic);
    font-weight: 600;
    font-size: .875rem;
    padding: 10px 14px;
    width: 100%;
    border-radius: .25rem;
    text-transform: capitalize;
    display: flex;
    gap: .5rem;
    align-items: center;
    border: none;
    background: transparent;

    span {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .icon {
      color: var(--fut-secondary);
    }

    &:hover {
      background: var(--fut-background);

      .icon {
        color: var(--fut-color-dynamic);
      }
    }
    &:active {
      span {
        display: flex;
        transform: scale(.95);
      }
    }
    &.active {
      background: var(--fut-background);

      .icon {
        color: var(--fut-color-dynamic);
      }
    }
  }

  .closed-sidebar-body {
    nav {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: .5rem;
      padding: 1rem 0 .5rem 0;

      .links {
        min-height: 2.75rem;
        width: 2.75rem;
        text-decoration: none;
        color: var(--fut-color-dynamic);
        font-weight: 700;
        border-radius: .25rem;
        display: flex;
        flex-grow: 1;
        align-items: center;
        background-size: cover;
        background-repeat: no-repeat;

        span {
          margin-left: 3px;
          font-size: 15px;
        }

        &:first-of-type {
          background-image: url(/Sk/casino-small-sidebar.jpg);

          &:hover, &.active {
            background-image: url(/Sk/casino-hover-small-sidebar.jpg);
          }
        }
        &:last-of-type {
          background-image: url(/Sk/sports-small-sidebar.jpg);

          &:hover, &.active {
            background-image: url(/Sk/sports-hover-small-sidebar.jpg);
          }
        }
      }
    }

    .closed-list {
      padding: 0 .5rem;

      .sidebar-list {
        background: var(--fut-background-darker);
        border-radius: .25rem;
      }
    }
  }
}

.sport-icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}
.league-wrapper {
  display: flex;
  justify-content: space-between;
  width: 100%;

  .league-name {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .games {
    color: var(--fut-color-dynamic);
    background: var(--fut-background-black-2);
    padding: 0 4px;
    border-radius: 2em;
    min-width: 1.8em;
    font-size: 1rem;
    margin-left: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.open {
  min-width: 240px;
  max-width: 240px;
}
.closed {
  min-width: 60px;
}

.mobile-open {
  position: fixed;
  top: 60px;
  left: 0;
  display: flex;
  height: calc(100vh - 128px) !important;
  width: 100%;
  z-index: 3;
}
.mobile-closed {
  display: none !important;
}

.median-sidebar {
  position: fixed;
  top: 0;
  left: 0;

  .bg-overlay {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background: var(--fut-background-transparent);
    z-index: -1;
  }
}

.countries, .leagues {
  border-bottom: 2px solid var(--fut-background-lightest-2);
}

.leagues {
  background: var(--fut-background);

  .sidebar-btn:hover {
    background: var(--fut-background-lightest-2) !important;
  }
}

.languages-list {
  list-style: none;
  padding: 0;
  margin: 0;
  background: var(--fut-background);
  border-radius: .25rem;

  .sidebar-btn {
    justify-content: space-between;

    .select-circle {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 1.25rem;
      height: 1.25rem;
      border-radius: 50%;
      background: var(--fut-background);
      border: 2px solid var(--fut-background-lightest-2);
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .2), 0 1px 2px 0 rgba(0, 0, 0, .12);

      span {
        display: flex;
        width: .5rem;
        height: .5rem;
        border-radius: 50%;
        background: var(--fut-color-dynamic);
        box-shadow: 0 0 4px var(--fut-color-dynamic);
      }
    }

    &:hover {
      background: var(--fut-background-lightest-2) !important;
      .select-circle {
        border-color: var(--fut-background-white-2);
      }
    }
    &.selected {
      .select-circle {
        background: var(--fut-background-lightest-2) !important;
        border-color: var(--fut-background-lightest-2) !important;
      }
    }
  }
}

@media (max-width: 821px) {
  #sk-sidebar {
    .sidebar-header {
      nav {
        padding: 0 1rem;
      }
    }
  }
}
</style>
