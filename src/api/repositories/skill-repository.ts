import { api, getBearerToken } from '@/api/api-client'

export class SkillRepository {

    static async getSkilltree() {
        const config = {
            headers: {
                Authorization: await getBearerToken()
            },
        }

        const response = await api.get(`skilltrees/1`, config)

        console.log('test')
        return response?.data?.data
    }

}