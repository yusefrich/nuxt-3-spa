<template>
  <div>
    <NuxtLayout :name="layout.getCurrentLayoutStyle.toLowerCase()">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>

import { useLayoutStore } from '@/stores/layout'

const layout = useLayoutStore()

const { $tiktok, $config } = useNuxtApp()

// Setting here the tiktok pixels options
onMounted(() => {
  $tiktok({
    pixel: $config.public.TIKTOK_PIXEL_ID ? $config.public.TIKTOK_PIXEL_ID : 'xxx',
    disabled: !!!$config.public.TIKTOK_PIXEL_ID
  })
})

</script>
