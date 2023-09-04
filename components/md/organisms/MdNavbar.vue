<template>
  <nav v-if="currentSettings" class="md-navbar transition">
    <div class="left-side content-side-scroll">
      <MdBurger
        v-if="isMobile && sidebar"
        @click="$emit('openSidebar')"
      />
      <div v-if="!sidebar || sidebarClosed" class="side-logo transition">
        <n-link :to="localePath('/')" class="sidebar-brand">
          <img class="sidebar-logo ms-1" :class="{'sidebar-brand-bg-color': currentSettings.background_logo === 1 || currentSettings.background_logo === null}" :src="currentSettings.logo" alt="Logo" width="100%">
        </n-link>
      </div>

      <ul class="navigation-list">
        <li v-if="productRedirect && !isMobile">
          <div
            class="n-links cursor-pointer"
            @click="$emit('redirectProduct')"
          >
            <font-awesome-icon class="mobile-icon me-1" :icon="['fas', 'globe']" />
            <span style="white-space: nowrap;">{{ productRedirect.title }}</span>
          </div>
        </li>
        <li
          v-for="(item, idx) in navItems"
          :key="idx"
        >
          <n-link
            :to="localePath(item.link)"
            :class="{ active: currentRoute(item.link) }"
            class="n-links"
          >
            <img
              v-if="item.img"
              :src="item.img"
              alt="Icon"
              class="nav-icon-img"
            >
            <font-awesome-icon
              v-else-if="item.icon"
              class="nav-mobile-icon me-1"
              :icon="item.icon"
            />
            <span style="white-space: nowrap;">{{ item.text }}</span>
          </n-link>
        </li>
      </ul>
    </div>

    <div class="right-side">
      <md-lang-switcher
        class="lang-switcher"
        @changeLanguage="$emit('changeLanguage', $event)"
      />

      <md-theme-switcher
        class="theme-switcher"
        :theme="theme"
        @changeTheme="$emit('changeTheme', $event)"
      />

      <div v-if="loggedInUser && !isMobile" class="balance transition">
        <p class="fw-bold">
          R$
        </p><span> {{ loggedInUser.balance }}</span>
      </div>

      <div
        v-if="loggedInUser"
        class="btn-deposit transition"
        @click="
          $emit('changeTab', 'Deposits'),
          $router.push(localePath(`/user?tab=Deposits`))
        "
      >
        <font-awesome-icon class="mx-1 d-none d-md-block" :icon="['fa-solid', 'piggy-bank']" />{{ $t('i18n_depositar') }}
      </div>

      <MdUserDropdown
        v-if="loggedInUser"
        :logged-in-user="loggedInUser"
        @logout="$emit('logout')"
        @changeTab="$emit('changeTab', $event)"
      />

      <div v-else class="d-flex">
        <n-link :to="localePath('/login')" class="login-btn mx-2 transition">
          Login
        </n-link>
        <n-link :to="localePath('/register')" class="register-btn transition">
          {{ $t('i18n_registrar') }}
        </n-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'MdNavbar',
  props: {
    isMobile: {
      type: Boolean,
      default: false
    },
    loggedInUser: {
      type: Object,
      default: () => ({})
    },
    currentSettings: {
      type: Object,
      default: () => ({})
    },
    sidebar: {
      type: Boolean,
      default: false
    },
    sidebarClosed: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
      default: ''
    }
  },
  computed: {
    productRedirect () {
      if (!process.env.PRODUCT_REDIRECT_URL && !process.env.PRODUCT_REDIRECT_TITLE) {
        return null
      }
      return { title: process.env.PRODUCT_REDIRECT_TITLE }
    },
    navItems () {
      const items = []

      if (!this.applicationType('casino') || this.applicationType('sports')) {
        items.push(
          { link: '/', text: this.$t('i18n_esporte', 2), icon: ['fas', 'futbol'] },
          { link: '/sport/6046/aovivo', text: this.$t('i18n_ao_vivo'), icon: ['fas', 'podcast'] }
        )
      }

      if (!this.applicationType('sports') || this.applicationType('casino')) {
        items.push(
          { link: '/casino', text: this.$t('i18n_cassino'), icon: ['fas', 'dice'] },
          { link: '/casino/category/live', text: this.$t('i18n_cassino_ao_vivo'), icon: ['fas', 'coins'] }
        )
      }

      items.push({ link: '/promo', text: this.$t('i18n_promocao', 2), icon: ['fas', 'gamepad'] })

      if (this.currentSettings.nav_bar && this.currentSettings.nav_bar.length) {
        this.currentSettings.nav_bar.forEach((nav) => {
          if (!nav.nav_link) {
            return
          }

          const regex = new RegExp(window.location.origin, 'g')
          const foundItemIdx = items.findIndex(item => item.link === nav.nav_link.replace(regex, ''))

          if (nav.nav_link.replace(regex, '') === '') {
            items[0] = {
              link: '/',
              text: nav.nav_name,
              img: nav.img
            }
          }

          if (foundItemIdx !== -1) {
            items.splice(
              foundItemIdx,
              1,
              {
                link: nav.nav_link.replace(regex, ''),
                text: nav.nav_name,
                img: nav.img
              }
            )
          } else if (!this.isMobile) {
            items.push({
              link: nav.nav_link.replace(regex, ''),
              text: nav.nav_name,
              img: nav.img
            })
          }
        })
      }

      return items
    }
  },
  methods: {
    isOverflown (element) {
      return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth
    },
    applicationType (term) {
      const config = '' + process.env.PRODUCT_CONFIG
      return config.includes(term)
    },
    currentRoute (route) {
      return route === this.$route.fullPath || route === `${window.location.origin}${this.$route.fullPath}`
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/layout/breakpoints";
.nav-icon-img {
  width: 10px;
  height: 10px;
}
.content-side-scroll::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  background-color: #F5F5F5;
}
.content-side-scroll::-webkit-scrollbar {
  height: 4px;
  background-color: #F5F5F5;
}
.content-side-scroll::-webkit-scrollbar-thumb {
  background-color: #000000;
}

.sidebar-brand-bg {
  background: var(--fut-background-logo);
  height: 35px;
  border-radius: 5px;
}
.sidebar-brand-bg-color {
  background: var(--fut-background-logo);
}
.md-navbar {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 60px;
  background: var(--md-comp-bg-color);
  color: var(--md-font-color);
  border-bottom: 1px solid var(--md-comp-border-color);
  box-shadow: 0px 5px 5px var(--md-shadow-color);

  .left-side {
    display: flex;
    // overflow-x: auto;
    // overflow-y: hidden;

    .sidebar-opener {
      margin: 0 20px;
    }

    .side-logo {
      height: 60px;
      max-width: 240px;
      display: flex;
      justify-content: center;
      align-items: center;
      // border-right: 1px solid var(--md-comp-border-color);
      .sidebar-brand {
        opacity: 1;
        visibility: visible;
        -webkit-transition: opacity .5s ease;
        transition: opacity .5s ease;
        font-weight: 700;
        font-size: 25px;
        color: var(--fut-primary-darkest);
        direction: ltr#{'/*rtl:ignore*/'};
        span {
          color: var(--fut-primary);
          font-weight: 300;
        }
        .sidebar-logo {
          max-height: 60px;
          max-width: 150px;
          background-size: cover;
          // background: var(--fut-background-logo);
          padding: 4px;
          border-radius: 4px;
        }
      }
    }

    .navigation-list {
      list-style: none;
      @include md {
        display: flex;
      }
      padding: 0;
      margin: 0 0 0 20px;
      flex-wrap: wrap;
      align-items: center;

      li {
        display: flex;
        @include md {
          // padding-top: 5px;
          display: inline-block !important;
        }
        align-items: center;
        .n-links {
          text-decoration: none;
          color: var(--md-menu-idx-font-color);
          padding: 0 6px;
          transition: all 280ms;
          display: flex;
          flex-direction: column;
          @include md {
            flex-direction: row;
          }
          span {
            margin-top: 5px;
            @include md {
              margin-top: 0px;
            }
            white-space: inherit;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            line-height: 15px;
          }
          &:hover {
            font-weight: 600;
            color: var(--fut-primary);
          }
        }

        .active {
          color: var(--fut-primary-lightest);
          font-weight: 600;
        }
      }
    }
  }

  .right-side {
    display: flex;
    align-items: center;
    margin: 0 24px;

    .theme-switcher, .lang-switcher {
      margin: 0 10px;
      @media (max-width: 540px) {
        display: none;
      }
    }
    .balance {
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--md-font-color);
      padding: 0 12px;
      p {
        margin: 0 3px;
      }
    }

    .btn-deposit {
      display: flex;
      align-items: center;
      border: none;
      background: #fff;
      padding: 5px 10px;
      margin: 0 0 0 12px;
      border-radius: 4px;
      box-shadow: 0 2px 6px 0 var(--md-menu-idx-font-color);
      -webkit-box-shadow: 0 2px 6px 0 var(--md-menu-idx-font-color);
      text-decoration: none;
      color: #000;
      cursor: pointer;

      &:hover {
        background: var(--fut-primary);
        color: #fff !important;
      }
      &:active {
        background: var(--fut-primary-darkest);
      }
    }

    .login-btn, .register-btn {
      text-decoration: none;
      background: var(--fut-primary);
      padding: 5px;
      width: 110px !important;
      text-align: center;
      color: #fff;
      border-radius: 4px;
      &:hover {
        background: var(--fut-primary-lightest);
      }
      &:active {
        background: var(--fut-primary-darkest);
      }
    }
  }
}

@media (max-width: 768px) {
  .md-navbar {
    position: static;
  }
  .navigation-list {
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    height: 80px;
    margin: 0 !important;
    background: var(--md-comp-bg-color);
    border-top: 1px solid var(--md-comp-border-color);
    box-shadow: 0px -5px 5px var(--md-shadow-color);
    z-index: 2;
  }
}

@media(max-width: 425px) {
  .navigation-list {
    font-size: 13px;
  }
  .right-side {
    margin-left: 0 !important;
  }
  .side-logo {
    width: 100% !important;
    // .sidebar-logo {
    //   width: 100% !important;
    // }
  }
}

.cursor-pointer {
  cursor: pointer;
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

  @media (max-width: 768px) {
    flex-direction: column;
  }
}
</style>
