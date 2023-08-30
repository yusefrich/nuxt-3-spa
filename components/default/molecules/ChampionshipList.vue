<template>
  <div class="container-fluid">
    <h3 class="text-white">
      {{ $t('i18n_campeonatos') }}
    </h3>
    <hr class="bg-white">
    <h4 class="text-white">
      {{ $t('i18n_principais_listas') }}
    </h4>
    <div class="row">
      <div class="col-6 col-md-3 py-2">
        <fut-button class="text-decoration-none" to="#">
          {{ $t('i18n_lista_da_elite_europeia') }}
        </fut-button>
      </div>
      <div class="col-6 col-md-3 py-2">
        <fut-button class="text-decoration-none" to="#">
          {{ $t('i18n_Lista_do_Reino_Unido') }}
        </fut-button>
      </div>
      <div class="col-6 col-md-3 py-2">
        <fut-button class="text-decoration-none" to="#">
          {{ $t('i18n_lista_do_brasil') }}
        </fut-button>
      </div>
      <div class="col-6 col-md-3 py-2">
        <fut-button class="text-decoration-none" to="#">
          {{ $t('i18n_lista_internacional') }}
        </fut-button>
      </div>
      <div class="col-6 col-md-3 py-2">
        <fut-button class="text-decoration-none" to="#">
          {{ $t('i18n_lista_de_amistosos_clubes') }}
        </fut-button>
      </div>
    </div>
    <hr class="bg-primary">
    <!-- verificar -->
    <h4 class="text-white">
      Euro 2020
    </h4>
    <div class="row">
      <div class="col-6 col-md-3 py-2">
        <fut-button class="text-decoration-none" to="#">
          Euro 2020
        </fut-button>
      </div>
    </div>
    <hr class="bg-primary">
    <h4 class="text-white">
      {{ $t('i18n_internacionais') }}
    </h4>
    <div class="row">
      <div class="col-6 col-md-3 py-2">
        <fut-button class="text-decoration-none" to="#">
          Copa América
        </fut-button>
      </div>
      <div class="col-6 col-md-3 py-2">
        <fut-button class="text-decoration-none" to="#">
          Jogos Olímpicos 2020 - Futebol - Masculino
        </fut-button>
      </div>
      <div class="col-6 col-md-3 py-2">
        <fut-button class="text-decoration-none" to="#">
          Copa de Ouro da CONCACAF
        </fut-button>
      </div>
      <div class="col-6 col-md-3 py-2">
        <fut-button class="text-decoration-none" to="#">
          Copa COSAFA
        </fut-button>
      </div>
      <div class="col-6 col-md-3 py-2">
        <fut-button class="text-decoration-none" to="#">
          Jogos Olímpicos 2020 - Futebol - Feminino
        </fut-button>
      </div>
    </div>
    <hr class="bg-primary">
    <h4 class="text-white">
      As Américas
    </h4>
    <div class="row">
      <div class="col-6 col-md-3 py-2">
        <fut-button class="text-decoration-none" to="#">
          Brasileirão - série A
        </fut-button>
      </div>
      <div class="col-6 col-md-3 py-2">
        <fut-button class="text-decoration-none" to="#">
          Brasileirão - série B
        </fut-button>
      </div>
      <div class="col-6 col-md-3 py-2">
        <fut-button class="text-decoration-none" to="#">
          Brasileirão - série C
        </fut-button>
      </div>
      <div class="col-6 col-md-3 py-2">
        <fut-button class="text-decoration-none" to="#">
          Brasil - Campeonato Mineiro Sub - 20
        </fut-button>
      </div>
    </div>
    <hr class="bg-primary">
  </div>
</template>
<script>
import FutButton from '@/components/default/atoms/FutButton.vue'

export default {
  components: {
    FutButton
  }
}
</script>
<style lang="scss" scoped>
</style>
