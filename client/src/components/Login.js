import React from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';


const Login=({handleChange})=>{

    const paperStyle={padding :20, width:300, height:390, margin:"0 auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}
    return(
        <Grid>
            <br/>
            <Paper  style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Connexion</h2>
                </Grid>
                <TextField label='Email' placeholder='Entrer votre email' fullWidth required/>
                <TextField label='Password' placeholder='Password' type='password' placeholder='Entrer votre mot de passe' fullWidth required/>
                <br /><br />
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Connexion</Button>

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

