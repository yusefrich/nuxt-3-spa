<template>
  <footer>
    <div class="container">
      <div class="footer-content" :class="{ 'mb': isMobile }">
        <div class="links">
          <div class="block">
            <p class="title">
              {{ $t('i18n_esporte', 2) }}
            </p>
            <ul>
              <li>
                <n-link :to="localePath('/')" class="link">
                  {{ $t('i18n_pagina_inicial') }}
                </n-link>
              </li>
              <li>
                <n-link :to="localePath('/sports?tab=SkLive')" class="link">
                  {{ $t('i18n_esportes_ativos') }}
                </n-link>
              </li>
              <li>
                <n-link :to="localePath('/regras-gerais')" class="link">
                  {{ $t('i18n_regras_esportivas') }}
                </n-link>
              </li>
            </ul>
          </div>
          <div class="block">
            <p class="title">
              {{ $t('i18n_cassino') }}
            </p>
            <ul>
              <li>
                <n-link :to="localePath('/casino')" class="link">
                  {{ $t('i18n_jogos') }}
                </n-link>
              </li>
              <li>
                <n-link :to="localePath('/promo')" class="link">
                  {{ $t('i18n_promocao', 2) }}
                </n-link>
              </li>
            </ul>
          </div>
          <div class="block">
            <p class="title">
              {{ $t('i18n_suporte') }}
            </p>
            <ul>
              <li>
                <n-link :to="localePath('/imparcialidade')" class="link">
                  {{ $t('i18n_imparcialidade') }}
                </n-link>
              </li>
              <li>
                <n-link :to="localePath('/affiliates')" class="link">
                  {{ $t('i18n_afiliados') }}
                </n-link>
              </li>
              <li>
                <n-link :to="localePath('/jogo-responsavel')" class="link">
                  {{ $t('i18n_jogo_responsavel') }}
                </n-link>
              </li>
              <li>
                <n-link :to="localePath('/suporte')" class="link">
                  {{ $t('i18n_suporte') }}
                </n-link>
              </li>
              <li>
                <n-link :to="localePath('/help')" class="link">
                  {{ $t('i18n_ajuda') }}
                </n-link>
              </li>
            </ul>
          </div>
          <div class="block">
            <p class="title">
              {{ $t('i18n_comunidade') }}
            </p>
            <ul>
              <li>
                <a
                  v-if="currentSettings && currentSettings.fb"
                  :href="currentSettings.fb"
                  class="link"
                  target="_blank"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  v-if="currentSettings && currentSettings.tt"
                  :href="currentSettings.tt"
                  class="link"
                  target="_blank"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  v-if="currentSettings && currentSettings.insta"
                  :href="currentSettings.insta"
                  class="link"
                  target="_blank"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  v-if="currentSettings && currentSettings.yt"
                  :href="currentSettings.yt"
                  class="link"
                  target="_blank"
                >
                  YouTube
                </a>
              </li>
              <li>
                <a
                  v-if="currentSettings && currentSettings.phone"
                  :href="'tel:'+currentSettings.phone"
                  class="link"
                  target="_blank"
                >
                  {{ $t('i18n_contato') }}
                </a>
              </li>
              <li>
                <a
                  v-if="currentSettings && currentSettings.whats"
                  :href="'https://wa.me/'+currentSettings.whats"
                  class="link"
                  target="_blank"
                >
                  Whastapp
                </a>
              </li>
              <li>
                <a
                  v-if="currentSettings && currentSettings.telegram"
                  :href="'https://t.me/'+currentSettings.telegram"
                  class="link"
                  target="_blank"
                >
                  Telegram
                </a>
              </li>
              <li>
                <a
                  v-if="currentSettings && currentSettings.tiktok"
                  :href="currentSettings.tiktok"
                  class="link"
                  target="_blank"
                >
                  TikTok
                </a>
              </li>
            </ul>
          </div>
          <div class="block">
            <p class="title">
              {{ $t('i18n_sobre_nos') }}
            </p>
            <ul>
              <li>
                <n-link :to="localePath('/privacidade')" class="link">
                  {{ $t('i18n_politica_de_privacidade') }}
                </n-link>
              </li>
              <li>
                <n-link :to="localePath('/aml')" class="link">
                  {{ $t('i18n_politica_aml') }}
                </n-link>
              </li>
              <li>
                <n-link :to="localePath('/termos-e-condicoes')" class="link">
                  {{ $t('i18n_termos_e_condicoes') }}
                </n-link>
              </li>
              <li>
                <n-link :to="localePath('/auto-exclusao')" class="link">
                  {{ $t('i18n_auto_exclusion') }}
                </n-link>
              </li>
            </ul>
          </div>
          <div class="block">
            <p class="title">
              {{ $t('i18n_idioma') }}
            </p>
            <ul>
              <li>
                <sk-lang-switcher
                  flat
                  @changeLanguage="$emit('changeLanguage', $event)"
                />
              </li>
            </ul>
          </div>
        </div>
        <div class="hr" />
        <div class="curacao-infos">
          <div v-if="curacaoKey" style="width: 370px" class="me-4">
            <div
              :id="'apg-' + curacaoKey"
              :data-apg-seal-id="curacaoKey"
              data-apg-image-size="370"
              data-apg-image-type="basic-light-large"
            />
          </div>
          <div
            v-if="curacaoIframeSrc"
            :class="[currentSettings && currentSettings.copyright ? 'me-4' : 'w-100 text-center']"
          >
            <iframe
              :src="curacaoIframeSrc"
              width="150"
              height="50"
              style="border:none;"
            />
          </div>
          <div>
            <!-- eslint-disable -->
            <p
              v-if="currentSettings && currentSettings.copyright"
              v-html="htmlDecode(currentSettings.copyright)"
              style="font-size: 14px"
              class="copyright text-center m-0"
            />
            <!-- eslint-enable -->
          </div>
        </div>
        <div class="hr" />
        <div
          v-if="currentSettings && currentSettings.sponsors && currentSettings.sponsors.length > 0"
          class="sponsor"
        >
          <h5 class="text-white text-center fut-color-dynamic">
            {{ $t('i18n_patrocinador_oficial') }}:
          </h5>
          <div v-if="currentSettings.footer_style === 2">
            <img
              v-for="(spon, index) in currentSettings.sponsors"
              :key="'sponsor_img_'+index"
              :src="spon.img"
              class="style-sponsors-2"
            >
          </div>
          <div v-else class="d-flex justify-content-center">
            <img
              v-for="(spon, index) in currentSettings.sponsors"
              :key="'sponsor_img_' + index"
              :src="spon.img"
              width="100%"
              class="ms-3 mr-3 style-sponsors"
            >
          </div>
        </div>
        <div
          v-if="currentSettings && currentSettings.footer_imgs"
          class="d-flex justify-content-evenly"
          style="flex-wrap: wrap"
        >
          <fb-fut-button
            v-for="imgs in currentSettings.footer_imgs"
            :key="'data_img_'+imgs.key"
            :to="imgs.link"
          >
            <img
              :src="imgs.img"
              height="90"
              width="90"
              class="img-content"
            >
          </fb-fut-button>
        </div>
        <div class="hr" />
        <div class="d-grid justify-content-center">
          <span class="text-white fs-4 my-2">{{ $t('i18n_pagamento') }}</span>
          <img class="pix-style" src="/img/pix.png">
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import SkLangSwitcher from '@/components/sk/molecules/SkLangSwitcher.vue'

