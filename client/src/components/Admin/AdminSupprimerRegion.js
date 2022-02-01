import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Container } from 'react-bootstrap';
import { Form, Button } from 'semantic-ui-react'
import { NativeSelect } from '@mui/material';
import { toast } from 'react-toastify';

export default function AdminSupprimerRegion() {

    const [regions, setRegions] = useState("");
    const [id, setId] = useState("");
    const [nom, setNom] = useState("");
    const [descr, setDescr] = useState("");


    // Set regions when page is loaded
    useEffect(() => {
        let isMounted = true;
        fetch('/api/regions')
        .then(res => res.json())
        .then(data => { if (isMounted) {setRegions(data)} })

        return () => {isMounted = false};
    }, [])


    // Set id, nom and descr when a region is selected in the form
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


    // Method to delete region from database
    const supprimerRegion = async () => {

      // Delete selected region from database
      await axios({
          method: 'DELETE',
          url: `/api/regions`,
          data: {
              id: id
          }
      })
      .then(res => {
          console.log("mise a jour avec succes")
      })
      .catch(err => {
          console.log(err.response)
      })

      // Reset form field to empty
      setNom("")
      setDescr("")

      // Display toast
      toast.success('🦄 Region supprimer avec success!', {
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
    // FORM TO DELETE A REGION
    <Container>  
      <div style={{marginLeft: "20%"}}>
        <h2 style={{textAlign: "left", marginTop: "3%", marginBottom: "3%"}}>Supprimer un Region:</h2> 

        <Form style={{textAlign: "left"}} onSubmit={e => supprimerRegion(e)}>

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
                          placeholder='Nom region' 
                          width={10} />
          </Form.Group>
          
          <Form.Group>
              <Form.TextArea label='Descriptions:' 
                            value={descr} 
                            placeholder='Descriptions:' 
                            width={10} 
                            style={{height: "150px"}}/>
          </Form.Group>

          <br />
          <Button color="red" style={{marginLeft: "15%"}}>Supprimer</Button>
        </Form>

      </div>
    </Container>
  );
}
