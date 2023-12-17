'use server'

import axios, { AxiosResponse } from 'axios'
import {auth} from '@/app/api/auth/[...nextauth]/route'
import {redirect} from "next/navigation";

export const getBearerToken = async () => {
    const session = await auth()

    return `Bearer ${session?.accessToken}`
}

export const getAuthenticatedUserUuid = async () => {
    // const session = await auth()

    // TODO:
    return 'ce120cca-166b-4d68-a255-4587c025de6a'
}

const api = axios.create({
    baseURL: process.env.BACKEND_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
})

const onReject = async (err: any) => {
    if (err.response?.status === 401) {
        redirect('/api/auth/signin')
    }

    return Promise.reject(err)
}

api.interceptors.response.use((res) => res, onReject)

export { api }