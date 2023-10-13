<template>
  <div class="menu-general-wrapper" :style="`top: ${topOffset}px`">
    <div class="w-100 text-center transition d-none d-lg-block">
      <fb-fut-button class="btn-casino-main text-white transition fut-color-dynamic">
        {{ $t('i18n_cassino') }}
      </fb-fut-button>
    </div>
    <div class="d-lg-flex justify-content-around menu-wrapper">
      <div class="section">
        <div class="search-input-wrapper mt-2">
          <input v-model="search" class="search-input fut-color-dynamic" type="search" :placeholder="$t('i18n_buscar')">
          <fa class="text-white pt-1 fut-color-dynamic" :icon="['fas', 'search']" />
        </div>
      </div>
      <div class="section-menu d-flex">
        <fb-fut-button class="btn-scroll d-none d-lg-block fut-color-dynamic" @click="scrollLeft">
          <fa :icon="['fas', 'chevron-left']" />
        </fb-fut-button>
        <div id="scroller-sticky-bar-container" class="menu-container">
          <div class="menu-group">
            <div class="menu-item">
              <fb-fut-button
                class="a text-white fut-color-dynamic"
                :class="{active: currentCat === 'mocked-most'}"
                :to="`/${live ? 'casino-aovivo' : 'casino'}?cat=mocked-most`"
              >
                {{ $t('i18n_populares') }}
              </fb-fut-button>
            </div>
            <div class="menu-item">
              <fb-fut-button
                class="a text-white fut-color-dynamic"
                :class="{active: currentCat === 'mocked-new'}"
                :to="`/${live ? 'casino-aovivo' : 'casino'}?cat=mocked-new`"
              >
                {{ $t('i18n_lancamentos') }}
              </fb-fut-button>
            </div>
            <template v-for="(category, index) in categories">
              <div v-if="category.main" :key="'category_index_'+index" class="menu-item">
                <fb-fut-button class="a text-white fut-color-dynamic" :class="{active: currentCat === category.slug}" :to="'/casino?cat='+category.slug">
                  <span>{{ category.category }}</span>
                </fb-fut-button>
              </div>
            </template>
          </div>
        </div>
        <fb-fut-button class="btn-scroll d-none d-lg-block fut-color-dynamic" @click="scrollRight">
          <fa :icon="['fas', 'chevron-right']" />
        </fb-fut-button>
      </div>
      <div class="section">
        <fb-fut-button class="provider-filter-btn text-white mt-lg-2 mt-3 fut-color-dynamic" data-bs-toggle="collapse" data-bs-target="#providersCollapse">
          {{ $t('i18n_filtrar') }}
        </fb-fut-button>
      </div>
    </div>
    <div class="container-fluid providers-container transition">
      <div id="providersCollapse" class="collapse">
        <div class="container-sm">
          <div class="providers-container-scroll">
            <div class="row">
              <div v-for="(provider, index) in providers" :key="'provider_list_'+index" class="col-6 col-md-3">
                <fb-fut-button class="btn-provider fut-color-dynamic" :to="'/casino?prov=' + provider.slug">
                  <img v-if="provider.img" :src="provider.img" alt="" class="img-provider">
                  <span v-else class="game-name">{{ provider.provider }}</span>
                </fb-fut-button>
              </div>
            </div>
          </div>
        </div>
        <!-- Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger. -->
      </div>
    </div>
  </div>
</template>

<script>
import FbFutButton from '@/components/fb/atoms/FbFutButton.vue'

