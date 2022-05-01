<template>
  <div class="results">
    <div class="flex-align-center mobile-view back-to-home">
      <v-img
        class="img back-icon"
        @click="backToHome"
        :src="require('../assets/back.svg')"
        contain
      />
      <span class="text">Home Page</span>
    </div>
    <div
      v-if="loading || users.length"
      class="results-title d-flex align-center"
    >
      <v-img
        class="desktop-view img back-icon"
        @click="backToHome"
        :src="require('../assets/back.svg')"
        contain
      />
      <span class="text">Results</span>
    </div>
    <div v-if="!loading && !users.length" class="no-result">
      No results matching.
    </div>
    <div v-show="loading" class="result-list loading">
      <div class="result-item" v-for="n in 9" :key="n">
        <div class="img skeleton-loading"></div>
        <div class="result-item-title skeleton-loading"></div>
        <div class="username skeleton-loading"></div>
      </div>
    </div>
    <div v-show="!loading" class="result-list">
      <div class="result-item" v-for="user in users" :key="user.id">
        <div class="img">
          <img :src="user.avater" />
        </div>
        <div class="result-item-title">{{ user.name }}</div>
        <div class="username">by {{ user.username }}</div>
      </div>
    </div>
    <div v-if="!loading && !ended" class="button more-button" @click="loadMore">
      More
    </div>
  </div>
</template>

<script lang="ts">
import { User } from "@/models";
import ApiService from "@/services/apiService";
import { container } from "tsyringe";
import Vue from "vue";

export default Vue.extend({
  name: "ResultsPage",

  computed: {
    apiService(): ApiService {
      return container.resolve(ApiService);
    },
  },

  data: () => ({
    loading: false,
    currentPage: 1,
    pageSize: 3,
    keyword: "",
    totalPages: 0,
    users: [] as User[],
    ended: false,
  }),

  watch: {
    $route: function () {
      // watch it
      this.currentPage = 1;
      this.users = [];
      this.loadPage(this.currentPage);
    },
  },

  async created() {
    console.log("this.$route.query", this.$route.query);
    this.loadPage(this.currentPage);
  },

  methods: {
    backToHome() {
      this.$router.push("/");
    },
    getParams() {
      this.pageSize = +this.$route.query?.pageSize;
      this.keyword = String(this.$route.query?.keyword);
    },
    async loadPage(currentPage: number) {
      this.getParams();
      this.loading = true;
      try {
        const result = await this.apiService.getResults(
          currentPage,
          this.pageSize,
          this.keyword
        );
        this.totalPages = result.totalPages;
        // Get random images
        if (result.data?.length) {
          result.data.forEach((userData, index) => {
            userData.avater =
              "https://picsum.photos/id/" +
              (this.users.length + index) +
              "/367/267";
          });
        }
        this.users = this.users.concat(result.data || []);
        this.ended = currentPage >= this.totalPages;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    loadMore() {
      this.currentPage++;
      this.loadPage(this.currentPage);
    },
  },
});
</script>

<style lang="scss" scoped>
.results {
  width: calc(100% - 40px);
  max-width: $contentWidth;
  padding: 0;
  margin-right: auto;
  margin-left: auto;
  margin-top: 92px;
  margin-bottom: 24px;

  .no-result {
    font-size: 30px;
    line-height: 1.5;
    text-align: center;
    color: rgb(146, 146, 146);
  }

  .results-title,
  .back-to-home {
    margin-left: -38px;
    .img {
      cursor: pointer;
      max-width: 14px;
      max-height: 22px;
    }
    .text {
      font-weight: 400;
      font-size: 30px;
      line-height: 1.5;
      letter-spacing: 0.25px;
      margin-left: 31px;
    }
  }

  .result-list {
    margin-top: 24px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 34px;
    row-gap: 31px;

    .result-item {
      .img {
        width: 100%;
        height: 146px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .result-item-title {
        margin-top: 12px;
        font-size: 14.9px;
        line-height: 22px;
        letter-spacing: 0.139688px;

        &.skeleton-loading {
          width: 100%;
          height: 19px;
        }
      }
      .username {
        font-size: 11.175px;
        line-height: 17px;
        letter-spacing: 0.3725px;
        color: #b2b2b2;

        &.skeleton-loading {
          margin-top: 5px;
          width: 70%;
          height: 15px;
        }
      }
    }
  }

  .more-button {
    margin-top: 39px;
    width: 343px;
    height: 40px;
  }
}
@media screen and (max-width: $mobileWidth) {
  .results {
    margin-top: 0;
    margin-bottom: 58px;

    .no-result {
      font-size: 24px;
    }
    .results-title {
      margin-left: 0;
      .text {
        font-size: 24px;
        margin-left: 0;
      }
    }

    .back-to-home {
      margin-left: 5px;
      margin-top: 20px;
      margin-bottom: 37px;
      .text {
        margin-left: 19px;
        font-size: 24px;
      }
    }

    .result-list {
      grid-template-columns: 1fr;
      row-gap: 40px;

      .result-item {
        .img {
          height: 222.67px;
        }
        .result-item-title {
          margin-top: 20px;
        }
      }
    }

    .more-button {
      width: 100%;
      height: 40px;
    }
  }
}
</style>
