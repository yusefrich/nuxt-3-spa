<template>
  <article>
    <header class="tabs d-flex">
      <div v-for="(tab, index) in tabs" :key="index">
        <fb-fut-button
          class="button-style w-100 d-flex jusityfy-content-between align-items-center nav-item"
          :class="{ 'is-active': tab.isActive, 'hidden': hidden === true }"
          @click="selectTab(tab)"
        >
          <img class="mr-10" :src="tab.image">
          <span class="game-name mr-10">{{ tab.name }}</span>
          <span class="game-count">{{ tab.count }}</span>
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
  props: {
    hidden: {
      type: Boolean,
      default: true
    }
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
  background-color: var(--fut-background-darker);
  color: white;
  border: none;
  height: 30px;
  font-size: 12px;
  text-transform: uppercase;
  border: 1px solid #31343B;
  .game-count {
    font-size: 10px;
  }
    &:hover {
      .game-name {color: var(--fut-primary);}
    }
    &.is-active {
      color: black;
      background-image: linear-gradient(
        to right,
        var(--fut-primary),
        var(--fut-secondary)
      );
      font-size: 12px;
    }
}
.hidden {
  font-size: 0;
  &:hover{
    font-size: 12px;
    transition: all .35s ease-in-out;
  }
}
</style>
