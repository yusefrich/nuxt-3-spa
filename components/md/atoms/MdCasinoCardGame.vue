<template>
  <div
    class="game"
    :style="`width: ${width};`"
    @click="game.empty ? () => {} : $emit('openGame')"
  >
    <div v-if="!game.empty" class="overlay transition">
      <div class="play">
        <div class="triangle" />
      </div>
    </div>
    <div class="game-name">
      <p class="mx-3 text-center">
        {{ game.name }}
      </p>
    </div>
    <div v-if="game.empty" class="empty-img" />
    <img
      v-else
      v-lazy-load
      :data-src="game.icon"
      width="100%"
    >
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
  }
}
</script>

<style lang="scss" scoped>
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
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(transparent, rgba(51, 51, 51, 0), #323232);
    border-radius: 16px;
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
    display: flex;
    width: 100%;
    justify-content: center;
  }
  &:hover {
    .overlay {
      border: 3px solid var(--fut-primary);
      background-image: linear-gradient(rgba(51, 51, 51, 0), #323232);
      .play {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
