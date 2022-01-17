import React from 'react'
import axios from 'axios'
// import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'
import Regions from './Regions';
import { Router, useNavigate } from "react-router-dom";
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';


const Login=({handleChange})=>{

    const paperStyle={padding :30, width:320, height:330, margin:"0 auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}
    
    let navigate = useNavigate();

    // Signin
    const onSubmitSignIn = async e => {
        
        e.preventDefault()
        const {email, password} = e.target

        const res = await axios.get('/api/clients')
        const data = res.data

        data.map(user => {

            if (email.value === "admin@email.com" && password.value === "admin") {
                navigate(`/admin`)
            }
            else if (user.email === email.value && user.password === password.value) {
                navigate(`/regions/${user._id}`)
            }
                
        })
    }

    return(
        <Grid>
            <br/>
            <Paper  style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Connexion</h2>
                </Grid>

                <form onSubmit={e => onSubmitSignIn(e)}>
                    <TextField label='Email' name="email" placeholder='Entrer votre email' fullWidth required/>
                    <TextField label='Password' name="password" placeholder='Password' type='password' placeholder='Entrer votre mot de passe' fullWidth required/>
                    <br /><br />
                    <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Connexion</Button>
                </form>

                <Typography > Pas de compte? 
                    <Link href="#" onClick={()=>handleChange("event",1)} >
                        Enregistrer 
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Login

