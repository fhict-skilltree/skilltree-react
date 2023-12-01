import { Handle, Position } from 'reactflow';

export default function LeafSkill({ data }) {
    return (
        <>
            <div className={"text-center rounded-md bg-white px-3 py-2 text-xs text-gray-800 font-semibold border-2 border-slate-500  shadow-sm hover:border-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"}
                 style={{width: '200px'}}
            >
                { data.label}
            </div>

            <Handle
                type="target"
                position={Position.Bottom}
                className={"invisible"}
                isConnectable={false}
            />
        </>
    );
}