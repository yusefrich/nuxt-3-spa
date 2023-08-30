<template>
  <div
    class="game"
    :style="`width: ${width};`"
    @click="game.empty ? () => {} : $router.push(localePath(`/casino/game/${game.id}`))"
  >
    <div class="overlay transition">
      <span><strong>{{ game.name }}</strong></span>
      <div class="m-auto">
        <font-awesome-icon class="icon" :icon="['fas', 'play']" />
      </div>
      <span>{{ game.provider }}</span>
    </div>
    <img
      v-lazy-load
      :data-src="game.icon"
      width="100%"
    >
  </div>
</template>

<script>
export default {
  name: 'SkCasinoCardGame',
  props: {
    game: {
      type: Object,
      default: () => ({})
    },
    width: {
      type: String,
      default: '100%'
    }
  }
}
</script>

<style lang="scss" scoped>
.game {
  cursor: pointer;
  border-radius: .5rem;
  position: relative;
  max-width: 223px;
  height: auto;
  min-height: 100px;
  transition: all ease-in-out 200ms;

  img {
    border-radius: .5rem;
    object-fit: contain;
  }
  .empty-img {
    width: 100%;
    height: 100%;
    background: var(--md-comp-bg-color);
    border-radius: .5rem;
    cursor: initial;
  }
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    opacity: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: var(--fut-primary);
    border-radius: .5rem;
    transition: all ease-in-out 200ms;
    padding: 1rem;
    color: var(--fut-color-dynamic);

    strong {
      font-size: 1.5rem;
      font-weight: 400;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .icon {
      width: 32px;
      height: 32px;
    }

    span {
      font-weight: 600;
      text-transform: capitalize;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  &:hover {
    margin-top: -7px;
    box-shadow: 0rem .125rem .25rem #0000001f , 0rem .25rem .375rem #1b171733;

    .overlay {
      opacity: .9;
    }
  }
  &:active {
    transform: scale(.98);
  }
}
</style>
