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
    object-fit: contain;
    max-width: 500px;
  }
  .loader{
    filter: grayscale(100%) brightness(124%);
    -webkit-filter: grayscale(100%) brightness(124%);
    -moz-filter: grayscale(100%) brightness(124%);
    position: fixed;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-content: center;
    z-index: 99999;
    opacity: 1;
    background: #172027;
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
