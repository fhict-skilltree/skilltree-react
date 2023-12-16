'use client'

import ELK from 'elkjs/lib/elk.bundled.js';
import React, {useCallback, useLayoutEffect, useMemo, useState} from 'react';
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    Controls,
    useNodesState,
    useEdgesState,
    useReactFlow,
    MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import {Button, Modal} from 'flowbite-react';
import RootSkill from '@/components/SkilltreeFlowBuilder/Nodes/RootSkill'
import SubSkill from "@/components/SkilltreeFlowBuilder/Nodes/SubSkill";
import LeafSkill from "@/components/SkilltreeFlowBuilder/Nodes/LeafSkill";


const elk = new ELK();

// Elk has a *huge* amount of options to configure. To see everything you can
// tweak check out:
//
// - https://www.eclipse.org/elk/reference/algorithms.html
// - https://www.eclipse.org/elk/reference/options.html
const elkOptions = {
    'elk.algorithm': 'layered',
    'elk.layered.spacing.nodeNodeBetweenLayers': '100',
    'elk.spacing.nodeNode': '80',
    'elk.layered.nodePlacement.horizontalAlignment': 'MEDIAN',
    'elk.layered.nodePlacement.verticalAlignment': 'MEDIAN',
};

const getLayoutedElements = (nodes, edges, options = {}) => {
    const isHorizontal = options?.['elk.direction'] === 'RIGHT';
    const graph = {
        id: 'root',
        layoutOptions: options,
        children: nodes.map((node) => ({
            ...node,
            // Adjust the target and source handle positions based on the layout
            // direction.
            targetPosition: isHorizontal ? 'left' : 'top',
            sourcePosition: isHorizontal ? 'right' : 'bottom',

            // Hardcode a width and height for elk to use when layouting.
            width: 200,
            height: 50,
        })),
        edges: edges,
    };

    return elk
        .layout(graph)
        .then((layoutedGraph) => ({
            nodes: layoutedGraph.children.map((node) => ({
                ...node,
                // React Flow expects a position property on the node instead of `x`
                // and `y` fields.
                position: {x: node.x, y: node.y},
            })),

            edges: layoutedGraph.edges,
        }))
        .catch(console.error);
};


function mapSkillsToNodes(skills) {
    const position = {x: 0, y: 0};

    return skills.map((skill) => {
        const skillHasChildren = skills.filter(searchedSkill => searchedSkill.parent_skill_uuid === skill.uuid).length > 0

        const nodeType = skill.parent_skill_uuid === null
            ? 'rootSkill'
            : skillHasChildren
                ? 'subSkill'
                : 'leafSkill'

        return {
            id: skill.uuid,
            type: nodeType,
            data: {
                label: skill.title,
                uuid: skill.uuid,
            },
            position,
            draggable: false,
        }
    })
}

function mapSkillsToEdges(skills) {
    return skills
        .filter((skill): boolean => skill.parent_skill_uuid !== null)
        .map((skill) => {
            return {
                id: `${skill.parent_skill_uuid}-${skill.uuid}`,
                source: `${skill.parent_skill_uuid}`,
                target: `${skill.uuid}`,
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    width: 20,
                    height: 20,
                    // color: '#FF0072',
                },
            }
        })
}

function LayoutFlow({initialNodes, initialEdges}) {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const {fitView} = useReactFlow();

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);
    const onLayout = useCallback(
        ({direction, useInitialNodes = false}) => {
            const opts = {'elk.direction': direction, ...elkOptions};
            const ns = useInitialNodes ? initialNodes : nodes;
            const es = useInitialNodes ? initialEdges : edges;

            getLayoutedElements(ns, es, opts).then(({nodes: layoutedNodes, edges: layoutedEdges}) => {
                setNodes(layoutedNodes);
                setEdges(layoutedEdges);

                window.requestAnimationFrame(() => fitView());
            });
        },
        [nodes, edges]
    );

    // Calculate the initial layout on mount.
    useLayoutEffect(() => {
        onLayout({direction: 'UP', useInitialNodes: true});
    }, []);

    const nodeTypes = useMemo(() => ({
        rootSkill: RootSkill,
        subSkill: SubSkill,
        leafSkill: LeafSkill,
    }), [])

    return (
        <ReactFlow
            nodeTypes={nodeTypes}
            nodes={nodes}
            edges={edges}
            onConnect={onConnect}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            fitView
            attributionPosition={"bottom-left"}
        >
            <Controls
                showInteractive={false}
                position={"bottom-right"}
            />
        </ReactFlow>
    );
}

export default function SkilltreeFlow({skills}) {
    const initialNodes = mapSkillsToNodes(skills)
    const initialEdges = mapSkillsToEdges(skills)

    const [openModal, setOpenModal] = useState(false);


    return (
        <ReactFlowProvider>
            <LayoutFlow
                initialNodes={initialNodes}
                initialEdges={initialEdges}
                // onSkillHandler
            >
            </LayoutFlow>

            <Button onClick={() => setOpenModal(true)}>Test modal</Button>
            <Modal show={openModal} onClose={() => setOpenModal(false)} dismissible size="4xl">
                <Modal.Header>HTML & CSS</Modal.Header>

                <Modal.Body>
                    <div className="space-y-6">
                        <h2 className={"text-xl text-gray-800"}>Omschrijving</h2>
                        <p className="text-base leading-relaxed text-gray-500">
                            In dit overzicht vind je de skilltree voor je huidige opleiding. Dit is een tool waarin de
                            voortgang van je semester in bijgehouden kan worden. In het overzicht vind je een
                            totaalbeeld van de mogelijke vaardigheden die je in dit semester kunt leren. De skilltree
                            doorloop je vanaf boven naar bedenden. Om een vaardigheid af te tekenen, moet je voldoende
                            bewijs aanleveren. Klik op een vaardigheid voor meer informatie.
                        </p>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button color="gray" onClick={() => setOpenModal(false)}>
                        Sluiten
                    </Button>
                </Modal.Footer>
            </Modal>
        </ReactFlowProvider>
    );
}