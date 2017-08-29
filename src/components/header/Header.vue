<template>
  <div class="header">
    <el-menu theme="dark" :default-active="activeIndex" class="el-menu-wrapper" mode="horizontal"
             @select="handleSelect">
      <div class="logo item">
        <i class="el-icon-menu logo"></i>
      </div>
      <el-menu-item index="1" class="item">
        <router-link to="/">仪表盘</router-link>
      </el-menu-item>
      <el-menu-item index="1" class="item">
        <router-link to="/download">下载管理</router-link>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: 'header',
    components: {},
    data () {
      return {}
    }
  }
</script>

<style scoped>
  .el-menu-wrapper {
    height: 100%;
  }

  .item {
    height: 100%;
    line-height: 75px;
  }

  .header {
    height: 75px;
  }

  .logo {
    float: left;
    height: 75px;
    width: 100px;
    cursor: pointer;
    line-height: 75px;
    text-align: center;
    color: #20a0ff;
  }
</style>
