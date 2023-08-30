<template>
  <a
    v-if="to && !disabled"
    class="button-style p-1"
    :class="[
      `btn`,
      sm?'btn-sm':'',
      rounded?'btn-rounded':'btn-flat',
      block?'btn-block':'',
      secondary?'btn-secondary':'',
      primary?'btn-primary':'',
      dark?'btn-dark':'',
      selected?'selected':'',
      primaryDarker?'primary_darker':'',
      primaryDarkest?'primary_darkest':'',
      primaryDark?'primary_dark':'',
      outlinePrimary?'outline_primary':'',
      outlineSecondary?'outline_secondary':'',
      gray?'btn-gray':'',
      grayNsx?'btn-gray-nsx':'',
      grayDarker?'btn-gray-darker':'',
      gradient?'btn-gradient':''
    ]"
    :disabled="disabled || loading"
    :href="localePath(to)"
    :target="target"
  >
    <slot />
    <span class="sport-name mr-10">{{ sportsName }}</span>
    <span class="count-sport text-white">{{ sportNumber }}</span>
    <font-awesome-icon v-if="loading" class="icon spinner-class" :icon="['fas', 'circle-notch']" />
  </a>
  <button
    v-else
    :class="['btn', primary?'btn-primary':'', dark?'btn-dark':'', block?'btn-block':'']"
    :disabled="disabled || loading"
    :type="type"
    @click="$emit('click')"
  >
    <slot /> <font-awesome-icon v-if="loading" class="icon spinner-class" :icon="['fas', 'circle-notch']" />
  </button>
</template>
<script>
export default {
  props: {
    selected: {
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      default: false
    },
    sportNumber: {
      type: String,
      default: ''
    },
    sportsName: {
      type: String,
      default: ''
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
    transparent: {
      type: Boolean,
      default: false
    },
    gradient: {
      type: Boolean,
      default: false
    },
    dark: {
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
    secondary: {
      type: Boolean,
      default: false
    },
    primaryDarker: {
      type: Boolean,
      default: false
    },
    primaryDarkest: {
      type: Boolean,
      default: false
    },
    primaryDark: {
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
    }
  }
}
</script>
<style lang="scss" scoped>
.button-style {
  text-decoration: none;
  text-transform: uppercase;
  font-size: 12px;
  background: var(--fut-background-darker);
  .sport-name {
    display: none;
  }
  &:hover {
    .sport-name {
      display: inline;
      color: var(--fut-primary);
    }
  }
}
.selected {
  background-image: linear-gradient(to right, var(--fut-primary), var(--fut-secondary));
  .sport-name {
    display: inline;
    color: var(--fut-background-darker);
  }
}
.count-sport {
  font-size: 10px;
}
.btn-dark{
  border: none;
  color: white;
  background: var(--fut-background-black);
  font-size: 11px;
  text-transform: uppercase;
  &:hover{
    background-image: linear-gradient(to right, var(--fut-primary), var(--fut-secondary));
    color: black;
  }
}
.btn-primary{
  border: none;
  color: black !important;
  font-size: 11px;
  text-transform: uppercase;
  background-image: linear-gradient(to right, var(--fut-primary), var(--fut-secondary));
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
button{
  box-shadow: none !important;
}
</style>
