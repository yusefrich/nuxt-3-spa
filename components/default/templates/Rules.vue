<template>
  <fut-html-render :content="content" />
</template>
<script>
import FutHtmlRender from '@/components/default/atoms/FutHtmlRender.vue'
export default {
  components: { FutHtmlRender },
  props: {
    content: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
