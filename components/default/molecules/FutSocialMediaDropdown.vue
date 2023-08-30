<template>
  <div class="icon-holders d-flex px-1 mx-2">
    <fut-button
      type="button"
      class="btn text-primary dropdown-toggle-split"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <font-awesome-icon class="icon-mobile" :icon="['fas', 'share-alt']" />
    </fut-button>
    <fut-button type="button" class="btn dropdown-toggle text-primary dropdown-toggle-split arrow-icon" data-bs-toggle="dropdown" aria-expanded="false">
      <span class="visually-hidden">Toggle Dropdown</span>
    </fut-button>
    <ul class="dropdown-menu bg-classic">
      <li v-if="currentSettings && currentSettings.fb">
        <fut-button
          class="dropdown-item text-primary fut-color-dynamic text-decoration-none d-block px-1 py-2"
          target="_blank"
          external
          :to="currentSettings.fb"
        >
          <font-awesome-icon class="mx-1 icon-mobile" :icon="['fab', 'facebook']" />
        </fut-button>
      </li>
      <li v-if="currentSettings && currentSettings.insta">
        <fut-button
          class="dropdown-item text-primary fut-color-dynamic text-decoration-none d-block px-1 py-2"
          target="_blank"
          external
          :to="currentSettings.insta"
        >
          <font-awesome-icon class="mx-1 icon-mobile" :icon="['fab', 'instagram']" />
        </fut-button>
      </li>
      <li v-if="currentSettings && currentSettings.tt">
        <fut-button
          class="dropdown-item text-primary fut-color-dynamic text-decoration-none d-block px-1 py-2"
          target="_blank"
          external
          :to="currentSettings.tt"
        >
          <font-awesome-icon class="mx-1 icon-mobile" :icon="['fab', 'twitter']" />
        </fut-button>
      </li>
      <li v-if="currentSettings && currentSettings.yt">
        <fut-button
          class="dropdown-item text-primary fut-color-dynamic text-decoration-none d-block px-1 py-2"
          target="_blank"
          external
          :to="currentSettings.yt"
        >
          <font-awesome-icon class="mx-1 icon-mobile" :icon="['fab', 'youtube']" />
        </fut-button>
      </li>
      <li v-if="currentSettings && currentSettings.phone">
        <fut-button
          class="dropdown-item text-primary fut-color-dynamic text-decoration-none d-block px-1 py-2"
          target="_blank"
          external
          :to="'tel:'+currentSettings.phone"
        >
          <font-awesome-icon class="mx-1 icon-mobile" :icon="['fas', 'phone']" />
        </fut-button>
      </li>
      <li v-if="currentSettings && currentSettings.whats">
        <fut-button
          class="dropdown-item text-primary fut-color-dynamic text-decoration-none d-block px-1 py-2"
          target="_blank"
          external
          :to="'https://wa.me/'+currentSettings.whats"
        >
          <font-awesome-icon class="mx-1 icon-mobile" :icon="['fab', 'whatsapp']" />
        </fut-button>
      </li>
      <li v-if="currentSettings && currentSettings.telegram">
        <fut-button
          class="dropdown-item text-primary fut-color-dynamic text-decoration-none d-block px-1 py-2"
          target="_blank"
          external
          :to="currentSettings.telegram"
        >
          <font-awesome-icon class="mx-1 icon-mobile" :icon="['fab', 'telegram']" />
        </fut-button>
      </li>
      <li v-if="currentSettings && currentSettings.tiktok">
        <fut-button
          class="dropdown-item text-primary fut-color-dynamic text-decoration-none d-block px-1 py-2"
          target="_blank"
          external
          :to="currentSettings.tiktok"
        >
          <font-awesome-icon class="mx-1 icon-mobile" :icon="['fab', 'tiktok']" />
        </fut-button>
      </li>
    </ul>
  </div>
</template>

<script>
import FutButton from '@/components/default/atoms/FutButton.vue'

export default {
  name: 'FutSocialMediaDropdown',
  components: {
    FutButton
  },
  props: {
    currentSettings: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style scoped lang="scss">
.icon-holders{
  background: var(--fut-background);
  margin-top: 10px;
  border-radius: 90px;
  .btn {
    z-index: 9999;
    border-radius: 25px;
  }
  .dropdown-toggle {
    box-shadow: none;
  }
  .arrow-icon[aria-expanded="true"] {
    &::after {
      -webkit-transform: rotate(90deg);
      transform: rotate(180deg);
    }
  }
  ul {
    border: none;
    margin: 0;
    padding: 0;
    min-width: 50px;
    margin-top: -35px;
    margin-left: 8px;
    border-radius: 25px;
  }
  li {
    background: #33333363;
    width: 50px;
    padding: 0 5px 0 5px;
  }
  li:first-child {
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
  }
  li:last-child {
    border-end-end-radius: 25px;
    border-end-start-radius: 25px;
  }
}
.btn {
  box-shadow: none;
  width: 42px;
}
.bg-classic{
  background: var(--fut-background);
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
}
.icon-mobile{
  font-size: 25px;
}
</style>
