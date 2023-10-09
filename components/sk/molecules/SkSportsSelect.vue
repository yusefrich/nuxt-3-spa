<template>
  <div>
    <ul class="sports-list">
      <li
        v-for="(sport, idx) in sports"
        :key="idx"
        class="sport-item"
      >
        <button
          class="sport-btn"
          :class="{ selected: selectedSport === sport.id }"
          @click="$emit('changeSport', sport.id)"
        >
          <div v-if="selectedSport === sport.id" class="selected-mark" />
          <span class="sport-games transition">
            {{ sport.total }}
          </span>
          <font-awesome-icon
            v-if="sport.icon && sport.icon.fa"
            class="sport-icon transition"
            :icon="sport.icon && sport.icon.value ? sport.icon.value : ['fas', 'star']"
          />
          <i
            v-else
            class="sport-icon transition"
            :class="sport.icon && sport.icon.value ? sport.icon.value : ['icon', 'icon-soccer']"
          />
          <span class="name transition">
            {{ sport.name }}
          </span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SkSportsSelect',
  props: {
    sports: {
      type: Array,
      default: () => ([])
    },
    selectedSport: {
      type: Number,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.sports-list {
  list-style: none;
  padding: 2rem .5rem calc(1.25rem - 6px);
  margin: 0;
  display: flex;
  background: var(--fut-background-darkest);
  border-radius: .5rem;
  width: 100%;
  overflow-x: auto;

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background: var(--fut-background-lightest-2);
  }

  .sport-item {
    display: flex;

    .sport-btn {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      border: none;
      background: transparent;
      color: var(--fut-secondary);
      font-size: .75rem;
      font-weight: 600;
      width: 67px;

      .selected-mark {
        position: absolute;
        top: calc(-1 * 2rem);
        left: calc(50% - 6px);
        width: 12px;
        height: 6px;
        background: var(--fut-primary);
        border-radius: 0 0 100% 100%;
      }

      .sport-games {
        position: absolute;
        top: -8px;
        left: 55%;
        color: var(--fut-color-dynamic);
        padding: 0 .5em;
        min-width: 1.8em;
        background: var(--fut-background-black-2);
        border-radius: 2em;
      }

      .sport-icon {
        width: 28px;
        height: 28px;
        font-size: 28px;
        color: var(--fut-secondary);
      }

      .name {
        max-width: 67px;
        overflow: hidden;
        padding: 0 4px;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      &:hover {
        color: var(--fut-color-dynamic);

        .sport-icon{
          color: var(--fut-color-dynamic);
        }
      }
      &:active {
        transform: scale(.95);
      }
      &.selected {
        color: var(--fut-color-dynamic);

        .sport-games{
          background: var(--fut-primary-lighter);
          color: var(--fut-color-dynamic-inverse);
        }
        .sport-icon{
          color: var(--fut-color-dynamic);
        }
      }
    }
  }
}
</style>
