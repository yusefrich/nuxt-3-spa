<template>
  <user>
    <fut-documents :logged-in-user="loggedInUser" />
  </user>
</template>

<script>
import { mapGetters } from 'vuex'
import User from '@/components/default/templates/User.vue'
import FutDocuments from '@/components/default/molecules/FutDocuments.vue'

export default {
  name: 'Documents',
  components: {
    User,
    FutDocuments
  },
  computed: {
    ...mapGetters({
      loggedInUser: 'loggedInUser'
    })
  }
}
</script>
