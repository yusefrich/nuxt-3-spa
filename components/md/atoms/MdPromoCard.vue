<template>
  <div
    class="promo-card"
    :style="`background-image: url(${promo.img});`"
    @click="$emit('openPromo', promo)"
  >
    <div class="promo-body transition">
      <div class="promo-infos">
        <p class="promo-title">
          {{ promo.name }}
        </p>
        <!-- eslint-disable-next-line -->
        <p class="promo-desc" v-html="shortText(promo.text)" />
      </div>
      <div class="hover-icon transition">
        <font-awesome-icon class="edit-icon" :icon="['fas', 'external-link-alt']" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MdPromoCard',
  props: {
    promo: {
      type: Object,
      default: () => ({})
    }
  },
  emits: [
    'openPromo'
  ],
  methods: {
    shortText (str) {
      const stripped = str.replace(/<\/?[^>]+(>|$)/g, '')
      return stripped.substring(0, 100) + '...'// get first 5 chars
    }
  }
}
</script>

<style lang="scss" scoped>
.promo-card {
  width: 275px;
  height: 160px;
  background-size: 275px 160px;
  color: #fff;
  border-radius: 15px;

  .promo-body {
    position: relative;
    display: flex;
    align-items: flex-end;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, rgba(0, 0, 0, 0.65) 7.89%, rgba(0, 0, 0, 0.272135) 25%, rgba(0, 0, 0, 0) 50%);
    border-radius: 15px;
    overflow: hidden;
    cursor: pointer;
    &:hover {
      background: linear-gradient(90deg, rgba(0, 0, 0, 0.65) 7.89%, rgba(0, 0, 0, 0.272135) 51.7%, rgba(0, 0, 0, 0) 100%);
      .hover-icon {
        display: flex;
        justify-content: start;
        align-items: center;
      }
    }

    .promo-infos {
      width: 100%;
      height: 55%;
      padding: 0 12px 12px 12px;

      .promo-title {
        font-size: 14px;
        font-weight: 700;
        margin: 0;
      }
      .promo-desc {
        font-size: 12px;
        margin: 0;
      }
    }
    .hover-icon {
      position: absolute;
      right: -15px;
      bottom: -35px;
      transform: rotate(45deg);
      display: none;
      width: 50px;
      height: 100px;
      background:#57BF93;
      padding-left: 10px;
      .edit-icon {
        transform: rotate(-45deg);
      }
    }
  }
}
</style>
