import { useEffect } from 'react'
import Home from './pages/Home.jsx'
import getCurrentUser from './features/getCurrentUser.js'
import { useDispatch } from 'react-redux'
import { setUserdata } from './redux/userSlice.js'


function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    let active = true

    const loadUser = async () => {
      try {
        const user = await getCurrentUser()
        if (active) dispatch(setUserdata(user))
      } catch (error) {
        console.error('Unable to load current user:', error)
      }
    }

    loadUser()
    return () => {
      active = false
    }
  }, [dispatch])
  return (
    <Home />
  )
}

export default App