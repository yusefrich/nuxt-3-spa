<template>
  <div class="row">
    <div class="col-12 mt-3">
      <h5><font-awesome-icon class="me-1" :icon="['fas', 'globe-americas']" /> {{ $t('i18n_localizacao') }}</h5>
    </div>
    <div class="col-md-6 mb-2 ps-nsx">
      <label class="text-center font-weight-bold"><span class="required" />{{ $t('i18n_pais_de_residencia') }}</label>
      <fut-select
        v-if="countryOptions"
        v-model="data.country"
        :validate="errors?errors:{}"
        :options="countryOptions"
        :nsx-input="true"
        disabled
        nsx-validation
        name="country"
        value="BR"
        class="mx-0"
      />
    </div>
    <div class="col-md-6 mb-2 ps-nsx">
      <label class="text-center font-weight-bold"><span class="required" />{{ $t('i18n_fuso_horario') }}</label>
      <fut-select
        :validate="errors?errors:{}"
        :options="[{value: 'GMT-3', label: 'GMT-3'}]"
        value="GMT-3"
        disabled
        :nsx-input="true"
        nsx-validation
        name="country"
        class="mx-0"
      />
    </div>
    <div class="col-md-6 mb-2 ps-nsx">
      <label class="text-center font-weight-bold"><span class="required" />{{ $t('i18n_idioma') }}</label>
      <fut-select
        :validate="errors?errors:{}"
        :options="[{value: $t('i18n_portugues'), label: $t('i18n_portugues')}]"
        :value="$t('i18n_portugues')"
        disabled
        :nsx-input="true"
        nsx-validation
        name="country"
        class="mx-0"
      />
    </div>
    <div class="col-12 mt-3">
      <h5>
        <font-awesome-icon class="me-2" :icon="['fas', 'user']" /> {{ $t('i18n_informacoes_pessoais') }}
      </h5>
      <p>
        <small>{{ $t('i18n_informe_os_dados_corretamente') }}</small>
      </p>
    </div>
    <div class="col-md-6 ps-nsx">
      <label><span class="required" />CPF</label>
      <br>
      <span>
        {{ fixed.document }}
      </span>
    </div>
    <div class="col-md-6 ps-nsx">
      <label class="text-start"><span class="required" />{{ $t('i18n_nome') }}</label>
      <fut-input
        v-model="fixed.name"
        :validate="errors?errors:{}"
        :nsx-input="true"
        disabled
        name="name"
        nsx-validation
        type="text"
        class="mx-0 mt-2"
      />
    </div>
    <div class="col-md-6 ps-nsx">
      <label class="text-start"><span class="required" />{{ $t('i18n_data_de_nascimento') }}</label>
      <div class="d-flex">
        <fut-select
          :value="fixed.birthdate.split('-')[2]"
          :validate="errors?errors:{}"
          :options="[{value: fixed.birthdate.split('-')[2], label: fixed.birthdate.split('-')[2]}]"
          disabled
          :nsx-input="true"
          name="country"
          style="width: 70px"
          class="mx-0 px-1"
        />
        <fut-select
          :value="fixed.birthdate.split('-')[1]"
          :validate="errors?errors:{}"
          :options="[{value: fixed.birthdate.split('-')[1], label: fixed.birthdate.split('-')[1]}]"
          disabled
          :nsx-input="true"
          name="country"
          style="width: 70px"
          class="mx-0 px-1"
        />
        <fut-select
          :value="fixed.birthdate.split('-')[0]"
          :validate="errors?errors:{}"
          :options="[{value: fixed.birthdate.split('-')[0], label: fixed.birthdate.split('-')[0]}]"
          disabled
          :nsx-input="true"
          name="country"
          style="width: 90px"
          class="mx-0 px-1"
        />
      </div>
    </div>
    <div class="col-12 mt-3">
      <h5>
        <font-awesome-icon class="me-2" :icon="['fas', 'mobile-alt']" /> {{ $t('i18n_informacoes_de_contato') }}
      </h5>
    </div>
    <div class="col-md-6 ps-nsx">
      <label class="text-start"><span class="required" />E-mail</label>
      <fut-input
        v-model="data.email"
        :validate="errors?errors:{}"
        :nsx-input="true"
        type="email"
        disabled
        nsx-validation
        name="email"
        class="mx-0 mt-2"
      />
    </div>
    <div class="col-md-6 ps-nsx">
      <label class="text-start"><span class="required" />{{ $t('i18n_telefone') }}</label>
      <fut-input
        v-model="data.phone"
        v-inputmask="'(99) 99999-9999'"
        :validate="errors?errors:{}"
        :nsx-input="true"
        type="text"
        name="phone"
        nsx-validation
        class="mx-0 mt-2"
      />
    </div>
    <div class="col-12 mt-3">
      <h5>
        <font-awesome-icon class="me-2" :icon="['fas', 'address-card']" /> {{ $t('i18n_endereco') }}
      </h5>
    </div>
    <div class="col-md-6 ps-nsx">
      <label class="text-start"><span class="required" />CEP</label>
      <fut-input
        v-model="zipRaw"
        v-inputmask="'99999-999'"
        :validate="errors?errors:{}"
        :nsx-input="true"
        type="text"
        name="zip"
        class="mx-0 mt-2"
        @input="value=>data.zip = sanatizeValue(value, '-', '')"
      />
    </div>
    <div class="col-md-6 ps-nsx">
      <label class="text-start"><span class="required" />{{ $t('i18n_rua') }}</label>
      <fut-input
        v-model="data.street"
        :validate="errors?errors:{}"
        :nsx-input="true"
        type="text"
        name="street"
        class="mx-0 mt-2"
      />
    </div>
    <div class="col-md-6 ps-nsx">
      <label class="text-start"><span class="required" />{{ $t('i18n_bairro') }}</label>
      <fut-input
        v-model="data.neighborhood"
        :validate="errors?errors:{}"
        :nsx-input="true"
        type="text"
        name="neighborhood"
        class="mx-0 mt-2"
      />
    </div>
    <div class="col-md-6 ps-nsx">
      <label class="text-start"><span class="required" />{{ $t('i18n_numero') }}</label>
      <fut-input
        v-model="data.number"
        :validate="errors?errors:{}"
        :nsx-input="true"
        type="text"
        name="number"
        class="mx-0 mt-2"
      />
    </div>
    <div class="col-12 text-center">
      <nsx-fut-button
        :loading="loading"
        class="no-break mt-3 text-center mb-5 nsx-button-big"
        @click="$emit('updateUser', data)"
      >
        {{ $t('i18n_salvar_dados') }}
      </nsx-fut-button>
    </div>
  </div>
