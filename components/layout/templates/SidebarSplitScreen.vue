<template>
  <div class="main-container">
    <component :is="'style'">
      @media (max-width: 768px) {
      .mainContentHeightMobile {
      height: calc(100vh - {{ navHeight + bottomNavHeight }}px);
      }
      .mainContentHeight {
      height: calc(100vh - {{ bottomNavHeight }}px);
      }
      }
      @media (min-width: 768px) {
      .mainContentHeightMobile {
      height: calc(100vh - {{ navHeight }}px);
      }
      .mainContentHeight {
      height: 100vh;
      }
      }
    </component>
    <div v-if="navHeight" class="heading-nav" :style="'height: ' + navHeight + 'px'">
      <slot name="navbar" />
    </div>
    <div class="d-flex">
      <div v-if="leftSectionWidth" class="sidebar-left transition" :class="{open: mobileLeftSectionOpen}" :style="'max-width: ' + leftSectionWidth + 'px'">
        <div class="sidebar-fixed" :style="navHeight ? 'height: calc(100vh - ' + navHeight + 'px); width: ' + leftSectionWidth + ' px' : 'height: 100vh; width: ' + leftSectionWidth + ' px'">
          <div class="sidebar-fixed-content">
            <slot name="leftSidebar" />
          </div>
        </div>
      </div>
      <div
        class="middle-container transition"
        :style="`max-width: calc(100vw - ${leftSectionWidth + rightSectionWidth}px)`"
      >
        <div class="middle-fixed-container" :class="navHeight ? 'mainContentHeightMobile' : 'mainContentHeight'">
          <div class="middle-fixed-container-content">
            <slot />
          </div>
        </div>
      </div>
      <div v-if="rightSectionWidth" class="sidebar-right" :style="'max-width: ' + rightSectionWidth + 'px'">
        <div class="sidebar-right-fixed" :style="navHeight ? 'height: calc(100vh - ' + navHeight + 'px); width: ' + rightSectionWidth + ' px' : 'height: 100vh; width: ' + rightSectionWidth + ' px'">
          <div class="sidebar-right-fixed-content">
            <slot name="rightSidebar" />
          </div>
        </div>
      </div>
    </div>
    <div v-if="bottomNavHeight" class="bottom-nav d-md-none" :style="'height: ' + bottomNavHeight + 'px'">
      <div>
        <slot name="mobileBottomNav" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SidebarSplitScreen',
  props: {
    navHeight: {
      type: Number,
      default: null
    },
    leftSectionWidth: {
      type: Number,
      default: null
    },
    mobileLeftSectionOpen: {
      type: Boolean,
      default: false
    },
    rightSectionWidth: {
      type: Number,
      default: null
    },
    bottomNavHeight: {
      type: Number,
      default: null
    }
  },
  computed: {
    styleMainContent () {
      return `
        @media (min-width: 768px) {
          max-width: calc(100vw - ${this.leftSectionWidth + this.rightSectionWidth}px)
        }
        @media (max-width: 768px) {
          max-width: 100%
        }
      `
    }
  },
  methods: {
    mobile () {
      return window.innerWidth < 720
    },
    mainContentHeight () {
      if (this.mobile()) {
        return this.navHeight + this.bottomNavHeight
      }
      return this.navHeight
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/layout/breakpoints";
.main-container {
  max-width: 100vw;
  height: 100%;
  max-height: 100vh;
  overflow: hidden;
  position: relative;
}
.bottom-nav {
  position: fixed;
  bottom: 0;
  width: 100vw;
  z-index: 9;
}
.middle-container {
  position: relative;
  width: -moz-available;          /* WebKit-based browsers will ignore this. */
  width: -webkit-fill-available;  /* Mozilla-based browsers will ignore this. */
  width: fill-available;
  @include _md {
    max-width: 100vw !important;
  }
  .middle-fixed-container {
    position: sticky;
    overflow-y: auto;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      -webkit-appearance: none;
      width: 7px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 4px;
      background-color: rgb(146, 146, 146);
      -webkit-box-shadow: 0 0 1px rgb(255, 255, 255);
    }
  }
}
.sidebar-left {
  width: 100%;
  overflow: hidden;
  position: sticky;
  @include _md {
    position: fixed;
    width: 100vw;
    max-width: 100vw !important;
    top: 0;
    height: 100vh;
    z-index: 10;
    left: -100vw;
    &.open {
      left: 0;
    }
  }
}
.sidebar-fixed {
  position: sticky;
  z-index: 9999;
  @include _md {
    height: 100vh !important;
  }
  &::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 7px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: rgba(0,0,0,.5);
    -webkit-box-shadow: 0 0 1px rgba(255,255,255,.5);
  }
}
.sidebar-fixed-content {
  span{
    display: block;
  }
}

.sidebar-right {
  max-width: 280px;
  width: 100%;
  @include _md {
    position: absolute;
    right: -280px;
  }
}
.sidebar-right-fixed {
  width: 280px;
  position: sticky;
  float: right;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 7px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: rgba(0,0,0,.5);
    -webkit-box-shadow: 0 0 1px rgba(255,255,255,.5);
  }
}
.sidebar-right-fixed-content {
  span{
    display: block;
  }
}
</style>
