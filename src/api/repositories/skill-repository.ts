'use server'

import { api, getBearerToken } from '@/api/api-client'

export const getSkilltree = async () => {
    const config = {
        headers: {
            Authorization: await getBearerToken()
        },
    }

    const response = await api.get(`skilltrees/1`, config)

    return response?.data?.data
}

export const getSkill = async (uuid) => {
    const config = {
        headers: {
            Authorization: await getBearerToken()
        },
    }

    const response = await api.get(`skills/${uuid}`, config)

    return response?.data?.data
}