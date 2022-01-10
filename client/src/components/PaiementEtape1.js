import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Router, useNavigate, useParams } from "react-router-dom"
import { Container, Form, Step, Button, Grid } from 'semantic-ui-react'

export default function PaiementEtape1() {

  let navigate = useNavigate()
  let {clientID, sousTotal} = useParams()
  const [clients, setClients] = useState([]);
  const [paniers, setPaniers] = useState([]);
  const [vins, setVins] = useState([])
  const [panierExist, setPanierExist] = useState(false)


  useEffect(() => {
    let isMounted = true;

    fetch('/api/paniers')
        .then(res => res.json())
        .then(data => { if (isMounted) {setPaniers(data)} })

    fetch('/api/vins')
        .then(res => res.json())
        .then(data => { if (isMounted){ setVins(data) } })

    // paniers.map(x => {if (isMounted && x.clientID === clientID) {
    //     setPanierExist(true)
    // }})

    return () => {isMounted = false};
  }, []) 


  const updateClient = async (e) => { 
      e.preventDefault()

      const {prenom, nom, adresse, appartment, ville, province, codePostal} = e.target
      await axios.post(`/api/clients/update/${clientID}`, {
        prenom: prenom.value,
        nom: nom.value,
        adresse: adresse.value,
        appartment: appartment.value,
        ville: ville.value,
        province: province.value,
        codePostal: codePostal.value
      })
      .then(res => {
          console.log("mise a jour avec succes")
      })
      .catch(err => {
          console.log(err.response)
      })

      getClients()
   }

    // Read
    const getClients = async () => {
      const res = await axios.get('/api/clients')
      const data = res.data

      setClients(data)
    }

    const StepExampleOrdered = () => (
      <div style={{display: "flex", justifyContent: "flex-start"}}>
        <Step.Group ordered>
          <Step active>
            <Step.Content>
              <Step.Title>Informations</Step.Title>
              <Step.Description>Adresse de livraison</Step.Description>
            </Step.Content>
          </Step>
      
          <Step inactive>
            <Step.Content>
              <Step.Title>Paiement</Step.Title>
              <Step.Description>Mode de paiement</Step.Description>
            </Step.Content>
          </Step>
      
          <Step inactive>
            <Step.Content>
              <Step.Title>Confirmation</Step.Title>
            </Step.Content>
          </Step>
        </Step.Group>
      </div>
    )

    const paiementEtape2 = (e) => {
      updateClient(e)
      navigate(`/paiementEtape2/${clientID}/${sousTotal}`)
    }

    return (
        <Container style={{margin: "20px 20px", width: "100vw"}}>
          
          <div style={{display: "flex", justifyContent: "center"}} >
            <div style={{marginTop: "10px"}} className='jumbotron'>
                <h1 style={{marginBottom: "20px"}}>Paiement</h1>
                <br />
                
                {StepExampleOrdered()}

                <br/><br/>
                <Form style={{textAlign: "left", marginLeft: "15%"}}
                      onSubmit={e => paiementEtape2(e)}>
                    <Form.Group>
                        <Form.Input label='Prenom' name="prenom" placeholder='Prenom' width={6} />
                        <Form.Input label='Nom' name="nom" placeholder='Nom' width={6} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Input label="Adresse" name="adresse" placeholder='Adresse' width={9} />
                        <Form.Input label="Appartement" name="appartment" placeholder='No. Apt' width={3} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Input label="Ville" name="ville" placeholder='Ville' width={4} />
                        <Form.Input label="Province" name="province" placeholder='Province' width={4} />
                        <Form.Input label="Code Postal" name="codePostal" placeholder='Code Postal' width={4} />
                    </Form.Group>
                    <br />
                    <Button color="green" >Suivant - Etape 2</Button>
                </Form>

            </div>

            <div style={{marginLeft: "5vw"}}>
              <div style={{maxHeight: "50vh", overflowY: "auto"}}>
                {paniers.map(panier => {
                    return (
                      vins.map(item => {
                          if (item._id === panier.vinsID && panier.clientID === clientID) {
                            return (
                              
                              <div style={{display: "flex", flexDirection: "row", marginBottom: "20px"}} key={item._id}>
                                <tr>
                                  <div style={{display: "flex"}}>
                                    <div>
                                        <img src={require(`../images/regions/${item.imgVins}`)}
                                            style={{width: "70px", maxWidth: "70px", height: "100px", maxHeight: "100px"}} />
                                    </div>
                                    <div className="prixTag" style={{height: "30px", width: "30px", marginRight: "10px"}}>
                                      {panier.quantity}
                                    </div>
                                  </div>
                                </tr>

                                <tr>
                                  <div style={{width: "18vw", maxWidth: "18vw", marginTop: "20px", textAlign: "left"}}>
                                      <div style={{display: "flex"}}>
                                          <h6>{item.nom}</h6>
                                      </div>
                                  </div>
                                </tr>

                                <tr>
                                  <h5 style={{marginTop: "20px", marginRight: "10px", marginLeft: "5px"}}>{panier.quantity * item.prix} $</h5>
                                </tr>

                                <br />
                              </div>
                              
                            )
                          }
                      })
                    )
                })}
                </div>
                
                <hr/>

                <br />
                <h5>
                  <span style={{float: "left"}}>Sous-total</span>
                  <span style={{float: "right"}}>{sousTotal},00 $</span>
                </h5>
                <br/><br/>
                <p>
                  <span style={{float: "left"}}>TPS</span>
                  <span style={{float: "right"}}>{Math.round(sousTotal * 0.05 * 100) / 100} $</span>
                </p>
                <br />
                <p>
                  <span style={{float: "left"}}>TVQ</span>
                  <span style={{float: "right"}}>{Math.round(sousTotal * 0.09975 * 100) / 100} $</span>
                </p>
                <br />

                <hr />
                <h5>
                  <span style={{float: "left"}}><h3>Total</h3></span>
                  <span style={{float: "right"}}><h2>{Math.round(sousTotal * 1.14975 * 100) / 100} $</h2></span>
                </h5>
            </div>
          
          </div>
        </Container>
    )
}
