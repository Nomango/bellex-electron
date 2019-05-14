import Cookies from 'js-cookie'

const app = {
  state: {
    isCollapse: false,
    device: 'desktop'
  },
  mutations: {
    CHANGE_COLLAPSE: (state) => {
      state.isCollapse = !state.isCollapse
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    }
  },
  actions: {
    ToggleDevice ({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    ToggleSidebar ({ commit }) {
      commit('CHANGE_COLLAPSE')
    }
  }
}

export default app
