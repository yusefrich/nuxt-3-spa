<template>
  <div id="sk-home">
    <div class="sk-home-banner">
      <div
        class="banner-wrapper container"
        style="background-image: url(/Sk/bg-banner-home.svg);"
      >
        <div class="authenticate-wrapper" :class="{ 'mobile-authenticate-wrapper': isMobile }">
          <div v-if="loggedInUser">
            <h1 class="title">
              {{ $t('i18n_bem_vindo_a') }} {{ loggedInUser.username || loggedInUser.name }}
            </h1>
            <md-progress-bar
              :rollover="loggedInUser.bonus"
              color="#fff"
              hide-btn
              @cancelUserBonus="cancelUserBonus()"
            />
          </div>
          <div v-else>
            <h1 class="title">
              {{ $t('i18n_jogue_com_inteligencia') }}
            </h1>
            <button
              class="transition"
              :class="{ 'w-100': isMobile }"
              @click="modalRegister = true"
            >
              <span>{{ $t('i18n_registre_se_instantaneamente') }}</span>
            </button>
          </div>
        </div>
        <div
          v-if="!isMobile"
          class="banner-img"
        >
          <img
            src="/Sk/stake-banner.avif"
          >
        </div>
      </div>
    </div>

    <div class="container">
      <div class="sk-product-cards">
        <div
          v-for="(item, idx) in productCards"
          :key="idx"
          class="sk-card text-white"
        >
          <n-link :to="localePath(item.to)" class="link">
            <h1>
              <font-awesome-icon class="icon transition" :icon="item.icon" />
              <span>{{ item.title }}</span>
            </h1>
          </n-link>
          <!-- <img :src="item.img"> -->
          <sk-carousel
            :items="item.slides"
            full-width
            is-mobile
            class="slider transition"
            :name="`${idx}`"
          />
          <n-link :to="localePath(item.to)" class="link">
            <div class="infos">
              <h2>
                {{ item.subtitle }}
              </h2>
              <p>
                {{ item.desc }}
              </p>
            </div>
          </n-link>
          <n-link :to="localePath(item.to)" class="card-btn link transition">
            <span>{{ item.btnText }}</span>
          </n-link>
        </div>
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
import { mapGetters, mapActions } from 'vuex'
import windowWidth from '~/mixins.js/windowWidth'

