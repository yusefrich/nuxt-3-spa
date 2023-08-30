<template>
  <div class="container">
    <div class="row">
      <div class="col d-flex flex-column fut-color-dynamic">
        <label for="language">{{ $t('i18n_idioma') }}</label>
        <select v-model="data.language" disabled class="fut-color-dynamic">
          <option
            v-for="(locale, idx) in $i18n.locales"
            :key="idx"
          >
            {{ locale }}
          </option>
        </select>
      </div>
      <div class="col d-flex flex-column fut-color-dynamic">
        <label for="fuso">{{ $t('i18n_fuso_horario') }}</label>
        <select disabled class="fut-color-dynamic">
          <option>America/Sao_Paulo</option>
          <option>{{ $t('i18n_outros') }}...</option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="col d-flex flex-row-reverse">
        <fb-fut-button type="button" class="btn btn-primary text-white fut-color-dynamic" @click="changeLocale()">
          {{ $t('i18n_salvar_alteracoes').toUpperCase() }}
        </fb-fut-button>
      </div>
    </div>
  </div>
</template>

<script>
import FbFutButton from '@/components/fb/atoms/FbFutButton.vue'

export default {
  name: 'FbPreferencesData',
  components: {
    FbFutButton
  },
  data () {
    return {
      data: {
        language: this.$i18n.locale,
        fuso: ''
      }
    }
  },
  methods: {
    changeLocale () {
      this.$i18n.locale = this.data.language
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
select {
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
}
</style>
