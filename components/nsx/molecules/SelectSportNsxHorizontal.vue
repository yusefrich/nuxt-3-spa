<template>
  <div ref="sportsGroup" class="ov-container">
    <ul class="ps-0 justify-content-center">
      <li v-for="(sport, index) in sports" :key="'sports_mobile_select_'+index" class="border-right">
        <nsx-fut-button block :disabled="!sport.active" :to="'/sport/' + sport.id + '/leagues'" class="w-100 h-100 pt-2">
          <img v-if="sport.id === 6046" src="/bet365icons/1.svg" width="30px" height="30px" alt="">
          <img v-if="sport.id === 48242" src="/bet365icons/2.svg" width="30px" height="30px" alt="">
          <img v-if="sport.id === 154919" src="/bet365icons/10.svg" width="30px" height="30px" alt="">
          <img v-if="sport.id === 54094" src="/bet365icons/5.svg" width="30px" height="30px" alt="">
          <img v-if="sport.id === 265917" src="/bet365icons/20.svg" width="30px" height="30px" alt="">
          <img v-if="sport.id === 154830" src="/bet365icons/23.svg" width="30px" height="30px" alt="">
          <img v-if="sport.id === 621569" src="/bet365icons/34.svg" width="30px" height="30px" alt="">
          <img v-if="sport.id === 35709" src="/bet365icons/6.svg" width="30px" height="30px" alt="">
          <img v-if="sport.id === 154914" src="/bet365icons/3.svg" width="30px" height="30px" alt="">
          <img v-if="sport.id === 687890" src="/bet365icons/games.svg" width="30px" height="30px" alt="">
          <img v-if="sport.id === 131506" src="/bet365icons/16.svg" width="30px" height="30px" alt="">
          <p :class="['sport-title mb-0']">
            <strong>{{ sport.name }}</strong>
          </p>
        </nsx-fut-button>
      </li>
    </ul>
  </div>
</template>

<script>
import NsxFutButton from '@/components/nsx/atoms/NsxFutButton.vue'

export default {
  name: 'SelectSportNsxHorizontal',
  components: {
    NsxFutButton
  },
  props: {
    currentSettings: {
      type: Object,
      default: () => ({})
    },
    sports: {
      type: Array,
      default: () => ([])
    }
  },
  fetch () {
    this.$emit('getDynamicSports')
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/layout/variables";
  .border-right{
    border-right: 1px solid var(--nsx-dark-6) ;
  }
  .ov-container{
    overflow-y: hidden;
    display: grid;
    overflow-x: auto;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
    position: sticky;
    top: 0;
    z-index: 1;
  }
  .old-bet-hover img{
    -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
    filter: grayscale(100%);
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
      height: 60px;
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
    color: #D2D2D2;
    overflow-x: hidden;
    text-overflow: ellipsis;
    strong{
      white-space: nowrap;
    }
  }
  .compact{
    .icon{
      font-size: 19px;
    }
    .sport-title{
      font-size: 12px;
      color: #D2D2D2;
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
