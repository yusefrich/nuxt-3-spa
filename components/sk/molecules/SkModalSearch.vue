<template>
  <div class="sk-modal-search">
    <sk-input
      v-model="search"
      name="search-game"
      :placeholder="placeholder"
      rounded
      start-icon
      class="sk-search-input"
      :style="`z-index: ${focused ? '5' : 'initial'};`"
      @focus="focused = true"
    >
      <template #placeholder-icon>
        <font-awesome-icon class="search-icon" :icon="['fas', 'search']" />
      </template>
    </sk-input>

    <div
      v-if="focused"
      class="search-modal"
    >
      <div class="modal-bg" @click="focused = false" />
      <div
        class="modal-close transition"
        @click="focused = false"
      >
        <font-awesome-icon :icon="['fas', 'times']" />
      </div>
      <div class="modal-content">
        <div
          v-if="search === ''"
          class="pre-search"
        >
          <span>{{ $t('i18n_a_pesquisa_requer') }}</span>
        </div>
        <div
          v-else-if="notFound"
          class="pre-search"
        >
          <span>{{ $t('i18n_nenhum_resultado_encontrado') }}</span>
        </div>

        <div
          v-else-if="!casino"
          class="sports-search-body"
        >
          <div class="d-flex">
            <ul class="sports-list">
              <li
                v-for="(sport, idx) in sportsList"
                :key="idx"
                class="sport-item"
              >
                <button
                  class="sport-btn"
                  :class="{ selected: idx === selectedSport }"
                  @click="changeSport(idx)"
                >
                  <span>{{ sport.name }}</span>
                  <span class="games">{{ sport.totalGames }}</span>
                </button>
              </li>
            </ul>
          </div>

          <div v-if="orderedItems" class="events">
            <div
              v-for="(value, key, idx) in sportGames"
              :key="idx"
            >
              <div
                v-for="(game, gIdx) in value.games"
                :key="gIdx"
                class="event"
              >
                <n-link
                  :to="localePath(`/sport/${value.sportId}/evento/${game.slug}`)"
                  class="title"
                >
                  {{ game.event }}
                </n-link>
                <p class="date">
                  {{ formatDate(game.date) }}
                </p>
                <div class="links">
                  <n-link :to="localePath(`/sport/${value.sportId}`)" class="link transition">
                    {{ sportsList[selectedSport].name }}
                  </n-link>
                  <font-awesome-icon class="icon" :icon="['fas', 'arrow-right']" />
                  <span class="link transition">
                    <!--falta rota para filtro só de país -->
                    {{ value.country.name }}
                  </span>
                  <font-awesome-icon class="icon" :icon="['fas', 'arrow-right']" />
                  <n-link :to="localePath(`/sport/${value.sportId}/league/${value.leagueId}`)" class="link transition">
                    {{ key }}
                  </n-link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="casino-search-body">
          <div
            v-for="(game, idx) in items"
            :key="idx"
            class="card-game"
          >
            <sk-casino-card-game
              :game="game"
              width="100%"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SkInput from '@/components/sk/atoms/SkInput.vue'

export default {
  name: 'SkModalSearch',
  components: {
    SkInput
  },
  props: {
    items: {
      type: Array,
      default: () => ([])
    },
    placeholder: {
      type: String,
      default: ''
    },
    casino: {
      type: Boolean,
      default: false
    },
    notFound: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      search: '',
      focused: false,
      selectedSport: 0,
      searchTimeout: null
    }
  },
  computed: {
    orderedItems () {
      if (this.casino || !this.items || this.items.length === 0) {
        return null
      }

      return this.reorderItems()
    },
    sportsList () {
      if (!this.orderedItems) {
        return null
      }

      const sports = Object.entries(this.orderedItems).map((item) => {
        return {
          name: item[0],
          totalGames: Object.values(item[1]).map((value) => {
            return value.games.length
          }).reduce((a, b) => a + b)
        }
      })

      return sports
    },
    sportGames () {
      if (!this.orderedItems) {
        return null
      }

      return this.orderedItems[this.sportsList[this.selectedSport].name]
    }
  },
  watch: {
    search (val) {
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout)
      }

      this.searchTimeout = setTimeout(() => {
        this.$emit('search', val)
      }, 1000)
    }
  },
  created () {
    this.$emit('search', '')
  },
  methods: {
    reorderItems () {
      const ordered = {}

      this.items.forEach((item) => {
        item.sport.forEach((sport) => {
          if (!ordered[sport.name]) {
            ordered[sport.name] = {}
          }

          sport.leagues.forEach((league) => {
            if (!ordered[sport.name][league.name]) {
              ordered[sport.name][league.name] = {
                country: item.country,
                sportId: sport.id,
                leagueId: league.id
              }

              ordered[sport.name][league.name].games = league.games
            } else {
              ordered[sport.name][league.name].games.push(league.games)
            }
          })
        })
      })

      return ordered
    },
    changeSport (idx) {
      this.selectedSport = idx
    },
    formatDate (date) {
      const options = { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }

      return new Date(date).toLocaleDateString(this.$i18n.locale, options)
    }
  }
}
</script>

