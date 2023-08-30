<template>
  <div ref="sportsGroup" class="ov-container bg-dark pt-1" :style="{'top': defaultTopDistance ? '0px' : ''}">
    <ul class="ps-0 mb-1">
      <li
        v-for="(sport, index) in sports"
        :key="'sports_return_select_'+index"
        :class="{compact: currentScroll > 40}"
        class="transition"
      >
        <fut-button
          class="w-100 h-100 transition btn-select-sport"
          :rounded="true"
          :dark="selected!==sport.id"
          :primary="selected===sport.id"
          :disabled="!sport.active"
          :to="sport.active ? `/sport/${+sport.id}${inplay ? '/aovivo' : ''}` : null"
          @click="selected=sport.id"
        >
          <i v-if="sport.id === 6046" :class="['icon', 'icon-soccer', (selected===sport.id)?'text-background':'text-secondary-light']" />
          <i v-if="sport.id === 48242" :class="['icon', 'icon-basket', (selected===sport.id)?'text-background':'text-secondary-light']" />
          <i v-if="sport.id === 154919" :class="['icon', 'icon-boxing', (selected===sport.id)?'text-background':'text-secondary-light']" />
          <i v-if="sport.id === 54094" :class="['icon', 'icon-tenis', (selected===sport.id)?'text-background':'text-secondary-light']" />
          <i v-if="sport.id === 265917" :class="['icon', 'icon-mesa', (selected===sport.id)?'text-background':'text-secondary-light']" />
          <i v-if="sport.id === 154830" :class="['icon', 'icon-voley', (selected===sport.id)?'text-background':'text-secondary-light']" />
          <i v-if="sport.id === 621569" :class="['icon', 'icon-voley', (selected===sport.id)?'text-background':'text-secondary-light']" />
          <i v-if="sport.id === 35709" :class="['icon', 'icon-soccer', (selected===sport.id)?'text-background':'text-secondary-light']" />
          <i v-if="sport.id === 154914" :class="['icon', 'icon-tenis-2', (selected===sport.id)?'text-background':'text-secondary-light']" />
          <i v-if="sport.id === 687890" :class="['icon', 'icon-joy', (selected===sport.id)?'text-background':'text-secondary-light']" />
          <i v-if="sport.id === 131506" :class="['icon', 'icon-football', (selected===sport.id)?'text-background':'text-secondary-light']" />
          <p :class="['sport-title', 'mb-0', (selected===sport.id)?'text-background':'fut-color-dynamic']">
            <strong>{{ sport.name }}</strong>
          </p>
        </fut-button>
      </li>
      <li class="filler">
        <fut-button
          class="w-100 h-100 transition"
          :rounded="true"
          :disabled="true"
          :dark="true"
        >
          <p />
        </fut-button>
      </li>
    </ul>
  </div>
</template>
<script>
import FutButton from '@/components/default/atoms/FutButton'
import global from '@/mixins.js/global.js'

export default {
  components: { FutButton },
  mixins: [global],
  props: {
    inplay: Boolean,
    defaultTopDistance: {
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
      inplaySports: []
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
  .ov-container{
    display: grid;
    overflow-x: auto;
    overflow-y: hidden;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
    position: sticky;
    top: 65px;
    @media (min-width: 992px) {
      top: 97px;
    }
    z-index: 1;
  }
  .ov-container::-webkit-scrollbar{
    display: none;
  }
  ul{
    display: flex;
    flex-direction: row;
    width: 100%;
    li{
      display: flex;
      justify-content: center;
      width: auto;
      height: 45px;
      a, button {
        padding-left: 10px !important;
        padding-right: 10px !important;
        display: flex;
        white-space: nowrap;
      }
      @include md {
        width: 90px;
        height: 80px;
        a, button {
          display: block;
        }
      }
      border: 1px solid var(--fut-background-darker);
      border-right: 2px solid var(--fut-background-darker);
      border-left: 0px solid var(--fut-background-darker);
      padding-top: 0px;
      .icon{
        font-size: 30px;
        padding-right: 7px;
        @include md {
          padding-right: 0px;
          font-size: 40px;
        }
      }
    }
    p{
      color: $white;
      font-size: 12px;
      padding-top: 5px;
    }
  }
  a, button {
    border: none !important;
    padding: 5px !important;
  }
  .compact{
    @include md{
      .icon{
        font-size: 22px;
        padding-right: 5px;
      }
      p{
        margin-bottom: 0;
        padding-top: 0 !important;
        white-space: nowrap;
        align-self: center;
      }
      height: 35px;
      width: auto;
      a, button {
        padding-left: 10px !important;
        padding-right: 10px !important;
        display: flex;
      }
    }
  }
  .filler{
    width: 100% !important;
    position: absolute;
    z-index: -1;
  }
  .sport-title{
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .btn-select-sport:disabled{
    opacity: .35;
  }
</style>
