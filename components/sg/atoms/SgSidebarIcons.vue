<template>
  <div class="second-bar text-center d-none d-md-grid">
    <div class="second-bar-content mt-5">
      <n-link to="#" class="mt-5 mb-1">
        <img class="icons-size" src="/Sg/Dice.png" alt="">
      </n-link>
      <n-link to="#" class="mb-1">
        <img class="icons-size" src="/Sg/Ball2.png" alt="">
      </n-link>
      <n-link to="#" class="mb-1">
        <img class="icons-size" src="/Sg/Icone 7G.png" alt="">
      </n-link>
      <n-link to="#" class="mb-4">
        <img class="icons-size" src="/Sg/fire-svgrepo-com.png" alt="">
      </n-link>
      <n-link to="#" class="mb-1">
        <img class="icons-size" src="/Sg/Star.png" alt="">
      </n-link>
      <n-link to="#" class="mb-4">
        <img class="icons-size" src="/Sg/history-svgrepo-com.png" alt="">
      </n-link>
      <n-link to="/casino" class="mb-1">
        <img class="icons-size" src="/Sg/House game.png" alt="">
      </n-link>
      <n-link to="#" class="mb-1">
        <img class="icons-size" src="/Sg/new-svgrepo-com.png" alt="">
      </n-link>
      <n-link to="#" class="mb-4">
        <img class="icons-size" src="/Sg/casino-svgrepo-com.png" alt="">
      </n-link>
      <n-link to="#" class="mb-1">
        <img class="icons-size" src="/Sg/chat-svgrepo-com.png" alt="">
      </n-link>
      <n-link to="#" class="mb-1">
        <img class="icons-size" src="/Sg/Br.png" alt="">
      </n-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SgSidebarIcons'
}
</script>

<style lang="scss" scoped>

.second-bar {
  position: fixed;
  background-color: var(--fut-background-darkest);
  height: 100%;
  width: 70px;

  a {
    color: var(--fut-secondary);
    font-size: 27px;
    text-decoration: none;
  }
}
.second-bar-content {
  display: flex;
  flex-direction: column;
}
.icons-size {
  width: 25px;
  height: 23px;
}

</style>
