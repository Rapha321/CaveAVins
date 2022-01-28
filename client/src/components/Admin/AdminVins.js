import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Router, useNavigate, useParams } from "react-router-dom"
import { Navbar, Container } from 'react-bootstrap'
import { Form, TextArea, Button, Icon, Tab } from 'semantic-ui-react'
import IconButton from '@mui/material/IconButton'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import Stack from '@mui/material/Stack'
import { Input, NativeSelect } from '@mui/material'
import AdminAjouterVins from './AdminAjouterVins'
import AdminModifierVins from './AdminModifierVins'
import AdminSupprimerVins from './AdminSupprimerVins'
import AdminHeader from './AdminHeader'

export default function AdminVins() {

    let navigate = useNavigate()

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
