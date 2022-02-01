import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { Container } from 'react-bootstrap';
import { Form, Button, Input } from 'semantic-ui-react'
import { toast } from 'react-toastify';


export default function AdminAjouterRegion() {
  
    const [regions, setRegions] = useState([])
    const [file, setFile] = useState(null);

    // Set regions when page is loaded
    useEffect(() => {
        axios.get('/api/regions')
        .then(res => setRegions(res.data))
    }, [])


    // Add region when Ajouter button is clicked
    const addRegion = async (e) => { 
        e.preventDefault()

        // Get data from form
        const {nom, imgRegion, descriptions} = e.target 

        // Save picture file in data variable
        const data = new FormData();
        data.append("file", file[0])

        // Create new region in database 
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

        // Save image in database
        axios.post(`http://localhost:5000/api/regions/uploads`, data)
        .then(res => { 
            console.log(res.statusText)
        })

        // Reset input field to empty
        nom.value = "";
        descriptions.value = "";
        imgRegion.value = "";

        // Display a toast
        toast.success('🦄 Region ajouter avec success!', {
            toastId: 'info1',
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

    }

    // Save image file
    const fileSelectedHandler = (e) => {
        setFile(e.target.files)
    }


    return (
        <div>
            {/* FORM TO ADD A NEW REGION */}
            <Container>  
                <div style={{marginLeft: "20%"}}>
                    <h2 style={{textAlign: "left", marginTop: "3%", marginBottom: "3%"}}>Ajouter un Region:</h2> 
                
                    <Form style={{textAlign: "left"}} encType="multipart/form-data"  onSubmit={e => addRegion(e)} >
                        <Form.Group>
                            <Form.Input label='Nom region:' 
                                        name="nom" 
                                        placeholder='Nom region' 
                                        width={10} />
                        </Form.Group>

                        <Form.Group>
                            <Form.TextArea label='Descriptions:' 
                                           name="descriptions" 
                                           placeholder='Descriptions:' 
                                           width={10} 
                                           style={{height: "150px"}}/>
                        </Form.Group>

                        <Form.Group>
                            <label htmlFor="file">
                                <Input accept="image/*" 
                                       id="contained-button-file" 
                                       name="imgRegion" 
                                       multiple type="file" 
                                       onChange={fileSelectedHandler} 
                                       style={{width: "500px", marginRight: "20px"}} />
                            </label>
                        </Form.Group>

                        <br />
                        <Button color="green" type="submit" style={{marginLeft: "15%"}}>Ajouter</Button>
                    </Form>
                </div>
            </Container>
        </div>
    )

}
