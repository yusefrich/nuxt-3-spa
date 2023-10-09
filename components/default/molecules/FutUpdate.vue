<template>
  <div class="row">
    <div class="col-md-6">
      <div class="register-container">
        <p class="text-white fut-color-dynamic text-center font-weight-bold">
          <span class="required" />{{ $t('i18n_pais_de_residencia') }}
        </p>
        <fut-select
          v-if="countryOptions"
          v-model="data.country"
          :validate="errors?errors:{}"
          :options="countryOptions"
          disabled
          name="country"
          value="BR"
          class="mx-0 mt-2"
        />
        <hr class="bg-white">
        <p class="text-white fut-color-dynamic text-center font-weight-bold">
          {{ $t('i18n_informacoes_pessoais') }}
        </p>
        <label class="text-white fut-color-dynamic text-start"><span class="required" />{{ $t('i18n_nome') }}: </label>
        <fut-input
          v-model="fixed.name"
          :validate="errors?errors:{}"
          type="text"
          disabled
          name="name"
          class="mx-0 mt-2"
        />
        <br>
        <label class="text-white fut-color-dynamic text-start"><span class="required" />{{ $t('i18n_data_de_nascimento') }}: </label>
        <fut-input
          v-model="fixed.birthdate"
          :validate="errors?errors:{}"
          type="date"
          :placeholder="$t('i18n_dd_mm_aaaa')"
          disabled
          name="birthdate"
          class="mx-0 mt-2"
        />
        <br>
        <label class="text-white fut-color-dynamic text-start"><span class="required" />CPF: </label>
        <fut-input
          v-model="fixed.document"
          v-inputmask="'999.999.999-99'"
          :validate="errors?errors:{}"
          type="text"
          disabled
          name="document"
          class="mx-0 mt-2"
        />
        <hr class="bg-white">
        <p class="text-white fut-color-dynamic text-center font-weight-bold">
          {{ $t('i18n_informacoes_para_contato') }}
        </p>
        <label class="text-white fut-color-dynamic text-start"><span class="required" />E-mail: </label>
        <fut-input
          v-model="data.email"
          :validate="errors?errors:{}"
          type="email"
          disabled
          name="email"
          class="mx-0 mt-2"
        />
        <br>
        <label class="text-white fut-color-dynamic text-start"><span class="required" />{{ $t('i18n_numero_de_telefone') }}: </label>
        <fut-input
          v-model="data.phone"
          v-inputmask="'(99) 99999-9999'"
          :validate="errors?errors:{}"
          type="text"
          name="phone"
          class="mx-0 mt-2"
        />
      </div>
    </div>
    <div class="col-md-6">
      <div class="register-container">
        <p class="text-white fut-color-dynamic text-center font-weight-bold">
          {{ $t('i18n_endereco') }}
        </p>
        <label class="text-white fut-color-dynamic text-start"><span class="required" />{{ $t('i18n_codigo_posta') }}/CEP: </label><!-- verificar -->
        <fut-input
          v-model="zipRaw"
          v-inputmask="'99999-999'"
          :validate="errors?errors:{}"
          type="text"
          name="zip"
          class="mx-0 mt-2"
          @input="value=>data.zip = sanatizeValue(value, '-', '')"
        />
        <br>
        <fut-button
          :disabled="zipRaw === loggedInUser.player.zip"
          class="no-break mt-3 text-center mb-5"
          :block="true"
          :primary="true"
          @click="()=>searchAddress(data.zip)"
        >
          <strong class="text-uppercase font-weight-bold text-white fut-color-dynamic">{{ $t('i18n_buscar') }} {{ $t('i18n_endereco') }}</strong>
        </fut-button>
        <div>
          <label class="text-white fut-color-dynamic text-start"><span class="required" />{{ $t('i18n_rua') }}: </label>
          <fut-input v-model="data.street" type="text" :validate="errors?errors:{}" name="street" class="mx-0 mt-2" />
          <br>
          <label class="text-white fut-color-dynamic text-start"><span class="required" />{{ $t('i18n_bairro') }}: </label>
          <fut-input v-model="data.neighborhood" type="text" :validate="errors?errors:{}" name="neighborhood" class="mx-0 mt-2" />
          <br>
          <label class="text-white fut-color-dynamic text-start"><span class="required" />{{ $t('i18n_numero') }}: </label>
          <fut-input v-model="data.number" type="text" :validate="errors?errors:{}" name="number" class="mx-0 mt-2" />
        </div>
      </div>
    </div>
    <div class="col-12">
      <hr class="bg-white">

      <fut-button
        class="no-break mt-3 text-center mb-5"
        :block="true"
        :primary="true"
        @click="$emit('updateData', data)"
      >
        <strong class="text-uppercase font-weight-bold">{{ $t('i18n_atualizar') }}</strong>
      </fut-button>
    </div>
  </div>
</template>

<script>
import FutInput from '@/components/default/atoms/FutInput.vue'
import FutSelect from '@/components/default/atoms/FutSelect.vue'
import FutButton from '@/components/default/atoms/FutButton.vue'
import utils from '@/utils/utils'

export default {
  name: 'FutUpdate',
  components: {
    FutInput,
    FutButton,
    FutSelect
  },
  props: {
    errors: {
      type: Object,
      default: () => ({})
    },
    loggedInUser: {
      type: Object,
      default: () => ({})
    },
    address: {
      type: Object,
      default: () => ({})
    }
  },
  emits: [
    'updateData',
    'searchAddress'
  ],
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
  watch: {
    address (val) {
      if (val) {
        this.data.street = val.logradouro
        this.data.neighborhood = val.bairro
      }
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
    searchAddress (cep) {
      if (!cep) {
        this.$toast.open({
          message: 'Digite um cep válido!',
          type: 'warning'
        })
        return
      }

      this.$emit('searchAddress', cep)
    },
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
  }
</style>
