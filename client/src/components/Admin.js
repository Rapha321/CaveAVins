import React from 'react'
import { Button } from 'semantic-ui-react'
import { Navbar, Container } from 'react-bootstrap';
import Header from './Header'

export default function Admin() {
    return (
        <div>
            <Navbar>
                <Container>
                    <Navbar.Brand href="#home"><h1>Cave à Vins</h1></Navbar.Brand>
                    <Navbar.Toggle />
                </Container>
            </Navbar>

            <h1 style={{margin: "5% auto"}}>Menu Administrateur</h1>

            <Button size='massive' style={{width: "30%", marginBottom: "10px"}}>Ajouter un region</Button>
            <br/>
            <Button size='massive' style={{width: "30%", marginBottom: "10px"}}>Ajouter un vins</Button>
            <br/>
            <Button size='massive' style={{width: "30%", marginBottom: "10px"}}>Gerer le commandes</Button>
            <br/>


        </div>
    )
}
