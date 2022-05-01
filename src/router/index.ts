import AhaHome from "@/components/AhaHome.vue";
import AhaResults from "@/components/AhaResults.vue";
import AhaTags from "@/components/AhaTags.vue";
import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: AhaHome,
  },
  {
    path: "/tags",
    name: "tags",
    component: AhaTags,
    meta: { hideLogoNavOnMobile: true, hideRightBar: true },
  },
  {
    path: "/results",
    name: "results",
    component: AhaResults,
    meta: { hideLogoNavOnMobile: true },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
