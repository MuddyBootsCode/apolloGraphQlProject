import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import Signout from './Auth/Signout';

const Navbar = ({ session }) => (

    <nav>

        {session && session.getCurrentUser ? <NavbarAuth session={session} /> : <NavbarUnAuth />}

    </nav>

);


const NavbarAuth = ({ session }) => (
    <Fragment>
        <ul>
            <li><NavLink to="/" exact>Home</NavLink></li>
            <li><NavLink to="/search">Search</NavLink></li>
            <li><NavLink to="/recipe/add">Add Recipe</NavLink></li>
            <li><NavLink to="/profile">Profile</NavLink></li>
            <li><Signout/></li>
            <h4>Welcome, {session.getCurrentUser.username}</h4>
        </ul>
    </Fragment>

);


const NavbarUnAuth = () => (

    <ul>
        <li><NavLink to="/" exact>Home</NavLink></li>
        <li><NavLink to="/search">Search</NavLink></li>
        <li><NavLink to="/Signin">Sign In</NavLink></li>
        <li><NavLink to="/Signup">Sign Up</NavLink></li>
    </ul>

);

export default Navbar;