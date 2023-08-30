<template>
  <div class="game-card">
    <div class="game-card-header d-flex bg-darker justify-content-between">
      <div class="d-flex">
        <font-awesome-icon class="icon text-primary" :icon="['fas', 'futbol']" />
        <div>
          <h5 class="mb-0 text-primary">
            {{ bet.league }}
          </h5>
          <p class="mb-0">
            <small class="text-primary">{{ $t('i18n_futebol') }}</small>
          </p>
        </div>
      </div>
      <h5 class="text-white pt-2 pe-3">
        {{ formattedHour(bet.datetime) }}
      </h5>
    </div>
    <div class="text-center text-container">
      <h3 class="text-white">
        {{ limitChar(bet.home_team, 15) }} X {{ limitChar(bet.away_team, 15) }}
      </h3>
      <div class="d-flex justify-content-between px-4 pt-2">
        <fut-button class="btn text-white btn-bet px-4">
          <span>1</span> {{ bet.odd_home }}
        </fut-button>
        <fut-button class="btn text-white btn-bet px-4">
          <span>X</span> {{ bet.odd_draw }}
        </fut-button>
        <fut-button class="btn text-white btn-bet px-4">
          <span>2</span> {{ bet.odd_away }}
        </fut-button>
      </div>
    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs'
import FutButton from '@/components/default/atoms/FutButton'

export default {
  components: {
    FutButton
  },
  props: {
    bet: {
      type: Object,
      required: true
    }
  },
  methods: {
    // todo: turn this into a helper function
    limitChar (str, limit) {
      const result = str.slice(0, limit) + (str.length > limit ? '...' : '')
      return result
    },
    formattedHour (hour) {
      return dayjs(hour).format('HH:mm')
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "@/assets/layout/variables";
  .bg-darker{
    background: var(--fut-background-darkest);
  }
  .btn-bet{
    border: 1px solid $gray-600;
    border-radius: 5px;
    span{
        background: $white;
        color: $black;
        padding: 0px 6px;
        border-radius: 100px;
    }
  }
  .btn-bet:hover{
    background: rgba(255, 255, 255, 0.3);
  }
  .text-container{
    margin-top: 40px;
  }
  .game-card{
    width: 450px !important;
    margin-right: 10px;
    height: 200px;
    border-radius: 10px;
    border: 1px solid $gray-500;
    background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("/img/campo.jpg");
    background-position: center; /* Center the image */
    background-repeat: no-repeat; /* Do not repeat the image */
    background-size: cover; /* Resize the background image to cover the entire container */
    .game-card-header{
        border-radius: 10px 10px 0px 0px;
        border-bottom: 1px solid $gray-600;
        .icon{
            font-size: 30px;
            margin-right: 10px;
            margin: 10px;
        }
    }
  }
</style>
