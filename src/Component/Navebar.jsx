import React, { useEffect, useState } from 'react'
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    DropdownItem,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    Avatar,
    Button,
} from "@heroui/react";
import { NavLink } from 'react-router-dom';




export const AcmeLogo = () => {
    return (
        <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
            <path
                clipRule="evenodd"
                d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
                fill="currentColor"
                fillRule="evenodd"
            />
        </svg>
    );
};




export default function Navebar() {



    const [theme, setTheme] = useState(null)





    function handleMoode() {
        document.documentElement.classList.toggle("dark")
        if (theme == "dark") {
            localStorage.setItem("theme", "light")
            setTheme("light")
        } else {
            localStorage.setItem("theme", "dark")
            setTheme("dark")
        }
    }

    useEffect(() => {

        if (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches) {
            document.documentElement.classList.add("dark")
            setTheme("dark")
        } else {
            setTheme("light")
        }

        if ("theme" in localStorage) {

            if (localStorage.getItem("theme") == "dark") {
                document.documentElement.classList.add("dark")
                setTheme("dark")
            } else {
                setTheme("light")
            }
        }
    }, [])
    return (
        <>
            <Navbar>
                <NavbarBrand>
                    <AcmeLogo />
                    <p className="font-bold text-inherit">SOCIAL</p>
                </NavbarBrand>

                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    <NavbarItem>
                        <NavLink to="/">
                            Home
                        </NavLink>
                    </NavbarItem>
                    <NavbarItem isActive>
                        <NavLink to="/profile">
                            Profile
                        </NavLink>
                    </NavbarItem>

                </NavbarContent>

                <NavbarContent as="div" justify="end">
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger className=' cursor-pointer'>
                            <Avatar
                                isBordered
                                as="button"
                                className="transition-transform"
                                color="secondary"
                                name="Jason Hughes"
                                size="sm"
                                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"

                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownItem key="profile" className="h-14 gap-2">
                                <p className="font-semibold">Signed in as</p>
                                <p className="font-semibold">zoey@example.com</p>
                            </DropdownItem>
                            <DropdownItem key="settings"><Link className='text-white' href='/profile'>My Profile</Link></DropdownItem>
                            <DropdownItem key="team_settings">Team Settings</DropdownItem>
                            <DropdownItem key="analytics">Analytics</DropdownItem>
                            <DropdownItem key="system">System</DropdownItem>
                            <DropdownItem key="configurations">Configurations</DropdownItem>
                            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                            <DropdownItem key="logout" color="danger">
                                Log Out
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarContent>
                <Button onClick={handleMoode} className='' variant='shadow'> toggle</Button>
            </Navbar>
        </>
    )
}
