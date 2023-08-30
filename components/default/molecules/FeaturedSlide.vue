<template>
  <div class="game-card">
    <fut-button v-if="url" :to="url" external>
      <img :src="slide" class="slider-img" alt="">
    </fut-button>
  </div>
</template>
<script>
import FutButton from '@/components/default/atoms/FutButton.vue'

export default {
  components: {
    FutButton
  },
  props: {
    slide: {
      type: String,
      required: true
    },
    url: {
      type: String,
      default: null
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "@/assets/layout/variables";
  @import "@/assets/layout/breakpoints";
  .bg-darker{
    background: var(--fut-background-darkest);
  }
  .btn-bet{
    border: 1px solid $gray-600;
    border-radius: 5px;
    span{
        background: $white;
        color: $black;
        padding: 0px 6px;
        border-radius: 100px;
    }
  }
  .btn-bet:hover{
    background: rgba(255, 255, 255, 0.3);
  }
  .text-container{
    margin-top: 40px;
  }
  .game-card{
    width: calc(100vw - 27px);
    h3{
      font-size: 17px;
    }
    h5{
      font-size: 15px;
    }
    @include md{
      width: 354px;
      h5{
        font-size: 20px;
      }
      h3{
        font-size: 23px;
      }
    }
    margin-left: 15px;
    height: 200px;
    border-radius: 10px;
    border: 1px solid $gray-500;
    background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("/img/campo.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    .game-card-header{
        border-radius: 10px 10px 0px 0px;
        border-bottom: 1px solid $gray-600;
        .icon{
            font-size: 30px;
            margin-right: 10px;
            margin: 10px;
        }
    }
  }
  .slider-img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
</style>
