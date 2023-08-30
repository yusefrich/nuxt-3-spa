<template>
  <div class="d-flex selection-container">
    <div class="mt-2 mt-md-0">
      <fb-fut-button
        class="btn-sport-select transition"
        :class="{active:selected===null}"
        block
        @click="()=>{selected=null; $emit('selectSport', null)}"
      >
        <span class="transition mr-10">{{ $t('i18n_tudo').toUpperCase() }}</span>
      </fb-fut-button>
    </div>
    <div v-for="(sport, index) in sports" :key="'sports_return_select_'+index" class="mt-2 sport-btn mt-md-0">
      <fb-fut-button
        :class="{active:selected===sport.id}"
        :disabled="!sport.active"
        block
        class="btn-sport-select transition"
        @click="()=>{selected=sport.id; $emit('selectSport', sport.id)}"
      >
        <img v-if="sport.id === 6046" class="ml-1 me-2" src="/FbIcons/1.png">
        <img v-if="sport.id === 48242" class="ml-1 me-2" src="/FbIcons/6.png">
        <img v-if="sport.id === 154919" class="ml-1 me-2" src="/FbIcons/69.png">
        <img v-if="sport.id === 54094" class="ml-1 me-2" src="/FbIcons/3.png">
        <img v-if="sport.id === 265917" class="ml-1 me-2" src="/FbIcons/19.png">
        <img v-if="sport.id === 154830" class="ml-1 me-2" src="/FbIcons/4.png">
        <img v-if="sport.id === 621569" class="ml-1 me-2" src="/FbIcons/60.png">
        <img v-if="sport.id === 35709" class="ml-1 me-2" src="/FbIcons/5.png">
        <img v-if="sport.id === 154914" class="ml-1 me-2" src="/FbIcons/23.png">
        <img v-if="sport.id === 687890" class="ml-1 me-2" src="/FbIcons/95.png">
        <img v-if="sport.id === 131506" class="ml-1 me-2" src="/FbIcons/2.png">
        <span class="sport-name transition nowrap fut-color-dynamic">{{ sport.name }}</span>
        <span class="count-sport fut-color-dynamic">{{ sport.total }}</span>
      </fb-fut-button>
    </div>
  </div>
</template>
<script>
import global from '@/mixins.js/global.js'
import FbFutButton from '@/components/fb/atoms/FbFutButton'

export default {
  components: { FbFutButton },
  mixins: [global],
  props: {
    sports: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      selected: null
    }
  }
}
</script>
<style lang="scss" scoped>
.selection-container{
  overflow: auto;
}
.sport-btn {
  margin-right: 1px;
}
.btn-sport-select{
  color: white;
  padding: 5px 9px;
  font-size: 11px;
  background: var(--fut-background-black);
  text-transform: uppercase;
  white-space: nowrap;
  .sport-name{
    max-width: 0;
    opacity: 0;
    vertical-align: middle;
    display: inline-block;
    overflow: hidden;
  }
  &.active{
    .sport-name{
      max-width: 200px;
      opacity: 1;
      padding-right: 10px;
      // color: black;
    }
    background-image: linear-gradient(
      to right,
      var(--fut-primary-black),
      var(--fut-primary)
    );
    color: black;
  }
  &:hover{
    .sport-name{
      max-width: 200px;
      opacity: 1;
      padding-right: 10px;
      // color: black;
    }
    color: var(--fut-primary);
  }
}
</style>
