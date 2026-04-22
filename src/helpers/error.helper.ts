import type { ApiError } from "@/interfaces/error/apiError.interface"
import { errorMessagesMapper } from "@/mappers/error.mapper"
import axios from "axios"

export const handleApiError = (error: unknown): ApiError => {
    if (axios.isAxiosError(error)) {
        const apiError = error.response?.data as ApiError

        return {
            message: apiError?.message || "Error desconocido",
            code: apiError?.code,
            errors: apiError?.errors || {},
            statusCode: apiError?.statusCode || error.response?.status || 500
        }
    }

    return {
        message: "Error inesperado",
        code: "UNEXPECTED_ERROR",
        errors: {},
        statusCode: 500
    }
}


export const validationErrorsMapper = (errors: Record<string, string[]>): string[] => {
    let validationErrors: string[] = [];

    Object.entries(errors).forEach(([_, messages]) => {
        validationErrors.push(errorMessagesMapper[messages[0]] || messages[0])
    })

    return validationErrors
}