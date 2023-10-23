<template>
  <div class="fb2-date-time-filter">
    <div v-if="!hoursType" class="days">
      <fb-fut-button class="w-100 week-times text-center text-decoration-none" @click="hoursType = true">
        <font-awesome-icon :icon="['fas', 'clock']" />
      </fb-fut-button>
      <fb-fut-button
        v-for="day in days"
        :key="'day_filter_mobile_' + day"
        :to="currentDay === day ? '/sports' : '/sports?day='+day"
        :class="{active: currentDay === day}"
        class="w-100 week-times text-center text-decoration-none"
      >
        <span>{{ day }}</span>
      </fb-fut-button>
    </div>
    <div v-else class="hours">
      <fb-fut-button class="week-times text-center text-decoration-none" @click="hoursType = false">
        <font-awesome-icon class="ms-1" :icon="['far', 'calendar-alt']" />
      </fb-fut-button>
      <fb-fut-button
        v-for="hour in hours"
        :key="'day_filter_mobile_' + hour"
        :to="currentHour === hour ? '/sports' : '/sports?hour='+hour"
        :class="{active: currentHour === hour || (hour === '24' && !currentHour)}"
        class="w-100 week-times hour text-center text-decoration-none"
      >
        <span>{{ hour }}hr</span>
        <div :class="currentHour === hour || (hour === '24' && !currentHour) ? 'circle' : 'v-line'">
          <span />
        </div>
        <div class="h-line">
          <span />
        </div>
      </fb-fut-button>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import FbFutButton from '@/components/fb/atoms/FbFutButton.vue'

export default {
  name: 'Fb2DateTimeFilter',
  components: {
    FbFutButton
  },
  data () {
    return {
      currentDay: null,
      currentHour: null,
      days: ['Do', '2ª', '3ª', '4ª', '5ª', '6ª', 'Sa'],
      hours: ['1', '2', '3', '6', '12', '24'],
      hoursType: false
    }
  },
  watch: {
    '$route.query.day' (value) {
      if (!value) {
        this.currentHour = null
      }
    },
    '$route.query.hour' (value) {
      if (value) {
        this.hoursType = true
      } else {
        this.currentHour = null
        this.hoursType = false
      }
    }
  },
  mounted () {
    this.currentDay = this.$route.query.day
    this.currentHour = this.$route.query.hour
    const days = []
    for (let i = 0; i < this.days.length; i++) {
      const e = this.days[i]
      if (i >= dayjs().day()) {
        days.push(e)
      }
    }
    for (let i = 0; i < this.days.length; i++) {
      const e = this.days[i]
      if (i < dayjs().day()) {
        days.push(e)
      }
    }
    this.days = days

    if (this.currentHour) {
      this.hoursType = true
    }
  }
}
</script>

<style lang="scss" scoped>
.fb2-date-time-filter {

  .days, .hours {
    display: flex;
    background: var(--fut-background-darkest);
    width: 100%;
  }

  .week-times {
    color: var(--fut-color-dynamic);
    font-size: 13px;
    padding: 13px 5px;

    &.active {
      color: var(--fut-primary);
    }
  }

  .hours {
    position: relative;
    height: 64px;

    .hour {
      font-size: 11px;
      position: relative;

      .v-line {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        span {
          width: 4px;
          height: 11px;
          background: var(--fut-primary);
          margin-top: 12px;
        }
      }
      .circle {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 3;

        span {
          width: 16px;
          height: 16px;
          border-radius: 8px;
          background: var(--fut-primary);
          border: 2px solid var(--fut-background-darkest);
          margin-top: 24px;
        }
      }
      .h-line {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;

        span {
          height: 4px;
          width: 100%;
          background: var(--fut-primary);
          margin-top: 24px;
        }
      }

      &:first-of-type {
        .h-line {
          justify-content: flex-end;
          span {
            width: calc(50% + 2px) !important;
          }
        }
      }
      &:last-of-type {
        .h-line {
          justify-content: flex-start;
          span {
            width: calc(50% + 2px) !important;
          }
        }
      }
    }
  }
}
</style>
