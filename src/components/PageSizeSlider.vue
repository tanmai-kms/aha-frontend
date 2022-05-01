<template>
  <div class="page-size" :class="{ mobile: mobile }">
    <v-slider
      :step="pageSizeStep"
      class="page-size-slider"
      :class="{ last: pageSize === maxValue }"
      :max="maxValue"
      min="0"
      type="range"
      v-model="pageSize"
      @input="changePageSize"
    >
    </v-slider>
    <div class="step-labels">
      <div class="label" :class="getLabelClasses(3)">3</div>
      <div class="label" :class="getLabelClasses(6)">6</div>
      <div class="label" :class="getLabelClasses(9)">9</div>
      <div class="label" :class="getLabelClasses(12)">12</div>
      <div class="label" :class="getLabelClasses(15)">15</div>
      <div class="label" :class="getLabelClasses(50)">50</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "PageSizeSlider",

  data: () => ({
    mobile: false,
    pageSize: 0,
    maxValue: 773,
    pageSizeStep: 143,
    fixedPageSizeStep: 143,
    valueMaps: {} as { [key: number]: number },
  }),

  computed: {
    realPageSize() {
      return this.valueMaps[+this.pageSize] || 0;
    },
  },

  created() {
    this.mobile = window.innerWidth <= 375;
    this.getData();
  },

  methods: {
    getValueMaps() {
      this.valueMaps = {
        0: 3,
      };
      this.valueMaps[this.fixedPageSizeStep] = 6;
      this.valueMaps[this.fixedPageSizeStep * 2] = 9;
      this.valueMaps[this.fixedPageSizeStep * 3] = 12;
      this.valueMaps[this.fixedPageSizeStep * 4] = 15;
      this.valueMaps[this.maxValue] = 50;
    },
    getData() {
      if (this.mobile) {
        this.maxValue = 343;
        this.pageSizeStep = 58.5;
      }
      this.pageSize = 0;
      this.fixedPageSizeStep = this.pageSizeStep;
      this.getValueMaps();
    },
    getLabelClasses(page: number) {
      return [`label${page}`, page === this.realPageSize ? "active" : ""];
    },
    changePageSize() {
      const nearestLastStep = this.fixedPageSizeStep * 4;
      if (+this.pageSize > nearestLastStep) {
        const a1 = this.pageSize - nearestLastStep;
        const a2 = this.maxValue - this.pageSize;
        if (a1 < a2) {
          this.pageSize = nearestLastStep;
          this.pageSizeStep = this.fixedPageSizeStep;
        } else {
          this.pageSize = this.maxValue;
          this.pageSizeStep = this.maxValue - nearestLastStep;
        }
      } else {
        this.pageSizeStep = this.fixedPageSizeStep;
      }
      this.$emit("change-page-size", this.realPageSize);
    },
  },
});
</script>

<style lang="scss">
.page-size {
  &.mobile {
    .page-size-slider {
      &.last {
        .v-slider__thumb {
          left: -10px;
        }
      }
    }
  }
  .page-size-slider {
    .theme--light.v-messages {
      display: none;
    }

    .v-slider--horizontal {
      min-height: 0;
      margin: 0;
    }

    .v-input__slot {
      margin-bottom: 18px;
    }

    &.last {
      .v-slider__thumb {
        left: -22px;
      }
    }

    .v-slider {
      &__track-container {
        height: 8px !important;

        .v-slider__track-fill.primary {
          border-radius: 8px;
          background-image: linear-gradient(
            270deg,
            #ffd25f 0.13%,
            #ff5c01 100%
          ) !important;
        }

        .v-slider__track-background.primary.lighten-3 {
          border-radius: 8px;
          background-color: $white !important;
          border-color: $white !important;
          opacity: 0.3;
        }
      }

      &__thumb {
        cursor: pointer;
        width: 26px;
        height: 26px;

        &.primary {
          border: 6px solid #ffd05d !important;
          background: $bg2 !important;
        }

        &-container {
          &--active {
            .v-slider__thumb::before {
              display: block;
            }
          }
        }

        &::before {
          width: 44px;
          height: 44px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(1) !important;
          background: #ffd05d;
          display: none;
        }

        &::after {
          width: 44px;
          height: 44px;
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.page-size {
  .page-size-slider {
    width: 100%;
  }

  .step-labels {
    position: relative;
    width: 100%;
    height: 24px;

    .label {
      position: absolute;
      font-weight: 500;
      font-size: 16px;
      line-height: 1.5;
      letter-spacing: 0.15px;
      opacity: 0.5;
      color: $white;

      &.active {
        opacity: 1;
      }
      &.label3 {
        left: 0;
      }
      &.label6 {
        left: 18.6%;
      }
      &.label9 {
        left: 37.1%;
      }
      &.label12 {
        left: 55.1%;
      }
      &.label15 {
        left: 73.8%;
      }
      &.label50 {
        left: calc(100% - 16px);
      }
    }
  }

  &.mobile {
    .label {
      font-size: 14px;
      letter-spacing: 0.25px;
      font-weight: 400;

      &.label3 {
        left: 4px;
      }
      &.label6 {
        left: 17.7%;
      }
      &.label9 {
        left: 34.7%;
      }
      &.label12 {
        left: 51%;
      }
      &.label15 {
        left: 67.8%;
      }
      &.label50 {
        left: calc(100% - 20px);
      }
    }
  }
}
</style>
