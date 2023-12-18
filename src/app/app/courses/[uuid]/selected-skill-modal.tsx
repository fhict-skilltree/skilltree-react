'use client'

import {usePathname, useRouter, useSearchParams} from "next/navigation";
import React from "react";
import {Button, Modal} from "flowbite-react";

export default function SelectedSkillModal({ skill }) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const closeSkillModal = () => {
        const current = new URLSearchParams(Array.from(searchParams.entries()))
        current.delete('selectedSkillUuid')
        const search = current.toString();
        const query = search
            ? `?${search}`
            : '';
        router.push(`${pathname}${query}`, { scroll: false });
    }

    return (
        <>
            <Modal show={skill} onClose={() => closeSkillModal()} dismissible size="6xl" className={'top-center'}>
                {skill && <>
                    <Modal.Header>{skill.title}</Modal.Header>

                    <Modal.Body>
                        <div className="space-y-6">
                            <h2 className={"text-xl text-gray-800"}>Omschrijving</h2>
                            <p className="text-base leading-relaxed text-gray-500">
                                {skill.body}
                            </p>
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button color="gray" onClick={() => closeSkillModal()}>
                            Sluiten
                        </Button>
                    </Modal.Footer>
                </>}
            </Modal>
        </>
    );
}