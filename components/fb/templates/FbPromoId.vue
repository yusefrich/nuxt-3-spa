<template>
  <fut-html-render v-if="getPromos">
    <img
      style="object-fit: contain w-100"
      height="200"
      :src="promo.img"
    >
    <h1 class="text-center py-3 fw-bold">
      {{ promo.name }}
    </h1>
    <!-- eslint-disable-next-line -->
    <div class="text-center" v-html="promo.text" />
  </fut-html-render>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { usePromoStore } from '@/stores/promo'

import FutHtmlRender from '@/components/default/atoms/FutHtmlRender'

export default {
  name: 'FbPromoId',
  components: {
    FutHtmlRender
  },
  data () {
    return {
      promo: {
        open: false,
        name: false,
        text: false,
        img: false
      }
    }
  },
  computed: {
    ...mapState(usePromoStore, {
      getPromos: 'getPromos'
    })
  },
  created () {
    this.fetchPromos().then(() => {
      if (this.$route.params.id) {
        this.findPromo(+this.$route.params.id)
      }
    })
  },
  methods: {
    ...mapActions(usePromoStore, {
      fetchPromos: 'fetchPromos'
    }),
    findPromo (promoId) {
      const obj = this.getPromos.find(element => element.id === promoId)

      if (!obj) {
        this.$toast.open({ message: 'Erro ao buscar promoção selecionada', type: 'error' })
        return
      }

      this.promo.name = obj.name
      this.promo.text = obj.text
      this.promo.img = obj.img
    }
  }
}
</script>

<style lang="scss" scoped>
h1{
  font-size: 32px;
}
</style>
