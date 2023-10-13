<template>
  <ul class="items-wrapper">
    <li
      v-for="(item, idx) in items"
      :key="idx"
    >
      <!-- @click="modal = true, itemIdx = idx" -->
      <a :href="item.link">
        <div
          class="items"
        >
          <!-- <img :src="logo" alt="logo" class="logo"> -->
          <img
            class="banner"
            :src="item.img"
            alt="Banner"
          >
          <!-- <div class="background-gradient" /> -->
        </div>
      </a>
    </li>

    <md-modal-storie
      v-model="modal"
      :items="items"
      :item-idx="itemIdx"
    />
  </ul>
</template>

<script>
import MdModalStorie from '@/components/md/molecules/MdModalStorie.vue'

export default {
  name: 'MdMobileCarousel',
  components: {
    MdModalStorie
  },
  props: {
    items: {
      type: Array,
      default: () => ([])
    },
    logo: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      modal: false,
      itemIdx: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.items-wrapper {
  display: flex;
  width: 100%;
  padding: 0;
  margin: 0;
  overflow-x: auto;
  list-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
.items {
  position: relative;
  margin: 3px;
  width: 85px;
  height: 134px;
  border-radius: 8px;
  .background-gradient {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(180deg, rgba(51, 51, 51, 0) 0%, #333333 100%);
    border-radius: 8px;
  }
}
.logo {
  position: absolute;
  width: 32px;
  height: 32px;
  border-radius: 16px;
  margin: 4px;
  border: 1px solid var(--md-highlight-lighter);
  object-fit: contain;
  background: #fafafa;
  z-index: 9;
}
.banner {
  border-radius: 8px;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
