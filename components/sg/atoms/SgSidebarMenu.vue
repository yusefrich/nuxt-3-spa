<template>
  <transition name="fade" oppear>
    <div v-if="settings" class="menu">
      <div class="d-md-none bg-dark back-section" @click="$emit('toggle')" />
      <div class="menu-side">
        <div class="hamb-content d-md-none">
          <button class="bg-transparent border-0 ms-3 py-3 text-primary" @click="$emit('toggle')">
            <font-awesome-icon :icon="['fas', 'bars']" />
          </button>
        </div>
        <div class="menu-side-second mt-4">
          <a class="ms-4 mt-1 d-flex align-items-center transition" :href="localePath('/')">
            <img class="icons-size me-4" src="/Sg/Dice.png" alt="">
            <span class="transition">{{ $t('i18n_Salao_de_jogos') }}</span>
          </a>
          <a class="ms-4 mt-4 d-flex align-items-center transition" :href="localePath('/sport/6046')">
            <img class="icons-size me-4" src="/Sg/ball-w.png" alt="">
            <span class="text-white transition">{{ $t('i18n_esporte', 1) }}</span>
          </a>
          <a class="ms-4 mt-4 d-flex align-items-center transition" :href="localePath('/casino/category/mocked-new')">
            <img class="icons-size me-4" style="object-fit: contain" :src="settings.logo_mobile" alt="">
            <span class="text-white transition">{{ $t('i18n_destaques_da_semana') }}</span>
          </a>
          <a class="ms-4 mt-4 d-flex align-items-center transition" :href="localePath('/casino/category/mocked-most')">
            <img class="icons-size me-4" src="/Sg/chess.png" alt="">
            <span class="text-white transition">{{ $t('i18n_favoritos_da_galera') }}</span>
          </a>
          <a class="ms-4 mt-4 d-flex align-items-center transition" :href="localePath('/casino/category/mocked-new')">
            <img class="icons-size me-4" src="/Sg/NewGames.png" alt="">
            <span class="text-white transition">{{ $t('i18n_jogos_novos') }}</span>
          </a>
          <a class="ms-4 mt-4 d-flex align-items-center transition" :href="localePath('/casino-aovivo')">
            <img class="icons-size me-4" src="/Sg/Casino-w.png" alt="">
            <span class="text-white transition">{{ $t('i18n_cassino_ao_vivo') }}</span>
          </a>
          <a
            v-for="(item, idx) in settings.nav_bar"
            :key="idx"
            class="ms-4 mt-4 d-flex align-items-center transition"
            :href="item.nav_link"
          >
            <img
              v-if="item.img"
              class="icons-size me-4"
              :src="item.img"
            >
            <img
              v-else
              class="icons-size me-4"
              style="object-fit: contain"
              :src="settings.logo_mobile"
            >
            <span class="text-white transition">{{ item.nav_name }}</span>
          </a>
          <a class="ms-4 mt-5 d-flex align-items-center transition" href="#">
            <img class="icons-size me-4" src="/Sg/Chat-w.png" alt="">
            <span class="text-white transition">{{ $t('i18n_suporte') }}</span>
          </a>

          <div class="dropdown">
            <a
              id="dropdownMenuButton1"
              class="ms-4 mt-4 d-flex align-items-center"
              href="#"
              data-bs-toggle="dropdown"
              aria-expanded="true"
            >
              <img v-if="$i18n.locale.toUpperCase() === 'EN'" src="/flags/1.png" class="me-4 icons-size" alt="USA Flag">
              <img v-else-if="$i18n.locale === 'ES'" src="/flags/espanha.png" class="me-4 spanish-flag-selected icons-size" alt="Espanish Flag">
              <img v-else src="/Sg/Br.png" class="me-4 icons-size" alt="Brazilian Flag">
              <span class="me-4 text-white transition">
                {{ $i18n.locale.toUpperCase() }}
              </span>
              <font-awesome-icon class="text-white" :icon="['fas', 'angle-down']" />
            </a>
            <div
              aria-labelledby="dropdownMenuButton1"
              class="dropdown-menu"
            >
              <ul>
                <li
                  v-for="(locale, localeIdx) in $i18n.locales"
                  :key="localeIdx"
                  @click="$emit('changeLanguage', locale)"
                >
                  <span>
                    <img v-if="locale === 'EN'" src="/flags/1.png" alt="Flag image">
                    <img v-else-if="locale === 'ES'" src="/flags/espanha.png" class="spanish-flag" alt="Flag image">
                    <img v-else src="/flags/14.png" alt="Flag image">
                  </span>
                  <span class="transition ms-1">{{ locale }}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="mt-5 mx-2 social-links text-center transition" :class="{ 'social-transparent': !social }">
            <a v-if="settings && settings.telegram" class="transition" :href="'https://t.me/'+settings.telegram" target="_blank">
              <font-awesome-icon :icon="['fab', 'telegram-plane']" />
            </a>
            <a v-if="settings && settings.fb" class="transition" :href="settings.fb" target="_blank">
              <font-awesome-icon :icon="['fab', 'facebook']" />
            </a>
            <a v-if="settings && settings.insta" class="transition" style="padding: 10px 12px" :href="settings.insta" target="_blank">
              <font-awesome-icon :icon="['fab', 'instagram']" />
            </a>
            <a v-if="settings && settings.tt" class="transition" :href="settings.tt" target="_blank">
              <font-awesome-icon :icon="['fab', 'twitter']" />
            </a>
            <a v-if="settings && settings.yt" class="transition" :href="settings.yt" target="_blank">
              <font-awesome-icon :icon="['fab', 'youtube']" />
            </a>
            <a v-if="settings && settings.whats" class="transition" style="padding: 10px 12px" :href="'https://wa.me/'+settings.whats" target="_blank">
              <font-awesome-icon :icon="['fab', 'whatsapp']" />
            </a>
            <a v-if="settings && settings.phone" class="transition" :href="'tel:'+settings.phone" target="_blank">
              <font-awesome-icon :icon="['fas', 'phone']" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'SgSidebarMenu',
  props: {
    social: {
      type: Boolean,
      default: true
    },
    settings: {
      type: Object,
      default: null
    }
  },
  emits: [
    'toggle',
    'changeLanguage'
  ]
}
</script>

