import React, { useState, useEffect } from 'react'
import { Navbar, Container } from 'react-bootstrap';
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Button, Icon, Modal } from 'semantic-ui-react'


export default function Header(props) {

    const location = useLocation()
    let navigate = useNavigate();
    let {clientID} = useParams();

    const [style, setStyle] = useState("block")
    const [open, setOpen] = useState(false)
    const [commandes, setCommandes] = useState([])
    const [nomClient, setNomClient] = useState("")


    useEffect(() => {
        location.pathname === '/' ? setStyle("none") : setStyle("block")
    }, [location])

    
    useEffect(() => {
        let isMounted = true;
        fetch('/api/commandes')
            .then(res => res.json())
            .then(data => { if (isMounted) {setCommandes(data)} })

        fetch('/api/clients')
            .then(res => res.json())
            .then(data => data.map(client => {
                if (client._id === clientID) {
                    setNomClient(`${client.prenom} ${client.nom}`)
                }
            }) ) 

        return () => {isMounted = false};
    }, [])


    const afficherPanier = () => {
        navigate(`/panier/${props.client}`)
    }

    const signout = () => {
        navigate(`/`)
    }


    return (
        <Navbar>
            <Container>
                <img src={require(`../images/logo.png`)} style={{width: "40px", marginRight: "10px"}}/>
                <Navbar.Brand href="#home"><h1 style={{color: "#ff1493"}}><strong>Cave à Vins</strong></h1></Navbar.Brand>

                <span style={{display: style, marginTop: "10px", bottom: "0"}}> de <strong>{nomClient}</strong></span>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                <Navbar.Text style={{display: style === "block" ? "flex" : "none"}}>

                    <Modal
                        open={open}
                        onClose={() => setOpen(false)}
                        onOpen={() => setOpen(true)}
                        trigger={<Button size='mini' color='blue' style={{marginRight: "30px"}}>Mes commandes</Button>}
                        style={{
                                    position: "relative", 
                                    width: "80vw", 
                                    maxWidth: "80vw", 
                                    height: "80vh", 
                                    maxHeight: "80vh"
                                }}
                    >
                        <Modal.Header>Mes Commandes:</Modal.Header>
                        <Modal.Content image scrolling 
                                        style={{height: "60vh", 
                                                maxHeight: "60vh", 
                                                width: "80vw", 
                                                maxWidth: "80vw",
                                                display: "flex",
                                                flexDirection: "column"}}>
                            <table>        
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
                                        if (commande.clientID === clientID) {
                                            return (
                                                Object.values(commande.item).map(x => {
                                                    return (
                                                        <tr key={x.vinsID}>
                                                            <td style={{padding: "10px 4px"}}>{commande._id}</td>
                                                            <td>{x.quantity}</td>
                                                            <td>{x.nom}</td>
                                                            <td>{x.prix}</td>
                                                            <td>{commande.status}</td>
                                                        </tr>
                                                    )
                                                })
                                            )
                                        }
                                    })}
                                </tbody>
                            </table>
                          
                        </Modal.Content>
                        <Modal.Actions>
                            <Button onClick={() => setOpen(false)} primary>
                                Fermer <Icon name='chevron right' />
                            </Button>
                        </Modal.Actions>
                    </Modal>

                    <span onClick={afficherPanier} style={{ display: style, color: "springgreen" }}>
                        <i class="fas fa-2x fa-cart-arrow-down"></i>
                    </span>

                    <span onClick={signout} style={{ display: style, color: "red", marginLeft: "20px" }}>
                        <i class="fas fa-2x fa-sign-out-alt"></i>
                    </span>
                </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}