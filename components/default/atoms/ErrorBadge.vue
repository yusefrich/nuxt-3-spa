<template>
  <div class="position-relative">
    <template v-if="validate">
      <p v-for="message in validate[name]" :key="message" class="error-text mb-0 pb-1 mt-2">
        {{ message }}
      </p>
    </template>
  </div>
</template>
<script>
export default {
  name: 'ErrorBadge',
  props: {
    validate: {
      type: Object,
      default: () => ({})
    },
    name: {
      type: String,
      default: 'default'
    }
  },
  watch: {
    validate (value) {
      if (value && value[this.name]) {
        if (document.querySelector('.register-container')) {
          document.querySelector('.register-container').scrollTo({
            top: document.querySelector(`#${this.name}`).offsetTop - 190,
            behavior: 'smooth'
          })

          return
        }

        if (document.querySelector('.register-form')) {
          document.querySelector('.register-form').scrollTo({
            top: document.querySelector(`#${this.name}`).offsetTop,
            behavior: 'smooth'
          })

          return
        }

        window.scrollTo({
          top: document.querySelector(`#${this.name}`).offsetTop - 30,
          behavior: 'smooth'
        })
      }
    }
  }
}
</script>
<style scoped lang="scss">
  @import "@/assets/layout/variables";
  .error-text{
    background: #dc3546af;
    border: $danger solid 1px;
    color: white;
    padding: 2px 10px;
    border-radius: 5px;
    font-size: 12px;
  }
</style>
