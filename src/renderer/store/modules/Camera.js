const state = {
  state: 0, // 拍照状态
  imgDataUrl: '', // 照片url,
  burstData: {
    key: '',
    num: 0
  }
}

const mutations = {
  CHANGE_STATE (state, STATE) {
    state.state = STATE
  },
  CHANGE_IMGDATAURL (state, URL) {
    state.imgDataUrl = URL
  },
  ADD_BURSTNUM (state) {
    if (state.burstData.num === 0) {
      state.burstData.key = Date.now()
    }
    state.burstData.num++
  },
  CLEAR_BURSTDATA (state) {
    state.burstData = {
      key: '',
      num: 0
    }
  }
}

const actions = {
  changeState ({ commit }, state) {
    // do something async
    commit('CHANGE_MODE', state)
  }
}
const getters = {
  cameraState: state => state.state,
  imgDataUrl: state => state.imgDataUrl,
  burstData: state => state.burstData
}
export default {
  state,
  mutations,
  actions,
  getters
}
