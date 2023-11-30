import SkilltreeFlow from "@/components/SkilltreeFlowBuilder/SkilltreeFlow";

function mapSkillsToNodes(skills) {
    const position = {x: 0, y: 0};

    return skills.map((skill) => {
        const skillHasChildren = skills.filter(searchedSkill => searchedSkill.parent_skill_id === skill.id).length > 0

        const nodeType = skill.parent_skill_id === null
            ? 'rootSkill'
            : skillHasChildren
            ? 'subSkill'
                : 'leafSkill'

        return {
            id: `${skill.id}`,
            type: nodeType,
            data: {
                label: skill.title,
            },
            position,
            markerEnd: {
                // type: MarkerType.ArrowClosed,
                width: 20,
                height: 20,
                color: '#FF0072',
            },
        }
    })
}

function mapSkillsToEdges(skills) {
    return skills
        .filter((skill): boolean => skill.parent_skill_id !== null)
        .map((skill) => {
            return {
                id: `${skill.parent_skill_id}-${skill.id}`,
                source: `${skill.parent_skill_id}`,
                target: `${skill.id}`,
            }
        })
}

export default async function SkilltreeTest({}) {
    const skills = await getSkilltree()

    const nodes = mapSkillsToNodes(skills)
    const edges = mapSkillsToEdges(skills)

    return (
        <main>
            <div className={"container mx-auto"}>
                <div className={"border-4 border-blue-600"} style={{height: '800px'}}>
                    <SkilltreeFlow
                        initialNodes={nodes}
                        initialEdges={edges}/>
                </div>
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
    ]
}

async function getSkilltree2() {
    return [
        {
            id: 1,
            title: 'Semester 2',
            parent_id: null,
            children: [
                {
                    id: 2,
                    title: 'Software Programming',
                    parent_id: 1,
                    children: [
                        {
                            id: 3,
                            title: 'Html Word',
                            children: [],
                        },
                        {
                            id: 4,
                            title: 'Flex Word',
                            children: [],
                        },
                        {
                            id: 5,
                            title: 'Spacious Word',
                            children: [],
                        },
                    ],
                },
                {
                    id: 6,
                    title: 'Another Word',
                    parent_id: 1,
                    children: [
                        {
                            id: 7,
                            title: 'CSS Word',
                            children: [
                                {
                                    id: 8,
                                    title: 'PHP Word',
                                    children: [],
                                },
                                {
                                    id: 9,
                                    title: 'Node Word',
                                    children: [],
                                },
                            ],
                        }
                    ],
                },
                {
                    title: 'Hello Word',
                    id: 10,
                    parent_id: 1,
                    children: [
                        {
                            id: 11,
                            title: 'Sans Word',
                            children: [
                                {
                                    id: 12,
                                    title: 'JSX Word',
                                    children: [],
                                },
                                {
                                    id: 13,
                                    title: 'Vue Word',
                                    children: [],
                                },
                            ],
                        }
                    ],
                },
            ],
        }
    ]
}