export default {
  name: 'SkHome',
  mixins: [windowWidth],
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
      }
    }
  },
  computed: {
    ...mapGetters({
      loggedInUser: 'loggedInUser',
      currentSlides: 'settings/currentSlides',
      currentSettings: 'settings/currentSettings',
      getCasinoSliders: 'metadata-casino/getCasinoSliders',
      getOnboardingAuthErrors: 'onboarding-auth/getOnboardingAuthErrors',
      getOnboardingAuthLoading: 'onboarding-auth/getOnboardingAuthLoading',
      getOnboardingAuthAddress: 'onboarding-auth/getOnboardingAuthAddress'
    }),
    sportsSlides () {
      if (!this.currentSlides) {
        return null
      }

      if (Array.isArray(this.currentSlides)) {
        return this.currentSlides.map(slide => ({
          img: this.width > 768 ? slide.img : slide.img_mobile,
          link: slide.link
        }))
      }

      return Object.values(this.currentSlides).map(slide => ({
        img: this.width > 768 ? slide.img : slide.img_mobile,
        link: slide.link
      }))
    },
    casinoSlides () {
      const emptyArr = []

      if (this.getCasinoSliders !== null) {
        return this.width > 768
          ? this.getCasinoSliders.slides
          : this.getCasinoSliders.slides_mobile
            ? this.getCasinoSliders.slides_mobile
            : emptyArr
      }

      return emptyArr
    },
    productCards () {
      return [
        {
          title: this.$t('i18n_cassino'),
          icon: ['fas', 'dice'],
          img: '/Sk/casino-banner.avif',
          subtitle: this.$t('i18n_lider_entre_os_cassinos'),
          desc: this.$t('i18n_navegue_pela_nossa_enorme'),
          btnText: this.$t('i18n_ir_para_o_cassino'),
          to: '/casino',
          slides: this.casinoSlides
        },
        {
          title: this.$tc('i18n_esporte', 2),
          icon: ['fas', 'basketball-ball'],
          img: '/Sk/sports-banner.avif',
          subtitle: this.$t('i18n_melhores_apostas_esportivas'),
          desc: this.$t('i18n_aposte_em_seus_times'),
          btnText: this.$t('i18n_ir_para_as_apostas'),
          to: '/sports?tab=SkLobby',
          slides: this.sportsSlides
        }
      ]
    },
    isMobile () {
      return this.width <= 821
    }
  },
  created () {
    this.fetchSliders()
    this.fetchCasinoSliders()
  },
  methods: {
    ...mapActions({
      login: 'login',
      authUser: 'authUser',
      fetchSliders: 'settings/fetchSliders',
      fetchLegalTerms: 'legal/fetchLegalTerms',
      registerUser: 'onboarding-auth/registerUser',
      updatePopupStatus: 'layout/updatePopupStatus',
      validateUserCpf: 'onboarding-auth/validateUserCpf',
      fetchCasinoSliders: 'metadata-casino/fetchCasinoSliders',
      sendCancelUserBonus: 'onboarding-auth/sendCancelUserBonus',
      sendForgottenPasswordEmail: 'onboarding-auth/sendForgottenPasswordEmail'
    }),
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
    },
    sendEmail (email) {
      this.sendForgottenPasswordEmail(email).then(() => {
        this.modalForgot = false
      })
    },
    cancelUserBonus () {
      this.sendCancelUserBonus({
        bonus: true
      }).then(() => {
        window.location.reload()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#sk-home {
  width: 100%;
  overflow-x: hidden;

  .sk-home-banner {
    background: var(--fut-background-darkest);

    .banner-wrapper {
      position: relative;
      background: transparent;
      padding: 0 3vw;
      display: flex;
      justify-content: space-between;
      background-repeat: no-repeat;
      background-size: contain;
      background-position-x: 87%;

      .authenticate-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 40%;

        .title {
          color: var(--fut-color-dynamic);
          font-weight: 700;
          font-size: 1.25rem;
          margin-bottom: 20px;
        }
        button {
          background: var(--fut-primary);
          border: none;
          color: var(--fut-color-dynamic);
          font-weight: 600;
          font-size: .875rem;
          padding: 10.5px 14px;
          border-radius: 30px;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .2), 0 1px 2px 0 rgba(0, 0, 0, .12);

          span {
            white-space: nowrap;
          }

          &:hover {
            background: var(--fut-primary-darker);
          }
          &:active {
            span {
              display: flex;
              align-items: center;
              justify-content: center;
              transform: scale(.95);
            }
          }
        }
      }
      .mobile-authenticate-wrapper {
        width: 100%;
        height: 215px;
      }
      .banner-img {
        width: 50%;

        img {
          width: 100%;
          opacity: 0;
        }
      }
    }
  }

  .sk-product-cards {
    display: grid;
    grid-gap: 2rem;
    grid-template-columns: repeat(2,1fr);
    margin-top: 24px;

    .sk-card {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .link {
        text-decoration: none;
        color: var(--fut-color-dynamic);
      }

      h1 {
        display: flex;
        align-items: center;
        margin: 0;
        line-height: 70%;

        .icon {
          color: var(--fut-secondary);
          width: 20px;
          height: 20px;
        }
        span {
          margin-left: 8px;
          font-size: 1.125rem;
          font-weight: 600;
        }
        &:hover {
          .icon {
            color: var(--fut-color-dynamic);
          }
        }
      }

      img {
        width: 100%;
        object-fit: contain;
        border-radius: 4px;
        margin: 0;
        transition: all ease-in-out 200ms;
      }

      .infos {
        display: flex;
        flex-direction: column;
        flex-grow: 1;

        h2 {
          color: var(--fut-color-dynamic);
          font-size: 1rem;
          font-weight: 700;
          line-height: 1.5;
        }

        p {
          color: var(--fut-secondary);
          font-size: .875rem;
          font-weight: 400;
          margin: 0;
        }
      }

      .card-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--fut-color-dynamic);
        font-weight: 600;
        background: var(--fut-primary);
        border-radius: .25rem;
        padding: .75em 0;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .2), 0 1px 2px 0 rgba(0, 0, 0, .12);

        &:hover {
          background: var(--fut-primary-darker);
        }
        &:active {
          span {
            display: flex;
            align-items: center;
            justify-content: center;
            transform: scale(.95);
          }
        }
      }

      &:hover {
        img, .slider {
          margin: -4px 0 4px 0;
        }
      }
    }
  }
}

.container {
  padding: 0 3vw !important;
}

@media (max-width: 821px) {
  .sk-product-cards {
    grid-template-columns: 100% !important;
  }
}
</style>
