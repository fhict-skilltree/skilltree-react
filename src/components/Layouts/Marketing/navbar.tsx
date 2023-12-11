'use client'

import { Button, Navbar as FlowbiteNavbar} from 'flowbite-react';
import Link from 'next/link';
import { signIn } from "next-auth/react"

export default function Navbar() {
    return (
        <header className={"shadow z-50"}>
            <FlowbiteNavbar fluid rounded className={"max-w-screen-xl mx-auto"}>
                <FlowbiteNavbar.Brand href="/">
                    <span
                        className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                      <span className={"text-sky-800"}>TalentPulse</span>
                    </span>
                </FlowbiteNavbar.Brand>

                <div className="flex md:order-2">
                    <Button onClick={() => signIn(undefined, { callbackUrl: '/app/dashboard' })}>Inloggen</Button>
                    {/*<Button as={Link} href={"/api/auth/signin"}>Inloggen</Button>*/}
                    <FlowbiteNavbar.Toggle/>
                </div>

                {/*<FlowbiteNavbar.Collapse>*/}
                {/*    <FlowbiteNavbar.Link href="/" active>*/}
                {/*        Home*/}
                {/*    </FlowbiteNavbar.Link>*/}
                {/*</FlowbiteNavbar.Collapse>*/}
            </FlowbiteNavbar>
        </header>
    )
}
