<template>
  <!-- <sg-invite-friends v-if="getCurrentLayoutStyle" /> -->
  <fut-html-render :content="getLegalAffiliates" />
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import FutHtmlRender from '@/components/default/atoms/FutHtmlRender.vue'
// import SgInviteFriends from '~/components/sg/templates/SgInviteFriends'

export default {
  components: { FutHtmlRender },
  layout (context) {
    return context.store.getters['layout/getCurrentLayoutComponent']
  },
  middleware ({ redirect }) {
    if (process.env.PRODUCT_CONFIG_AFILIATES_URL) {
      return redirect(process.env.PRODUCT_CONFIG_AFILIATES_URL)
    }
  },
  computed: {
    ...mapGetters({
      getCurrentLayoutStyle: 'layout/getCurrentLayoutStyle',
      getLegalAffiliates: 'legal/getLegalAffiliates'
    })
  },
  created () {
    this.updateOptions({
      filter: true,
      sidebar: false,
      sports: true,
      ticket: false,
      raw: false
    })

    this.fetchLegalAffiliates()
  },
  beforeDestroy () {
    this.updateOptions({
      filter: true,
      sidebar: true,
      sports: true,
      raw: false
    })
  },
  methods: {
    ...mapActions({
      updateOptions: 'layout/updateOptions',
      fetchLegalAffiliates: 'legal/fetchLegalAffiliates'
    })
  }
}
</script>
