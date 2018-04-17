import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const createStore = () => {
  return new Vuex.Store({
    state: {
      userToken: null,
      userName:null,
    },
    mutations: {
      SET_USER: function SET_USER(state, user) {
        // eslint-disable-next-line
        state.userToken = user.id;
        state.userName = user.username;
      }
    
   },
   getters : {
     getUser: state => {
         return state.userToken
     }
   },
   actions : {
    setUser(context, data) {
        context.commit('setUser', data);
    }
   }
})
}

export default createStore

