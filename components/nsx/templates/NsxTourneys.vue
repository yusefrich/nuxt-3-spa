<template>
  <div class="d-block d-md-flex">
    <div class="row m-0 bets-content">
      <div
        v-if="loading"
        style="padding-top: 90px; padding-bottom: 90px"
        class="col-12 text-center min-height-nsx"
      >
        <font-awesome-icon
          class="icon-loading spin spinner-class"
          :icon="['fas', 'circle-notch']"
        />
      </div>
      <div class="col-12 min-height-nsx px-0">
        <div class="row mx-0">
          <div
            v-for="leagueGroup in leagues"
            :key="'league_group_' + leagueGroup.id"
            class="col-12 p-1 pt-2"
          >
            <nsx-card-wrapper
              :header-link="`/sport/${leagueGroup.id}/leagues`"
              :icon="getSportIcon(leagueGroup.id)"
              :title="leagueGroup.name"
            />
            <div class="row m-0">
              <div
                v-for="(league, index) in leagueGroup.leagues"
                :key="'league_btn_' + index"
                class="col-md-4 px-1 pb-2"
              >
                <nsx-tourney-btn
                  :link="`/sport/${leagueGroup.id}/league/${league.id}`"
                  :icon="getSportIcon(leagueGroup.id)"
                  :title="league.name"
                  :games="league.total_games"
                />
              </div>
            </div>
          </div>
          <div v-if="leagues && leagues.length <= 0">
            <p class="text-white pt-2">
              <small>{{ $t('i18n_nenhum_torneio_encontrado') }}...</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import NsxCardWrapper from '@/components/nsx/molecules/NsxCardWrapper.vue'
import NsxTourneyBtn from '@/components/nsx/atoms/NsxTourneyBtn.vue'

export default {
  name: 'NsxTourneys',
  components: {
    NsxCardWrapper,
    NsxTourneyBtn
  },
  props: {
    mainLeagues: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {
    ...mapGetters({
      currentSettings: 'settings/currentSettings',
      leagues: 'events/leagues'
    })
  },
  created () {
    this.loading = true

    if (this.mainLeagues) {
      this.fetchAllMainLeagues().finally(() => {
        this.loading = false
      })
    } else {
      this.fetchAllLeagues().finally(() => {
        this.loading = false
      })
    }
  },
  methods: {
    ...mapActions({
      fetchAllLeagues: 'events/fetchAllLeagues',
      fetchAllMainLeagues: 'events/fetchAllMainLeagues'
    }),
    getSportIcon (id) {
      switch (id) {
        case 1:
          return '/bet365icons/1.svg'
        case 6046:
          return '/bet365icons/1.svg'
        case 48242:
          return '/bet365icons/2.svg'
        case 54094:
          return '/bet365icons/5.svg'
        case 265917:
          return '/bet365icons/20.svg'
        case 154830:
          return '/bet365icons/23.svg'
        case 621569:
          return '/bet365icons/34.svg'
        case 35709:
          return '/bet365icons/6.svg'
        case 154914:
          return '/bet365icons/3.svg'
        case 131506:
          return '/bet365icons/16.svg'
        case 687890:
          return '/bet365icons/games.svg'
        case 154919:
          return '/bet365icons/10.svg'
        default:
          return '/bet365icons/1.svg'
      }
    }
  }
}
</script>

<style scoped lang="scss">
.bets-tickets{
  width: 250px;
}
.bets-content{
  width: 100%;
  &::-webkit-scrollbar-track {
    opacity: .3;
    border-radius: 0.125rem;
    background-color: var(--nsx-dark-7);
  }
  &::-webkit-scrollbar {
    opacity: .3;
    width: 13px;
  }
  &::-webkit-scrollbar-thumb {
    border: solid 2px var(--nsx-dark-7);
    opacity: .3;
    border-radius:50px;
    width: 5px;
    background-color: var(--nsx-dark-6);
  }
}
.icon-loading{
  font-size: 140px;
  color: #ffa500;
}
.spinner-class{
  animation-name: spin;
  animation-duration: 1000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
@keyframes spin {
  from {
    transform:rotate(0deg);
  }
  to {
    transform:rotate(360deg);
  }
}
.min-height-nsx{
  min-height: calc(100vh - 50px);
}
</style>
