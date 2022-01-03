import React from 'react'
import { Navbar, Container } from 'react-bootstrap';

export default function Header() {
    return (
        <Navbar>
            <Container>
                <Navbar.Brand href="#home"><h1>Cave à Vins</h1></Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    <span><i class="fas fa-2x fa-cart-arrow-down"></i></span>
                </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}