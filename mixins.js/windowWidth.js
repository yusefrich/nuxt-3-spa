export default {
  data () {
    return {
      width: null,
      skContentWidth: null,
      skEl: null
    }
  },
  mounted () {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()

    this.skEl = document.querySelector('.sk-content')
  },
  destroyed () {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize () {
      this.width = window.screen.width

      if (this.skEl) {
        this.skContentWidth = this.skEl.offsetWidth
      }
    }
  }
}
