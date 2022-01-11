import { Container } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Router, useNavigate, useParams } from "react-router-dom"
import { Button, ButtonContent, Checkbox, Grid, Input, Label } from 'semantic-ui-react';
import Header from './Header';

export default function Panier() {

    let {clientID} = useParams()
    let navigate = useNavigate()
    const [paniers, setPaniers] = useState([]);
    const [vins, setVins] = useState([])
    const [panierExist, setPanierExist] = useState(false)
    
    let prixTotal = 0

    useEffect(() => {
        let isMounted = true;

        fetch('/api/paniers')
            .then(res => res.json())
            .then(data => { if (isMounted) {setPaniers(data)} })

        fetch('/api/vins')
            .then(res => res.json())
            .then(data => { if (isMounted){ setVins(data) } })

        paniers.map(x => {if (isMounted && x.clientID === clientID) {
            setPanierExist(true)
        }})

        return () => {isMounted = false};
    }, []) 



    const updatePanier = async (panierId, vinsID, quantity) => { 
        await axios.post(`/api/paniers/update/${panierId}`, {
            clientID: clientID, 
            vinsID: vinsID, 
            quantity: quantity
        })
        .then(res => {
            console.log("mise a jour avec succes")
        })
        .catch(err => {
            console.log(err.response)
        })

        getPaniers()
    }


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


    const afficherPaiement = (id) => {
        navigate(`/paiementEtape1/${clientID}/${prixTotal}`)
    }


    const updateSousTotal = (qty, prix) => {
        prixTotal += (qty * prix)
    }
    
    const afficherPanier = () => {
        return (
            <div style={{marginRight: "20px"}}>
                {paniers.map(panier => {
                    return (
                        vins.map(item => {
                            
                            if (item._id === panier.vinsID && panier.clientID === clientID) {
                                
                                return (
                                    
                                    <div style={{display: "flex", flexDirection: "row", marginBottom: "20px"}} key={item._id}>
                                        <img src={require(`../images/regions/${item.imgVins}`)}
                                            style={{width: "150px", maxWidth: "150px", height: "200px", maxHeight: "200px"}} />
                                        
                                        <div style={{width: "40vw", maxWidth: "30vw", marginTop: "20px", textAlign: "left"}}>
                                            <div style={{display: "flex"}}>
                                                <h4>{item.nom}</h4>
                                                <Button inverted color='olive' 
                                                        size='mini' 
                                                        style={{ marginLeft: "auto", 
                                                                 maxHeight: "27px", 
                                                                 paddingLeft: "5px", 
                                                                 paddingRight: "5px" }}
                                                        onClick={() => supprimerPannier(panier._id)}>
                                                        Suprimer
                                                </Button>
                                            </div>

                                            <hr />

                                            <h6 style={{margin: "10px 0"}}>Prix unitaire: {item.prix} $ </h6> 

                                            <div style={{display: "flex"}} >
                                                <tr>
                                                    <td width="80px">
                                                        <h5 style={{margin: "10px 0"}}>Quantité: </h5>
                                                    </td>
                                                    <td width="30px">
                                                        <span onClick={ ()=>updatePanier(panier._id, item._id, panier.quantity-1) } style={{color: panier.quantity === 1 ? "#dcdcdc" : "#6495ed"}}>
                                                            <i class="fas fa-minus-circle fa-2x"></i>
                                                        </span>
                                                    </td>
                                                    <td width="30px">
                                                        <span><h5 style={{margin: "0 10px"}}>
                                                            <strong> {panier.quantity} </strong></h5>
                                                        </span>
                                                        
                                                    </td>
                                                    <td width="30px">
                                                        <span onClick={ ()=>updatePanier(panier._id, item._id, panier.quantity+1) } style={{color: panier.quantity === 4 ? "#dcdcdc" : "#6495ed"}}>
                                                            <i class="fas fa-plus-circle  fa-2x" style={{width: "40px"}}></i>
                                                        </span>
                                                    </td>
                                                    <td width="200px" align='right'>
                                                        <h5 style={{float: "right"}}>{panier.quantity * item.prix} $</h5>
                                                    </td>
                                                </tr>
                                                {updateSousTotal(panier.quantity, item.prix)}
                                            </div>
                                            
                                        </div>
                                    </div>
                                )
                            }
                        })
                    )
                })}
            </div>
            
        )
    }


    return (
        <Container>
            <Header client={clientID} />
            <h1 style={{float: "left", marginTop: "5%"}}>PANIER</h1>
            <br/>
            <hr style={{marginTop: "7%"}}/>

            <div style={{display: "flex"}}>
                <div style={{width: "60vw", maxWidth: "60vw"}}>
                    {panierExist === false ? afficherPanier() : <h1 style={{marginTop: "10%", marginLeft: "0"}}>Votre panier est vide!</h1>}
                </div>
                <div style={{display: "flex", flexDirection: "column", width: "25vw", maxWidth: "25vw"}}>
                        
                        <strong>
                            <h3 style={{margin: "40px 10px"}}>
                                <span style={{float: "left"}}>Sous-total</span> 
                                <span style={{float: "right"}}>${prixTotal}</span>
                            </h3>
                        </strong>

                        <p style={{margin: "20px 10px", textAlign: "left"}}>Les commandes seront facturées en CAD.</p>

                        <Label style={{margin: "0 10px"}}>Commentaire:</Label>
                        <textarea style={{margin: "10px 10px", height: "80px"}}></textarea>

                        <Button onClick={afficherPaiement} color="blue" style={{height: "50px", margin: "50px 50px"}}>
                            <i class="fas fa-lock"> </i>  Paiement
                        </Button>
                </div>
            </div>

        </Container>
    )
}

