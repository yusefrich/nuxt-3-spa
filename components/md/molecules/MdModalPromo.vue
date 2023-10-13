<template>
  <md-modal
    v-model="modal"
    :width="width < 907 ? '100%' : '944px'"
    :min-height="'378px'"
    border-radius="15px"
    full-screen
  >
    <div
      v-if="modal"
      class="promo-modal"
      :style="`
        background-image: linear-gradient(transparent, #f9fafb ${width < 907?'40%':'25%'}), url(${promo.img});
      `"
    >
      <div class="promo-desc">
        <div class="title">
          <h5 class="fw-bold">
            {{ promo.name }}
          </h5>
          <button @click="modal=false">
            <div class="x" />
            <div class="x" />
          </button>
        </div>
        <img
          class="mobile-img"
          :src="promo.img"
          alt="Promo image"
        >
        <!-- eslint-disable-next-line -->
        <div class="text" v-html="promo.text" />
      </div>
    </div>
  </md-modal>
</template>

<script>
import MdModal from '@/components/md/atoms/MdModal'
import windowWidth from '~/mixins.js/windowWidth'

export default {
  name: 'MdModalPromo',
  components: {
    MdModal
  },
  mixins: [windowWidth],
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    promo: {
      type: Object,
      default: () => ({})
    }
  },
  emits: [
    'update:modelValue',
    'close'
  ],
  computed: {
    modal: {
      get () {
        return this.modelValue
      },
      set (value) {
        this.$emit('close')
        this.$emit('update:modelValue', value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.promo-modal {
  background-size: contain;
  background-repeat: no-repeat;
  padding: 22px;
  min-width: 944px;
  min-height: 378px;
  max-height: 90vh;
  border-radius: 15px;
  overflow: hidden;

  .promo-desc {
    display: flex;
    flex-direction: column;
    width: 100%;
    color: #000;
    padding: 24px;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 15px;

    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      button {
        min-width: 34px;
        min-height: 34px;
        background: var(--md-bg-third);
        color: #FAFAFA;
        border: 1px solid #FAFAFA;
        border-radius: 50%;
        box-shadow: 0px 4px 0px rgba(0, 0, 0, 0.25);
        position: relative;

        .x {
          position: absolute;
          top: 15px;
          width: 20px;
          height: 1px;
          background: #FAFAFA;
          &:first-of-type {
            transform: rotate(45deg);
          }
          &:last-of-type {
            transform: rotate(-45deg);
          }
        }
      }
    }
    .text {
      max-height: calc(100vh - 450px);
      overflow: auto;
      &::-webkit-scrollbar-track {
        opacity: .3;
        border-radius: 0.125rem;
        background-color: lightgray;
      }
      &::-webkit-scrollbar {
        opacity: .3;
        width: 4px;
      }
      &::-webkit-scrollbar-thumb {
        opacity: .3;
        background-color: gray;
      }
    }
  }
}
.mobile-img {
  display: block;
  height: 200px;
  margin-bottom: 12px;
}

@media (max-width: 906px) {
  .promo-modal {
    min-width: 100% !important;
    min-height: 100vh !important;
    max-height: 100vh !important;
    padding: 8px;
    border-radius: 0;
    background-size: 100% 100%, 100% 40%;
    .promo-desc {
      padding: 12px;
      .text {
        max-height: calc(100vh - 300px);
      }
    }
  }
}
@media (max-width: 425px) {
  .text {
    max-height: calc(100vh - 330px) !important;
  }
}
</style>
