<template>
  <!-- // TODO atualizar estilo do botão quando ele estiver desabilitado, atualmente a cor não esta a primaria do cliente -->
  <!-- :href="external ? getFullPathWithWindow(to) : getFullPathWithWindow(`${localePath(to)}`)" -->
  <a
    v-if="to && !disabled"
    :disabled="disabled || loading"
    :href="external ? to : `${localePath(to)}${getPathSlash(to)}`"
    :target="target"
    :class="[
      `btn`,
      block?'btn-block w-100':'',
      rounded?'btn-rounded':'btn-flat',
      primary?'btn-primary':'',
      secondary?'btn-secondary':'',
      dark?'btn-dark':'',
      outlinePrimary?'outline_primary':'',
    ]"
  >
    <slot /> <font-awesome-icon v-if="loading" class="icon spinner-class" :icon="['fas', 'circle-notch']" />
  </a>
  <button
    v-else
    :type="type"
    :disabled="disabled || loading"
    :class="[
      `btn`,
      block?'btn-block w-100':'',
      rounded?'btn-rounded':'btn-flat',
      primary?'btn-primary':'',
      secondary?'btn-secondary':'',
      dark?'btn-dark':'',
      outlinePrimary?'outline_primary':'',
    ]"
    @click="$emit('click')"
  >
    <slot /> <font-awesome-icon v-if="loading" class="icon spinner-class" :icon="['fas', 'circle-notch']" />
  </button>
</template>
<script>
export default {
  name: 'FbFutButton',
  props: {
    external: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ''
    },
    block: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    to: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    dark: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: Boolean,
      default: false
    },
    primary: {
      type: Boolean,
      default: false
    },
    secondary: {
      type: Boolean,
      default: false
    },
    outlinePrimary: {
      type: Boolean,
      default: false
    },
    target: {
      type: String,
      default: '_self'
    }
  },
  methods: {
    getPathSlash (to) {
      // console.log('this is the to: ', to)
      if (to === '/') {
        return ''
      }
      if (to.slice(-1) === '/' || to.includes('?')) {
        return ''
      }
      return '/'
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "@/assets/layout/variables";
  .btn{
    outline: none !important;
    box-shadow: none !important;
    border: none;
    padding: 0;
    font-size: 12px;
  }
  .btn-dark{
    background-color: var(--fut-background);
    border-color: var(--fut-background-darker);
  }
  .btn-dark:hover{
    background-color: var(--fut-background-lighter);
  }
  .spinner-class{
    animation-name: spin;
    animation-duration: 500ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
  @keyframes spin {
    from {
      transform:rotate(0deg);
    }
    to {
      transform:rotate(360deg);
    }
  }
  .outline_primary{
    border: 1px solid var(--fut-primary) !important;
    color: var(--fut-primary) !important;
  }
  .outline_primary:hover{
    background: var(--fut-primary) !important;
    color: #000000 !important;
  }
  .btn-rounded{
    overflow: hidden;
  }
</style>
