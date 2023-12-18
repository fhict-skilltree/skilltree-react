'use client'

import React from "react";
import {Button, Card} from "flowbite-react";

export default function CourseCards({ courses }) {
    return (
        <>
            {courses.map((course) =>
                <Card key={course.uuid} className={'mt-5'}>
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        { course.title }
                    </h5>

                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        { course.excerpt }
                    </p>

                    <Button href={`/app/courses/${course.uuid}`} key={course.uuid}>Naar cursus gaan</Button>
                </Card>
            )}
        </>
    );
}