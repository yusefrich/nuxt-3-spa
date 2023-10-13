<template>
  <div v-if="iframe" class="iframe-modal">
    <div class="content-modal">
      <fb-fut-button
        class="text-white btn-close-modal"
        @click="iframe = false"
      >
        <font-awesome-icon :icon="['fas', 'times']" />
      </fb-fut-button>
      <fb-fut-button
        v-if="currentGame"
        class="text-white btn-close-modal external-link"
        style="right: 40px"
        :to="iframeGameUrl"
        external
        target="_blank"
        @click="iframe = false"
      >
        <font-awesome-icon :icon="['fas', 'external-link-alt']" />
      </fb-fut-button>
      <template v-if="currentGame">
        <iframe
          v-if="!currentGame.agregator || currentGame.agregator === '' || currentGame.agregator === 'wac' || currentGame.agregator === 'br4bet'"
          :src="currentGame.url"
          height="100%"
          width="100%"
          title="Casino game"
        />
        <iframe
          v-else-if="currentGame.agregator !== 'softgaming' && cIframeGameUrl"
          :src="cIframeGameUrl"
          height="100%"
          width="100%"
          title="Casino game"
        />
        <div
          v-else-if="currentGame.agregator === 'softgaming' && !gameCode && !cTypeUrl && !cIframeHtml"
          id="egamings_container"
          class="softgaming-modal-container"
        />
        <iframe
          v-else-if="currentGame.agregator === 'softgaming' && cTypeUrl"
          id="slotFrame"
          :src="cTypeUrl"
          width="100%"
          height="100%"
          frameBorder="0"
          marginheight="0"
          marginwidth="0"
          class="egamings_game_frame"
          allow="autoplay *;fullscreen *;"
          style=""
          allowfullscreen
        />
        <iframe
          v-else-if="currentGame.agregator === 'softgaming' && cIframeHtml"
          id="slotFrame"
          :srcdoc="cIframeHtml"
          width="100%"
          height="100%"
          frameBorder="0"
          marginheight="0"
          marginwidth="0"
          class="egamings_game_frame"
          allow="autoplay *;fullscreen *;"
          style=""
          allowfullscreen
        />
        <div v-else-if="currentGame.agregator === 'softgaming' && gameCode" class="h-100" v-html="gameCode" />
        <!-- <h1 class="text-white">test</h1> -->
        <!-- <code>{{ iframeHtml }}</code> -->
        <div v-if="currentGame.agregator !== 'softgaming'" class="d-flex justify-content-end">
          <a :href="currentGame.url" target="_blank" class="btn text-white">
            <font-awesome-icon :icon="['fas', 'external-link-alt']" />
          </a>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MdCasinoGameModal',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    currentGame: {
      type: Object,
      default: () => ({})
    },
    gameCode: {
      type: String,
      default: null
    },
    iframeHtml: {
      type: String,
      default: null
    },
    typeFourUrl: {
      type: String,
      default: null
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
    cIframeGameUrl () {
      return this.iframeGameUrl
    },
    cIframeHtml () {
      return this.iframeHtml
    },
    cTypeUrl () {
      return this.typeFourUrl
    },
    iframe: {
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
    cIframeGameUrl (value) {
      if (value && this.currentGame && this.currentGame.agregator === 'softgaming') {
        this.mountGameIframe(this.currentGame, this.cIframeGameUrl)
      }
    },
    cTypeUrl (value) {
      if (value && this.currentGame && this.currentGame.agregator === 'softgaming') {
        this.mountGameIframe2()
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

          document.querySelector('.external-link').setAttribute('href', resp.data)
        }
      })
      request.open('GET', checkurl)
      request.send()
    },
    mountGameIframe2 () {
      const d = document
      const s = 'script'
      const id = 'fundist-atmosfera'
      const fjs = d.getElementsByTagName(s)[0]
      const js = d.createElement(s)
      js.id = id
      js.src = 'https://liveslots.online/js/slot.api.js'
      fjs.parentNode.insertBefore(js, fjs)
      // js.onload = startGameLoader
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/layout/breakpoints";
#egamings_container{
  height: 100%;
}
.egamings_game_frame{
  max-height: calc(100vh - 80px);
  @include md {
    max-height: calc(100vh - 180px);
  }
}
.btn-close-modal{
  position: absolute;
  top: 1px;
  right: 1px;
  border-radius: 100px;
  background: #333;
  padding: 3px 9px;
}
.iframe-modal{
  background: rgba(51, 51, 51, 0.637);
  position: fixed;
  z-index: 9999999999;
  width: 100vw;
  height: 100dvh;
  top: 0;
  left: 0;
}
.content-modal{
  background: #333;
  width: 100%;
  height: 100%;
  @include md{
    width: 90%;
    height: 90%;
    transform: translate(5%, 5%);
  }
  padding: 34px 5px 5px 5px;
  border-radius: 10px;
}
</style>
