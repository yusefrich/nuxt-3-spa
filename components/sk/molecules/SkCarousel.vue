<template>
  <div
    v-if="items"
    :id="`carouselControls_${name}`"
    class="sk-carousel carousel slide"
    data-bs-ride="carousel"
  >
    <div class="carousel-inner">
      <div
        v-for="(_, slideIdx) in fullWidth ? items : Math.ceil(items.length/3)"
        :key="'carousel_slide_' + slideIdx"
        class="carousel-item"
        :class="[slideIdx===0?'active':'', `${slideIdx}`]"
        data-bs-interval="3000"
      >
        <div class="d-flex justify-content-between">
          <div
            v-for="(item, idx) in reorderedItems[slideIdx]"
            :key="'slide_image_' + idx"
            :class="fullWidth ? 'full-width-slide' : 'slides'"
          >
            <a v-if="item.img" :href="item.link">
              <img
                class="banner img-fluid"
                :src="item.img"
              >
            </a>
          </div>
        </div>
      </div>
    </div>

    <button
      class="arrow-btn transition"
      :class="{ 'mobile-btn': isMobile }"
      :data-bs-target="`#carouselControls_${name}`"
      data-bs-slide="prev"
    >
      <font-awesome-icon :icon="['fas', 'chevron-left']" />
    </button>
    <button
      class="arrow-btn transition"
      :class="{ 'mobile-btn': isMobile }"
      :data-bs-target="`#carouselControls_${name}`"
      data-bs-slide="next"
    >
      <font-awesome-icon :icon="['fas', 'chevron-right']" />
    </button>
  </div>
</template>

<script>
export default {
  name: 'SkCarousel',
  props: {
    items: {
      type: Array,
      default: () => ([])
    },
    fullWidth: {
      type: Boolean,
      default: false
    },
    isMobile: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: 'sk'
    }
  },
  computed: {
    reorderedItems () {
      const reordered = []

      for (let i = 0; i < this.items.length; this.fullWidth ? i++ : i += 3) {
        reordered.push(this.items.slice(i, this.fullWidth ? i + 1 : i + 3))
      }

      if (this.fullWidth) {
        return reordered
      }

      if (reordered[reordered.length - 1].length === 1) {
        reordered[reordered.length - 1].push({ empty: true })
        reordered[reordered.length - 1].push({ empty: true })

        return reordered
      }

      if (reordered[reordered.length - 1].length === 2) {
        reordered[reordered.length - 1].push({ empty: true })

        return reordered
      }

      return reordered
    }
  }
}
</script>

<style lang="scss" scoped>
.sk-carousel {
  position: relative;
  height: 100%;
  width: 100%;

  &:hover {
    .arrow-btn {
      color: var(--fut-color-dynamic);
    }
  }

  .arrow-btn {
    position: absolute;
    top: 0;
    width: 36px;
    height: 100%;
    border-radius: .5rem;
    color: transparent;
    background: transparent;
    border: none;

    &:hover {
      color: var(--fut-color-dynamic);
    }

    &:first-of-type {
      left: -36px;
    }
    &:last-child {
      right: -36px;
    }
  }
}
.slides {
  display: flex;
  width: 32.5%;
  min-height: 100%;
  border-radius: 8px;
}
.full-width-slide {
  width: 100%;
  min-height: 100%;
  border-radius: 8px;
}
.banner {
  border-radius: 8px;
  width: 100%;
}

.mobile-btn {
  color: var(--fut-color-dynamic) !important;
  &:first-of-type {
    left: 0 !important;
  }
  &:last-child {
    right: 0 !important;
  }
}
</style>
