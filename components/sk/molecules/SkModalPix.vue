<template>
  <sk-modal
    v-model="open"
    close
  >
    <div v-if="open" class="m-body">
      <h2 class="text-center">
        {{ $t('i18n_deposito', 1) }}
      </h2>

      <div class="d-flex flex-column align-items-center">
        <img class="img-fluid" style="width: 250px;" :src="item.pix_url" alt="QR code">
        <sk-input
          :value="item.pix_value"
          :label="$t('i18n_copiar_codigo_pix')"
          name="pix-code"
          class="w-100 p-1 mt-3"
          disabled
        />
        <button
          class="copy-pix text-uppercase"
          width="40%"
          padding="5px"
          @click="copyURL(item.pix_value)"
        >
          <span>{{ $t('i18n_copiar_codigo_pix') }}</span>
        </button>
      </div>
    </div>
  </sk-modal>
</template>

<script>
import SkModal from '@/components/sk/atoms/SkModal.vue'

export default {
  name: 'SkModalPix',
  components: {
    SkModal
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
    open: {
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
  color: var(--fut-color-dynamic);
  width: 100%;
  height: 100%;
  padding: 25px;

  .copy-pix {
    font-size: 14px;
    border: none;
    background: var(--fut-primary);
    border-radius: .25rem;
    height: 38px;
    margin-top: 20px;
    margin-bottom: .25rem;

    span {
      white-space: nowrap;
      font-weight: 600;
    }

    &:hover {
      background: var(--fut-primary-darkest);
    }
    &:active {
      span {
        display: flex;
        transform: scale(.95);
      }
    }
  }
}
</style>
