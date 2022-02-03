import React from 'react'
import { Button } from 'semantic-ui-react'
import { Container } from 'react-bootstrap';
import { useNavigate } from "react-router-dom"
import AdminHeader from './AdminHeader'

export default function Admin() {

    let navigate = useNavigate()

    // Redirect to Admin Region page
    const gestionRegion = () => {
        navigate(`/adminRegions`)
    }

    // Redirect to Admin Vins page
    const ajouterVins = () => {
        navigate(`/adminVins`)
    }

    // Redirect to Admin Commandes page
    const gererCommandes = () => {
        navigate(`/adminCommandes`)
    }

    return (

        // MENU ADMINISTRATEUR
        <Container>

            <AdminHeader />

            <h1 style={{margin: "5% auto"}}>Menu Administrateur</h1>

            <Button size='massive'
                    color='blue' 
                    style={{width: "30%", marginBottom: "10px"}}
                    onClick={gestionRegion}>
                Gestion des regions
            </Button>
            <br/>
            <Button size='massive' 
                    color='blue' 
                    style={{width: "30%", marginBottom: "10px"}}
                    onClick={ajouterVins}>
                Gestion du vins
            </Button>
            <br/>
            <Button size='massive'
                    color='blue'  
                    style={{width: "30%", marginBottom: "10px"}}
                    onClick={gererCommandes}>
                Gestion des commandes
            </Button>
            <br/>

        </Container>
    )
}
