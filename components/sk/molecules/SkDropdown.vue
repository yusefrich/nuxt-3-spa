<template>
  <div class="sk-dropdown">
    <slot name="title" />

    <ul
      class="dropdown-menu"
      :class="isMobile ? 'mobile-position' : 'desktop-position'"
      :aria-labelledby="dropdownId"
    >
      <li
        v-for="(item, idx) in items"
        :key="idx"
        class="list-item transition"
        :class="{ active: currentRoute(item.link) }"
      >
        <NuxtLink
          v-if="item.link"
          :to="localePath(item.link)"
          class="list-btn"
        >
          <font-awesome-icon class="icon transition" :icon="item.icon" />
          <span>{{ item.text }}</span>
        </NuxtLink>
        <button
          v-else
          class="list-btn"
          @click="item.action()"
        >
          <font-awesome-icon v-if="item.icon" class="icon transition" :icon="item.icon" />
          <span>{{ item.text }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SkDropdown',
  props: {
    dropdownId: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      default: () => ([])
    },
    isMobile: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    currentRoute (route) {
      return route === this.$route.fullPath || route === `${window.location.origin}${this.$route.fullPath}`
    }
  }
}
</script>

<style lang="scss" scoped>
.sk-dropdown {
  position: relative;

  .dropdown-menu {
    border-radius: 5px;

    .list-item {
      display: flex;
      align-items: center;

      .list-btn {
        border: none;
        background: transparent;
        text-decoration: none;
        padding: 7px 14px;
        color: var(--fut-background-lightest-2);
        font-size: .875rem;
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

        span {
          white-space: nowrap;
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

    // &::after {
    //   position: absolute;
    //   content: "";
    //   width: 10px;
    //   height: 10px;
    //   background: #fff;
    //   top: -4px;
    //   left: 75px;
    //   transform: rotate(45deg);
    // }
  }
}

.mobile-position {
  inset: 8px -14px auto auto !important;
}
.desktop-position {
  inset: 8px -58px auto auto !important;
}
</style>
