import React, { useEffect, useState } from 'react'
import Header from '../components/Header';
import { Button } from 'react-bootstrap';
import { Container } from "semantic-ui-react";
import { useNavigate, useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

export default function Regions() {

    const [regions, setRegions] = useState([]);
    let navigate = useNavigate();
    let {clientID} = useParams()

    useEffect(() => {
        fetch('/api/regions')
            .then(res => res.json())
            .then(data => setRegions(data))
    }, []) 


    const afficherVins = (vinsID) => {
        navigate(`/vinsParRegion/${vinsID}/${clientID}`)
    }


    return (
        <Container>
            <Header client={clientID}/>

            <p style={{ marginTop: "5%", 
                        marginLeft: "15px", 
                        fontFamily: 'Island Moments', 
                        float: "left", 
                        fontSize: "35px",
                        fontWeight: "bold",
                        color: "teal"}}>
                Découvrir ce que nos vignobles ont à vous offrir:
            </p>
            <Container style={{display: "flex", flexWrap: "wrap", margin: "30px auto", justifyContent: "space-around"}}>
                {regions.map(region => 
                    
                        <div onClick={() => afficherVins(region._id)}
                             style={{
                                        marginRight: "15px", 
                                        marginBottom: "30px",
                                        border: "2px solid black",
                                        boxShadow: "10px 10px 5px grey"
                                    }}
                            key={region._id}>

                            <div style={{maxWidth: "250px", height: "85px", maxHeight: "85px", backgroundColor: "#e6e6fa", padding: "5px"}}>
                                <h4>{region.nomRegion}</h4>
                            </div>
                            <img src={require(`../images/regions/${region.imgRegion}`)} 
                                    style={{width: "250px", maxWidth: "250px", maxHeight: "250px"}}
                            />
                        </div>
                    
                )}

            </Container>

        </Container>
    )
}
