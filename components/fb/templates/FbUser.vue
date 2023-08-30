<template>
  <div class="d-flex justify-content-center">
    <div class="profile-content">
      <div
        class="header-profile w-100 p-2 d-none d-md-flex align-items-center text-white"
      >
        <font-awesome-icon class="mr-10" :icon="['fas', 'user']" />
        <span>{{ $t('i18n_perfil') }}</span>
      </div>
      <div class="d-md-flex d-grid mt-md-1 mt-3">
        <div class="section-details w-100 me-md-1 me-0">
          <div class="container py-1 section-details-header d-none d-md-flex align-items-center">
            <font-awesome-icon class="mr-10" :icon="['fas', 'address-book']" />
            <span>{{ $t('i18n_detalhes_gerais') }}</span>
          </div>
          <div class="d-md-none p-2 section-details-header">
            <span class="mobile-header">{{ $t('i18n_perfil') }}</span>
          </div>
          <div class="contianer-md">
            <div class="mt-2">
              <label class="label-control">{{ $t('i18n_nome_do_usuario') }}</label>
              <input
                class="input-control py-1 px-2"
                type="text"
                :placeholder="loggedInUser.name"
                disabled
              >
            </div>
            <div class="d-md-flex d-grid mt-2">
              <div class="me-md-1 w-100">
                <label class="label-control">{{ $t('i18n_nome') }}</label>
                <input
                  class="input-control py-1 px-2"
                  type="text"
                  :placeholder="loggedInUser.name"
                  disabled
                >
              </div>
              <div class="ms-md-1 mt-2 mt-md-0 w-100">
                <label class="label-control">{{ $t('i18n_sobrenome') }}</label>
                <input
                  class="input-control py-1 px-2"
                  type="text"
                  :placeholder="'...'"
                  disabled
                >
              </div>
            </div>
            <div class="d-md-flex mt-2">
              <div class="me-md-1 w-100">
                <label class="label-control">{{ $t('i18n_genero') }}</label>
                <input
                  class="input-control py-1 px-2"
                  type="text"
                  placeholder="..."
                  disabled
                >
              </div>
              <div class="ms-md-1 mt-2 mt-md-0 w-100">
                <label class="label-control">{{ $t('i18n_data_de_nascimento') }}</label>
                <input
                  class="input-control py-1 px-2"
                  type="text"
                  :placeholder="loggedInUser.player.birthdate"
                  disabled
                >
              </div>
            </div>
            <div class="d-md-flex mt-2">
              <div class="me-md-1 w-100">
                <label class="label-control">E-mail</label>
                <input
                  class="input-control py-1 px-2"
                  type="text"
                  :placeholder="loggedInUser.email"
                  disabled
                >
              </div>
              <div class="ms-md-1 mt-2 mt-md-0 w-100">
                <label class="label-control">{{ $t('i18n_telefone') }}</label>
                <input
                  class="input-control py-1 px-2"
                  type="text"
                  :placeholder="loggedInUser.phone"
                  disabled
                >
              </div>
            </div>
            <div class="d-md-flex mt-2">
              <div class="me-md-1 w-100">
                <label class="label-control">{{ $t('i18n_idioma') }}</label>
                <select class="select-control py-1 px-2">
                  <option>Portuguese (Brazil)</option>
                  <option>English</option>
                </select>
              </div>
              <div class="ms-md-1 mt-2 mt-md-0 w-100">
                <label class="label-control">{{ $t('i18n_fuso_horario') }}</label>
                <select class="select-control py-1 px-2">
                  <option>America/Sao_Paulo</option>
                  <option>{{ $t('i18n_outros') }}...</option>
                </select>
              </div>
            </div>
            <div class="mt-2">
              <fb-fut-button class="button-feature d-flex justify-content-center align-items-center width-button p-2">
                <font-awesome-icon class="mr-10" :icon="['fas', 'redo']" />
                <span>{{ $t('i18n_atualizar') }}</span>
              </fb-fut-button>
            </div>
            <div>
              <div class="d-md-flex mt-2">
                <div class="me-md-1 w-100">
                  <label class="label-control">{{ $t('i18n_senha') }}</label>
                  <input
                    class="input-control-no-disabled py-1 px-2"
                    type="password"
                  >
                </div>
                <div class="ms-md-1 mt-2 mt-md-0 w-100">
                  <label class="label-control">{{ $t('i18n_confirme_a_senha') }}</label>
                  <input
                    class="input-control-no-disabled py-1 px-2"
                    type="password"
                  >
                </div>
              </div>
              <div class="mt-2 mb-5">
                <fb-fut-button class="button-feature d-flex justify-content-center align-items-center width-button p-2">
                  <font-awesome-icon class="mr-10" :icon="['fas', 'redo']" />
                  <span>{{ $t('i18n_atualizar_a_senha') }}</span>
                </fb-fut-button>
              </div>
            </div>
          </div>
        </div>
        <div class="section-details w-100 ms-md-1 ms-0">
          <div class="section-details-header d-none d-md-flex align-items-center py-1 container">
            <font-awesome-icon class="mr-10" :icon="['fas', 'address-card']" />
            <span>{{ $t('i18n_endereco') }}</span>
          </div>
          <div class="d-md-none p-2 section-details-header">
            <span class="mobile-header">{{ $t('i18n_endereco') }}</span>
          </div>
          <div class="contianer-md">
            <div class="d-md-flex mt-2">
              <div class="me-md-1 w-100">
                <label class="label-control">{{ $t('i18n_pais_de_residencia') }}</label>
                <input
                  class="input-control py-1 px-2"
                  type="text"
                  :placeholder="'...'"
                  disabled
                >
              </div>
              <div class="ms-md-1 mt-2 mt-md-0 me-md-1 w-100">
                <label class="label-control">{{ $t('i18n_estado_de_residencia') }}</label>
                <input
                  class="input-control py-1 px-2"
                  type="text"
                  :placeholder="'...'"
                  disabled
                >
              </div>
              <div class="ms-md-1 mt-2 mt-md-0 w-100">
                <label class="label-control">{{ $t('i18n_cidade_de_residencia') }}</label>
                <input
                  class="input-control py-1 px-2"
                  type="text"
                  :placeholder="'...'"
                  disabled
                >
              </div>
            </div>
            <div class="mt-2 w-100">
              <label class="label-control">{{ $t('i18n_endereco') }} 1</label>
              <input
                class="input-control py-1 px-2"
                type="text"
                :placeholder="loggedInUser.player.street"
                disabled
              >
            </div>
            <div class="mt-2 w-100">
              <label class="label-control">{{ $t('i18n_endereco') }} 2</label>
              <input
                class="input-control py-1 px-2"
                type="text"
                :placeholder="'...'"
                disabled
              >
            </div>
            <div class="mt-2 d-md-grid w-100">
              <label class="label-control">CPF</label>
              <input
                class="input-control w-50 py-1 px-2"
                type="text"
                :placeholder="loggedInUser.player.document"
                disabled
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import FbFutButton from '@/components/fb/atoms/FbFutButton.vue'

