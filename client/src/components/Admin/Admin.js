import React from 'react'
import { Button, Tab } from 'semantic-ui-react'
import { Navbar, Container } from 'react-bootstrap';
import { Router, useNavigate, useParams } from "react-router-dom"
import AdminHeader from './AdminHeader'

export default function Admin() {

    let navigate = useNavigate()

    const gestionRegion = () => {
        navigate(`/adminRegions`)
    }

    const ajouterVins = () => {
        navigate(`/adminVins`)
    }

    const gererCommandes = () => {
        navigate(`/adminCommandes`)
    }

    return (
        <Container>

            <AdminHeader />

            <h1 style={{margin: "5% auto"}}>Menu Administrateur</h1>

            <Button size='massive' 
                    style={{width: "30%", marginBottom: "10px"}}
                    onClick={gestionRegion}>
                Gestion des regions
            </Button>
            <br/>
            <Button size='massive' 
                    style={{width: "30%", marginBottom: "10px"}}
                    onClick={ajouterVins}>
                Gestion du vins
            </Button>
            <br/>
            <Button size='massive' 
                    style={{width: "30%", marginBottom: "10px"}}
                    onClick={gererCommandes}>
                Gestion des commandes
            </Button>
            <br/>

        </Container>
    )
}
