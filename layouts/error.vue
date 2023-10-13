<template>
  <div class="error">
    <main class="container">
      <section class="info">
        <img
          :src="currentSettings.logo"
          width="200"
          alt="Logo"
        >
        <p class="subtitle">
          {{ $t('i18n_houve_um_erro') }}
        </p>
        <p class="error-desc">
          Error - {{ error.statusCode }}<br>
          {{ error.message }}
        </p>
        <p class="contact mb-2">
          {{ $t('i18n_tem_alguma_duvida') }}
        </p>
        <div class="contact">
          <a
            v-if="currentSettings && currentSettings.fb"
            :href="currentSettings.fb"
            class="text-decoration-none d-block"
            target="_blank"
          >
            <font-awesome-icon class="me-2" :icon="['fab', 'facebook']" />
          </a>
          <a
            v-if="currentSettings && currentSettings.insta"
            :href="currentSettings.insta"
            class="text-decoration-none d-block"
            target="_blank"
          >
            <font-awesome-icon class="me-2" :icon="['fab', 'instagram']" />
          </a>
          <a
            v-if="currentSettings && currentSettings.phone"
            :href="'tel:'+currentSettings.phone"
            class="text-decoration-none d-block"
            target="_blank"
          >
            <font-awesome-icon class="me-2" :icon="['fas', 'phone']" />
          </a>

          <a
            v-if="currentSettings && currentSettings.whats"
            :href="'https://wa.me/'+currentSettings.whats"
            class="text-decoration-none d-block"
            target="_blank"
          >
            <font-awesome-icon class="me-2" :icon="['fab', 'whatsapp']" />
          </a>
        </div>
      </section>
      <section class="img">
        <img
          src="/error-img.png"
          class="w-100"
          alt="Ilustrative image"
        >
      </section>
    </main>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useSettingsStore } from '@/stores/settings'

export default {
  name: 'Error',
  layout: 'blank',
  props: {
    error: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    ...mapState(useSettingsStore, {
      currentSettings: 'currentSettings'
    }),
  },
  created () {
    this.fetchSettings()
  },
  methods: {
    ...mapActions(useSettingsStore, {
      fetchSettings: 'fetchSettings'
    })
  }
}
</script>

<style lang="scss" scoped>
.error {
  width: 100vw;
  height: 100vh;
  background: #E0E4EA;

  .container {
    display: flex;
    align-items: center;
    height: 100%;

    .info {
      width: 50%;

      .subtitle {
        margin: 25px 0 30px 0;
        font-weight: 700;
        color: #898A8E;
      }
      .error-desc {
        margin-bottom: 60px;
        font-size: 18px;
      }
      .contact {
        font-weight: 700;
        font-size: 18px;
        display: flex;
      }
    }
    .img {
      width: 50%;
    }
  }
}

@media (max-width: 425px) {
  .container {
    flex-direction: column;
    justify-content: center;
    .info, .img {
      width: 90% !important;
    }
  }
}
</style>
