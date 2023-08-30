<template>
  <div
    :id="`carouselControls-${compId}`"
    class="sk-casino-games-carousel carousel slide"
    data-bs-ride="carousel"
  >
    <div class="carousel-header">
      <div class="texts my-auto">
        <p
          class="mb-0 title"
          @click="$router.push(localePath('/casino/provider'))"
        >
          <font-awesome-icon v-if="icon" :icon="icon" class="icon my-auto transition" />
          {{ title }}
        </p>
      </div>
      <div v-if="items.length" class="slider-btns">
        <button
          class="arrow-btn transition"
          :data-bs-target="`#carouselControls-${compId}`"
          data-bs-slide="prev"
        >
          <font-awesome-icon class="arrow-icon" :icon="['fas', 'arrow-left']" />
        </button>
        <button
          class="arrow-btn transition"
          :data-bs-target="`#carouselControls-${compId}`"
          data-bs-slide="next"
        >
          <font-awesome-icon class="arrow-icon" :icon="['fas', 'arrow-right']" />
        </button>
      </div>
    </div>

    <div class="carousel-body carousel-inner">
      <div
        v-for="(item, slideIdx) in reorderedItems"
        :key="'slide_' + slideIdx"
        class="carousel-item"
        :class="{ active: slideIdx === 0 }"
      >
        <div
          class="slide-wrapper"
          :style="`
            grid-template-columns: repeat(${dynamicGrid.columns}, 1fr);
            gap: ${dynamicGrid.gap};
          `"
        >
          <div
            v-for="(prov, imgIdx) in item"
            :key="'game_' + imgIdx"
          >
            <button
              class="provider"
              @click="$router.push(localePath(`/casino/provider/${prov.slug}`))"
            >
              <img
                v-if="prov.img"
                :src="prov.img"
              >
              <p v-else class="m-0">
                {{ prov.provider }}
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import windowWidth from '@/mixins.js/windowWidth.js'

export default {
  name: 'SkCasinoProvidersCarousel',
  mixins: [windowWidth],
  props: {
    compId: {
      type: [Number, String],
      default: ''
    },
    items: {
      type: Array,
      default: () => ([])
    },
    title: {
      type: String,
      default: ''
    },
    icon: {
      type: Array,
      default: () => ([])
    },
    slug: {
      type: String,
      default: ''
    },
    dynamicGrid: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    reorderedItems () {
      const reordered = []

      for (let i = 0; i < this.items.length; i = i + this.dynamicGrid.columns) {
        reordered.push(this.items.slice(i, i + this.dynamicGrid.columns))
      }

      return reordered
    }
  }
}
</script>

<style lang="scss" scoped>
.sk-casino-games-carousel {
  height: 100%;
  width: 100%;
  padding: 12px;

  .carousel-header {
    display: flex;
    justify-content: space-between;

    .texts {
      font-size: 19px;
      color: var(--fut-color-dynamic);

      .title {
        font-weight: 600;
        font-size: 1.18rem;
        color: var(--fut-color-dynamic);
        cursor: pointer;

        .icon {
          color: var(--fut-secondary);
        }

        &:hover {
          .icon {
            color: var(--fut-color-dynamic);
          }
        }
      }
    }

    .slider-btns {
      display: flex;
      align-items: center;

      .arrow-btn {
        color: var(--fut-secondary);
        border: 1px solid var(--fut-background-lightest-2);
        background: transparent;
        width: 3.5em;
        height: 2.5em;
        border-radius: 2rem;

        .arrow-icon {
          width: 12px;
          height: 12px;
          transition: all ease-in-out 200ms;
        }

        &:first-of-type {
          border-bottom-right-radius: 0!important;
          border-top-right-radius: 0!important;
        }
        &:last-of-type {
          border-bottom-left-radius: 0;
          border-top-left-radius: 0;
          border-left: none;
        }

        &:hover {
          color: var(--fut-color-dynamic);

          .arrow-icon {
            width: 14px;
            height: 14px;
          }
        }
        &:active {
          .arrow-icon {
            transform: scale(.90);
          }
        }
      }
    }
  }

  .carousel-body {
    margin-top: 6px;
    padding-top: 6px;

    .slide-wrapper {
      display: grid;

      .provider {
        border: none;
        width: 100%;
        height: 63px;
        background: #365060;
        border-radius: .5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all ease-in-out 200ms;

        img {
          width: 100%;
          height: 100%;
        }
        p {
          color: var(--fut-color-dynamic);
          font-weight: 600;
          font-size: 1.2rem;
          text-align: center;
          padding: 4px;
          text-transform: capitalize;
        }

        &:hover {
          margin-top: -7px;
          box-shadow: 0rem .125rem .25rem #0000001f , 0rem .25rem .375rem #1b171733;
        }
      }
    }
  }
}
</style>
