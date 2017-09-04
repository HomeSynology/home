import types from '../mutation-types'
import {DownloadStation} from 'synoapi'
import axios from 'axios'

const initState = {
  isInitDS: false,
  sid: '', // 登陆群晖后的token
  synoKey: '', // 自己约定的统一标识,用于查找对应的socket
  taskList: [],
  dsOption: {
    protocol: 'http',
    address: 'localhost',
    port: '5001',
    debug: false,
    success: false,
    message: ''
  }
}

export const state = initState

export const mutations = {
  [types.SET_SID] (state, sid) {
    console.log('mutations sid', sid)
    state.sid = sid
    state.dsOption.token = sid
  },
  [types.REMOVE_SID] (state) {
    state.sid = ''
  },
  [types.SET_SYNOKEY] (state, synoKey) {
    state.synoKey = synoKey
  },
  [types.SET_DSAPI] (state, ds) {
    state.ds = ds
    state.isInitDS = true
  },
  [types.SET_TASKLIST] (state, taskList) {
    state.taskList = taskList
  },
  [types.CLEAN_DSSTATE] (state) {
    state = initState
  }
}

export const actions = {
  initDS({commit, state}) {
    const ds = new DownloadStation(state.dsOption)
    commit(types.SET_DSAPI, ds)
    state.ds.setRequestOption({
      params: {
        synoKey: state.synoKey
      }
    })
  },
  async login({commit, state, dispatch}, loginOption) {
    if (!state.ds) {
      console.error('未初始化')
      return
    }

    let loginRes = await state.ds.login(loginOption)
    if (loginRes.data.sid) {
      dispatch('setSid', loginRes.data.sid)
    } else {
      console.error('登陆失败', loginRes)
    }
  },
  async getTasks({commit, state, dispatch}) {
    let taskResult = await state.ds.getTasks()
    if (taskResult.success === true) {
      commit(types.SET_TASKLIST, taskResult.data.tasks)
      return
    }
    // TODO:统一错误处理
    if (taskResult.error.code === 105) {
      dispatch('logout')
    }
  },
  cleanDSState ({commit}) {
    commit(types.CLEAN_DSSTATE)
  },
  logout ({dispatch}) {
    window.localStorage.removeItem('sid')
    dispatch('cleanDSState')
  },
  setSid({commit}, sid) {
    window.localStorage.setItem('sid', sid)
    commit(types.SET_SID, sid)
  },
  setsynoKey({commit}, synoKey) {
    window.localStorage.setItem('synoKey', synoKey)
    commit(types.SET_SYNOKEY, synoKey)
  },
  async downloadUrl ({commit}, url) {
    let result = await state.ds.createTask({uri: url})
    if (result.data.success) {
      this.url = ''
      return alert('添加下载成功')
    }
    alert('下载失败', result.error.code)
  },
  async downloadTorrent({commit, dispatch}, formData) {
    const result = await axios({
      url: 'http://localhost:5001/creatTorrent',
      data: formData,
      method: 'post'
    })
    if (result.success) {
      alert('创建种子下载成功')
      dispatch

    }
  }
}

export const getters = {}
