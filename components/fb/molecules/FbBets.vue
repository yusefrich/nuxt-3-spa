<template>
  <tr class="tr-odds">
    <td class="td-date">
      <div class="d-grid">
        <span class="text-date">{{ date }}</span>
        <span class="text-date">{{ time }}</span>
      </div>
    </td>
    <td class="event-name">
      <div class="event-name-wrp">
        <fb-fut-button to="#" class="a">
          <span>{{ teamNameFirst }}</span>
          <span>-</span>
          <span>{{ teamNameSecound }}</span>
        </fb-fut-button>
      </div>
    </td>
    <td v-if="oddsNumberOne" class="event-sel-odd">
      <fb-fut-button class="event-sel-odd-btn">
        {{ oddsNumberOne }}
      </fb-fut-button>
    </td>
    <td class="line-table-h" />
    <td v-if="oddsNumberTwo" class="event-sel-odd">
      <fb-fut-button class="event-sel-odd-btn">
        {{ oddsNumberTwo }}
      </fb-fut-button>
    </td>
    <td class="line-table-h" />
    <td v-if="oddsNumberThree" class="event-sel-odd">
      <fb-fut-button class="event-sel-odd-btn">
        {{ oddsNumberThree }}
      </fb-fut-button>
    </td>
    <td class="m-odds">
      <fb-fut-button to="#" class="a">
        <span>+{{ percentageOdds }}</span>
      </fb-fut-button>
    </td>
  </tr>
</template>
<script>
import FbFutButton from '@/components/fb/atoms/FbFutButton.vue'

export default {
  components: {
    FbFutButton
  },
  props: {
    teamNameFirst: {
      type: String,
      default: ''
    },
    teamNameSecound: {
      type: String,
      default: ''
    },
    percentageOdds: {
      type: String,
      default: ''
    },
    oddsNumberOne: {
      type: String,
      default: ''
    },
    oddsNumberTwo: {
      type: String,
      default: ''
    },
    oddsNumberThree: {
      type: String,
      default: ''
    },
    date: {
      type: String,
      default: ''
    },
    time: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss" scoped>
.tr-odds {
  border-spacing: 0;
  background-color: #232429;
  border-bottom: 1px solid rgb(68, 69, 73);
    &:hover {
      background-color: #18181d;
    }
}
.text-date {
  color: var(--fut-primary);
  font-size: 11px;
}
.td-date {
  width: 50px;
  padding-left: 4px;
}
.event-name {
  font-size: 12px;
  min-width: 170px;
}
.event-name-wrp {
  position: relative;
  padding-right: 20px;
    .a {
      color: white;
      text-decoration: none;
    }
    span {
      white-space: nowrap;
    }
}
.event-sel-odd {
  text-transform: uppercase;
  text-align: center;
  font-size: 11px;
  line-height: 12px;
  padding: 3px 2px;
  height: 1px;
  width: 1px;
}
.event-sel-odd-btn {
  font-weight: bold;
  line-height: 31px;
  overflow: hidden;
  display: block;
  min-width: 20px;
  min-height: 22px;
  width: 45px;
  //width: 45px;
  border: none;
  border-radius: 5px;
  background-color: #55545a;
  color: white;
    &:hover {
      color: black;
      background-image: linear-gradient(
        to right,
        var(--fut-primary),
        var(--fut-secondary)
      );
    }
}
.m-odds {
  font-size: 12px;
  text-align: right;
  width: 40px;
  padding: 3px 4px;
    .a {
      color: var(--fut-primary);
      text-decoration: none;
    }
}
.line-table-h {
  width: 1px;
}
</style>
