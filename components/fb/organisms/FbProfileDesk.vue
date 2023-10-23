<template>
  <div class="section-details w-100">
    <div class="row mx-4 my-2">
      <div class="col-3 py-1 section-details-header">
        <div
          v-for="(item, idx) in options"
          :key="idx"
          class="my-4 option fut-color-dynamic"
          @click="currentComp = item.comp"
        >
          <div :class="{active: item.comp == currentComp}">
            <font-awesome-icon :class="item.margin" :icon="['fas', item.icon]" />
            <span>{{ item.text }}</span>
          </div>
        </div>
      </div>
      <div class="vertical-border mt-4" />
      <div class="col">
        <keep-alive>
          <component
            :is="currentComp"
            :logged-in-user="loggedInUser"
            :fetched-address="fetchedAddress"
            :load="onboardAuthLoad"
            :error="onboardAuthError"
            @updateData="$emit('updateData', $event)"
            @searchAddress="$emit('searchAddress', $event)"
            @updatePassword="$emit('updatePassword', $event)"
          />
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import PersonalData from '@/components/fb/molecules/FbPersonalData'
import AddressData from '@/components/fb/molecules/FbAddressData'
import PreferencesData from '@/components/fb/molecules/FbPreferencesData'
import PasswordData from '@/components/fb/molecules/FbPasswordData'

export default {
  name: 'FbPerfilDesk',
  components: {
    PersonalData,
    AddressData,
    PreferencesData,
    PasswordData
  },
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
      type: Object,
      default: () => ({})
    },
    fetchedAddress: {
      type: Object,
      default: () => ({})
    }
  },
  emits: [
    'updateData',
    'searchAddress',
    'updatePassword'
  ],
  data () {
    return {
      currentComp: 'PersonalData'
    }
  },
  computed: {
    options () {
      return [
        {
          icon: 'address-book',
          margin: 'mr-14',
          text: this.$t('i18n_detalhes_gerais'),
          comp: 'PersonalData'
        },
        {
          icon: 'address-card',
          margin: 'mr-10',
          text: this.$t('i18n_endereco'),
          comp: 'AddressData'
        },
        {
          icon: 'user-cog',
          margin: 'mr-8',
          text: this.$t('i18n_preferencias'),
          comp: 'PreferencesData'
        },
        {
          icon: 'lock',
          margin: 'mr-14',
          text: this.$t('i18n_senha'),
          comp: 'PasswordData'
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.section-details {
  background-color: var(--fut-background-darker);
  border-radius: 3px;
  color: #FFF;
  min-height: 500px;
}
.vertical-border {
  width: 2px;
  height: 430px;
  padding: 0;
  background-color: var(--fut-background-lighter);
}
.option {
  cursor: pointer;
}
.active {
  width: 90%;
  border-bottom: 1px solid #FFF;
}
</style>
