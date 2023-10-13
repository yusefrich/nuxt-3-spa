<template>
  <aside
    v-if="currentSettings"
    :class="[
      isMobile ? 'sidebar-mobile' : 'sidebar-desk',
      { 'closed-sidebar': !sidebar },
      'transition'
    ]"
  >
    <div
      class="sidebar-header transition"
    >
      <NuxtLink :to="localePath('/')" class="sidebar-brand transition">
        <img
          class="sidebar-logo ms-2 w-100"
          :class="{'sidebar-logo-color': currentSettings.background_logo === 1 || currentSettings.background_logo === null}"
          :src="currentSettings.logo"
          alt="Logo"
        >
      </NuxtLink>

      <MdBurger
        :sidebar="sidebar"
        @click="sidebar = !sidebar"
      />
    </div>

    <div class="sidebar-body transition">
      <md-providers-casino
        v-if="casino"
        :providers="providers"
        @changeLanguage="$emit('changeLanguage', $event)"
        @searchCasinoGames="$emit('searchCasinoGames', $event)"
      />
      <div v-else class="body-wrapper">
        <div class="search-field">
          <div @click.stop="redirectToSearch()">
            <img src="/md/icon-search.png" alt="Search icon">
            <!-- <font-awesome-icon class="search-icon" :icon="['fas', 'search']" /> -->
          </div>
          <input
            id="navbarForm"
            v-model="search"
            type="text"
            class="form-control"
            :placeholder="$t('i18n_procure_seu_jogo_favorito')"
            @keyup.enter="redirectToSearch()"
          >
        </div>

        <ul
          v-if="currentSettings.nav_bar && currentSettings.nav_bar.length && isMobile"
          class="games transition mb-2"
        >
          <li
            v-for="(item, idx) in navItems"
            :key="idx"
          >
            <a class="dynamic-link" :href="item.nav_link">
              <div class="img-wrapper">
                <img
                  v-if="item.img"
                  :src="item.img"
                  width="15"
                  height="15"
                  alt="Icon"
                >
              </div>
              <span>{{ item.nav_name }}</span>
            </a>
          </li>
        </ul>

        <ul class="games transition">
          <li v-if="preMatchMainLeagues && preMatchMainLeagues.length > 0" class="title">
            <span>{{ $t('i18n_principais_ligas').toUpperCase() }}</span>
          </li>
          <li
            v-for="(league, lIdx) in preMatchMainLeagues"
            :key="`main-league-${lIdx}`"
          >
            <NuxtLink :to="localePath(`/sport/${league.sport_id}/league/${league.id}`)" class="league-item transition">
              <img v-if="league.icon" :src="league.icon" alt="Sport icon" class="sport-icon">
              <font-awesome-icon v-else class="fire" :icon="['fas', 'fire-alt']" />
              <span class="name transition">{{ league.name }}</span>
              <span class="amount ms-auto">{{ league.total }}</span>
              <font-awesome-icon :icon="['fas', 'chevron-right']" class="arrow-right ms-auto" />
            </NuxtLink>
          </li>
          <li v-if="allSportsData && allSportsData.length > 0" class="title pt-2">
            <span>{{ $t('i18n_esporte', 2).toUpperCase() }}</span>
          </li>
          <li
            v-for="(sport, sIdx) in allSportsData"
            :key="`sport-${sIdx}`"
          >
            <MdListDropdown
              :sport="sport"
            />
          </li>
        </ul>

        <md-lang-switcher
          v-if="langSwitcher"
          class="mt-2"
          @changeLanguage="$emit('changeLanguage', $event)"
        />
      </div>
    </div>
  </aside>
</template>

<script>
import MdBurger from '@/components/md/atoms/MdBurger'
import MdProvidersCasino from '@/components/md/molecules/MdProvidersCasino'
import MdListDropdown from '@/components/md/molecules/MdListDropdown'
import MdLangSwitcher from '@/components/md/atoms/MdLangSwitcher'

