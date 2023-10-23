<template>
  <div v-if="event" class="position-relative">
    <fb-fut-button
      class="btn-fb-close px-0 d-none d-md-inline-block"
      @click="$router.back()"
    >
      <font-awesome-icon :icon="['fas', 'times']" />
    </fb-fut-button>
    <div class="position-relative d-none d-md-block bg-title">
      <div v-if="live" class="d-flex justify-content-center league-title">
        <span>{{ event.league_name }}</span>
      </div>
      <div class="on-top p-2">
        <div v-if="live" class="d-flex justify-content-center">
          <p class="title-date-live mb-0 text-center">
            <span v-if="gamePeriod">{{ gamePeriod }}</span>  {{ event.time }} min'
          </p>
        </div>
        <p
          v-else
          class="title-date mb-0 pt-2"
        >
          {{ formattedDate(event.datetime) }}
        </p>
        <p class="title-date mb-0">
          {{ event.league }}
        </p>

        <div :class="live ? 'live-layout' : 'd-flex'">
          <h5 class="mb-0 text-white">
            {{ event.home_team }}
          </h5>
          <span
            v-if="event.home_team && event.away_team"
            class="text-white mx-2"
            :class="{'d-none': live}"
          >-</span>
          <h5 class="mb-0 text-white">
            {{ event.away_team }}
          </h5>
        </div>

        <template v-if="live">
          <div
            v-for="(result, index) in event.result"
            :key="'inplay_score_board_'+index"
            class="d-flex justify-content-center mb-2 score"
          >
            <h3 class="mb-0 text-white">
              {{ result.home }}
            </h3>
            <span v-if="result.away && result.home" class="text-white mx-2">:</span>
            <h3 class="mb-0 text-white">
              {{ result.away }}
            </h3>
          </div>
        </template>
      </div>
      <img
        v-if="!live"
        class="bg-img-field"
        :src="gameImg"
        alt="Background Image"
      >
    </div>
    <div class="position-relative d-md-none">
      <div class="d-flex mobile-heading">
        <div class="header-link">
          <fb-fut-button class="a text-white" @click="$router.back()">
            <span>
              <font-awesome-icon class="ms-2 me-2" :icon="['fas', 'chevron-left']" />
            </span>
          </fb-fut-button>
        </div>
        <div class="heading-title w-100">
          <div class="d-flex justify-content-around">
            <h5 class="mb-0 text-white mobile-title-team">
              <span>
                {{ `${event.home_team}` }}
              </span>
            </h5>
            <h5 class="mb-0 text-white" v-if="event.away_team">
              -
            </h5>
            <h5 class="mb-0 text-white mobile-title-team">
              <span>
                {{ event.away_team }}
              </span>
            </h5>
          </div>
          <template v-if="live">
            <div v-for="(result, index) in event.result" :key="'inplay_score_board_'+index" class="d-flex justify-content-center">
              <h5 class="mb-0 text-white">
                {{ result.home }}
              </h5>
              <span class="text-white mx-2">-</span>
              <h5 class="mb-0 text-white">
                {{ result.away }}
              </h5>
            </div>
          </template>
          <div v-if="live" class="d-flex justify-content-center">
            <p class="title-date-live mb-0 text-center">
              <span v-if="gamePeriod">{{ gamePeriod }}</span>  {{ event.time }} min'
            </p>
          </div>
          <p class="title-date mb-0">
            {{ event.league }}
          </p>
        </div>
        <div class="header-filter">
          <fb-fut-button class="text-white" @click="$emit('toggle')">
            <font-awesome-icon :icon="['fas', 'filter']" />
          </fb-fut-button>
        </div>
      </div>
      <div v-if="!live" class="on-top p-1 mobile-timing">
        <p class="text-center title-date mb-0">
          {{ event.datetime }}
        </p>
      </div>
    </div>
    <div v-if="live" class="d-md-none">
      <fut-inplay-field
        v-if="event && event.livescore_id && statscoreConfig"
        :id="event.livescore_id"
        name="mobile_fb"
        :statscore-config="statscoreConfig"
      />
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import FutInplayField from '@/components/default/atoms/FutInplayField'
import FbFutButton from '@/components/fb/atoms/FbFutButton'

