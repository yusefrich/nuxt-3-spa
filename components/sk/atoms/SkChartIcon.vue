<template>
  <div class="sk-chat-icon">
    <div class="chart-line">
      <span />
      <span />
    </div>

    <div class="bars first">
      <div class="dot">
        <span />
      </div>
      <div class="bar-1">
        <span />
      </div>
    </div>
    <div class="bars bar-2">
      <span />
    </div>
    <div class="bars bar-3">
      <span />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sk-chat-icon {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 69px;

  .chart-line {
    position: absolute;
    top: -38px;
    left: 27px;
    display: flex;
    transform: rotate(54deg);

    span {
      width: 7px;
      height: 40px;
      background: var(--fut-background-lightest-2);
      border: 1px solid var(--fut-background-lightest-2);

      &:first-of-type {
        margin-top: 30px;
        height: 35px;
      }
    }
  }

  .bars {
    width: 26%;
    height: 55px;

    &:last-of-type {
      height: 70px;
    }
  }

  .first  {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  .bar-1 {
    width: 100%;
    height: 30px;
  }
  .dot {
    width: 70%;
    height: 12px;
    border-radius: 50px;
    background: green;
    margin-top: 4px;
    display: flex;
    justify-content: center;

    span {
      width: 55%;
      height: 55%;
      border-radius: 50%;
      margin-top: 1px;
      background: var(--fut-primary);
    }
  }

  .bars .bar-1, .bar-2, .bar-3 {
    background: var(--fut-background);
    position: relative;
    display: flex;
    justify-content: center;
    border-radius: 4px;

    span {
      position: absolute;
      top: -6px;
      width: 65%;
      height: 105%;
      background: var(--fut-background-lightest-2);
      border-radius: 30px;
    }
  }
}
</style>
