<template>
  <v-app>
    <v-layout
      class="main-layout d-flex"
      :class="{ 'no-right-bar': hideRightBar }"
    >
      <AhaLogo
        class="mobile-view logo"
        :class="{ 'hide-on-mobile-view': hideLogoNavOnMobile }"
      />
      <div
        class="left-navigation"
        :class="{ 'hide-on-mobile-view': hideLogoNavOnMobile }"
      >
        <MainNavigation />
      </div>
      <div class="main-content flex-justify-center">
        <router-view></router-view>
      </div>
      <div class="desktop-view right-bar">
        <AhaFollowers class="right-bar-followers" />
      </div>
    </v-layout>
  </v-app>
</template>

<style lang="scss" scoped>
html,
body,
.v-application {
  font-family: $font !important; // override MUI font
}

.main-layout {
  position: relative;
  background: $bg1;
  color: $white;

  .left-navigation {
    width: 80px;
    height: 100%;
    background-color: $bg2;
  }

  .main-content {
    position: relative;
    width: calc(100% - 80px);
  }

  .right-bar {
    width: 375px;
    min-width: 375px;
    background-color: $bg2;
    display: none !important;
    &-followers {
      width: 100%;
      margin-top: 23px;
    }
  }
}
@media (min-width: $largeScreenWidth) {
  .main-layout:not(.no-right-bar) {
    .main-content {
      width: calc(100% - 80px - 375px);
    }
    .right-bar {
      display: flex !important;
    }
  }
}
@media (max-width: $mobileWidth) {
  .main-layout {
    flex-direction: column;

    .logo {
      margin-top: 28px;
      margin-left: 21px;
      margin-bottom: 27px;
    }

    .left-navigation {
      height: 66px;
      width: 100%;
      position: fixed;
      bottom: 0;
    }

    .main-content {
      width: 100%;
      position: unset;
    }
  }
}
</style>

<script lang="ts">
import Vue from "vue";
import AhaFollowers from "@/components/AhaFollowers.vue";
import MainNavigation from "@/components/MainNavigation.vue";
import AhaLogo from "@/components/AhaLogo.vue";

export default Vue.extend({
  name: "App",

  components: {
    AhaFollowers,
    MainNavigation,
    AhaLogo,
  },

  data: () => ({
    hideLogoNavOnMobile: false,
    hideRightBar: false,
  }),

  created() {
    this.$watch(
      () => this.$route.meta,
      (newMeta) => {
        this.hideLogoNavOnMobile = newMeta?.hideLogoNavOnMobile;
        this.hideRightBar = newMeta?.hideRightBar;
      }
    );
    this.hideLogoNavOnMobile = this.$route.meta?.hideLogoNavOnMobile;
    this.hideRightBar = this.$route.meta?.hideRightBar;
  },
});
</script>
