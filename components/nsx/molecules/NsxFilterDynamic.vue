<template>
  <div>
    <div class="btn-group filter-group overflow-auto" role="group" aria-label="Basic radio toggle button group">
      <input
        id="todos"
        v-model="timeFilter"
        :value="null"
        type="radio"
        class="btn-check"
        name="btnradio"
        autocomplete="off"
      >
      <label
        class="btn btn-outline-primary px-2 py-1 me-1"
        for="todos"
        @click="()=>{timeFilter=null;showDateSelection=false}"
      >
        {{ $t('i18n_todos') }}
      </label>

      <input
        id="48h"
        v-model="timeFilter"
        :value="48"
        type="radio"
        class="btn-check rounded"
        name="btnradio"
        autocomplete="off"
      >
      <label class="btn btn-outline-primary px-2 py-1 me-1 rounded" for="48h" @click="showDateSelection=false">48hs</label>

      <input
        id="1w"
        v-model="timeFilter"
        :value="120"
        type="radio"
        class="btn-check"
        name="btnradio"
        autocomplete="off"
      >
      <label class="btn btn-outline-primary px-2 py-1 me-1" for="1w" @click="showDateSelection=false">{{ $t('i18n_semana') }}</label>

      <input
        id="custom"
        type="radio"
        class="btn-check"
        name="btnradio"
        autocomplete="off"
      >
      <label
        class="btn btn-outline-primary px-2 py-1 me-1"
        for="custom"
        @click="()=>{timeFilter=null;showDateSelection=true}"
      >
        {{ $t('i18n_data') }}
      </label>
    </div>
    <div v-if="showDateSelection" class="row mt-2 mx-0">
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
            :options="yearOptions"
            :placeholder="$t('i18n_ano')"
            name="year"
            nsx-input
            style="width: 90px"
            class="col-4 mx-0 px-0"
          />
        </fut-input-group>
        <div>
          <nsx-fut-button class="nsx-search" @click="()=>{updateFilter()}">
            <font-awesome-icon class="icon" :icon="['fas', 'search']" />
          </nsx-fut-button>
        </div>
      </div>
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
import NsxFutButton from '@/components/nsx/atoms/NsxFutButton'
import FutSelect from '@/components/default/atoms/FutSelect'
import FutInputGroup from '@/components/default/atoms/FutInputGroup'
export default {
  components: {
    NsxFutButton,
    FutSelect,
    FutInputGroup
  },
  data () {
    return {
      timeFilter: null,
      showDateSelection: false,
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
    timeFilter (value) {
      this.$emit('changeFilter', { hour: value })
    }
  },
  methods: {
    updateFilter () {
      this.startDate = new Date(this.startDateObj.year, this.startDateObj.month, this.startDateObj.day)
      this.endDate = new Date(this.endDateObj.year, this.endDateObj.month, this.endDateObj.day)
      this.$emit('changeFilter', { dateFrom: dayjs(this.startDate).format('YYYY-MM-DD'), dateTo: dayjs(this.endDate).format('YYYY-MM-DD') })
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
