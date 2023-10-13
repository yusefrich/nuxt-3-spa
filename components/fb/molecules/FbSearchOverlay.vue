<template>
  <div class="search-ov-container">
    <div class="bg-dark bg-ov" />
    <div class="content">
      <form @submit.prevent="submitSeach()">
        <div class="d-flex bg-darker">
          <input v-model="search" class="w-100 search-input px-2" type="text" :placeholder="$t('i18n_buscar')">
          <fb-fut-button id="seach_router" :to="localePath('/search/'+search)" class="btn p-1">
            <fa class="text-white p-2 text-primary" :icon="['fas', 'search']" />
          </fb-fut-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import FbFutButton from '@/components/fb/atoms/FbFutButton.vue'

export default {
  components: {
    FbFutButton
  },
  data () {
    return {
      search: ''
    }
  },
  methods: {
    submitSeach () {
      document.getElementById('seach_router').click()
    }
  }
}
</script>

<style scoped lang="scss">
.search-ov-container{
  position: fixed;
  top: 55px;
  left: 0;
  width: 100vw;
  height: 100%;
  z-index: 100;
}
.bg-darker{
  background: var(--fut-background-darkest);
}
.bg-ov{
  position: absolute;
  width: 100vw;
  height: 100%;
  top: 0;
  opacity: .6;
  z-index: -1;
}
.search-input{
  background: transparent;
  border: none;
  color: white;
  &::placeholder{
    color: white;
  }
  &:focus{
    outline: none;
  }
}
</style>
