<template>
  <div
    v-if="open"
    class="modal-search-all"
  >
    <div class="modal-bg" @click="open = false" />

    <div class="container">
      <div class="modal-search-content">
        <div class="input-wrapper transition" :class="{ focussed }">
          <div class="dropdown">
            <button
              id="search-type-dropdown"
              class="dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span class="transition">{{ currentType === 'sports' ? $t('i18n_esporte', 2) : $t('i18n_cassino') }}</span>
              <font-awesome-icon class="icon transition" :icon="['fas', 'chevron-down']" />
            </button>

            <ul
              class="dropdown-menu"
              aria-labelledby="search-type-dropdown"
            >
              <li class="list-item transition">
                <button
                  class="dropdown-item list-btn"
                  @click="currentType = 'sports', $emit('cleanSearch'), search = ''"
                >
                  <span>{{ $t('i18n_esporte', 2) }}</span>
                </button>
              </li>
              <li class="list-item transition">
                <button
                  class="dropdown-item list-btn"
                  @click="currentType = 'casino', $emit('cleanSearch'), search = ''"
                >
                  <span>{{ $t('i18n_cassino') }}</span>
                </button>
              </li>
            </ul>
          </div>

          <font-awesome-icon
            class="search icon transition"
            :icon="['fas', 'search']"
          />
          <input
            v-model="search"
            type="text"
            :placeholder="currentType === 'sports' ? $t('i18n_procure_seu_evento') : $t('i18n_procure_seu_jogo')"
            @focus="focussed = true"
            @blur="focussed = false"
          >
          <font-awesome-icon
            class="close icon transition"
            :icon="['fas', 'times']"
            @click="open = false, $emit('cleanSearch'), search = ''"
          />
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
            v-else-if="currentType === 'sports'"
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
                v-for="(val, key, idx) in sportGames"
                :key="idx"
              >
                <div
                  v-for="(game, gIdx) in val.games"
                  :key="gIdx"
                  class="event"
                >
                  <NuxtLink
                    :to="localePath(`/sport/${val.sportId}/evento/${game.slug}`)"
                    class="title"
                  >
                    {{ game.event }}
                  </NuxtLink>
                  <p class="date">
                    {{ formatDate(game.date) }}
                  </p>
                  <div class="links">
                    <NuxtLink :to="localePath(`/sport/${val.sportId}`)" class="link transition">
                      {{ sportsList[selectedSport].name }}
                    </NuxtLink>
                    <font-awesome-icon class="icon" :icon="['fas', 'arrow-right']" />
                    <NuxtLink :to="localePath('/')" class="link transition">
                      <!--falta rota para filtro só de país -->
                      {{ val.country.name }}
                    </NuxtLink>
                    <font-awesome-icon class="icon" :icon="['fas', 'arrow-right']" />
                    <NuxtLink :to="localePath(`/sport/${val.sportId}/league/${val.leagueId}`)" class="link transition">
                      {{ key }}
                    </NuxtLink>
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
  </div>
</template>

<script>
import SkCasinoCardGame from '@/components/sk/atoms/SkCasinoCardGame.vue'

