import React from 'react'
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

const Signup = () => {
    const paperStyle = { padding: 20, width: 300, height:390, margin: "0 auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const marginTop = { marginTop: 5 }
    return (
        <Grid>
            <br/>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Enregistrer</h2>
                    <Typography variant='caption' gutterBottom>Remplir les champs pour crée un compte!</Typography>
                </Grid>
                <form>
                    <TextField fullWidth label='Nom' placeholder="Entrer votre nom" />
                    <TextField fullWidth label='Prenom' placeholder="Entrer votre prenom" />
         
                    <TextField fullWidth label='Email' placeholder="Entrer votre email"/>
                    <TextField fullWidth label='Password' placeholder="Entrer votre mot de passe"/>
                    <br/> <br/>
                    <Button type='submit' variant='contained' color='primary'>Enregistrer</Button>
                </form>
            </Paper>
        </Grid>
    )
}

export default Signup;