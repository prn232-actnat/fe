import type { ApiResponse, AuthResponse } from 'types'
import {
  clearLocalStorage,
  getAccessTokenFromLocalStorage,
  setAccessTokenToLocalStorage,
  setProfileToLocalStorage
} from './auth'
import axios, { AxiosError, HttpStatusCode, type AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import { paths } from '@/constants'

const API_BASE_URL = 'http://localhost:8080/' //add later

class Http {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    this.accessToken = getAccessTokenFromLocalStorage()
    this.instance = axios.create({
      baseURL: API_BASE_URL,
      timeout: 180000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = `Bearer ${this.accessToken}`
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    this.instance.interceptors.response.use(
      (response) => {
        const url = response.config.url
        if (url == paths.login || url == paths.register) {
          const data = response.data as ApiResponse<AuthResponse>
          console.log('Intercepter data: ', data)
          if (!data) {
            return response
          }
          this.accessToken = data.data.accessToken || ''
          setAccessTokenToLocalStorage(this.accessToken)
          setProfileToLocalStorage(data.data)
        } else if (url == paths.logout) {
          this.accessToken = ''
          clearLocalStorage()
        }
        return response
      },
      (error: AxiosError) => {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data?.message || error.message
          toast.error(message)
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export { http }
