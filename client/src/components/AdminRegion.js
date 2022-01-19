import React, {useState, useEffect} from 'react'
import { Router, useNavigate, useParams } from "react-router-dom"
import { Navbar, Container } from 'react-bootstrap';
import { Form, TextArea, Button, Icon } from 'semantic-ui-react'
import { styled } from '@mui/material/styles';
// import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import { Input } from '@mui/material';

export default function AdminRegion() {

    let navigate = useNavigate()


    return (
        <div>
            <Navbar>
                <Container>
                    <Navbar.Brand href="#home"><h1>Cave à Vins</h1></Navbar.Brand>
                    <Button inverted color='blue' onClick={() => {navigate(`/admin`)}}>Menu administrateur</Button>
                    <Navbar.Toggle />
                </Container>
            </Navbar>

            <Container>  
                

                <div style={{marginLeft: "20%"}}>
                    <h2 style={{textAlign: "left", marginTop: "3%", marginBottom: "3%"}}>Ajouter un Region:</h2> 
                
                    <Form style={{textAlign: "left"}}>
                        <Form.Group>
                            <Form.Input label='Nom region:' name="nom" placeholder='Nom region' width={10} />
                        </Form.Group>
                        <Form.Group>
                            <Form.TextArea label='Descriptions:' name="descriptions" placeholder='Descriptions:' width={10} style={{height: "150px"}}/>
                        </Form.Group>
                        <Form.Group>
                            <label htmlFor="contained-button-file">
                                <Input accept="image/*" id="contained-button-file" multiple type="file" style={{width: "500px", marginRight: "20px"}}/>
                                <Button variant="contained" component="span">
                                    Upload
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                        <PhotoCamera />
                                    </IconButton>
                                </Button>
                            </label>

                        </Form.Group>
                        <br />
                        <Button color="green" style={{marginLeft: "15%"}}>Soumettre</Button>
                    </Form>
                </div>
            </Container>

        </div>
    )
}
