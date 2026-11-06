import { signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../utils/firebase'
import api from '../utils/axios'

function App() {

  const handleLogin=async(token)=>{
  
    try{
     const {data}=await api.post("/auth/login",{token})
     console.log(data);
    }catch(error){
       console.log(error)
  
  }
}
  const googleLogin = async () => {
    try {
      const data = await signInWithPopup(auth, googleProvider)
      const token=await data.user.getIdToken()
      console.log(token)
      await handleLogin(token)
      console.log(data)
    } catch (error) {
      console.error("Login failed:", error)
    }
  }

  return (
    <div className='w-full h-screen bg-black flex items-center justify-center'>
      <button 
        onClick={googleLogin}
        className='w-48 h-16 bg-amber-400 font-semibold rounded-lg hover:bg-amber-500 transition-colors'
      >
        Continue with google
      </button>
    </div>
  )
}

export default App