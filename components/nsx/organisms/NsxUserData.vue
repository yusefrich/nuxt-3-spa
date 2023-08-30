<template>
  <div>
    <div class="overflow-auto">
      <div class="data-header d-flex w-100">
        <nsx-fut-button class="nsx-button me-2 nowrap" :class="{active: currentMenu === 0}" @click="currentMenu = 0">
          {{ $t('i18n_meus_dados') }}
        </nsx-fut-button>
        <nsx-fut-button class="nsx-button me-2 nowrap" :class="{active: currentMenu === 1}" @click="currentMenu = 1">
          {{ $t('i18n_alterar_dados') }}
        </nsx-fut-button>
        <nsx-fut-button class="nsx-button me-2 nowrap" :class="{active: currentMenu === 2}" @click="currentMenu = 2">
          {{ $t('i18n_alterar_senha') }}
        </nsx-fut-button>
        <nsx-fut-button to="/logout" class="nsx-button me-2">
          {{ $t('i18n_sair') }}
        </nsx-fut-button>
      </div>
    </div>
    <div v-if="currentMenu === 0" class="text-start">
      <div class="row mt-3 mx-0">
        <div class="col-12 mb-2">
          <h5>
            <font-awesome-icon class="me-2" :icon="['fas', 'user-circle']" />{{ $t('i18n_informacoes_do_login') }}
          </h5>
        </div>
        <div class="col-6 spacing-start mb-3">
          <span class="section-header d-block">{{ $t('i18n_usuario') }}</span>
          <span class="section-header-content">{{ loggedInUser.name }}</span>
        </div>
        <div class="col-6 spacing-start mb-3">
          <span class="section-header d-block">{{ $t('i18n_saldo') }}</span>
          <span class="section-header-content">R$ {{ loggedInUser.balance }}</span>
        </div>
        <div class="col-12 mb-2">
          <h5>
            <font-awesome-icon class="me-2" :icon="['fas', 'globe-americas']" />{{ $t('i18n_localizacao') }}
          </h5>
        </div>
        <div class="col-md-6 spacing-start mb-3">
          <span class="section-header d-block">{{ $t('i18n_pais_de_residencia') }}</span>
          <span class="section-header-content">{{ loggedInUser.player.country }}</span>
        </div>
        <div class="col-md-6 spacing-start mb-3">
          <span class="section-header d-block">{{ $t('i18n_idioma') }}</span>
          <span class="section-header-content">{{ $t('i18n_portugues') }}</span>
        </div>
        <div class="col-md-6 spacing-start mb-3">
          <span class="section-header d-block">{{ $t('i18n_fuso_horario') }}</span>
          <span class="section-header-content">GMT-3</span>
        </div>
        <div class="col-md-6 spacing-start mb-3">
          <span class="section-header d-block">{{ $t('i18n_moeda') }}</span>
          <span class="section-header-content">{{ $t('i18n_real_brasileiro') }}</span>
        </div>
        <div class="col-12 mb-2">
          <h5>
            <font-awesome-icon class="me-2" :icon="['fas', 'user']" />{{ $t('i18n_informacoes_pessoais') }}
          </h5>
        </div>
        <div class="col-md-6 spacing-start mb-3">
          <span class="section-header d-block">{{ $t('i18n_primeiro') }} {{ $t('i18n_nome') }}</span>
          <span class="section-header-content">{{ loggedInUser.name }}</span>
        </div>
        <div class="col-md-6 spacing-start mb-3">
          <span class="section-header d-block">{{ $t('i18n_sobrenome') }}</span>
          <span class="section-header-content">{{ loggedInUser.last_name }}</span>
        </div>
        <div class="col-md-6 spacing-start mb-3">
          <span class="section-header d-block">{{ $t('i18n_data_de_nascimento') }}</span>
          <span class="section-header-content">{{ formatDate(loggedInUser.player.birthdate) }}</span>
        </div>
        <div class="col-md-6 spacing-start mb-3">
          <span class="section-header d-block">{{ $t('i18n_genero') }}</span>
        </div>
        <div class="col-12 mb-2">
          <h5>
            <font-awesome-icon class="me-2" :icon="['fas', 'mobile-alt']" />{{ $t('i18n_informacoes_de_contato') }}
          </h5>
        </div>
        <div class="col-md-6 spacing-start mb-3">
          <span class="section-header d-block">E-mail</span>
          <span class="section-header-content">{{ loggedInUser.email }}</span>
        </div>
        <div class="col-md-6 spacing-start mb-3">
          <span class="section-header d-block">{{ $t('i18n_telefone') }}</span>
          <span class="section-header-content">{{ loggedInUser.phone }}</span>
        </div>
        <div class="col-12 mb-2">
          <h5>
            <font-awesome-icon class="me-2" :icon="['fas', 'address-card']" />{{ $t('i18n_endereco') }}
          </h5>
        </div>
        <div class="col-md-6 spacing-start mb-3">
          <span class="section-header d-block">{{ $t('i18n_estado') }}</span>
          <span class="section-header-content">{{ loggedInUser.state }}</span>
        </div>
        <div class="col-md-6 spacing-start mb-3">
          <span class="section-header d-block">{{ $t('i18n_cidade') }}</span>
          <span class="section-header-content">{{ loggedInUser.city }}</span>
        </div>
        <div class="col-md-6 spacing-start mb-3">
          <span class="section-header d-block">CEP</span>
          <span class="section-header-content">{{ loggedInUser.player.zip }}</span>
        </div>
        <div class="col-md-6 spacing-start mb-3">
          <span class="section-header d-block">{{ $t('i18n_rua') }}</span>
          <span class="section-header-content">{{ loggedInUser.player.street }}</span>
        </div>
        <div class="col-md-6 spacing-start mb-3">
          <span class="section-header d-block">{{ $t('i18n_bairro') }}</span>
          <span class="section-header-content">{{ loggedInUser.player.neighborhood }}</span>
        </div>
        <div class="col-md-6 spacing-start mb-3">
          <span class="section-header d-block">{{ $t('i18n_numero') }}</span>
          <span class="section-header-content">{{ loggedInUser.player.number }}</span>
        </div>
      </div>
    </div>
    <div v-if="currentMenu === 1" class="text-start">
      <nsx-update
        :logged-in-user="loggedInUser"
        :loading="loading"
        @updateUser="$emit('updateUser', $event)"
      />
    </div>
    <div v-if="currentMenu === 2" class="text-start">
      <nsx-new-password
        :errors="errors"
        @updatePassword="$emit('updatePassword', $event)"
        @clear="$emit('clear')"
      />
    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs'
