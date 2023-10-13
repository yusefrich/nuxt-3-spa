<template>
  <ul>
    <li
      v-for="(sport, index) in sports"
      :key="'sports_return_select_'+index"
    >
      <NuxtLink
        class="links transition"
        :class="{
          selected: selected===sport.id,
          'inplay-links': inplay,
          'inplay-selected': selected===sport.id && inplay
        }"
        :disabled="!sport.active"
        :to="sport.active ? localePath(`/sport/${+sport.id}${inplay ? '/aovivo' : ''}`) : ''"
        @click="selected=sport.id"
      >
        <img
          v-if="icons[sport.id]"
          :src="icons[sport.id]"
          alt="sport icon"
          height="18"
        >
        <font-awesome-icon v-if="sport.name === 'Especiais'" class="yellow-star" :icon="['fas', 'star']" />
        <span :sport="sport.name">
          {{ sport.name }}
        </span>
      </NuxtLink>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'MdSelectSport',
  props: {
    inplay: {
      type: Boolean,
      default: false
    },
    sports: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      selected: 1,
      inplaySports: [],
      icons: {
        6046: '/md/sports/icon-futebol.svg',
        35709: '/md/sports/icon-handball.svg',
        48242: '/md/sports/icon-basquete.svg',
        54094: '/md/sports/icon-tenis.svg',
        131506: '/md/sports/icon-fut-americano.svg',
        154830: '/md/sports/icon-volei.svg',
        154914: '/md/sports/icon-baseball.svg',
        154919: '/md/sports/icon-boxe.svg',
        265917: '/md/sports/icon-tenis-mesa.svg',
        621569: '/md/sports/icon-volei-praia.svg',
        687890: '/md/sports/icon-e-sports.svg'
      }
    }
  },
  mounted () {
    this.selected = this.$route.params && this.$route.params.sportId ? +this.$route.params.sportId : this.sports[0]?.id
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/layout/variables";
@import "@/assets/layout/breakpoints";

ul{
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 45px;
  padding: 0 12px;
  margin: 0;
  overflow-x: auto;

  &::-webkit-scrollbar-track {
    opacity: .3;
    border-radius: 0.125rem;
    background-color: lightgray;
  }
  &::-webkit-scrollbar {
    opacity: .3;
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
    opacity: .3;
    background-color: gray;
  }

  li{
    display: flex;
    justify-content: center;

    .links {
      border-radius: 6px;
      text-decoration: none;
      margin-left: 4px;
      padding: 2px 8px;
      white-space: nowrap;
      color: var(--md-font-color);
      span {
        font-size: 12px;
        font-weight: 500;
      }

      &:hover {
        background: var(--md-comp-bg-color);
      }
      &:active {
        background: var(--md-bg-color);
      }
    }
    .selected {
      background: var(--md-comp-bg-color);

      &:hover {
        background: var(--md-bg-color);
      }
    }
    .inplay-links {
      color: #fff !important;
      &:hover {
        background: rgba(255, 255, 255, 0.3);
      }
      &:active {
        background: rgba(255, 255, 255, 0.2);
      }
    }
    .inplay-selected {
      background: rgba(255, 255, 255, 0.3);

      &:hover {
        background: rgba(255, 255, 255, 0.2);
      }
    }
  }

  @media (max-width: 768px) {
    .links {
      display: flex;
      flex-direction: column;
      margin: 12px 0;
    }
  }
}

.yellow-star {
  color: rgb(255, 255, 0);
}
</style>
