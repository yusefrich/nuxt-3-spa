<template>
  <div class="highlight">
    <div
      id="highlightGamesCarousel"
      class="carousel-container carousel slide"
      data-bs-ride="carousel"
    >
      <div class="carousel-inner">
        <div
          v-for="(item, itemIdx) in items"
          :key="'carousel_slide_' + itemIdx"
          class="carousel-item"
          :class="[itemIdx===0?'active':'', `${itemIdx}`]"
          data-bs-interval="3000"
        >
          <md-featured-game-card
            :game="item"
            :tickets="tickets"
            @selectBet="$emit('selectBet', $event)"
          />
        </div>
      </div>
      <button
        class="arrow-btn"
        data-bs-target="#highlightGamesCarousel"
        data-bs-slide="prev"
      >
        <font-awesome-icon :icon="['fas', 'chevron-left']" />
      </button>
      <button
        class="arrow-btn"
        data-bs-target="#highlightGamesCarousel"
        data-bs-slide="next"
      >
        <font-awesome-icon :icon="['fas', 'chevron-right']" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MdHighlightGamesMobile',
  props: {
    items: {
      type: Array,
      default: () => ([])
    },
    tickets: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>

<style lang="scss" scoped>
.carousel-container{
  position: relative;
  height: 100%;
  max-width: 100% !important;
  margin: 0;
}
.arrow-btn {
  position: absolute;
  top: calc(50%);
  width: 36px;
  height: 36px;
  border-radius: 18px;
  color: var(--md-bg-third);
  background: #FFFFFF;
  border: 2px solid var(--md-bg-third);
  box-sizing: border-box;
  box-shadow: 0px 4px 0px rgba(0, 0, 0, 0.25);
  &:first-of-type {
    left: -6px;
  }
  &:last-child {
    right: -6px;
  }
}
.highlight {
  border-radius: 17px;
  padding: 0px;
  margin: 10px 0 6px 0;
  background-color: var(--md-bg-third);
}
</style>
