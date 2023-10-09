<template>
  <div class="deposit-content">
    <h4 class="text-center">
      {{ $t('i18n_informe_o_email_para_qual') }}
    </h4>
    <fut-input
      v-model="payload.email"
      name="email"
      type="text"
      class="mx-0 mb-3 mt-2"
    />
    <div class="text-end">
      <fut-button
        :primary="true"
        class="text-white"
        @click="submit()"
      >
        {{ $t('i18n_continuar') }}
      </fut-button>
    </div>
  </div>
</template>

<script>
import { Money3Directive } from 'v-money3'
import FutButton from '@/components/default/atoms/FutButton.vue'
import FutInput from '@/components/default/atoms/FutInput.vue'

export default {
  name: 'Forgot',
  components: {
    FutInput,
    FutButton
  },
  directives: { money3: Money3Directive },
  emits: [
    'submitForgot'
  ],
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
</style>
