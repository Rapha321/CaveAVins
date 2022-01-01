import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { Container } from "semantic-ui-react";

export default function Regions() {

    const [regions, setRegions] = useState([]);

    useEffect(() => {
        fetch('/api/regions')
            .then(res => res.json())
            .then(data => setRegions(data))
    }, []) 

        
    return (
        <Container>
            <h2>Magasiner votre vins par regions:</h2>
            <Container style={{display: "flex", flexWrap: "wrap", margin: "30px auto", justifyContent: "space-around"}}>
                
                {regions.map(item => 
                    <div style={{marginRight: "15px", marginBottom: "30px", border: "solid 1px #006400"}}>

                        <div style={{maxWidth: "250px", height: "85px", maxHeight: "85px", backgroundColor: "#e6e6fa", padding: "5px"}}>
                            <h4>{item.nomRegion}</h4>
                        </div>
                        <img src={require(`../images/regions/${item.imgRegion}`)} 
                             style={{width: "250px", maxWidth: "250px", maxHeight: "250px"}}
                        />
                    </div>

                )}

            </Container>

            <h2>Tous notre vins disponibles:</h2> 
            <Button success>Magasiner</Button>
        </Container>
    )
}
