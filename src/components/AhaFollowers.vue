<template>
  <div class="followers">
    <v-tabs v-model="tab" background-color="transparent" grow>
      <v-tab v-for="item in items" :key="item">
        <div class="tab-title">{{ item }}</div>
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item" class="follower-item">
        <AhaFollow :type="item" />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<style lang="scss">
.followers {
  .theme--light.v-tabs-items {
    background: $bg2;
    margin-top: 32px;

    overflow-x: hidden;
    overflow-y: scroll;
    .follower-item {
      height: calc(100vh - 120px);
    }
  }

  .v-tabs {
    height: auto;

    .v-tab {
      text-transform: capitalize;
      font-weight: 700;
      font-size: 16px;
      line-height: 20px;
      letter-spacing: 0.15px;
      padding: 11px 16px !important;
      color: #929292 !important;

      &--active {
        color: $white !important;
      }
    }

    &-slider-wrapper {
      color: $white !important;
    }
    &-bar {
      height: auto !important;
    }
  }
}
</style>

<style lang="scss" scoped>
.followers {
  background: $bg2;
}
</style>

<script lang="ts">
import ApiService from "@/services/apiService";
import AhaFollow from "@/components/AhaFollow.vue";
import { container } from "tsyringe";
import Vue from "vue";
import { FollowType } from "./AhaFollow.vue";

export default Vue.extend({
  name: "FollowersPage",

  computed: {
    apiService(): ApiService {
      return container.resolve(ApiService);
    },
  },

  components: {
    AhaFollow,
  },

  data: () => ({
    tab: null,
    items: [FollowType.FOLLOWERS, FollowType.FOLLOWING],
  }),
});
</script>
