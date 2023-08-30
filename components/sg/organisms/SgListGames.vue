<template>
  <div class="sg-games">
    <div class="d-flex mb-3">
      <img class="me-2" width="40px" height="40px" src="/Sg/chips.svg" alt="">
      <h4 class="mb-0 text-white fw-bold casino-games-title-name w-100">
        <span>
          {{ gameGroup.name }}
        </span>
      </h4>
    </div>
    <div class="row mx-0">
      <div v-for="(item, index) in gameGroup.games" :key="'item_slide_' + gameGroup.slug + '_' + index" class="col-6 col-md-2 px-0 mb-2 mb-md-5">
        <div
          class="slide d-flex pe-4"
        >
          <!-- :width="200" -->

          <sg-game-card
            v-if="item"
            :item="item"
            :user="user"
            @select="payload => $emit('select', payload)"
            @register="$emit('register')"
          />
          <!-- <button class="game-btn position-relative" @click="user ? $emit('select', item) : ()=>{}">
            <img
              class="game-img img-fluid transition"
              :src="item.icon"
              alt=""
            >
            <div class="game-container-ol"></div>
            <div class="game-container-bg"></div>
            <div class="container-btn-play text-center">
              <button class="game-btn-play transition mb-1" @click="user ? ()=>{} : $emit('register')">
                <small>
                  <font-awesome-icon :icon="['fas', 'play-circle']" /> Jogo Real
                </small>
              </button>
              <button v-if="!user" class="sec-game-btn-play transition" @click="$emit('select', item)">
                <small>
                  Modo Diversão
                </small>
              </button>
            </div>
            <div class="game-title-container">
              <h5 class="game-title text-white fw-bold">{{ item.name }}</h5>
              <h5 class="provider-title text-white"><small>{{ item.provider }}</small></h5>
            </div>
          </button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SgGameCard from '@/components/sg/atoms/SgGameCard.vue'

export default {
  name: 'SgListGames',
  components: {
    SgGameCard
  },
  props: {
    user: {
      type: Object,
      default: null
    },
    gameGroup: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      locked: true
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/layout/breakpoints";
.image-content {
  width: 100%;
  .img-mobile {
    width: 30%;
  }
}
.btn-game-category{
  background: var(--fut-background-lighter);
  font-weight: 700;
  border-radius: 50px;
  padding: 3px 15px;
}
.VueCarousel-navigation-next {
  color: white !important;
}
.carousel-container {
  @include _md{
    max-width: calc(100% - 70px);
    margin-left: 35px;
  }
}
</style>
