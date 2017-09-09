<template>
  <DownloadList v-if="sid"></DownloadList>
  <Login v-else></Login>
</template>
<script>
  import Login from './login/Login'
  import {mapState} from 'vuex'
  export default {
    components: {
      Login,
      DownloadList: () => import(/* webpackChunkName: "downloadlist" */'./download/DownloadList')
    },
    computed: mapState({
      sid: state => state.syno.sid,
      synoKey: state => state.syno.synoKey
    }),
    mounted: function () {
      // TODO: 统一的资源处理
      // TODO: vuex状态localStorage本地化
      const sid = window.localStorage.getItem('sid')
      const synoKey = window.localStorage.getItem('synoKey')
      if (sid && !this.sid) {
        this.$store.dispatch('setSid', sid)
      }
      if (synoKey && !this.synoKey) {
        this.$store.dispatch('setsynoKey', synoKey)
      }
      if (!synoKey || !sid) {
        return this.$store.dispatch('cleanDSState')
      }
    }
  }
</script>

