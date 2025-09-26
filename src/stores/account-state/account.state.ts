import type { SubStore } from '../type'
import type { AccountState } from './type'

export const getAccountStore: SubStore<AccountState> = (set, get, _store) => ({
  count: 0,
  increase: () =>
    set((s) => {
      s.account.count += 1
    }),
  decrease: () =>
    set((s) => {
      s.account.count -= 1
    })
})
