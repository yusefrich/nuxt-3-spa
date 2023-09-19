<template>
  <div class="sticky-sidebar">
    <ul id="sidebarList" class="list-unstyled ps-0 sidebar-content fut-scrollbar">
      <li v-if="!noFilter" class="mb-1 section-container">
        <p class="section-title mb-0 fut-color-dynamic">
          {{ $t('i18n_filtrar_periodo') }}
        </p>
        <div class="slider-holder p-2">
          <label for="customRange1" class="form-label text-center text-primary w-100">{{ $t('i18n_proximos_eventos') }}</label>
          <input
            id="customRange1"
            v-model="timeFilter"
            type="range"
            class="form-range"
            min="0"
            max="4"
            @change="changeTimeFilter"
          >
          <div class="d-flex justify-content-between">
            <p class="text-white pointer fut-color-dynamic" @click="()=>{timeFilter = '0'; changeTimeFilter()}">
              {{ $t('i18n_todos') }}
            </p>
            <p class="text-white pointer fut-color-dynamic" @click="()=>{timeFilter = '1'; changeTimeFilter()}">
              3d
            </p>
            <p class="text-white pointer fut-color-dynamic" @click="()=>{timeFilter = '2'; changeTimeFilter()}">
              1d
            </p>
            <p class="text-white pointer fut-color-dynamic" @click="()=>{timeFilter = '3'; changeTimeFilter()}">
              3hrs
            </p>
            <p class="text-white pointer fut-color-dynamic" @click="()=>{timeFilter = '4'; changeTimeFilter()}">
              1hr
            </p>
          </div>
        </div>
      </li>
      <li class="mb-1 section-container">
        <fut-button
          class="btn section-title btn-dark align-items-start text-start rounded collapsed fut-color-dynamic"
          data-bs-toggle="collapse"
          data-bs-target="#main-collapse"
          aria-expanded="false"
        >
          <span>
            <font-awesome-icon class="text-primary" :icon="['fas', 'star']" /> {{ $t('i18n_principais') }}
          </span>
          <font-awesome-icon class="text-primary float-end mt-1 me-2" :icon="['fas', 'chevron-down']" />
        </fut-button>
        <div id="main-collapse" class="collapse show m-0">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li v-for="(item, index) in mainLeagues" :key="`count_main_${item.item}_${index}`" class="section-link">
              <!-- :to="`/sport/${currentSport ? currentSport : 6046}/league/${item.id}`" -->
              <fut-button
                class="link-light btn btn-block text-start rounded text-decoration-none fw-bold country-link"
              >
                <span class="country-name fut-color-dynamic">{{ item.name }}</span>
                <span class="leagues-total text-secondary-light">+{{ item.total }}</span>
              </fut-button>
            </li>
          </ul>
        </div>
      </li>
      <li v-for="(sport, idx) in allSportsData" :key="'group_of_lists_'+idx" class="mb-1 section-container">
        <fut-button
          class="btn section-title btn-dark align-items-start text-start rounded collapsed fut-color-dynamic"
          data-bs-toggle="collapse"
          :data-bs-target="`#sport-${sport.id}-collapse`"
          aria-expanded="false"
          :aria-controls="`sport-${sport.id}-collapse`"
          @click="selectSport(sport.id)"
        >
          <span>
            {{ sport.name }}
          </span>
          <font-awesome-icon v-if="sport.id === currentSport" class="text-primary float-end mt-1 me-2" :icon="['fas', 'chevron-down']" />
          <font-awesome-icon v-else class="text-primary float-end mt-1 me-2" :icon="['fas', 'chevron-up']" />
        </fut-button>
        <div :id="`sport-${sport.id}-collapse`" class="collapse m-0" :class="{show: idx===0}" data-bs-parent="#sidebarList">
          <ul
            id="countryList"
            class="btn-toggle-nav list-unstyled fw-normal pb-1 small"
          >
            <li v-for="(item, idx2) in sport.country" :key="`count_${item.id}_${idx2}`" class="section-link">
              <a
                class="link-light btn btn-block text-start rounded text-decoration-none fw-bold country-link"
                data-bs-toggle="collapse"
                :data-bs-target="`#country-${item.id}-collapse`"
                aria-expanded="false"
                :aria-controls="`country-${item.id}-collapse`"
              >
                <span class="country-name fut-color-dynamic">{{ item.name }}</span>
                <span class="leagues-total text-secondary-light" :class="{'fw-bold': currentCountry === item.id}">{{ item.games }}</span>
              </a>
              <div
                :id="`country-${item.id}-collapse`"
                class="collapse m-0"
                data-bs-parent="#countryList"
              >
              <!-- :to="`/sport/${sport.id}/league/${league.id}`" -->
                <fut-button
                  v-for="(league, idx3) in item.leagues"
                  :key="idx3"
                  class="link-light btn btn-block text-start text-decoration-none league-link"
                >
                  <small>{{ league.name }}</small>
                </fut-button>
              </div>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
