<template>
  <div v-if="currentEvent">
    <fut-button
      class="btn px-0"
      @click="$router.go(-1)"
    >
      <p class="text-primary fw-bold mb-0">
        <font-awesome-icon
          class="me-3"
          :icon="['fas', 'long-arrow-alt-left']"
        />
        {{ $t('i18n_voltar') }}
      </p>
    </fut-button>
    <div class="position-relative">
      <div class="on-top">
        <h3 class="text-center text-white fut-color-dynamic">
          {{ currentEvent.league }}
        </h3>
        <div class="d-flex justify-content-center">
          <h3 v-if="currentEvent.league_name" class="me-2 text-white fut-color-dynamic">
            {{ `${currentEvent.league_name}: ` }}
          </h3>
          <h3 v-if="currentEvent.location_name" class="text-white fut-color-dynamic">
            {{ currentEvent.location_name }}
          </h3>
        </div>
        <div v-if="!live">
          <div class="d-flex justify-content-center text-white fut-color-dynamic">
            <h4>
              {{ currentEvent.home_team }}
            </h4>
            <h4 class="text-orange mx-1">
              {{ currentEvent.home_result }}
            </h4>
            <h4 v-if="currentEvent.away_team" class="mx-3">
              X
            </h4>
            <h4 class="text-orange mx-1">
              {{ currentEvent.away_result }}
            </h4>
            <h4>
              {{ currentEvent.away_team }}
            </h4>
          </div>
          <p
            v-if="currentEvent.time"
            class="text-center text-white mb-0 fut-color-dynamic"
          >
            <small> <font-awesome-icon class="icon me-2" :icon="['fas', 'clock']" /> {{ currentEvent.time }}</small>
          </p>
        </div>
        <div
          v-else
          class="text-center d-flex justify-content-center"
        >
          <div class="me-2 mt-4 text-white fut-color-dynamic">
            <h4>
              {{ currentEvent.home_team }}
            </h4>
            <h4>
              {{ currentEvent.away_team }}
            </h4>
          </div>
          <template v-if="currentEvent.result">
            <div
              v-for="(result, j) in currentEvent.result"
              :key="'result_inplay_' + j + '_' + (result.home + result.away)"
              class="me-2"
            >
              <p
                v-if="j === 0 && j+1 !== currentEvent.result.length"
                class="mb-0 text-white fut-color-dynamic"
              >
                <small>Sets</small>
              </p>
              <p
                v-else-if="j+1 === currentEvent.result.length"
                class="mb-0 text-white fut-color-dynamic"
              >
                <small>{{ $t('i18n_placar') }}</small>
              </p>
              <p
                v-else
                class="mb-0 text-white fut-color-dynamic"
              >
                <small>{{ $t('i18n_jogos') }}</small>
              </p>
              <h4
                :key="'home_result' + +result.home"
                class="text-orange mx-1"
              >
                {{ result.home }}
              </h4>
              <h4
                :key="'away_result' + +result.away"
                class="text-orange mx-1"
              >
                {{ result.away }}
              </h4>
            </div>
          </template>
        </div>
        <p
          v-if="live && currentEvent.time"
          class="text-center mb-0 text-white fut-color-dynamic"
        >
          <small> <font-awesome-icon class="icon me-2" :icon="['fas', 'clock']" /> {{ currentEvent.time }}</small>
        </p>
        <p
          v-if="currentEvent.datetime"
          class="text-center mb-0 text-white fut-color-dynamic"
        >
          <small> <font-awesome-icon class="icon me-2" :icon="['fas', 'clock']" /> {{ formattedHour(currentEvent.datetime) }}</small>
        </p>
        <p
          v-if="currentEvent.datetime"
          class="mb-0 text-center text-white fut-color-dynamic"
        >
          <small>{{ formattedDate(currentEvent.datetime) }}</small>
        </p>
      </div>
      <img
        v-if="live"
        class="bg-img-field"
        src="/field.jpg"
        alt=""
      >
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'

import FutButton from '@/components/default/atoms/FutButton'

export default {
  name: 'HeadingTitle',
  components: {
    FutButton
  },
  props: {
    live: Boolean,
    currentEvent: {
      type: Object,
      default: () => ({})
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
.img-club{
  width: 30px;
  height: 30px;
  object-fit: contain;
}
h3{
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
}
.bg-img-field{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  z-index: 0;
  opacity: .2;
  filter: grayscale(100%) brightness(124%);
  -webkit-filter: grayscale(100%) brightness(124%);
  -moz-filter: grayscale(100%) brightness(124%);
  border-radius: 15px;
  object-fit: cover;
  object-position: 50% 80%; /* even if we dont declare this the image will still be centered */
}
</style>
