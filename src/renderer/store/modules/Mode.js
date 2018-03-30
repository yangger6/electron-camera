// timeLapse
// sloMo
// Video
// photo
// square
// pano
const state = {
  modes: [
    {
      mode: 'timeLapse',
      text: '延迟拍摄'
    },
    {
      mode: 'sloMo',
      text: '慢动作'
    },
    {
      mode: 'video',
      text: '视频'
    },
    {
      mode: 'photo',
      text: '照片'
    },
    {
      mode: 'square',
      text: '正方形'
    },
    {
      mode: 'pano',
      text: '全景'
    }
  ],
  index: 3
}

const mutations = {
  CHANGE_MODE (state, mode) {
    state.index = mode
  }
}

const actions = {
  changeMode ({ commit }, mode) {
    // do something async
    commit('CHANGE_MODE', mode)
  }
}
const getters = {
  selectMode: state => {
    return state.modes[state.index]
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}