</template>
<script>
import FutInput from '@/components/default/atoms/FutInput'
import FutSelect from '@/components/default/atoms/FutSelect'
import NsxFutButton from '@/components/nsx/atoms/NsxFutButton'
import utils from '@/utils/utils'

export default {
  components: { FutInput, NsxFutButton, FutSelect },
  props: {
    errors: {
      type: Object,
      default: () => ({})
    },
    loggedInUser: {
      type: Object,
      default: () => ({})
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      data: {
        email: '',
        phone: '',
        country: 'BR',
        zip: '',
        street: '',
        neighborhood: '',
        number: ''
      },
      fixed: {
        name: '',
        document: '',
        birthdate: ''
      },
      zipRaw: null,
      countryOptions: null
    }
  },
  mounted () {
    this.countryOptions = utils.listOfCountries()
    this.fixed.name = this.loggedInUser.name
    this.fixed.document = this.loggedInUser.player.document
    this.fixed.birthdate = this.loggedInUser.player.birthdate
    this.data.email = this.loggedInUser.email
    this.data.phone = this.loggedInUser.phone
    this.data.country = this.loggedInUser.player.country
    this.data.zip = this.sanatizeValue(this.loggedInUser.player.zip, '-', '')
    this.zipRaw = this.loggedInUser.player.zip
    this.data.street = this.loggedInUser.player.street
    this.data.neighborhood = this.loggedInUser.player.neighborhood
    this.data.number = this.loggedInUser.player.number
  },
  methods: {
    sanatizeValue (value, replaceWhat, replaceTo) {
      if (!value) {
        return
      }
      const re = new RegExp(replaceWhat, 'g')
      /* eslint-disable-next-line */
      return value.replace(re, replaceTo ? replaceTo : '')
    }
  }
}
</script>
<style scoped lang="scss">
  h5{
    font-size: 12pt;
    margin-bottom: 0;
  }
  p{
    font-size: 13px;
  }
  .no-break{
    white-space: nowrap;
  }
  .required{
    width: 8px !important;
    position: absolute;
    height: 8px !important;
    border-radius: 8px;
    margin-right: 30px;
    left: -17px;
    top: 8px;
  }
  label{
    position: relative;
    font-size: 13.3px;
  }
  .ok-button{
    background: linear-gradient(#ff8800, #ff6600);
    position: absolute;
    right: 0;
    top: 0;
    padding: 0px 10px;
    color: white;
  }
  .ok-button:hover{
    box-shadow: 0 0 3px 3px #ff8800 !important;
  }
  .ps-nsx{
    padding-left: 35px;
  }
  .nsx-button-big{
    color: white;
    width: 250px;
    font-size: .875rem;
    line-height: 1.5;
    border-radius: 0.2rem !important;
    background: linear-gradient(#ff8800,#ff6600);
    padding: 8px;
  }
  .nsx-button-big:hover{
    box-shadow: 0 0 3px 3px #ff8800 !important;
  }
</style>
