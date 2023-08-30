<template>
  <div>
    <div class="filter-title d-flex justify-content-between bg-gray-darker">
      <div class="d-flex">
        <nsx-fut-button class="text-filter px-3 py-1" @click="$router.go(-1)">
          <font-awesome-icon class="text-filter fut-color-dynamic" :icon="['fas', 'caret-left']" />
        </nsx-fut-button>
        <small style="align-self: center;" class="text-filter fut-color-dynamic">{{ $t('i18n_futebol') }} / <span class="text-filter-light fut-color-dynamic">{{ getFilteredTime }}</span></small>
      </div>
      <div class="d-flex">
        <nsx-fut-button to="/sport/6046/games/12" class="btn-time-filter fut-color-dynamic" :class="{active:getTime==='12'}">
          <span>
            12
          </span>
        </nsx-fut-button>
        <nsx-fut-button to="/sport/6046/games/24" class="btn-time-filter fut-color-dynamic" :class="{active:getTime==='24'}">
          <span>
            24
          </span>
        </nsx-fut-button>
        <nsx-fut-button to="/sport/6046/games/48" class="btn-time-filter fut-color-dynamic" :class="{active:getTime==='48'}">
          <span>
            48
          </span>
        </nsx-fut-button>
      </div>
    </div>
    <div class="position-relative">
      <div id="scroller-container" class="country-filter-group bg-grayer">
        <nsx-fut-button class="px-3 py-1 btn-left" @click="scrollLeft">
          <font-awesome-icon class="text-filter" :icon="['fas', 'arrow-left']" />
        </nsx-fut-button>
        <div class="d-flex px-5">
          <nsx-fut-button
            class="px-1 py-1 text-filter fut-color-dynamic"
            :class="{active: !currentCountryCc}"
            @click="() => {$emit('changeCountry', null)}"
          >
            <small class="fut-color-dynamic">{{ $t('i18n_todos') }}</small>
          </nsx-fut-button>
          <nsx-fut-button
            v-for="country in countries"
            :key="'country_cc_' + country.cc"
            class="px-2 py-1 text-filter fut-color-dynamic"
            :class="{active: currentCountryCc === country.cc}"
            @click="() => {$emit('changeCountry', country.cc)}"
          >
            <small style="white-space: nowrap" class="fut-color-dynamic">{{ country.name }}</small>
          </nsx-fut-button>
        </div>
        <nsx-fut-button class="px-3 py-1 btn-right" @click="scrollRight">
          <font-awesome-icon class="text-filter fut-color-dynamic" :icon="['fas', 'arrow-right']" />
        </nsx-fut-button>
      </div>
    </div>
  </div>
</template>

<script>
import NsxFutButton from '@/components/nsx/atoms/NsxFutButton'

export default {
  name: 'NsxTimeFilter',
  components: { NsxFutButton },
  props: {
    currentCountryCc: {
      type: Number,
      default: null
    },
    countries: {
      type: Array,
      default: () => [
        { name: 'Alemanha', cc: 161, total: 88 },
        { name: 'Argentina', cc: 203, total: 30 },
        { name: 'Argélia', cc: 137, total: 9 }
      ]
    }
  },
  computed: {
    getTime () {
      return this.$route.params.timeFilter
    },
    getFilteredTime () {
      return this.$route.params.timeFilter ? this.$route.params.timeFilter + 'hs' : this.$t('i18n_todos')
    }
  },
  methods: {
    scrollLeft () {
      document.getElementById('scroller-container').scrollLeft -= 400
    },
    scrollRight () {
      document.getElementById('scroller-container').scrollLeft += 400
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/layout/breakpoints";
.text-filter{
  color: var(--nsx-gray-0);
}
.text-filter-light{
  color: #c5c5c5;
}
.text-filter-active{
  color: #dbdbdb;
}
.bg-grayer{
  background: var(--nsx-dark-2);
}
.bg-gray-darker{
  background: var(--nsx-dark-1);
}
.active{
  border-bottom: 2px solid #ffa500;
  small{
    color: #dbdbdb;
  }
}
.country-filter-group{
  max-width: 100%;
  @include md {
    max-width: calc(100vw - 463px);
  }
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;  /* Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
}
.country-filter-group::-webkit-scrollbar{
  display: none;
}
.btn-left{
  position: absolute;
  left: 0;
  background: var(--nsx-dark-2);
  z-index: 10;
}
.btn-right{
  position: absolute;
  right: 0;
  top: 0;
  background: var(--nsx-dark-2);
  z-index: 10;
}
.btn-time-filter{
  margin: 2px 8px;
  padding: 0;
  font-size: 13.3px;
  border-radius: 50% !important;
  width: 26px;
  height: 26px;
  border: 1px solid var(--nsx-dark-7);
  color: #c5c5c5;
  vertical-align: middle;
  span{
    line-height: 24px;
  }
}
.btn-time-filter.active{
  background: var(--fut-primary);
  border: 1px solid var(--fut-primary);
  color: #ebebeb !important;
}
</style>
