<template>
  <user v-if="getCurrentLayoutStyle === 'default'" />
  <fb-user v-else-if="getCurrentLayoutStyle === 'FB' || getCurrentLayoutStyle === 'FB2'" />
  <md-user v-else-if="getCurrentLayoutStyle === 'MD'" />
  <sg-user v-else-if="getCurrentLayoutStyle === 'SG'" />
</template>

<script>
import { mapGetters } from 'vuex'
import User from '@/components/default/templates/User.vue'
import FbUser from '@/components/fb/templates/FbUser.vue'
import MdUser from '@/components/md/templates/MdUser.vue'
import SgUser from '@/components/sg/templates/SgUser.vue'

export default {
  components: {
    User,
    FbUser,
    MdUser,
    SgUser
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
</script>.vue
