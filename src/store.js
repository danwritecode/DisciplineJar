import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //API Gateway Config
    baseURL: 'https://asblin6vj6.execute-api.us-east-2.amazonaws.com/',
    env: 'Dev/',
    
    signedIn: false,
  },
  mutations: {
    mutateAuthState(state, authState) {
      state.signedIn = authState
    },
  },
  actions: {

  }
})
