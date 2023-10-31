<template>
  <button
    v-if="hasIntercom"
    class="intercom-btn transition"
    :style="`
      bottom: ${bottomPosition};
    `"
    @click="openIntercom()"
  >
    <img src="/intercom-icon.svg">
  </button>
</template>

<script>
const config = useRuntimeConfig()

export default {
  name: 'IntercomChatBtn',
  props: {
    bottomPosition: {
      type: String,
      default: '20px'
    }
  },
  computed: {
    hasIntercom () {
      return !!config.public.INTERCOMCHAT
    }
  },
  mounted () {
    if (!this.hasIntercom) {
      return
    }

    window.intercomSettings = { 
      hide_default_launcher: true
    }

    window.Intercom('boot', {
      app_id: config.public.INTERCOMCHAT,
    });
  },
  methods: {
    openIntercom () {
      window.Intercom('show')
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
