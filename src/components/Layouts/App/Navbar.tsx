'use client'

import { Avatar, Dropdown, Navbar as FlowbiteNavbar } from 'flowbite-react';
import { signOut } from "next-auth/react"
import classNames from "classnames";


export default function Navbar({ user }) {
    return (
        <FlowbiteNavbar fluid rounded className={classNames('shadow-sm')}>
            <FlowbiteNavbar.Brand href="/app">
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">TalentPulse</span>
            </FlowbiteNavbar.Brand>

            <div className="flex md:order-2">
                <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                        <Avatar alt="User settings" img="https://avatars.githubusercontent.com/u/16477999?v=4" rounded />
                    }
                >
                    <Dropdown.Header>
                        <span className="block text-sm">{ user.name }</span>
                        <span className="block truncate text-sm font-medium">Fontys Hogeschool</span>
                    </Dropdown.Header>
                    {/*<Dropdown.Item>Settings</Dropdown.Item>*/}
                    {/*<Dropdown.Divider />*/}
                    <Dropdown.Item onClick={() => signOut({ callbackUrl: '/' })}>Uitloggen</Dropdown.Item>
                </Dropdown>
                <FlowbiteNavbar.Toggle />
            </div>
            <FlowbiteNavbar.Collapse>
                <FlowbiteNavbar.Link href="/app" active>
                    Dashboard
                </FlowbiteNavbar.Link>
                <FlowbiteNavbar.Link href="/app/courses" active>
                    Cursussen
                </FlowbiteNavbar.Link>
            </FlowbiteNavbar.Collapse>
        </FlowbiteNavbar>
    );
}


