<template>
  <div
    class="dropdown"
  >
    <button
      id="sk-lang-switcher-dropdown"
      class="dropdown-toggle transition"
      :class="{ 'selected-lang': !flat }"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <span>{{ selectedLang }}</span>
      <font-awesome-icon class="icon transition" :icon="['fas', 'chevron-down']" />
    </button>

    <ul
      class="dropdown-menu"
      :class="{ 'menu-position': !flat }"
      aria-labelledby="sk-lang-switcher-dropdown"
    >
      <li
        v-for="(locale, idx) in $i18n.locales"
        :key="idx"
        class="list-item transition"
        :class="{ active: languages[locale] === selectedLang }"
      >
        <button
          class="dropdown-item list-btn"
          @click="$emit('changeLanguage', locale)"
        >
          {{ languages[locale] }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SkLangSwitcher',
  props: {
    sidebarOpen: {
      type: Boolean,
      default: true
    },
    flat: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'changeLanguage'
  ],
  computed: {
    languages () {
      return {
        PT: this.$t('i18n_portugues'),
        EN: this.$t('i18n_ingles'),
        ES: this.$t('i18n_espanhol')
      }
    },
    selectedLang () {
      return this.languages[this.$i18n.locale]
    }
  }
}
</script>

<style lang="scss" scoped>
button {
  position: relative;
  border: none;
  background: transparent;
  color: var(--fut-color-dynamic);
  font-weight: 700;
  font-size: .875rem;
  padding: 0;
  display: flex;
  align-items: center;

  .icon {
    width: 12px;
    height: 12px;
    color: var(--fut-secondary);
    margin-left: 10px;
  }
  &:hover {
    .icon {
      color: var(--fut-color-dynamic);
    }
  }
  &:active {
    span {
      transform: scale(.95);
    }
  }
  &[aria-expanded="true"] {
    span {
      margin-left: 0;
    }
    .icon {
      transform: rotate(180deg);
    }
  }
  &::after {
    display: none;
  }
}
.selected-lang {
  font-weight: 600;
  padding: 10px 14px;
  width: 100%;
  border-radius: .25rem;

  &:hover {
    background: var(--fut-background);
  }
}

.menu-position {
  left: 50% !important;
  margin-left: -50px !important;
  margin-top: 4px !important;
  margin-bottom: 4px !important;
}
.dropdown-menu {
  min-width: auto;

  .list-item {
    display: flex;
    align-items: center;

    .list-btn {
      border: none;
      background: transparent;
      text-decoration: none;
      padding: 7px 14px;
      color: var(--fut-background-lightest-2);
      font-size: 15px;
      font-weight: 600;
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .icon {
        width: 14px;
        height: 14px;
        margin-right: 8px;
        color: var(--fut-secondary);
      }
    }

    &:hover {
      background: #d5dceb;

      .icon {
        color: var(--fut-background-lightest-2);
      }
    }
    &:active {
      span {
        transform: scale(.95);
      }
    }
    &.active {
      background: transparent !important;

      .list-btn {
        color: var(--fut-primary);
      }
    }
  }

  // &::before {
  //   position: absolute;
  //   content: "";
  //   width: 10px;
  //   height: 10px;
  //   background: #fff;
  //   top: -4px;
  //   left: 50%;
  //   margin-left: -5px;
  //   transform: rotate(45deg);
  // }
}
</style>
