import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { useBootstrapPrefix } from 'react-bootstrap/esm/ThemeProvider';
import { Router, useNavigate, useParams } from "react-router-dom"
import { ButtonContent, Container, Input } from 'semantic-ui-react'


export default function VinsIndividuel() {

    let {vinsID} = useParams()
    let navigate = useNavigate()
    const [vins, setVins] = useState([])
    const [quantity, setQuantity] = useState(1)
    const [prix, setPrix] = useState(0)
    const [prixTotal, setPrixTotal] = useState(0)

    const minusStyle = quantity === 1 ? "none" : "block"
    const plusStyle = quantity === 4 ? "none" : "block" 

    useEffect(() => {
        fetch('/api/vins')
            .then(res => res.json())
            .then(data => setVins(data))
    }, []) 

    useEffect(() => {
        fetch('/api/vins')
            .then(res => res.json())
            .then(data => data.map(x => {
                                            if(x._id === vinsID) { setPrix(x.prix) }
                                        }))
    }, [])
    
    useEffect(() => {
        setPrixTotal(prix * quantity)
    }, [quantity])

    const add = () => {
        setQuantity(quantity +1)
    }

    const minus = () => {
        setQuantity(quantity -1)
    }

    const afficherPaiement = (id) => {
        navigate(`/paiementEtape1`)
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

                                <div style={{display: "flex"}}>
                                    
                                    <tr>
                                        <td width="80px">
                                            <h5 style={{margin: "10px 0"}}>Quantité: </h5>
                                        </td>
                                        <td width="30px">
                                            <span onClick={minus} style={{display: minusStyle}}>
                                                <i class="fas fa-minus-circle fa-2x"></i>
                                            </span>
                                        </td>
                                        <td width="30px">
                                            <h5 style={{margin: "0 10px"}}><strong> {quantity} </strong></h5>
                                        </td>
                                        <td width="30px">
                                            <span onClick={add} style={{display: plusStyle}}>
                                                <i class="fas fa-plus-circle  fa-2x" style={{width: "40px"}}></i>
                                            </span>
                                        </td>
                                    </tr>
                                    
                                </div>

                                <br/>

                                <p>{item.descrVins}</p>

                                <br />

                                <Input 
                                    
                                    action={{
                                        onClick: afficherPaiement,
                                        color: 'teal',
                                        labelPosition: 'left',
                                        icon: 'cart',
                                        content: 'Payer',
                                    }}
                                    actionPosition='left'
                                    placeholder='Search...'
                                    value={quantity === 1 ? `${item.prix} $` : `${prixTotal} $`}
                                    style={{margin: "10px 0"}}
                                />

                                <br />

                                <Button primary style={{margin: "10px 0"}}>
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