import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //API Gateway Config
    baseURL: 'https://xv7x6dgua0.execute-api.us-east-1.amazonaws.com/',
    env: 'Prod/',
    
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
