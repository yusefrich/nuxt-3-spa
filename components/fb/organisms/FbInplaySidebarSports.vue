<template>
  <div id="inplaySidebarListSports">
    <div class="bg-gray">
      <div class="title-header d-none d-md-block header-bg">
        <span class="fw-bold fut-color-dynamic">{{ $t('i18n_ao_vivo').toUpperCase() }}</span>
      </div>
      <div v-for="(sport, index) in sports" :key="'group_of_lists'+index" class="m-2 m-md-0">
        <fb-fut-button
          class="w-100 button-sport align-items-center d-flex collapsed justify-content-between"
          type="button"
          data-bs-toggle="collapse"
          :data-bs-target="`#sport-is-${sport.sport_id}-collapse`"
          aria-expanded="true"
          :aria-controls="`sport-is-${sport.sport_id}-collapse`"
        >
          <div class="ms-md-2">
            <img v-if="+sport.sport_id === 6046" class="me-2 me-md-0 d-none d-md-inline" src="/FbIcons/1.png">
            <img v-if="+sport.sport_id === 48242" class="me-2 me-md-0 d-none d-md-inline" src="/FbIcons/6.png">
            <img v-if="+sport.sport_id === 154919" class="me-2 me-md-0 d-none d-md-inline" src="/FbIcons/69.png">
            <img v-if="+sport.sport_id === 54094" class="me-2 me-md-0 d-none d-md-inline" src="/FbIcons/3.png">
            <img v-if="+sport.sport_id === 265917" class="me-2 me-md-0 d-none d-md-inline" src="/FbIcons/19.png">
            <img v-if="+sport.sport_id === 154830" class="me-2 me-md-0 d-none d-md-inline" src="/FbIcons/4.png">
            <img v-if="+sport.sport_id === 621569" class="me-2 me-md-0 d-none d-md-inline" src="/FbIcons/60.png">
            <img v-if="+sport.sport_id === 35709" class="me-2 me-md-0 d-none d-md-inline" src="/FbIcons/5.png">
            <img v-if="+sport.sport_id === 154914" class="me-2 me-md-0 d-none d-md-inline" src="/FbIcons/23.png">
            <img v-if="+sport.sport_id === 687890" class="me-2 me-md-0 d-none d-md-inline" src="/FbIcons/95.png">
            <img v-if="+sport.sport_id === 131506" class="me-2 me-md-0 d-none d-md-inline" src="/FbIcons/2.png">
            <span class="fw-normal text-white ms-md-2 fut-color-dynamic">{{ getSportName(sport) }}</span>
          </div>
          <div class="bg-dark number-games text-white fut-color-dynamic d-none d-md-block">
            <span>{{ sport.total }}</span>
          </div>
          <div class="number-games text-white fut-color-dynamic d-md-none fw-bolder">
            <span>+</span>
          </div>
        </fb-fut-button>
        <div :id="`sport-is-${sport.sport_id}-collapse`" class="collapse" data-bs-parent="#inplaySidebarListSports">
          <div v-for="(location, idx) in sport.locations" :key="`count_${location.location_id}_${idx}`">
            <fb-fut-button
              data-bs-toggle="collapse"
              :data-bs-target="`#location-is-${sport.sport_id}-${location.location_id}-${idx}-collapse`"
              class="w-100 button-sport-leagues align-items-center d-flex justify-content-between"
            >
              <div>
                <span class="mx-2 text-white fut-color-dynamic">{{ location.location_name }}</span>
              </div>
              <div class="bg-dark number-games text-white text-center py-1 fut-color-dynamic d-none d-md-block">
                <span>{{ location.totalEvents }}</span>
              </div>
            </fb-fut-button>
            <div :id="`location-is-${sport.sport_id}-${location.location_id}-${idx}-collapse`" class="collapse">
              <template v-for="(event, j) in location.events" :key="`league__${idx}_${j}`">
                <fb-fut-button
                  v-for="(game, k) in event.games"
                  :key="`league__${idx}_${j}_${k}`"
                  :to="'/sport/' + game.sport_id + '/aovivo/' + game.id"
                  class="button-sport-inside text-decoration-none text-white fut-color-dynamic"
                >
                  <smaller-game-display :game="game" />
                </fb-fut-button>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SmallerGameDisplay from '@/components/fb/atoms/SmallerGameDisplay'
import FbFutButton from '@/components/fb/atoms/FbFutButton.vue'