export default {
  components: {
    FbFutButton
  },
  computed: {
    ...mapGetters({
      loggedInUser: 'loggedInUser'
    })
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/layout/breakpoints";

.profile-content {
  width: 100%;
  @include md {
    width: 80%;
  }
}
.header-profile {
  background-color: var(--fut-background);
}
.section-details {
  background-color: var(--fut-background-darker);
  @include md {
    background-color: var(--fut-background-lightest);
  }
  .section-details-header {
    color: white;
    background-color: var(--fut-background-lightest);
    @include md {
      border-bottom: 1px solid rgb(94, 91, 91);
      background-color: transparent;
    }
    .mobile-header {
      padding-left: 1%;
      border-left: 3px solid var(--fut-primary)
    }
  }
}
.label-control {
  color: white;
  font-size: 13px;
  width: 20%;
  @include md {
    width: auto;
  }
}
.input-control {
  background-color: transparent;
  border: none;
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
.contianer-md {
  margin: 0 20px;
  @include md {
    margin: 0 40px;
  }
}
.select-control {
  background-color: var(--fut-background);
  color: white;
  border: none;
  outline-color: var(--fut-primary);
  width: 100%;
}
.button-feature {
  background-image: linear-gradient(
    to right,
    var(--fut-primary),
    var(--fut-secondary)
  );
  border: none;
  border-radius: 5px;
}
.width-button {
  width: 100%;
  @include md {
    width: auto;
  }
}
.input-control-no-disabled {
  background-color: transparent;
  border: none;
  border-bottom: 1px solid var(--fut-background-lightest);
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
</style>
