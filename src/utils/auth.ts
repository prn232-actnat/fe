import type { AuthResponse } from '@/types'

export const setAccessTokenToLocalStorage = (accessToken: string): void => {
  localStorage.setItem('access_token', accessToken)
}

export const getAccessTokenFromLocalStorage = () => {
  console.log('getAccessTokenFromLocalStorage called')
  return localStorage.getItem('access_token') || ''
}

export const getProfileFromLocalStorage = () => {
  const profile = localStorage.getItem('profile')
  try {
    return profile ? JSON.parse(profile) : null
  } catch {
    return null
  }
}

export const setProfileToLocalStorage = (profile: AuthResponse) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}

export const clearLocalStorage = (): void => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('profile')
}
