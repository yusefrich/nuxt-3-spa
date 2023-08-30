<template>
  <button
    v-if="hasIntercom"
    class="intercom-btn transition"
    :style="`
      bottom: ${bottomPosition};
    `"
    @click="toggleIntercom()"
  >
    <img src="/intercom-icon.svg">
  </button>
</template>

<script>
export default {
  name: 'IntercomChatBtn',
  props: {
    bottomPosition: {
      type: String,
      default: '20px'
    }
  },
  data () {
    return {
      intercom: false
    }
  },
  computed: {
    hasIntercom () {
      return !!process.env.INTERCOMCHAT
    }
  },
  mounted () {
    if (!this.hasIntercom) {
      return
    }

    this.$intercom('boot', {
      app_id: process.env.INTERCOMCHAT
    })

    this.$intercom('onHide', () => {
      this.intercom = false
    })
  },
  methods: {
    toggleIntercom () {
      this.intercom = !this.intercom

      if (this.intercom) {
        this.$intercom('show')
      } else {
        this.$intercom('hide')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.intercom-btn {
  position: fixed;
  right: 20px;
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 50%;
  background: rgb(0, 113, 178);

  &:hover {
    transform: scale(1.1);
  }
  &:active {
    transform: scale(.70);
  }
}
</style>
