<template>
  <user v-if="getCurrentLayoutStyle === 'default'" />
  <fb-user v-else-if="getCurrentLayoutStyle === 'FB'" />
  <md-user v-else-if="getCurrentLayoutStyle === 'MD'" />
  <sg-user v-else-if="getCurrentLayoutStyle === 'SG'" />
</template>

<script>
import { mapState } from 'pinia'
import { useLayoutStore } from '@/stores/layout'

import User from '@/components/default/templates/User'
import FbUser from '@/components/fb/templates/FbUser'
import MdUser from '@/components/md/templates/MdUser'
import SgUser from '@/components/sg/templates/SgUser'

export default {
  components: {
    User,
    FbUser,
    MdUser,
    SgUser
  },
  middleware: ['protected'],
  computed: {
    ...mapState(useLayoutStore, {
      getCurrentLayoutStyle: 'getCurrentLayoutStyle'
    })
  }
}
</script>
