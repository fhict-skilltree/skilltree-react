'use client'

import ELK from 'elkjs/lib/elk.bundled.js';
import React, {useCallback, useLayoutEffect, useMemo} from 'react';
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    Controls,
    useNodesState,
    useEdgesState,
    useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';
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
        >
            <Controls
                showInteractive={false}
                position={"bottom-right"}
            />
        </ReactFlow>
    );
}

export default function SkilltreeFlow({initialNodes, initialEdges}) {
    return (
        <ReactFlowProvider>
            <LayoutFlow
                initialNodes={initialNodes}
                initialEdges={initialEdges}
            >
            </LayoutFlow>
        </ReactFlowProvider>
    );
}