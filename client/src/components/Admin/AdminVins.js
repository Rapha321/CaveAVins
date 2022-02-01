import React from 'react'
import { Container } from 'react-bootstrap'
import { Tab } from 'semantic-ui-react'
import AdminAjouterVins from './AdminAjouterVins'
import AdminModifierVins from './AdminModifierVins'
import AdminSupprimerVins from './AdminSupprimerVins'
import AdminHeader from './AdminHeader'

export default function AdminVins() {

    // Create tabs for Ajouter, Modifier, and Supprimer
    const panes = [
        {
            menuItem: 'Ajouter',
            render: () => <Tab.Pane > <AdminAjouterVins /> </Tab.Pane>,
        },
        { 
            menuItem: 'Modifier', 
            render: () => <Tab.Pane> <AdminModifierVins /> </Tab.Pane> 
        },
        { 
            menuItem: 'Supprimer', 
            render: () => <Tab.Pane> <AdminSupprimerVins /> </Tab.Pane> 
        },
    ]
    
      return (
          <Container>

            <AdminHeader/>
            <Tab menu={{ secondary: true }} panes={panes} />

          </Container>
       )
}
