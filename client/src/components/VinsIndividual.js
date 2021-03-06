import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom"
import { Button, Container } from 'semantic-ui-react'
import { toast } from 'react-toastify';
import Header from '../components/Header';


export default function VinsIndividuel() {

    let {vinsID, clientID} = useParams()
    let navigate = useNavigate()
    const [vins, setVins] = useState([])

    // Set vins when page is loaded
    useEffect(() => {
        let isMounted = true;
        fetch('/api/vins')
            .then(res => res.json())
            .then(data => { if (isMounted){ setVins(data) } })

        return () => {isMounted = false};
    }, []) 


    // Add a Vins in Panier in the database
    const ajouterPanier = async (e) => {
        e.preventDefault()

        let vinsExistPanier = false;

        const res = await axios.get('/api/paniers')
        const data = res.data
        data.map(x => {
            // If vins alreay exist in Cart, display a toast to notify user
            if (x.clientID === clientID && x.vinsID === vinsID) {
                toast.info('🦄 Ce vins existe deja dans votre panier!', {
                    toastId: 'info1',
                    position: "top-right",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                vinsExistPanier = true;
            }
        })

        if (!vinsExistPanier) {
            await axios.post('/api/paniers', {
                clientID: clientID,
                vinsID: vinsID
            })
            navigate(`/panier/${clientID}`)
        }
    }


    // Navigate to Main Regions page when 'Voir les regions' button is clicked
    const afficherRegions = () => {
        navigate(`/regions/${clientID}`)
    }


    return (

        // DISPLAY DETAILS ABOUT A VINS WITH AN 'ADD TO CART BUTTON'
        <Container style={{marginTop: "50px"}}>

            <Header client={clientID}/>

            <span style={{float: "right", marginTop: "2%"}}>
                <Button inverted color='blue' onClick={afficherRegions}>
                    Voir les regions
                </Button>
            </span>
            <br/>
           
            {vins.map(item => {
                if (item._id === vinsID) {
                    return (
                        <div style={{display: "flex", marginTop: "5%"}}>
                            
                            <img src={require(`../images/vins/${item.imgVins}`)}
                                style={{width: "25vw", maxWidth: "25vw", height: "60vh", maxHeight: "60vh", textAlign: "center"}} />
                            
                            <div style={{width: "25vw", maxWidth: "25vw", marginTop: "40px", textAlign: "left"}}>
                                <br/>
                                <h3>{item.nom}</h3>
                                <hr />

                                <h5 style={{margin: "10px 0"}}>Prix: {item.prix} $ </h5> 

                                <br/>

                                <p>{item.descrVins}</p>

                                <br />

                                <Button primary 
                                        onClick={ajouterPanier}
                                        style={{margin: "10px 0"}}>
                                    <i class="fas fa-cart-plus"></i> Ajouter au panier
                                </Button>
                                
                            </div>

                        </div>
                    )
                }
            })}

        </Container>
    )
}