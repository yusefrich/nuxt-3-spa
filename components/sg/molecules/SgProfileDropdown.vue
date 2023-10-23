<template>
  <transition name="fade" oppear>
    <div v-if="showProfileCard">
      <div class="menuProfileBackground" @click="showProfileCard = false" />
      <transition name="fade" oppear>
        <div v-if="showProfileCard" class="menuProfile">
          <div class="d-flex justify-content-center mt-2">
            <div class="d-flex d-md-none">
              <div class="cash-content align-items-center d-flex">
                <img class="me-2 ms-3" src="/Sg/coin.png" alt="">
                <span class="text-white me-1 fw-bold">R$</span>
                <span class="text-white fw-bold me-3">{{ user.balance }}</span>
              </div>
              <div class="deposit-content d-flex">
                <a :href="localePath('/user/bank/deposito')" class="d-flex mx-3 mb-0 align-items-center">
                  <img class="me-2" src="/Sg/wallet.png" alt="">
                  <span>{{ $t('i18n_deposito', 1).toUpperCase() }}</span>
                </a>
              </div>
            </div>
          </div>
          <div class="text-center my-2">
            <div @click="showProfileCard = false">
              <NuxtLink class="mb-0 btn-tab-menu border-green transition" :to="localePath('/user')">
                <div class="img-content">
                  <img src="/Sg/Profile-2.png" alt="">
                </div>
                <span>{{ $t('i18n_meu_perfil') }}</span>
              </NuxtLink>
            </div>
          </div>
          <div class="text-center my-2">
            <div @click="showProfileCard = false">
              <NuxtLink class="mb-0 btn-tab-menu transition" :to="localePath('/user/my-account/documentos')">
                <div class="img-content">
                  <img src="/Sg/SquareProfile.png" alt="">
                </div>
                <span>{{ $t('i18n_documentos') }}</span>
              </NuxtLink>
            </div>
          </div>
          <div class="d-flex px-md-2 px-4 mb-2 justify-content-between">
            <NuxtLink class="mb-0 btn-tab-menu me-1 transition" :to="localePath('/user/bank/saldo')">
              <div class="d-flex" @click="showProfileCard = false">
                <div class="img-content">
                  <img src="/Sg/wallet-w.png" alt="">
                </div>
                <span>{{ $t('i18n_carteira') }}</span>
              </div>
            </NuxtLink>
            <NuxtLink class="mb-0 btn-tab-menu ms-1 transition" :to="localePath('/user/bank/deposito?slug=withdraw')">
              <div class="d-flex" @click="showProfileCard = false">
                <div class="img-content">
                  <img src="/Sg/wallet-s.png" alt="">
                </div>
                <span>{{ $t('i18n_sacar') }}</span>
              </div>
            </NuxtLink>
          </div>
          <div class="text-center">
            <div @click="showProfileCard = false">
              <NuxtLink class="mb-0 btn-tab-menu transition" :to="localePath('/user/history/bets-resolvidas')">
                <div class="img-content">
                  <img src="/Sg/Dice-White.png" alt="">
                </div>
                <span>{{ $t('i18n_relatorios_de_jogo') }}</span>
              </NuxtLink>
            </div>
          </div>
          <div class="text-center">
            <div @click="showProfileCard = false">
              <a
                class="btn my-3 border-0 bg-transparent"
                :href="localePath('/logout')"
              >
                <font-awesome-icon class="text-white me-2" :icon="['fas', 'sign-out-alt']" />
                <span class="text-white fw-bold">{{ $t('i18n_sair') }}</span>
              </a>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'SgProfileDropdown',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    user: {
      type: Object,
      default: () => ({})
    }
  },
  emits: [
    'update:modelValue'
  ],
  computed: {
    showProfileCard: {
      get () {
        return this.modelValue
      },
      set (value) {
        this.$emit('update:modelValue', value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/layout/breakpoints";
.text-background {
  color: var(--fut-background);
}
.menuProfile {
  background: linear-gradient(var(--fut-background-transparent), var(--fut-background-darker));
  position: fixed;
  z-index: 2;
  top: 55px;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  @include md {
    width: 340px;
    right: 15px;
    height: auto;
  }

  .btn-tab-menu {
    color: white;
    background: var(--fut-background-black);
    text-decoration: none;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 327px;
    height: 50px;
    border-radius: 10px;
    border-width: 2px;
    border-color: var(--fut-primary);
    &:hover{
      border: 1px solid var(--fut-primary);
    }
    span {
      font-size: 15px;
      font-weight: bold;
      margin-left: 10px;
    }
  }

  .border-green {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border: 1px solid var(--fut-primary-transparent);
  }

  .btn-invite {
    text-decoration: none;
    display: inline-flex;
    background: linear-gradient(var(--fut-primary), var(--fut-secondary));
    width: 100%;
    height: 35px;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    font-size: 14px;

    span {
      color: var(--fut-background-darkest);
    }
  }

  .rank-content {
    width: 327px;
    background-color: var(--fut-background-darkest);
    height: 106px;
    border-radius: 10px;

    .width-ranked {
      width: 35%;
    }

    .width-fil-section {
      width: 65%;
    }

    .fs-13 {
      font-size: 13px;
    }

    .border-fil {
      height: 11px;
      width: 100%;
      background-color: var(--fut-background-lightest);
      border-radius: 5px;

      .fil {
        width: 10%;
        height: 11px;
        background-color: var(--fut-primary);
        border-radius: 5px;
      }
    }
  }
}
.cash-content {
  border-top: 1px solid var(--fut-primary);
  border-bottom: 1px solid var(--fut-primary);
  border-left: 1px solid var(--fut-primary);
  height: 40px;
  font-size: 14px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
.deposit-content {
  border-top-right-radius: 5px;
  height: 40px;
  border-bottom-right-radius: 5px;
  background: linear-gradient(var(--fut-primary), var(--fut-secondary));

  a {
    color: black;
    text-decoration: none;
    font-weight: bold;
    font-size: 14px;
  }
}
.menuProfileBackground {
  background: black;
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  opacity: .1;
}
</style>
