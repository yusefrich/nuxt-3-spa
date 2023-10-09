<template>
  <div class="container">
    <div class="sk-single-game">
      <div v-if="iframe" class="game-wrapper">
        <iframe
          v-if="!agregator || checkAgregator"
          :src="link"
          height="100%"
          width="100%"
          title="Casino game"
        />
        <div v-else-if="agregator === 'softgaming'" id="egamings_container" class="softgaming-modal-container" />
      </div>
    </div>

    <sk-modal-login
      v-model="modalLogin"
      @login="logUser($event)"
      @forgotPassword="modalLogin = false, modalForgot = true"
      @register="modalLogin = false, modalRegister = true"
    />

    <sk-modal-forgot-password
      v-model="modalForgot"
      :errors="getOnboardingAuthErrors"
      @sendForgottenPasswordEmail="sendEmail($event)"
    />

    <sk-modal-register
      v-model="modalRegister"
      :loading="getOnboardingAuthLoading"
      :current-settings="currentSettings"
      :valid-cpf="validCpf"
      :fetched-infos="registerInfos"
      :fetched-date="registerDate"
      :errors="getOnboardingAuthErrors"
      @modalLogin="modalLogin = true"
      @validateCpf="validateCpf($event)"
      @register="register($event)"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useBaseStore } from '@/stores/base'
import { useCasinoStore } from '@/stores/casino'
import { useLayoutStore } from '@/stores/layout'
import { useSettingsStore } from '@/stores/settings'
import { useOnboardingAuthStore } from '@/stores/onboarding-auth'

import SkModalLogin from '@/components/sk/molecules/SkModalLogin'
import SkModalRegister from '@/components/sk/molecules/SkModalRegister'
import SkModalForgotPassword from '@/components/sk/molecules/SkModalForgotPassword'

