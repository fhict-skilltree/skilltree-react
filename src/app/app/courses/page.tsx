import {getUserEnrolledCourses} from "@/api/repositories/course-repository";
import CourseCards from "@/app/app/courses/course-cards";

export default async function Page({}) {
    const courses = await getUserEnrolledCourses()

    return (
        <div className={'container mx-auto'}>
            <div className={'mt-4'}>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Cursussen</h1>
            </div>

            <div className={'grid gap-4 md:grid-cols-2'}>
                <CourseCards courses={courses}/>
            </div>
        </div>
    )
}
