<template>
  <div class="fut-card">
    <div class="fut-card-title text-white px-3 d-flex" :class="{rounded: !$slots.default}">
      <nsx-fut-button v-if="back" class="btn px-0 text-white" @click="$router.go(-1)">
        <font-awesome-icon class="me-3 mt-1 icon" :icon="['fas', 'caret-left']" />
      </nsx-fut-button>
      <nsx-fut-button v-if="backUrl" :to="backUrl" class="btn px-0 text-white">
        <font-awesome-icon class="me-3 mt-1 icon" :icon="['fas', 'caret-left']" />
      </nsx-fut-button>
      <img
        v-if="icon"
        :src="icon"
        class="me-2 my-2"
        height="35"
        width="35"
        style="border-radius: 100%; object-fit: cover"
        alt="icon img"
      >
      <img
        v-if="logo"
        :src="logo"
        class="me-2 my-2"
        height="15"
        width="auto"
        alt="icon logo"
      >
      <nsx-fut-button v-if="headerLink" :to="headerLink" class="text-white text-decoration-none w-100 text-start" style="align-self: center;" :class="{'text-center': center}">
        <!-- eslint-disable -->
        <span v-if="title" class="mb-0 wrapper-header" v-html="title" />
        <p v-if="subtitle" class="mb-0 wrapper-subtitle" :class="{'wrapper-subtitle-focus': !title}" v-html="subtitle" />
        <!-- eslint-enable -->
      </nsx-fut-button>
      <div v-else class="text-white text-decoration-none w-100 text-start" style="align-self: center;" :class="{'text-center': center}">
        <!-- eslint-disable -->
        <span v-if="title" class="mb-0 wrapper-header" v-html="title" />
        <p v-if="subtitle" class="mb-0 wrapper-subtitle" :class="{'wrapper-subtitle-focus': !title}" v-html="subtitle" />
        <!-- eslint-enable -->
      </div>
    </div>
    <div class="fut-card-body" :class="gray ? 'card-gray' : ''">
      <slot />
    </div>
  </div>
</template>
<script>
import NsxFutButton from '@/components/nsx/atoms/NsxFutButton.vue'

export default {
  name: 'NsxCardWrapper',
  components: {
    NsxFutButton
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
    logo: {
      type: String,
      default: ''
    },
    back: {
      type: Boolean,
      default: false
    },
    backUrl: {
      type: String,
      default: ''
    },
    center: {
      type: Boolean,
      default: false
    },
    gray: {
      type: Boolean,
      default: false
    },
    headerLink: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "@/assets/layout/variables";
  .fut-card{
    border-radius: 5px;
    border: 1px solid var(--nsx-gray-3);
    background-color: var(--nsx-dark-2);
    margin-bottom: 10px;
    overflow: hidden;
  }
  .fut-card-title{
    background: linear-gradient(var(--fut-primary),var(--fut-background-2)) !important;
  }
  .card-gray{
    background-color: var(--nsx-dark-5) !important;
  }
  .icon{
    font-size: 25px;
  }
  .wrapper-header{
    font-size: 16px;
    font-weight: 700;
  }
  .wrapper-subtitle{
    font-size: 12px;
  }
  .wrapper-subtitle-focus{
    font-size: 14.6px;
  }
</style>
