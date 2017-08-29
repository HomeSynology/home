<template>
  <DownloadList v-if="sid"></DownloadList>
  <Login v-else></Login>
</template>

<script>
  import Login from './login/Login'
  import DownloadList from './download/DownloadList'
  import {mapState} from 'vuex'
  export default {
    components: {
      Login,
      DownloadList
    },
    computed: mapState({
      sid: state => state.syno.sid
    }),
    mounted: function () {
      const sid = window.localStorage.getItem('sid')
      if (sid && !this.sid) {
        this.$store.dispatch('setSid', sid)
      }
    }
  }

</script>

