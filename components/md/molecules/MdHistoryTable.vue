<template>
  <div class="history-table">
    <md-chip v-if="!hideTitle" class="ms-1">
      <font-awesome-icon :icon="['fa', 'list']" />
      {{ $t('i18n_historico') }}
    </md-chip>

    <table class="mt-3">
      <thead>
        <tr>
          <th
            v-for="(header, idx) in headers"
            :key="idx"
            :class="header.align"
            class="headers"
          >
            {{ header.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, idx) in items"
          :key="idx"
          @click.stop="$emit('showModal', item)"
        >
          <td
            v-for="(header, idxH) in headers"
            :key="idxH"
            :class="header.align"
          >
            <slot
              :name="header.field"
              :item="item"
              :idx="idx"
            >
              <span><small>{{ item[header.field] }}</small></span>
            </slot>
          </td>
        </tr>
      </tbody>
    </table>

    <md-button
      v-if="viewMore"
      width="100px"
      padding="10px"
      class="fill-table"
      @click="$emit('viewMore')"
    >
      {{ $t('i18n_ver_mais') }} +
    </md-button>
  </div>
</template>

<script>
import MdButton from '@/components/md/atoms/MdButton.vue'
import MdChip from '@/components/md/atoms/MdChip.vue'

export default {
  name: 'MdHistoryTable',
  components: {
    MdButton,
    MdChip
  },
  props: {
    headers: {
      type: Array,
      default: () => ([])
    },
    items: {
      type: Array,
      default: () => ([])
    },
    hideTitle: {
      type: Boolean,
      default: false
    },
    viewMore: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.history-table {
  color: var(--md-font-color);
  display: flex;
  flex-direction: column;
  background: var(--md-payment-bg-color);
  border: 3px solid var(--md-comp-border-color);
  border-radius: 5px;
  padding: 15px;
  table {
    width: 100%;
    thead {
      border-bottom: 1px solid var(--md-comp-border-color);
      .headers {
        color: var(--md-menu-idx-font-color);
        padding-bottom: 5px;
        font-size: 12px;
        white-space: nowrap;
      }
    }
    tbody {
      td {
        border-bottom: 1px solid var(--md-comp-border-color);
        padding: 5px;
      }
    }
  }
  .fill-table {
    margin: 20px 0;
    align-self: center;
  }
}

@media (max-width: 375px) {
  .history-table {
    padding: 15px 0;
    table {
      tbody {
        td {
          font-size: 14px;
        }
      }
    }
  }
}
</style>
