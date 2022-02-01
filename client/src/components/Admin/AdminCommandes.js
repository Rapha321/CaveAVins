import React, {useState, useEffect} from 'react'
import { Button } from 'semantic-ui-react'
import { Container, Table } from 'react-bootstrap';
import axios from 'axios';
import AdminHeader from './AdminHeader'


export default function AdminCommandes() {

    const [commandes, setCommandes] = useState([])

    // Set commandes when page is loaded
    useEffect(() => {
        let isMounted = true;
        fetch('/api/commandes')
            .then(res => res.json())
            .then(data => { if (isMounted) {setCommandes(data)} })

        return () => {isMounted = false};
    }, [])


    // Set commande status to "En route" in database
    const commandeEnRoute = (commandeRef, vinsRef) => {
        commandes.map(commande => {
            Object.values(commande.item).map(vin => {
                if (commande._id === commandeRef && vin.vinsID === vinsRef) {
                    axios.post(`/api/commandes/update/${commande._id}`, {
                        status: "En route" 
                    })
                    .then(res => {
                        console.log("mise a jour avec succes")
                    })
                    .catch(err => {
                        console.log(err.response)
                    })
                }
            })
        })
        getCommandes()
    }

    // Set commande status to "Livré" in database
    const commandeLivrer = (commandeRef, vinsRef) => {
        commandes.map(commande => {
            Object.values(commande.item).map(vin => {
                if (commande._id === commandeRef && vin.vinsID === vinsRef) {
                    axios.post(`/api/commandes/update/${commande._id}`, {
                        status: "Livré" 
                    })
                    .then(res => {
                        console.log("mise a jour avec succes")
                    })
                    .catch(err => {
                        console.log(err.response)
                    })
                }
            })
        })
        getCommandes()
    }

    // Read
    const getCommandes = async () => {
        const res = await axios.get('/api/commandes')
        const data = res.data
        setCommandes(data)
    }


    return (
        <Container>  
            <AdminHeader />

            <h2 style={{textAlign: "left", marginTop: "3%", marginBottom: "3%"}}>Gestion de commandes:</h2>  

            {/* TABLE DISPLAY ALL ORDERS */}
            <Table striped bordered hover size="md">
                <thead>
                    <tr>
                        <th>ID commande</th>
                        <th>Quantité</th>
                        <th>Produit</th>
                        <th>Prix</th>
                        <th>Statue du commande</th>
                    </tr>  
                </thead>

                <tbody>
                    {commandes.map(commande => {
                        return (
                            Object.values(commande.item).map(x => {
                                return (
                                    <tr key={`${commande._id}_${x.vinsID}`} >
                                        <td style={{padding: "10px 4px"}}>{commande._id}</td>
                                        <td width="100px">{x.quantity}</td>
                                        <td align='left'>{x.nom}</td>
                                        <td width="80px">{x.prix}</td>
                                        <td width="200px">{commande.status}</td>
                                        <td>
                                            <Button size="mini" color={commande.status === 'En préparation' ? 'blue' : 'grey'}
                                                    onClick={() => commandeEnRoute(commande._id, x.vinsID)} 
                                                    style={{marginLeft: "15px"}}>
                                                En route
                                            </Button>
                                        </td>
                                        <td>
                                            <Button size="mini" color={commande.status === 'Livré' ? 'grey' : 'green'} 
                                                    style={{marginLeft: "15px"}} 
                                                    onClick={() => commandeLivrer(commande._id, x.vinsID)} >
                                                Livré
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })
                        )
                    })}
                </tbody>
            </Table>
        </Container>

    )
}
