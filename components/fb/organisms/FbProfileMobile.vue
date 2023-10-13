<template>
  <div class="section-details-mobile w-100">
    <div
      v-for="(item, idx) in options"
      :key="idx"
    >
      <div
        data-bs-toggle="collapse"
        :data-bs-target="`#collapse-option-${idx}`"
        class="row mx-0 fut-color-dynamic"
      >
        <div class="mx-3 my-3 col-9 fut-color-dynamic">
          <fa :class="item.margin" :icon="['fas', item.icon]" />
          <span>{{ item.text }}</span>
        </div>
        <div class="col d-flex justify-content-center align-items-center fut-color-dynamic">
          <fa :icon="['fas', 'chevron-down']" />
        </div>
      </div>
      <div
        :id="`collapse-option-${idx}`"
        class="collapse option"
      >
        <div
          v-for="(info, idx2) in item.infos"
          :key="idx2"
          class="d-flex flex-column mx-2 fut-color-dynamic"
        >
          <label :for="idx2" class="mt-3">{{ info.label }}</label>
          <select v-if="info.select" :id="idx2" v-model="info.value" class="fut-color-dynamic">
            <option
              v-for="(opt, idx3) in info.opts"
              :key="idx3"
            >
              {{ opt }}
            </option>
          </select>
          <div v-else-if="idx == 3" class="position-relative">
            <input
              :id="info.id"
              v-model="info.value"
              class="fut-color-dynamic"
              :class="info.class"
              :type="passwordType"
              :disabled="info.disabled"
              @input="checkPassword(info.value)"
            >
            <button class="border-0 bg-transparent password-eye-button" type="button" @click="showPassword()">
              <fa v-if="passwordType === 'text'" class="text-white fut-color-dynamic" :icon="['fas', 'eye']" />
              <fa v-else class="text-white fut-color-dynamic" :icon="['fas', 'eye-slash']" />
            </button>
          </div>
          <input
            v-else
            :id="info.id"
            v-model="info.value"
            v-inputmask="info.mask"
            class="fut-color-dynamic"
            :placeholder="info.placeholder"
            :type="info.type"
            :disabled="info.disabled"
          >
          <div
            v-if="idx==3 && idx2==1"
            class="password-checklist text-white fut-color-dynamic"
          >
            <p
              :class="[
                'mb-0',
                `${checkedChar ? 'text-success' : 'text-danger'}`
              ]"
            >
              <small><fa :icon="['far', 'check-circle']" /> {{ $t('i18n_letras_e_numeros') }}.</small>
            </p>
            <p :class="['mb-0', `${checkedLength ? 'text-success' : 'text-danger'}`]">
              <small><fa :icon="['far', 'check-circle']" /> 8 {{ $t('i18n_digitos') }}.</small>
            </p>
          </div>
        </div>
        <div class="d-grid gap-2">
          <fb-fut-button
            :loading="onboardAuthLoad"
            type="button"
            class="btn btn-primary text-white mx-2 my-4 fut-color-dynamic"
            @click="item.action"
          >
            {{ item.btn }}
          </fb-fut-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FbPerfilMobile',
  props: {
    loggedInUser: {
      type: Object,
      default: () => ({})
    },
    onboardAuthLoad: {
      type: Boolean,
      default: false
    },
    onboardAuthError: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      passwordType: 'password',
      checkedChar: false,
      checkedLength: false
    }
  },
  computed: {
    options () {
      return [
        {
          icon: 'address-book',
          margin: 'mr-14',
          text: this.$t('i18n_detalhes_gerais'),
          btn: this.$t('i18n_salvar_alteracoes'),
          action: () => this.updateUserData(),
          infos: [
            {
              label: this.$t('i18n_nome_completo'),
              type: 'text',
              id: 'name',
              value: '',
              disabled: true
            },
            {
              label: 'CPF',
              type: 'text',
              id: 'document',
              value: '',
              disabled: true
            },
            {
              label: this.$t('i18n_data_de_nascimento'),
              type: 'date',
              id: 'birthDate',
              value: '',
              disabled: true
            },
            {
              label: 'Email',
              type: 'text',
              id: 'email',
              value: '',
              disabled: true
            },
            {
              label: this.$t('i18n_telefone'),
              type: 'text',
              id: 'phone',
              value: '',
              mask: '(99) 9 9999-9999',
              placeholder: '(xx) x xxxx-xxxx'
            },
            {
              label: this.$t('i18n_nome_de_usuario'),
              type: 'text',
              id: 'username',
              value: '',
              disabled: true
            }
          ]
        },
        {
          icon: 'address-card',
          margin: 'mr-10',
          text: this.$t('i18n_endereco'),
          btn: this.$t('i18n_salvar_alteracoes'),
          action: () => this.updateAddressData(),
          infos: [
            {
              label: 'CEP',
              id: 'cep',
              value: '',
              mask: '99999-999'
            },
            {
              label: this.$t('i18n_rua'),
              id: 'street',
              value: ''
            },
            {
              label: this.$t('i18n_numero'),
              id: 'num',
              value: ''
            },
            {
              label: this.$t('i18n_bairro'),
              id: 'neighborhood',
              value: ''
            },
            {
              label: this.$t('i18n_country'),
              id: 'country',
              value: '',
              disabled: true
            },
            {
              label: this.$t('i18n_complemento'),
              id: 'complement',
              value: ''
            }
          ]
        },
        {
          icon: 'user-cog',
          margin: 'mr-8',
          text: this.$t('i18n_preferencias'),
          btn: this.$t('i18n_salvar_alteracoes'),
          action: () => this.changeLocale(),
          infos: [
            {
              select: true,
              label: this.$t('i18n_idioma'),
              opts: this.$i18n.locales,
              value: this.$i18n.locale
            },
            {
              select: true,
              label: this.$t('i18n_fuso_horario'),
              opts: [
                'America/Sao_Paulo',
                this.$t('i18n_outros')
              ],
              value: 'America/Sao_Paulo'
            }
          ]
        },
        {
          icon: 'lock',
          margin: 'mr-14',
          text: this.$t('i18n_senha'),
          btn: this.$t('i18n_atualizar_senha'),
          action: () => this.changePassword(),
          infos: [
            {
              label: this.$t('i18n_senha_atual'),
              id: 'currentPassword',
              class: 'password-input',
              value: ''
            },
            {
              label: this.$t('i18n_nova_senha'),
              id: 'newPassword',
              class: 'password-input',
              value: ''
            },
            {
              label: this.$t('i18n_repita_nova_senha'),
              id: 'repeatNewPassword',
              class: 'password-input',
              value: ''
            }
          ]
        }
      ]
    }
  },
  created () {
    this.options[0].infos[0].value = this.loggedInUser.name
    this.options[0].infos[1].value = this.loggedInUser.player.document
    this.options[0].infos[2].value = this.loggedInUser.player.birthdate
    this.options[0].infos[3].value = this.loggedInUser.email
    this.options[0].infos[4].value = this.loggedInUser.phone
    this.options[0].infos[5].value = this.loggedInUser.username

    this.options[1].infos[0].value = this.loggedInUser.player.zip
    this.options[1].infos[1].value = this.loggedInUser.player.street
    this.options[1].infos[2].value = this.loggedInUser.player.number
    this.options[1].infos[3].value = this.loggedInUser.player.neighborhood
    this.options[1].infos[4].value = this.loggedInUser.player.country
  },
  methods: {
    checkPassword (inp) {
      this.checkedChar = /[0-9]/.test(inp) && (/[A-Z]/.test(inp) || /[a-z]/.test(inp))
      this.checkedLength = inp.length >= 8
    },
    updateUserData () {
      const payload = {
        nome: this.options[0].infos[0].value,
        document: this.options[0].infos[1].value,
        birthdate: this.options[0].infos[2].value,
        email: this.options[0].infos[3].value,
        phone: this.options[0].infos[4].value,
        username: this.options[0].infos[5].value
      }

      this.$emit('updateData', payload)
    },
    updateAddressData () {
      const payload = {
        zip: typeof this.options[1].infos[0].value === 'string' ? this.options[1].infos[0].value.replace('-', '') : '',
        street: this.options[1].infos[1].value,
        number: this.options[1].infos[2].value,
        neighborhood: this.options[1].infos[3].value,
        complement: this.options[1].infos[5].value
      }

      this.$emit('updateData', payload)
    },
    changeLocale () {
      this.$i18n.locale = this.options[2].infos[0].value
    },
    changePassword () {
      const payload = {
        old_password: this.options[3].infos[0].value,
        password: this.options[3].infos[1].value,
        password_confirmation: this.options[3].infos[2].value
      }

      this.$emit('updatePassword', payload)
      this.options[3].infos[0].value = ''
      this.options[3].infos[1].value = ''
      this.options[3].infos[2].value = ''
    },
    showPassword () {
      this.passwordType === 'password' ? this.passwordType = 'text' : this.passwordType = 'password'
    }
  }
}
</script>

<style scoped lang="scss">
.section-details-mobile {
  background-color: var(--fut-background-lightest);
  border-radius: 3px;
  color: #FFF;
}
.option {
  background-color: var(--fut-background-darkest);
  width: 100%;
}
label {
  max-width: 90px;
}
input, select {
  background-color: var(--fut-background-lighter);
  border: none;
  color: white;
  font-size: 16px;
  padding: 7px;
  border-radius: 5px;
  &:disabled{
    color: var(--fut-background-white);
  }
  &::placeholder {
    color: white;
    font-weight: bold;
  }
}
#birthDate::-webkit-calendar-picker-indicator {
  filter: invert(1);
  opacity: .5;
}
.btn {
  box-shadow: none;
  outline: none;
}
.password-input {
  width: 100%;
}
.password-eye-button{
  position: absolute;
  right: 3px;
  top: 7px;
}
</style>
