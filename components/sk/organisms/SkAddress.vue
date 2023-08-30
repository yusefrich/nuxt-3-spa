<template>
  <div class="sk-address">
    <sk-card>
      <div class="info">
        <h2>
          {{ $t('i18n_endereco') }}
        </h2>

        <div class="form">
          <div class="cep-area" style="grid-area: cep;">
            <sk-input
              v-model="userAddress.zipRaw"
              name="cep"
              mask="99999-999"
              label="CEP"
              class="cep-input"
            />
            <button
              class="search-cep text-uppercase"
              @click="$emit('searchAddress', userAddress.zip)"
            >
              <span>{{ $t('i18n_buscar_endereco') }}</span>
            </button>
          </div>
          <sk-input
            v-model="userAddress.street"
            name="street"
            :label="$t('i18n_rua')"
            style="grid-area: street;"
          />
          <sk-input
            v-model="userAddress.neighborhood"
            name="neighborhood"
            :label="$t('i18n_bairro')"
            style="grid-area: neighborhood;"
          />
          <sk-input
            v-model="userAddress.number"
            name="num"
            :label="$t('i18n_numero')"
            style="grid-area: number;"
          />
          <sk-input
            v-model="userAddress.country"
            name="country"
            :label="$t('i18n_pais_de_residencia')"
            style="grid-area: country;"
            readonly
          />
        </div>
      </div>

      <div class="submit-area">
        <button
          @click="$emit('submit', userAddress)"
        >
          <span>{{ $t('i18n_salvar') }}</span>
        </button>
      </div>
    </sk-card>
  </div>
</template>

<script>
import SkCard from '@/components/sk/atoms/SkCard.vue'

export default {
  name: 'SkAddress',
  components: {
    SkCard
  },
  props: {
    loggedInUser: {
      type: Object,
      default: () => ({})
    },
    fetchedAddress: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      userAddress: {
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
    fetchedAddress: {
      handler (newVal) {
        this.userAddress.street = newVal.street
        this.userAddress.neighborhood = newVal.neighborhood
      },
      deep: true
    },
    'userAddress.zipRaw' (value) {
      this.userAddress.zip = this.sanatizeValue(value, '-', '')
    }
  },
  mounted () {
    this.userAddress.zip = this.sanatizeValue(this.loggedInUser.player.zip, '-', '')
    this.userAddress.zipRaw = this.loggedInUser.player.zip
    this.userAddress.country = this.loggedInUser.player.country
    this.userAddress.street = this.loggedInUser.player.street
    this.userAddress.neighborhood = this.loggedInUser.player.neighborhood
    this.userAddress.number = this.loggedInUser.player.number
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

<style lang="scss" scoped>
.sk-address {
  padding: 1.5rem;
  background: var(--fut-background-darkest);
  border-radius: .5rem;
  color: var(--fut-color-dynamic);

  .info {
    padding: 1.5rem;
    color: var(--fut-color-dynamic);

    h2 {
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0;
      padding-bottom: 1.25rem;
      border-bottom: 1px solid var(--fut-background-lightest-2);
    }

    .form {
      display: grid;
      grid:
        "cep cep"
        "street neighborhood"
        "number country"
      ;
      margin-top: 1rem;
      gap: 1rem;

      .cep-area {
        display: flex;
        align-items: flex-end;

        .cep-input {
          width: 100%;
        }

        .search-cep {
          font-size: 14px;
          border: none;
          background: var(--fut-primary);
          border-radius: .25rem;
          height: 38px;
          color: var(--fut-color-dynamic);

          span {
            white-space: nowrap;
            font-weight: 600;
          }

          &:hover {
            background: var(--fut-primary-darkest);
          }
          &:active {
            span {
              display: flex;
              transform: scale(.95);
            }
          }
        }
      }
    }
  }

  .submit-area {
    border-top: 1px solid var(--fut-background-lightest-2);
    padding: 1rem;
    display: flex;
    justify-content: flex-end;

    button {
      display: flex;
      justify-content: center;
      border: none;
      background: var(--fut-primary);
      padding: 11.5px 20px;
      border-radius: .25rem;
      min-width: 12ch;
      box-shadow: 0rem .0625rem .1875rem #00000033 , 0rem .0625rem .125rem #0000001f;

      span {
        color: var(--fut-color-dynamic);
        font-size: .875rem;
        font-weight: 600;
      }

      &:hover {
        background: var(--fut-primary-darkest);
      }
      &:active {
        span {
          display: flex;
          transform: scale(.95);
        }
      }
    }
  }
}

@media (max-width: 821px) {
  .sk-address {
    padding: .5rem;

    .info {
      padding: .5rem;
    }
  }
}
</style>
