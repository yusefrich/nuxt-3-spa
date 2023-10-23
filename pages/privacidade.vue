<template>
  <div class="mt-5">
    <div class="container">
      <fut-button
        primary
        class="p-2 float-end d-print-none"
        @click="printPage()"
      >
        <font-awesome-icon class="me-1" :icon="['fas', 'print']" />{{ $t('i18n_imprimir') }}
      </fut-button>
    </div>
    <fut-html-render :content="getLegalPrivacy" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import FutHtmlRender from '@/components/default/atoms/FutHtmlRender.vue'
import FutButton from '@/components/default/atoms/FutButton.vue'

export default {
  components: {
    FutHtmlRender,
    FutButton
  },
  layout (context) {
    return context.store.getters['layout/getCurrentLayoutComponent']
  },
  computed: {
    ...mapGetters({
      getLegalPrivacy: 'legal/getLegalPrivacy'
    })
  },
  created () {
    this.fetchLegalPrivacy()
  },
  methods: {
    ...mapActions({
      fetchLegalPrivacy: 'legal/fetchLegalPrivacy'
    }),
    printPage () {
      window.print()
    }
  }
}
</script>
