import { AppContext, type Account, type AppContextInterface } from '@/types'
import { getAccessTokenFromLocalStorage, getProfileFromLocalStorage } from '@/utils'
import { useState } from 'react'

const initialAppContext = {
  isAuthenticated: Boolean(getAccessTokenFromLocalStorage()),
  profile: getProfileFromLocalStorage()
}

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [profile, setProfile] = useState<Account | null>(initialAppContext.profile)

  const value: AppContextInterface = {
    isAuthenticated,
    setIsAuthenticated,
    profile,
    setProfile
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
