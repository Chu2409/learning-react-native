import { AppwriteUser } from '@/interfaces/user.interface'
import { getCurrentUser, signIn, signOut } from '@/lib/appwrite'
import { createContext, useContext, useState, useEffect } from 'react'

interface AuthContextState {
  isLoggedIn: boolean
  user: AppwriteUser | null
  isLoading: boolean
}

interface AuthContextActions {
  setIsLoggedIn: (value: boolean) => void
  setUser: (user: AppwriteUser | null) => void
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

type GlobalContextType = AuthContextState & AuthContextActions

const GlobalContext = createContext({} as GlobalContextType)

export const useGlobalContext = () => useContext(GlobalContext)

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<AuthContextState>({
    isLoggedIn: false,
    user: null,
    isLoading: true,
  })

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const currentUser = await getCurrentUser()
        setState((prev) => ({
          ...prev,
          isLoggedIn: !!currentUser,
          user: currentUser,
          isLoading: false,
        }))
      } catch (error) {
        console.error('Error al inicializar auth:', error)
        setState((prev) => ({
          ...prev,
          isLoggedIn: false,
          user: null,
          isLoading: false,
        }))
      }
    }

    initializeAuth()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      await signIn({ email, password })
      const user = await getCurrentUser()

      setState((prev) => ({
        ...prev,
        isLoggedIn: true,
        user,
      }))
    } catch (error) {
      console.error('Error en login:', error)
      setState((prev) => ({
        ...prev,
        isLoggedIn: false,
        user: null,
      }))
      throw error
    }
  }

  const logout = async () => {
    try {
      await signOut()
      setState((prev) => ({
        ...prev,
        isLoggedIn: false,
        user: null,
      }))
    } catch (error) {
      console.error('Error en logout:', error)
      throw error
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        setIsLoggedIn: (isLoggedIn: boolean) =>
          setState((prev) => ({ ...prev, isLoggedIn })),
        setUser: (user: AppwriteUser | null) =>
          setState((prev) => ({ ...prev, user })),
        login,
        logout,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider
