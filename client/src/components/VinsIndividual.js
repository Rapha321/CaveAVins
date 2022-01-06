import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, ButtonGroup, Dropdown, ToastHeader } from 'react-bootstrap';
import { useBootstrapPrefix } from 'react-bootstrap/esm/ThemeProvider';
import { Router, useNavigate, useParams } from "react-router-dom"
import { ButtonContent, Container, Input } from 'semantic-ui-react'
import { ToastContainer, toast, Zoom, Bounce } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


export default function VinsIndividuel() {

    let {vinsID, clientID} = useParams()
    let navigate = useNavigate()
    const [vins, setVins] = useState([])
    const [paniers, setPaniers] = useState([]);


    useEffect(() => {
        let isMounted = true;
        fetch('/api/vins')
            .then(res => res.json())
            .then(data => { if (isMounted){ setVins(data) } })

        return () => {isMounted = false};
    }, []) 


    const ajouterPanier = async (e) => {
        e.preventDefault()

        let vinsExistPanier = false;

        const res = await axios.get('/api/paniers')
        const data = res.data
        data.map(x => {
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
    
            getPaniers()
            navigate(`/panier/${clientID}`)
        }

    }

    // Read
    const getPaniers = async () => {
        const res = await axios.get('/api/paniers')
        const data = res.data
        setPaniers(data)
    }




    return (
        <Container style={{marginTop: "50px"}}>
           
            {vins.map(item => {
                if (item._id === vinsID) {
                    return (
                        <div style={{display: "flex"}}>
                            
                            <img src={require(`../images/regions/${item.imgVins}`)}
                                style={{width: "25vw", maxWidth: "25vw", height: "60vh", maxHeight: "60vh"}} />
                            
                            <div style={{width: "40vw", maxWidth: "30vw", marginTop: "20px", textAlign: "left"}}>
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