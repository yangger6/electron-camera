const state = {
  state: 0, // 拍照状态
  imgDataUrl: '' // 照片url
}

const mutations = {
  CHANGE_STATE (state, STATE) {
    state.state = STATE
  },
  CHANGE_IMGDATAURL (state, URL) {
    state.imgDataUrl = URL
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
  imgDataUrl: state => state.imgDataUrl
}
export default {
  state,
  mutations,
  actions,
  getters
}