import NsxFutButton from '@/components/nsx/atoms/NsxFutButton'
import NsxUpdate from '@/components/nsx/molecules/NsxUpdate'
import NsxNewPassword from '@/components/nsx/organisms/NsxNewPassword'
export default {
  components: { NsxFutButton, NsxUpdate, NsxNewPassword },
  props: {
    loggedInUser: {
      type: Object,
      default: () => ({})
    },
    loading: {
      type: Boolean,
      default: false
    },
    errors: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      currentMenu: 0
    }
  },
  methods: {
    formatDate (date) {
      return dayjs(date).format('DD/MM/YYYY')
    }
  }
}
</script>
<style scoped lang="scss">
.nowrap{
  white-space: nowrap;
}
h5{
  font-size: 12pt;
}
p{
  font-size: 14px;
}
.nsx-button{
  color: #fff;
  background: #6c757d;
  text-align: center;
  vertical-align: middle;
  border-radius: 0.2rem !important;
  padding: 2px 10px;
  font-size: 14px;
}
.nsx-button:hover{
  background: #5b646b;
}
.nsx-button.active{
  background: linear-gradient(#ff8800,#ff6600) !important;
}
.section-header{
  color: #ff6600;
  font-weight: 700;
  font-size: 13.3px;
  line-height: 10px;
}
.section-header-content{
  font-size: 13.3px;
  color: #000;
}
.spacing-start{
  padding-left: 35px;
}
</style>
