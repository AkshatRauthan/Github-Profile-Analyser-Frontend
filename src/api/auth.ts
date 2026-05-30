import { api } from './client'
import type { ApiResponse, AuthTokens, User } from '@/types'

export async function register(email: string, password: string, username: string) {
  const { data } = await api.post<ApiResponse<{ user: User; tokens: AuthTokens }>>('/auth/register', {
    email,
    password,
    username,
  })
  return data.data
}

export async function login(email: string, password: string) {
  const { data } = await api.post<ApiResponse<{ user: User; tokens: AuthTokens }>>('/auth/login', {
    email,
    password,
  })
  return data.data
}

export async function getAuthProfile() {
  const { data } = await api.get<ApiResponse<User>>('/auth/profile')
  return data.data
}
