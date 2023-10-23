<template>
  <button
    class="game-btn position-relative"
    @click="user && !link ? $emit('select', item) : link ? navigate('/casino/game/' + item.id) : ()=>{}"
  >
    <!-- <canvas :id="'mob_canvas_' + item.id"></canvas> -->
    <img
      :id="`mob_img_${item.id}`"
      class="game-img img-fluid transition"
      :src="item.icon"
      height="20px"
      alt=""
    >
    <div class="game-container-ol" />
    <div class="game-container-bg" />
    <div class="container-btn-play text-center">
      <a v-if="link" class="game-btn-play transition mb-1 text-decoration-none" :href="localePath('/casino/game/' + item.id)">
        <small>
          <font-awesome-icon :icon="['fas', 'play-circle']" /> {{ $t('i18n_jogo_real') }}
        </small>
      </a>
      <button v-if="!link" class="game-btn-play transition mb-1" @click="user ? ()=>{} : $emit('register')">
        <small>
          <font-awesome-icon :icon="['fas', 'play-circle']" /> {{ $t('i18n_jogo_real') }}
        </small>
      </button>
      <button v-if="!user && !link" class="sec-game-btn-play transition" @click="$emit('select', item)">
        <small>
          {{ $t('i18n_modo_diversao') }}
        </small>
      </button>
    </div>
    <div class="game-title-container">
      <h5 class="game-title text-white fw-bold">
        {{ item.name }}
      </h5>
      <h5 class="provider-title text-white">
        <small>{{ item.provider }}</small>
      </h5>
    </div>
  </button>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    link: {
      type: Boolean,
      default: false
    },
    user: {
      type: Object,
      default: () => ({})
    }
  },
  emits: [
    'select',
    'register'
  ],
  data () {
    return {
      mainColor: null
    }
  },
  methods: {
    navigate (link) {
      this.$router.push(this.localePath(link))
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/layout/breakpoints";
.game-title-container{
  position: absolute;
  bottom: 10px;
  width: 100%;
  text-align: center;
  .provider-title {
    background: #ffffff4d;
    padding: 0px 15px;
    display: inline-block;
    border-radius: 50px;
  }
}
.game-container-ol {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // background: #000000;
  background: linear-gradient(0deg, var(--fut-card-highlight) 10%, var(--fut-card-highlight) 0%, rgba(255, 255, 255, 0) 65%);
}
.game-container-bg {
  display: none;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background: #000000;
  opacity: .4;
}
.container-btn-play {
  opacity: 0;
  display: inline;
  position: absolute;
  left: 50%;
  top: 35%;
}
.sec-game-btn-play {
  transform: translate(-50%, -50%);
  background: rgba(128, 128, 128, 0.438);
  border-radius: 100px;
  padding: 5px 15px;
  border: none;
  color: white;
  font-weight: 500;
  &:hover {
    background: rgba(128, 128, 128, 0.678);
  }
}
.game-btn-play {
  display: block;
  opacity: 0;
  transform: translate(-50%, -50%) scale(1.5);
  background: #71b417;
  border-radius: 100px;
  padding: 5px 15px;
  border: none;
  white-space: nowrap;
  color: white;
  font-weight: 900;
  &:hover {
    background: #578f0d;
  }
}
.game-btn {
  background: transparent;
  border: none;
  height: 280px;
  border-radius: 15px !important;
  overflow: hidden;
  padding: 0;
  background: var(--fut-primary);
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  .game-img {
    height: 100%;
    max-width: 200px;
    width: 100%;
    object-fit: cover;
    opacity: 1;
  }
  &:hover {
    .game-img {
      transform: scale(1.3);
    }
    .game-container-bg {
      display: inline-block;
    }
    .container-btn-play {
      opacity: 1;
    }
    .game-btn-play {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }
}
.casino-games-title-name{
  span{
    // border-bottom: 3px solid var(--fut-primary);
    padding-left: 10px;
    padding-right: 10px;
  }
  text-transform: lowercase;
  display:inline-block;
  margin-top: 5px;
  margin-bottom: 0px;
  &:first-letter {
    text-transform: uppercase;
  }
}
</style>
