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
import ToggleMode from "./ToggleMode";
import { themeContext } from "../Contexts/ThemeContext";



export default function Navebar() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(authContext);
  const { handleMoode } = useContext(themeContext);
  const {userData} = useContext(authContext)

  
  function signOut() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  }



  return (
    <>
      {isLoggedIn && (
        <HeroUiNavebar className="dark:bg-black9 flex justify-center  ">
          <NavbarBrand>
            {/* <AcmeLogo /> */}
            <Link to={"/"} className="font-bold text-inherit w-fit ">
              SOCIAL
            </Link>
          </NavbarBrand>

          {isLoggedIn ? (
            <>
           <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            src={userData?.photo}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem onClick={()=> navigate("/profile")} key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{userData?.email}</p>
          </DropdownItem>
          
          <DropdownItem onClick={signOut}  key="logout" color="danger">
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
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
          <ToggleMode handleMoode={handleMoode} />
             <div className="flex items-center gap-4">
      
   
    </div>
        </HeroUiNavebar>
      )}
    </>
  );
}
