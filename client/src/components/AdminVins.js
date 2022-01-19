import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Router, useNavigate, useParams } from "react-router-dom"
import { Navbar, Container } from 'react-bootstrap';
import { Form, TextArea, Button, Icon } from 'semantic-ui-react'
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import { Input, NativeSelect } from '@mui/material';

export default function AdminVins() {

    let navigate = useNavigate()
    const [regions, setRegions] = useState([]);

    useEffect(() => {
        let isMounted = true;
  
        
        fetch('/api/regions')
        .then(res => res.json())
        .then(data => { if (isMounted) {setRegions(data)} })
  
        return () => {isMounted = false};
      }, [])


      

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
                    <h2 style={{textAlign: "left", marginTop: "3%", marginBottom: "3%"}}>Ajouter un Vins:</h2> 
                
                    <Form style={{textAlign: "left"}}>
                        <Form.Group>
                            <Form.Input label='Nom du vins:' name="nom" placeholder='Nom' width={10} />
 
                        </Form.Group>
                        <NativeSelect id="select" style={{width: "62%"}}>
                                <option value="10" style={{color: "grey"}}>Dans quel region le vins est produit?</option>
                                {
                                   Object.values(regions).map(region => {
                                       return (
                                            <option value={region._id}>{region.nomRegion}</option>
                                       )
                                        
                                   }) 
                                }
                                
                            </NativeSelect><br/><br/>
                        <Form.Group>
                            <Form.TextArea label='Descriptions:' name="descriptions" placeholder='Descriptions:' width={10} style={{height: "100px"}}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Input label='Prix:' name="prix" placeholder='$' width={5} />
                            <Form.Input label='Quantité:' name="quantity" placeholder='Quantité' width={5} />
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
