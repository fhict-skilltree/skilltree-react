'use client'

import { Handle, Position } from 'reactflow';
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useCallback} from "react";

export default function RootSkill({ data }) {
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
                className={"invisible"}
            />

            <div className={"text-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"}
                 style={{width: 150}}
                 onClick={onClick}
            >
                { data.label}
            </div>
        </>
    );
}