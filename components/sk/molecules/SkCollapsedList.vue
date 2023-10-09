<template>
  <div>
    <button
      v-if="!noCollapse || !closedSidebar"
      class="sk-collapse-btn transition"
      :class="{ 'flat': noCollapse }"
      :style="`
        padding: ${closedSidebar ? '10px 10px 10px 14px' : '10px 14px'};
      `"
      :data-bs-toggle="noCollapse ? '' : 'collapse'"
      :data-bs-target="`#${name}`"
      aria-expanded="false"
      :aria-controls="name"
      @click="closedSidebar ? $emit('openSidebar', ) : ''"
    >
      <div class="title-wrapper">
        <font-awesome-icon v-if="Array.isArray(titleIcon)" class="title-icon transition" :icon="titleIcon" />
        <img v-else-if="titleIcon" :src="titleIcon" alt="Sport icon" class="sport-icon">
        <span class="transition">{{ title }}</span>
      </div>
      <font-awesome-icon
        v-if="!noCollapse"
        class="icon transition"
        :icon="['fas', 'chevron-right']"
        :class="{ 'open-icon': !closedSidebar }"
      />
    </button>

    <div
      :id="name"
      class="list-wrapper"
      :class="{ 'collapse': !noCollapse }"
    >
      <div v-if="!closedSidebar" class="hr" />
      <ul
        v-if="items.length"
        class="sk-collapse-list"
      >
        <li
          v-for="(item, idx) in items"
          :key="idx"
          class="list-item"
          :class="{
            active: currentRoute(item.link),
            'with-border': borderBottom
          }"
        >
          <NuxtLink
            v-if="item.link"
            :to="localePath(item.link)"
            class="list-btn transition"
          >
            <font-awesome-icon v-if="item.icon" class="icon transition" :icon="item.icon" />
            <span>{{ item.text }}</span>
          </NuxtLink>
          <button
            v-else
            class="list-btn transition"
            @click="item.action()"
          >
            <font-awesome-icon v-if="item.icon" class="icon" :icon="item.icon" />
            <span>{{ item.text }}</span>
          </button>
        </li>
      </ul>
      <slot v-else />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SkCollapsedList',
  props: {
    name: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      default: () => ([])
    },
    titleIcon: {
      type: [String, Array],
      default: ''
    },
    closedSidebar: {
      type: Boolean,
      default: false
    },
    noCollapse: {
      type: Boolean,
      default: false
    },
    borderBottom: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'openSidebar'
  ],
  methods: {
    currentRoute (route) {
      return route === this.$route.fullPath || route === `${window.location.origin}${this.$route.fullPath}` || route === this.$route.fullPath.split('?')[0]
    }
  }
}
</script>

<style lang="scss" scoped>
.sk-collapse-btn {
  border: none;
  background: transparent;
  color: var(--fut-color-dynamic);
  font-weight: 600;
  font-size: .875rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-radius: .25rem;

  .title-wrapper {
    display: flex;
    align-items: center;
    gap: .5rem;
    width: 90%;

    .title-icon {
      width: 14px;
      height: 14px;
      color: var(--fut-secondary);
    }
    span {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }

  .icon {
    width: 10px;
    height: 10px;
    color: var(--fut-secondary);
  }
  .open-icon {
    background: var(--fut-background-lightest-2);
    padding: .35rem;
    border-radius: 50%;
  }

  &:hover {
    background: var(--fut-background);
    border-radius: .25rem;

    .icon, .title-icon {
      color: var(--fut-color-dynamic);
    }
  }
  &[aria-expanded="true"] {
    background: var(--fut-background);

    .title-icon {
      color: var(--fut-color-dynamic);
    }
    span {
      margin-left: 0;
    }
    .icon {
      color: var(--fut-color-dynamic);
      transform: rotate(90deg);
    }
    .open-icon {
      background: var(--fut-primary-darkest);
    }
  }
}

.list-wrapper {
  .sk-collapse-list {
    color: var(--fut-color-dynamic);
    font-weight: 600;
    font-size: .875rem;
    list-style: none;
    padding: 0;
    margin: 0;
    background: var(--fut-background);

    .list-item {
      display: flex;
      .list-btn {
        text-decoration: none;
        color: var(--fut-color-dynamic);
        font-weight: 600;
        font-size: .875rem;
        padding: 10px 14px;
        width: 100%;
        border-radius: .25rem;
        display: flex;
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
          margin-right: .5rem;
        }

        &:hover {
          background: var(--fut-background-lightest-2);

          .icon {
            color: var(--fut-color-dynamic);
          }
        }
        &:active {
          span {
            transform: scale(.95);
            display: flex;
          }
        }
      }

      &.active {
        background: var(--fut-background-lightest-2);

        .list-btn {
          .icon {
            color: var(--fut-color-dynamic);
          }
        }
      }
    }
  }

  .hr {
    background: var(--fut-background-lightest-2);
    height: 2px;
  }
}

.sport-icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}

.flat {
  cursor: initial !important;
  background: transparent !important;
  font-weight: 700 !important;
}

.with-border {
  &:last-of-type {
    border-top: 2px solid var(--fut-background-lightest-2) !important;
  }
}
</style>
