<template>
  <user>
    <fut-documents :logged-in-user="loggedInUser" />
  </user>
</template>

<script>
import { mapState } from 'pinia'
import { useBaseStore } from '@/stores/base'

import User from '@/components/default/templates/User'
import FutDocuments from '@/components/default/molecules/FutDocuments'

export default {
  name: 'Documents',
  components: {
    User,
    FutDocuments
  },
  computed: {
    ...mapState(useBaseStore, {
      loggedInUser: 'loggedInUser'
    }),
  }
}
</script>
