import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Router, useNavigate, useParams } from "react-router-dom"
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

const Signup = () => {
    const paperStyle = { padding: 20, width: 320, height:330, margin: "0 auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e', marginRight: "10px", marginLeft: "20px" }
    let navigate = useNavigate();

    const [clients, setClients] = useState([]);

    useEffect(() => {
        getClients();
      }, []);

    // Register
    const onSubmitRegister = async e => {
        
        e.preventDefault()
        const {nom, prenom, email, password} = e.target

        await axios.post('/api/clients', {
            nom: nom.value,
            prenom: prenom.value,
            email: email.value,
            password: password.value
        })
        email.value = ""
        password.value = ""
        getClients()

    }


      // Read
    const getClients = async () => {
        const res = await axios.get('/api/clients')
        const data = res.data

        setClients(data)
    }

    return (
        <Grid>
            <br/>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <div style={{display: "flex"}}>
                        <Avatar style={avatarStyle}>
                            <AddCircleOutlineOutlinedIcon />
                        </Avatar>
                        <h2 style={headerStyle}>Enregistrer</h2>
                    </div>
                    <Typography variant='caption' gutterBottom>Remplir les champs pour crée un compte!</Typography>
                </Grid>
                <form onSubmit={e => onSubmitRegister(e)}>
                    <TextField fullWidth label='Nom' name="nom" placeholder="Entrer votre nom" />
                    <TextField fullWidth label='Prenom' name="prenom" placeholder="Entrer votre prenom" />
         
                    <TextField fullWidth label='Email' name="email" placeholder="Entrer votre email"/>
                    <TextField fullWidth label='Password' name="password" placeholder="Entrer votre mot de passe"/>
                    <br/> <br/>
                    <Button type='submit' variant='contained' color='primary'>Enregistrer</Button>
                </form>
            </Paper>
        </Grid>
    )
}

export default Signup;