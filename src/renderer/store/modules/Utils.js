const state = [
  {
    name: 'flash',
    state: 0,
    dependencies: ['photo', 'square', 'video', 'sloMo']
  },
  {
    name: 'hdr',
    state: 0,
    dependencies: ['photo', 'square']
  },
  {
    name: 'live',
    state: 0,
    dependencies: ['photo']
  },
  {
    name: 'delaty',
    state: 0,
    time: 0,
    dependencies: ['photo', 'square']
  },
  {
    name: 'filter',
    state: 0,
    filters: ['origin', 'grayscale', 'sepia', 'saturate', 'opacity', 'brightness', 'contrast', 'blur', 'tint', 'multiple', 'inkwell'],
    selectIndex: 0,
    dependencies: ['photo', 'square']
  }
]
const mutations = {
  UPDATE_UTILS (state, payload) {
    Object.assign(state, state.map(unit => unit.name === payload.name ? payload : unit))
  },
  CHANGE_UTILS_STATE (state, payload) {
    let newState = 0
    if (payload.state) {
      newState = payload.state
    } else {
      newState = state.find(({ name }) => name === payload.name).state === 0 ? 1 : 0
    }
    state.find(({ name }) => name === payload.name).state = newState
  },
  CHANGE_UTILS_FILTERS_SELECTINDEX (state, index) {
    state.find(({ name }) => name === 'filter').selectIndex = index
  }
}
const actions = {
  updateUtils ({ commit }, payload) {
    commit('UPDATE_UTILS', payload)
  }
}
const getters = {
  usingUtils (state, getters) {
    return state.filter(unit => unit.dependencies.indexOf(getters.selectMode.mode) > -1).map(({ name }) => name)
  },
  getUtilsByName (state) {
    return findName => state.find(({ name }) => name === findName)
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}
