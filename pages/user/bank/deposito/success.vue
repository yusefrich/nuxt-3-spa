<template>
  <div class="text-center my-4">
    <img src="/img/success.png" class="img-deposit mb-4" height="90" width="90" alt="">
    <h2 class="text-white fut-color-dynamic">Deposito realizado com successo</h2>
    <p v-if="currentSettings" class="text-white fut-color-dynamic">
      Obrigado por escolher a {{ currentSettings.name }}! Para mais informações acompanhe seu hisórico de depósitos ou entre em contato com o nosso suporte.
    </p>
    <fut-button primary @to="localePath('/user/bank/deposito')">
      Meu histórico
    </fut-button>
  </div>
</template>
<script>
import { mapState } from 'pinia'
import { useSettingsStore } from '@/stores/settings'

import FutButton from '@/components/default/atoms/FutButton.vue'

export default {
  components: {
    FutButton
  },
  computed: {
    ...mapState(useSettingsStore, {
      currentSettings: 'currentSettings'
    })
  }
}
</script>
