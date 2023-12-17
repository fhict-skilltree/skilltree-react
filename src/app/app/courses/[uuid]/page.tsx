import SkilltreeFlow from "@/components/SkilltreeFlowBuilder/SkilltreeFlow";
import {Card} from 'flowbite-react';
import {findByUuid} from "@/api/repositories/course-repository";
import {getSkilltree, getSkill} from "@/api/repositories/skill-repository";
import React from "react";
import SelectedSkillModal from "@/app/app/courses/[uuid]/selected-skill-modal";

export default async function SkilltreeTest({ params, searchParams }) {
    const course = await findByUuid({
        courseUuid: params.uuid,
    })
    const skills = await getSkilltree()
    const selectedSkillUuid = searchParams?.selectedSkillUuid
    const currentSelectedSkill = selectedSkillUuid
        ? await getSkill(selectedSkillUuid)
        : null;

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

            <SelectedSkillModal skill={currentSelectedSkill} />
        </main>
    )
}
