import {setToken} from '@/custom/localStorage'
import {getToken} from '@/custom/localStorage'
import {getUser} from '@/custom/localStorage'
import {setUser} from '@/custom/localStorage'
const user= {
    state: {
        // user:getUser(),
        // token:getToken(),
        user:getUser(),
        token:getToken(),
        money:0
    },
    getters: {
        user:state=>state.user,
        token:state=>state.token
    },
    mutations: {
        setUser(state,user){
            state.user=user
            setUser(user)
        },
        setToken(state,token){
            state.token=token
            setToken(token)
        },
        setMoney(state,money){
            state.money=money
        }
    }
}
export default user