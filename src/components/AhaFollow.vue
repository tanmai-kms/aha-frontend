<template>
  <div id="list" ref="followingList" class="aha-follow">
    <template v-if="loading">
      <div class="followed-item" v-for="n in 13" :key="n">
        <div class="avatar skeleton-loading"></div>
        <div class="name">
          <div class="fullname skeleton-loading"></div>
          <div class="username skeleton-loading"></div>
        </div>
        <div class="action-button"><div class="skeleton-loading"></div></div>
      </div>
    </template>
    <template v-else>
      <div v-for="user in users" :key="user.id" class="followed-item">
        <div class="avatar">
          <img :src="user.avater" />
        </div>
        <div class="name">
          <div class="fullname text-truncate">{{ user.name }}</div>
          <div class="username text-truncate">@{{ user.username }}</div>
        </div>
        <div class="action-button">
          <div
            :class="user.isFollowing ? 'contained-button' : 'outlined-button'"
          >
            {{ user.isFollowing ? "Following" : "Follow" }}
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { User } from "@/models";
import ApiService from "@/services/apiService";
import { container } from "tsyringe";
import Vue, { PropType } from "vue";

export enum FollowType {
  FOLLOWERS = "followers",
  FOLLOWING = "following",
}

export default Vue.extend({
  name: "AhaFollow",

  props: {
    type: {
      default: FollowType.FOLLOWERS,
      type: String as PropType<FollowType>,
    },
  },

  computed: {
    apiService(): ApiService {
      return container.resolve(ApiService);
    },
    isFollowers(): boolean {
      return this.type === FollowType.FOLLOWERS;
    },
  },

  data: () => ({
    pageSize: 20,
    currentPage: 1,
    totalPages: 0,
    users: [] as User[],
    ended: false,
    loading: false,
  }),

  async created() {
    this.loadPage(this.currentPage);
  },

  mounted() {
    const followingList = this.$refs.followingList as HTMLElement;
    // Detect when scrolled to bottom.
    if (followingList) {
      followingList.addEventListener("scroll", () => {
        if (
          !this.ended &&
          followingList.scrollTop + followingList.clientHeight >=
            followingList.scrollHeight
        ) {
          this.loadMore();
        }
      });
    }
  },

  methods: {
    async loadPage(currentPage: number) {
      this.loading = true;
      try {
        const result = await this.apiService.getResults(
          currentPage,
          this.pageSize,
          undefined,
          this.isFollowers ? "all" : "friends"
        );
        this.totalPages = result.totalPages;
        // Get random avatar
        if (result.data?.length) {
          result.data.forEach((userData, index) => {
            const aIndex =
              this.users.length + index > 70
                ? index
                : this.users.length + index;
            userData.avater = "https://i.pravatar.cc/150?img=" + aIndex;
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
.aha-follow {
  overflow: scroll;
  height: 100%;
  padding-left: 16px;
  padding-right: 16px;
  // height: calc(50vh - 120px);

  .followed-item {
    margin-bottom: 16px;
    display: grid;
    grid-template-columns: 40px 1fr 76px;

    .avatar {
      display: flex;
      align-items: center;
      &.skeleton-loading,
      img {
        width: 40px;
        height: 40px;
        border: 1px solid #f8f8f8;
        border-radius: 5px;
      }
    }

    .name {
      margin-left: 15px;

      .fullname {
        font-size: 16px;
        line-height: 24px;
        letter-spacing: 0.15px;
        &.skeleton-loading {
          width: 80%;
          height: 16px;
        }
      }

      .username {
        font-size: 14px;
        line-height: 21px;
        letter-spacing: 0.25px;
        opacity: 0.5;
        color: $white;
        &.skeleton-loading {
          margin-top: 5px;
          width: 60%;
          height: 15px;
        }
      }
    }

    .action-button {
      width: 76px;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .skeleton-loading {
        border-radius: 20px;
        width: 70px;
        height: 29px;
      }
    }
  }
}
</style>
