<template>
  <div class="header-sidebar-mobile d-flex d-md-none py-1 justify-content-between container">
    <div class="d-flex">
      <fb-fut-button v-if="route" :to="route">
        <font-awesome-icon class="text-white mr-10 mt-1 icon-filter" :icon="['fas', 'chevron-left']" />
      </fb-fut-button>
      <div>
        <span v-if="title && !subtitle" class="text-white sport-head mt-1 d-block">{{ title }}</span>
        <span v-if="subtitle" class="text-white sport-subtitle d-block">{{ subtitle }}</span>
        <span v-if="title && subtitle" class="text-white sport-title-2 d-block">{{ title }}</span>
      </div>
    </div>
    <slot />
  </div>
</template>
<script>
import FbFutButton from '@/components/fb/atoms/FbFutButton.vue'

export default {
  components: {
    FbFutButton
  },
  props: {
    route: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/layout/breakpoints";
.icon-filter{
  border-right: 1px solid white;
  padding-right: 15px;
  height: 25px;
  width: 25px;
}
.icon-time-filter{
  width: 25px;
  height: 25px;
}
.header-sidebar-mobile{
  background: var(--fut-background-lightest-2);
  border-bottom: 1px solid var(--fut-background-white);
  margin-top: 20px;
  max-width: 100vw;
  @include md{
    margin-top: 0px;
  }
}
.sport-subtitle{
  font-size: 13px;
}
.sport-title-2{
  font-size: 15px;
  line-height: 9px;
}
</style>
