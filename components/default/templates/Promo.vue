<template>
  <fut-html-render>
    <h3>{{ $t('i18n_promocao', 2) }}</h3>
    <div class="row">
      <div
        v-for="content in getPromos"
        :key="'promo_page_'+content.id"
        class="col-md-4"
      >
        <div class="fut-card-promo">
          <img
            style="object-fit: cover"
            height="150px"
            width="100%"
            :src="content.img"
          >
          <div class="fut-card-body bg-darkest p-3">
            <h4 class="fw-bold">
              {{ content.name }}
            </h4>
            <!-- eslint-disable-next-line -->
            <p v-html="shortText(content.text)" />
            <div class="d-flex justify-content-end">
              <fut-button primary class="fw-bold" @click="openModal(content.id)">
                {{ $t('i18n_ler_mais') }}
              </fut-button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <fut-modal
      class="text-center"
      :open="modal.open"
      :title="$t('i18n_promocao', 1)"
      @onClose="()=>{ modal.open = false; pushQueryToRoute({})}"
    >
      <img style="object-fit: contain" height="200px" width="100%" :src="modal.img" alt="">
      <h3 class="fut-color-dynamic">
        {{ modal.name }}
      </h3>
      <!-- eslint-disable-next-line -->
      <div class="text-start fut-color-dynamic" v-html="modal.text" />
    </fut-modal>
  </fut-html-render>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import FutHtmlRender from '@/components/default/atoms/FutHtmlRender.vue'
import FutButton from '@/components/default/atoms/FutButton.vue'
import FutModal from '@/components/default/organisms/FutModal.vue'

export default {
  name: 'Promo',
  components: {
    FutHtmlRender,
    FutButton,
    FutModal
  },
  data () {
    return {
      modal: {
        open: false,
        name: false,
        text: false,
        img: false
      }
    }
  },
  computed: {
    ...mapGetters({
      getPromos: 'promo/getPromos'
    })
  },
  created () {
    this.fetchPromos().then(() => {
      if (this.$route.query.id) {
        this.openModal(+this.$route.query.id)
      }
    })
  },
  methods: {
    ...mapActions({
      fetchPromos: 'promo/fetchPromos'
    }),
    pushQueryToRoute (query) {
      const q = this.complexToQueryString(query)
      const path = `${this.$route.path}?${q}`

      this.$router.push(this.localePath(path))
    },
    complexToQueryString (object, parentNode = null) {
      const query = Object.entries(object).map((item) => {
        const key = parentNode ? `${parentNode}[${item[0]}]` : item[0]
        const value = item[1]

        if (value instanceof Object) {
          return this.complexToQueryString(value, key)
        } else if (item[1] !== undefined) {
          return [
            Array.isArray(item[0]) ? `${key}[]` : key,
            encodeURIComponent(item[1])
          ].join('=')
        }

        return ''
      }).filter(empty => empty).join('&')

      return query
    },
    shortText (str) {
      const stripped = str.replace(/<\/?[^>]+(>|$)/g, '')

      return stripped.substring(0, 100) + '...'// get first 5 chars
    },
    openModal (objId) {
      const obj = this.getPromos.find(element => element.id === objId)

      if (!obj) {
        this.$toast.open({ message: 'Erro ao buscar promoção selecionada', type: 'error' })
        return
      }

      this.pushQueryToRoute({ id: obj.id })

      this.modal.open = true
      this.modal.name = obj.name
      this.modal.text = obj.text
      this.modal.img = obj.img
    }
  }
}
</script>
