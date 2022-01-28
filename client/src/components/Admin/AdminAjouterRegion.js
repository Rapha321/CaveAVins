import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { Router, useNavigate, useParams } from "react-router-dom"
import { Navbar, Container } from 'react-bootstrap';
import { Form, TextArea, Button, Input } from 'semantic-ui-react'
import CombineLoginSignup from './../CombineLoginSignup';


export default function AdminAjouterRegion() {
  
    let navigate = useNavigate()
    const [regions, setRegions] = useState([])
    const [file, setFile] = useState(null);


    useEffect(() => {
        axios.get('/api/regions')
        .then(res => setRegions(res.data))
    }, [])

    console.log("file: ", file)

    const addRegion = async (e) => { 
        e.preventDefault()

        const {nom, descriptions} = e.target

        const data = new FormData();
        data.append("file", file[0])

        axios.post(`/api/regions`, {
            nomRegion: nom.value, 
            imgRegion: file[0].name,
            descrRegion: descriptions.value
        })
        .then(res => {
            console.log("mise a jour avec succes")
        })
        .catch(err => {
            console.log(err.response)
        })

        axios.post(`http://localhost:5000/api/regions/uploads`, data)
        .then(res => { 
            console.log(res.statusText)
        })

    }

    const fileSelectedHandler = (e) => {
        setFile(e.target.files)
    }

    return (
        <div>
            <Container>  
                <div style={{marginLeft: "20%"}}>
                    <h2 style={{textAlign: "left", marginTop: "3%", marginBottom: "3%"}}>Ajouter un Region:</h2> 
                
                    <Form style={{textAlign: "left"}} encType="multipart/form-data"  onSubmit={e => addRegion(e)} >
                        <Form.Group>
                            <Form.Input label='Nom region:' name="nom" placeholder='Nom region' width={10} />
                        </Form.Group>
                        <Form.Group>
                            <Form.TextArea label='Descriptions:' name="descriptions" placeholder='Descriptions:' width={10} style={{height: "150px"}}/>
                        </Form.Group>
                        <Form.Group>
                            <label htmlFor="file">
                                {/* <input type="file" onChange={fileSelectedHandler} /> */}
                                {/* <button onClick={fileUploadHandler}>Upload</button> */}
                                <Input accept="image/*" id="contained-button-file" name="imgRegion" multiple type="file" onChange={fileSelectedHandler} style={{width: "500px", marginRight: "20px"}}/>
                                {/* <Button variant="contained" component="span">
                                    Upload
                                    <IconButton color="primary" aria-label="upload picture" component="span" onClick={fileSelectedHandler}>
                                        <PhotoCamera />
                                    </IconButton>
                                </Button>  */}
                            </label>
                        </Form.Group>
                        <br />
                        <Button color="green" type="submit" style={{marginLeft: "15%"}}>Soumettre</Button>
                    </Form>
                </div>
            </Container>


        </div>
    )

}
