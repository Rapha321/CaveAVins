import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Container } from 'react-bootstrap';
import { Form, Button } from 'semantic-ui-react'
import { Input, NativeSelect } from '@mui/material';
import { toast } from 'react-toastify';

export default function AdminAjouterVins() {
  
    const [regions, setRegions] = useState([]);
    const [file, setFile] = useState(null);
    const [regionId, setRegionId] = useState("");


    // Set regions when page is loaded
    useEffect(() => {
        fetch('/api/regions')
        .then(res => res.json())
        .then(data => setRegions(data))
  
    }, [])


    // Set regionId when a region is selected
    const handleSelect = (e) => {
        e.preventDefault()
        Object.values(regions).map(region => {
            if (e.target.value === region._id) {
                setRegionId(region._id);
            }
        }) 
    }


    // Add vins when Ajouter button is clicked
    const addVins = async (e) => { 
        e.preventDefault()

        // Get data from form
        const {nom, descriptions, prix, quantity, imgVins} = e.target

        // Save picture file in data variable
        const data = new FormData();
        data.append("file", file[0])

        // Create new region in database 
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

        // Save image in database
        axios.post(`http://localhost:5000/api/vins/uploads`, data)
        .then(res => { 
            console.log(res.statusText)
        })

        // Reset input field to empty
        nom.value = "";
        descriptions.value = "";
        prix.value = "";
        quantity.value = "";
        imgVins.value = "";

        // Display a toast
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

    // Save image file
    const fileSelectedHandler = (e) => {
        setFile(e.target.files)
    }

      
    return (
        <div>
        {/* FORM TO ADD A NEW VINS */}
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
        </div>
    )
}
