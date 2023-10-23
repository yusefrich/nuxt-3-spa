<template>
  <article>
    <header class="tabs d-flex">
      <div v-for="(tab, index) in tabs" :key="index" class="mx-1">
        <button
          class="btn-deposit nav-item"
          :class="{ 'is-active': tab.isActive }"
          @click="selectTab(tab)"
        >
          <img width="22px" height="15px" :src="tab.image" alt="">
          <span>{{ tab.name }}</span>
        </button>
      </div>
    </header>
    <section class="tabs-details">
      <slot />
    </section>
  </article>
</template>

<script>
export default {
  data () {
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
.btn-deposit {
  width: 132px;
  height: 42px;
  font-size: 13px;
  border-radius: 15px;
  font-weight: bold;
  color: grey;
  background-color: var(--fut-background-lighter);
  border: 3px solid var(--fut-background-lightest);
    &.is-active {
      color: white;
      background-color: var(--fut-background-lighter);
      border: 2px solid var(--fut-primary);
    }
}
</style>
