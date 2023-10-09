<template>
  <div>
    <div v-if="promoId" class="container">
      <div class="d-flex">
        <div v-if="singlePromo" class="single-promo">
          <img :src="singlePromo.img" alt="Promo Image">
          <h1>{{ singlePromo.name }}</h1>
          <!-- eslint-disable-next-line -->
          <p v-html="singlePromo.text" />
        </div>
      </div>
    </div>

    <div v-else>
      <div class="title d-flex align-items-center">
        <div class="container">
          <div class="d-flex justify-content-between align-items-center">
            <h1>
              {{ $t('i18n_promocao', 2) }}
            </h1>
            <img
              src="/Sk/promo-banner.png"
              alt="Promo Banner"
            >
          </div>
        </div>
      </div>

      <div class="container">
        <div class="promos-body">
          <NuxtLink
            v-for="(promo, idx) in getPromos"
            :key="idx"
            :to="localePath(`/promo/${promo.id}`)"
            class="promo"
          >
            <img
              :src="promo.img"
              alt="Promo Image"
              class="transition"
            >
            <h2>{{ promo.name }}</h2>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { usePromoStore } from '@/stores/promo'

export default {
  name: 'SkPromo',
  data () {
    return {
      promoId: null
    }
  },
  computed: {
    ...mapState(usePromoStore, {
      getPromos: 'getPromos'
    }),
    singlePromo () {
      if (this.promoId && this.getPromos && this.getPromos.length) {
        return this.getPromos.find(promo => +promo.id === +this.promoId)
      }

      return null
    }
  },
  created () {
    this.promoId = this.$route.params.id

    this.fetchPromos()
  },
  methods: {
    ...mapActions(usePromoStore, {
      fetchPromos: 'fetchPromos'
    })
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 0 3vw !important;
}

.single-promo {
  padding-top: 34px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  max-width: 650px;

  img {
    border-radius: .5rem;
  }
  h1 {
    font-size: 2rem;
    font-weight: 600;
    color: var(--fut-color-dynamic);
    margin: 24px 0;
  }
  p {
    color: var(--fut-color-dynamic);
  }
}

.title {
  background: var(--fut-background-lighter);

  h1 {
    color: var(--fut-color-dynamic);
    font-size: 1.7rem;
    font-weight: 600;
  }
}

.promos-body {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem 1.5rem;
  padding-top: 32px;

  .promo {
    display: flex;
    flex-direction: column;
    max-width: 100%;
    text-decoration: none;

    img {
      width: 100%;
      border-radius: .25rem;
    }

    h2 {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--fut-color-dynamic);
      margin-top: 16px;
    }

    &:hover {
      img {
        margin-top: -8px;
        margin-bottom: 8px;
      }
    }
  }
}

@media (max-width: 821px) {
  .promos-body {
    grid-template-columns: 1fr !important;
  }
}
</style>