export default {
  name: 'SkModalSearchAll',
  components: {
    SkCasinoCardGame
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      default: () => ([])
    },
    notFound: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'cleanSearch',
    'update:modelValue',
    'searchSports',
    'searchCasino',
    'search'
  ],
  data () {
    return {
      search: '',
      focussed: false,
      currentType: 'sports',
      selectedSport: 0,
      searchTimeout: null
    }
  },
  computed: {
    open: {
      get () {
        return this.modelValue
      },
      set (value) {
        this.$emit('update:modelValue', value)
      }
    },
    placeholder () {
      return this.$t('i18n_procure_seu_evento')
    },
    orderedItems () {
      if (this.currentType === 'casino' || !this.items || this.items.length === 0 || !this.items[0].sport) {
        return null
      }

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

              ordered[sport.name][league.name].games = []

              ordered[sport.name][league.name].games.push(...league.games)
            } else {
              ordered[sport.name][league.name].games.push(league.games)
            }
          })
        })
      })

      return ordered
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
        if (this.currentType === 'sports') {
          this.$emit('searchSports', val)
        } else {
          this.$emit('searchCasino', val)
        }
      }, 3000)
    }
  },
  created () {
    this.$emit('search', '')
  },
  beforeDestroy () {
    clearTimeout(this.searchTimeout)
  },
  methods: {
    reorderItems () {
      if (!Array.isArray(this.items)) {
        return null
      }

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

              ordered[sport.name][league.name].games.push(...league.games)
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
.modal-search-all {
  position: relative;
  margin-top: -60px;
  height: 100vh;
  z-index: 4;

  .modal-bg {
    position: absolute;
    background: var(--fut-background-transparent-2);
    width: 100%;
    height: 100%;
  }

  .container {
    padding: 65px 3vw 0 3vw !important;

    .modal-search-content {
      position: relative;
      display: flex;
      flex-direction: column;
      z-index: 5;

      .input-wrapper {
        display: flex;
        align-items: center;
        width: 100%;
        border: 2px solid var(--fut-background-lightest-2);
        background: var(--fut-background-darkest);
        color: var(--fut-color-dynamic);
        border-radius: 50px;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .2), 0 1px 2px 0 rgba(0, 0, 0, .12);
        padding: 0 1rem;

        button {
          border: none;
          background: transparent;
          color: var(--fut-color-dynamic);
          font-weight: 700;
          font-size: .875rem;
        }

        .dropdown {
          margin-right: 1em;
          border-right: 2px solid var(--fut-background-lightest-2);
          padding: .5rem 1em 0.5rem 0;

          .dropdown-toggle {
            display: flex;
            align-items: center;

            span {
              margin-top: -2px;
              color: var(--fut-secondary);
            }

            .icon {
              width: 12px;
              height: 12px;
              color: var(--fut-secondary);
              margin-left: 10px;
            }
            &:hover {
              span {
                color: var(--fut-color-dynamic);
              }
              .icon {
                color: var(--fut-color-dynamic);
              }
            }
            &:active {
              transform: scale(.95);
            }
            &[aria-expanded="true"] {
              span {
                margin-left: 0;
              }
              .icon {
                transform: rotate(180deg);
              }
            }
            &::after {
              display: none;
            }
          }
          .dropdown-menu {
            min-width: auto;
            margin-top: 5px !important;

            .list-item {
              display: flex;
              align-items: center;

              .list-btn {
                border: none;
                background: transparent;
                text-decoration: none;
                padding: 7px 14px;
                color: var(--fut-background-lightest-2);
                font-size: 15px;
                font-weight: 600;
                width: 100%;
                display: flex;
                justify-content: flex-start;
                align-items: center;
              }

              &:hover {
                background: var(--fut-background-white-3);
              }
              &:active {
                span {
                  transform: scale(.95);
                }
              }
            }

            &::before {
              position: absolute;
              content: "";
              width: 10px;
              height: 10px;
              background: #fff;
              top: -4px;
              left: 50%;
              margin-left: -5px;
              transform: rotate(45deg);
            }
          }
        }

        .icon {
          color: var(--fut-secondary);
          cursor: pointer;

          &:hover {
            color: var(--fut-color-dynamic);
          }
          &:active {
            transform: scale(.95);
          }
        }

        input {
          flex-grow: 1;
          background: transparent;
          border: none;
          outline: 0;
          color: var(--fut-color-dynamic);
          font-size: .875rem;
          font-weight: 600;
          padding: .5rem;

          &::placeholder {
            font-size: .875rem;
            font-weight: 600;
            color: var(--fut-secondary);
          }
        }

        &.focussed, &:hover {
          border-color: var(--fut-secondary);
        }
      }

      .modal-content {
        width: 100%;
        max-height: 412px;
        background: var(--fut-background-darkest);
        margin-top: 10px;
        border: none;
        color: var(--fut-color-dynamic);

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
          width: 100%;
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
    }
  }
}

@media (max-width: 821px) {
  .modal-search-all {
    .container {
      .modal-search-content {
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
}
</style>
