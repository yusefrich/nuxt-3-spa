<template>
  <fut-html-render v-if="getPromos">
    <h3>{{ $t('i18n_promocao', 2) }}</h3>
    <div class="row">
      <div v-for="content in getPromos" :key="'promo_page_'+content.id" class="col-md-4">
        <div class="fut-card-promo">
          <img style="object-fit: cover" height="150px" width="100%" :src="content.img" alt="">
          <div class="fut-card-body bg-nsx-dark p-3">
            <h4 class="fw-bold">
              {{ content.name }}
            </h4>
            <!-- eslint-disable-next-line -->
            <p v-html="shortText(content.text)" />
            <div class="d-flex justify-content-end">
              <nsx-fut-button class="nsx-button" @click="openModal(content.id)">
                {{ $t('i18n_ler_mais') }}
              </nsx-fut-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <fut-modal-nsx
      :open="modal.open"
      :title="$t('i18n_promocao', 1)"
      class="text-center"
      close
      @onExit="()=>modal.open = false"
      @onClose="()=>{ modal.open = false; pushQueryToRoute({})}"
    >
      <img style="object-fit: contain" height="200px" width="100%" :src="modal.img" alt="">
      <h3>{{ modal.name }}</h3>
      <!-- eslint-disable-next-line -->
      <div class="text-start mx-4" v-html="modal.text" />
    </fut-modal-nsx>
  </fut-html-render>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import FutModalNsx from '@/components/nsx/organisms/FutModalNsx.vue'
import FutHtmlRender from '@/components/default/atoms/FutHtmlRender.vue'
import NsxFutButton from '@/components/nsx/atoms/NsxFutButton.vue'

export default {
  name: 'NsxPromo',
  components: {
    FutModalNsx,
    FutHtmlRender,
    NsxFutButton
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
  async created () {
    await this.fetchPromos()

    if (this.$route.query.id) {
      this.openModal(+this.$route.query.id)
    }
  },
  methods: {
    ...mapActions({
      fetchPromos: 'promo/fetchPromos'
    }),
    shortText (str) {
      const stripped = str.replace(/<\/?[^>]+(>|$)/g, '')

      return stripped.substring(0, 100) + '...'// get first 5 chars
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
    pushQueryToRoute (query) {
      const q = this.complexToQueryString(query)
      const path = `${this.$route.path}?${q}`

      this.$router.push(this.localePath(path))
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

<style scoped lang="scss">
.bg-nsx-dark {
  background: var(--nsx-dark-1);
}
.nsx-button{
  background: linear-gradient(#ff8800,#ff6600);
  color: #fff;
  border: none;
  font-weight: 400;
  vertical-align: middle;
  border-radius: 5px !important;
  font-size: 14px;
  padding: 2px 10px;
  white-space: nowrap;
}
</style>
