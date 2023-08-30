<template>
  <md-modal
    v-if="items && items.length > 0"
    v-model="modal"
    width="100%"
    min-height="100%"
  >
    <div
      class="close"
      @click="modal = false"
    >
      <span class="icon">+</span>
    </div>
    <div
      :style="`width: ${barWidth}%;`"
      class="progress-bar"
    />
    <div
      :style="`background-image: url(${items[currentIdx].img});`"
      class="storie"
    />
    <div class="main-content">
      <div class="d-flex justify-content-center flex-column">
        <img
          class="banner"
          :src="items[currentIdx].img"
          alt="Banner"
          width="100%"
        >
        <a
          :href="items[currentIdx].link"
          class="link"
        >
          <span>{{ $t('i18n_acessar_link') }}</span>
        </a>
      </div>
    </div>
    <button
      class="prev"
      @click="changeStorie('prev')"
    />
    <button
      class="next"
      @click="changeStorie('next')"
    />
  </md-modal>
</template>

<script>
import MdModal from '@/components/md/atoms/MdModal.vue'

export default {
  name: 'MdModalStorie',
  components: {
    MdModal
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      default: () => ([])
    },
    itemIdx: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      idx: null,
      timer: null,
      storieTimer: 0,
      barWidth: 0
    }
  },
  computed: {
    modal: {
      get () {
        if (this.value) {
          this.initTimer()
        }

        return this.value
      },
      set (value) {
        this.idx = null
        if (!value) {
          clearTimeout(this.timer)
          clearInterval(this.storieTimer)
        }
        this.$emit('input', value)
      }
    },
    currentIdx () {
      if (this.idx === null || this.idx === this.items.length) {
        return this.itemIdx
      }

      return this.idx
    }
  },
  watch: {
    idx (value) {
      if (value > -1 && value < this.items.length) {
        this.initStorieTimer()
      }
    }
  },
  beforeDestroy () {
    clearTimeout(this.timer)
    clearInterval(this.storieTimer)
  },
  methods: {
    changeStorie (direction) {
      switch (direction) {
        case 'prev':
          this.idx = this.currentIdx - 1
          this.initTimer()
          if (this.idx === -1) {
            this.modal = false
          }
          break
        case 'next':
          this.idx = this.currentIdx + 1
          this.initTimer()
          if (this.idx === this.items.length) {
            this.modal = false
          }
          break
        default:
          this.modal = false
          break
      }
    },
    initTimer () {
      clearTimeout(this.timer)
      if (this.idx === null) { this.idx = this.itemIdx }
      this.timer = setTimeout(() => this.changeStorie('next'), 16000)
    },
    initStorieTimer () {
      this.barWidth = 0
      clearInterval(this.storieTimer)

      const transitionDelayTime = setTimeout(() => {
        this.storieTimer = setInterval(() => {
          if (this.barWidth >= 100) {
            clearInterval(this.storieTimer)
          } else {
            this.barWidth++
          }
          clearTimeout(transitionDelayTime)
        }, 150)
      }, 600)
    }
  }
}
</script>

<style lang="scss" scoped>
.close {
  color: #000;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 40px;
  right: 40px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #FAFAFA;
  box-sizing: border-box;
  box-shadow: 0px 1px 4px #666;
  z-index: 1100;
  .icon {
    color: #000;
    font-weight: 600;
    font-size: 30px;
    transform: rotate(45deg);
    margin: -7px -8px 0 0;
  }
}
.progress-bar {
  position: absolute;
  top: 0;
  left: 0;
  height: 8px;
  background: var(--fut-primary);
  border-radius: 0 2px 2px 0;
  z-index: 1100;
}
.storie {
  scale: 110%;
  color: var(--md-font-color);
  width: 100vw;
  height: 100vh;
  filter: blur(8px);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.main-content {
  position: absolute;
  display: flex;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1050;
  .banner {
    object-fit: contain;
    border-radius: 8px;
  }
  .link {
    position: sticky;
    bottom: 50px;
    display: inline;
    color: #000;
    text-decoration: none;
    text-align: center;
    margin-top: 20px;
    span {
      z-index: 1060;
      padding: 4px 30px;
      border-radius: 30px;
      background: #fafafa;
    }
  }
}
button {
  position: absolute;
  top: 0;
  bottom: 0;
  background: transparent;
  border: none;
  z-index: 1050;
}
.prev {
  left: 0;
  width: 30%;
}
.next {
  right: 0;
  width: 30%;
}
</style>
