import React, { useEffect, useState } from 'react'
import { Router, useNavigate, useParams } from "react-router-dom"
import { Container, Form, Radio, Step, Button } from 'semantic-ui-react'
import visa from "../images/visa.jpg"
import amex from "../images/amex.jpg"
import masterCard from "../images/masterCard.jpg"

export default function PaiementEtape2() {

    let navigate = useNavigate()
    let {clientID, sousTotal} = useParams()
    const [paniers, setPaniers] = useState([]);
    const [vins, setVins] = useState([])


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

      

      const paiementEtape3 = () => {
        navigate(`/paiementEtape3`)
      }

      const paiementEtape1 = () => {
        navigate(`/paiementEtape1/${clientID}/${sousTotal}`)
      }


    return (
        <Container style={{margin: "20px 20px", width: "100vw"}}>

          <div style={{display: "flex", justifyContent: "center"}}>

            <div style={{marginTop: "10px"}}>
                <h1 style={{marginBottom: "20px"}}>PAIEMENT</h1>
                <div style={{textAlign: "left"}}>
                    {StepExampleOrdered()}
                    
                    <br/><br/>
                    <h6 style={{textAlign: "left", marginLeft: "25%"}}>Sélectionnez votre méthode de paiement:</h6>
                    <Form style={{textAlign: "left", marginLeft: "25%", width: "100%"}}>
                        <Form.Group inline >
                            <Form.Field
                                label={<img src={visa} />}
                                control='input'
                                type='radio'
                                name='carteCredit'
                                style={{marginLeft: "50px"}}
                            /> 
                            <Form.Field
                                label={<img src={amex} />}
                                control='input'
                                type='radio'
                                name='carteCredit'
                                style={{marginLeft: "10px"}}
                            />  
                            <Form.Field
                                label={<img src={masterCard} />}
                                control='input'
                                type='radio'
                                name='carteCredit'
                                style={{marginLeft: "10px"}}
                            />  
                        </Form.Group>
                        <Form.Group>
                            <Form.Input label='Numero Carte' placeholder='Numero Carte' width={8} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Input label="Date d'expiration" placeholder='MM/YY' width={4} />
                            <Form.Input label="CVC / CVV" placeholder='123' width={4} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Input label="Ville" placeholder='Ville' width={4} />
                            <Form.Input label="Province" placeholder='Province' width={4} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Input label="Nom du titulaire" placeholder='John Doe' width={8} />
                        </Form.Group>
                    </Form>
                </div>

                <br />

                <Button color="blue" onClick={paiementEtape1} style={{float: "left", marginLeft: "10px"}}>Retour - Etape 1</Button>
                <Button color="green" onClick={paiementEtape3} style={{float: "right", marginRight: "10px"}}>Suivant - Etape 3</Button>
                
            </div>

          
            <div style={{marginLeft: "10vw"}}>
                {paniers.map(panier => {
                  return (
                    vins.map(item => {
                        
                        if (item._id === panier.vinsID && panier.clientID === clientID) {
                            
                          return (
                            <div style={{display: "flex", flexDirection: "row", marginBottom: "20px"}} key={item._id}>
                              <tr>
                                <span className="prixTag">{panier.quantity}</span>
                                <img src={require(`../images/regions/${item.imgVins}`)}
                                    style={{width: "70px", maxWidth: "70px", height: "100px", maxHeight: "100px"}} />
                              </tr>

                              <tr>
                                <div style={{width: "18vw", maxWidth: "18vw", marginTop: "20px", textAlign: "left"}}>
                                    <div style={{display: "flex"}}>
                                        <h6>{item.nom}</h6>
                                    </div>
                                </div>
                              </tr>

                              <tr>
                                <h5 style={{marginTop: "20px"}}>{panier.quantity * item.prix} $</h5>
                              </tr>

                              <br />
                            </div>
                          )
                        }
                    })
                  )
                })}
              
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
