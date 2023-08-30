<template>
  <form class="w-md-50 w-100 ms-2" action="">
    <div class="container form-content p-3">
      <div class="d-flex align-items-center">
        <img src="/Sg/map-pin-svgrepo-com.png" alt="">
        <span class="ms-2 text-white">{{ $t('i18n_informacoes_gerais') }}</span>
      </div>
      <div class="d-flex align-items-center mt-2">
        <div class="d-grid w-100 me-2">
          <label class="ms-2 fw-bold text-muted w-75" for="">CEP</label>
          <div class="d-flex">
            <input
              id="cep"
              v-model="data.zipRaw"
              v-inputmask="'99999-999'"
              type="text"
              class="p-1"
              @input="data.zip = sanatizeValue($event.target.value, ['-', '_'], '')"
            >
            <button class="btn-refresh ms-2 w-75" type="button" @click="searchAddress(data.zip)">
              <span>{{ $t('i18n_buscar_endereco') }}</span>
            </button>
          </div>
        </div>
      </div>
      <div class="d-flex mt-2">
        <div class="d-grid w-100 me-2">
          <label class="ms-2 fw-bold text-muted" for="">{{ $t('i18n_pais_de_residencia') }}</label>
          <input class="p-1" placeholder="Brazil" disabled>
        </div>
        <div class="d-grid w-100 ms-2">
          <label class="ms-2 fw-bold text-muted" for="">{{ $t('i18n_bairro') }}</label>
          <input v-model="data.neighborhood" class="p-1" placeholder="">
        </div>
      </div>
      <div class="d-flex mt-2">
        <div class="d-grid w-100 me-2">
          <label class="ms-2 fw-bold text-muted" for="">{{ $t('i18n_rua') }}</label>
          <input v-model="data.country" class="p-1" placeholder="">
        </div>
        <div class="d-grid w-100 ms-2">
          <label class="ms-2 fw-bold text-muted" for="">{{ $t('i18n_numero') }}</label>
          <input v-model="data.number" class="p-1" placeholder="">
        </div>
      </div>
      <button class="w-100 mt-3 btn-refresh py-2" type="button" @click="$emit('update', data)">
        <img src="/Sg/check-svgrepo-com.png" alt="">
        <span>{{ $t('i18n_salvar') }}</span>
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'SgGeneralData',
  props: {
    user: {
      type: Object,
      default: () => {}
    },
    address: {
      type: Object,
      default: () => ({})
    }
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
      }
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
    this.data.zip = this.user.player.zip
    this.data.zipRaw = this.user.player.zip
    this.data.country = this.user.player.country
    this.data.street = this.user.player.street
    this.data.neighborhood = this.user.player.neighborhood
    this.data.number = this.user.player.number
  },
  methods: {
    sanatizeValue (value, replaceWhat, replaceTo) {
      if (!value) {
        return
      }
      let threated = '' + value
      replaceWhat.forEach((e) => {
        const re = new RegExp(e, 'g')
        /* eslint-disable-next-line */
        threated = threated.replace(re, replaceTo ? replaceTo : '')
      })
      return threated
    },
    searchAddress (cep) {
      if (!cep) {
        this.$toast.open({ message: 'Digite um cep válido!', type: 'warning' })
        return
      }

      this.$emit('searchAddress', cep)
    }
  }
}
</script>

<style lang="scss" scoped>

.form-content {
  border-radius: 10px;
  border: 3px solid var(--fut-background-darkest);
}
.btn-refresh {
  border-radius: 5px;
  border: none;
  font-weight: bold;
  background: linear-gradient(var(--fut-primary), var(--fut-secondary));
  font-size: 14px;
}
input {
  background-color: var(--fut-background-darkest);
  border: 2px solid var(--fut-background-lightest);
  border-radius: 5px;
  width: 100%;
  outline: none;
  color: white;
  &:disabled {
    color: #999999;
  }
}
</style>
