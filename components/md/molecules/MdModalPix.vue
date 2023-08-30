<template>
  <md-modal
    v-model="modal"
    close
  >
    <div v-if="modal" class="m-body">
      <h2>{{ $tc('i18n_deposito', 1) }}</h2>

      <div class="d-flex flex-column align-items-center">
        <img class="img-fluid" style="width: 250px;" :src="item.pix_url" alt="QR code">
        <input
          :value="item.pix_value"
          class="w-100 p-1 my-4"
          disabled
        >
        <md-button
          class="button-deposit text-uppercase"
          width="40%"
          padding="5px"
          @click="copyURL(item.pix_value)"
        >
          {{ $t('i18n_copiar_codigo_pix') }}
        </md-button>
      </div>
    </div>
  </md-modal>
</template>

<script>
import MdModal from '@/components/md/atoms/MdModal.vue'

export default {
  name: 'MdModalPix',
  components: {
    MdModal
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    modal: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    async copyURL (mytext) {
      try {
        await this.$copyText(mytext)
      } catch (e) {
        this.$toast.open({ message: e, type: 'warning' })
        return
      }
      this.$toast.open({ message: 'Texto copiado com sucesso', type: 'info' })
    }
  }
}
</script>

<style lang="scss" scoped>
.m-body {
  color: var(--md-font-color);
  width: 100%;
  height: 100%;
  padding: 25px;
  .button-deposit {
    font-size: 14px;
  }
}
</style>
