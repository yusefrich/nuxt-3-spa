<template>
  <infos
    :page="page"
    :no-print="page === 'affiliates'"
  />
</template>

<script setup>

import Infos from '@/components/default/templates/Infos'

const route = useRoute()

definePageMeta({
  middleware: [
    function (to, from) {
      const config = useRuntimeConfig();

      if (to.params.info === 'affiliates' && config.public.PRODUCT_CONFIG_AFILIATES_URL) {
        navigateTo(config.public.PRODUCT_CONFIG_AFILIATES_URL, { external: true })
      }
    }
  ]
})

const page = computed(() => route.params.info.replace('-slim', ''))

</script>
