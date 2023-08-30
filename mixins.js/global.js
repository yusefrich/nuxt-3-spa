export default {
  data () {
    return {
      currentScroll: 0
    }
  },
  mounted () {
    window.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    onScroll (e) {
      this.currentScroll = e.target.documentElement.scrollTop
    }
  }
}
