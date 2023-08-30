<template>
  <div v-if="open" class="fut-modal">
    <div class="fm-content text-white" :style="maxWidth ? {'max-width': maxWidth} : {}">
      <div class="fm-content-header d-flex justify-content-between mb-3">
        <h4 class="fut-color-dynamic">{{ title }}</h4>
        <fut-button v-if="!fixed" class="text-white fut-color-dynamic" @click="$emit('onClose')">
          <font-awesome-icon :icon="['fas', 'times']" />
        </fut-button>
      </div>
      <div class="fm-content-body">
        <slot />
      </div>
    </div>
  </div>
</template>
<script>
import FutButton from '@/components/default/atoms/FutButton.vue'
export default {
  components: {
    FutButton
  },
  props: {
    maxWidth: {
      type: String,
      default: ''
    },
    open: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/layout/variables";

.fut-modal{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 1099;
  background: rgba(0, 0, 0, 0.432);
}
.fm-content{
  background: var(--fut-background-lightest);
  max-width: 600px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 100px;
  padding: 20px;
  border-radius: 5px;
  max-height: calc(100vh - 130px);
}
.fm-content-body{
  max-height: calc(100vh - 230px);
  overflow: auto;
}
</style>
