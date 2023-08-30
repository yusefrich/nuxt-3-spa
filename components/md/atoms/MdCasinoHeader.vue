<template>
  <div class="casino-header">
    <div class="texts">
      <p class="mb-0 fst-italic fw-bold">
        {{ name }}
      </p>
      <p class="mb-0 fst-italic subtitle">
        {{ $t('i18n_todos_os_jogos') }}
      </p>
    </div>
    <div class="back-btn">
      <button
        class="fw-bold"
        @click="$router.go(-1)"
      >
        <font-awesome-icon class="me-2" :icon="['fas', 'chevron-left']" />
        <span>{{ $t('i18n_voltar').toUpperCase() }}</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MdCasinoHeader',
  props: {
    name: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.casino-header {
  display: flex;
  justify-content: space-between;
  .texts {
    font-size: 19px;
    color: var(--md-font-color);
    .subtitle {
      font-weight: 400 !important;
      color: #FB114D;
    }
  }
  .back-btn {
    display: flex;
    align-items: center;
    button {
      color: var(--md-font-color);
      border: 1px solid var(--md-comp-border-color);
      background: var(--md-comp-bg-color);
      box-sizing: border-box;
      box-shadow: 0px 0px 14px -3px var(--md-ticket-shadow-color);
      margin-left: 4px;
      padding: 10px 25px ;
      border-radius: 100px;
      &:active {
        background: var(--md-invert-font-color);
      }
    }
  }
}
</style>
