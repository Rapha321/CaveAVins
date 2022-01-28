import React, {useState, useEffect} from 'react'
import { Router, useNavigate, useParams } from "react-router-dom"
import { Navbar, Container } from 'react-bootstrap';
import { Form, TextArea, Button, Icon, Tab } from 'semantic-ui-react'
import AdminModifierRegion from './AdminModifierRegion';
import AdminSupprimerRegion from './AdminSupprimerRegion';
import AdminAjouterRegion from './AdminAjouterRegion';
import AdminHeader from './AdminHeader'

export default function AdminRegions() {

    let navigate = useNavigate()


    const panes = [
        {
            menuItem: 'Ajouter',
            render: () => <Tab.Pane > <AdminAjouterRegion /> </Tab.Pane>,
        },
        { 
            menuItem: 'Modifier', 
            render: () => <Tab.Pane> <AdminModifierRegion /> </Tab.Pane> 
        },
        { 
            menuItem: 'Supprimer', 
            render: () => <Tab.Pane> <AdminSupprimerRegion /> </Tab.Pane> 
        },
    ]
    
      return (
          <Container>

            <AdminHeader />
            <Tab menu={{ secondary: true }} panes={panes} />

          </Container>
       )

}
