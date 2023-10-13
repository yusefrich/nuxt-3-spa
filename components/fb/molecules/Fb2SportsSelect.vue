<template>
  <div class="sports-list">
    <div
      v-for="(sport, idx) in allSportsData"
      :key="idx"
      class="sport-item"
      :class="{ selected: currentSport === sport.id }"
      @click="$emit('changeSport', sport.id)"
    >
      <span class="games-count">{{ sport.games }}</span>
      <fa
        v-if="sportsIcons[sport.id] && sportsIcons[sport.id].fa"
        class="sport-icon"
        :icon="sportsIcons[sport.id] && sportsIcons[sport.id].value ? sportsIcons[sport.id].value : ['fas', 'star']"
      />
      <i
        v-else
        class="sport-icon"
        :class="sportsIcons[sport.id] && sportsIcons[sport.id].value ? sportsIcons[sport.id].value : ['icon', 'icon-soccer']"
      />
      <span>{{ sport.name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Fb2SportsSelect',
  props: {
    allSportsData: {
      type: Array,
      default: () => ([])
    },
    currentSport: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      sportsIcons: {
        6046: { fa: false, value: ['icon', 'icon-soccer'] },
        35709: { fa: true, value: ['fas', 'futbol'] },
        48242: { fa: true, value: ['fas', 'basketball-ball'] },
        54094: { fa: false, value: ['icon', 'icon-tenis'] },
        131506: { fa: false, value: ['icon', 'icon-football'] },
        154830: { fa: false, value: ['icon', 'icon-voley'] },
        154914: { fa: false, value: ['icon', 'icon-tenis-2'] },
        154919: { fa: false, value: ['icon', 'icon-boxing'] },
        265917: { fa: true, value: ['fas', 'table-tennis'] },
        621569: { fa: true, value: ['fas', 'volleyball-ball'] },
        687890: { fa: true, value: ['fas', 'gamepad'] }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.sports-list {
  display: flex;
  width: 100%;
  overflow: auto;
  background: var(--fut-background-lightest-2);

  .sport-item {
    color: var(--fut-color-dynamic);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 12px 10px;
    gap: 5px;
    position: relative;

    .games-count {
      position: absolute;
      top: 5px;
      right: 12px;
      font-size: 10px;
    }

    .sport-icon {
      width: 15px;
      height: 15px;
      color: var(--fut-color-dynamic);
    }

    span {
      white-space: nowrap;
      font-weight: 300;
      font-size: 13px;
      opacity: .87;
    }

    &.selected {
      color: var(--fut-primary);
      .sport-icon {
        color: var(--fut-primary);
      }
    }
  }
}
</style>