<style lang="scss" scoped>
.sk-modal-search {
  position: relative;

  .sk-search-input {
    position: relative;

    .search-icon {
      color: var(--fut-background-lightest-2);
    }
  }

  .search-modal {
    position: absolute;
    width: 100%;

    .modal-content {
      width: 100%;
      max-height: 400px;
      background: var(--fut-background-darkest);
      margin-top: 10px;
      border: none;
      color: var(--fut-color-dynamic);
      z-index: 7;

      .pre-search {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1.5rem;

        span {
          color: var(--fut-secondary);
          font-size: .875rem;
          font-weight: 700;
        }
      }

      .sports-search-body {
        display: flex;
        flex-direction: column;
        padding: 16px;

        .sports-list {
          display: flex;
          list-style: none;
          background: var(--fut-background);
          border-radius: 50px;
          margin: 0;
          padding: 5px;
          overflow-x: auto;

          .sport-item {
            margin-left: 5px;

            .sport-btn {
              display: flex;
              color: var(--fut-color-dynamic);
              background: transparent;
              border: none;
              padding: .75rem 1rem;
              border-radius: 50px;
              transition: all ease-in-out 300ms;

              span {
                font-size: .875rem;
                font-weight: 600;
                white-space: nowrap;
              }
              .games {
                color: var(--fut-color-dynamic);
                background: var(--fut-background-lightest-2);
                padding: 0 .5em;
                border-radius: 2em;
                min-width: 1.8em;
                font-size: 1rem;
                margin-left: 8px;
              }
              &.selected {
                background: var(--fut-background-lightest-2) !important;
              }

              &:hover {
                background: var(--fut-background-lightest-2);
              }
              &:active {
                span {
                  display: flex;
                  transform: scale(.95);
                }
              }
            }

            &:first-of-type {
              margin-left: 0;
            }
          }

          &::-webkit-scrollbar-track {
            background-color: transparent;
          }
          &::-webkit-scrollbar {
            height: 6px;
          }
          &::-webkit-scrollbar-thumb {
            border-radius: 3px;
            background: var(--fut-background-lightest-2);
          }
        }

        .events {
          padding: 8px 16px;
          max-height: 325px;
          overflow: auto;

          &::-webkit-scrollbar-track {
            background-color: transparent;
          }
          &::-webkit-scrollbar {
            width: 6px;
          }
          &::-webkit-scrollbar-thumb {
            border-radius: 3px;
            background: var(--fut-background-lightest-2);
          }

          .event {
            border-bottom: 2px solid var(--fut-background-lightest-2);
            margin-bottom: 4px;

            .title {
              font-size: .875rem;
              font-weight: 600;
              color: var(--fut-color-dynamic);
              text-decoration: none;
            }
            .date {
              font-weight: 400;
              font-size: .75rem;
              color: var(--fut-secondary);
              padding: .5rem 0;
              margin: 0;
            }
            .links {
              display: flex;

              .link {
                text-decoration: none;
                color: var(--fut-secondary);
                font-size: .875rem;
                font-weight: 600;
                margin-bottom: 8px;

                &:hover {
                  color: var(--fut-color-dynamic);
                }
              }
              .icon {
                width: 12px;
                height: 12px;
                margin: 5px 5px 0 5px;
                color: var(--fut-secondary);
              }
            }
          }
        }
      }

      .casino-search-body {
        overflow: auto;
        display: grid;
        grid-template-columns: repeat(8, 1fr);
        gap: 20px 10px;
        padding: 16px;

        .card-game {
          width: 100%;
        }

        &::-webkit-scrollbar-track {
          background-color: transparent;
        }
        &::-webkit-scrollbar {
          width: 6px;
        }
        &::-webkit-scrollbar-thumb {
          border-radius: 3px;
          background: var(--fut-background-lightest-2);
        }
      }
    }
    .modal-close {
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--fut-background-white-3)80;
      position: absolute;
      top: -50px;
      right: -3px;
      margin: 15px;
      cursor: pointer;
      width: 30px;
      height: 30px;
      border-radius: 15px;
      z-index: 8;

      &:hover {
        color: var(--fut-color-dynamic);
      }
    }
    .modal-bg {
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background: var(--fut-background-transparent-2);
      z-index: 4;
    }
  }
}

@media (max-width: 821px) {
  .sk-modal-search {
    .search-modal {
      .modal-content {
        .casino-search-body {
          grid-template-columns: repeat(3, 1fr);
          gap: 10px 5px;
          overflow-x: hidden;
        }
      }
    }
  }
}
</style>
