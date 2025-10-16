import { http } from '@/utils'
import type { AccountDetail, ApiResponse } from 'types'

export const updateAccountInfoAPI = async (data: AccountDetail) => {
  const response = await http.put<ApiResponse<AccountDetail>>(`/account/updateInfo`, data)
  return response.data.data
}
