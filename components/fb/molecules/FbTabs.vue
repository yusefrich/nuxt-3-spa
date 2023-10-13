<template>
  <article>
    <header class="tabs d-flex">
      <div v-for="(tab, index) in tabs" :key="index" class="w-100">
        <fb-fut-button
          class="button-style w-100 nav-item"
          :class="{ 'is-active': tab.isActive }"
          @click="selectTab(tab)"
        >
          {{ tab.name }}
        </fb-fut-button>
      </div>
    </header>
    <section class="tabs-details">
      <slot />
    </section>
  </article>
</template>
<script>
import FbFutButton from '@/components/fb/atoms/FbFutButton.vue'

export default {
  components: {
    FbFutButton
  },
  data: () => {
    return {
      tabs: []
    }
  },
  created () {
    this.tabs = this.$children
  },
  methods: {
    selectTab (selectedTab) {
      this.tabs.forEach((tab) => {
        tab.isActive = tab.name === selectedTab.name
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.button-style {
  background-color: #0c0d0f;
  color: white;
  border: none;
  height: 30px;
  font-size: 12px;
  text-transform: uppercase;
  border: 1px solid #31343B;
    &:hover {
      color: black;
      background-image: linear-gradient(
        to right,
        var(--fut-primary),
        var(--fut-secondary)
      );
    }
    &.is-active {
      color: black;
      background-image: linear-gradient(
        to right,
        var(--fut-primary),
        var(--fut-secondary)
      );
    }
}
</style>
