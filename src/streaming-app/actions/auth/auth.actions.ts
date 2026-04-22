import { streamingApi } from "@/api/streaming.api"
import type { AuthResponse, LoginRequest, RegisterRequest } from "@/interfaces/auth/auth.interface"

export const loginAction = async (request: LoginRequest) => {
    try {
        const response = await streamingApi.post<AuthResponse>('/auth/login', request)
        return response.data
    } catch (error) {
        throw error
    }
}

export const registerAction = async (request: RegisterRequest) => {
    try {
        const response = await streamingApi.post<AuthResponse>('/auth/register', request)
        return response.data
    } catch (error) {
        throw error
    }
}

export const refreshTokenAction = async () => {
    try {
        const response = await streamingApi.post<AuthResponse>('/auth/refresh')
        return response.data
    } catch (error) {
        throw error
    }
}

export const selectProfileAction = async (profileId: number) => {
    try {
        const response = await streamingApi.post<AuthResponse>(`/auth/select-profile/${profileId}`)
        return response.data
    } catch (error) {
        throw error
    }
}

export const logoutAction = async () => {
    try {
        const response = await streamingApi.post('/auth/logout')
        return response.data
    } catch (error) {
        throw error
    }
}