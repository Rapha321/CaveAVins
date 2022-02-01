import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Router, useNavigate, useParams } from "react-router-dom"
import { Navbar, Container } from 'react-bootstrap';
import { Form, TextArea, Button, Icon } from 'semantic-ui-react'
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import { Input, NativeSelect } from '@mui/material';
import { ToastContainer, toast, Zoom, Bounce } from 'react-toastify';

export default function AdminAjouterVins() {
  
    let navigate = useNavigate()
    const [regions, setRegions] = useState([]);
    const [file, setFile] = useState(null);
    const [regionId, setRegionId] = useState("");

    useEffect(() => {
        fetch('/api/regions')
        .then(res => res.json())
        .then(data => setRegions(data))
  
    }, [])


    
    const handleSelect = (e) => {
        e.preventDefault()
        Object.values(regions).map(region => {
            if (e.target.value === region._id) {
                setRegionId(region._id);
            }
        }) 
    }



    const addVins = async (e) => { 
        e.preventDefault()

        const {nom, descriptions, prix, quantity, imgVins} = e.target

        const data = new FormData();
        data.append("file", file[0])

        axios.post(`/api/vins`, {
            regionID: regionId,
            nom: nom.value,
            prix: prix.value,
            quantity: quantity.value,
            descrVins: descriptions.value,
            imgVins: file[0].name

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

        nom.value = "";
        descriptions.value = "";
        prix.value = "";
        quantity.value = "";
        imgVins.value = "";

        toast.success('🦄 Vins ajouter avec success!', {
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

    const fileSelectedHandler = (e) => {
        setFile(e.target.files)
    }

      
    return (
        <Container>  
            <div style={{marginLeft: "20%"}}>
                <h2 style={{textAlign: "left", marginTop: "3%", marginBottom: "3%"}}>Ajouter un Vins:</h2> 
            
                <Form style={{textAlign: "left"}} onSubmit={e => addVins(e)}>
                    <Form.Group>
                        <Form.Input label='Nom du vins:' name="nom" placeholder='Nom' width={10} />
                    </Form.Group>

                    <NativeSelect id="select" style={{width: "62%"}} onChange={e => handleSelect(e)}>
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
                        <Form.TextArea label='Descriptions:' 
                                       name="descriptions" 
                                       placeholder='Descriptions:' 
                                       width={10} 
                                       style={{height: "100px"}}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Input label='Prix:' name="prix" placeholder='$' width={5} />
                        <Form.Input label='Quantité:' name="quantity" placeholder='Quantité' width={5} />
                    </Form.Group>

                    <Form.Group>
                        <label htmlFor="contained-button-file">
                            <Input accept="image/*" 
                                   id="contained-button-file" 
                                   name="imgVins"
                                   multiple type="file" 
                                   onChange={fileSelectedHandler} 
                                   style={{width: "500px", marginRight: "20px"}} />
                        </label>
                    </Form.Group>

                    <br />
                    <Button color="green" style={{marginLeft: "15%"}}>Ajouter</Button>
                </Form>
            </div>
        </Container>
    )
}
