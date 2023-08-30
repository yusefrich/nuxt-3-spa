<template>
  <div class="md-promo container">
    <h4 class="fw-bold mb-4">
      <img src="/md/promo-logo.png" alt="Promo logo">
      <span class="ms-1">{{ $t('i18n_promocoes_esportivas') }}</span>
    </h4>
    <div class="promo-field">
      <div
        v-for="(promo, idx) in getPromos"
        :key="idx"
        class="promo-wrapper"
      >
        <md-promo-card
          :promo="promo"
          @openPromo="openPromo($event)"
        />
      </div>
    </div>

    <md-modal-promo
      v-if="modal"
      v-model="modal"
      :promo="selectedPromo"
      @close="closeModal($event)"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import MdPromoCard from '@/components/md/atoms/MdPromoCard.vue'

export default {
  name: 'MdPromo',
  components: {
    MdPromoCard
  },
  data () {
    return {
      modal: false,
      selectedPromo: null
    }
  },
  computed: {
    ...mapGetters({
      getPromos: 'promo/getPromos'
    })
  },
  created () {
    this.fetchPromos().then(() => {
      if (this.$route.query.id) {
        this.openPromo(this.getPromos.find(item => item.id === +this.$route.query.id))
      }
    })
  },
  methods: {
    ...mapActions({
      fetchPromos: 'promo/fetchPromos'
    }),
    openPromo (promo) {
      this.selectedPromo = promo
      this.modal = true
    },
    closeModal () {
      this.modal = false
    }
  }
}
</script>

<style lang="scss" scoped>
.md-promo {
  color: var(--md-highlight-lighter);
  background: var(--md-bg-color);
  height: 100vh;

  .promo-field {
    display: flex;
    flex-wrap: wrap;

    .promo-wrapper {
      margin: 0 24px 24px 0;
    }
  }
}

@media (max-width: 425px) {
  .promo-wrapper {
    margin-right: 0 !important;
    width: 100%;
    display: flex;
    justify-content: center;
  }
}
</style>
