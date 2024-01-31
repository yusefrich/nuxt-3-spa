<template>
  <button
    :class="[
      'position-relative',
      {
        selected: selected && odd.odds,
        disabled: !odd.odds || odd.odds <= 0 || odd.odds == 1
      },
      getLevarage(odd.leverage)
    ]"
    :disabled="!odd.odds || odd.odds <= 0 || odd.odds == 1"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'SkOddsBtn',
  props: {
    odd: {
      type: Object,
      default: () => ({})
    },
    selected: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'click'
  ],
  methods: {
    getLevarage (levarage) {
      if (levarage === 'up') {
        return 'background-lev-success'
      }
      if (levarage === 'down') {
        return 'background-lev-danger'
      }
      return levarage
    }
  }
}
</script>

<style lang="scss" scoped>
button {
  width: 100%;
  height: 100%;
  border: none;
  background: var(--fut-background-black-2);
  color: var(--fut-color-dynamic);
  display: flex;
  border-radius: .25rem;
  font-size: .875rem;
  padding: .5rem .75rem;

  .odd-wrapper {
    display: flex;
    flex-direction: column;
    max-width: 100%;

    .odd-name {
      max-width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-weight: 600;
    }
    .odd {
      color: var(--fut-primary-lighter);
      font-weight: 700;

      .old-odd {
        font-size: 12px;
        margin: 0 0 -4px 0;
        text-decoration: line-through;
        font-weight: 400;
      }
    }
  }

  &:hover {
    background: var(--fut-primary-black);
  }
  &:active {
    .odd-wrapper {
      transform: scale(.95);
    }
  }
  &.disabled {
    background: #0718249b !important;
    .odd-wrapper {
      transform: scale(1) !important;
    }
  }

  &.selected {
    background: var(--fut-primary) !important;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, .2), 0 4px 6px -2px rgba(0, 0, 0, .1);
    color: var(--fut-color-dynamic-inverse);

    .odd {
      color: var(--fut-color-dynamic) !important;
    }
  }

  &.background-lev-danger::before{
    content: "";
    width: 0;
    height: 0;
    border-bottom: 10px solid #c62828;
    border-left: 10px solid transparent;
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 0;
    animation: fade 1s 5;
  }
  &.background-lev-success::before{
    content: "";
    width: 0;
    height: 0;
    border-top: 10px solid #558b2f;
    border-left: 10px solid transparent;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 0;
    animation: fade 1s 5;
  }
}
</style>
