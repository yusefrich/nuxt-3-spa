<template>
  <div>
    <p>Saindo...</p>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useBaseStore } from '@/stores/base'
import { useLayoutStore } from '@/stores/layout'

export default {
  computed: {
    ...mapState(useLayoutStore, {
      getCurrentApplicationType: 'getCurrentApplicationType',
      getCurrentLayoutStyle: 'getCurrentLayoutStyle'
    })
  },
  mounted () {
    this.logout()

    // todo check product config to properly redirect the page after logout
    if (this.getCurrentApplicationType === 'all') {
      window.location.replace(this.localePath('/'))
      return
    }

    if (this.getCurrentLayoutStyle !== 'SG' && this.getCurrentApplicationType && this.getCurrentApplicationType.includes('casino') && !this.getCurrentApplicationType.includes('sports')) {
      window.location.replace(this.localePath('/casino'))
      return
    }

    if (this.getCurrentLayoutStyle === 'SG' && this.getCurrentApplicationType && !this.getCurrentApplicationType.includes('casino') && this.getCurrentApplicationType.includes('sports')) {
      window.location.replace(this.localePath('/'))
      return
    }

    window.location.replace(this.localePath('/'))
  },
  methods: {
    ...mapActions(useBaseStore, {
      logout: 'logout'
    })
  }
}
</script>
