<template>
  <nsx-fut-button class="a btn d-flex" :to="link">
    <img class="transition" :src="icon" width="30px" height="30px" alt="">
    <div class="content-text text-start">
      <span class="ps-2 d-block title-icon">{{ title }}</span>
      <span class="ps-2 text-content-time ps-0"><span>24hs:</span> {{ games }}</span>
    </div>
  </nsx-fut-button>
</template>
<script>
import NsxFutButton from '@/components/nsx/atoms/NsxFutButton.vue'

export default {
  components: {
    NsxFutButton
  },
  props: {
    icon: {
      type: String,
      default: '/bet365icons/1.svg'
    },
    title: {
      type: String,
      default: 'Série A'
    },
    games: {
      type: Number,
      default: 20
    },
    link: {
      type: String,
      default: '#'
    }
  }
}
</script>
<style scoped lang="scss">
  .a{
    background: #3a3a3a;
    width: 100%;
    padding: 5px;
  }
  .a:hover{
    .content-text{
      color: #ffa500;
    }
    img{
      transform:rotate(360deg);
    }
    box-shadow: 3px 3px 3px var(--nsx-dark-0);
  }
  img{
    object-fit: contain;
  }
  .title-icon{
    font-size: 12px;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .content-text{
    color: #c5c5c5;
    line-height: 16px;
    overflow: hidden;
  }
  .text-content-time{
    font-size: 12px;
    font-weight: 700;
    span{
      color: #ec453c;
    }
  }
</style>
