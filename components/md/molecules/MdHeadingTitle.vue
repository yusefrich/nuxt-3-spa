<template>
  <div class="heading-bg">
    <div
      v-if="currentEvent"
      class="content"
    >
      <div class="time">
        <p class="mb-0 d-none d-md-block">
          <small>{{ currentEvent.league }}</small>
        </p>
        <h5>
          {{ formatDate(currentEvent.date) }}
        </h5>
      </div>
      <div class="teams">
        <h5 class="mb-0">
          {{ currentEvent.home_team }}
        </h5>
        <h5 class="mb-0">
          {{ currentEvent.away_team }}
        </h5>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MdHeadingTitle',
  props: {
    live: {
      type: Boolean,
      default: false
    },
    currentEvent: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    formatDate (date) {
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      }

      return new Date(date).toLocaleDateString(this.$i18n.locale, options)
    }
  }
}
</script>

<style lang="scss" scoped>
.heading-bg {
  border-radius: 6px;
  width: 100%;
  height: 160px;
  background-image: url("/md/heading-img.png");
  background-position: center;
  background-size: cover;
  background-color: var(--md-comp-bg-color);
}
.content {
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #ffffff55;
  color: #000;
  width: 100%;
  height: 100%;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60%;
  }
}
.time {
  flex-direction: column;
  background: var(--md-comp-bg-color);
  color: var(--md-font-color);
  border-radius: 5px 5px 0px 0px;
}
.teams {
  justify-content: space-evenly !important;
  background: var(--md-comp-bg-color-transparent);
  color: var(--md-font-color);
  border-radius: 0px 0px 5px 5px;
  height: 45px;
}

@media (max-width: 425px) {
  .heading-bg,
  .content {
    border-radius: 0;
  }
  .heading-bg {
    width: 100vw !important;
    margin-left: -12px;
  }

  .content {
    div {
      width: 80%;
    }
  }
  .time {
    height: 40px;
  }
  .teams {
    height: 35px;
  }
  h5 {
    font-size: 12px;
    margin: 0;
    font-weight: bold;
  }
}
</style>
