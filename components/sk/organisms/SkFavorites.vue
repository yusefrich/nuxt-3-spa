<template>
  <div class="sk-favorites">
    <div class="dropdown">
      <button
        id="sk-favorites-dropdown"
        class="filter-btn transition dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <div>
          <span>{{ $t('i18n_esporte', 2) }}:</span>
          <span class="counter">{{ checkedCounter }}</span>
          <font-awesome-icon class="icon transition" :icon="['fas', 'chevron-down']" />
        </div>
      </button>
      <ul
        class="dropdown-menu"
        aria-labelledby="sk-favorites-dropdown"
      >
        <li
          v-for="(sportData, sportId, idx) in sportsList"
          :key="idx"
          class="list-item"
          @click.stop
        >
          <label :for="`sport-${sportId}`" @click.stop>
            <input
              :id="`sport-${sportId}`"
              :value="sportData.checked"
              type="checkbox"
              @change="changeFavorites(sportData)"
            >
            <span class="check transition" :class="{ active: sportData.checked }">
              <font-awesome-icon v-if="sportData.checked" class="icon" :icon="['fas', 'check']" />
            </span>
            <span>{{ sportData.name }}</span>
          </label>
        </li>
      </ul>
    </div>

    <sk-games-list
      v-if="inplaySports"
      :title="$t('i18n_eventos_ativos')"
      :title-icon="['fas', 'play-circle']"
      :sports-list="filtered.inplaySports"
      :events="inplayEvents"
      :selected-sport="selectedInplaySport"
      :is-mobile="isMobile"
      live
      class="my-4"
      @changeSport="$emit(
        'changeSport',
        { sportId: $event.sportId, type: 'inplay' }
      )"
    />

    <sk-games-list
      v-if="preMatchSports"
      :title="$t('i18n_comecando_em_breve')"
      :title-icon="['fas', 'stopwatch']"
      :sports-list="filtered.preMatchSports"
      :events="preMatchEvents"
      :selected-sport="selectedPreMatchSport"
      :tickets="tickets"
      :is-mobile="isMobile"
      class="my-4"
      @changeSport="$emit(
        'changeSport',
        { sportId: $event.sportId, type: 'pre-match' }
      )"
      @selectBet="$emit('selectBet', $event)"
    />
  </div>
</template>

<script>
export default {
  name: 'SkFavorites',
  props: {
    sportsList: {
      type: Object,
      default: () => ({})
    },
    inplaySports: {
      type: Array,
      default: () => ([])
    },
    preMatchSports: {
      type: Array,
      default: () => ([])
    },
    inplayEvents: {
      type: Array,
      default: () => ([])
    },
    preMatchEvents: {
      type: Array,
      default: () => ([])
    },
    selectedInplaySport: {
      type: Number,
      default: 6046
    },
    selectedPreMatchSport: {
      type: Number,
      default: 6046
    },
    tickets: {
      type: Array,
      default: () => ([])
    },
    isMobile: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    checkedCounter () {
      return Object.values(this.sportsList).filter(item => item.checked).length
    },
    filtered () {
      return {
        inplaySports: this.inplaySports.filter(
          item => Object.values(this.sportsList)
            .filter(sport => sport.checked)
            .map(mItem => mItem.id)
            .includes(item.id)
        ),
        preMatchSports: this.preMatchSports.filter(
          item => Object.values(this.sportsList)
            .filter(sport => sport.checked)
            .map(mItem => mItem.id)
            .includes(item.id)
        )
      }
    }
  },
  created () {
    this.$emit(
      'changeSport',
      { sportId: Object.values(this.sportsList).find(item => item.checked).id, type: 'inplay' }
    )
    this.$emit(
      'changeSport',
      { sportId: Object.values(this.sportsList).find(item => item.checked).id, type: 'pre-match' }
    )
  },
  methods: {
    changeFavorites (item) {
      this.$emit('changeFavorites', { ...item, checked: !item.checked })
      this.$emit(
        'changeSport',
        { sportId: Object.values(this.sportsList).find(item => item.checked).id, type: 'inplay' }
      )
      this.$emit(
        'changeSport',
        { sportId: Object.values(this.sportsList).find(item => item.checked).id, type: 'pre-match' }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.sk-favorites {
  .filter-btn {
    position: relative;
    border: none;
    font-size: .875rem;
    font-weight: 600;
    color: var(--fut-color-dynamic);
    background: var(--fut-background-darkest);
    padding: .75rem 1rem;
    border-radius: .25rem;

    .icon {
      width: 12px;
      height: 12px;
      color: var(--fut-secondary);
    }

    .counter {
      background: var(--fut-primary-lighter);
      color: var(--fut-color-dynamic-inverse);
      padding: 0 .5em;
      border-radius: 2em;
      min-width: 1.8em;
      margin: 0 8px;
    }

    &:hover {
      background: var(--fut-background-black-2);

      .icon {
        color: var(--fut-color-dynamic);
      }
    }
    &:active {
      div {
        transform: scale(.95);
      }
    }
    &[aria-expanded="true"] {
      .icon {
        transform: rotate(180deg);
      }
    }
    &::after {
      display: none;
    }
  }

  .dropdown-menu {
    padding: .25rem 0;
    left: -12px !important;
    top: 5px !important;

    .list-item {
      padding: .75rem;

      label {
        position: relative;
        color: var(--fut-background-lighter);
        font-size: .875rem;
        font-weight: 600;
        display: inline-flex;
        cursor: pointer;

        input {
          position: absolute;
          left: 0;
          opacity: 0;
          z-index: -1;
        }

        .check {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 21px;
          height: 21px;
          border: 2px solid var(--fut-background-lightest-2);
          border-radius: 3px;
          margin-right: .5rem;

          &.active {
            background: var(--fut-background-lightest-2);
          }

          .icon {
            color: var(--fut-color-dynamic);
          }
        }

        &:hover {
          .check {
            border-color: var(--fut-secondary);
          }
        }
      }
    }
  }
}
</style>
