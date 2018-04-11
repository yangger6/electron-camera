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
    filters: ['', 'grayscale', 'sepia', 'saturate', 'invert', 'opacity', 'brightness', 'contrast', 'blur', 'tint', 'multiple-filters', 'inkwell'],
    selectIndex: 0,
    dependencies: ['photo', 'square']
  }
]
const mutations = {
  CHANGE_UTILS_STATE (state, payload) {
    Object.assign(state, state.map(unit => unit.id === payload.id ? payload : unit))
  }
}
const actions = {
  changeUnitsState ({ commit }, payload) {
    commit('CHANGE_UTILS_STATE', payload)
  }
}
const getters = {
  usingUtils (state, getters) {
    return state.filter(unit => unit.dependencies.indexOf(getters.selectMode.mode) > -1).map(({ name }) => name)
  },
  filterList (state) {
    return state.find(({ name }) => name === 'filter').filters
  },
  selectFilter (state) {
    let filter = state.find(({ name }) => name === 'filter')
    return filter.filters[filter.selectIndex]
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}
