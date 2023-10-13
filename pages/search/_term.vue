<template>
  <div>
    <md-search v-if="getCurrentLayoutStyle === 'MD'" />
    <fb-search
      v-else
      :sidebar="false"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FbSearch from '@/components/fb/templates/FbSearch.vue'
import MdSearch from '@/components/md/templates/MdSearch.vue'

export default {
  components: {
    FbSearch,
    MdSearch
  },
  layout (context) {
    return context.store.getters['layout/getCurrentLayoutComponent']
  },
  middleware: ['application_type_sports'],
  computed: {
    ...mapGetters({
      getCurrentLayoutStyle: 'layout/getCurrentLayoutStyle'
    })
  }
}
</script>
