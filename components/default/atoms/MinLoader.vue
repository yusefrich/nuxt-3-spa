<template>
  <transition name="fade">
    <div :class="['transition', 'loader', condition?'':'hide']">
      <img class="img-fluid contain" src="/img/no-halftime-loaders-petrick.gif" alt="">
    </div>
  </transition>
</template>
<script>
export default {
  props: {
    condition: Boolean
  }
}
</script>
<style lang="scss" scoped>
  .contain{
    object-fit: cover;
    width: 190px;
    height: 190px;
    border-radius: 600px;
  }
  .loader{
    filter: grayscale(60%) brightness(187.5%);
    -webkit-filter: grayscale(60%) brightness(187.5%);
    -moz-filter: grayscale(60%) brightness(187.5%);
    height: auto;
    width: 100%;
    margin-top: 70px;
    display: flex;
    justify-content: center;
    align-content: center;
    z-index: 99999;
    opacity: 1;
    background: transparent;
  }
  .loader.hide{
    height: 0 !important;
    width: 0 !important;
    opacity: 0 !important;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>
