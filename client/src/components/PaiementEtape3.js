import React, { useEffect, useState } from 'react'
import { Router, useNavigate, useParams } from "react-router-dom"
import { Container, Form, Radio, Step, Button, ButtonContent } from 'semantic-ui-react'


export default function PaiementEtape3() {

  let {clientID, sousTotal} = useParams()
  const [paniers, setPaniers] = useState([]);
  const [clients, setClients] = useState([]);
  const [vins, setVins] = useState([])

  useEffect(() => {
    let isMounted = true;

    fetch('/api/clients')
    .then(res => res.json())
    .then(data => { if (isMounted) {setClients(data)} })

    fetch('/api/paniers')
        .then(res => res.json())
        .then(data => { if (isMounted) {setPaniers(data)} })

    fetch('/api/vins')
        .then(res => res.json())
        .then(data => { if (isMounted){ setVins(data) } })

    // paniers.map(x => {if (isMounted && x.clientID === clientID) {
    //     setPanierExist(true)

    return () => {isMounted = false};
    }, [])


    const StepExampleOrdered = () => (
        <Step.Group ordered>
          <Step completed>
            <Step.Content>
              <Step.Title>Informations</Step.Title>
              <Step.Description>Adresse de livraison</Step.Description>
            </Step.Content>
          </Step>
      
          <Step completed>
            <Step.Content>
              <Step.Title>Paiement</Step.Title>
              <Step.Description>Mode de paiement</Step.Description>
            </Step.Content>
          </Step>
      
          <Step active>
            <Step.Content>
              <Step.Title>Confirmation</Step.Title>
            </Step.Content>
          </Step>
        </Step.Group>
      )

      const styles = {
        textAlign: "left",
        width: "170px",
        height: "40px",

      }

    return (
      <Container style={{margin: "20px 20px", width: "100vw"}} >

        <div style={{display: "flex", justifyContent: "center"}}>

          <div className='jumbotron' >
              <h1>Paiement</h1>
              {StepExampleOrdered()}

              {
                clients.map(client => {
                  if (client._id === clientID) {
                    return (
                      <div style={{marginLeft: "40px"}}>
                        <table>
                          <tr >
                            <td style={styles}><h5>Client:</h5> </td>
                            <td align='left'><strong>{client.prenom} {client.nom}</strong></td>
                          </tr>
                          <tr>
                            <td style={styles}><h5>Type de carte:</h5></td>
                            <td align='left'><strong>{client.typeCarte}</strong></td>
                          </tr>
                          <tr>
                            <td style={styles}><h5>Adresse de livraison:</h5></td>
                            <td align='left'><strong>{client.adresse}</strong></td>
                          </tr>
                          <tr>
                            <td style={styles}><h5>Montant total:</h5></td>
                            <td align='left'><h4>{Math.round(sousTotal * 1.14975 * 100) / 100} $</h4></td>
                          </tr>
                        </table>
                      </div>
                    )
                  }
                
                })
              }
              <br/><br/>
              <Button color='teal'>Retours</Button>
              <Button color="green">Confirmer</Button>
          </div>

          <div style={{marginLeft: "5vw", maxHeight: "80vw", overflowX: "auto"}} >
            {paniers.map(panier => {
              return (
                vins.map(item => {
                    
                    if (item._id === panier.vinsID && panier.clientID === clientID) {
                        
                      return (
                        <div style={{display: "flex", flexDirection: "row", marginBottom: "20px"}} key={item._id}>
                          <tr>
                            <span className="prixTag" >{panier.quantity}</span>
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
          </div>

        </div>

      </Container>

    )
}
