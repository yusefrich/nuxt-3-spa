<template>
  <div>
    <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
      <div class="d-flex">
        <button
          class="bg-transparent border-0"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <img src="/Sg/Home/Prev.png" alt="">
        </button>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <slot name="item-active" />
          </div>
          <div class="carousel-item">
            <slot name="item" />
          </div>
        </div>
        <button
          class="bg-transparent border-0"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <img src="/Sg/Home/Next.png" alt="">
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SgSlider'
}
</script>

<style lang="scss" scoped>
</style>
