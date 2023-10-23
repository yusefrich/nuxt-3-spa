<template>
  <div>
    <div class="bg-gray py-2">
      <span class="fw-bold container">{{ $t('i18n_pre_jogo').toUpperCase() }}</span>
    </div>
    <div class="container">
      <div class="d-flex bg-white rounded my-1 px-2 align-items-center">
        <input class="w-100 my-1 search" :placeholder="$t('i18n_buscar')" type="text">
        <font-awesome-icon :icon="['fas', 'search']" />
      </div>
    </div>
    <div class="w-100 text-white d-flex week-times align-items-center">
      <fb-fut-button class="w-100">
        <font-awesome-icon :icon="['fas', 'clock']" />
      </fb-fut-button>
      <fb-fut-button class="w-100">
        <span>6ª</span>
      </fb-fut-button>
      <fb-fut-button class="w-100">
        <span>Sa</span>
      </fb-fut-button>
      <fb-fut-button class="w-100">
        <span>{{ $t('i18n_do') }}</span>
      </fb-fut-button>
      <fb-fut-button class="w-100">
        <span>2ª</span>
      </fb-fut-button>
      <fb-fut-button class="w-100">
        <span>3ª</span>
      </fb-fut-button>
      <fb-fut-button class="w-100">
        <span>4ª</span>
      </fb-fut-button>
      <fb-fut-button class="w-100">
        <span>5ª</span>
      </fb-fut-button>
    </div>
    <div v-for="(teste, index) in testes" :key="'list_sports'+index">
      <fb-fut-button
        class="w-100 button-sport align-items-center d-flex justify-content-between"
        data-bs-toggle="collapse"
        :data-bs-target="'#'+teste.collapse"
      >
        <div>
          <img class="mx-10" :src="teste.image">
          <span class="fw-bold text-white">{{ teste.name }}</span>
        </div>
        <span class="event-count text-center">{{ teste.number }}</span>
      </fb-fut-button>
      <div
        v-for="(insideB, idx1) in insideBtn"
        :id="teste.collapse"
        :key="'list_games'+idx1"
        class="collapse hidden"
      >
        <fb-fut-button
          class="w-100 button-sport align-items-center d-flex justify-content-between"
          data-bs-toggle="collapse"
          :data-bs-target="'#' + insideB.name"
        >
          <div>
            <span class="mx-40 text-white">{{ insideB.name }}</span>
          </div>
          <span class="event-count text-center">{{ insideB.number }}</span>
        </fb-fut-button>
        <div :id="insideB.name" class="collapse hidden">
          <div class="d-grid">
            <fb-fut-button
              v-for="(insideB2, idx2) in insideBtn2"
              :key="'list_insiders'+idx2"
              to="#"
              class="button-sport-inside py-1"
            >
              <span class="mx-50 text-white">{{ insideB2 }}</span>
            </fb-fut-button>
          </div>
        </div>
      </div>
    </div>
    <div class="week-times">
      <span class="container text-white fw-bold">{{ $t('i18n_longo_prazo').toUpperCase() }}</span>
    </div>
    <div v-for="(teste2, index) in testes2" :key="'list_sport_term'+index">
      <fb-fut-button
        class="w-100 button-sport align-items-center d-flex justify-content-between"
        data-bs-toggle="collapse"
        :data-bs-target="'#' + teste2.collapse"
      >
        <div>
          <img class="mx-10" :src="teste2.image">
          <span class="fw-bold text-white">{{ teste2.name }}</span>
        </div>
        <span class="event-count text-center">{{ teste2.number }}</span>
      </fb-fut-button>
      <div
        v-for="(insideB, idx1) in insideBtn"
        :id="teste2.collapse"
        :key="'list_games_term'+idx1"
        class="collapse hidden"
      >
        <fb-fut-button
          class="w-100 button-sport align-items-center d-flex justify-content-between"
          data-bs-toggle="collapse"
          :data-bs-target="'#' + insideB.name"
        >
          <div>
            <span class="mx-40 text-white">{{ insideB.name }}</span>
          </div>
          <span class="event-count text-center">32</span>
        </fb-fut-button>
        <div :id="insideB.name" class="collapse hidden">
          <div class="d-grid">
            <fb-fut-button v-for="(insideB2, idx2) in insideBtn2" :key="'linst_insiders_term'+idx2" class="button-sport-inside py-1" to="#">
              <span class="mx-50 text-white">{{ insideB2 }}</span>
            </fb-fut-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import FbFutButton from '@/components/fb/atoms/FbFutButton.vue'

export default {
  components: {
    FbFutButton
  },
  data () {
    return {
      testes: [
        // mocks
        { image: '/FbIcons/1.png', name: 'Futebol', number: '192', collapse: 'Futebol_pre' },
        { image: '/FbIcons/3.png', name: 'Tênis', number: '12', collapse: 'Tênis_pre' },
        { image: '/FbIcons/4.png', name: 'Volei', number: '22', collapse: 'Volei_pre' },
        { image: '/FbIcons/6.png', name: 'Basquete', number: '121', collapse: 'Basquete_pre' },
        { image: '/FbIcons/21.png', name: 'Futsal', number: '11', collapse: 'Futsal_pre' }
      ],
      testes2: [
        // mocks
        { image: '/FbIcons/100.png', name: 'Futebol', number: '192', collapse: 'Futebol_term' },
        { image: '/FbIcons/100.png', name: 'Tênis', number: '12', collapse: 'Tênis_term' },
        { image: '/FbIcons/100.png', name: 'Volei', number: '22', collapse: 'Volei_term' },
        { image: '/FbIcons/100.png', name: 'Basquete', number: '121', collapse: 'Basquete_term' },
        { image: '/FbIcons/100.png', name: 'Futsal', number: '11', collapse: 'Futsal_term' }
      ],
      insideBtn: [
        // mocks
        { name: 'Brasil', number: '23' },
        { name: 'Internacional', number: '13' },
        { name: 'Inglaterra', number: '213' }
      ],
      // mocks
      insideBtn2: ['Brasileirão Série A', 'Capixaba, Serie A, Playoffs', 'Brasileirão Série B', 'Campeonato Paraìbano, Playoffs']
    }
  }
}
</script>
<style lang="scss" scoped>
.bg-gray {
  background-color: #232429;
  color: white;
}
.search {
  border: none;
  outline: none;
}
.week-times {
  background-color: #31343B;
  border-right: 1px solid rgb(70, 69, 69);
    button {
      background-color: #31343B;
      border: none;
      border-right: 1px solid rgb(70, 69, 69);
      color: white;
      font-size: 11px;
      padding: 6px 0;
    }
}
.button-sport {
  background-color: #232429;
  border: none;
  border-bottom: 1px solid rgb(68, 69, 73);
  text-align: left;
}
.button-sport-inside {
  background-color: #3b393a;
  border: none;
  font-size: 12px;
  border-bottom: 1px solid rgb(68, 69, 73);
  text-align: left;
  text-decoration: none;
}
.event-count {
  color: white;
  width: 25px;
  font-size: 11px;
  margin-left: 50px;
  background-color: #121214;
}
</style>
