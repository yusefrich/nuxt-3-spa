<template>
  <div>
    <div class="btn-group w-100 filter-group overflow-auto" role="group" aria-label="Basic radio toggle button group">
      <input
        id="todos"
        v-model="searchValue"
        :value="0"
        type="radio"
        class="btn-check"
        name="btnradio"
        autocomplete="off"
      >
      <label class="btn btn-outline-primary" for="todos">{{ $t('i18n_todos') }}</label>

      <input
        id="24h"
        v-model="searchValue"
        :value="1"
        type="radio"
        class="btn-check"
        name="btnradio"
        autocomplete="off"
      >
      <label class="btn btn-outline-primary" for="24h">{{ $tc('i18n_ultima', 2) }} 24h</label>

      <input
        id="48h"
        v-model="searchValue"
        :value="2"
        type="radio"
        class="btn-check"
        name="btnradio"
        autocomplete="off"
      >
      <label class="btn btn-outline-primary" for="48h">{{ $tc('i18n_ultima', 2) }} 48h</label>

      <input
        id="1w"
        v-model="searchValue"
        :value="3"
        type="radio"
        class="btn-check"
        name="btnradio"
        autocomplete="off"
      >
      <label class="btn btn-outline-primary" for="1w">{{ `${$tc('i18n_ultima', 1)} ${$t('i18n_semana')}` }}</label>

      <input
        id="custom"
        v-model="searchValue"
        :value="4"
        type="radio"
        class="btn-check"
        name="btnradio"
        autocomplete="off"
      >
      <label class="btn btn-outline-primary" for="custom">{{ $t('i18n_intervalo_de_datas') }}</label>
    </div>
    <div v-if="searchValue === 4" id="dateAccordion" class="mt-4 accordion">
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
      <fut-button class="btn-filter-success text-center mt-1 w-100" @click="searchValue = 5">
        <h5 class="fw-bold mb-0 py-2">
          {{ $t('i18n_mostrar_historico') }}
        </h5>
      </fut-button>
    </div>
    <div v-if="searchValue === 5" class="my-3">
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
      searchValue: 0,
      startDate: new Date(),
      endDate: new Date()
    }
  },
  watch: {
    searchValue (value) {
      switch (value) {
        case 0:
          // * all
          this.changeFilter({ startDate: null, endDate: null })
          break
        case 1:
          // * last 24h
          this.startDate = new Date(dayjs().subtract(1, 'day').set('hour', 0))
          this.endDate = new Date(dayjs())
          this.changeFilter({ startDate: this.startDate, endDate: this.endDate })
          break
        case 2:
          // * last 48h
          this.startDate = new Date(dayjs().subtract(2, 'day').set('hour', 0))
          this.endDate = new Date(dayjs())
          this.changeFilter({ startDate: this.startDate, endDate: this.endDate })
          break
        case 3:
          // * last week
          this.startDate = new Date(dayjs().subtract(1, 'week').set('hour', 0))
          this.endDate = new Date(dayjs())
          this.changeFilter({ startDate: this.startDate, endDate: this.endDate })
          break
        case 4:
          // * show custom input
          this.startDate = new Date(dayjs().subtract(1, 'day').set('hour', 0))
          this.endDate = new Date(dayjs())
          break
        case 5:
          // * custom
          this.changeFilter({ startDate: new Date(dayjs(this.startDate).set('hour', 0)), endDate: this.endDate })
          break
        default:
          // * all
          this.changeFilter({ startDate: null, endDate: null })
          break
      }
    }
  },
  mounted () {
    this.startDate = new Date(dayjs().subtract(1, 'day'))
    if (this.startSearchValue) {
      this.searchValue = this.startSearchValue
    }
    if (this.startStartDate) {
      this.startDate = this.startStartDate
    }
    if (this.startEndDate) {
      this.endDate = this.startEndDate
    }
  },
  methods: {
    changeFilter (filter) {
      let filtered = []
      if (!filter.startDate && !filter.endDate) {
        filtered = this.list
        this.$emit('updateList', filtered)
        return
      }
      this.list.forEach((e) => {
        let fieldDate = null
        if (e[this.field].includes('/')) {
          fieldDate = new Date(e[this.field].split('/')[2].split(' ')[0] + '-' + e[this.field].split('/')[1] + '-' + e[this.field].split('/')[0])
        } else {
          fieldDate = new Date(e[this.field])
        }
        if (Date.parse(fieldDate) >= Date.parse(filter.startDate) && Date.parse(fieldDate) <= Date.parse(filter.endDate)) {
          filtered.push(e)
        }
      })
      this.$emit('updateList', filtered)
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
