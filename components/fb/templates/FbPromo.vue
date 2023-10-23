<template>
  <div class="container">
    <div class="row mx-0 mt-5">
      <div
        v-for="(content, i) in getPromos"
        :key="'fb_promo_card_'+i"
        class="col-12 col-md-4"
      >
        <a :href="'/promo/'+content.id">
          <div class="promotion_container transition">
            <div class="promotion_image">
              <img :src="content.img">
            </div>
            <div class="promotion_title d-flex position-relative">
              <div class="promo_content_holder">
                <span class="promo_title text-white fut-color-dynamic">{{ content.name }}</span>
                <div class="bg-fade" />
                <hr class="d-none text-white fut-color-dynamic">
                <div class="promo_desc d-none mt-3 text-white fut-color-dynamic">
                  <!-- eslint-disable-next-line -->
                  <div class="text-decoration-none pb-3" v-html="shortText(content.text)" />
                </div>
              </div>
              <div class="promo_btn d-none text-white">
                <font-awesome-icon :icon="['fas', 'caret-square-right']" />
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { usePromoStore } from '@/stores/promo'

export default {
  name: 'FbPromo',
  computed: {
    ...mapState(usePromoStore, {
      getPromos: 'getPromos'
    })
  },
  created () {
    this.fetchPromos()
  },
  methods: {
    ...mapActions(usePromoStore, {
      fetchPromos: 'fetchPromos'
    }),
    shortText (str) {
      const stripped = str.replace(/<\/?[^>]+(>|$)/g, '')

      return stripped.substring(0, 150) + '...'// get first 5 chars
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/layout/breakpoints";
.promotion_container{
  background: var(--fut-background-lightest-2);
  border-radius: 5px;
  &:hover{
    scale: 1.1;
    .promo_desc, .promo_btn, hr{
      display: block !important;
    }
  }
}
hr{
  margin-top: 30px;
  margin-left: 10px;
  margin-right: 10px;
}
.promo_btn{
  background: var(--fut-primary);
  width: 70px;
  font-size: 30px;
  text-align: center;
  padding-top: 5px;
}
.promo_title{
  width: 100%;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  text-align: center;
  display: block;
  position: absolute;
  top: 5px;
  z-index: 10;
}
.promo_desc{
  font-weight: 700;
  font-size: 12px;
  text-align: center;
  padding-left: 5px;
  padding-right: 5px;
  text-decoration: none !important;
}
.promo_content_holder{
  width: 100%;
  min-height: 30px;
}
.promotion_image{
  img{
    width: 100%;
    height: 165px;
    object-fit: cover;
  }
}
.promotion_title{
  border-bottom: 2px solid var(--fut-primary);
  border-right: 2px solid var(--fut-primary);
  border-left: 2px solid var(--fut-primary);
  border-radius: 0 0 5px 5px;
}
.bg-fade{
  @include _md{
    background: linear-gradient(to bottom, var(--fut-background-transparent) 0%, rgba(0,0,0,0) 100%);
    width: calc(100% + 4px);
    height: 30px;
    transform: translateX(-2px);
  }
}
</style>
