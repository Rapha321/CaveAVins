import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Modal } from 'react-bootstrap';
import { Router, useNavigate, useParams } from "react-router-dom"
import { Container, Step } from 'semantic-ui-react'
import Header from '../components/Header';


export default function PaiementEtape3() {

    let navigate = useNavigate()
    let {clientID, sousTotal} = useParams()
    const [paniers, setPaniers] = useState([])
    const [clients, setClients] = useState([])
    const [vins, setVins] = useState([])
    const [commandes, setCommandes] = useState([])
    // const [item, setItem] = useState([])


    const [show, setShow] = useState(false);


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

      return () => {isMounted = false};
    }, [])


    const supprimerPannier = async (panierId) => {
      await axios({
          method: 'DELETE',
          url: `/api/paniers`,
          data: {
              id: panierId
          }
      })
      .then(res => {
          console.log("mise a jour avec succes")
      })
      .catch(err => {
          console.log(err.response)
      })
      await getPaniers()
    }

    // Read
    const getPaniers = async () => {
      const res = await axios.get('/api/paniers')
      const data = res.data
      setPaniers(data)
    }


    const creerCommande = async () => { 
      let item = [];

      paniers.map(panier => {
        if (panier.clientID === clientID) {
        
          let nom = ""
          let prix = 0
          vins.map(v => {if (v._id === panier.vinsID) {nom = v.nom; prix = v.prix}})

          item.push({ 
            vinsID: panier.vinsID, 
            nom: nom, 
            quantity: panier.quantity, 
            prix: prix * panier.quantity
          })

        }
      })

      await axios.post(`/api/commandes`, {
          date: Date, 
          clientID: clientID, 
          item: item,
          status: "Nous préparons votre commande"
      })
      .then(res => {
          console.log("mise a jour avec succes")
      })
      .catch(err => {
          console.log(err.response)
      })

      getCommandes()
    }

    // Read
    const getCommandes = async () => {
        const res = await axios.get('/api/commandes')
        const data = res.data
        setCommandes(data)
    }


    const handleClose = () => {
        setShow(false) 

        paniers.map(panier => {
          if (panier.clientID === clientID) {
            supprimerPannier(panier._id)
          }
        })

        navigate(`/regions/${clientID}`)
    };

    const handleShow = () => setShow(true);

    const handleRetour = () => { 
      navigate(`/paiementEtape2/${clientID}/${sousTotal}`)
     }

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

        <Header client={clientID}/>

        <div style={{display: "flex", justifyContent: "center", marginTop: "5%"}}>
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
              <Button variant='secondary' style={{width: "90px"}} onClick={handleRetour}>Retours</Button>

              <Button variant="success" onClick={() => {creerCommande(); handleShow();}} style={{width: "90px", marginLeft: "155px"}}>
                Confirmer
              </Button>

              <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
              >
                <Modal.Header >
                  <Modal.Title>Félicitations!!!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   Nous avons bien recu votre commande. Votre livraison sera effectuée dans un délai de 24 heures!
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" onClick={handleClose}>
                    Fermer
                  </Button>
                </Modal.Footer>
              </Modal>

          </div>

          <div style={{marginLeft: "5vw", maxHeight: "60vh", overflowX: "auto"}} >
            {paniers.map(panier => {
              return (
                vins.map(vin => {
                    
                    if (vin._id === panier.vinsID && panier.clientID === clientID) {
                        
                      return (
                        <div style={{display: "flex", flexDirection: "row", marginBottom: "20px"}} key={vin._id}>
                          <tr>
                            <span className="prixTag" >{panier.quantity}</span>
                            <img src={require(`../images/regions/${vin.imgVins}`)}
                                style={{width: "70px", maxWidth: "70px", height: "100px", maxHeight: "100px"}} />
                          </tr>

                          <tr>
                            <div style={{width: "18vw", maxWidth: "18vw", marginTop: "20px", textAlign: "left"}}>
                                <div style={{display: "flex"}}>
                                    <h6>{vin.nom}</h6>
                                </div>
                            </div>
                          </tr>

                          <tr>
                            <h5 style={{marginTop: "20px", marginRight: "5px"}}>{panier.quantity * vin.prix} $</h5>
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
