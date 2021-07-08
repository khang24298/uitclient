import axios from 'axios'
export default{
    namespaced: true, 
    state: {
        token: null,
        user: null,
        error: null,
    },
    getters:{
        authenticated(state){
            return state.token
        },
        user(state){
            return state.user
        },
        error(state){
            return state.error
        }
    },
    mutations:{
        SET_TOKEN(state, token){
            state.token = token
        },
        SET_USER(state, data){
            state.user = data
        },
        SET_ERROR(state, error){
            state.error = error
        }
    },

    actions:{
        async logIn({dispatch,commit},credentials){
            let response = await axios.post('/login', credentials)
            commit('SET_ERROR', response.data.message)
            return dispatch('attempt',response.data.token)
        },
        async attempt({commit, state}, token){
            if(token){
                commit('SET_TOKEN',token)
            }
            if(!state.token){
                return;
            }

            try {
                let response = await axios.get('/currentUser')
                commit('SET_USER', response.data.data)
            } catch (error) {
                (error)
            }
        },
        logOut({commit}){
            return axios.get('/logout').then(()=>{
                commit('SET_TOKEN', null)
                commit('SET_USER',null)
            })
        }
    }
}