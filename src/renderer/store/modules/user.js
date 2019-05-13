import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    userInfo: null
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NICKNAME: (state, name) => {
      state.userInfo.nickname = name
    },
    SET_USERINFO: (state, user) => {
      state.userInfo = user
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(data => {
          setToken('isLogin')
          commit('SET_TOKEN', 'isLogin')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(data => {
          commit('SET_USERINFO', data.user)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut ({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut ({ commit }) {
      return new Promise(resolve => {
        removeToken()
        commit('SET_TOKEN', '')
        resolve()
      })
    },

    userStatus ({ commit }) {
      return new Promise((resolve, reject) => {
        userAjax.getUserStatus()
          .then(response => {
            const { data } = response
            commit('SET_USERINFO', data.user)
            resolve(data.user.role)
          }).catch(error => {
            reject(error)
          })
      })
    }
  }
}

export default user
