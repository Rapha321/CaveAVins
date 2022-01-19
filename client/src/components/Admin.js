import React from 'react'
import { Button } from 'semantic-ui-react'
import { Navbar, Container } from 'react-bootstrap';
import { Router, useNavigate, useParams } from "react-router-dom"
import Header from './Header'

export default function Admin() {

    let navigate = useNavigate()

    const ajouterRegion = () => {
        navigate(`/adminRegion`)
    }

    const ajouterVins = () => {
        navigate(`/adminVins`)
    }

    const gererCommandes = () => {
        navigate(`/adminCommandes`)
    }

    return (
        <div>
            <Navbar>
                <Container>
                    <Navbar.Brand href="#home"><h1>Cave à Vins</h1></Navbar.Brand>
                    <Navbar.Toggle />
                </Container>
            </Navbar>

            <h1 style={{margin: "5% auto"}}>Menu Administrateur</h1>

            <Button size='massive' 
                    style={{width: "30%", marginBottom: "10px"}}
                    onClick={ajouterRegion}>
                Ajouter un region
            </Button>
            <br/>
            <Button size='massive' 
                    style={{width: "30%", marginBottom: "10px"}}
                    onClick={ajouterVins}>
                Ajouter un vins
            </Button>
            <br/>
            <Button size='massive' 
                    style={{width: "30%", marginBottom: "10px"}}
                    onClick={gererCommandes}>
                Gerer les commandes
            </Button>
            <br/>


        </div>
    )
}
