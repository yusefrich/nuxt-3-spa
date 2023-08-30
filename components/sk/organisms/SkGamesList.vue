<template>
  <div class="sk-games-list">
    <h1 class="title">
      <font-awesome-icon class="icon" :icon="titleIcon" />
      <span>{{ title }}</span>
    </h1>

    <sk-sports-select
      v-if="sportsList.length"
      :sports="sportsList"
      :selected-sport="selectedSport"
      @changeSport="$emit('changeSport', { sportId: $event })"
    />

    <ul class="events-list">
      <li
        v-for="(item, idx) in events"
        :key="idx"
        class="mt-2 pt-1"
      >
        <sk-leagues-table
          :league="item"
          :comp-id="idx"
          :live="live"
          :show="idx < 5"
          :tickets="tickets"
          :is-mobile="isMobile"
          :events-sport="selectedSport"
          @selectBet="$emit('selectBet', $event)"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import SkSportsSelect from '@/components/sk/molecules/SkSportsSelect.vue'

export default {
  name: 'SkGamesList',
  components: {
    SkSportsSelect
  },
  props: {
    titleIcon: {
      type: Array,
      default: () => ([])
    },
    title: {
      type: String,
      default: ''
    },
    sportsList: {
      type: Array,
      default: () => ([])
    },
    events: {
      type: Array,
      default: () => ([])
    },
    selectedSport: {
      type: Number,
      default: null
    },
    live: {
      type: Boolean,
      default: false
    },
    tickets: {
      type: Array,
      default: () => ([])
    },
    isMobile: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.sk-games-list {
  display: flex;
  flex-direction: column;
  width: 100%;

  .title {
    color: var(--fut-color-dynamic);
    font-weight: 600;
    font-size: 1.125rem;
    padding: 14px 0;

    .icon {
      margin-right: 2px;
      width: 18px;
      height: 18px;
      color: var(--fut-secondary);
    }
  }

  .events-list {
    padding: 0;
    margin: 0;
    list-style: none;
  }
}
</style>
