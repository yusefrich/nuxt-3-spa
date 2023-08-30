<template>
  <div class="container">
    <div class="personal-header">
      <h1>
        <font-awesome-icon class="icon" :icon="['fas', 'cog']" />
        <span>{{ $t('i18n_configuracoes') }}</span>
      </h1>
      <button @click="$router.go(-1)">
        <font-awesome-icon class="icon transition" :icon="['fas', 'times']" />
      </button>
    </div>

    <div class="personal-body">
      <sk-settings-nav
        :items="navItems"
        :selected="currentTab"
        @changeTab="changTab($event)"
      />

      <sk-personal-data
        v-if="currentTab === 'geral'"
        :logged-in-user="loggedInUser"
        @submit="updateData($event)"
      />
      <sk-documents
        v-else-if="currentTab === 'documentos'"
      />
      <sk-address
        v-else-if="currentTab === 'endereco'"
        :logged-in-user="loggedInUser"
        :fetched-address="fetched"
        @searchAddress="searchAddress($event)"
        @submit="updateData($event)"
      />
      <sk-password
        v-else-if="currentTab === 'senha'"
        :errors="getOnboardingAuthErrors"
        @submit="updatePassword($event)"
        @cleanErrors="cleanBankErrors()"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import SkSettingsNav from '@/components/sk/organisms/SkSettingsNav.vue'
import SkPersonalData from '@/components/sk/organisms/SkPersonalData.vue'
import SkDocuments from '@/components/sk/organisms/SkDocuments.vue'
import SkAddress from '@/components/sk/organisms/SkAddress.vue'
import SkPassword from '@/components/sk/organisms/SkPassword.vue'

export default {
  name: 'SkSettings',
  components: {
    SkSettingsNav,
    SkPersonalData,
    SkDocuments,
    SkAddress,
    SkPassword
  },
  data () {
    return {
      currentTab: '',
      fetched: {
        street: '',
        neighborhood: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      loggedInUser: 'loggedInUser',
      getOnboardingAuthErrors: 'onboarding-auth/getOnboardingAuthErrors'
    }),
    navItems () {
      return [
        { text: this.$t('i18n_geral'), link: '/user/my-account/dados?tab=geral', tab: 'geral' },
        { text: this.$t('i18n_documentos'), link: '/user/my-account/dados?tab=documentos', tab: 'documentos' },
        { text: this.$t('i18n_endereco'), link: '/user/my-account/dados?tab=endereco', tab: 'endereco' },
        { text: this.$t('i18n_senha'), link: '/user/my-account/dados?tab=senha', tab: 'senha' }
      ]
    }
  },
  created () {
    this.currentTab = this.$route.query.tab || 'geral'
  },
  methods: {
    ...mapActions({
      updateUserData: 'onboarding-auth/updateUserData',
      fetchAddressData: 'onboarding-auth/fetchAddressData',
      updateUserPassword: 'onboarding-auth/updateUserPassword'
    }),
    changTab (tab) {
      this.$router.replace({ query: { tab } })
      this.currentTab = tab
    },
    updateData (data) {
      this.updateUserData(data)
    },
    updatePassword (data) {
      this.updateUserPassword(data)
    },
    searchAddress (cep) {
      if (!cep) {
        this.$toast.open({ message: 'Digite um cep válido!', type: 'warning' })
        return
      }

      this.fetchAddressData(cep).then((data) => {
        this.fetched.street = data.logradouro
        this.fetched.neighborhood = data.bairro
      })
    },
    cleanBankErrors () {
      this.$store.commit('onboarding-auth/SET_ERRORS', null)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 24px 3vw 0 3vw !important;

  .personal-header {
    display: flex;
    justify-content: space-between;
    color: var(--fut-color-dynamic);
    margin-bottom: 24px;

    h1 {
      font-weight: 700;
      font-size: 1.125rem;
      display: flex;
      align-items: center;
      margin: 0;

      .icon {
        color: var(--fut-secondary);
        margin-right: 8px;
      }
    }
    button {
      border: none;
      background: transparent;

      .icon {
        color: var(--fut-secondary);
      }
      &:hover {
        .icon {
          color: var(--fut-color-dynamic);
        }
      }
      &:active {
        .icon {
          transform: scale(.90);
        }
      }
    }
  }

  .personal-body {
    display: grid;
    grid-template-columns: auto 1fr;
    position: relative;
    gap: 1.5rem;
    align-items: flex-start;
  }
}

@media (max-width: 821px) {
  .personal-body {
    grid-auto-flow: row;
    grid-template-columns: none !important;
  }
}
</style>