export default {
  components: {
    FbFutButton
  },
  props: {
    topOffset: {
      type: Number,
      default: 0
    },
    providers: {
      type: Array,
      default: () => ([])
    },
    heading: {
      type: Array,
      default: () => ([])
    },
    categories: {
      type: Array,
      default: () => ([])
    },
    live: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      search: ''
    }
  },
  computed: {
    currentCat () {
      return this.$route.query.cat
    }
  },
  watch: {
    search (val) {
      this.$emit('search', val)
    }
  },
  mounted () {
    const el = document.querySelector('.menu-general-wrapper')
    document.addEventListener(
      'scroll', (e) => {
        el.classList.toggle(
          'is-pinned',
          el.offsetTop <= window.scrollY + (this.topOffset + 1)
        )
      }
    )
    // const observer = new IntersectionObserver(
    //   ([e]) => e.target.classList.toggle('is-pinned', e.intersectionRatio < 1),
    //   { threshold: [1] }
    // )
    // observer.observe(el)
  },
  methods: {
    scrollLeft () {
      document.getElementById('scroller-sticky-bar-container').scrollLeft -= 200
    },
    scrollRight () {
      document.getElementById('scroller-sticky-bar-container').scrollLeft += 200
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/layout/breakpoints";
@import "@/assets/layout/variables";
.img-provider{
  width: 100%;
  height: 40px;
  object-fit: contain;
}
.providers-container-scroll{
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 20px 10px;
  &::-webkit-scrollbar-track {
    opacity: .5;
    border-radius: 0.125rem;
    background-color: var(--fut-background-lighter);
  }
  &::-webkit-scrollbar {
    opacity: .3;
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    // border: solid 2px var(--nsx-dark-7);
    opacity: .3;
    border-radius:50px;
    width: 5px;
    background-color: var(--fut-background-lightest);
  }
}
.providers-container{
  background: var(--fut-background);
  .btn-provider{
    text-decoration: none;
    padding: 10px;
    background: var(--fut-background-lighter);
    width: 100%;
    height: 60px;
    display: block;
    margin-top: 10px;
    border-radius: 10px;
    text-align: center;
    font-weight: bold;
    span{
      vertical-align: -webkit-baseline-middle;
    }
    &:hover{
      background: var(--fut-background-lightest);
    }
  }
}
.btn-casino-main{
  background: var(--fut-background-lighter);
  position: absolute;
  left: 0;
  right: 0;
  border-radius: 0;
  font-size: 16px;
  padding-top: 1px;
  top: -24px;
  margin: auto;
  width: 140px;
  line-height: 25px;
  font-weight: bold;
  border: none;
  border-top: 2px solid var(--fut-primary);
  z-index: 10;
  &::before{
    z-index: 10;
    content: "";
    position: absolute;
    width: 50%;
    height: 28px;
    background: var(--fut-background-lighter);
    z-index: -1;
    right: 80%;
    transform: skew(-45deg, 0deg);
    border-top-left-radius: 10px;
    border-left: 4px solid var(--fut-primary);
    border-top: 2px solid var(--fut-primary);
    top: -2px;
  }
  &::after{
    content: "";
    position: absolute;
    width: 50%;
    height: 28px;
    background: var(--fut-background-lighter);
    z-index: -1;
    left: 80%;
    transform: skew(45deg, 0deg);
    border-top-right-radius: 10px;
    border-right: 4px solid var(--fut-primary);
    border-top: 2px solid var(--fut-primary);
    top: -2px;
  }
}
.menu-wrapper{
  @include lg {
    border-top: 3px solid var(--fut-primary);
  }
  background: var(--fut-background);
  flex-direction: row-reverse;
}
.menu-general-wrapper{
  @include md {
    position: sticky;
    top: 0;
    z-index: 100;
  }
  &.is-pinned{
    .providers-container{
      background: var(--fut-background-transparent);
    }
    .menu-wrapper{
      border-top: none;
    }
    .btn-casino-main{
      top: 48px !important;
      color: var(--fut-background) !important;
      background: var(--fut-primary);
      border: none;
      &::before{
        z-index: 10;
        content: "";
        position: absolute;
        width: 50%;
        height: 100%;
        background: var(--fut-primary);
        z-index: -1;
        right: 80%;
        transform: skew(45deg, 0deg);
        border-top-left-radius: 0;
        border-bottom-left-radius: 10px;
        top: 0 !important;
        color: var(--fut-background);
      }
      &::after{
        content: "";
        position: absolute;
        width: 50%;
        height: 100%;
        background: var(--fut-primary);
        z-index: -1;
        left: 80%;
        top: 0 !important;
        transform: skew(-45deg, 0deg);
        border-top-right-radius: 0;
        border-bottom-right-radius: 10px;
      }
    }
  }
}
.search-input-wrapper{
  display: flex;
  background: var(--fut-background-lighter);
  padding: 5px 15px;
  @include lg {
    border-radius: 50px;
  }
  .search-input{
    // background-color: var(--search_container_bg);
    width: 100%;
    @include lg {
      max-width: 120px;
    }
    color: white;
    border: none;
    background: transparent;
    outline: transparent;
  }
}
.provider-filter-btn{
  background: var(--fut-background);
  border: 3px solid var(--fut-primary);
  border-radius: 30px;
  text-align: center;
  text-transform: uppercase;
  padding: 5px 60px;
  font-size: 11px;
  @include _lg{
    width: calc(100% - 40px);
    margin: 10px 20px;
  }
}
.btn-scroll{
  color: var(--fut-background);
  background: linear-gradient(90deg, var(--fut-primary-darker) 0%, var(--fut-primary) 100%);
  border: none;
  border-radius: 0;
  padding: 0px 8px;
}
.menu-container{
  max-width: 100%;
  // @include sm {
  //   max-width: 400px;
  // }
  @include lg {
    max-width: 600px;
  }
  @include xl {
    max-width: 1000px;
  }
  overflow: auto;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    display: none;
  }
}
.menu-group{
  scroll-snap-type: x mandatory;
  // flex-direction: row;
  display: inline-flex;
  // flex-wrap: wrap;
  padding-left: 0;
  margin-bottom: 0;
  // list-style: none;
  // max-width: 1000px;
  // overflow: auto;
  @include lg {
    z-index: 20;
  }
  width: 100%;
  position: relative;
  .menu-item{
    max-width: 200px;
    width: 100%;
    border-right: 1px solid var(--fut-background-lightest);
    background: var(--fut-background-lighter);
    .a{
      text-align: center;
      display: block;
      width: 200px;
      cursor: pointer;
      border-radius: 0;
      display: block;
      font-size: 13px;
      text-decoration: none;
      padding: 16px 0px;
      &:hover{
        color: var(--fut-background);
        background: linear-gradient(90deg, var(--fut-primary-darker) 0%, var(--fut-primary) 100%);
      }
      &.active{
        color: var(--fut-background);
        background: linear-gradient(90deg, var(--fut-primary-darker) 0%, var(--fut-primary) 100%);
      }
    }
  }
}

.game-name {
  color: var(--fut-primary);
}
</style>
