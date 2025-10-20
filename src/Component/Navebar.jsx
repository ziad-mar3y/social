import React, { useContext, useEffect, useState } from "react";
import {
  Navbar as HeroUiNavebar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
  NavbarMenuItem,
} from "@heroui/react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { counterContext } from "../Contexts/CounterContext";
import AuthContextProvider, {
  authContext,
} from "../Contexts/AuthContextProvider";

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
  // const isLoggedIn = localStorage.getItem("token") != null;
  const [theme, setTheme] = useState(null);
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(authContext);

  function signOut() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  }

  function loginnavigate() {
    navigate("/login");
  }
  function signupnavigate() {
    navigate("/register");
  }

  function handleMoode() {
    document.documentElement.classList.toggle("dark");
    if (theme == "dark") {
      localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    }
  }

  useEffect(() => {
    if (
      !("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else {
      setTheme("light");
    }

    if ("theme" in localStorage) {
      if (localStorage.getItem("theme") == "dark") {
        document.documentElement.classList.add("dark");
        setTheme("dark");
      } else {
        setTheme("light");
      }
    }
  }, []);
  // const {counter} = useContext(counterContext);

  return (
    <>
      {isLoggedIn && (
        <HeroUiNavebar className="dark:bg-black9 flex justify-center  ">
          {/* <NavbarBrand> */}
          {/* <AcmeLogo /> */}
          <Link to={"/"} className="font-bold text-inherit w-fit flex-1">SOCIAL</Link>
          {/* </NavbarBrand> */}

          {/* { isLoggedIn &&    <NavbarContent className=" sm:flex gap-4 flex-2 xs:flex-wrap   " justify="center">
          <NavbarItem>
            <NavLink to="/" className={"xs:text-[15px] sm:text-lg "}>Home</NavLink>
          </NavbarItem>
          <NavbarItem isActive>
            <NavLink to="/profile" className={"xs:text-[15px] sm:text-lg"}>Profile</NavLink>
          </NavbarItem>
        </NavbarContent>} */}

          {
            isLoggedIn
            // <NavbarContent as="div" justify="end" >
            //   <Dropdown placement="bottom-end">
            //     <DropdownTrigger className=" cursor-pointer">
            //       <Avatar
            //         isBordered
            //         as="button"
            //         className="transition-transform"
            //         color="secondary"
            //         name="Jason Hughes"
            //         size="sm"
            //         src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            //       />
            //     </DropdownTrigger>

            //       <DropdownMenu aria-label="Profile Actions" variant="flat">
            //         <DropdownItem key="profile" className="h-14 gap-2">
            //           <p className="font-semibold">Signed in as</p>
            //           <p className="font-semibold">zoey@example.com</p>
            //         </DropdownItem>
            //         <DropdownItem key="settings">
            //           <Link className="text-white" href="/profile">
            //             My Profile
            //           </Link>
            //         </DropdownItem>
            //         <DropdownItem key="team_settings">Team Settings</DropdownItem>
            //         <DropdownItem key="analytics">Analytics</DropdownItem>
            //         <DropdownItem key="system">System</DropdownItem>
            //         <DropdownItem key="configurations">Configurations</DropdownItem>
            //         <DropdownItem key="help_and_feedback">
            //           Help & Feedback
            //         </DropdownItem>
            //         <DropdownItem key="logout" color="danger">
            //           <Button onPress={signOut}>Log Out</Button>
            //         </DropdownItem>
            //       </DropdownMenu>

            //   </Dropdown>
            // </NavbarContent> :
            // ""
          }

          {isLoggedIn ? (
            <>
              {" "}
              <Button
                className="text-danger-500   "
                variant="shadow"
                onPress={signOut}
              >
                signout
              </Button>
            </>
          ) : (
            <>
              <Button className="" variant="shadow" onPress={loginnavigate}>
                {" "}
                Login{" "}
              </Button>

              <Button className="" variant="shadow" onPress={signupnavigate}>
                signin
              </Button>
            </>
          )}

          {/* <button onPress={handleMoode} className="xs:text-md w-fit p-0 " variant="">
          <i className="fas fa-home"></i>
        </button> */}
      <div className="flex flex-col justify-center ">
  <input onChange={handleMoode} type="checkbox" name="light-switch" className="light-switch sr-only" id="light-switch" />
  <label className="relative cursor-pointer p-2" htmlFor="light-switch">
    <svg className="hidden dark:block" width={16} height={16} xmlns="http://www.w3.org/2000/svg" color="red">
      <path className="fill-slate-300" d="M7 0h2v2H7zM12.88 1.637l1.414 1.415-1.415 1.413-1.413-1.414zM14 7h2v2h-2zM12.95 14.433l-1.414-1.413 1.413-1.415 1.415 1.414zM7 14h2v2H7zM2.98 14.364l-1.413-1.415 1.414-1.414 1.414 1.415zM0 7h2v2H0zM3.05 1.706 4.463 3.12 3.05 4.535 1.636 3.12z" />
      <path className="fill-slate-400" d="M8 4C5.8 4 4 5.8 4 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Z" />
    </svg>
    <svg className="dark:hidden" width={16} height={16} xmlns="http://www.w3.org/2000/svg">
      <path className="fill-slate-400" d="M6.2 1C3.2 1.8 1 4.6 1 7.9 1 11.8 4.2 15 8.1 15c3.3 0 6-2.2 6.9-5.2C9.7 11.2 4.8 6.3 6.2 1Z" />
      <path className="fill-slate-500" d="M12.5 5a.625.625 0 0 1-.625-.625 1.252 1.252 0 0 0-1.25-1.25.625.625 0 1 1 0-1.25 1.252 1.252 0 0 0 1.25-1.25.625.625 0 1 1 1.25 0c.001.69.56 1.249 1.25 1.25a.625.625 0 1 1 0 1.25c-.69.001-1.249.56-1.25 1.25A.625.625 0 0 1 12.5 5Z" />
    </svg>
    <span className="sr-only">Switch to light / dark version</span>
  </label>
</div>

        </HeroUiNavebar>
      )}
    </>
  );
}
