<template>
  <div class="home">
    <left-menu :key = "key"/>
    <div :class="{ 'main-app': true, 'menu-unfold': $store.state.collapsed }">
      <slider-nav />
      <router-view>
      </router-view>
    </div>
  </div>
</template>

<script>
import leftMenu from './components/menu.vue';
import sliderNav from './components/sliderNav.vue';

export default {
  components: {
    leftMenu,
    sliderNav,
  },

  data() {
    return {
      key: new Date().getTime(),
    };
  },
  watch: {
    '$route.key': function () {
      this.key = new Date().getTime();
    },
  },
  methods: {

  },
};
</script>
<style lang = 'less'>
@import url("~@/assets/css/home.less");

</style>
