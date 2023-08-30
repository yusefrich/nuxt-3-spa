<template>
  <div class="game" :style="`border-radius: ${borderRadius};`">
    <p class="game-league">
      <img
        src="/md/vector-icon.png"
        alt="arrow icon"
        width="30"
        class="mx-2"
      >{{ game.league }}
    </p>
    <div
      class="featured-game-card"
      :style="`
        border-radius: ${borderRadius};
      `"
    >
      <div class="info">
        <div class="links">
          <n-link
            :to="localePath(`/sport/6064/evento/${game.slug}`)"
            class="link date"
          >
            {{ formatDate(game.date) }}
          </n-link>
          <n-link
            :to="localePath(`/sport/6064/evento/${game.slug}`)"
            class="link hour"
          >
            {{ game.hour }}
          </n-link>
          <n-link
            :to="localePath(`/sport/6064/evento/${game.slug}`)"
            class="link team-name"
          >
            {{ game.home_team }}
          </n-link>
          <n-link
            :to="localePath(`/sport/6064/evento/${game.slug}`)"
            class="link team-name"
          >
            {{ game.away_team }}
          </n-link>
        </div>
      </div>
      <div v-if="game.odds && game.odds.length > 0" class="odds-btns">
        <md-odds-button
          v-for="(odd, oIdx) in game.odds[0].odds"
          :key="oIdx"
          :odd="odd"
          :selected="(hasSelected(odd.type) && odd.odds)?true:false"
          :disabled="!odd.odds"
          border-radius="25px"
          width="100%"
          background="#F1F3F7"
          @click="()=>!odd.odds||odd.odds<=0||odd.odds==1?{}:$emit('selectBet', { gameId: game.id, odd: odd, market: game.odds[0].name, event: `${game.home_team} x ${game.away_team}`, validate: game.datetime, live: inplay })"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MdFeaturedGameCard',
  props: {
    game: {
      type: Object,
      default: () => ({})
    },
    tickets: {
      type: Array,
      default: () => ([])
    },
    borderRadius: {
      type: String,
      default: '15px'
    },
    inplay: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    formatDate (date) {
      const options = { weekday: 'long', month: 'long', day: 'numeric' }

      return new Date(date).toLocaleDateString(this.$i18n.locale, options)
    },
    hasSelected (type) {
      const currentTicketIndex = this.tickets.findIndex(obj => obj.odd.type === type)
      if (currentTicketIndex !== -1) {
        return true
      }
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
.game {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  min-height: 200px;
  background-color: #072443;

  .game-league {
    color: #FFFFFF;
    font-weight: 700;
    max-width: 90%;
    padding: 9px 0 9px 10px;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .featured-game-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    min-height: 158px;
    padding: 13px;
    background-image:
      linear-gradient(90deg, #1267C2 0%, rgba(255, 255, 255, 0.269) 100%),
      url("/md/highlight-image.png")
    ;
    background-size: cover, cover;
    background-repeat: no-repeat;

    .info {
      display: flex;

      .links {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        background: #fff;
        border-radius: 15px;
        padding: 13px;
        margin-bottom: 13px;
      }

      .link {
        display: inline;
        max-width: 100%;
        color: #000;
        margin-bottom: 0;
        text-decoration: none;
      }
      .date {
        font-size: 13px;
      }
      .hour {
        font-size: 10px;
      }
      .team-name {
        font-size: 16px;
        font-weight: bold;
      }

      @media (max-width: 425px) {
        padding-left: 20px;
      }
    }
    .odds-btns {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
