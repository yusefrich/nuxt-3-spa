<template>
  <div class="d-md-flex d-grid">
    <div class="tabs w-md-25 mt-md-0 mt-3">
      <div class="mx-50 mx-md-0 d-md-inline d-flex">
        <div class="header-profile d-md-grid d-none h-auto mb-1 text-white p-2">
          {{ $t('i18n_tipo_de_pagamento') }}
        </div>
        <div v-for="(tab, index) in tabs" :key="'pix_'+index" class="d-md-inline d-none">
          <fb-fut-button
            class="button-style mb-1 p-3 w-100 nav-item"
            :class="{ 'is-active': tab.isActive }"
            @click="selectTab(tab)"
          >
            <img class="pix-size mr-10 p-1 bg-white" src="/img/pix.png">
            <span>{{ tab.name }}</span>
          </fb-fut-button>
        </div>
        <div v-for="(tab, index) in tabs" :key="index" class="d-md-none d-flex">
          <fb-fut-button
            class="button-style mb-1 py-2 px-4 w-100 nav-item"
            :class="{ 'is-active': tab.isActive }"
            @click="selectTab(tab)"
          >
            <div class="text-center">
              <img class="pix-size mr-10 p-1 bg-white" src="/img/pix.png">
            </div>
            <span>{{ tab.name }}</span>
          </fb-fut-button>
        </div>
      </div>
    </div>
    <div class="ms-md-1 ms-0 w-md-75">
      <slot />
    </div>
  </div>
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
@import "@/assets/layout/breakpoints";

.tabs {
  display: flex;
  float: left;
  @include md {
    display: inline;
  }
}
.button-style {
  background-color: var(--fut-background);
  color: white;
  border: none !important;
  font-size: 12px;
  text-align: left;
  width: unset;
  text-transform: uppercase;
  border: 1px solid #31343B;
  span {
    white-space: nowrap;
  }
  &:hover {
    background-color: var(--fut-background-darker);
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
.header-profile {
  background-color: var(--fut-background);
}
.w-md-75 {
  width: 100%;
  @include md {
    width: 75%;
  }
}
.w-md-25 {
  width: 100%;
  @include md {
    width: 25%;
  }
}
.pix-size {
  width: 80px;
  border-radius: 5%;
  @include md {
    width: 60px;
    border-radius: 0%;
  }
}
</style>
