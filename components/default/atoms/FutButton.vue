<template>
  <!-- // TODO atualizar estilo do botão quando ele estiver desabilitado, atualmente a cor não esta a primaria do cliente -->
  <!-- :href="external ? to : `..${localePath(to)}`" -->
  <a
    v-if="to && !disabled"
    :disabled="disabled || loading"
    :href="external ? to : `${localePath(to)}${getPathSlash(to)}`"
    :target="target"
    :class="[
      `btn`,
      sm?'btn-sm':'',
      rounded?'btn-rounded':'btn-flat',
      block?'btn-block w-100':'',
      primary?'btn-primary':'',
      secondary?'btn-secondary':'',
      dark?'btn-dark':'',
      outlinePrimary?'outline_primary':'',
      outlineSecondary?'outline_secondary':'',
      primaryText?'text-primary':''
    ]"
  >
    <slot /><font-awesome-icon v-if="loading" class="icon spinner-class" :icon="['fas', 'circle-notch']" />
  </a>
  <button
    v-else
    :disabled="disabled || loading"
    :type="type"
    :class="[
      `btn`,
      sm?'btn-sm':'',
      rounded?'btn-rounded':'btn-flat',
      block?'btn-block w-100':'',
      primary?'btn-primary':'',
      secondary?'btn-secondary':'',
      dark?'btn-dark':'',
      outlinePrimary?'outline_primary':'',
      outlineSecondary?'outline_secondary':'',
    ]"
    @click="$emit('click')"
    @mouseup="$emit('mouseup')"
  >
    <slot /> <font-awesome-icon v-if="loading" class="icon spinner-class" :icon="['fas', 'circle-notch']" />
  </button>
</template>

<script>
export default {
  name: 'FutButton',
  props: {
    external: {
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ''
    },
    target: {
      type: String,
      default: '_self'
    },
    to: {
      type: String,
      default: ''
    },
    rounded: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    dark: {
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
    outlineSecondary: {
      type: Boolean,
      default: false
    },
    sm: {
      type: Boolean,
      default: false
    },
    primaryText: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'click',
    'mouseup'
  ],
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
  .btn-flat{
    border-radius: 0 !important;
  }
  .outline_primary{
    border: 1px solid var(--fut-primary) !important;
    color: var(--fut-primary) !important;
  }
  .outline_primary:hover{
    background: var(--fut-primary) !important;
    color: #000000 !important;
  }
  .outline_secondary{
    border: 1px solid var(--fut-secondary) !important;
    color: var(--fut-secondary) !important;
  }
  .outline_secondary:hover{
    background: var(--fut-secondary) !important;
    color: #000000 !important;
  }
  .btn-rounded{
    overflow: hidden;
  }
</style>
