<template>
  <v-layout
    class="navigation flex-align-center"
    :class="`${currentRouteName}-active`"
  >
    <AhaLogo class="desktop-view logo" />
    <div
      class="icon home-icon flex-align-center"
      :class="{ active: isHome }"
      @click="navigateTo('/')"
    >
      <div class="bg"></div>
      <div class="desktop-view text">Home</div>
    </div>
    <div
      class="icon tags-icon flex-align-center"
      :class="{ active: currentRouteName === 'tags' }"
      @click="navigateTo('/tags')"
    >
      <div class="svg-wrapper">
        <div class="bg"></div>
        <div class="desktop-view dot"></div>
      </div>
      <div class="desktop-view text">Tags</div>
    </div>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
import AhaLogo from "@/components/AhaLogo.vue";

export default Vue.extend({
  name: "MainNavigation",

  data: () => ({
    currentRouteName: "",
  }),

  components: {
    AhaLogo,
  },

  computed: {
    isHome() {
      return (
        this.currentRouteName === "home" || this.currentRouteName === "results"
      );
    },
  },

  created() {
    this.$watch(
      () => this.$route.name,
      (newRouteName) => {
        this.currentRouteName = newRouteName || "";
      }
    );
    this.currentRouteName = this.$route.name || "";
  },

  methods: {
    navigateTo(newRoute: string) {
      this.$router.push(newRoute);
    },
  },
});
</script>

<style lang="scss" scoped>
.navigation {
  flex-direction: column;
  background-color: $bg2;

  .logo {
    margin-top: 37px;
  }

  &.tags-active {
    .logo {
      margin-top: 36px; // make sure it matches with design
    }
    .home-icon {
      margin-top: 44px; // make sure it matches with design
    }
  }

  .home-icon {
    margin-top: 43px;
  }

  .icon {
    cursor: pointer;
    flex-direction: column;
    margin-left: 2px; // make sure it matches with design
    .bg {
      width: 24px;
      height: 24px;
      background-image: url("~@/assets/inactive-copy.svg");
      background-position: center center;
      background-size: contain;
      background-repeat: no-repeat;
    }

    &.active {
      .bg {
        background-image: url("~@/assets/copy.svg");
      }
      .text {
        display: block !important;
      }
    }

    .text {
      font-weight: 400;
      font-size: 12px;
      line-height: 1.5;
      letter-spacing: 0.4px;
      display: none !important;
    }
  }

  .tags-icon {
    margin-top: 18px;

    .svg-wrapper {
      position: relative;
      .bg {
        margin-top: 3px;
      }
      .dot {
        top: 0;
        left: 22px;
        position: absolute;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: #00d1ff;
      }
    }
    &.active {
      margin-top: 37px;
      .dot {
        display: none !important;
      }
    }
  }
}
@media screen and (max-width: $mobileWidth) {
  .navigation {
    background: rgba(24, 24, 24, 0.2);
    box-shadow: inset 0px 0.5px 0px rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(54.3656px);
    flex-direction: row;
    justify-content: center;
    height: 100%;

    .icon {
      margin-top: 0;
      margin-left: 0;
      &.tags-icon {
        margin-left: 50px;
      }
      .text,
      &.active .text {
        display: none !important;
      }
      &.home-icon {
        margin-left: 2px;
      }
    }
    .tags-icon {
      .svg-wrapper {
        .bg {
          margin-top: 0;
        }
      }
    }
  }
}
</style>
