<template>
  <div>
    <div class="btn-group filter-group overflow-auto" role="group" aria-label="Basic radio toggle button group">
      <input
        id="todos"
        v-model="searchValue"
        :value="0"
        type="radio"
        class="btn-check"
        name="btnradio"
        autocomplete="off"
      >
      <label class="btn btn-outline-primary px-2 py-1 me-1" for="todos">{{ $t('i18n_todos') }}</label>

      <input
        id="48h"
        v-model="searchValue"
        :value="2"
        type="radio"
        class="btn-check rounded"
        name="btnradio"
        autocomplete="off"
      >
      <label class="btn btn-outline-primary px-2 py-1 me-1 rounded" for="48h">48hs</label>

      <input
        id="1w"
        v-model="searchValue"
        :value="3"
        type="radio"
        class="btn-check"
        name="btnradio"
        autocomplete="off"
      >
      <label class="btn btn-outline-primary px-2 py-1 me-1" for="1w">{{ $t('i18n_semana') }}</label>

      <input
        id="custom"
        v-model="searchValue"
        :value="4"
        type="radio"
        class="btn-check"
        name="btnradio"
        autocomplete="off"
      >
      <label class="btn btn-outline-primary px-2 py-1 me-1" for="custom">{{ $t('i18n_data') }}</label>
    </div>
    <div v-if="searchValue === 4" class="row mt-2 mx-0">
      <div class="col-md-5 px-1 d-flex">
        <span class="mt-2 me-2 d-none d-md-inline"><small>{{ $t('i18n_de') }}:</small></span>
        <fut-input-group ref="birthdate" class="mt-1 mb-2" :validate="errors?errors:{}" name="birthdate">
          <fut-select
            v-if="dayOptions"
            v-model="startDateObj.day"
            :placeholder="$t('i18n_dia')"
            name="day"
            nsx-input
            style="width: 70px"
            :options="dayOptions"
            class="col-4 mx-0 px-0"
          />
          <fut-select
            v-if="monthOptions"
            v-model="startDateObj.month"
            :placeholder="$t('i18n_mes')"
            name="month"
            nsx-input
            style="width: 80px"
            :options="monthOptions"
            class="col-4 mx-0 px-2"
          />
          <fut-select
            v-if="yearOptions"
            v-model="startDateObj.year"
            :placeholder="$t('i18n_ano')"
            name="year"
            nsx-input
            style="width: 90px"
            :options="yearOptions"
            class="col-4 mx-0 px-0"
          />
        </fut-input-group>
      </div>
      <div class="col-md-6 px-1 d-flex">
        <span class="mt-2 me-2 d-none d-md-inline"><small>{{ $t('i18n_ate') }}:</small></span>
        <fut-input-group ref="birthdate" class="mt-1 mb-2" :validate="errors?errors:{}" name="birthdate">
          <fut-select
            v-if="dayOptions"
            v-model="endDateObj.day"
            :placeholder="$t('i18n_dia')"
            name="day"
            nsx-input
            style="width: 70px"
            :options="dayOptions"
            class="col-4 mx-0 px-0"
          />
          <fut-select
            v-if="monthOptions"
            v-model="endDateObj.month"
            :placeholder="$t('i18n_mes')"
            name="month"
            nsx-input
            style="width: 80px"
            :options="monthOptions"
            class="col-4 mx-0 px-2"
          />
          <fut-select
            v-if="yearOptions"
            v-model="endDateObj.year"
            :placeholder="$t('i18n_ano')"
            name="year"
            nsx-input
            style="width: 90px"
            :options="yearOptions"
            class="col-4 mx-0 px-0"
          />
        </fut-input-group>
        <div>
          <nsx-fut-button class="nsx-search" @click="updateFilter()">
            <font-awesome-icon class="icon" :icon="['fas', 'search']" />
          </nsx-fut-button>
        </div>
      </div>
    </div>
    <div v-if="searchValue === 4" id="dateAccordion" class="mt-4 accordion d-none">
      <nsx-fut-button data-bs-toggle="collapse" data-bs-target="#collapseOne" class="btn-filter d-flex justify-content-between w-100 fw-bold">
        <p class="fw-bold mb-0">
          {{ $t('i18n_de') }}:
        </p>
        <p class="fw-bold mb-0">
          {{ formattedDate(startDate) }}
        </p>
        <font-awesome-icon class="icon text-white" :icon="['fas', 'calendar-day']" />
      </nsx-fut-button>
      <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#dateAccordion">
        <v-date-picker v-model="startDate" is-expanded is-dark color="gray" />
      </div>
      <nsx-fut-button data-bs-toggle="collapse" data-bs-target="#collapseTwo" class="btn-filter mt-1 d-flex justify-content-between w-100 fw-bold">
        <p class="fw-bold mb-0">
          {{ $t('i18n_ate') }}:
        </p>
        <p class="fw-bold mb-0">
          {{ formattedDate(endDate) }}
        </p>
        <font-awesome-icon class="icon text-white" :icon="['fas', 'calendar-day']" />
      </nsx-fut-button>
      <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#dateAccordion">
        <v-date-picker v-model="endDate" is-expanded is-dark color="gray" />
      </div>
      <nsx-fut-button class="btn-filter-success text-center mt-1 w-100" @click="searchValue = 5">
        <h5 class="fw-bold mb-0 py-2">
          {{ $t('i18n_mostrar_historico') }}
        </h5>
      </nsx-fut-button>
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
import NsxFutButton from '@/components/nsx/atoms/NsxFutButton'
import FutSelect from '@/components/default/atoms/FutSelect'
import FutInputGroup from '@/components/default/atoms/FutInputGroup'
export default {
  components: { NsxFutButton, FutSelect, FutInputGroup },
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
      startDateObj: {
        day: null,
        month: null,
        year: null
      },
      endDateObj: {
        day: null,
        month: null,
        year: null
      },
      startDate: new Date(),
      endDate: new Date(),
      dayOptions: [
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '3', value: 3 },
        { label: '4', value: 4 },
        { label: '5', value: 5 },
        { label: '6', value: 6 },
        { label: '7', value: 7 },
        { label: '8', value: 8 },
        { label: '9', value: 9 },
        { label: '10', value: 10 },
        { label: '11', value: 11 },
        { label: '12', value: 12 },
        { label: '13', value: 13 },
        { label: '14', value: 14 },
        { label: '15', value: 15 },
        { label: '16', value: 16 },
        { label: '17', value: 17 },
        { label: '18', value: 18 },
        { label: '19', value: 19 },
        { label: '20', value: 20 },
        { label: '21', value: 21 },
        { label: '22', value: 22 },
        { label: '23', value: 23 },
        { label: '24', value: 24 },
        { label: '25', value: 25 },
        { label: '26', value: 26 },
        { label: '27', value: 27 },
        { label: '28', value: 28 },
        { label: '29', value: 29 },
        { label: '30', value: 30 },
        { label: '31', value: 31 }
      ],
      monthOptions: [
        { label: '1', value: 0 },
        { label: '2', value: 1 },
        { label: '3', value: 2 },
        { label: '4', value: 3 },
        { label: '5', value: 4 },
        { label: '6', value: 5 },
        { label: '7', value: 6 },
        { label: '8', value: 7 },
        { label: '9', value: 8 },
        { label: '10', value: 9 },
        { label: '11', value: 10 },
        { label: '12', value: 11 }
      ],
      yearOptions: null
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
          this.startDate = new Date(this.startDateObj.year, this.startDateObj.month, this.startDateObj.day)
          this.endDate = new Date(this.endDateObj.year, this.endDateObj.month, this.endDateObj.day)
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
    const years = []
    for (let i = new Date().getFullYear(); i > 1900; i--) {
      years.push({ label: i, value: i })
    }
    this.yearOptions = years
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
    updateFilter () {
      this.startDate = new Date(this.startDateObj.year, this.startDateObj.month, this.startDateObj.day)
      this.endDate = new Date(this.endDateObj.year, this.endDateObj.month, this.endDateObj.day)
      this.changeFilter({ startDate: new Date(dayjs(this.startDate).set('hour', 0)), endDate: this.endDate })
    },
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
  .nsx-search{
    background-color: #ec453c;
    border-color: #ec453c;
    color: #dbdbdb;
    border-radius: 5px !important;
    padding: 1px 5px !important;
    margin-top: 4px;
    margin-left: 7px;
  }
  .vc-container{
    border-radius: 0 !important;
  }
  .btn-check:checked + .btn-outline-primary, .btn-check:active + .btn-outline-primary, .btn-outline-primary:active, .btn-outline-primary.active, .btn-outline-primary.dropdown-toggle.show{
    background-color: #ec453c !important;
    border-color: #ec453c !important;
    color: #dbdbdb !important;
    border-radius: 5px !important;
  }
  .btn-outline-primary{
    border-radius: 5px !important;
    background-color: #6c757d;
    border-color: #6c757d;
    font-size: 14px !important;
  }
  .btn-outline-primary:hover{
    background-color: #5a6268;
    border-color: #5a6268;
  }
  .btn-filter{
    border-radius: 5px !important;
    padding: 0 !important;
    border-color: #424b53;
    color: #dbdbdb;
    outline: none !important;
    box-shadow: none !important;
    background-color: #3a4249 !important;
  }
  .btn-filter:hover{
    background-color: #5a6268 !important;
  }
  .btn-filter-success{
    border-color: #176d1d;
    color: var(--white);
    outline: none !important;
    box-shadow: none !important;
    background-color: #47a14d;
  }
  .btn-filter-success:hover{
    background-color: #5a6268 !important;
    border-color: #5a6268 !important;
  }
  .rounded{
    border-radius: 5px !important;
  }
</style>
