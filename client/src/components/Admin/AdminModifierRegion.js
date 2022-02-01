import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Container } from 'react-bootstrap';
import { Form, Button } from 'semantic-ui-react'
import { NativeSelect } from '@mui/material';
import { toast } from 'react-toastify';

export default function AdminModifierRegion() {

  const [regions, setRegions] = useState("");
  const [id, setId] = useState("");
  const [nom, setNom] = useState("");
  const [descr, setDescr] = useState("");


  // Set commandes when page is loaded
  useEffect(() => {
      let isMounted = true;
      fetch('/api/regions')
      .then(res => res.json())
      .then(data => { if (isMounted) {setRegions(data)} })

      return () => {isMounted = false};
  }, [])


  // Set id, nom, descr when user select a region
  const handleSelect = (e) => {
    e.preventDefault()
    Object.values(regions).map(region => {
      if (e.target.value === region._id) {
        setId(region._id);
        setNom(region.nomRegion)
        setDescr(region.descrRegion)
      }
    }) 
  }


  // Modify Region
  const modifierRegion = (e) => {
    e.preventDefault()

    // Get input from form
    const {newNom, newDescr} = e.target

    // Update region in database
    axios.post(`/api/regions/update/${id}`, {
        nomRegion: newNom.value, 
        descrRegion: newDescr.value
    })
    .then(res => {
        console.log("mise a jour avec succes")
    })
    .catch(err => {
        console.log(err.response)
    })

    // Reset form field to empty
    newNom.value = "";
    newDescr.value = "";

    // Display toast
    toast.success('🦄 Region modifier avec success!', {
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


  return (
    
    // FORM TO UPDATE REGION
    <Container>  
      <div style={{marginLeft: "20%"}}>
        <h2 style={{textAlign: "left", marginTop: "3%", marginBottom: "3%"}}>Modifier un Region:</h2> 

        <Form style={{textAlign: "left"}} onSubmit={e => modifierRegion(e)}>

          <NativeSelect id="select" style={{width: "62%"}}  onChange={e => handleSelect(e)}>
            <option value="10" style={{color: "grey"}}>Quel regions voulez-vous modifier?</option>
            {
                Object.values(regions).map(region => {
                  return (
                      <option value={region._id}  >{region.nomRegion}</option>
                  )
                }) 
            }
          </NativeSelect><br/><br/>

          <Form.Group>
              <Form.Input label='Nom region:' 
                          type="text" 
                          value={nom} 
                          name="newNom" 
                          placeholder='Nom region' 
                          onChange={(e) => setNom(e.target.value)} 
                          width={10} />
          </Form.Group>
          
          <Form.Group>
              <Form.TextArea label='Descriptions:' 
                             value={descr} 
                             name="newDescr" 
                             placeholder='Descriptions:' 
                             width={10} 
                             onChange={(e) => setDescr(e.target.value)} 
                             style={{height: "150px"}}/>
          </Form.Group>
          
          <br />
          <Button color="orange" style={{marginLeft: "15%"}}>Modifier</Button>
        </Form>

      </div>
    </Container>
  );
}

