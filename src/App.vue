<template>
  <div id="app">
    <comheader></comheader>
    <router-view></router-view>
  </div>
</template>

<script>
  import Header from './components/header/Header'
  export default {
    name: 'app',
    components: {
      comheader: Header
    }
  }
</script>

<style>

  * {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .hide {
    display: none !important;
  }
  body{
    background: #092756;
    background: -webkit-radial-gradient(0% 100%, ellipse cover, rgba(35, 24, 82, 0.22) 10%,rgba(138,114,76,0) 40%), linear-gradient(to bottom, rgba(57,173,219,.25) 0%,rgba(42,60,87,.4) 100%), linear-gradient(135deg, #670d10 0%,#092756 100%);
    min-height: 100vh;

  }
</style>