export default {
  components: {
    SmallerGameDisplay,
    FbFutButton
  },
  props: {
    font: {
      type: String,
      default: ''
    },
    sports: {
      type: Array,
      default: () => ([])
    },
    inplaySports: {
      type: Array,
      default: () => ([])
    }
  },
  methods: {
    getSportName (sport) {
      let name = sport.sport_name
      this.inplaySports.forEach((e) => {
        if (e.id === +sport.sport_id) {
          name = e.name
        }
      })
      return name
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/layout/breakpoints";
.title-header{
  padding: 10px;
  font-size: 11px;
}
.icon-filter{
  border-right: 1px solid white;
  padding-right: 15px;
  height: 25px;
  width: 25px;
}
.icon-time-filter{
  width: 25px;
  height: 25px;
}
.sport-head{
  font-size: 15px;
}
.number-games {
  width: 22px;
}
.bg-gray {
  color: white;
  min-height: calc(100vh - 114px);
  max-height: calc(100vh - 114px);
  overflow: auto;
  background-color: var(--fut-background-black);
  @include md {
    background-color: var(--fut-background);
  }
}
.header-bg{
  background-color: var(--fut-background-2) !important;
}
.header-bg-dark{
  background-color: var(--fut-background-header) !important;
}
.search-content {
  width: 100%;
  line-height: 24px;
  height: 24px;
  background-color: #DDD;
  padding-right: 25px;
}
.search {
  border: none;
  outline: none;
  height: 24px;
  font-size: 12px;
}
.week-times {
  background-color: var(--fut-background-lighter);
  margin: 0px 1px;
  border: none;
  color: white;
  font-size: 11px;
  padding: 15px 0px;
  @include md {
    font-size: 10px;
    border-right: 1px solid var(--fut-background-lightest);
    margin: 2px 0px;
    border-bottom: 1px solid var(--fut-background-lightest);
    padding: 3px 0;
  }
}
.hours-content {
  display: none;
  @include md {
    position: absolute;
    display: flex;
    flex-direction: column;
    button {
      border: none;
      background: var(--fut-background-darkest);
      opacity: 0.9;
      color: white;
      font-size: 11px;
      width: 35px;
      height: 25px;
      &:hover {
        background: var(--fut-background);
      }
    }
  }
}
.hours-content-mobile {
  margin: 0 14px;
  display: flex;
  button {
    border: none;
    background: var(--fut-background-lightest);
    font-size: 11px;
    color: white;
    height: 30px;
    width: 30px;
    margin: 0 1px;
  }
}
.title-head {
  font-size: 12px;
}
.button-sport {
  background-color: var(--fut-background);
  border: none;
  border-radius: 5px;
  font-size: 17px;
  line-height: 30px;
  padding: 5px;
  margin: 10px 0px 0px;
  @include md {
    background-color: var(--fut-background);
    border: none;
    margin: 0px;
    font-size: 12px;
    border-radius: 0px;
    border-bottom: 1px solid var(--fut-background-lightest);
    padding: 0%;
  }
}
.button-sport-leagues {
  background-color: var(--fut-background-lightest-2);
  border: none;
  text-align: left;
  border-radius: 5px;
  border-radius: 0px;
  font-size: 12px;
  border-bottom: 1px solid var(--fut-background-white);
  padding: 15px 10px;
  @include md {
    background-color: var(--fut-background);
    border: none;
    margin: 0px;
    padding: 0%;
    border-bottom: 1px solid var(--fut-background-lightest);
  }
}
.button-sport-inside {
  display: block;
  text-decoration: none;
  text-align: left;
  border-bottom: 1px solid var(--fut-background-white-3);
  background-color: var(--fut-background-white-2);
  font-size: 12px;
  padding: 5px;
  padding-left: 15px;
  @include md {
    padding-left: 5px;
    font-size: 11px;
  }
}
.event-count {
  color: white;
  @include md {
    min-width: 22px;
    text-align: center;
    line-height: 30px;
    font-size: 9px;
    font-weight: normal;
    background: var(--fut-background-darker);
  }
}
.header-sidebar-mobile{
  background: var(--fut-background-games-list);
  margin-top: 35px;
  @include md{
    margin-top: 0px;
  }
}
.main-league {
  display: none;
  @include md {
    background-color: var(--fut-background-lightest);
    display: flex;
    padding: 1% 1%;
    align-items: center;
    text-decoration: none;
    border-radius: 3px;
    .sport {
      font-size: 10px;
    }
    .league {
      color: white;
      font-size: 12px;
    }
    .league-icon-style {
      width: 40px;
      height: 40px;
    }
  }
}
</style>
