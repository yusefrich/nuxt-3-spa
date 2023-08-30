<template>
  <div>
    <template v-if="validate">
      <p v-for="message in validate[name]" :key="message" class="error-text mb-0 pb-1">
        {{ message }}
      </p>
    </template>
    <div :class="['d-flex', (validate && validate[name])?'error':'']">
      <div class="row w-100 m-0">
        <slot />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    validate: {
      type: Object,
      default: () => ({})
    },
    name: {
      type: String,
      default: 'default'
    },
    rows: {
      type: String,
      default: '12'
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
  }
}
</script>
<style scoped lang="scss">
  @import "@/assets/layout/variables";
  .input-transparent{
    background: transparent;
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
    background-color: $black !important;
    border:1px solid $black !important;
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
  .error-text{
    background: $danger;
    color: white;
    padding: 5px;
  }

</style>
