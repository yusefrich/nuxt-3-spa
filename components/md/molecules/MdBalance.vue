<template>
  <md-card
    height="100%"
  >
    <div
      v-if="isMobile"
      class="card-title"
      data-bs-toggle="collapse"
      data-bs-target="#collapseOne"
      aria-expanded="false"
      aria-controls="collapseOne"
    >
      <md-chip>
        <font-awesome-icon :icon="['fas', 'wallet']" />
        {{ $t('i18n_saldo') }}
      </md-chip>
      <i class="icon" data-feather="chevron-down" />
    </div>
    <div v-else>
      <md-chip>
        <font-awesome-icon :icon="['fas', 'wallet']" />
        {{ $t('i18n_saldo') }}
      </md-chip>
    </div>

    <div
      id="collapseOne"
      class="collapse mt-3"
      :class="{'show': !isMobile}"
      aria-labelledby="headingOne"
      data-bs-parent="#accordionExample"
    >
      <div class="rows">
        <div class="cols">
          <label>{{ $t('i18n_disponivel').toUpperCase() }}:</label>
          <p>R$ {{ loggedInUser.balance.toString().replace('.', ',') }}</p>
        </div>
        <div class="cols">
          <label>{{ $t('i18n_bonus').toUpperCase() }}:</label>
          <p>R$ {{ loggedInUser.balance_bonus.toString().replace('.', ',') }}</p>
        </div>
      </div>
      <div class="rows">
        <div class="cols">
          <label>FREEBET:</label>
          <p>R$ {{ loggedInUser.free_bet.toString().replace('.', ',') }}</p>
        </div>
        <div class="cols">
          <label>{{ $t('i18n_bloqueado').toUpperCase() }}:</label>
          <p>R$ {{ loggedInUser.player.freebet_closed.toString().replace('.', ',') }}</p>
        </div>
      </div>
      <label>
        {{ $t('i18n_nome').toUpperCase() }}:
      </label>
      <p class="infos">
        {{ loggedInUser.name }}
      </p>
      <label>
        CPF:
      </label>
      <p class="infos">
        {{ loggedInUser.player.document }}
      </p>
      <label>
        EMAIL:
      </label>
      <p class="infos">
        {{ loggedInUser.email }}
      </p>
      <label>
        {{ $t('i18n_contato').toUpperCase() }}:
      </label>
      <p class="infos">
        {{ loggedInUser.phone }}
      </p>
      <md-progress-bar
        :rollover="loggedInUser.bonus"
        :loading="loading"
        @cancelUserBonus="$emit('cancelUserBonus')"
      />
    </div>
  </md-card>
</template>

<script>
import MdCard from '@/components/md/atoms/MdCard.vue'
import MdChip from '@/components/md/atoms/MdChip.vue'
import MdProgressBar from '@/components/md/molecules/MdProgressBar.vue'
import windowWidth from '@/mixins.js/windowWidth.js'

export default {
  name: 'MdBalance',
  components: {
    MdCard,
    MdChip,
    MdProgressBar
  },
  mixins: [windowWidth],
  props: {
    loggedInUser: {
      type: Object,
      default: () => ({})
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isMobile () {
      return this.width <= 768
    }
  }
}
</script>

<style lang="scss" scoped>
.card-title {
  display: flex;
  justify-content: space-between;
  margin: 0;
}
.icon {
  display: none;
}

.rows {
  display: flex;

  .cols {
    width: 50%;
    padding: 0;
    p {
      color: var(--md-font-color);
    }
  }
}

label {
  font-size: 13px;
  font-weight: 600;
  color: var(--md-font-color);
}
.infos {
  color: var(--md-menu-idx-font-color);
}

p:last-child {
  margin-bottom: 30px;
}

@media(max-width: 768px) {
  .icon {
    display: block;
    margin-top: 5px;
  }
  .card-title[aria-expanded="true"] {
    .icon{
      -webkit-transform: rotate(90deg);
      transform: rotate(180deg);
    }
  }
}
</style>
