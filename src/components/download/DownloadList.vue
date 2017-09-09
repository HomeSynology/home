<template>
  <div class="download-wrapper" @drop="handleDrop" @dragover="handleDragover" @dragleave="handleDragleave">
    <el-input class="download-url" placeholder="请输入下载链接" v-model="url">
      <el-button @click="downloadUrl" slot="append" icon="upload"></el-button>
    </el-input>
    <el-row v-for="item in sortTaskList">
      <el-col :span="24">
        <TaskItem :item-data="item"></TaskItem>
      </el-col>
    </el-row>
  </div>
</template>

<script>

  import {mapState} from 'vuex'
  import orderBy from 'lodash/orderBy'

  export default {
    components: {
      TaskItem: () => import(/* webpackChunkName: "taskItem" */'./TaskItem')
    },
    data: function () {
      return {
        url: '',
        counter: 0,
        taskList: []
      }
    },
    computed: mapState({
      sid: state => state.syno.sid,
      sortTaskList: function (state) {
        return orderBy(state.syno.taskList, ['status'], ['asc'])
      }
    }),
    mounted: async function () {
      if (!this.$store.state.syno.isInitDS) {
        this.$store.dispatch('initDS')
      }
      if (!this.$store.state.syno.sid) {
        console.log('没有sid')
      }
      if (!this.$store.state.syno.synoKey) {
        this.$store.dispatch('login')
      }
      await this.$store.dispatch('getTasks')
      setInterval(() => {
        this.$store.dispatch('getTasks')
      }, 1000 * 20)
    },
    methods: {
      downloadUrl: async function (e) {
        if (!this.url || this.url.length < 6) {
          return alert('应该不是正确的下载地址')
        }
        await this.$store.dispatch('downloadUrl', this.url)
      },
      handleDragleave (e) {
        e.preventDefault()
      },
      handleDragover (e) {
        e.preventDefault()
      },
      handleDrop: async function (e) {
        e.preventDefault()
        const file = e.dataTransfer.files[0]
        const downloadPath = 'macosx/download'
        const formData = new FormData()
        formData.append('destination', downloadPath)
        formData.append('file', file)
        formData.append('_sid', this.sid)
        formData.append('synoKey', this.$store.state.syno.synoKey)

        this.$store.dispatch('downloadTorrent', formData)

      }
    }
  }

</script>

<style scoped>
  .download-url {
    margin: 10px 0;
  }

  .el-row {
    margin-bottom: 8px;
  }

  .el-col {
    border-radius: 4px;
  }

  .download-wrapper {
    margin: 20px auto;
    max-width: 650px;
  }
</style>
