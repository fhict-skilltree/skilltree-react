'use client'

import { Handle, Position } from 'reactflow';
import {useCallback} from "react";
import {usePathname, useRouter, useSearchParams} from 'next/navigation'

export default function SubSkill({ data }) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const onClick = useCallback(() => {
        const current = new URLSearchParams(Array.from(searchParams.entries()))
        current.set("selectedSkillUuid", data.uuid);
        const search = current.toString();
        const query = search
            ? `?${search}`
            : '';
        router.push(`${pathname}${query}`, { scroll: false });
    }, []);

    return (
        <>
            <Handle
                type="source"
                position={Position.Top}
                id="source-node"
                className={"invisible"}
            />

            <div className={"text-center rounded-md bg-white px-3 py-2 text-xs text-gray-800 font-semibold border-2 border-slate-500  shadow-sm hover:border-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"}
                 style={{width: '200px'}}
                 onClick={onClick}
            >
                { data.label}
            </div>

            <Handle
                type="target"
                position={Position.Bottom}
                id="target-node"
                className={"invisible"}
            />
        </>
    );
}