'use client'

import { Avatar, Dropdown, Navbar as FlowbiteNavbar } from 'flowbite-react';
import cyrildewitLogo from '@/assets/16477999.png'

export default function Navbar() {
    return (
        <FlowbiteNavbar fluid rounded className={""}>
            <FlowbiteNavbar.Brand href="/">
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">SkillFlow</span>
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
                        <span className="block text-sm">Cyril de Wit</span>
                        <span className="block truncate text-sm font-medium">Fontys Hogeschool</span>
                    </Dropdown.Header>
                    {/*<Dropdown.Item>Settings</Dropdown.Item>*/}
                    {/*<Dropdown.Divider />*/}
                    <Dropdown.Item>Uitloggen</Dropdown.Item>
                </Dropdown>
                <FlowbiteNavbar.Toggle />
            </div>
            <FlowbiteNavbar.Collapse>
                <FlowbiteNavbar.Link href="#" active>
                    Dashboard
                </FlowbiteNavbar.Link>
            </FlowbiteNavbar.Collapse>
        </FlowbiteNavbar>
    );
}


