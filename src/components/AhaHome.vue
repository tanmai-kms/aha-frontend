<template>
  <div class="home">
    <div class="search-title">Search</div>
    <div class="search-box">
      <input
        v-model="keyword"
        type="text"
        class="text-input search-input"
        placeholder="Keyword"
      />
    </div>
    <div class="divider page-size-divider"></div>
    <div class="per-page-title"># Of Results Per Page</div>
    <div class="results-per-page">
      <div class="value">{{ pageSize }}</div>
      <div class="text">results</div>
    </div>

    <PageSizeSlider class="slider" @change-page-size="changePageSize" />

    <div class="divider button-divider"></div>
    <div class="button-wrapper">
      <div class="button search-button" @click="search">Search</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import PageSizeSlider from "@/components/PageSizeSlider.vue";

export default Vue.extend({
  name: "HomePage",

  components: {
    PageSizeSlider,
  },

  data: () => {
    return {
      keyword: "",
      pageSize: 3,
    };
  },

  methods: {
    changePageSize(pageSize: number) {
      this.pageSize = pageSize;
    },
    search() {
      this.$router.push({
        name: "results",
        query: { pageSize: this.pageSize.toString(), keyword: this.keyword },
      });
    },
  },
});
</script>

<style lang="scss" scoped>
.home {
  width: calc(100% - 40px);
  max-width: $contentWidth;
  padding: 0;
  margin-right: auto;
  margin-left: auto;

  .divider {
    opacity: 0.1;
    width: 100%;
    height: 1px;
    background: $white;
  }

  .divider {
    margin-top: 29px; // 30px - border 1px
  }

  .per-page-title {
    margin-top: 30px;
  }

  .search-title {
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 1.5;
    margin-top: 54px;
  }

  .search-box {
    margin-top: 20px;
  }

  .slider {
    margin-top: 30px;
    margin-right: -2px;
  }

  .per-page-title {
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 36px;
  }

  .results-per-page {
    margin-top: 20px;
    display: flex;
    align-items: flex-end;

    .value {
      font-weight: 700;
      font-size: 48px;
      line-height: 50px;
    }
    .text {
      margin-left: 10px;
      margin-bottom: 4px;
      font-weight: 400;
      font-size: 16px;
      line-height: 1.5;
      letter-spacing: 0.15px;
    }
  }

  .button-wrapper {
    position: absolute;
    top: calc(100vh - 40px - 87px); // always show 87px from screen bottom

    .search-button {
      width: 343px;
      height: 40px;
    }
  }
}

@media screen and (max-width: $mobileWidth) {
  .home {
    .search-title {
      margin-top: 0;
    }

    .search-box {
      margin-top: 16px;
    }

    .slider {
      margin-left: -4px; // make sure it matches with design
      margin-right: -4px;
    }

    .page-size-divider {
      display: none;
    }

    .per-page-title {
      margin-top: 28px;
    }

    .results-per-page {
      margin-top: 16px;
    }

    .button-divider {
      margin-top: 0;
      position: absolute;
      top: calc(100vh - 66px - 40px - 25px - 80px);
      width: calc(100% - 40px);
    }

    .button-wrapper {
      width: calc(100% - 40px);
      top: calc(100vh - 40px - 66px - 24px); // always show 24px from nav bottom

      .search-button {
        width: 100%;
      }
    }
  }
}
</style>
