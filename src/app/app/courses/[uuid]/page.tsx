import SkilltreeFlow from "@/components/SkilltreeFlowBuilder/SkilltreeFlow";
import { Card } from 'flowbite-react';
import {CourseRepository} from "@/api/repositories/course-repository";
import {SkillRepository} from "@/api/repositories/skill-repository";

export default async function SkilltreeTest({ params }) {
    const course = await CourseRepository.findByUuid({
        courseUuid: params.uuid,
    })

    const skills = await SkillRepository.getSkilltree()

    return (
        <main>
            <div className="container mx-auto">
                <Card className={"mt-5"}>
                    <div className="grid grid-cols-12">
                        <div className={"col-span-8"}>
                            <h5 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                { course.title }
                            </h5>

                            <p className={"mt-2"}>
                                { course.content }
                            </p>
                        </div>

                        <div>

                        </div>
                    </div>
                </Card>

                <Card className={"mt-5"}>
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        Skilltree
                    </h5>

                    <div style={{height: '800px'}}>
                        <SkilltreeFlow skills={skills}/>
                    </div>
                </Card>
            </div>
        </main>
    )
}
