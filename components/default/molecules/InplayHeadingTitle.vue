<template>
  <div v-if="currentEvent" class="text-center">
    <h3 class="text-primary">
      {{ currentEvent.league }}
    </h3>
    <div class="d-flex text-white justify-content-center">
      <h5 class="me-2">
        {{ currentEvent.home_team }}
      </h5>
      <h5 v-if="currentEvent.hasOwnProperty('home_result')">
        {{ currentEvent.home_result }}
      </h5>
      <div class="px-2" />
      <h5 v-if="currentEvent.hasOwnProperty('away_result')">
        {{ currentEvent.away_result }}
      </h5>
      <h5 class="ms-2">
        {{ currentEvent.away_team }}
      </h5>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    currentEvent: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
<style lang="scss" scoped>
.img-club{
  width: 30px;
  height: 30px;
  object-fit: contain;
}
</style>
