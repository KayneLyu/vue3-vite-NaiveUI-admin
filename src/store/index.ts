import { createStore } from 'vuex'

const defaultState = {
  count: 0,
  sideBar:{},
  isLoading :false,
}

// Create a new store instance.
export default createStore({
  state() {
    return defaultState
  },
  mutations: {
    increment(state: typeof defaultState) {
      state.count++
    },
    getSideBar( state,userInfo:any ) {
      state.sideBar = userInfo
    },
    changeLoading (state) {
      state.isLoading = true
    }
  },
  actions: {
    increment(context) {
      context.commit('increment')
    }
  },
  getters: {
    double(state: typeof defaultState) {
      return 2 * state.count
    }
  }
})