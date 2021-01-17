<template>
  <router-view></router-view>
</template>

<script>
export default {
  data() {
    return {
      fullscreenLoading: false,
      askdjak: this.$store.state.sdasd,
    };
  },
  beforeCreate() {
    const loading = this.$loading({
      lock: true,
      text: "加载中",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 1)",
    });
    setTimeout(() => {
      loading.close();
    }, 1500);
    localStorage.clear();
  },
};
</script>