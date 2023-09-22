<template>
  <div>
    <fb-documents v-if="getCurrentLayoutStyle === 'FB' || getCurrentLayoutStyle === 'FB2'" />
    <sg-documents v-else-if="getCurrentLayoutStyle === 'SG'" />
    <documents v-else />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FbDocuments from '@/components/fb/templates/FbDocuments.vue'
import SgDocuments from '~/components/sg/templates/SgDocuments.vue'
import Documents from '~/components/default/templates/Documents.vue'

export default {
  components: {
    FbDocuments,
    SgDocuments,
    Documents
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
