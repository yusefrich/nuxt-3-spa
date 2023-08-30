<template>
  <div :id="name" />
</template>
<script>
export default {
  props: {
    id: {
      type: Number,
      default: null
    },
    statscoreConfig: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: 'myWidget'
    }
  },
  mounted () {
    // Hook up when library is loaded and ready to use.
    // You can use this method as many times as necessary - if library
    // is already loaded provided callback will fire immediately
    // console.log(window)
    window.STATSCOREWidgets.onLoad((err) => {
      if (err) {
        switch (err.type) {
          case 'NetworkError':
            // Handle network error here
            /* eslint-disable-next-line */
            console.error('network error', err)
            break
          case 'BrowserNotSupported':
            // Handle unsupported browser here
            /* eslint-disable-next-line */
            console.error('browser not supported', err)
            break
        }
        return
      }
      // Widget will be appended to this HTMLElement.
      //
      // If you are using framework then follow its documentation
      // on how to get DOM Element from your component.
      // Vue.js https://vuejs.org/v2/api/#ref
      // React https://en.reactjs.org/docs/refs-and-the-dom.html
      // Angular https://angular.io/api/core/ElementRef
      const element = document.getElementById(this.name)
      // Configuration that you should receive from STATSCORE
      const configurationId = this.statscoreConfig
      // Input data for widget type you want to embded
      const inputData = { eventId: this.id, language: 'br' }
      // const inputData = { eventId: 4325774, language: 'br' }
      // Optional object with options.
      // You can check available options further in the docs.
      const options = {}
      const widget = new window.STATSCOREWidgets.WidgetGroup(element, configurationId, inputData, options)
      /* eslint-disable-next-line */
      console.log('window here', {window, widget})
    })
  }
}
</script>
<style lang="scss" scoped>
  .field{
    position: fixed;
    top: 0;
  }
</style>