// import Spinner from '@/components/default/atoms/Spinner'
import FutButton from '@/components/default/atoms/FutButton'

export default {
  components: { FutButton },
  props: {
    noFilter: {
      type: Boolean,
      default: false
    },
    mainLeagues: {
      type: Array,
      default: () => ([])
    },
    allSportsData: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      timeFilter: 0,
      currentCountry: '',
      currentSport: null
    }
  },
  mounted () {
    if (this.allSportsData && this.allSportsData[0]) {
      this.currentSport = this.allSportsData[0].id
    }
  },
  methods: {
    selectSport (id) {
      this.currentSport = this.currentSport === id ? null : id
    },
    getLeagues (countryId) {
      this.currentCountry = countryId
    },
    changeTimeFilter () {
      console.log('function being called')
      let filterInHours = null
      switch (this.timeFilter) {
        case '0':
          filterInHours = 'all'
          break
        case '1':
          filterInHours = 72
          break
        case '2':
          filterInHours = 24
          break
        case '3':
          filterInHours = 3
          break
        case '4':
          filterInHours = 1
          break
        default:
          break
      }
      this.$emit('fetchTimeFilter', filterInHours)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/layout/variables";
@import "@/assets/layout/breakpoints";
.pointer{
  cursor: pointer;
}
.country-link{
  display: flex;
}
.country-name{
  white-space: nowrap;
  width: 100%;
  margin-right: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.leagues-total{
  float: right;
  background: var(--fut-background);
  border-radius: 50%;
  width: 26px;
  margin-top: 2px;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
}
.form-range{
  width: 89% !important;
  margin-left: 7%;
}
.form-range::-webkit-slider-thumb {
  background: var(--white);
  border: 6px solid var(--fut-primary);
  border-radius: 10px 10px 10px 0;
  width: 20px;
  height: 20px;
  transform: rotate(-45deg);
}
.sticky-sidebar{
  position: sticky;
  top: 110px;
  @media (max-width: 991px) {
    top: 65px;
  }
}
.slider-holder{
    background: var(--fut-background-lightest);

}
.section-container{
  margin-top: 3px;
  margin-bottom: 3px;

  .section-title{
    background: var(--fut-background);
    width: 100%;
    color: $white;
    padding: 7px;
    border: none;
    border-left: 3px solid var(--fut-primary);
  }
  .section-link{
    margin-top: 5px;
    margin-bottom: 5px;
    background: var(--fut-background-lightest);
    a{
      width: 100%;
    }
  }
}
.img-bg-inside{
  background: linear-gradient(
    0deg,
    var(--fut-primary-darkest) 0%,
    var(--fut-primary) 100%
  );
}
.img-container {
  img{
    object-fit: contain;
  }
  height: 112px !important;

  display: flex;
  align-items: center;
  justify-content: center;
}
.sidebar-content{
  height: calc(100vh - 71px);
  overflow: auto;
  margin-top: 71px;
  @include md {
    margin-top: 0px;
    height: calc(100vh - 95px);
  }
}
.leagues{
  padding-bottom: 10px;
}
.league-link{
  background: var(--fut-secondary-darker);
  margin-top: 4px;
}
</style>
