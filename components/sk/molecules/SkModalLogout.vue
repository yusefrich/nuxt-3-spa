<template>
  <sk-modal
    v-model="open"
    min-height="auto"
    close
  >
    <div class="sk-modal-logout">
      <h2>
        <font-awesome-icon class="icon" :icon="['fas', 'sign-out-alt']" />
        <span>{{ $t('i18n_sair') }}</span>
      </h2>
      <p class="pt-4">
        {{ $t('i18n_nao_se_esqueca_de_verificar') }}
      </p>
      <button
        class="logout-btn transition"
        @click="$emit('logout'), open = false"
      >
        <span>{{ $t('i18n_sair') }}</span>
      </button>
    </div>
  </sk-modal>
</template>

<script>
export default {
  name: 'SkModalLogout',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    open: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.sk-modal-logout {
  padding: 1rem;

  h2 {
    font-size: 1rem;
    font-weight: 600;

    .icon {
      color: var(--fut-secondary);
    }
  }
  p {
    font-size: .875rem;
    text-align: center;
  }
  .logout-btn {
    display: flex;
    justify-content: center;
    width: 100%;
    background: #e9113c;
    color: var(--fut-color-dynamic);
    border: none;
    box-shadow: 0rem .0625rem .1875rem #00000033 , 0rem .0625rem .125rem #0000001f;
    padding: 12px 20px;
    border-radius: .25rem;

    span {
      font-weight: 600;
      font-size: 1rem;
    }

    &:hover {
      background: #ba0e30;
    }
    &:active {
      span {
        display: flex;
        transform: scale(.95);
      }
    }
  }
}
</style>
