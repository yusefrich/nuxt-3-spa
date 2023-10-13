<template>
  <md-card>
    <article class="card-content">
      <section>
        <md-chip>
          <font-awesome-icon :icon="['fas', 'user']" />
          {{ $t('i18n_informacoes_pessoais') }}
        </md-chip>

        <md-input
          class="mt-3"
          :value="$attrs['logged-in-user'].username"
          :label="$t('i18n_nome')"
          name="name"
          disabled
        />
        <div class="d-flex">
          <md-input
            :value="$attrs['logged-in-user'].player.document"
            class="me-1"
            label="CPF"
            name="document"
            disabled
          />
          <md-input
            :value="$attrs['logged-in-user'].player.birthdate"
            :label="$t('i18n_data_de_nascimento')"
            class="ms-1"
            name="birthdate"
            disabled
          />
        </div>
        <div class="d-flex">
          <md-input
            :value="$attrs['logged-in-user'].email"
            class="me-1"
            label="Email"
            name="email"
            disabled
          />
          <md-input
            v-model="data.phone"
            mask="(99) 9 9999-9999"
            :label="$t('i18n_telefone')"
            name="phone"
            class="ms-1"
            :errors="$attrs['errors']"
          />
        </div>
        <md-button
          :disabled="$attrs['loading']"
          padding="4px"
          class="mb-3"
          @click="$emit('updateData', data)"
        >
          <font-awesome-icon :icon="['fas', 'sync-alt']" />
          {{ $t('i18n_atualizar_dados') }}
        </md-button>
        <div class="d-flex">
          <md-input
            v-model="password.old_password"
            :label="$t('i18n_senha')"
            :placeholder="$t('i18n_digite_a_sua_senha')"
            class="me-1"
            type="password"
            name="old_password"
            :errors="$attrs['errors']"
          />
          <md-input
            v-model="password.password"
            :label="$t('i18n_nova_senha')"
            type="password"
            name="password"
            :errors="$attrs['errors']"
          />
          <md-input
            v-model="password.password_confirmation"
            :label="$t('i18n_confirme_a_senha')"
            class="ms-1"
            type="password"
            name="password_confirmation"
            :errors="$attrs['errors']"
          />
        </div>
        <md-button
          :disabled="$attrs['loading']"
          padding="4px"
          @click="$emit('updatePassword', password), clearPassword()"
        >
          <font-awesome-icon :icon="['fas', 'sync-alt']" />
          {{ $t('i18n_atualizar_senha') }}
        </md-button>
      </section>

      <section>
        <md-chip>
          <font-awesome-icon :icon="['fas', 'map-marker-alt']" />
          {{ $t('i18n_informacoes_gerais') }}
        </md-chip>

        <div class="d-flex align-items-center  mt-3">
          <md-input
            v-model="address.zip"
            mask="99999-999"
            class="me-1"
            label="CEP"
            name="zip"
          />
          <md-button
            :disabled="$attrs['loading']"
            class="mt-3"
            width="70%"
            height="38px"
            @click="$emit('searchAddress', address.zip.replace('-', ''))"
          >
            {{ $t('i18n_buscar_endereco') }}
          </md-button>
        </div>
        <div class="d-flex">
          <md-input
            :value="address.country"
            class="me-1"
            :label="$t('i18n_pais_de_residencia')"
            name="country"
            disabled
          />
          <md-input
            v-model="address.neighborhood"
            :label="$t('i18n_bairro')"
            name="neighborhood"
            class="ms-1"
          />
        </div>
        <div class="d-flex">
          <md-input
            v-model="address.street"
            :label="$t('i18n_rua')"
            class="me-1"
            name="street"
          />
          <md-input
            v-model="address.number"
            :label="$t('i18n_numero')"
            name="number"
            class="ms-1"
            type="number"
          />
        </div>
        <md-button
          :disabled="$attrs['loading']"
          padding="4px"
          @click="$emit('updateData', address)"
        >
          <font-awesome-icon :icon="['fas', 'check-double']" />
          {{ $t('i18n_salvar') }}
        </md-button>
      </section>
    </article>
  </md-card>
</template>

<script>
import MdCard from '@/components/md/atoms/MdCard'
import MdInput from '@/components/md/atoms/MdInput'
import MdButton from '@/components/md/atoms/MdButton'

export default {
  name: 'MdAccount',
  components: {
    MdCard,
    MdInput,
    MdButton
  },
  emits: [
    'updateData',
    'updatePassword',
    'searchAddress'
  ],
  data () {
    return {
      data: {
        phone: ''
      },
      password: {
        old_password: '',
        password: '',
        password_confirmation: ''
      },
      address: {
        zip: '',
        country: 'Brazil',
        neighborhood: '',
        street: '',
        number: ''
      },
      fetchedAddress: this.$attrs['fetched-address']
    }
  },
  watch: {
    fetchedAddress: {
      handler (newVal) {
        this.address.street = newVal.street
        this.address.neighborhood = newVal.neighborhood
      },
      deep: true
    }
  },
  mounted () {
    this.data.phone = this.$attrs['logged-in-user'].phone
    this.address.zip = this.$attrs['logged-in-user'].player.zip
    this.address.country = this.$attrs['logged-in-user'].player.country
    this.address.neighborhood = this.$attrs['logged-in-user'].player.neighborhood
    this.address.street = this.$attrs['logged-in-user'].player.street
    this.address.number = this.$attrs['logged-in-user'].player.number
  },
  methods: {
    clearPassword () {
      this.password = {
        old_password: '',
        password: '',
        password_confirmation: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.card-content {
  display: flex;
  section {
    width: 50%;
    height: fit-content;
    color: var(--md-font-color);
    display: flex;
    flex-direction: column;
    &:first-child {
      border-right: 1px solid var(--md-comp-border-color);
      margin: 0 24px 0 0;
      padding: 0 24px 0 0;
    }
  }
    @media (max-width: 1610px) {
      & {
        flex-direction: column;
        section {
          width: 100%;
          &:first-child {
            margin: 0 0 24px 0;
            padding: 0 0 24px 0;
            border-right: none;
            border-bottom: 1px solid var(--md-comp-border-color);
          }
        }
      }
    }
}

</style>
