import axios from 'axios'
export default{
    namespaced: true, 
    state: {
        token: null,
        user: null
    },
    getters:{
        authenticated(state){
            return state.token
        },
        user(state){
            return state.user
        }
    },
    mutations:{
        SET_TOKEN(state, token){
            state.token = token
        },
        SET_USER(state, data){
            state.user = data
        }
    },

    actions:{
        async logIn({dispatch},credentials){
            let response = await axios.post('/login', credentials)
            return dispatch('attempt',response.data.token)
        },
        async attempt({commit, state}, token){
            if(token){
                commit('SET_TOKEN',token)
            }
            if(! state.token){
                return 
            }
            // axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.setItem('token',token);
            try {
                let response = await axios.get('/currentUser')
                commit('SET_USER', response.data.data)
            } catch (error) {
                console.log(error)
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