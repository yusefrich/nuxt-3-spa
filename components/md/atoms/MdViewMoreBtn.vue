<template>
  <div class="btn-wrapper">
    <div v-if="loading" class="w-100 p-4">
      <spinner />
    </div>
    <button
      v-else
      class="view-more transition"
      @click="$emit('viewMore')"
    >
      + {{ $t('i18n_ver_mais') }}
    </button>
  </div>
</template>

<script>
import Spinner from '@/components/default/atoms/Spinner.vue'

export default {
  name: 'MdViewMoreBtn',
  components: {
    Spinner
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-wrapper {
  display: flex;
  justify-content: center;
}
.view-more {
  border: none;
  background: var(--md-filter-bg-color);
  min-width: 140px;
  height: 35px;
  margin: 10px 0 0 0;
  padding: 0 20px;
  border-radius: 4px;
  color: var(--md-highlight);
  font-weight: 700;
  font-size: 13px;
  &:hover {
    background: var(--md-highlight-lighter);
    color: #fff;
  }
  &:active {
    background: var(--md-highlight);
  }
}
</style>