export default {
  name: 'MdSidebar',
  components: {
    MdBurger,
    MdProvidersCasino,
    MdListDropdown,
    MdLangSwitcher
  },
  props: {
    modelValue: {
      type: Boolean,
      default: true
    },
    currentSettings: {
      type: Object,
      default: () => ({})
    },
    preMatchMainLeagues: {
      type: Array,
      default: () => ([])
    },
    allSportsData: {
      type: Array,
      default: () => ([])
    },
    casino: {
      type: Boolean,
      default: false
    },
    isMobile: {
      type: Boolean,
      default: false
    },
    langSwitcher: {
      type: Boolean,
      default: false
    },
    providers: {
      type: Array,
      default: () => ([])
    }
  },
  emits: [
    'changeLanguage',
    'searchCasinoGames',
    'update:modelValue'
  ],
  data () {
    return {
      search: ''
    }
  },
  computed: {
    sidebar: {
      get () {
        return this.modelValue
      },
      set (value) {
        this.$emit('update:modelValue', value)
      }
    },
    navItems () {
      if (this.currentSettings.nav_bar && this.currentSettings.nav_bar.length) {
        const regex = new RegExp(window.location.origin, 'g')

        return this.currentSettings.nav_bar.filter(item =>
          item.nav_link &&
          item.nav_link.replace(regex, '') !== '/' &&
          // item.nav_link.replace(regex, '') !== '/sport/6046/aovivo' &&
          item.nav_link.replace(regex, '') !== '/casino' &&
          item.nav_link.replace(regex, '') !== '/casino-aovivo' &&
          item.nav_link.replace(regex, '') !== '/promo'
        )
      }

      return []
    }
  },
  mounted () {
    // eslint-disable-next-line
    feather.replace()
  },
  methods: {
    redirectToSearch () {
      this.$router.push(`/search/${this.search}`)
      this.search = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar-desk {
  min-width: 240px;
  background: var(--md-comp-bg-color);
  color: var(--md-font-color);
}
.sidebar-desk.closed-sidebar {
  min-width: 70px;
  width: 70px;

  .sidebar-header {
    .sidebar-brand {
      width: 0;
      opacity: 0;
      z-index: -1;
    }
  }
  .sidebar-body {
    width: 70px;
    overflow: hidden;

    .body-wrapper {
      overflow: hidden;

      .games {
        .title {
          span {
            opacity: 0;
          }

          &::before {
            opacity: 1;
          }
        }
      }
    }
  }
  .sidebar-body:hover {
    border-right: 1px solid var(--md-comp-border-color);
    width: 240px !important;
    z-index: 2;

    .body-wrapper {
      overflow: auto;

      .games {
        .title {
          span {
            opacity: 1;
          }

          &::before {
            opacity: 0;
          }
        }
      }
    }
  }
}

.sidebar-mobile {
  position: fixed;
  top: 0;
  left: 0;
  min-width: 240px;
  height: 100%;
  background: var(--md-comp-bg-color);
  color: var(--md-font-color);
  z-index: 6001;
}
.sidebar-mobile.closed-sidebar {
  display: none;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--md-comp-border-color);
  height: 60px;

  .sidebar-brand {
    display: flex;
    justify-content: center;
    width: 170px;
    font-weight: 700;
    font-size: 25px;
    color: var(--fut-primary-darkest);

    .sidebar-logo {
      max-height: 60px;
      max-width: 170px;
      background-size: cover;
      padding: 4px;
      border-radius: 4px;
    }
    .sidebar-logo-color {
      background: var(--fut-background-logo);
    }
  }
}
.sidebar-body {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 240px;
  height: calc(100% - 60px);
  background: var(--md-comp-bg-color);
  border-right: 1px solid var(--md-comp-border-color);
  box-shadow: 5px 1px 5px var(--md-shadow-color);
  z-index: 2;
  overflow: hidden;

  .body-wrapper {
    padding: 25px 14px 50px 14px;
    overflow-y: auto;

    .search-field {
      display: flex;
      align-items: center;
      width: 100%;
      padding: 0 0 22px 10px;
      opacity: 1;
      z-index: 2;

      .search-icon {
        width: 18px !important;
        height: 18px !important;
        cursor: pointer;
        transition: all ease-out 300ms !important;
      }
      .form-control {
        width: 100%;
        color: var(--md-font-color);
        border: 0;
        padding: 2px 0 0 12px !important;
        font-size: 14px;
        box-shadow: 0 0 0 0;
        background: var(--md-comp-bg-color);
        transition: all ease-out 300ms !important;
      }
    }
    .games {
      list-style: none;
      margin: 0;
      padding: 0 0 4px 0;
      overflow: hidden;

      .title {
        position: relative;
        padding-bottom: 5px;
        font-size: 11px;
        color: var(--md-menu-idx-font-color);
        white-space: nowrap;

        &::before {
          position: absolute;
          top: 6px;
          left: 18px;
          content: '';
          width: 5px;
          height: 5px;
          border-radius: 3px;
          background: var(--md-menu-idx-font-color);
          opacity: 0;
        }
      }
      .league-item {
        padding: 3px 9px;
        display: flex;
        flex-wrap: nowrap;
        text-decoration: none;
        color: var(--md-font-color);
        cursor: pointer;

        span {
          font-size: 14px;
        }
        .name {
          font-weight: bold;
          white-space: nowrap;
          margin-left: 10px;
          width: 130px;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .amount {
          display: block;
        }
        .arrow-right {
          width: 11px;
          height: 11px;
          margin-top: 5px;
          display: none;
        }

        &:hover {
          color: var(--fut-primary);

          .name {
            margin-left: 15px;
          }
          .amount {
            display: none;
          }
          .arrow-right {
            display: block;
          }
        }
      }
    }

    @media (min-width: 769px) {
      &::-webkit-scrollbar-track {
        opacity: .3;
        border-radius: 0.125rem;
        background-color: lightgray;
      }
      &::-webkit-scrollbar {
        opacity: .3;
        width: 3px;
        transition: all ease-in-out 400ms;
      }
      &::-webkit-scrollbar-thumb {
        opacity: .3;
        background-color: gray;
      }
    }
  }
}

.sport-icon {
  width: 20px;
  height: 20px;
}
.fire {
  width: 20px;
  height: 20px;
  padding: 2px;
  color: rgb(255, 157, 0);
}

.dynamic-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  margin-bottom: -4px;
  color: var(--md-menu-idx-font-color);
  transition: all 280ms;
  padding: 0 6px;
  &:hover {
    font-weight: 600;
    color: var(--fut-primary);
  }

  @media (max-width: 425px) {
    font-weight: bold;
    font-size: 14px;
    color: var(--md-font-color);
    margin-bottom: 7px;

    .img-wrapper {
      min-width: 35px;

      img {
        margin-left: 6px;
      }
    }
  }
}
</style>
