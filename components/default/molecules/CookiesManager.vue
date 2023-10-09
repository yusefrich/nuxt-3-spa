<template>
  <div class="overlay">
    <div class="bar d-flex justify-content-center">
      <div class="bar-content">
        <div class="infos mb-3">
          <p><strong>{{ $t('i18n_nos_valorizamos_a_sua') }}</strong></p>
          <!-- eslint-disable-next-line -->
          <p class="desc">{{ $t('i18n_ao_aceitar_todos_os_cookies') }} <NuxtLink :to="localePath(cookiesPolicy)" class="text-black">{{ $t('i18n_consulte_a_nossa_politica') }}</NuxtLink></p>
        </div>
        <div class="actions">
          <button
            class="necessary"
            @click="$emit('acceptCookies', 'necessary')"
          >
            {{ $t('i18n_apenas_necessario') }}
          </button>
          <button
            class="all"
            @click="$emit('acceptCookies', 'all')"
          >
            {{ $t('i18n_aceitar_todos') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FbCookiesManager',
  props: {
    currentLayout: {
      type: String,
      default: 'default'
    }
  },
  emits: [
    'acceptCookies'
  ],
  computed: {
    cookiesPolicy () {
      const redirect = {
        default: '/cookies',
        fb: '/help?slug=cookies',
        nsx: '/regras-gerais-slim'
      }

      return redirect[this.currentLayout]
    }
  }
}
</script>

<style scoped lang="scss">
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  background-color: #00000080;
}
.bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  margin: 0 20px 20px 20px;
}
.bar-content {
  width: 70%;
  padding: 25px 0 10px 0;
  display: flex;
  flex-direction: column;
}
.infos {
  width: 80%;
}
.desc {
  font-size: 13px;
}
.actions {
  align-self: flex-end;
}
button {
  padding: 10px 40px;
  font-size: 14px;
  font-weight: bold;
  background-color: #fff;
  border: 3px solid #333;
}
.all {
  background: #333;
  color: #fff;
}

@media screen and (max-width: 769px) {
  .bar {
    margin: 0;
  }
  .bar-content {
    width: 95%;
  }
  p:first-child {
    text-align: center;
  }
  .actions {
    align-self: center;
    display: flex;
    width: 100%;
    justify-content: center;
  }
  button {
    display: block;
    width: 100%;
    padding: 10px;
  }
  .necessary {
    margin-right: 5px;
  }
}
</style>
