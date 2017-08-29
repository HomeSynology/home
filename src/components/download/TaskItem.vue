<template>
  <div class="grid-content tast-item-wrapper">
    <div class="task-progress light-black" v-bind:style="{width:taskProgress + '%'}">
    </div>
    <div class="task-detail-wrapper">
      <div class="title">{{ itemData.title }}</div>
      <div class="detail">size: {{ niceBytes(itemData.size)}}</div>
      <div class="status-icon el-icon-circle-check" v-bind:class="status"></div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['itemData'],
    data: function () {
      return {}
    },
    methods: {
      niceBytes: function (x) {
        let units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        let n = parseInt(x, 10) || 0
        let l = 0
        while (n >= 1024) {
          n = n / 1024
          l++
        }
        return (n.toFixed(n >= 10 || l < 1 ? 0 : 1) + ' ' + units[l])
      }
    },
    computed: {
      taskProgress: function () {
        function progressCtrl(item) {
          let totalSize = 0
          let downloadedSize = 0
          let doneStatus = {
            'finished': 100,
            'seeding': 100
          }
          const doneProgress = doneStatus[item.status]
          if (doneProgress) {
            return doneProgress
          }
          let files = item.additional.file
          for (let index in files) {
            let file = files[index]
            if (file) {
              totalSize = totalSize + file.size
              downloadedSize = downloadedSize + file['size_downloaded']
            }
          }
          return ~~(100 * downloadedSize / totalSize)
        }

        return progressCtrl(this.itemData)
      },
      status: function () {
        const statusText = {
          finished: 'el-icon-circle-check',
          downloading: 'el-icon-loading',
          waiting: 'el-icon-information'
        }
        return statusText[this.itemData.status]
      }
    }
  }
</script>

<style scoped>
  div {
    color: #fff;
  }

  .tast-item-wrapper {
    position: relative;

  }

  .task-detail-wrapper {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: #fff;

    padding-top: 12px;
    padding-left: 12px;

  }

  .task-detail-wrapper .status-icon {
    position: absolute;
    right: 20px;
    top: 20px;
  }

  .task-progress {
    position: absolute;
    top: 0;
    left: 0;
    width: 0%;
    height: 100%;
    z-index: 1;
    -webkit-box-shadow: 0 20px 20px -25px black;
    -moz-box-shadow: 0 20px 20px -25px black;
    box-shadow: 0 20px 20px -25px black;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 50px;
  }

  .light-black {
    background: #3e5871;
    color: #fff;

  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }
</style>
