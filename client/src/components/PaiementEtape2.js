import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Router, useNavigate, useParams } from "react-router-dom"
import { Container, Form, Radio, Step, Button } from 'semantic-ui-react'
import visa from "../images/visa1.jpg"
import amex from "../images/amex1.jpg"
import masterCard from "../images/mastercard1.jpg"
import Header from '../components/Header';

export default function PaiementEtape2() {

    let navigate = useNavigate()
    let {clientID, sousTotal} = useParams()
    const [paniers, setPaniers] = useState([]);
    const [clients, setClients] = useState([]);
    const [vins, setVins] = useState([])


    useEffect(() => {
      let isMounted = true;
  
      fetch('/api/paniers')
          .then(res => res.json())
          .then(data => { if (isMounted) {setPaniers(data)} })
  
      fetch('/api/vins')
          .then(res => res.json())
          .then(data => { if (isMounted){ setVins(data) } })
  
      return () => {isMounted = false};
      }, [])


    const StepExampleOrdered = () => (
      <div style={{display: "flex", justifyContent: "flex-start"}}>
        <Step.Group ordered>
          <Step completed>
            <Step.Content>
              <Step.Title>Informations</Step.Title>
              <Step.Description>Adresse de livraison</Step.Description>
            </Step.Content>
          </Step>
      
          <Step active>
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

      const updateClient = async (e) => { 
        e.preventDefault()
  
        const {typeCarte, numeroCarte} = e.target

        await axios.post(`/api/clients/update/${clientID}`, {
          typeCarte: typeCarte.value,
          numeroCarte: numeroCarte.value
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

      const paiementEtape3 = (e) => {
        updateClient(e)
        navigate(`/paiementEtape3/${clientID}/${sousTotal}`)
      }

      const paiementEtape1 = () => {
        navigate(`/paiementEtape1/${clientID}/${sousTotal}`)
      }

    return (
        <Container style={{margin: "20px 20px", width: "100vw"}}>

          <Header client={clientID}/>

          <div style={{display: "flex", justifyContent: "center", marginTop: "5%"}}>

            <div style={{marginTop: "10px"}} className='jumbotron'>
                <h1 style={{marginBottom: "20px"}}>Paiement</h1>
                <div style={{textAlign: "left"}}>
                    {StepExampleOrdered()}
                    
                    <br/><br/>
                    <h6 style={{textAlign: "left", marginLeft: "25%"}}>Sélectionnez votre méthode de paiement:</h6>
                    <Form style={{textAlign: "left", marginLeft: "25%", width: "100%"}}
                          onSubmit={e => paiementEtape3(e)}>
                        <Form.Group inline >
                            <Form.Field
                                label={<img src={visa} />}
                                control='input'
                                type='radio'
                                name='typeCarte'
                                value="Visa"
                                style={{marginLeft: "35px"}}
                            /> 
                            <Form.Field
                                label={<img src={amex} />}
                                control='input'
                                type='radio'
                                name='typeCarte'
                                value="American Express"
                                style={{marginLeft: "10px"}}
                            />  
                            <Form.Field
                                label={<img src={masterCard} />}
                                control='input'
                                type='radio'
                                name='typeCarte'
                                value="Master Card"
                                style={{marginLeft: "10px"}}
                            />  
                        </Form.Group>
                        <Form.Group>
                            <Form.Input label='Numero Carte' name="numeroCarte" placeholder='Numero Carte' width={8} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Input label="Date d'expiration" placeholder='MM/YY' width={4} />
                            <Form.Input label="CVC / CVV" placeholder='123' width={4} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Input label="Nom du titulaire" placeholder='John Doe' width={8} />
                        </Form.Group>

                        <br/>
                        <Button color="grey" onClick={paiementEtape1} style={{float: "left", marginLeft: "0"}}>Retour - Etape 1</Button>
                        <Button color="green" style={{float: "right", marginRight: "50%"}}>Suivant - Etape 3</Button>

                    </Form>
                </div>

            </div>
            
            <div style={{marginLeft: "5vw"}} >
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

              <br /><br />

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
              <br />

              <h5>
                <span style={{float: "left"}}>Total</span>
                <span style={{float: "right"}}><h2>{Math.round(sousTotal * 1.14975 * 100) / 100} $</h2></span>
              </h5>
            </div>

          </div>

        </Container>
    )
}
