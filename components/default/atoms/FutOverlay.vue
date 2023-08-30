<template>
  <div class="wrapper">
    <font-awesome-icon class="text-primary wrapper-icon" :icon="['fas', 'circle-notch']" />
  </div>
</template>
<script>
export default {
}
</script>
<style scoped lang="scss">
  .wrapper{
    width: 100vw;
    height: 100vh;
    z-index: 9999999;
    position: fixed;
    background: #0000009a;
    display: flex;
    justify-content: center;
    align-items: center;
    .wrapper-icon{
      font-size: 60px;
      animation-name: spin;
      animation-duration: 500ms;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
    }
  }
  @keyframes spin {
    from {
      transform:rotate(0deg);
    }
    to {
      transform:rotate(360deg);
    }
  }
</style>
