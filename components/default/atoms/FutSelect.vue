<template>
  <div class="position-relative">
    <template v-if="validate && !nsxValidation">
      <p v-for="message in validate[name]" :key="message" class="error-text mb-0 pb-1">
        {{ message }}
      </p>
    </template>
    <div :class="['d-flex', value?'success':'', (validate && validate[name])?'error':'', nsxValidation?'nsx-validation':'']">
      <label v-if="label"> {{ label }}</label>
      <div
        :class="[
          'p-0',
          'd-flex',
          rounded?'input-rounded':'input-flat',
          'input-light',
          dark?'input-dark':'',
          gray?'input-gray':'',
          nsxInput?'input-nsx':'',
          value === '' || !value ? 'placeholder-color' : '',
          'form-control'
        ]"
        :style="customStyle"
      >
        <font-awesome-icon v-if="icon === 'search'" :icon="['fas', 'search']" class="text-primary icon" />
        <select
          :disabled="disabled"
          :readonly="readonly"
          :value="value"
          :style="customStyle"
          :class="['form-select', 'border-none', nsxInput?'select-nsx':'', value === '' || !value ? 'placeholder-color' : '']"
          @input="$emit('input', $event.target.value)"
        >
          <option :value="''" selected disabled>
            {{ placeholder }}
          </option>
          <option v-for="(option, index) in options" :key="index+'_'+option.value+'_'+name" class="text-dark" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>
    </div>
    <template v-if="validate && nsxValidation">
      <p v-for="message in validate[name]" :key="message" class="nsx-error-text mb-0 pb-1">
        {{ message }}
      </p>
    </template>
    <small v-if="info" :class="{'nsx-smaller': nsxInput}">{{ info }}</small>
  </div>
</template>

<script>
export default {
  props: {
    validate: {
      type: Object,
      default: () => ({})
    },
    options: {
      type: Array,
      default: () => ([])
    },
    name: {
      type: String,
      default: 'default'
    },
    customStyle: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: ''
    },
    info: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    nsxValidation: {
      type: Boolean,
      default: false
    },
    gray: {
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
    nsxInput: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    }
  },
  emits: [
    'input'
  ]
}
</script>

<style scoped lang="scss">
  @import "@/assets/layout/variables";
  .form-select, .form-control{
    background-color: var(--fut-background-lighter);
    color: var(--fut-primary);
    border: none;
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
  select:disabled{
    opacity: 0.5;
  }
  .icon{
    align-self: center;
    margin-left: 10px;
  }
  label{
    background: var(--fut-background-lightest);
    padding-left: 10px;
    padding-right: 10px;
    color: $white;
    padding-top: 6px;
    max-width: 200px;
    width: 100%;
  }
  input{
    border-radius: 0;
    border: 1px solid transparent;
    outline: none !important;
    box-shadow: none !important;
  }
  input:focus{
    border: 1px solid var(--fut-primary);
    border-radius: 7px;
  }
  .input-dark{
    color: var(--fut-primary);
    background-color: var(--fut-background-darkest) !important;
    border:1px solid var(--fut-background-darkest) !important;
    color: var(--fut-primary);
    padding: 0;
    input{
      color: var(--fut-primary);
    }
    input:focus{
      color: var(--fut-primary);
    }
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
  .input-rounded{
    border-radius: 7px;
  }
  .input-flat{
    border-radius: 0px;
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
  .input-nsx{
    background-color: #dbdbdb !important;
    border-radius: 5px;
  }
  .select-nsx{
    background-color: #dbdbdb !important;
    color: #333333;
    height: 26px;
    padding: 0 5px;
    border: none;
  }
  select[readonly] {
    pointer-events: none;
    touch-action: none;
  }
  .placeholder-color {
    color: #8a8a8a !important;
  }
</style>
