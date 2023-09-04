<template>
  <div>
    <div class="btn-group w-100 filter-group overflow-auto" role="group" aria-label="Basic radio toggle button group">
      <input
        id="todos"
        v-model="timeFilter"
        :value="null"
        type="radio"
        class="btn-check"
        name="btnradio"
        autocomplete="off"
      >
      <label class="btn btn-outline-primary" for="todos" @click="()=>{timeFilter=null;showDateSelection=false}">{{ $t('i18n_todos') }}</label>

      <input
        id="24h"
        v-model="timeFilter"
        :value="24"
        type="radio"
        class="btn-check"
        name="btnradio"
        autocomplete="off"
      >
      <label class="btn btn-outline-primary" for="24h" @click="showDateSelection=false">{{ $t('i18n_ultima', 2) }} 24h</label>

      <input
        id="48h"
        v-model="timeFilter"
        :value="48"
        type="radio"
        class="btn-check"
        name="btnradio"
        autocomplete="off"
      >
      <label class="btn btn-outline-primary" for="48h" @click="showDateSelection=false">{{ $t('i18n_ultima', 2) }} 48h</label>

      <input
        id="1w"
        v-model="timeFilter"
        :value="120"
        type="radio"
        class="btn-check"
        name="btnradio"
        autocomplete="off"
      >
      <label class="btn btn-outline-primary" for="1w" @click="showDateSelection=false">{{ `${$t('i18n_ultima', 1)} ${$t('i18n_semana')}` }}</label>

      <input
        id="custom"
        type="radio"
        class="btn-check"
        name="btnradio"
        autocomplete="off"
      >
      <label class="btn btn-outline-primary" for="custom" @click="()=>{timeFilter=null;showDateSelection=true}">
        {{ $t('i18n_intervalo_de_datas') }}
      </label>
    </div>
    <div v-if="showDateSelection" id="dateAccordion" class="mt-4 accordion">
      <fut-button data-bs-toggle="collapse" data-bs-target="#collapseOne" class="btn-filter d-flex justify-content-between w-100 fw-bold">
        <p class="fw-bold mb-0">
          {{ $t('i18n_de') }}:
        </p>
        <p class="fw-bold mb-0">
          {{ formattedDate(startDate) }}
        </p>
        <font-awesome-icon class="icon text-white" :icon="['fas', 'calendar-day']" />
      </fut-button>
      <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#dateAccordion">
        <v-date-picker v-model="startDate" is-expanded is-dark color="gray" />
      </div>
      <fut-button data-bs-toggle="collapse" data-bs-target="#collapseTwo" class="btn-filter mt-1 d-flex justify-content-between w-100 fw-bold">
        <p class="fw-bold mb-0">
          {{ $t('i18n_ate') }}:
        </p>
        <p class="fw-bold mb-0">
          {{ formattedDate(endDate) }}
        </p>
        <font-awesome-icon class="icon text-white" :icon="['fas', 'calendar-day']" />
      </fut-button>
      <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#dateAccordion">
        <v-date-picker v-model="endDate" is-expanded is-dark color="gray" />
      </div>
      <fut-button
        class="btn-filter-success text-center mt-1 w-100"
        @click="()=>{$emit('changeFilter', {dateFrom: formattedDateQuery(startDate), dateTo: formattedDateQuery(endDate)})}"
      >
        <h5 class="fw-bold mb-0 py-2">
          {{ $t('i18n_mostrar_historico') }}
        </h5>
      </fut-button>
    </div>
    <div v-if="showDateSelection" class="my-3">
      <p class="text-white">
        <small>{{ $t('i18n_resultados_entre') }}: {{ formattedDate(startDate) }} {{ $t('i18n_e') }} {{ formattedDate(endDate) }}</small>
      </p>
    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs'
import FutButton from '@/components/default/atoms/FutButton.vue'
export default {
  components: { FutButton },
  props: {
    startSearchValue: {
      type: Number,
      default: null
    },
    startStartDate: Date,
    startEndDate: Date,
    list: {
      type: Array,
      default: () => ([])
    },
    field: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      timeFilter: null,
      showDateSelection: false,
      startDate: new Date(),
      endDate: new Date()
    }
  },
  watch: {
    timeFilter (value) {
      this.$emit('changeFilter', { hour: value })
    }
  },
  methods: {
    formattedDateQuery (date) {
      return dayjs(date).format('YYYY-MM-DD')
    },
    formattedDate (date) {
      return dayjs(date).format('DD/MM/YYYY')
    }
  }
}
</script>
<style scoped lang="scss">
  @import "@/assets/layout/breakpoints";
  @import "@/assets/layout/variables";
  .vc-container{
    border-radius: 0 !important;
  }
  .btn-group{
    label{
      border-radius: 0 !important;
    }
  }
  .btn-check:checked + .btn-outline-primary, .btn-check:active + .btn-outline-primary, .btn-outline-primary:active, .btn-outline-primary.active, .btn-outline-primary.dropdown-toggle.show{
    background-color: var(--fut-primary) !important;
    border-color: var(--fut-primary) !important;
    color: var(--white) !important
  }
  .btn-filter{
    border-color: #424b53;
    color: var(--white);
    outline: none !important;
    box-shadow: none !important;
    background-color: #3a4249;
  }
  .btn-filter:hover{
    background-color: #424b53;
  }
  .btn-filter-success{
    border-color: #176d1d;
    color: var(--white);
    outline: none !important;
    box-shadow: none !important;
    background-color: #47a14d;
  }
  .btn-filter-success:hover{
    background-color: #43be4c;
  }
</style>
