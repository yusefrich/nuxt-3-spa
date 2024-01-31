<template>
  <div>
    <section
      id="table-wrapper"
      :style="`background: ${inplay?'var(--md-highlight-darker)':'var(--md-filter-bg-color)'};`"
      class="transition"
    >
      <h6 class="title">
        <img
          :src="imgUrl"
          class="me-2"
          alt="icon"
          height="30"
          width="30"
        >
        {{ title.toUpperCase() }}
      </h6>
      <div class="filter-field">
        <slot name="filter" />
      </div>
      <div class="table-field">
        <slot name="table" />
      </div>
    </section>

    <div v-if="!inplay && seeMore">
      <md-view-more-btn
        :loading="loading"
        @viewMore="$emit('fetchPage')"
      />
    </div>
  </div>
</template>

<script>
import MdViewMoreBtn from '@/components/md/atoms/MdViewMoreBtn'

export default {
  name: 'MdGamesTableWrapper',
  components: {
    MdViewMoreBtn
  },
  props: {
    imgUrl: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    inplay: {
      type: Boolean,
      default: false
    },
    seeMore: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'fetchPage'
  ],
  data () {
    return {
      pageLimit: false
    }
  }
}
</script>

<style lang="scss" scoped>
#table-wrapper {
  border-radius: 18px;

  .title {
    display: flex;
    align-items: center;
    padding: 0 0 0 15px;
    margin: 0;
    height: 45px;
    color: #fff;
    background: var(--md-bg-third);
    border-radius: 15px 15px 0px 0px;
    font-weight: 700;

    img {
      object-fit: contain;
    }
  }

  .filter-field {
    color: var(--md-font-color);
  }

  .table-field {
    color: var(--md-font-color);
    border-radius: 14px;
    -webkit-box-shadow: 0 8px 10px 0 var(--md-shadow-color);
    box-shadow: 0 8px 10px 0 var(--md-shadow-color);
  }
}
</style>
