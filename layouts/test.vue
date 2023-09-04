<template>
  <main class="fut-scrollbar">
    <!-- <loader :condition="!currentSettings" /> -->
    <h1>teste no layout</h1>
    <br>
    <code>->{{ getOptions }}</code>
    <br>
    <code>->{{ currentSettings }}</code>
    <br>
    <code>->{{ currentTest }}</code>
    <br>
    <button @click="testFetch()">testing</button>
    <br>
    <h1>{{ $t('i18n_ao_vivo') }}</h1>
    <slot />
  </main>
</template>

<script>
import { useLayoutStore } from '@/stores/layout'
import Loader from '@/components/default/atoms/Loader'
import { useSettingsStore } from '@/stores/settings'
import { useTestingStore } from '@/stores/testing'
import { mapActions, mapState } from 'pinia'

export default {
  components: {
    Loader
  },
  asyncData({ $pinia }) {
    const store = useStore($pinia)
    store.testFetch()
  },
  computed: {
    ...mapState(useLayoutStore, {
      getOptions: 'getOptions'
    }),
    ...mapState(useSettingsStore, {
      currentSettings: 'currentSettings'
    }),

    ...mapState(useTestingStore, { currentTest: 'currentTest' })
  },
  methods: {
    // ...mapActions(useSettingsStore, [ 'testFetch' ]),
    ...mapActions(useTestingStore, { testFetch: 'testFetch' })
    // ...mapActions(useSettingsStore, {
    //   commitSettings: 'commitSettings',
    //   testFetch: 'testFetch',
    //   commitAds: 'commitAds',
    //   fetchSettings: 'fetchSettings',
    //   fetchAds: 'fetchAds'
    // })
  }
}
</script>
