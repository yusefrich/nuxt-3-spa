<template>
  <div
    :style="'height: '+height"
    :class="[
      'game-card',
      sport===6046?'bg-campo':'',
      sport===48242?'bg-basketball':'',
      sport===54094?'bg-boxing':''
    ]"
  >
    <div class="game-card-header d-flex bg-darker justify-content-between">
      <div class="d-flex">
        <font-awesome-icon v-if="sport===6046" class="icon text-primary" :icon="['fas', 'futbol']" />
        <i v-if="sport===48242" :class="['icon', 'icon-basket', 'text-primary']" />
        <i v-if="sport===54094" :class="['icon', 'icon-boxing', 'text-primary']" />
        <div>
          <h5 class="mb-0 text-primary">
            {{ limitChar(bet.league, 35) }}
          </h5>
          <p class="mb-0">
            <small v-if="sport===6046" class="text-primary">{{ $t('i18n_futebol') }}</small>
            <small v-if="sport===48242" class="text-primary">{{ $t('i18n_basquete') }}</small>
            <small v-if="sport===54094" class="text-primary">{{ $t('i18n_boxe') }}</small>
          </p>
        </div>
      </div>
      <h5 class="text-white pt-2 pe-3">
        {{ formattedHour(bet.datetime) }}
      </h5>
    </div>
    <div class="text-center text-container">
      <fut-button :to="'/sport/' + sport + '/evento/' + bet.slug" class="text-decoration-none">
        <div class="d-none d-md-flex justify-content-center">
          <h3 class="text-white">
            {{ limitChar(bet.home_team, 15) }}
          </h3>
          <h3 class="mx-2 text-white">
            X
          </h3>
          <h3 class="text-white">
            {{ limitChar(bet.away_team, 15) }}
          </h3>
        </div>
        <div class="d-md-none">
          <div class="d-flex mb-1 justify-content-center">
            <h3 class="text-white mb-0 mt-2">
              {{ limitChar(bet.home_team, 15) }}
            </h3>
          </div>
          <div class="d-flex justify-content-center">
            <h3 class="text-white mb-0 mt-2">
              {{ limitChar(bet.away_team, 15) }}
            </h3>
          </div>
        </div>
      </fut-button>
      <div class="d-flex justify-content-center px-1 px-md-4 pt-3">
        <template v-for="(odd, i) in bet.odds" :key="'featured_games_default_' + i">
          <fut-button
            class="btn btn-bet px-4 mx-2"
            :class="[hasSelected(odd.type) ? 'bet-selected' : '']"
            @click="()=>!odd.odds||odd.odds<=0||odd.odds==1?{}:$emit('selectBet', { gameId: game.id, odd: odd, market: oddsGroup.name, event: `${game.home_team} x ${game.away_team}`, validate: game.datetime, live: false })"
          >
            <span v-if="odd.super_odd" class="super-odd-container">
              <span class="normal-odd">
                {{ odd.super_odd && odd.super_odd.normal_odd ? odd.super_odd.normal_odd : '-' }}
              </span>
              <br>
              <span class="super-odd">
                {{ odd.super_odd && odd.super_odd.odd != 0 && odd.super_odd.odd != 1 ? odd.super_odd.odd : '-' }}
              </span>
            </span>
            <span v-else class="bet-holder">
              <small class="bet-holder-header">
                {{ odd.header }}
              </small>
              <span class="bet-holder-odds">
                {{ odd.odds && odd.odds != 0 && odd.odds != 1 ? odd.odds : '-' }}
              </span>
            </span>
          </fut-button>
        </template>
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
    },
    height: {
      type: String,
      default: '200px'
    }
  },
  data () {
    return {
      sport: 6046
    }
  },
  mounted () {
    if (this.$route.params.sportId) {
      this.sport = +this.$route.params.sportId
    }
  },
  methods: {
    // todo: turn this into a helper function
    limitChar (str, limit) {
      if (!str) {
        return ''
      }
      const result = str.slice(0, limit) + (str.length > limit ? '...' : '')
      return result
    },
    hasSelected (type) {
      const currentTicketIndex = this.tickets.findIndex(obj => obj.odd.type === type)
      if (currentTicketIndex !== -1) {
        return true
      }
      return false
    },
    formattedHour (hour) {
      return dayjs(hour).format('HH:mm')
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "@/assets/layout/variables";
  @import "@/assets/layout/breakpoints";
  .bg-darker{
    background: var(--fut-background-darkest);
  }
  .btn-bet{
    border: 1px solid $gray-600;
    border-radius: 5px;
    color: white;
    font-size: 13px;

    padding: 10px 10px !important;
    white-space: nowrap;
    @include md{
      font-size: 16px;
      padding: 10px 30px !important;
    }
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
  .bet-selected{
    background: $white;
    span{
      background: $dark;
      color: white;
    }
    color: $dark;
  }
  .text-container{
    margin-top: 10px;
    @include md{
      margin-top: 40px;
    }
  }
  .game-card{
    width: calc(100vw - 27px);
    h3{
      font-size: 17px;
    }
    h5{
      font-size: 15px;
    }
    @include md{
      width: 470px;
      h5{
        font-size: 20px;
      }
      h3{
        font-size: 23px;
      }
    }
    margin-left: 15px;
    border-radius: 10px;
    -webkit-box-shadow: 0px 0px 28px 8px rgba(0, 0, 0, 0.055);
    box-shadow: 0px 0px 28px 8px rgba(0, 0, 0, 0.055);
    background-position: center; /* Center the image */
    background-repeat: no-repeat; /* Do not repeat the image */
    background-size: cover; /* Resize the background image to cover the entire container */
    .game-card-header{
        border-radius: 10px 10px 0px 0px;
        .icon{
            font-size: 30px;
            margin-right: 10px;
            margin: 10px;
        }
    }
  }
  .img-club{
    width: 30px;
    height: 30px;
    object-fit: contain;
  }
  .bg-campo{
    background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("/img/campo.jpg");
  }
  .bg-basketball{
    background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("/img/basketball.jpg");
  }
  .bg-boxing{
    background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("/img/boxing.jpg");
  }
  .bg-bilhar{
    background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("/img/bilhar.jpg");
  }
</style>
