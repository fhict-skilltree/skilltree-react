import { redirect } from 'next/navigation'
import {auth} from '@/app/api/auth/[...nextauth]/route'
import {CourseRepository} from "@/api/repositories/course-repository";

export default async function Dashboard({}) {
    const session = await auth()

    const courses = await CourseRepository.getUserCourses()
    console.log(courses)

   return <h1>test</h1>
    // TODO get latest course id from backend
    const courseUuid = '954507e2-3bdb-43e0-bd60-1985c2961673'

    if (session?.user) {
        redirect(`/app/courses/${courseUuid}`)
    }

    return (
        <div>
            Cannot redirect user to latest course because the user has not been added to a course.
        </div>
    )

    redirect('/api/auth/signin')
}
