<template>
  <div class="deposit-content">
    <fut-input
      v-model="payload.email"
      name="email"
      nsx-input
      type="text"
      class="mx-0 mb-3 mt-2"
    />
    <div class="text-center">
      <nsx-fut-button class="text-white nsx-ok" @click="submit()">
        {{ $t('i18n_enviar') }}
      </nsx-fut-button>
    </div>
  </div>
</template>

<script>
import { Money3Directive } from 'v-money3'
import NsxFutButton from '@/components/nsx/atoms/NsxFutButton.vue'
import FutInput from '@/components/default/atoms/FutInput.vue'

export default {
  name: 'NsxForgot',
  components: {
    FutInput,
    NsxFutButton
  },
  directives: { money3: Money3Directive },
  data () {
    return {
      payload: {
        email: null
      }
    }
  },
  methods: {
    submit () {
      if (!this.payload.email) {
        this.$toast.open({ message: 'Insira um email válido!', type: 'error' })
        return
      }

      this.$emit('submitForgot', this.payload)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/layout/breakpoints";
@import "@/assets/layout/variables";

.active{
  background-color: var(--white);
}
.btn-deposit{
  border-radius: 10px !important;
}
.img-deposit{
  width: 100%;
  max-width: 90px;
  height: auto;
}
.nsx-ok{
  background: linear-gradient(#ff8800, #ff6600);
  border-radius: 5px !important;
  padding: 2px 10px;
}
</style>
