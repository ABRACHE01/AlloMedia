import { logout, sendEmResetPass } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
  button,
} from "@nextui-org/react";

import { Link } from "react-router-dom";

function Header() {
  const { user } = useSelector((state) => state.auth);
  const role = user?.userPayload.role.name;
  const dashLink = `user/${role}/dashboard`
  const profile = `user/${role}/me`;

  const dispatch = useDispatch();

  const handleLogout = async() => {
   await dispatch(logout());
    toast.success("logged out successfuly");
  };

  const handleSendemailForreset = () => {
    dispatch(sendEmResetPass(role));
  };

  return (
    <>
      <Navbar shouldHideOnScroll >
        <NavbarBrand>
          <p className="font-bold">
            {""}
            <Link to="/" >ALLOMEDIA</Link>
          </p>
        </NavbarBrand>

        {user ? (
          <>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
              <NavbarItem as={Link}  to={dashLink}>  
                      Dashboard
              </NavbarItem>
            </NavbarContent>

            <NavbarContent as="div" justify="end">
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="secondary"
                    name="Jason Hughes"
                    size="sm"
                    src="https://i.pravatar.cc/150?u=a04258114e29026302d"
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem
                    key="profile"
                    className="h-14 gap-2"
                    textValue="Signed in as"
                  >
                    <p className="font-semibold">Signed in as {role}</p>
                    <p className="font-semibold text-success-500 ">{user.userPayload.email}</p>
                  </DropdownItem>

                  <DropdownItem key="settings" textValue="My Settings">
                    <Link color="foreground" 
                    to={profile}
                    >
                      Profile
                    </Link>
                  </DropdownItem>

                  <DropdownItem
                    key="reset Password"
                    color="success"
                    textValue="reset Password"
                  >
                    <Link olor="foreground" onClick={handleSendemailForreset}>
                      reset password
                    </Link>
                  </DropdownItem>

                  <DropdownItem key="logout" color="danger" textValue="Log Out">
                    <Link onClick={handleLogout}>Logout</Link>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarContent>
          </>
        ) : (
          <NavbarContent justify="end">
            <NavbarItem>
              <Link className="font-bold " to="/login" >
                Login
              </Link>
            </NavbarItem>

            <NavbarItem>
              <Button as={Link} to="/register" className="font-bold text-white " color="success" >
                Sign Up
              </Button>
            </NavbarItem>
          </NavbarContent>
        )}
      </Navbar>
    </>
  );
}

export default Header;
