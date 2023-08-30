<template>
  <div class="container">
    <div class="row">
      <div class="col-8 d-flex flex-column pe-0 fut-color-dynamic">
        <label for="cep">CEP</label>
        <input
          id="cep"
          v-model="data.zipRaw"
          v-inputmask="'99999-999'"
          type="text"
          class="fut-color-dynamic"
          @input="data.zip = sanatizeValue($event.target.value, '-', '')"
        >
      </div>
      <div class="col d-flex flex-column justify-content-end ps-0">
        <button
          :disabled="data.zipRaw == $attrs['logged-in-user'].player.zip"
          type="button"
          class="btn btn-primary text-white fut-color-dynamic"
          @click="$emit('searchAddress', data.zip)"
        >
          <span style="white-space: nowrap">{{ $t('i18n_buscar') }} {{ $t('i18n_endereco') }}</span>
        </button>
      </div>
    </div>
    <error-badge name="zip" :validate="$attrs['error']?$attrs['error']:{}" />
    <div class="row">
      <div class="col d-flex flex-column fut-color-dynamic">
        <label for="street">{{ $t('i18n_rua') }}</label>
        <input class="fut-color-dynamic" id="street" v-model="data.street" type="text">
        <error-badge name="street" :validate="$attrs['error']?$attrs['error']:{}" />
      </div>
    </div>
    <div class="row">
      <div class="col d-flex flex-column fut-color-dynamic">
        <label for="num">{{ $t('i18n_numero') }}</label>
        <input class="fut-color-dynamic"  id="num" v-model="data.number" type="text">
        <error-badge name="number" :validate="$attrs['error']?$attrs['error']:{}" />
      </div>
      <div class="col d-flex flex-column fut-color-dynamic">
        <label for="neighborhood">{{ $t('i18n_bairro') }}</label>
        <input class="fut-color-dynamic"  id="neighborhood" v-model="data.neighborhood" type="text">
        <error-badge name="neighborhood" :validate="$attrs['error']?$attrs['error']:{}" />
      </div>
    </div>
    <div class="row">
      <div class="col d-flex flex-column fut-color-dynamic">
        <label for="country">{{ $t('i18n_country') }}</label>
        <input class="fut-color-dynamic-gray"  id="country" v-model="data.country" type="text" disabled>
        <error-badge name="country" :validate="$attrs['error']?$attrs['error']:{}" />
      </div>
      <div class="col d-flex flex-column fut-color-dynamic">
        <label for="complement">{{ $t('i18n_complemento') }}</label>
        <input class="fut-color-dynamic"  id="complement" v-model="data.complement" type="text">
      </div>
    </div>
    <div class="row">
      <div class="col d-flex flex-row-reverse">
        <fb-fut-button
          :loading="$attrs['load']"
          type="button"
          class="btn btn-primary text-white fut-color-dynamic"
          @click="$emit('updateData', data)"
        >
          {{ $t('i18n_salvar_alteracoes').toUpperCase() }}
        </fb-fut-button>
      </div>
    </div>
  </div>
</template>

<script>
import ErrorBadge from '@/components/default/atoms/ErrorBadge.vue'
import FbFutButton from '@/components/fb/atoms/FbFutButton.vue'

export default {
  name: 'FbAddressData',
  components: {
    ErrorBadge,
    FbFutButton
  },
  data () {
    return {
      data: {
        zipRaw: '',
        street: '',
        number: '',
        neighborhood: '',
        country: '',
        complement: '',
        zip: ''
      },
      fetchedAddress: this.$attrs['fetched-address']
    }
  },
  watch: {
    fetchedAddress: {
      handler (newVal) {
        this.data.street = newVal.street
        this.data.neighborhood = newVal.neighborhood
      },
      deep: true
    }
  },
  mounted () {
    this.data.zip = this.sanatizeValue(this.$attrs['logged-in-user'].player.zip, '-', '')
    this.data.zipRaw = this.$attrs['logged-in-user'].player.zip
    this.data.country = this.$attrs['logged-in-user'].player.country
    this.data.street = this.$attrs['logged-in-user'].player.street
    this.data.neighborhood = this.$attrs['logged-in-user'].player.neighborhood
    this.data.number = this.$attrs['logged-in-user'].player.number
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
@import "@/assets/layout/breakpoints";

.row {
  margin-top: 25px !important;
  margin-bottom: 25px !important;
}
label {
  font-size: 14px;
}
input {
  background-color: transparent;
  border: none;
  color: white;
  font-size: 16px;
  padding: 7px;
  border-radius: 5px;
  &:disabled{
    color: var(--fut-background-white);
  }
  @include md {
    width: 100%;
    background-color: var(--fut-background);
  }
  &::placeholder {
    color: white;
    font-weight: bold;
    @include md {
      color: gray;
      font-weight: normal;
    }
  }
}
.btn {
  box-shadow: none;
  outline: none;
  font-size: 11px;
  padding: 6px 12px;
  &:disabled {
    background-color: var(--fut-background);
    border-color: var(--fut-background);
  }
}
</style>
