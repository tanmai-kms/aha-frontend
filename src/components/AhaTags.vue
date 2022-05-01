<template>
  <div class="tags">
    <div class="flex-align-center mobile-view back-to-home" @click="backToHome">
      <v-img class="img" :src="require('../assets/back.svg')" contain />
      <span class="text">Home Page</span>
    </div>
    <div class="tag-title">Tags</div>
    <div v-show="loading" class="tag-list">
      <div class="tag-item" v-for="n in 15" :key="n">
        <div class="bg-wrapper skeleton-loading"></div>
        <div class="item-title skeleton-loading">&nbsp;</div>
        <div class="count skeleton-loading">&nbsp;</div>
      </div>
    </div>
    <div v-show="!loading" class="tag-list">
      <div class="tag-item" v-for="tag in tags" :key="tag.id">
        <div class="bg-wrapper">
          <div class="bg"></div>
          <div class="tag-value text-truncate">{{ tag.name }}</div>
        </div>
        <div class="item-title text-truncate">{{ tag.name }}</div>
        <div class="count">{{ tag.count }} Results</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { container } from "tsyringe";
import ApiService from "@/services/apiService";
import { Tag } from "@/models";

export default Vue.extend({
  name: "TagsPage",

  computed: {
    apiService(): ApiService {
      return container.resolve(ApiService);
    },
  },

  data: () => ({
    loading: false,
    tags: [] as Tag[],
  }),

  async created() {
    this.loading = true;
    this.tags = await this.apiService.getTags();
    this.loading = false;
  },

  methods: {
    backToHome() {
      this.$router.push("/");
    },
  },
});
</script>

<style lang="scss" scoped>
.tags {
  width: calc(100% - 40px);
  max-width: 846px;
  padding: 0;
  margin: 0;

  .back-to-home {
    margin-top: 17px;
    margin-bottom: 37px;
    .img {
      max-width: 14px;
      max-height: 22px;
    }
    .text {
      font-weight: 400;
      font-size: 24px;
      line-height: 1.5;
      margin-left: 20px;
    }
  }

  .tag-title {
    margin-top: 81px;
    font-weight: 400;
    font-size: 30px;
    line-height: 45px;
    letter-spacing: 0.25px;
  }

  .tag-list {
    margin-top: 23px;
    margin-bottom: 17px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    column-gap: 24px;
    row-gap: 36px;

    .tag-item {
      max-width: 150px;

      .bg-wrapper {
        position: relative;
        height: 150px;
        width: 150px;

        .bg {
          opacity: 0.06;
          border-radius: 10px;
          background: #fff;
          width: 100%;
          height: 100%;
        }

        .tag-value {
          position: absolute;
          bottom: 14px;
          margin-left: 10px;
          margin-right: 10px;
          border: 4px solid #fff;
          border-radius: 8px;
          padding: 3px 11px;
          font-weight: 700;
          font-size: 24px;
          line-height: 1.5;
          max-width: 130px; // 150px - 2 borders
        }
      }

      .item-title {
        margin-top: 10px;
        font-size: 14.9px;
        line-height: 22px;
        letter-spacing: 0.139688px;
        width: 100%;

        &.skeleton-loading {
          height: 18px;
        }
      }
      .count {
        font-size: 11.175px;
        line-height: 17px;
        letter-spacing: 0.3725px;
        color: #b2b2b2;

        &.skeleton-loading {
          margin-top: 5px;
          width: 70%;
          height: 14px;
        }
      }
    }
  }
}
@media screen and (max-width: $mobileWidth) {
  .tags {
    width: calc(100% - 50px);

    .tag-title {
      margin-top: 37px;
      margin-left: -5px;
      font-weight: 400;
      font-size: 24px;
      line-height: 1.5;
    }

    .tag-list {
      grid-template-columns: 1fr 1fr;
      column-gap: 24px;
      row-gap: 24px;
    }
  }
}
</style>
