import { createContext } from 'react'
import type { Account } from './account.type'
import { getAccessTokenFromLocalStorage, getProfileFromLocalStorage } from '@/utils'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: Account | null
  setProfile: React.Dispatch<React.SetStateAction<Account | null>>
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLocalStorage()),
  setIsAuthenticated: () => {},
  profile: getProfileFromLocalStorage(),
  setProfile: () => {}
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)
export type { AppContextInterface }
