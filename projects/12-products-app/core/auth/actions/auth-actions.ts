import { productsApi } from '../../api/productsApi'

export interface AuthResponse {
  id: string
  email: string
  fullName: string
  isActive: boolean
  roles: string[]
  token: string
}

const returnUserToken = (data: AuthResponse) => {
  const { token, ...user } = data

  return {
    user,
    token,
  }
}

export const authLogin = async (email: string, password: string) => {
  email = email.toLowerCase()

  try {
    const { data } = await productsApi.post<AuthResponse>('/auth/login', {
      email,
      password,
    })

    return returnUserToken(data)
  } catch (error) {
    console.error('Error logging in:', error)
    throw new Error('Login failed')
  }
}

export const authCheckStatus = async () => {
  try {
    const { data } = await productsApi.get<AuthResponse>('/auth/check-status')

    return returnUserToken(data)
  } catch (error) {
    return null
  }
}
