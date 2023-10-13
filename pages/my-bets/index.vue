<template>
  <nsx-my-bets v-if="getCurrentLayoutStyle === 'oldBet365'" />
  <fb-my-bets v-else-if="getCurrentLayoutStyle === 'FB' || getCurrentLayoutStyle === 'FB2'" />
  <sk-my-bets v-else-if="getCurrentLayoutStyle === 'SK'" />
  <my-bets v-else />
</template>

<script>
import { mapGetters } from 'vuex'
import MyBets from '@/components/default/templates/MyBets.vue'
import NsxMyBets from '@/components/nsx/templates/NsxMyBets.vue'
import FbMyBets from '@/components/fb/templates/FbMyBets.vue'
import SkMyBets from '@/components/sk/templates/SkMyBets.vue'

export default {
  components: {
    MyBets,
    NsxMyBets,
    FbMyBets,
    SkMyBets
  },
  layout (context) {
    return context.store.getters['layout/getCurrentLayoutComponent']
  },
  middleware: ['protected', 'application_type_sports'],
  computed: {
    ...mapGetters({
      getCurrentLayoutStyle: 'layout/getCurrentLayoutStyle'
    })
  }
}
</script>
