<template>
  <div
    class="game"
    :style="`width: ${width};`"
    @click="game.empty ? () => {} : $emit('openGame')"
  >
    <div>
      <div v-if="!game.empty" class="overlay transition">
        <div class="play">
          <div class="triangle" />
        </div>
      </div>
      <!-- <div class="game-name d-md-flex d-none">
        <p class="mx-1 mx-md-3 mb-1 mb-md-3 text-center mobile-text">
          {{ game.name }}
        </p>
      </div> -->
      <div v-if="game.empty" class="empty-img" />
      <img
        v-else
        :src="game.icon"
        class="w-100"
      >
    </div>
    <div class="fixed-game-name">
      <p class="mobile-text text-white fut-color-dynamic">
        {{ game.name }}
      </p>
      <span class="text-white fut-color-dynamic text-provider">{{ game.provider }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MdCasinoCardGame',
  props: {
    width: {
      type: String,
      default: ''
    },
    game: {
      type: Object,
      default: () => ({})
    }
  },
  emits: [
    'openGame'
  ]
}
</script>

<style lang="scss" scoped>
@import "@/assets/layout/breakpoints";
.text-provider{
  font-size: 12px;
  opacity: .7;
}
.mobile-text {
  // background: var(--md-bg-third);
  border-radius: 50px;
  // padding-left: 5px;
  // padding-right: 5px;
  font-size: 14px;
  margin-bottom: 0px;
}
.game {
  cursor: pointer;
  border-radius: 16px;
  position: relative;
  max-width: 223px;
  height: auto;
  img {
    border-radius: 16px;
    object-fit: contain;
  }
  .empty-img {
    width: 100%;
    height: 100%;
    background: var(--md-comp-bg-color);
    border-radius: 16px;
    cursor: initial;
  }
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100% - 47px);
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(transparent, rgba(51, 51, 51, 0), #00000070);
    border-radius: 16px;
    // @include md {
    //   height: 100%;
    // }
    .play {
      background: var(--fut-primary);
      width: 86px;
      height: 86px;
      border-radius: 43px;
      border: 2px solid var(--fut-primary-darkest);
      display: none;
      .triangle {
        width: 0;
        height: 0;
        border-top: 15px solid transparent;
        border-bottom: 15px solid transparent;
        border-left: 25px solid #fff;
        margin-left: 7px;
      }
    }
  }
  .game-name {
    position: absolute;
    bottom: 10px;
    color: #fff;
    // display: flex;
    width: 100%;
    justify-content: center;
  }
  .fixed-game-name {
    // display: flex;
    width: 100%;
    padding-top: 4px;
    padding-left: 2px;
    height: 47px;
    // justify-content: center;
  }
  &:hover {
    .overlay {
      border: 3px solid var(--fut-primary);
      background-image: linear-gradient(rgba(51, 51, 51, 0), #00000070);
      .play {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
