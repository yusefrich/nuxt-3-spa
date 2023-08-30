<template>
  <div v-if="game" class="game-container">
    <div class="d-block d-md-none">
      <span><small class="fut-color-dynamic">{{ game.league_name }}</small></span>
    </div>
    <div class="d-flex d-md-none justify-content-between">
      <div>
        <p class="mb-2 fut-color-dynamic">
          {{ game.home_team }} - {{ game.away_team }}
        </p>
        <p class="mb-2 fut-color-dynamic">
          {{ game.home_result }} - {{ game.away_result }}
        </p>
      </div>
      <div class="mt-2">
        <span class="time fut-color-dynamic">{{ game.time }}'</span>
      </div>
    </div>
    <div class="d-none d-md-block">
      <div class="py-1">
        <span class="me-2 fut-color-dynamic">{{ game.home_result }}</span>
        <span class="fut-color-dynamic">{{ game.home_team }}</span>
      </div>
      <div class="py-1">
        <span class="me-2 fut-color-dynamic">{{ game.away_result }}</span>
        <span class="fut-color-dynamic">{{ game.away_team }}</span>
      </div>
      <div class="py-1">
        <span class="me-1 fut-color-dynamic"><font-awesome-icon :icon="['fas', 'clock']" /></span>
        <span class="fut-color-dynamic">{{ game.time }} min</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    game: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
<style lang="scss" scoped>
p{
  font-size: 14px;
}
span{
  font-size: 11px;
}
.time{
  background: var(--fut-background-darker);
  padding: 5px;
}
</style>
