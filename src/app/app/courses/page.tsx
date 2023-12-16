import {CourseRepository} from "@/api/repositories/course-repository";
import {Button, Card} from "flowbite-react";

export default async function Page({}) {
    const courses = await CourseRepository.getUserEnrolledCourses()

    return (
        <div className={'container mx-auto'}>
            <div className={'grid gap-4 md:grid-cols-2'}>
                {courses.map((course) =>
                    <Card href={`/app/courses/${course.uuid}`} key={course.uuid}>
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            { course.title }
                        </h5>

                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            { course.excerpt }
                        </p>

                        <Button href={`/app/courses/${course.uuid}`} key={course.uuid}>Naar cursus gaan</Button>
                    </Card>
                )}
            </div>
        </div>
    )
}
