import Vue from 'vue'
import Vuex from 'vuex'
import { getLogin } from '../api/login'
import { GETLOGIN } from './mutations-type'
import { DETAILCHANGE } from './mutations-type'
import { ORDETAI } from './mutations-type'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo:[],
    detailInfo:"",
    ordetais:[]
  },
  mutations: {
    [GETLOGIN]:(state,obj)=>{
      state.userInfo=obj
    },
    [DETAILCHANGE]:(state,str)=>{
      state.detailInfo=str
    },
    [ORDETAI]:(state,obj)=>{
      state.ordetais=obj
    },
  },
  actions: {
    loginGet({commit},{obj,callback,callback2}){
      getLogin(obj).then(({data})=>{
        console.log(data);
        if(!data.status){
          callback&&callback()
          commit('GETLOGIN',data.data)
        }else{
          callback2&&callback2()
        }
      })
    },
    detaiChange({commit},str){
      commit('DETAILCHANGE',str)
    },
    ordetai({commit},obj){
      commit('ORDETAI',obj)
    }
  }
})
