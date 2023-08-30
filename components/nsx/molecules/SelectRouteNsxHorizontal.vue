<template>
  <div ref="sportsGroup" class="ov-container">
    <ul class="ps-0 justify-content-center">
      <li class="border-right">
        <nsx-fut-button block :to="'/sports'" class="w-100 h-100 pt-2">
          <img src="/bet365icons/1.svg" width="30px" height="30px" alt="">
          <p :class="['sport-title mb-0']">
            <strong>{{ $tc('i18n_esporte', 2) }}</strong>
          </p>
        </nsx-fut-button>
      </li>
      <li class="border-right">
        <nsx-fut-button block :to="'/sport/6046/aovivo'" class="w-100 h-100 pt-2">
          <img src="/bet365icons/live.svg" width="30px" height="30px" alt="">
          <p :class="['sport-title mb-0']">
            <strong>{{ $t('i18n_ao_vivo') }}</strong>
          </p>
        </nsx-fut-button>
      </li>
      <li class="border-right">
        <nsx-fut-button
          block
          class="w-100 h-100 pt-2"
          :external="productConfigPromoUrl.status !== null"
          :target="productConfigPromoUrl.status ? '_blank' : '_self'"
          :to="productConfigPromoUrl.url"
        >
          <img src="/bet365icons/promo.svg" width="30px" height="30px" alt="">
          <p :class="['sport-title mb-0']">
            <strong>{{ productConfigPromoUrl.status ? $t('i18n_ranking') : $tc('i18n_promocao', 1) }}</strong>
          </p>
        </nsx-fut-button>
      </li>
    </ul>
  </div>
</template>

<script>
import NsxFutButton from '@/components/nsx/atoms/NsxFutButton.vue'

export default {
  name: 'SelectRouteNsxHorizontal',
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
  },
  computed: {
    productConfigPromoUrl () {
      return { status: process.env.PRODUCT_CONFIG_PROMO_URL, url: process.env.PRODUCT_CONFIG_PROMO_URL ? process.env.PRODUCT_CONFIG_PROMO_URL : '/promo' }
    }
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
