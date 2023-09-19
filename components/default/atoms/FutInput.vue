<template>
  <div :id="name" class="position-relative">
    <template v-if="validate && !nsxValidation">
      <p v-for="message in validate[name]" :key="message" class="error-text mb-0 pb-1">
        {{ message }}
      </p>
    </template>
    <div
      :style="nsxIconSpacing?'margin-left: '+nsxIconSpacing:''"
      :class="[
        'h-100', 'd-flex',
        (validate && validate[name])?'error':'',
        nsxValidation?'nsx-validation':'',
        modelValue?'success':'',
        nsxIcon?'nsx-icon-spacing':''
      ]"
    >
      <label v-if="label || labelGuide" class="d-flex justify-content-between">
        <span v-if="label" class="p-2">{{ label }}</span>
        <span v-if="labelGuide" class="p-2 bg-primary">{{ labelGuide }}</span>
      </label>
      <div v-if="nsxIcon" class="nsx-icon">
        <font-awesome-icon :icon="['fas', nsxIcon]" />
      </div>
      <div v-if="nsxPrefix" class="nsx-icon">
        <span>{{ nsxPrefix }}</span>
      </div>
      <div
        :class="[
          'p-0',
          'd-flex',
          rounded?'input-rounded':'input-flat',
          'input-light',
          dark?'input-dark':'',
          primary?'input-primary':'',
          secondary?'input-secondary':'',
          darker?'input-darker':'',
          gray?'input-gray':'',
          'form-control',
          nsxInput?'input-nsxGray':'',
          noFocus?'no-focus':''
        ]"
      >
        <font-awesome-icon v-if="icon === 'search'" :icon="['fas', 'search']" :class="{'text-white': iconWhite}" class="icon" />
        <font-awesome-icon v-if="icon === 'searching'" :icon="['fas', 'circle-notch']" class="icon spin" />
        <input
          :disabled="disabled"
          :placeholder="placeholder"
          :readonly="readonly"
          :type="type"
          :value="modelValue"
          :required="required"
          :class="['form-control', 'input-transparent', 'border-none', fontSm?'font-smaller':'', 'fut-color-dynamic']"
          @keyup.enter="$emit('enter')"
          @focus="$emit('focus')"
          @blur="$emit('blur', $event.target.value)"
          @input="$emit('update:modelValue', $event.target.value)"
          >
          <!-- @input="$emit('input', $event.target.value)" -->
      </div>
    </div>
    <template v-if="validate && nsxValidation">
      <p v-for="message in validate[name]" :key="message" class="nsx-error-text mb-0 pb-1">
        {{ message }}
      </p>
    </template>
    <small v-if="info" :class="{'nsx-smaller': nsxInput, 'fut-color-dynamic': true}">{{ info }}</small>
  </div>
</template>

