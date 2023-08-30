<template>
  <!-- // TODO atualizar estilo do botão quando ele estiver desabilitado, atualmente a cor não esta a primaria do cliente -->
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
      gray?'btn-gray':'',
      grayNsx?'btn-gray-nsx':'',
      grayDarker?'btn-gray-darker':'',
      gradient?'btn-gradient':''
    ]"
  >
    <slot /> <font-awesome-icon v-if="loading" class="icon spinner-class" :icon="['fas', 'circle-notch']" />
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
      gray?'btn-gray':'',
      grayNsx?'btn-gray-nsx':'',
      grayDarker?'btn-gray-darker':'',
      gradient?'btn-gradient':''
    ]"
    @click="$emit('click')"
  >
    <slot /> <font-awesome-icon v-if="loading" class="icon spinner-class" :icon="['fas', 'circle-notch']" />
  </button>
</template>
<script>
export default {
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
    gradient: {
      type: Boolean,
      default: false
    },
    gray: {
      type: Boolean,
      default: false
    },
    grayDarker: {
      type: Boolean,
      default: false
    },
    grayNsx: {
      type: Boolean,
      default: false
    },
    primary: {
      type: Boolean,
      default: false
    },
    sm: {
      type: Boolean,
      default: false
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
  .btn-gradient{
    background: linear-gradient(var(--fut-primary),var(--fut-background-2)) !important;
  }
  .btn{
    outline: none !important;
    box-shadow: none !important;
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
  .btn-gray{
    border: 1px solid var(--nsx-dark-6);
  }
  .btn-gray:hover{
    background: var(--nsx-dark-6);
  }
  .btn-gray-nsx{
    background: var(--nsx-dark-2);
  }
  .btn-gray-nsx:hover{
    background: var(--nsx-dark-3);
  }
  .btn-gray-darker{
    background: #8b8b8b;
  }
  .btn-rounded{
    overflow: hidden;
  }
</style>
