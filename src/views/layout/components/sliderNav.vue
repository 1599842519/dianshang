<template>
  <div class="menu-hone">
    <!-- {{$router.currentRoute.matched}} -->
    <a-button type="primary" @click="toggleCollapsed">
      <a-icon :type="$store.state.collapsed ? 'menu-unfold' : 'menu-fold'" />
    </a-button>
    <div class="breadcrumb">
      <a-breadcrumb >
        <a-breadcrumb-item>
          {{ currentRoute[0] ? currentRoute[0].meta.title : "" }}
        </a-breadcrumb-item>
        <a-breadcrumb-item
          ><router-link :to = "{name:currentRoute[1].name}">
            {{ currentRoute[1] ? currentRoute[1].meta.title : "" }}</router-link
          >
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <ul class="user-info">
      <li>
        {{ $store.state.user.username }}
      </li>
      <li @click="tuic">退出</li>
    </ul>
  </div>
</template>
<script>
export default {};
</script>
<script>
// import route from "@/router.index.js";

export default {
  data() {
    return {
      currentRoute: this.$router.currentRoute.matched,
    };
  },
  watch: {
    $route() {
        this.currentRoute = this.$router.currentRoute.matched;
    },
  },
  created() {
  },
  methods: {
    toggleCollapsed() {
      this.$store.dispatch("changeCollapsed");
    },
    tuic() {
      this.$store.dispatch("logout");
      this.$router.push({
        name: "Login",
      });
    },
  },
};
</script>
<style lang = "less">
  .user-info{
    position: fixed;
    top: 0;
    right: 30px;
    z-index: 8;
}

</style>
