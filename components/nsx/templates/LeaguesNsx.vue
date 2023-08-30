<template>
  <div class="d-block d-md-flex">
    <div class="row m-0 bets-content">
      <div class="col-12 px-0 min-height-nsx">
        <all-leagues-nsx
          :sport="sport"
          :main-leagues="getPreMatchMainLeagues"
          :loading="loading"
          :general-leagues="currentLeagues"
          :current-settings="currentSettings"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import AllLeaguesNsx from '@/components/nsx/organisms/AllLeaguesNsx.vue'

export default {
  name: 'LeaguesNsx',
  components: {
    AllLeaguesNsx
  },
  props: {
  },
  data () {
    return {
      sport: null,
      loading: false
    }
  },
  computed: {
    ...mapGetters({
      getPreMatchMainLeagues: 'pre-match-main-leagues/getPreMatchMainLeagues',
      currentSettings: 'settings/currentSettings',
      currentLeagues: 'bets/currentLeagues'
    })
  },
  mounted () {
    if (this.$route.params.sportId) {
      this.sport = +this.$route.params.sportId
    }

    this.loading = true

    this.fetchLeagues(this.sport).finally(() => {
      this.loading = false
    })

    this.getMainLeagues(this.sport)
  },
  methods: {
    ...mapActions({
      fetchPreMatchMainLeagues: 'pre-match-main-leagues/fetchPreMatchMainLeagues',
      fetchLeagues: 'bets/fetchLeagues'
    }),
    getMainLeagues (sport) {
      this.fetchPreMatchMainLeagues(sport).catch((error) => {
        if (error) {
          this.$toast.open({ message: 'Erro ao buscar os eventos principais', type: 'error' })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
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
.min-height-nsx{
  min-height: calc(100vh - 50px);
}
</style>
