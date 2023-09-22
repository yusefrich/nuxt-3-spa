<template>
  <fb-withdraws v-if="getCurrentLayoutStyle === 'FB' || getCurrentLayoutStyle === 'FB2'" class="text-white" />
  <user v-else>
    <withdraws class="text-white" />
  </user>
</template>

<script>
import { mapGetters } from 'vuex'
import User from '@/components/default/templates/User.vue'
import Withdraws from '@/components/default/organisms/Withdraws.vue'
import FbWithdraws from '@/components/fb/templates/FbWithdraws.vue'

export default {
  components: {
    User,
    Withdraws,
    FbWithdraws
  },
  layout (context) {
    return context.store.getters['layout/getCurrentLayoutComponent']
  },
  middleware: ['protected'],
  computed: {
    ...mapGetters({
      getCurrentLayoutStyle: 'layout/getCurrentLayoutStyle'
    })
  }
}
</script>