<style lang="scss" scoped>
.back-section {
  position: absolute;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  opacity: .8;
  z-index: -1;
}
.menu {
  position: fixed;
  height: 100%;
  z-index: 5;
}
.menu-side {
  overflow-y: auto;
  height: 100%;
  width: 252px;
  background: var(--fut-background-darkest);
  background: linear-gradient(90deg, var(--fut-background-darkest) 28%, var(--fut-background-black) 100%);
}
.menu-side-second {
  display: flex;
  flex-direction: column;
  padding-bottom: 60px;

  a {
    text-decoration: none;

    span {
      color: var(--fut-secondary);
      font-size: 15px;
      font-weight: bold;
    }
    &:hover {
      span {
        margin-left: 5px;
        font-weight: bolder;
      }
    }
  }
}
.hamb-content {
  // height: 52px;
  display: flex;
  // position: absolute;
  // top: -43px;
}
.hamb-size {
  width: 37px;
  height: 23px;
}
.icons-size {
  width: 25px;
  height: 23px;
  object-fit: contain;
  opacity: .9;
}
.social-links {
  line-height: 40px;
  a{
    padding: 10px 10px;
    border-radius: 50px;
    background: var(--fut-background-darker);
    // border: 1px solid var(--fut-primary-transparent);
    margin: 5px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
    &:hover{
      background: var(--fut-primary);
      color: white;
      // transform: scale(1.1) !important;
      // display: inline-grid;
    }
  }
}
.social-transparent {
  opacity: 0;
}

.dropdown-menu {
  background: var(--fut-background-lighter);
  min-width: 124px;
  margin-left: 24px;
  ul {
    margin: 0;
    padding: 0 6px;
    li {
      cursor: pointer;
      width: 100px;
      list-style: none;
      color: #fff;
      img {
        margin: 0 20px;
      }
      &:hover {
        span {
          margin-left: 3px;
          font-weight: bolder;
        }
      }
    }
  }
}
.spanish-flag-selected {
  width: 25px;
  height: 23px;
}
.spanish-flag {
  width: 16px;
  height: 13px;
}
</style>
