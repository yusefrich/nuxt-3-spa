<template>
  <div>
    <fb-documents v-if="getCurrentLayoutStyle === 'FB' || getCurrentLayoutStyle === 'FB2'" />
    <sg-documents v-else-if="getCurrentLayoutStyle === 'SG'" />
    <documents v-else />
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useLayoutStore } from '@/stores/layout'

import FbDocuments from '@/components/fb/templates/FbDocuments'
import SgDocuments from '~/components/sg/templates/SgDocuments'
import Documents from '~/components/default/templates/Documents'

export default {
  components: {
    FbDocuments,
    SgDocuments,
    Documents
  },
  middleware: ['protected'],
  computed: {
    ...mapState(useLayoutStore, {
      getCurrentLayoutStyle: 'getCurrentLayoutStyle'
    })
  }
}
</script>
