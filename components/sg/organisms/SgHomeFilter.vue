<template>
  <div>
    <div class="mt-4 d-flex px-2 py-1 align-items-center w-100 search-bar d-md-none">
      <img src="/Sg/Home/icons8-pesquisar.png" alt="">
      <input class="w-100 ms-2 border-0 bg-transparent outline-0" placeholder="Procure seu jogo favorito!" type="text" @focus="focusSearch()">
    </div>
    <div class="tabs-custom pb-4 mt-4">
      <a v-if="target" :href="localePath('/')" class=" ms-2 d-flex justify-content-center py-2 px-3 align-items-center button-menu transition text-decoration-none" :class="{'b-active': !selected}">
        <img class="me-2" width="15px" height="15px" src="/Sg/Dice.png" alt="">
        <span>{{ $t('i18n_salao') }}</span>
      </a>
      <button v-else class=" ms-2 d-flex justify-content-center py-2 px-3 align-items-center button-menu transition text-decoration-none" :class="{'b-active': !selected}" @click="()=>{$emit('select', null); selected = null}">
        <img class="me-2" width="15px" height="15px" src="/Sg/Dice.png" alt="">
        <span>{{ $t('i18n_salao') }}</span>
      </button>
      <a
        :href="localePath(`/casino/category/mocked-most${live ? '?live=true' : ''}`)"
        class=" ms-2 d-flex justify-content-center py-2 px-3 align-items-center button-menu transition text-decoration-none"
      >
        <img class="me-2" width="15px" height="15px" src="/Sg/fire-w.png" alt="">
        <span>{{ $t('i18n_mais_jogados') }}</span>
      </a>
      <a
        :href="localePath(`/casino/category/mocked-new${live ? '?live=true' : ''}`)"
        class=" ms-2 d-flex justify-content-center py-2 px-3 align-items-center button-menu transition text-decoration-none"
      >
        <img class="me-2" width="15px" height="15px" src="/Sg/NewGames.png" alt="">
        <span>{{ $t('i18n_lancamentos') }}</span>
      </a>
      <template v-for="(cat, i) in categories" :key="`link_${i}_${cat.slug}`">
        <a v-if="target" :href="localePath('/casino/category/' + cat.slug)" class=" ms-2 d-flex justify-content-center py-2 px-3 align-items-center button-menu transition text-decoration-none" :class="{'b-active': selected === cat.slug}">
          <img class="me-2" width="15px" height="15px" src="/Sg/Casino-w.png" alt="">
          <span class="casino-games-title-name">{{ cat.name }}</span>
        </a>
        <button v-else :key="'dinamic_' + i + '_' + cat.slug" class=" ms-2 d-flex justify-content-center py-2 px-3 align-items-center button-menu transition" :class="{'b-active': selected === cat.slug}" @click="()=>{$emit('select', cat.slug); selected = cat.slug}">
          <img class="me-2" width="15px" height="15px" src="/Sg/Casino-w.png" alt="">
          <span class="casino-games-title-name">{{ cat.name }}</span>
        </button>
      </template>
    </div>
    <div class="my-3 border-darkest" />
  </div>
</template>

<script>
export default {
  name: 'SgHomeFilter',
  props: {
    categories: {
      type: Array,
      default: () => ([])
    },
    target: {
      type: String,
      default: null
    },
    live: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'select'
  ],
  data () {
    return {
      selected: null
    }
  },
  mounted () {
    this.selected = this.$route.params.categorySlug
  },
  methods: {
    focusSearch () {
      document.getElementById('searchId').click()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/layout/breakpoints";

.tabs-custom {
  display: flex;
  width: 100%;
  overflow: auto;
  white-space: nowrap;
  @include md {
    // overflow-x: hidden;
  }
}
.search-bar {
  background-color: var(--fut-background-darkest);
  border: 2px solid var(--fut-background-lightest);
  border-radius: 50px;

  input {
    outline: none;
    color: white;
  }
}
.button-menu {
  border-radius: 15px;
  background-color: var(--fut-background-darker);
  border: 2px solid var(--fut-background-lightest);
  font-size: 13px;
  font-weight: bold;
  color: var(--fut-background-white);
  &:hover {
    color: white;
    background-color: var(--fut-background-lighter);
  }
}
.b-active {
  background-color: var(--fut-background-lighter);
  border: 2px solid var(--fut-secondary);
  color: white;
}
.border-darkest {
  border: 1px solid var(--fut-background-darkest);
}
.casino-games-title-name{
  // span{
  //   // border-bottom: 3px solid var(--fut-primary);
  //   padding-left: 10px;
  //   padding-right: 10px;
  // }
  text-transform: lowercase;
  display:inline-block;
  margin-top: 0px;
  // margin-bottom: 0px;
  &:first-letter {
    text-transform: uppercase;
  }
}
</style>