export default {
  name: 'SkSingleGame',
  components: {
    SkModalLogin,
    SkModalRegister,
    SkModalForgotPassword
  },
  data () {
    return {
      modalRegister: false,
      modalLogin: false,
      modalForgot: false,
      validCpf: false,
      registerInfos: {
        document: '',
        name: '',
        last_name: ''
      },
      registerDate: {
        day: null,
        month: null,
        year: null
      },
      agregator: null,
      iframe: false,
      link: null
    }
  },
  computed: {
    ...mapState(useBaseStore, {
      loggedInUser: 'loggedInUser',
    }),
    ...mapState(useSettingsStore, {
      currentSettings: 'currentSettings'
    }),
    ...mapState(useOnboardingAuthStore, {
      getOnboardingAuthErrors: 'getOnboardingAuthErrors',
      getOnboardingAuthLoading: 'getOnboardingAuthLoading'
    }),
    checkAgregator () {
      return ['', 'wac', 'br4bet', 'banana-live', 'banana', 'fds'].includes(this.agregator)
    }
  },
  created () {
    this.fetchCasinoSingleGame(this.$route.params.gameId).then((res) => {
      console.log('uai:', res)
      this.openGame(res)
    })
  },
  methods: {
    ...mapActions(useBaseStore, {
      login: 'login',
      authUser: 'authUser'
    }),
    ...mapActions(useLayoutStore, {
      updatePopupStatus: 'updatePopupStatus'
    }),
    ...mapActions(useOnboardingAuthStore, {
      registerUser: 'registerUser',
      validateUserCpf: 'validateUserCpf',
      sendForgottenPasswordEmail: 'sendForgottenPasswordEmail'
    }),
    ...mapActions(useCasinoStore, {
      fetchCasinoSingleGame: 'fetchCasinoSingleGame',
      fetchCasinoFdsIframeUrl: 'fetchCasinoFdsIframeUrl',
      fetchCasinoGameIframeUrl: 'fetchCasinoGameIframeUrl',
      fetchCasinoBananaIframeUrl: 'fetchCasinoBananaIframeUrl',
      fetchCasinoBananaLiveIframeUrl: 'fetchCasinoBananaLiveIframeUrl'
    }),
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
    },
    openGame (game) {
      this.agregator = game.agregator

      if (this.agregator === 'softgaming') {
        if (!this.loggedInUser) {
          this.modalLogin = true
          return
        }

        this.iframe = true

        this.fetchCasinoGameIframeUrl({ game_id: game.id }).then((result) => {
          const searchURL = new URL(window.location)

          searchURL.searchParams.set('gameid', game.id)
          window.history.pushState({}, '', searchURL)
          this.mountGameIframe(game, result.url)
        }).catch((err) => {
          // eslint-disable-next-line
          console.error('casino new url fetching error', err)
          this.iframe = false
        })
      } else if (this.agregator === 'banana-live') {
        this.iframe = true

        this.fetchCasinoBananaLiveIframeUrl({ game_id: game.id }).then((result) => {
          this.link = result.url
          const searchURL = new URL(window.location)

          searchURL.searchParams.set('gameid', game.id)
          window.history.pushState({}, '', searchURL)
          // this.mountGameIframe(game, result.url)
        }).catch((err) => {
          // eslint-disable-next-line
          console.error('casino new url fetching error', err)
          this.iframe = false
        })
      } else if (this.agregator === 'banana') {
        this.iframe = true

        this.fetchCasinoBananaIframeUrl({ game_id: game.id }).then((result) => {
          this.link = result.url
          const searchURL = new URL(window.location)

          searchURL.searchParams.set('gameid', game.id)
          window.history.pushState({}, '', searchURL)
          // this.mountGameIframe(game, result.url)
        }).catch((err) => {
          console.error('casino new url fetching error', err)
          this.iframe = false
        })
      } else if (this.agregator === 'fds') {
        this.iframe = true

        this.fetchCasinoFdsIframeUrl({ game_id: game.id }).then((result) => {
          this.link = result.url
          const searchURL = new URL(window.location)

          searchURL.searchParams.set('gameid', game.id)
          window.history.pushState({}, '', searchURL)
          // this.mountGameIframe(game, result.url)
        }).catch((err) => {
          // eslint-disable-next-line
          console.error('casino new url fetching error', err)
          this.iframe = false
        })
      } else {
        this.link = game.url
        this.iframe = true
        const searchURL = new URL(window.location)

        searchURL.searchParams.set('gameid', game.id)
        window.history.pushState({}, '', searchURL)
      }
    },
    async logUser (infos) {
      await this.login(infos)

      this.authUser().then(() => {
        if (this.$route.query.from) {
          this.$router.push(this.localePath(this.$route.query.from))

          return
        }

        this.modalLogin = false
      })
    },
    sendEmail (email) {
      this.sendForgottenPasswordEmail(email).then(() => {
        this.modalForgot = false
      })
    },
    validateCpf (doc) {
      this.validateUserCpf(doc).then((result) => {
        this.$toast.open({ message: 'CPF validado com sucesso', type: 'success' })
        this.registerDate.day = new Date(result.Result.DataNascimento).getDate() + ''
        this.registerDate.month = new Date(result.Result.DataNascimento).getMonth() + 1
        this.registerDate.year = new Date(result.Result.DataNascimento).getFullYear() + ''
        this.registerInfos.document = doc
        this.registerInfos.name = result.Result.NomePessoaFisica.split(' ')[0]
        this.registerInfos.last_name = result.Result.NomePessoaFisica.replace(result.Result.NomePessoaFisica.split(' ')[0], '')
        this.registerInfos.birthdate = `${this.date.day}/${this.date.month}/${this.date.year}`
        this.validCpf = true
      })
    },
    register (infos) {
      this.registerUser(infos).then((result) => {
        localStorage.setItem('token', 'bearer ' + result.data)
        // check if has poopup
        this.updatePopupStatus(true)
        this.modalRegister = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 34px 3vw 0 3vw !important;

  .sk-single-game {
    .game-wrapper {
      width: 100%;
      height: 80vh;
      padding: 0;
      border-radius: 10px;
      overflow: hidden;
    }
  }
}
</style>
