import { Handle, Position } from 'reactflow';

export default function RootSkill({ data }) {
    return (
        <>
            <Handle
                type="source"
                position={Position.Top}
                className={"invisible"}
            />

            <div className={"text-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"}
                 style={{width: 150}}
            >
                { data.label}
            </div>
        </>
    );
}