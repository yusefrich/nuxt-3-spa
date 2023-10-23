<template>
  <div>
    <sg-sidebar-icons />

    <sg-sidebar-menu
      v-model="showMenu"
    />
  </div>
</template>

<script>
import SgSidebarIcons from '@/components/sg/atoms/SgSidebarIcons'
import SgSidebarMenu from '@/components/sg/atoms/SgSidebarMenu'

export default {
  name: 'SgSidebar',
  components: {
    SgSidebarIcons,
    SgSidebarMenu
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'update:modelValue'
  ],
  computed: {
    showMenu: {
      get () {
        return this.modelValue
      },
      set (value) {
        this.$emit('update:modelValue', value)
      }
    }
  }
}
</script>