<script>
export default {
  name: 'FutInput',
  props: {
    validate: {
      type: Object,
      default: () => ({})
    },
    name: {
      type: String,
      default: 'default'
    },
    info: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    iconWhite: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    noFocus: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    gray: {
      type: Boolean,
      default: false
    },
    darker: {
      type: Boolean,
      default: false
    },
    nsxInput: {
      type: Boolean,
      default: false
    },
    fontSm: {
      type: Boolean,
      default: false
    },
    nsxPrefix: {
      type: String,
      default: null
    },
    nsxText: {
      type: String,
      default: null
    },
    nsxIcon: {
      type: String,
      default: null
    },
    nsxIconSpacing: {
      type: String,
      default: null
    },
    nsxValidation: {
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
    rounded: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    labelGuide: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      require: true,
      default: 'text'
    },
    required: {
      type: Boolean
    },
    modelValue: {
      type: String,
      default: ''
    },
    disableScroll: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    validate (value) {
      if (value && value[this.name] && !this.disableScroll) {
        if (this.$route.path === '/') {
          document.querySelector('.fm-content-body').scrollTo({
            top: document.querySelector(`#${this.name}`).offsetTop - 50,
            behavior: 'smooth'
          })
          return
        }
        window.scrollTo({
          top: document.querySelector(`#${this.name}`).offsetTop,
          behavior: 'smooth'
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "@/assets/layout/variables";
  .form-control{
    background-color: var(--fut-background-lighter);
    color: var(--fut-primary);
  }
  .nsx-validation{
    border-left: 6px solid #a94442;
    border-radius: 5px;
    overflow: hidden;
  }
  .nsx-validation.success{
    border-left: 6px solid green;
  }
  .nsx-validation.error{
    border-left: 6px solid red !important;
    border-bottom: 0px !important;
    border-top: 0px !important;
    border-right: 0px !important;
  }
  .form-control:disabled{
    opacity: 0.5;
  }
  .icon{
    align-self: center;
    margin-left: 10px;
  }
  .input-transparent{
    background: transparent;
    &::placeholder{
      color: rgba(255, 255, 255, 0.582);
    }
  }
  label{
    background: var(--fut-background-lightest);
    color: $white;
    max-width: 200px;
    width: 100%;
  }
  input{
    border-radius: 0;
    border: 1px solid transparent;
    outline: none !important;
    box-shadow: none !important;
  }
  .input-dark{
    color: var(--fut-primary);
    background-color: var(--fut-background-darkest) !important;
    border:1px solid var(--fut-background-darkest) !important;
    color: var(--fut-primary);
    padding: 0;
    input::placeholder{
      color: var(--fut-background-lightest);
    }
    input{
      color: var(--fut-primary);
    }
    input:focus{
      color: var(--fut-primary);
    }
  }
  .input-primary{
    color: var(--fut-secondary);
    background-color: var(--fut-primary-darkest) !important;
    border:1px solid var(--fut-primary-darkest) !important;
    color: var(--fut-secondary);
    padding: 0;
    input::placeholder{
      color: var(--fut-primary-lightest);
    }
    input{
      color: var(--fut-secondary);
    }
    input:focus{
      color: var(--fut-secondary);
    }
  }
  .input-secondary{
    color: var(--fut-primary);
    background-color: var(--fut-secondary-darkest) !important;
    border:1px solid var(--fut-secondary-darkest) !important;
    color: var(--fut-primary);
    padding: 0;
    input::placeholder{
      color: var(--fut-secondary-lightest);
    }
    input{
      color: var(--fut-primary);
    }
    input:focus{
      color: var(--fut-primary);
    }
  }
  .input-darker{
    color: var(--fut-primary);
    background-color: var(--nsx-dark-2) !important;
    border:1px solid var(--nsx-dark-2) !important;
    color: var(--nsx-gray-1);
    padding: 0;
    input{
      color: var(--nsx-gray-1);
    }
    input:focus{
      color: var(--nsx-gray-1);
    }
  }
  .input-darker input::placeholder{
    color: var(--nsx-gray-1);
  }
  .input-gray{
    background-color: var(--fut-background-lightest) !important;
    border:1px solid var(--fut-background-lightest) !important;
    color: $white;
    padding: 0;
    input{
      color: var(--fut-primary);
    }
    input:focus{
      color: var(--fut-primary);
    }
  }
  .input-nsxGray{
    background-color: #dbdbdb !important;
    border: 1px solid var(--nsx-gray-1) !important;
    padding: 0;
    input{
      font-size: 13px !important;
      padding: 4px 5px;
      color: #1d1d1d !important;
    }
    input::placeholder{
      color: #666666;
    }
    input:focus{
      color: var(--fut-primary);
    }
  }
  .input-rounded{
    border-radius: 7px;
    border: 0 !important;
      input:focus{
        border: 1px solid var(--fut-primary);
        border-radius: 7px;
      }
  }
  .input-flat{
    border-radius: 0px;
    border: 0 !important;
    input:focus{
      border: 1px solid var(--fut-primary);
      border-radius: 0px;
    }
  }
  .error{
    border: 2px solid $danger !important;
  }
  .nsx-error-text{
    background: #f8d7da;
    border: 1px solid #f5c6cb;
    color: #83373e;
    padding: 5px;
    border-radius: 5px;
    margin-top: 5px;
  }
  .error-text{
    background: $danger;
    color: white;
    padding: 5px;
  }
  .nsx-icon{
    background-color: #d2d2d2;
    position: absolute;
    left: 0;
    padding: 1px 6px;
    border-radius: 3px;
  }
  .nsx-icon-spacing{
    margin-left: 28px;
  }
  .nsx-smaller{
    font-size: 12px;
    display: block;
    line-height: 15px;
  }
  .font-smaller{
    font-size: 13px;
  }
  .no-focus{
    input:focus{
      border: none !important;
    }
  }
  .spin{
    animation-name: spin;
    animation-duration: 2000ms;
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
</style>
