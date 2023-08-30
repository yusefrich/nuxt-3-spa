<template>
  <ul>
    <li class="mb-3">
      <div class=" d-flex">
        <i class="search-icon" data-feather="search" />
        <input
          id="navbarForm"
          v-model="search"
          type="text"
          class="form-control"
          :placeholder="$t('i18n_procure_seu_provedor_favorito')"
        >
      </div>
    </li>
    <li class="nav-category">
      {{ $t('i18n_provedores') }}
    </li>
    <li
      v-for="(item, idx) in providers"
      :key="idx"
    >
      <n-link :to="localePath(`/casino/provider/${item.slug}`)" class="provider-link">
        <img
          :src="item.img"
          width="40px"
        >
        <span>{{ item.provider }}</span>
        <font-awesome-icon class="ms-auto px-3 chevron-icon" :icon="['fas', 'chevron-right']" />
      </n-link>
    </li>
    <li v-if="width < 426" class="nav-item nav-category">
      {{ $t('i18n_idioma') }}
    </li>
    <li v-if="width < 426" class="nav-item dropdown mx-0 mb-3">
      <md-lang-switcher
        @changeLanguage="$emit('changeLanguage', $event)"
      />
    </li>
  </ul>
</template>

<script>
import MdLangSwitcher from '@/components/md/atoms/MdLangSwitcher.vue'
import windowWidth from '@/mixins.js/windowWidth.js'

export default {
  name: 'MdProvidersCasino',
  components: {
    MdLangSwitcher
  },
  mixins: [windowWidth],
  props: {
    providers: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      search: '',
      searchTimeout: null
    }
  },
  watch: {
    search (val) {
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout)
      }

      this.searchTimeout = setTimeout(() => {
        this.$emit('searchCasinoGames', val)
      }, 1000)
    }
  },
  created () {
    this.$emit('searchCasinoGames', '')
  }
}
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  max-height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 10px 0 150px 20px;
  margin-bottom: 0;

  li {
    margin: 3px 0;
    .provider-link {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: var(--md-font-color);
      padding: 5px 0;
      font-size: 14px;
      font-weight: 400;
      max-width: 200px;
      height: 32px;
      -webkit-transition: all .3s ease;
      transition: all .3s ease;
      img {
        max-height: 100%;
        margin-left: 3px;
      }
      span {
        margin-left: 5px;
      }
      .chevron-icon {
        display: none;
      }
      &:hover {
        color: var(--fut-primary);
        font-weight: 600;
        background: var(--md-bg-color);
        border: 1px solid var(--md-comp-border-color);
        border-radius: 3px;
        -webkit-box-shadow: 0 1px 2.5px var(--md-strong-shadow-color);
        box-shadow: 0 1px 2.5px var(--md-strong-shadow-color);
        .chevron-icon {
          display: block;
        }
        span {
          margin-left: 10px;
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
.nav-category {
  color: var(--md-menu-idx-font-color);
  font-size: 11px;
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: .5px;
  margin-bottom: 5px;
  height: 15px;
}
.search-icon {
  min-width: 18px !important;
  min-height: 18px !important;
  margin-left: 6px;
}
.form-control {
  color: var(--md-font-color);
  border: 0;
  padding-top: 2px;
  font-size: 14px;
  box-shadow: 0 0 0 0;
  background: var(--md-comp-bg-color);
}
</style>
