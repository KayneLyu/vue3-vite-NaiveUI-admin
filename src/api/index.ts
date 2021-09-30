import axios from "../utils/axios"

export const login = (data:IUserInfo) => axios.post('/login',data)