import { getCurrentUser, signIn, signOut } from '@/lib/appwrite'
import { createContext, useContext, useState, useEffect } from 'react'
import type { Models } from 'react-native-appwrite'

// Tipos
interface AppwriteUser extends Models.Document {
  accountId: string
  username: string
  email: string
  avatar: string
}

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

// Valor inicial del contexto
const initialContext: GlobalContextType = {
  isLoggedIn: false,
  user: null,
  isLoading: true,
  setIsLoggedIn: () => {},
  setUser: () => {},
  login: async () => {},
  logout: async () => {},
}

const GlobalContext = createContext<GlobalContextType>(initialContext)

// Hook personalizado con verificación de contexto
export const useGlobalContext = () => {
  const context = useContext(GlobalContext)
  if (!context) {
    throw new Error(
      'useGlobalContext debe ser usado dentro de un GlobalProvider',
    )
  }
  return context
}

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<AuthContextState>({
    isLoggedIn: false,
    user: null,
    isLoading: true,
  })

  // Funciones de autenticación
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

  // Inicialización
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

  const value = {
    ...state,
    setIsLoggedIn: (isLoggedIn: boolean) =>
      setState((prev) => ({ ...prev, isLoggedIn })),
    setUser: (user: AppwriteUser | null) =>
      setState((prev) => ({ ...prev, user })),
    login,
    logout,
  }

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  )
}

export default GlobalProvider
