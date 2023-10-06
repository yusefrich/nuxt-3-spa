<template>
  <div>
    <NuxtLayout :name="getCurrentLayoutStyle.toLowerCase()">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useLayoutStore } from '@/stores/layout'

export default {
  computed: {
    ...mapState(useLayoutStore, {
      getCurrentLayoutStyle: 'getCurrentLayoutStyle'
    })
  }
}
</script>
