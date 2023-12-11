import { api, getBearerToken } from '@/api/api-client'

export class CourseRepository {

    static async getUserCourses() {
        const config = {
            headers: {
                Authorization: await getBearerToken()
            },
        }

        console.log(api.defaults.baseURL)

        const response = await api.get('/current-user/courses', config)

        return response?.data?.data
    }

}