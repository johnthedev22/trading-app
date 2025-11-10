import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import NavbarUI from "../../components/NavBar";
import type { NavItem } from "./nav.types";

const navItems: NavItem[] = [
  { name: "HomeIcon", href: "/", title: "Home" },
  { name: "ChartPieIcon", href: "/accounts", title: "Account Value" },
];

const Navbar = () => {
    const { state:user, dispatch } = useAuth()
    const navigate = useNavigate()

    const handleOnClick = (e:React.MouseEvent<HTMLAnchorElement>): void => {
        switch(e.currentTarget.innerHTML) {
            case 'Profile':
                navigate("/profile")
                break;
            case 'Sign out':
                dispatch({type:"LOGOUT"})
                navigate("/")
                break;
        }
    }

    return <NavbarUI navItems={navItems} isLoggedIn={user.isloggedin} NavLink={NavLink} handleOnClick={handleOnClick}/>
}

export default Navbar