import api from '../../utils/axios'

const getCurrentUser=async()=>{

    try{
        const {data}=await api.get('/me')
        return data
    }catch(error){
        if (error.response?.status === 401) return null
        throw error
    }
}

export default getCurrentUser