<template>
  <button
    class="odd-button fw-bold transition"
    :style="`
      width: ${width};
      background: ${background};
      border-radius: ${borderRadius};
    `"
    :class="[
      'position-relative',
      {
        selected: selected,
        disabled: disabled || !odd.odds
      },
      getLevarage(odd.leverage)
    ]"
    :disabled="disabled || !odd.odds"
    @click="$emit('click')"

  >
    <slot>
      <div v-if="odd.super_odd" class="super-odd transition">
        <span v-if="!hideBtnText" class="name-header transition">
          {{ odd.name ? odd.name : odd.header || odd.desc }}
        </span>
        <div class="odds">
          <span class="old-odd transition">{{ odd.odds }}</span>
          <span>{{ odd.super_odd.odd }}</span>
        </div>
      </div>
      <div
        v-else
        class="btn-text"
        :class="{ 'd-flex justify-content-center': hideBtnText }"
      >
        <span v-if="!hideBtnText" class="name-header transition">
          {{ odd.name ? odd.name : odd.header || odd.desc }}
        </span>
        <span>
          {{ odd.odds ? odd.odds : '-' }}
        </span>
      </div>
    </slot>
  </button>
</template>

<script>
export default {
  name: 'MdOddsButton',
  props: {
    odd: {
      type: Object,
      default: () => ({})
    },
    selected: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '105px'
    },
    background: {
      type: String,
      default: 'var(--md-filter-bg-color)'
    },
    borderRadius: {
      type: String,
      default: '4px'
    },
    hideBtnText: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'click'
  ],
  methods: {
    getLevarage (levarage) {
      if (levarage === 'up') {
        return 'background-lev-success'
      }
      if (levarage === 'down') {
        return 'background-lev-danger'
      }
      return levarage
    }
  }
}
</script>

<style lang="scss" scoped>
.odd-button {
  border: none;
  min-width: 70px;
  height: 35px;
  margin: 0 2px;
  border-radius: 4px;
  color: var(--md-highlight);
  white-space: nowrap;
  .btn-text {
    display: flex;
    justify-content: space-between;
    .name-header {
      color: var(--md-menu-idx-font-color);
      font-size: 12px;
      margin-top: 2px;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      padding-right: 4px;
    }
  }
  .super-odd {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .name-header {
      color: var(--md-menu-idx-font-color);
      font-size: 12px;
      margin-top: 2px;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      padding-right: 4px;
    }
    .odds {
    display: flex;
    flex-direction: column;
      .old-odd {
        font-size: 9px;
        margin: 0 0 -4px 0;
        text-decoration: line-through;
      }
    }
  }
}
.selected {
  background: var(--md-highlight) !important;
  color: #fff;
  .name-header {
    color: #fff !important;
  }
}
.disabled {
  background: var(--md-filter-bg-color);
  cursor: inherit;
  color: var(--md-highlight);
  &:hover {
    background: var(--md-filter-bg-color) !important;
    color: var(--md-highlight);
    .name-header {
      color: var(--md-menu-idx-font-color) !important;
    }
  }
}

.background-lev-danger:before{
  content: "";
  width: 0;
  height: 0;
  border-bottom: 10px solid #c62828;
  border-left: 10px solid transparent;
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 0;
  animation: fade 1s 5;
}
.background-lev-success:before{
  content: "";
  width: 0;
  height: 0;
  border-top: 10px solid #558b2f;
  border-left: 10px solid transparent;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 0;
  animation: fade 1s 5;
}

@media (min-width: 769px) {
  .odd-button:hover {
    background: var(--md-highlight) !important;
    color: #fff;
    .name-header {
      color: #fff;
    }
    &:active {
      background: var(--md-highlight-lighter) !important;
      .name-header {
        color: #fff;
      }
    }
  }
  .selected:hover {
    background: var(--md-highlight-lighter) !important;
    color: #fff;
    .name-header {
      color: #fff;
    }
  }
  .selected:active {
    background: var(--md-highlight) !important;
    .name-header {
      color: #fff;
    }
  }
}

// @media (max-width: 1024px) {
//   .odd-button {
//     width: 70px !important;
//   }
// }

@media (max-width: 768px) {
  .odd-button {
    width: 100% !important;
  }
}
</style>