export default {
  name: 'SkFooter',
  components: {
    SkLangSwitcher
  },
  props: {
    currentSettings: {
      type: Object,
      default: () => ({})
    },
    curacaoIframeSrc: {
      type: String,
      default: null
    },
    curacaoKey: {
      type: String,
      default: null
    },
    curacaoFunc: {
      type: String,
      default: null
    },
    isMobile: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    htmlDecode (input) {
      const doc = new DOMParser().parseFromString(input, 'text/html')
      return doc.documentElement.textContent
    }
  }
}
</script>

<style lang="scss" scoped>
footer {
  background: var(--fut-background-black);
  color: var(--fut-color-dynamic);
  padding: 2rem 0;
  margin-top: 32px;
}

.container {
  padding: 0 3vw !important;
}

.footer-content {
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-gap: 2rem;

  .links {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(auto-fit,minmax(14ch,1fr));
    width: 100%;
    margin: 0 auto;
    overflow-wrap: break-word;
    word-wrap: break-word;
    -webkit-hyphens: auto;
    hyphens: auto;

    .block {
      display: grid;
      grid-gap: .5rem;
      align-content: flex-start;

      .title {
        color: var(--fut-color-dynamic);
        font-size: 1rem;
        font-weight: 600;
        margin: 0;
      }

      ul {
        margin: 0;
        padding: 0;
        list-style: none;

        .link {
          text-decoration: none;
          color: var(--fut-secondary);
          font-size: .875rem;
          font-weight: 600;
          transition: all ease-in-out 300ms;
          cursor: pointer;

          &:hover {
            color: var(--fut-color-dynamic);
          }
        }
      }
    }
  }

  .hr {
    border-top: 2px solid var(--fut-background-lighter);
  }

  .curacao-infos {
    .copyright {
      color: var(--fut-secondary);
      font-size: .75rem;
      font-weight: 400;
    }
  }

  .sponsor {
    .style-sponsors {
      width: 70px;
      height: 70px;
      object-fit: contain;
    }

    .style-sponsors-2 {
      width: 100%;
    }
  }
}
.img-content{
  object-fit: contain;
}
.pix-style {
  filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(49deg) brightness(300%) contrast(104%);
  width: 100px;
}
.mb {
  margin-bottom: 68px;
}
</style>
