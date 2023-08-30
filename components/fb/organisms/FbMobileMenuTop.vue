<template>
  <div class="mobile-menu w-100 d-flex">
    <div v-if="productRedirect" class="main-content" :class="{ 'bg-games-list': font === 'dark' }">
      <fb-fut-button class="a menu-content" :to="productRedirect.url">
        <div class="d-grid justify-content-center">
          <img class="icon-size fut-color-dynamic" src="/FbIcons/sports.svg">
        </div>
        <span class="mb-0">{{ productRedirect.title }}</span>
      </fb-fut-button>
    </div>

    <div
      v-for="(item, idx) in items"
      :key="idx"
      class="main-content"
      :class="{ 'bg-games-list': font === 'dark' }"
    >
      <fb-fut-button
        class="a menu-content"
        :to="item.link"
      >
        <div class="d-grid justify-content-center">
          <img
            :src="item.icon || item.img"
            class="icon-size"
          >
        </div>
        <span class="mb-0">{{ item.text }}</span>
      </fb-fut-button>
    </div>
  </div>
</template>

<script>
import FbFutButton from '@/components/fb/atoms/FbFutButton.vue'

export default {
  name: 'FbMobileMenuTop',
  components: {
    FbFutButton
  },
  props: {
    font: {
      type: String,
      default: null
    },
    items: {
      type: Array,
      default: () => ([])
    }
  },
  computed: {
    productRedirect () {
      if (!process.env.PRODUCT_REDIRECT_URL && !process.env.PRODUCT_REDIRECT_TITLE) {
        return null
      }
      return { url: process.env.PRODUCT_REDIRECT_URL, title: process.env.PRODUCT_REDIRECT_TITLE }
    }
  }
}
</script>

<style lang="scss" scoped>
.mobile-menu {
  background-color: var(--fut-background-header-light);
  overflow-x: auto;
  display: block;
  white-space: nowrap;
  overflow-y: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
}
.icon-size {
  width: 30px;
  filter: grayscale(200%);
  padding-bottom: 2px;
}
.main-content {
  width: 95px;
  padding: 4% 5%;
  // border: 1px solid var(--fut-background-lightest);
  border: 1px solid var(--fut-background-header-lighter);
  white-space: nowrap;
  text-overflow: ellipsis;
    .a
    {
      text-decoration: none;
      color: white;
      font-size: 12px;
    }
}
.bg-games-list{
  background: var(--fut-background-games-list);
}
</style>
