import React, { useState, useEffect } from 'react'
import { Navbar, Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useNavigate, useParams } from "react-router-dom";
import { LabelDetail } from 'semantic-ui-react';

export default function Header(props) {

    const location = useLocation()
    let navigate = useNavigate();
    let {clientID} = useParams();

    const [style, setStyle] = useState("block")


    useEffect(() => {
        location.pathname === '/' ? setStyle("none") : setStyle("block")
      }, [location])



    const afficherPanier = () => {
        navigate(`/panier/${props.client}`)
    }


    return (
        <Navbar>
            <Container>
                <Navbar.Brand href="#home"><h1>Cave à Vins</h1></Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    <span onClick={afficherPanier} style={{ display: style, color: "teal" }}>
                        <i class="fas fa-2x fa-cart-arrow-down"></i>
                    </span>
                </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}