export default {
  name: 'FbHeadingTitle',
  components: {
    FutInplayField,
    FbFutButton
  },
  props: {
    live: {
      type: Boolean,
      default: false
    },
    statscoreConfig: {
      type: String,
      default: null
    },
    event: {
      type: Object,
      default: () => ({})
    }
  },
  emits: [
    'toggle'
  ],
  computed: {
    gamePeriod () {
      if (
        !this.event.current_period ||
        typeof this.event.current_period !== 'string' ||
        this.event.current_period === ''
      ) {
        return ''
      }
      let gperiod = ''
      switch (this.event.current_period) {
        case '10':
          gperiod = '1°'
          break
        case '20':
          gperiod = '2°'
          break
        case '80':
          gperiod = 'Intervalo'
          break
        default:
          break
      }

      return gperiod
    },
    gameImg () {
      const games = {
        6046: '/Fb/bg-jogos.jpg',
        265917: '/Fb/tenis-de-mesa.jpg',
        54094: '/Fb/tenis-de-quadra.jpg',
        687890: '/Fb/e-games.jpg',
        48242: '/Fb/basquete.jpg',
        154830: '/Fb/voley.jpg',
        35709: '/Fb/handebol.jpg',
        131506: '/Fb/futebol-americano.jpg',
        154919: '/Fb/boxing.jpeg'
      }

      return games[this.$route.params.sportId]
    }
  },
  methods: {
    formattedDate (day) {
      const semana = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado']
      const mes = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
      let dateReturn = ''
      if (dayjs(day).isToday()) {
        dateReturn = `${this.$t('i18n_hoje')} as ${dayjs(day).format('HH:mm')}`
      } else if (dayjs(day).isTomorrow()) {
        dateReturn = `${this.$t('i18n_amanha')} as ${dayjs(day).format('HH:mm')}`
      } else {
        dateReturn = semana[dayjs(day).day()] + ', ' + dayjs(day).format('DD [de] ') + mes[dayjs(day).month()] + dayjs(day).format(' [as] HH:mm')
      }
      dateReturn = dayjs(day).format('DD/MM/YYYY HH:mm')
      return dateReturn
    },
    formattedHour (hour) {
      return dayjs(hour).format('HH:mm')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/layout/breakpoints";
.league-title {
  color: #FFF;
  // background-color: rgba(0,0,0,0.40);
  background-color: var(--fut-background-2-darker);
  font-size: 13px;
  margin-top: 2px;
}
.mobile-title-team{
  max-width: 40%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.live-layout {
  position: relative;
  display: flex;
  top: 15px;
  justify-content: space-between;
  h5{
    font-size: 14px;
    font-weight: bold;
  }
}
.score {
  margin-top: -15px;
  span {
    font-size: 22px;
    font-weight: bold;
  }
}
.bg-title{
  // background: var(--fut-background-lightest);
  background-color: var(--fut-background-2-lighter);
}
.title-date{
  color: white;
  font-size: 14px;
  font-family: "Roboto", sans-serif;
  line-height: 16px;
}
.title-date-live {
  color: white;
  font-size: 11px;
  font-family: "Roboto", sans-serif;
  line-height: 16px;
  width: 77px;
  border-radius: 2px;
  // background: rgba(0, 0, 0, 0.75);
  font-style: italic;
  background-color: var(--fut-background-2-darkest);
  border-top: 0;
  span {
    padding-right: 5px;
    border-right: #fff 1px solid;
  }
}
.btn-fb-close{
  position: absolute;
  right: 0;
  z-index: 100;
  color: white;
  padding-top: 1px;
  // background: rgba(0,0,0,0.75);
  background-color: var(--fut-background-2-darkest);
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  cursor: pointer;
}
.img-club{
  width: 30px;
  height: 30px;
  object-fit: contain;
}
h3{
  font-size: 20px;
  margin-top: 6px;
  @include _md {
    font-size: 20px;
  }
}
h4{
  @include _md {
    font-size: 17px;
  }
}
.text-orange{
  color: #FF8800
}
.on-top{
  z-index: 10;
  position: relative;
  padding-top: 0 !important;
}
.bg-img-field{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  z-index: 0;
  // opacity: .2;
  // border-radius: 15px;
  object-fit: cover;
  object-position: 50% 80%; /* even if we dont declare this the image will still be centered */
}
.mobile-heading{
  background: var(--fut-background-lightest-2);
  .header-link{
    place-self: center;
    a{
      padding: 10px;
      display: block;
      span{
        font-size: 11px;
      }
    }
  }
  .heading-title{
    h5{
      font-size: 13px;
      margin-top: 5px;
    }
    p{
      font-size: 11px;
    }
  }
  .header-filter{
    align-self: center;
    button{
      border: none;
      background: none;
      padding: 10px;
    }
  }
}
.mobile-timing{
  background: var(--fut-background-lightest-2);
  margin-top: 2px;
  margin-bottom: 2px;
  p{
    font-size: 14px !important;
  }
}
</style>
