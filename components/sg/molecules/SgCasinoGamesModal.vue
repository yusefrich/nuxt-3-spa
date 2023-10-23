<template>
  <sg-modal v-model="modalOpen" width="xl" close class="pt-0">
    <div v-if="currentGame" class="px-3 h-100">
      <h5 class="fw-bold text-white">
        {{ currentGame.name }}
      </h5>
      <iframe
        v-if="!currentGame.agregator || currentGame.agregator === '' || currentGame.agregator === 'wac' || currentGame.agregator === 'br4bet'"
        :src="currentGame.url"
        width="100%"
        style="height: calc(100% - 50px)"
        frameborder="0"
      />
      <div
        v-else-if="currentGame.agregator === 'softgaming'"
        id="egamings_container"
        class="softgaming-modal-container"
      />
      <div class="d-flex justify-content-end">
        <a :href="currentGame.url" target="_blank" class="btn text-white external-link">
          <font-awesome-icon :icon="['fas', 'external-link-alt']" />
        </a>
      </div>
    </div>
  </sg-modal>
</template>

<script>
import SgModal from '@/components/sg/atoms/SgModal'

export default {
  name: 'SgCasinoGameModal',
  components: {
    SgModal
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    currentGame: {
      type: Object,
      default: () => ({})
    },
    iframeGameUrl: {
      type: String,
      default: null
    }
  },
  emits: [
    'update:modelValue'
  ],
  computed: {
    computedCurrentGame () {
      return this.currentGame
    },
    computedIframeGameUrl () {
      return this.iframeGameUrl
    },
    modalOpen: {
      get () {
        return this.modelValue
      },
      set (value) {
        this.$emit('update:modelValue', value)

        if (!value) {
          window.history.pushState({}, '', this.$route.fullPath.split('?')[0])
        }
      }
    }
  },
  watch: {
    computedIframeGameUrl (value) {
      if (value && this.computedCurrentGame.agregator === 'softgaming') {
        console.log('current game being called', this.computedCurrentGame, this.computedIframeGameUrl)
        this.mountGameIframe(this.computedCurrentGame, this.computedIframeGameUrl)
      }
    }
  },
  methods: {
    mountGameIframe (game, url) {
      console.log('mountGameIframe', game, url)
      const request = new XMLHttpRequest()
      let isIframe = false
      let origin = ''
      try {
        isIframe = window.self !== window.top
      } catch (e) {
        isIframe = true
      }

      if (isIframe) {
        try {
          origin = window.top.origin
        } catch (e) {}
      }

      const ref = isIframe ? (origin !== '' ? origin : document.referrer.split('?')[0]) : document.location.origin
      // let checkurl = 'https://checktest1.globexdns.com/en/UserAuth/RedRakeGaming?token=6bd6d08353b88b52685764c333190492' + '&ref=' + encodeURI(ref)
      const checkurl = url + '&ref=' + encodeURI(ref)

      request.addEventListener('loadend', function () {
        if (request.status !== 200) {
          if (request.status === 403) {
            console.log('check result: ERROR (restricted)')
          } else if (request.status === 404) {
            console.log('check result: ERROR (Empty token)')
          } else {
            console.log('check result: ERROR CODE ' + request.status)
          }
          document.getElementById('egamings_container').outerHTML = ''
          alert('Restricted')
        } else {
          console.log('check result: OK')
          const resp = JSON.parse(request.responseText)
          const ifr = document.createElement('iframe')
          ifr.setAttribute('src', resp.data)
          ifr.setAttribute('width', '100%')
          ifr.setAttribute('height', '100%')
          ifr.setAttribute('frameBorder', 0)
          ifr.setAttribute('marginheight', 0)
          ifr.setAttribute('marginwidth', 0)
          ifr.setAttribute('allowFullScreen', '')
          document.getElementById('egamings_container').appendChild(ifr)
        }
      })
      request.open('GET', checkurl)
      request.send()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
