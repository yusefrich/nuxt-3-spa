<template>
  <div>
    <sg-sidebar-icons />

    <sg-sidebar-menu
      v-model="showMenu"
    />
  </div>
</template>

<script>
import SgSidebarIcons from '@/components/sg/atoms/SgSidebarIcons.vue'
import SgSidebarMenu from '@/components/sg/atoms/SgSidebarMenu.vue'

export default {
  name: 'SgSidebar',
  components: {
    SgSidebarIcons,
    SgSidebarMenu
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    showMenu: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>
