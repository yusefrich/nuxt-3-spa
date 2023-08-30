<template>
  <div>
    <div
      class="first-dropdown transition"
      role="button"
      data-bs-toggle="collapse"
      :data-bs-target="`#${id}`"
      aria-expanded="false"
      :aria-controls="id"
    >
      <img v-if="imgs[id]" :src="imgs[id]" alt="Sport icon" class="sport-icon">
      <font-awesome-icon v-else class="yellow-star" :icon="['fas', 'star']" />

      <span class="game-name transition">{{ sport.name }}</span>
      <span class="games-count">{{ sport.games }}</span>
      <div class="hidden-icon">
        <font-awesome-icon class="link-arrow" :icon="['fas', 'chevron-down']" />
      </div>
    </div>

    <div :id="id" class="collapse">
      <ul id="#countryList" class="second-dropdown">
        <li
          v-for="(country, idx) in sport.country"
          :key="`${idx}-${country.id}`"
          class="countries transition"
        >
          <div
            class="country"
            role="button"
            data-bs-toggle="collapse"
            :data-bs-target="`#country-id-${country.id}`"
            aria-expanded="false"
            :aria-controls="`country-id-${country.id}`"
          >
            <span class="country-name fw-bold transition">{{ country.name }}</span>
            <font-awesome-icon class="link-arrow" :icon="['fas', 'chevron-down']" />
          </div>
          <div :id="`country-id-${country.id}`" class="collapse">
            <ul class="league-list">
              <li
                v-for="(league, idx2) in country.leagues"
                :key="idx2"
              >
                <n-link
                  :to="localePath(`/sport/${sport.id}/league/${league.id}`)"
                  class="league-link"
                >
                  {{ league.name }}
                </n-link>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MdListDropdown',
  props: {
    sport: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      imgs: {
        Boxing: '/md/sports/icon-boxe.svg',
        Futebol: '/md/sports/icon-futebol.svg',
        'E-Games': '/md/sports/icon-e-sports.svg',
        Voleibol: '/md/sports/icon-volei.svg',
        Basquetebol: '/md/sports/icon-basquete.svg',
        Handebol: '/md/sports/icon-handball.svg',
        Ténis: '/md/sports/icon-tenis.svg',
        FutebolAmericano: '/md/sports/icon-fut-americano.svg',
        TénisdeMesa: '/md/sports/icon-tenis-mesa.svg'
      }
    }
  },
  computed: {
    id () {
      if (this.sport.name) {
        return this.sport.name.replace(/\s/g, '').replace(/\//g, '')
      }
      return ''
    }
  }
}
</script>

<style lang="scss" scoped>
.first-dropdown {
  display: flex;
  align-items: center;
  height: 32px;
  padding: 0 8px;

  .sport-icon {
    width: 24px;
    height: 24px;
  }
  .game-name {
    margin-left: 10px;
    white-space: nowrap;
    font-size: 14px;
    font-weight: bold;
    color: var(--md-font-color);
  }
  .games-count {
    margin-left: auto;
    font-size: 12px;
    color: var(--md-font-color);
  }

  .hidden-icon {
    width: 25px;
    padding-left: 8px;
    height: 100%;
    margin-left: auto;
    display: none;

    .link-arrow {
      width: 8px;
      height: 8px;
      transition: all ease-in-out 300ms !important;
    }
  }

  &:hover {
    background: var(--md-bg-color);
    border: 1px solid var(--md-comp-border-color);
    border-radius: 3px;
    -webkit-box-shadow: 0 1px 2px var(--md-strong-shadow-color);
    box-shadow: 0 1px 2px var(--md-strong-shadow-color);

    .game-name {
      margin-left: 15px;
      color: var(--fut-primary);
    }
    .games-count {
      display: none;
    }
    .hidden-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      border-left:  1px solid var(--md-comp-border-color);
      .link-arrow {
        color: var(--fut-primary);
      }
    }
  }
  &[aria-expanded="true"] {
    background: var(--md-bg-color);
    border: 1px solid var(--md-comp-border-color);
    border-radius: 3px;
    -webkit-box-shadow: 0 1px 2px var(--md-strong-shadow-color);
    box-shadow: 0 1px 2px var(--md-strong-shadow-color);

    .games-count {
      display: none;
    }
    .hidden-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      border-left:  1px solid var(--md-comp-border-color);
      .link-arrow {
        -webkit-transform: rotate(90deg);
        transform: rotate(180deg);
      }
    }
  }
}

.second-dropdown {
  color: var(--md-font-color);
  font-size: 13px;
  margin: 5px 0 0 4px;
  list-style: none;

  .countries {
    .country {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 4px 12px 4px 10px;
      white-space: nowrap;

      .country-name {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .link-arrow {
        width: 8px;
        height: 8px;
        transition: all ease-in-out 300ms !important;
      }

      &::before {
        content: '';
        position: absolute;
        top: 10px;
        left: -16px;
        width: 6px;
        height: 6px;
        border-radius: 3px;
        border: 1px solid #aeb9c4;
        background: transparent;
        transition: all ease-in-out 300ms;
      }
      &:hover {
        color: var(--fut-primary);
        &::before {
          background: var(--fut-primary);
          border: 1px solid var(--fut-primary);
        }

        .country-name {
          padding-left: 5px;
        }
      }
      &[aria-expanded="true"] {
        color: var(--fut-primary);
        &::before {
          background: var(--fut-primary);
          border: 1px solid var(--fut-primary);
        }

        .country-name {
          padding-left: 5px;
        }
        .link-arrow {
          -webkit-transform: rotate(90deg);
          transform: rotate(180deg);
        }
      }
    }
    .league-list {
      list-style: none;
      padding: 0;
      margin: 0;

      .league-link {
        overflow: hidden;
        display: block;
        text-decoration: none;
        width: 155px;
        margin-bottom: 3px;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: var(--md-font-color);
        font-size: 13px;

        &:hover {
          color: var(--fut-primary);
        }
      }
    }
  }
}

.yellow-star {
  width: 20px;
  height: 20px;
  padding: 2px;
  color: rgb(255, 255, 0);
}
</style>
