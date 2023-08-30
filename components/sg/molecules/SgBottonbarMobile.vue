<template>
  <div class="footer-menu px-3 d-flex d-md-none align-items-center justify-content-between">
    <n-link class="mb-0 text-center" to="#">
      <div class="case">
        <img width="35px" height="35px" src="/Sg/Dice.png" alt="">
      </div>
    </n-link>
    <n-link class="mb-0 text-center" to="#">
      <div class="case">
        <img width="35px" height="35px" src="/Sg/Ball2.png" alt="">
      </div>
    </n-link>
    <button class="btn-dashbord" @click="$emit('showMenu')">
      <img width="30px" src="/Sg/Hamburger90c.png" alt="">
    </button>
    <n-link class="mb-0 text-center" to="#">
      <div class="case">
        <img width="35px" height="35px" src="/Sg/Home/icons8-pesquisar.png" alt="">
      </div>
    </n-link>
    <n-link class="mb-0 text-center" to="#">
      <div class="case">
        <img width="35px" height="35px" src="/Sg/chat-svgrepo-com.png" alt="">
      </div>
    </n-link>
  </div>
</template>

<script>
export default {
  name: 'SgFooterbarMobile'
}
</script>

<style lang="scss" scoped>

.footer-menu {
  position: fixed;
  bottom: 0;
  z-index: 1;
  height: 60px;
  width: 100%;
  background-color: var(--fut-background-darkest);
}
.case {
  width: 30px;
}
.btn-dashbord {
  background-color: var(--fut-background-darkest);
  border-radius: 50px;
  margin-bottom: 40px;
  width: 100%;
  max-width: 90px;
  height: 90px;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

</style>
