import { signInWithPopup } from 'firebase/auth'
import { FcGoogle } from 'react-icons/fc'
import { auth, googleProvider } from '../../utils/firebase'
import api from '../../utils/axios'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setUserdata } from '../redux/userSlice'

function Home() {
  const { userData } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const handleLogin = async (token) => {
    try {
      const { data } = await api.post('/auth/login', { token })
      dispatch(setUserdata(data.user))
    } catch (error) {
      console.error('Login request failed:', error)
    }
  }

  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const token = await result.user.getIdToken()
      await handleLogin(token)
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  if (userData) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0e0f14] text-white">
        <section className="flex w-[340px] flex-col gap-4 rounded-2xl border border-white/[0.08] bg-[#13151c] p-7">
          <h1 className="text-[17px] font-semibold tracking-tight text-slate-100">
            Welcome{userData.name ? `, ${userData.name}` : ' to CortexAI'}
          </h1>
          <p className="text-[13px] text-slate-500">You are signed in.</p>
          <button
            type="button"
            className="h-11 w-full rounded-2xl border border-white/[0.12] font-semibold transition-colors hover:bg-white/[0.06]"
            onClick={async () => {
              try {
                await api.post('/auth/logout')
                dispatch(setUserdata(null))
              } catch (error) {
                console.error('Logout request failed:', error)
              }
            }}
          >
            Sign out
          </button>
        </section>
      </main>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#0e0f14] text-white">
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <div className="flex w-[340px] flex-col gap-5 rounded-2xl border border-white/[0.08] bg-[#13151c] p-7">
          <div>
            <h2 className="text-[17px] font-semibold tracking-tight text-slate-100">Welcome to CortexAI</h2>
            <p className="text-[13px] text-slate-500">Please login to continue using the app</p>
          </div>

          <button
            type="button"
            className="flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-amber-500 text-base font-semibold transition-colors hover:bg-amber-400"
            onClick={googleLogin}
          >
            <FcGoogle size={15} />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
