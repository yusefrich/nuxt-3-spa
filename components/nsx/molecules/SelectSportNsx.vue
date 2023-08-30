<template>
  <div ref="sportsGroup" class="ov-container">
    <ul class="ps-0 justify-content-center mb-0">
      <li v-for="(sport, index) in sports" :key="'inplay_select_'+index">
        <nsx-fut-button
          class="w-100 h-100 pt-2 old-bet-hover"
          :class="{active:selected===sport.id}"
          :rounded="false"
          @click="$emit('change', sport.id), selected = sport.id"
        >
          <img v-if="sport.id === 6046" src="/bet365icons/1.svg" width="25px" height="25px" alt="">
          <img v-if="sport.id === 48242" src="/bet365icons/2.svg" width="25px" height="25px" alt="">
          <img v-if="sport.id === 154919" src="/bet365icons/10.svg" width="25px" height="25px" alt="">
          <img v-if="sport.id === 54094" src="/bet365icons/5.svg" width="25px" height="25px" alt="">
          <img v-if="sport.id === 265917" src="/bet365icons/20.svg" width="25px" height="25px" alt="">
          <img v-if="sport.id === 154830" src="/bet365icons/23.svg" width="25px" height="25px" alt="">
          <img v-if="sport.id === 621569" src="/bet365icons/34.svg" width="25px" height="25px" alt="">
          <img v-if="sport.id === 35709" src="/bet365icons/6.svg" width="25px" height="25px" alt="">
          <img v-if="sport.id === 154914" src="/bet365icons/3.svg" width="25px" height="25px" alt="">
          <img v-if="sport.id === 687890" src="/bet365icons/games.svg" width="25px" height="25px" alt="">
          <img v-if="sport.id === 131506" src="/bet365icons/16.svg" width="25px" height="25px" alt="">
          <span
            style="line-height: 16px; margin-bottom: -8px;"
            :class="['sport-title d-block', (selected===sport.id)?'text-selected':'fut-color-dynamic']"
          >
            <span>{{ sport.name }}</span>
          </span>
          <span :class="[(selected===sport.id)?'text-selected':'fut-color-dynamic']">({{ sport.total }})</span>
        </nsx-fut-button>
      </li>
    </ul>
  </div>
</template>

<script>
import NsxFutButton from '@/components/nsx/atoms/NsxFutButton.vue'

export default {
  name: 'SelectSportNsx',
  components: {
    NsxFutButton
  },
  props: {
    currentSelected: {
      type: Number,
      default: null
    },
    games: {
      type: Array,
      default: () => ([])
    },
    currentSettings: {
      type: Object,
      default: () => ({})
    },
    sports: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      selected: 6046
    }
  },
  watch: {
    selected (val) {
      this.$emit('change', val)
    }
  },
  created () {
    this.selected = this.$route.params && this.$route.params.sportId ? +this.$route.params.sportId : 6046

    if (this.currentSelected) {
      this.selected = this.currentSelected
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/layout/variables";
  .ov-container{
    display: grid;
    overflow: auto;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
    z-index: 1;
  }
  .old-bet-hover span{
    font-size: 12px;
  }
  .text-selected{
    color: #ffba39;
  }
  .old-bet-hover img{
    -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
    filter: grayscale(100%);
  }
  .old-bet-hover.active img{
    -webkit-filter: grayscale(0%); /* Safari 6.0 - 9.0 */
    filter: grayscale(0%);
  }
  .old-bet-hover:hover{
    img{
      -webkit-filter: grayscale(0%); /* Safari 6.0 - 9.0 */
      filter: grayscale(0%);
    }
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
      width: 90px;
      height: 77px;
      padding-top: 0px;
      .icon{
        font-size: 40px;
      }
    }
    p{
      color: $white;
      font-size: 12px;
      padding-top: 5px;
    }
  }
  .sport-title{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .compact{
    .icon{
      font-size: 19px;
    }
    .sport-title{
      font-size: 12px;
      line-height: 0.4;
    }
    p{
      margin-bottom: 0;
    }
    height: 50px;
    a{
      padding: 5px !important;
      padding-top: 5px !important;
    }
  }
</style>
