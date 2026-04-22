import { streamingApi } from "@/api/streaming.api"
import type { UserAdminDto, UserChangeStatusDto } from "@/interfaces/dto/user.dto"

export const getUsersAdminAction = async () => {
    try {
        const { data } = await streamingApi.get<UserAdminDto[]>('/users/admin')
        return data
    } catch (error) {
        throw error;
    }
}

export const changeUserStatusAction = async (id: string, isActive: boolean) => {
    try {
        const { data } = await streamingApi.patch<UserChangeStatusDto>(`/users/${id}/change-status`, { isActive })
        return data
    } catch (error) {
        throw error;
    }
}
