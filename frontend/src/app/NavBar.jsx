import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


/**
 * To be able to navigate around the website we have these NavLink's (Notice
 * that they are "styled" NavLink's that are now named StyledNavLink)
 * <br>
 * Whenever you add a NavLink here make sure to add a corresponding Route in
 * the Content Component
 * <br>
 * You can add as many Link as you would like here to allow for better navigation
 * <br>
 * Below we have two Links:
 * <li>Home - A link that will change the url of the page to "/"
 * <li>Login - A link that will change the url of the page to "/login"
 */
const NavBar = () => {
    return (

            <header><a href="/">
                <h4 className="logo">Routine</h4>
            </a>
                <nav>
                    <ul>
                        <li><a href="/">HOME</a></li>
                        <li><a href="/login">LOGIN</a></li>
                        <li><a href="/register">REGISTER</a></li>
                        {/*<li><a href="/search">SEARCH</a></li>*/}
                        {/*<li><a href="/cart">CART</a></li>*/}
                        {/*<li><a href="/orders">ORDERS</a></li>*/}
                    </ul>
                </nav>
            </header>
        // <StyledNav>
        //     <StyledNavLink to="/">
        //         Home
        //     </StyledNavLink>
        //     <StyledNavLink to="/login">
        //         Login
        //     </StyledNavLink>
        //     <StyledNavLink to="/register">
        //         Register
        //     </StyledNavLink>
        // </StyledNav>
    );
}

export default NavBar;
