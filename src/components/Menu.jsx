import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

const Menu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    return (
        <Navbar color="primary" dark expand="md" fixed="top">
            <NavbarBrand navbar style={{marginLeft: '12rem'}} tag={Link} to="/">Figures</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar >
                    <NavItem>
                        <NavLink tag={Link} to="/about">About</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink  tag={Link} to="/figures/create">New Figures</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink  tag={Link} to="/productions/create">New Productions</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    )
}

export default Menu;