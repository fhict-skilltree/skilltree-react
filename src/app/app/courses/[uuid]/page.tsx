import SkilltreeFlow from "@/components/SkilltreeFlowBuilder/SkilltreeFlow";
import {Button, Card, Modal } from 'flowbite-react';


export default async function SkilltreeTest({}) {
    const skills = await getSkilltree()

    return (
        <main>
            <div className="max-w-screen-xl mx-auto">
                <Card className={"mt-5"}>
                    <div className="grid grid-cols-12">
                        <div className={"col-span-8"}>
                            <h5 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                Semester 2 <span></span>
                            </h5>

                            <p className={"mt-2"}>
                                In dit overzicht vind je de skilltree voor je huidige opleiding. In de skilltree vind je een
                                selectie aan vaardigheden die je in dit semester kunt gaan aantonen. De skilltree doorloop je
                                vanaf boven naar bedenden. Het is de bedoeling dat je zelf een keuze maakt aan welke
                                vaardigheden jij wilt werken. Wanneer je denk dat je een vaardigheid voldoende hebt aangetoond,
                                kun je dit voor jezelf afvinken. De docent zal in jouw periodieke beoordelingen vaststellen op
                                welk niveau jij de leeruitkomsten aantoond.
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


async function getSkilltree() {
    return [
        {
            id: 1,
            title: 'Semester 2',
            parent_skill_id: null,
        },
        {
            id: 2,
            title: 'Software Programming',
            parent_skill_id: 1,
        },
        {
            id: 3,
            title: 'Html Word',
            parent_skill_id: 1,
        },
        {
            id: 4,
            title: 'Flex Word',
            parent_skill_id: 2,
        },
        {
            id: 5,
            title: 'Spacious Word',
            parent_skill_id: 2,
        },
        {
            id: 6,
            title: 'Another Word',
            parent_skill_id: 4,
        },
        {
            id: 7,
            title: 'CSS Word',
            parent_skill_id: 4,
        },
        {
            id: 8,
            title: 'PHP Word',
            parent_skill_id: 5,
        },
        {
            id: 9,
            title: 'Node Word',
            parent_skill_id: 5,
        },
        {
            id: 10,
            title: 'Hello Word',
            parent_skill_id: 5,
        },
        {
            id: 11,
            title: 'Sans Word',
            parent_skill_id: 5,
        },
        {
            id: 12,
            title: 'JSX Word',
            parent_skill_id: 10,
        },
        {
            id: 13,
            title: 'Vue Word',
            parent_skill_id: 9,
        },
        {
            id: 14,
            title: 'Semester 3',
            parent_skill_id: null,
        },
        {
            id: 15,
            title: 'Java',
            parent_skill_id: 14,
        },
    ]
}